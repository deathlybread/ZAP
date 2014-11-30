window.onload = function () {
    //Get canvas element 'game'
    var c = document.getElementById('game');
    //Assign 2d context 
        ctx = c.getContext('2d');
    
    //Fill canvas with black vakground
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, c.width, c.height);
    
    //initialise game
    initialise();
};

function initialise () {
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

        if (e.keyCode == 40 && optionSelect < 2) {
            optionSelect++;
            document.getElementById('menu-select').play();
        }
        if (e.keyCode == 38 && optionSelect >= 1) {
            optionSelect--;
            document.getElementById('menu-select').play();
        }
        if (e.keyCode == 13) {
            menuSelect(optionSelect);
        }
    };   
    }, 1);
}

function menuSelect(option) {
    if (option == 0) {
        game();
    }
    if (option == 1) {
        options();
    }
    else {
        credits();
    }
}

function game() {

}

function options() {

}

function credits () {

}


