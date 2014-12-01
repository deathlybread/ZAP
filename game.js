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
//Gameplay variables
var time_seconds = 0;
var time_minutes = 0;
var time_hours = 0;
var laser;
var laserCount = 0;
//Entity arrays
var enemies = [];
//Sprites
var playerSprite_up = new Image();
var playerSprite_left = new Image();
var playerSprite_right = new Image();
var enemySprite_green = new Image();
var enemySprite_blue = new Image();
var enemySprite_orange = new Image();
var enemySprite_red = new Image();
//Player position variables
var rightWall;
var leftWall;
var bottom;
//Enemy variables
//(Default spawn rate (1000 milliseconds = 1 second))
var enemySpawnRate = 1000;

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
        ctx.fillStyle ='black';
        ctx.fillRect(0, 0, c.width, c.height);
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
            
            ctx.drawImage(logo, 150, 25);
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
    var countdownNo = 4;
    ctx.fillStyle = 'white';
    ctx.font = '100px PixelDart';
    
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
            mainLoop();
        } 
    }, 1000);
}

function drawMap () {    
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
    ctx.fillText('Ammo', 85, 490);
    ctx.fillText('Time', 340, 490);
    ctx.fillText('Lives', 215, 665);
}

function mainLoop() {
    //Instantiate player object
    var PC = new player(225, 390, 1, 3);
    
    //Canvas refresh loop
    var gameRefresh = setInterval(function () {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, c.width, c.height);
        drawMap();
        //Refresh gameplay variables; ammon, etc.
        ctx.fillStyle = 'white';
        ctx.font = '50px PixelDart';
        ctx.fillText(PC.ammo, 115, 540);
        ctx.font = '40px PixelDart';
        ctx.fillStyle = 'white';
        ctx.fillText(time_hours + '-' + time_minutes +'-' + time_seconds, 330, 540);
        ctx.font = '50px PixelDart';
        ctx.fillText(PC.lives, 240, 715);
        
        //Render entities 
        ctx.drawImage(PC.sprite, PC.x, PC.y);
        
        for (x = 0; x < enemies.length; x++) {
            ctx.drawImage(enemies[x].sprite, enemies[x].x, enemies[x].y);
            if (enemies[x].y >= 385) {
                PC.lives--;
            }
            else {
                enemies[x].y++;
            }
        } 
        
        if (laser == true && laserCount < 1) {
            ctx.beginPath();
                ctx.moveTo(PC.x + 25, PC.y);
                ctx.lineTo(PC.x + 25, PC.y - 400);
                ctx.lineWidth = 10;
                ctx.strokeStyle = '#ff4848';
                ctx.stroke();
                laserCount++;
            
                 //Check if any enemies collide with it 
                for (x = 0; x < enemies.length; x++) {
                    if (enemies[x].x > PC.x - 10 && enemies[x].x < PC.x + 10) {
                        //Remove from array
                        var index = enemies.indexOf(x);
                        enemies.splice(index, 1);
                    }
                }
        }
        else {
            laser = false;
            laserCount = 0;
        }
        //Check position of player
        if (PC.x >= 370 && rightWall == false) {
            //Start moving accross right wall
            PC.sprite = playerSprite_left;
            PC.x = 410;
            PC.y = 370;
            
            rightWall = true;
            leftWall = false;
            bottom = false;
        }
        if (PC.y > 370 && PC.x == 410 && bottom == false) {
            //Start moving accross bottom
            PC.sprite = playerSprite_up;
            PC.x = 370;
            PC.y = 390;
            
            rightWall = false;
            leftWall = false;
            bottom = true;
        }
        if (PC.x < 100 && leftWall == false) {
            //Start moving accross left wall
            PC.sprite = playerSprite_right;
            PC.x = 45;
            PC.y = 370;
            
            rightWall = false;
            leftWall = true;
            bottom = false;
        }
        if (PC.y > 370 && PC.x == 45 && bottom == false) {
            //Start moving accross bottom
            PC.sprite = playerSprite_up;
            PC.x = 100;
            PC.y = 390;
            
            rightWall = false;
            leftWall = false;
            bottom = true;
        }
    }, 50);
    
    //Timer
        var gameTimer_seconds = setInterval(function () {
            if (time_seconds < 59) {
                time_seconds++;
            }
            else {
                time_seconds = 0;
            }
        }, 1000);
        var gameTimer_minutes = setInterval(function () {
            if (time_minutes < 59) {
                time_minutes++;
            }
            else {
                time_minutes = 0;
            }
        }, 60000);
        var gameTimer_hours = setInterval(function () {
            time_hours++;
        }, 3600000);
    
    //Input event handler
    var gameInput = setInterval(function () {
        document.onkeydown = function (e) {
            if (e.keyCode == 39 && bottom == true) {
                PC.x += 15;
            }
            if (e.keyCode == 37 && bottom == true) {
                PC.x -= 15;
            }
            if (e.keyCode == 39 && rightWall == true && PC.y > 50) {
                PC.y -= 15;
            }
            if (e.keyCode == 37 && rightWall == true) {
                PC.y += 15;
            } 
            if (e.keyCode == 39 && leftWall == true) {
                PC.y += 15;
            }
            if (e.keyCode == 37 && leftWall == true && PC.y > 50) {
                PC.y -= 15;
            } 
            if (e.keyCode == 32 && bottom == true) {
                laser = true;
                ctx.beginPath();
                ctx.moveTo(PC.x + 25, PC.y);
                ctx.lineTo(PC.x + 25, PC.y - 400);
                ctx.lineWidth = 10;
                ctx.strokeStyle = '#ff4848';
                ctx.stroke();
            } 
        }
    }, 1);
    
    //Enemy spawner 
    var enemySpawner = setInterval(function () {
        //Random enemy variables
        var type;
        var posX = [115, 130, 145, 160, 175, 190, 205, 220, 235, 250, 265, 280]
        
        //Generate random numbers
        //For type
        var type_randnum = Math.floor((Math.random() * 4) + 1);
        //For x position
        var posX_randnum = posX[Math.floor(Math.random() * posX.length)];
        
        //Instantiate enemy object with values of random variables as arguments, and add object to 'enemies' array 
        enemies.push(new enemy(posX_randnum, 100, type_randnum));
    }, enemySpawnRate);
}

//Entity object constructors
function player (locationX, locationY, ammo, lives) {
    this.x = locationX;
    this.y = locationY;
    this.ammo = ammo;
    this.lives = lives;
    
    //(Default sprite is pointing upward)
    this.sprite = playerSprite_up;
    //(Therefore, bottom player position is true
    bottom = true;
    rightWall = false;
    leftWall = false;
    
    playerSprite_up.onload = function () {
        ctx.drawImage(playerSprite_up, this.x, this.y);
    };
    
    playerSprite_up.src = 'images/ZAP-Shooter up.png';
    playerSprite_left.src = 'images/ZAP-Shooter left.png';
    playerSprite_right.src = 'images/ZAP-Shooter right.png';
}

function enemy (locationX, locationY, type) {
    this.x = locationX;
    this.y = locationY;
    this.type = type;
    
    if (this.type == 1) {
        this.type = 'green';
        this.sprite = enemySprite_green; 
        
        ctx.drawImage(this.sprite, this.x, this.y);
    }
    if (this.type == 2) {
        this.type = 'blue';
        this.sprite = enemySprite_blue;
        
        ctx.drawImage(this.sprite, this.x, this.y);
    }
    if (this.type == 3) {
        this.type = 'orange';
        this.sprite = enemySprite_orange;
        
        ctx.drawImage(this.sprite, this.x, this.y);
    }
    if (this.type == 4) {
        this.type = 'red';
        this.sprite = enemySprite_red;
        
        ctx.drawImage(this.sprite, this.x, this.y);
    }
    
    enemySprite_green.src = 'images/ZAP-Enemy green.png';
    enemySprite_blue.src = 'images/ZAP-Enemy blue.png';
    enemySprite_orange.src = 'images/ZAP-Enemy orange.png';
    enemySprite_red.src = 'images/ZAP-Enemy red.png'
}
