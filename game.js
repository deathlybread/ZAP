//Global variables
//Sound effect objects 
var audioMP3_menuSelect = new Audio('sounds/menu-select.mp3');
var audioWAV_menuSelect = new Audio('sounds/menu-select.wav');

window.onload = function () {
    //Get canvas element 'game'
    var c = document.getElementById('game');
    //Assign 2d context 
        ctx = c.getContext('2d');
    
    //Fill canvas with black vakground
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, c.width, c.height);
    
    //Call main loop function to initialise game
    mainLoop();
};

function mainLoop () {
    //Show title screen
    splashScreen();
}
function splashScreen () {
    var logo = new Image();
        
    //Draw logo onto canvas
    logo.onload = function () {
        ctx.drawImage(logo, 150, 25);
    };
        
    logo.src = 'images/ZAP-Logo2.png';
        
    //Menu selected option number (Get default value initially)
    var optionSelect = 0;
    //Draw menu options taking into account selected option
    setInterval(function () {
    if (optionSelect == 0) {
        ctx.fillStyle = '#e74c3c'  
    }
    else {
        ctx.fillStyle = 'white';
    }
    ctx.font = '40px PixelDart';
    ctx.fillText('Play', 210, 255);
    
    if (optionSelect == 1) {
        ctx.fillStyle = '#e74c3c'  
    }
    else {
        ctx.fillStyle = 'white';
    }
    ctx.font = '40px PixelDart';
    ctx.fillText('Options', 210, 305);
    
    if (optionSelect == 2) {
        ctx.fillStyle = '#e74c3c'  
    }
    else {
        ctx.fillStyle = 'white';
    }
    ctx.font = '40px PixelDart';
    ctx.fillText('Credits', 210, 355);
    }, 1);
    
    setInterval(function () {
        document.onkeydown = function (e) { 

        if (e.keyCode == '40' && optionSelect < 2) {
            optionSelect++;
            audioMP3_menuSelect.play();
            audioWAV_menuSelect.play();
        }
        if (e.keyCode == '38' && optionSelect >= 1) {
            optionSelect--;
            audioMP3_menuSelect.play();
            audioWAV_menuSelect.play();
        }
    };   
    }, 1);
}


