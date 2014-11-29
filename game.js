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
    
    function mainLoop () {
        //Title scree
        var logo = new Image();
        
        //Draw logo onto canvas
        logo.onload = function () {
            ctx.drawImage(logo, 150, 25);
        };
        
        logo.src = 'images/ZAP-Logo2.png';
    }
};