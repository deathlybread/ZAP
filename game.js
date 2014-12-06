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
var laserFiring = false;
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
//Enemy variables
var spawn = true;
var enemySpawnRate = 400;
var enemySpeed = 1;
//Whether main game should be rendered
var gameRender = true;
//Intervals
var gameRefresh;

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

function drawMap () { if (gameRender == true) {    
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
} }

function mainLoop() {
    //Instantiate player object
    var PC = new player(225, 390, 1, 3);
    
    //Canvas refresh loop
    gameRefresh = setInterval(function () { if (gameRender == true) {
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
        
        //Random events
        randEvent();
        //Render entities 
        ctx.drawImage(PC.sprite, PC.x, PC.y);
        
        for (x = 0; x < enemies.length; x++) {
            ctx.drawImage(enemies[x].sprite, enemies[x].x, enemies[x].y);
            if (enemies[x].y >= 385) {
                PC.lives--;
                //Destroy enemy 
                var index = enemies.indexOf(enemies[x]);
                enemies.splice(index, 1);
                
                //Check player's lives
                if (PC.lives <= 0) {
                    //Game over
                    gameOver(time_seconds, time_minutes, time_hours);
                }
            }
            else {
                enemies[x].y += enemySpeed;
            }
        } 
        enemySpeed += 0.01;
        
        if (laser == true && laserCount < 5) {
                laserFiring = true;
                var laserX = PC.x + 25;
                var laserY = PC.y + 25;
            
                ctx.beginPath();
                //Set coordinates according to position of player
                if (bottom == true) {
                    ctx.moveTo(laserX - 1, PC.y - 5);
                    ctx.lineTo(laserX - 1, PC.y - 400);
                }
                else if (leftWall == true) {
                    ctx.moveTo(PC.x + 50, laserY);
                    ctx.lineTo(PC.x + 400, laserY);
                }
                else if (rightWall == true) {
                    ctx.moveTo(PC.x - 5, laserY);
                    ctx.lineTo(PC.x - 400, laserY);
                }
                ctx.lineWidth = 10;
                ctx.strokeStyle = '#ff4848';
                ctx.stroke();
                laserCount++;
            
                if (laserCount == 5) {
                    laserFiring = false;
                    PC.ammo--;
                }
            
                 //Check if any enemies collide with it 
                for (x = 0; x < enemies.length; x++) {
                    if ((enemies[x].x + 15) > laserX - 10 && (enemies[x].x - 15) < laserX + 10 && bottom == true) {
                        //Remove from array
                        var index = enemies.indexOf(enemies[x]);
                        enemies.splice(index, 1);
                        PC.ammo++;
                    }
                }
        }
        else {
            laser = false;
            laserCount = 0;
        }
    } }, 50);
    
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
            if (e.keyCode == 39 && PC.x < 370) {
                PC.x += 30;
            }
            if (e.keyCode == 37 && PC.x > 100) {
                PC.x -= 30;
            }
        }
        
        document.onkeyup = function (e) {
             if (e.keyCode == 32 && laserFiring == false && PC.ammo > 0) {
                laser = true;
                laserCount = 0;
            } 
        }
    }, 1);
    
    //Enemy spawner 
    var enemySpawner = setInterval(function () { if (spawn == true) {
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
    } }, enemySpawnRate);
    
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

 function gameOver (timeS, timeM, timeH) {
    //Halt main game rendering
     gameRender = false;
     clearInterval(gameRefresh);
     
     //Stop game processes; spawning, etc.
     spawn = false;
     
     //Clear screen
     setInterval(function () {
         ctx.fillStyle = 'black';
         ctx.fillRect(0, 0, c.width, c.height);
         //Game over screen
         ctx.fillStyle = '#e74c3c';
         ctx.font = '100px PixelDart';
         ctx.fillText('GAME OVER', 55, 200);
         ctx.fillStyle = 'white';
         ctx.font = '60px PixelDart';
         ctx.fillText('Time', 205, 300);
         ctx.font = '80px PixelDart';
         ctx.fillStyle = '#e74c3c';
         ctx.fillText(timeH + "-" + timeM + "-" + timeS, 165, 360);
         
         //High scores, storing scores with cookies
         var totalSeconds = (timeH * 60 * 60) + (timeM * 60) + timeS;
         //Check if high score cookie already exists
         if (checkCookie('highscore')) {
            //Get high score cookie
             var highScore_string = getCookie('highscore');
             var highScore = parseInt(highScore_string);
             
             if (totalSeconds > highScore) {
                //New high score
                highScore = totalSeconds;
                document.cookie = 'highscore=;expires=Thu, 18 Dec 2000 12:00:00 UTC';
                document.cookie = 'highscore=' + highscore + ';expires=Thu, 18 Dec 2100 12:00:00 UTC';
             }
         }
         else {
             var highScore = totalSeconds;
             document.cookie = 'highscore=' + highScore + ';expires=Thu, 18 Dec 2100 12:00:00 UTC';
         }
         
         var highScore_minutes = Math.floor(highScore / 60); 
         var highScore_seconds = highScore - highScore_minutes * 60;
         ctx.font = '80px PixelDart';
         ctx.fillStyle = '#e74c3c';
         ctx.fillText("0" + "-" + highScore_minutes + "-" + highScore_seconds, 165, 450);
     }, 1);
 }

//Cookie functions
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
}

function checkCookie(cname) {
    var cookie = getCookie(cname);
    if (cookie!="") {
        return true;
    }else{
        return false;
        }
    }

function randEvent () {
    var randNum = Math.floor((Math.random() * 10) + 1);
    
    if (randNum == 1) {
        spawnTimeReset();
    }
}

//Random event functions 
function spawnTimeReset() {
    
}