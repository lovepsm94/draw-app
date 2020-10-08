const component = {}
component.registerPage = `
<div class="register-container">
<div class="header-wrapper">
    <img class="logo" src="./img/logo.gif" alt="">
    <div class="login-header">Quick Draw!</div>
</div>
<form id="register-form">
    <div class="name-wrapper">
        <div class="input-wrapper">
            <input type="text" placeholder="First name..." name="firstName">
            <div class="error" id="first-name-error"></div>
        </div>
        <div class="input-wrapper">
            <input type="text" placeholder="Last name..." name="lastName">
            <div class="error" id="last-name-error"></div>
        </div>    
    </div>
    <div class="input-wrapper">
        <input type="text" placeholder="Email..." name="email">
        <div class="error" id="email-error"></div>
    </div>
    <div class="input-wrapper">
        <input type="password" placeholder="Password..." name="password">
        <div class="error" id="password-error"></div>
    </div>
    <div class="input-wrapper">
        <input type="password" placeholder="Confirm password..." name="confirmPassword">
        <div class="error" id="confirm-password-error"></div>
    </div>
    <div class="form-action">
        <div class="cursor-pointer" id="redirect-to-login">Already have an account? Login</div>
        <button type="submit" class="btn cursor-pointer">Register</button>
    </div>
</form>
</div>
`
component.loginPage = `
<div class="login-container">
<div class="header-wrapper">
    <img class="logo" src="./img/logo.gif" alt="">
    <div class="login-header">Quick Draw!</div>
</div>
<form id="login-form">
    <div class="input-wrapper">
        <input type="text" placeholder="Email..." name="email">
        <div id="email-error" class="error"></div>
    </div>
    <div class="input-wrapper">
        <input type="password" placeholder="Password..." name="password">
        <div id="password-error" class="error"></div>
    </div>
    <div class="form-action">
        <div class="cursor-pointer" id="redirect-to-register">Don't have an account? Register</div>
        <button type="submit" class="btn cursor-pointer">Login</button>
    </div>
</form>
</div>
`
component.drawPage = `
<div class="container">
        <div class="header-bar">
            <h1 class="welcome-user"></h1>
        </div>
        <div class="canvas-wrapper">
            <canvas id="drawing-canvas" width="1000" height="600"></canvas>
            <div class="draw-btn">
               <img src="./img/download.png" alt="" title="down load" class="tool img-tool draw_btn" onclick="view.updateImg();controller.downloadImg()">
               <img src="./img/save.png" alt="" id="save-btn" title="save" class="tool img-tool draw_btn" onclick="view.saveImg()">
               <img src="./img/gallery.png" alt="" title="gallery" class="tool img-tool draw_btn" onclick="view.setActiveScreen('galleryPage');">
            </div>
            <div class="draw-tools">
               <img src="./img/pen.jpg" alt="" class="tool img-tool" onclick="tool = new tools['pen']() ">
               <img src="./img/line.png" alt="" class="tool img-tool" onclick="tool = new tools['line']()">
               <img src="./img/rec.png" alt="" class="tool img-tool" onclick="tool = new tools['rect']()">
               <img src="./img/eraser.png" alt="" class="tool img-tool" onclick="tool = new tools['eraser']()">
               <img src="./img/remove.jpg" alt="" class="tool img-tool" onclick="tool = new tools['remove']()">
            </div>
            <div class="stroke-weight">
                <img src="./img/stroke1.png" alt="" class="tool img-tool stroke" onclick="currentCanvas.ctx.lineWidth = currentCanvas.lineWidth = '1';">
                <img src="./img/stroke2.png" alt="" class="tool img-tool stroke" onclick="currentCanvas.ctx.lineWidth = currentCanvas.lineWidth = '6';">
                <img src="./img/stroke3.png" alt="" class="tool img-tool stroke" onclick="currentCanvas.ctx.lineWidth = currentCanvas.lineWidth = '9';">
                <img src="./img/stroke4.png" alt="" class="tool img-tool stroke" onclick="currentCanvas.ctx.lineWidth = currentCanvas.lineWidth = '13';">
            </div>
            <div class="color-picker">
                <div class="tool" id="black" style="background-color: black;" onclick="currentCanvas.ctx.strokeStyle = currentCanvas.strokeStyle = 'black';"></div>
                <div class="tool" id="gray" style="background-color: gray;" onclick="currentCanvas.ctx.strokeStyle = currentCanvas.strokeStyle = 'gray';"></div>
                <div class="tool" id="purple" style="background-color: purple;" onclick="currentCanvas.ctx.strokeStyle = currentCanvas.strokeStyle = 'purple';"></div>
                <div class="tool" id="red" style="background-color: red;" onclick="currentCanvas.ctx.strokeStyle = currentCanvas.strokeStyle = 'red';"></div>
                <div class="tool" id="orange" style="background-color: orange;" onclick="currentCanvas.ctx.strokeStyle = currentCanvas.strokeStyle = 'orange';"></div>
                <div class="tool" id="green" style="background-color: green;" onclick="currentCanvas.ctx.strokeStyle = currentCanvas.strokeStyle = 'green';"></div>
                <div class="tool" id="blue" style="background-color: blue;" onclick="currentCanvas.ctx.strokeStyle = currentCanvas.strokeStyle = 'blue';"></div>
                <div class="tool" id="pink" style="background-color: pink;" onclick="currentCanvas.ctx.strokeStyle = currentCanvas.strokeStyle = 'pink';"></div>
            </div>
            <div class="sign-out-btn">
                <img src="./img/signout.png" alt="" title="sign out" class="tool img-tool sign-out" onclick="view.signOut()">
            </div>
        </div>
    </div>
`
component.galleryPage = `
<div class="gallery-container">
    <div class="gallery-header">
        <img src="./img/backarrow.png" alt="" class="back-icon" title="back to drawing" onclick="view.setActiveScreen('drawPage')">
    <h1>Your Gallery</h1>
</div>
<div class="user-images">
</div>
</div>
`