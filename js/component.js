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
<div class="draw-container">
        <div class="header-bar">
            <h1 class="welcome-user"></h1>
        </div>
        <div class="canvas-wrapper">
            <canvas id="drawing-canvas" width="1000" height="600"></canvas>
            <div class="draw-btn">
                <div class="draw-tool" style="background-image: url('./img/download.png');" onclick="view.updateImg();controller.downloadImg()"></div>
                <div class="draw-tool" style="background-image: url('./img/save.png');" onclick="view.saveImg()"></div>
                <div class="draw-tool" style="background-image: url('./img/gallery.png');" onclick="view.setActiveScreen('galleryPage')"></div>
            </div>
            <div class="draw-tools">
               <div class="draw-tool" style="background-image: url('./img/pen.jpg');" onclick="tool = new tools['pen']();"></div>
               <div class="draw-tool" style="background-image: url('./img/line.png');" onclick="tool = new tools['line']();"></div>
               <div class="draw-tool" style="background-image: url('./img/rec.png');" onclick="tool = new tools['rect']();"></div>
               <div class="draw-tool" style="background-image: url('./img/eraser.png');" onclick="tool = new tools['eraser']();"></div>
               <div class="draw-tool" style="background-image: url('./img/remove.jpg');" onclick="tool = new tools['remove']();"></div>
            </div>
            <div class="stroke-weight">
                <div class="stroke-weight-tool" title="1px" style="background-image: url('./img/stroke1.png');" onclick="currentCanvas.ctx.lineWidth = currentCanvas.lineWidth = '1';"></div>
                <div class="stroke-weight-tool" title="3px" style="background-image: url('./img/stroke2.png');" onclick="currentCanvas.ctx.lineWidth = currentCanvas.lineWidth = '3';"></div>
                <div class="stroke-weight-tool" title="5px" style="background-image: url('./img/stroke3.png');" onclick="currentCanvas.ctx.lineWidth = currentCanvas.lineWidth = '5';"></div>
                <div class="stroke-weight-tool" title="10px" style="background-image: url('./img/stroke4.png');" onclick="currentCanvas.ctx.lineWidth = currentCanvas.lineWidth = '10';"></div>
            </div>
            <div class="color-picker">   
                <div class="tool" id="gray" style="background-color: gray;" onclick="currentCanvas.ctx.strokeStyle = currentCanvas.strokeStyle = 'gray';"></div>
                <div class="tool" id="purple" style="background-color: purple;" onclick="currentCanvas.ctx.strokeStyle = currentCanvas.strokeStyle = 'purple';"></div>
                <div class="tool" id="red" style="background-color: red;" onclick="currentCanvas.ctx.strokeStyle = currentCanvas.strokeStyle = 'red';"></div>
                <div class="tool" id="orange" style="background-color: orange;" onclick="currentCanvas.ctx.strokeStyle = currentCanvas.strokeStyle = 'orange';"></div>
                <div class="tool" id="green" style="background-color: green;" onclick="currentCanvas.ctx.strokeStyle = currentCanvas.strokeStyle = 'green';"></div>
                <div class="tool" id="blue" style="background-color: blue;" onclick="currentCanvas.ctx.strokeStyle = currentCanvas.strokeStyle = 'blue';"></div>
                <div class="tool" id="pink" style="background-color: pink;" onclick="currentCanvas.ctx.strokeStyle = currentCanvas.strokeStyle = 'pink';"></div>
            </div>
            <div class="sign-out-btn">
                <div class="sign-out" title="sign out" style="background-image: url('./img/signout.png');" onclick="view.signOut()"></div>
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