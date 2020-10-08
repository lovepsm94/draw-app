const model = {}
model.currentUser = undefined
model.userInfo = undefined
model.register = async (data) => {
    try {
        const response = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        const userName = data.firstName + ' ' + data.lastName
        firebase.auth().currentUser.updateProfile({
            displayName: userName,
        })
        firebase.auth().currentUser.sendEmailVerification()
        model.createUserGallery(userName)
        view.setActiveScreen('loginPage')
    } catch (err) {
        alert(err.message)
    }
}
model.login = async ({ email, password }) => {
    try {
        const response = await firebase.auth().signInWithEmailAndPassword(email, password)
        if (!response.user.emailVerified) {
            alert('Please verify your email')
        } else {
            model.currentUser = {
                displayName: response.user.displayName,
                email: response.user.email
            }
            view.setActiveScreen('drawPage')
        }
    } catch (err) {
        alert(err.message)
    }
}
model.saveImg = () => {
    const dataURL = currentCanvas.canvaso.toDataURL("image/png", 1)
    const fileName = model.currentUser.imgName
    if (fileName) {
        const filePath = `images/${fileName}`
        const fileRef = firebase.storage().ref().child(filePath)
        fileRef.putString(dataURL, 'data_url').then(res => {
            const imgUrl = getFileUrl(fileRef)
            model.addImgUrlToFirestore(imgUrl)
        })
        view.setActiveScreen('drawPage')
    } else {
        alert('Please input the image name')
    }

}
model.createUserGallery = (userName) => {
    const dataToCreate = {
        name: userName,
        email: model.currentUser.email,
        images: [],
        createdAt: new Date().toISOString()
    }
    firebase.firestore().collection('gallery').add(dataToCreate)
}
model.getUserInfo = async () => {
    const response = await firebase.firestore().collection('gallery').where('email', '==', model.currentUser.email).get()
    model.userInfo = getManyDocument(response)[0]
}
model.addImgUrlToFirestore = async (imgUrl) => {
    const data = {
        url: imgUrl,
        name: model.currentUser.imgName,
        createdAt: new Date().toISOString()
    }
    dataToUpdate = {
        images: firebase.firestore.FieldValue.arrayUnion(data)
    }
    await model.getUserInfo()
    firebase.firestore().collection('gallery').doc(model.userInfo.id).update(dataToUpdate)
}
