const view = {}
currentCanvas = undefined
view.setActiveScreen = (screenName) => {
    switch (screenName) {
        case 'registerPage':
            document.getElementById('app').innerHTML = component.registerPage
            const registerForm = document.getElementById('register-form')
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault()
                const data = {
                    firstName: registerForm.firstName.value,
                    lastName: registerForm.lastName.value,
                    email: registerForm.email.value,
                    password: registerForm.password.value,
                    confirmPassword: registerForm.confirmPassword.value,
                }
                controller.register(data)
            })
            document.getElementById('redirect-to-login').addEventListener('click', () => {
                view.setActiveScreen('loginPage')
            })
            break;
        case 'loginPage':
            document.getElementById('app').innerHTML = component.loginPage
            const loginForm = document.getElementById('login-form')
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault()
                const data = {
                    email: loginForm.email.value,
                    password: loginForm.password.value,
                }
                controller.login(data)
            })
            document.getElementById('redirect-to-register').addEventListener('click', () => {
                view.setActiveScreen('registerPage')
            })
            break;
        case 'drawPage':
            document.getElementById('app').innerHTML = component.drawPage
            view.setWelcomeText()
            view.createTempCanvas()
            currentCanvas.canvas.addEventListener('mousedown', view.canvasEvent, false)
            currentCanvas.canvas.addEventListener('mousemove', view.canvasEvent, false)
            currentCanvas.canvas.addEventListener('mouseup', view.canvasEvent, false)
            view.activeDefaultTool()
            break;
        case 'galleryPage':
            document.getElementById('app').innerHTML = component.galleryPage
            view.showGallery()
            break;
    }
}
view.setErrorMessage = (elementID, content) => {
    document.getElementById(elementID).innerText = content
}

view.setWelcomeText = () => {
    document.querySelector('.welcome-user').innerText = `Welcome ${model.currentUser.displayName}`
}
view.createTempCanvas = () => {
    const canvaso = document.getElementById('drawing-canvas')
    const ctxo = canvaso.getContext('2d')
    const container = canvaso.parentNode
    const canvas = document.createElement('canvas')
    canvas.id = 'temp-canvas'
    canvas.width = canvaso.width
    canvas.height = canvaso.height
    container.appendChild(canvas)
    const ctx = canvas.getContext('2d')
    ctx.strokeStyle = "#000000"
    ctx.lineWidth = 1.0
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, 1000, 600)
    currentCanvas = new CanvasVariable(canvaso, ctxo, canvas, ctx, 'pen')
}
view.activeDefaultTool = () => {
    currentCanvas.tool = new tools['pen']
}
view.canvasEvent = (ev) => {
    if (ev.layerX || ev.layerX == 0) { // Firefox 
        ev._x = ev.layerX
        ev._y = ev.layerY
    } else if (ev.offsetX || ev.offsetX == 0) { // Opera 
        ev._x = ev.offsetX
        ev._y = ev.offsetY
    }
    // Get the tool's event handler. 
    let func = currentCanvas.tool[ev.type]
    if (func) {
        func(ev)
    }
}
view.updateImg = () => {
    currentCanvas.ctxo.drawImage(currentCanvas.canvas, 0, 0)
    currentCanvas.ctx.clearRect(0, 0, currentCanvas.canvas.width, currentCanvas.canvas.height)
}

view.signOut = () => {
    document.querySelector('.sign-out-btn').addEventListener('click', () => {
        firebase.auth().signOut()
        view.setActiveScreen('loginPage')
    })
}
view.saveImg = () => {
    const imgName = prompt('Input image name')
    model.currentUser.imgName = imgName
    model.saveImg()
}
view.showGallery = async () => {
    await model.getUserInfo()
    const userImgs = document.querySelector('.user-images')
    userImgs.innerHTML = ''
    for (const item of model.userInfo.images) {
        userImgs.insertAdjacentHTML("beforeend", `
        <div class="image-wrapper">
            <div class="image-container">
                <a href="${item.url}" data-lightbox="roadtrip" class="img" style="background: url('${item.url}'); background-size: cover">
                </a>
                <h6 class="img-name">${item.name}</h6>
            </div>
            <div class="img-controller">
                <div class="hide" style="background-image: url('./img/remove.jpg')" id="${item.url}" onclick="model.imgDelete = this.id; view.deleteImg()"></div>
            </div>
        </div>
        `)  
    }
}
view.deleteImg = async() => {
    if (confirm('Delete image?')) {
        await model.deleteImg()
        view.showGallery()
    }
}
