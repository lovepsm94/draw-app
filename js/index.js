
window.onload = () => {
  let firebaseConfig = {
    apiKey: "AIzaSyCqK1nUnn_DXj_bWcS6I4_JWGnvPQoBW48",
    authDomain: "sketch-drawing-f2406.firebaseapp.com",
    databaseURL: "https://sketch-drawing-f2406.firebaseio.com",
    projectId: "sketch-drawing-f2406",
    storageBucket: "sketch-drawing-f2406.appspot.com",
    messagingSenderId: "582327903308",
    appId: "1:582327903308:web:1a785d33175011c13840e9",
    measurementId: "G-43JPHTG9MX"
  }
  firebase.initializeApp(firebaseConfig)
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      model.currentUser = {
        displayName: user.displayName,
        email: user.email
      }
      if (user.emailVerified) {
        view.setActiveScreen('drawPage')
      } else {
        view.setActiveScreen('loginPage')
      }
    } else {
      view.setActiveScreen('loginPage')
    }
  })
}
const getOneDocument = (response) => {
  const data = response.data()
  data.id = response.id
  return data
}
const getManyDocument = (response) => {
  const listData = []
  for (const doc of response.docs) {
    listData.push(getOneDocument(doc))
  }
  return listData
}
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}
function CanvasVariable(canvaso, ctxo, canvas, ctx, tool) {
  this.canvaso = canvaso
  this.ctxo = ctxo
  this.canvas = canvas
  this.ctx = ctx
  this.tool = tool
  this.strokeStyle = "#000000"
  this.lineWidth = 1.0
}
tools = {}
tools.pen = function () {
  document.querySelector('.stroke-weight').style.display = 'flex'
  currentCanvas.ctx.strokeStyle = currentCanvas.strokeStyle
  currentCanvas.ctx.lineWidth = currentCanvas.lineWidth
  let tool = this
  this.started = false
  currentCanvas.canvas.onmousedown = function (ev) {
    currentCanvas.ctx.beginPath()
    currentCanvas.ctx.moveTo(ev._x, ev._y)
    tool.started = true
  }
  currentCanvas.canvas.onmousemove = function (ev) {
    if (tool.started) {
      currentCanvas.ctx.lineTo(ev._x, ev._y)
      currentCanvas.ctx.stroke()
    }
  }
  window.onmouseup = function (ev) {
    if (tool.started) {
      tool.started = false
      view.updateImg()
    }
  }
}
tools.eraser = function () {
  document.querySelector('.stroke-weight').style.display = 'none'
  const context = currentCanvas.ctx
  context.strokeStyle = '#ffffff'
  context.lineWidth = '22'
  let tool = this
  this.started = false
  currentCanvas.canvas.onmousedown = function (ev) {
    context.beginPath()
    context.moveTo(ev._x, ev._y)
    tool.started = true
  }
  currentCanvas.canvas.onmousemove = function (ev) {
    if (tool.started) {
      context.lineTo(ev._x, ev._y)
      context.stroke()
    }
  }
  window.onmouseup = function (ev) {
    if (tool.started) {
      tool.started = false
    }
    view.updateImg()
  }
}
tools.rect = function () {
  document.querySelector('.stroke-weight').style.display = 'flex'
  const context = currentCanvas.ctx
  context.strokeStyle = currentCanvas.strokeStyle
  context.lineWidth = currentCanvas.lineWidth
  let tool = this
  started = false
  currentCanvas.canvas.onmousedown = function (ev) {
    tool.started = true
    tool.x0 = ev._x
    tool.y0 = ev._y
  }
  currentCanvas.canvas.onmousemove = function (ev) {
    if (!tool.started) {
      return
    }
    let x = Math.min(ev._x, tool.x0),
      y = Math.min(ev._y, tool.y0),
      w = Math.abs(ev._x - tool.x0),
      h = Math.abs(ev._y - tool.y0)
    context.clearRect(0, 0, currentCanvas.canvas.width, currentCanvas.canvas.height)
    if (!w || !h) {
      return
    }
    context.strokeRect(x, y, w, h)
  }
  currentCanvas.canvas.onmouseup = function (ev) {
    if (tool.started) {
      tool.started = false
      view.updateImg()
    }
  }
}
tools.line = function () {
  document.querySelector('.stroke-weight').style.display = 'flex'
  currentCanvas.ctx.strokeStyle = currentCanvas.strokeStyle
  currentCanvas.ctx.lineWidth = currentCanvas.lineWidth
  const context = currentCanvas.ctx
  let tool = this
  this.started = false
  currentCanvas.canvas.onmousedown = function (ev) {
    tool.started = true
    tool.x0 = ev._x
    tool.y0 = ev._y
  }
  currentCanvas.canvas.onmousemove = function (ev) {
    if (!tool.started) {
      return
    }
    context.clearRect(0, 0, currentCanvas.canvas.width, currentCanvas.canvas.height)
    // Begin the line. 
    context.beginPath()
    context.moveTo(tool.x0, tool.y0)
    context.lineTo(ev._x, ev._y)
    context.stroke()
    context.closePath()
  }
  currentCanvas.canvas.onmouseup = function (ev) {
    tool.started = false
    view.updateImg()
  }
}
tools.remove = function () {
  currentCanvas.ctxo.clearRect(0, 0, currentCanvas.canvas.width, currentCanvas.canvas.height)
}
function getFileUrl(fileRef) {
  return `https://firebasestorage.googleapis.com/v0/b/${fileRef.bucket}/o/${encodeURIComponent(fileRef.fullPath)}?alt=media`
}


