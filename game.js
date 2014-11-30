/* Copyright (C) Prithvi Kohli 2014, All rights reserved
 * www.prithvikohli.co.uk
 * Contact: prithvi@prithvikohli.co.uk
 */

//Global variables
//Canvas variables
var c;
var ctx;
//Check if user has selected menu option 
var menu_hasSelected = false;
//Check if game start countdown has finished
var countdown_hasFinished = false;

window.onload = function () {
    //Get canvas element 'game'
     c = document.getElementById('game');
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
    
    ctx.font = '20px PixelDart';
        
    //Menu selected option number (Get default value initially)
    var optionSelect = 0;
    //Draw menu options taking into account selected option
    var menu = setInterval(function () {
        if (menu_hasSelected == false) {
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
        }
        else {
            clearInterval(menu);
        }
    }, 1);
    
    var menu_input = setInterval(function () {
        if (menu_hasSelected == false) {
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
        }
        else {
            clearInterval(menu_input)
        }
        }, 1);
}

function menuSelect(option) {
    menu_hasSelected = true;
    //Stop event listener
    document.onkeydown = null;
    if (option == 0) {
        startGame();
    }
    if (option == 1) {
        options();
    }
    else {
        credits();
    }
}

function startGame() {
    //Explode canvas
    c.height = 800;
    //Clear screen
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, c.width, c.height);
    
    countdown();
}

function options() {

}

function credits () {

}

function countdown () {
    var countdownNo = 3;
    ctx.fillStyle = 'white';
    ctx.font = '100px PixelDart';
    ctx.fillText(3, 230, 275);
    document.getElementById('menu-select').play();
    
    var countdownTimer = setInterval(function () {
        if (countdown_hasFinished == false) {
            countdownNo--;
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, c.width, c.height);
            ctx.fillStyle = 'white';
            ctx.font = '100px PixelDart';
            if (countdownNo == 0) {
                ctx.fillText('GO!', 210, 275);
                document.getElementById('countdown-finished').play();
                countdown_hasFinished = true;
            }
            else {
                ctx.fillText(countdownNo, 230, 275);
                document.getElementById('menu-select').play();
            }
        }
        else {
            clearInterval(countdownTimer);
            game();
        } 
    }, 1000);
}

function game () {
    drawMap();
}

function drawMap () {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, c.width, c.height);
    
    var wallHorizontal = new Image();
    
    wallHorizontal.onload = function () {
        ctx.drawImage(wallHorizontal, 150, 50, 50, 25);
        ctx.drawImage(wallHorizontal, 200, 50, 50, 25);
        ctx.drawImage(wallHorizontal, 250, 50, 50, 25);
        ctx.drawImage(wallHorizontal, 300, 50, 50, 25);
    };
    
    wallHorizontal.src = 'images/ZAP-Wall.png';
    
    var wallVertical = new Image();
    
    wallVertical.onload = function () {
        //Left
        ctx.drawImage(wallVertical, 100, 65, 27, 50);
        ctx.drawImage(wallVertical, 100, 92, 27, 50);
        ctx.drawImage(wallVertical, 100, 119, 27, 50);
        ctx.drawImage(wallVertical, 100, 146, 27, 50);
        ctx.drawImage(wallVertical, 100, 173, 27, 50);
        ctx.drawImage(wallVertical, 100, 200, 27, 50);
        ctx.drawImage(wallVertical, 100, 227, 27, 50);
        ctx.drawImage(wallVertical, 100, 254, 27, 50);
        ctx.drawImage(wallVertical, 100, 281, 27, 50);
        ctx.drawImage(wallVertical, 100, 308, 27, 50);
        ctx.drawImage(wallVertical, 100, 335, 27, 50);
        //Right
        ctx.drawImage(wallVertical, 373, 65, 27, 50);
        ctx.drawImage(wallVertical, 373, 92, 27, 50);
        ctx.drawImage(wallVertical, 373, 119, 27, 50);
        ctx.drawImage(wallVertical, 373, 146, 27, 50);
        ctx.drawImage(wallVertical, 373, 173, 27, 50);
        ctx.drawImage(wallVertical, 373, 200, 27, 50);
        ctx.drawImage(wallVertical, 373, 227, 27, 50);
        ctx.drawImage(wallVertical, 373, 254, 27, 50);
        ctx.drawImage(wallVertical, 373, 281, 27, 50);
        ctx.drawImage(wallVertical, 373, 308, 27, 50);
        ctx.drawImage(wallVertical, 373, 335, 27, 50);
    };
    
    wallVertical.src = 'images/ZAP-Wall vertical.png';
        
    //Wall corners
    var topRight_wallCorner = new Image();
    
    topRight_wallCorner.onload = function () {
        ctx.drawImage(topRight_wallCorner, 350, 50, 50, 25);
    }
    
    topRight_wallCorner.src = 'images/ZAP-Wall corner.png';
    
    var topLeft_wallCorner = new Image();
    
    topLeft_wallCorner.onload = function () {
        ctx.drawImage(topLeft_wallCorner, 100, 50, 50, 25);
    }
    
    topLeft_wallCorner.src = 'images/ZAP-Wall corner left.png';
    
    //Enemy Barrier
    var enemyBarrier = new Image();
    
    enemyBarrier.onload = function () {
        ctx.drawImage(enemyBarrier, 157, 75);
    };
    
    enemyBarrier.src = 'images/ZAP-Barrier.png';
    
    //HUD
    var hudBox = new Image();
    
    hudBox.onload = function () {
        ctx.drawImage(hudBox, 50, 450, 150, 150);
        ctx.drawImage(hudBox, 300, 450, 150, 150);
        ctx.drawImage(hudBox, 175, 625, 150, 150);
    };
    
    hudBox.src = 'images/ZAP-Hud box.png';
    
    //Fill hud boxes with text
    ctx.fillStyle = 'white';
    ctx.font = '40px PixelDart';
    ctx.fillText('Ammo', 95, 490);
    ctx.fillText('Time', 335, 490);
}

