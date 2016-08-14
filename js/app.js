
// ENTITY
var Entity = function(){
    this.sprite = null;
    this.speed = 0;
    this.position = {
        "x":0,
        "y":0
    };
    this.size = {
        "w" : 25,
        "h" : 55
    };
    this.state = {
        "start" : false,
        "playing" : false,
        "won" : false,
        "reset" : false,
        "hit" : false,
        "gameover" : false
    };

    this.meta = {"wins":0,"losses":0,"gems":0,"lives":5};
};
Entity.prototype.render = function(render) {
//    console.log(render);
    if(render === true){
        ctx.drawImage(Resources.get(this.sprite), this.position.x, this.position.y); 
    }
    
};
// END ENTITY

/////////////

// WIN
var Win = function () {
    Entity.call(this);
    this.position = {
            "x":50,
            "y":200
        };
    this.sprite = 'images/win.png';
//    this.state.start = true;
//    this.state.playing = true;
};
Win.prototype = Object.create(Entity.prototype);
// END WIN

/////////////

// GAMEOVER
var Gameover = function () {
    Entity.call(this);
    this.position = {
            "x":50,
            "y":200
        };
    this.sprite = 'images/gameover.png';
//    this.state.start = true;
//    this.state.playing = true;
};
Gameover.prototype = Object.create(Entity.prototype);
// END GAMEOVER

/////////////

// ENEMY
var Enemy = function () {
    Entity.call(this);
    this.position.x = Rand(-100,-10)
    this.position.y = this.startPosition(Rand(1,3));//220;//140;//60;//Rand(50,180);
    this.speed = Rand(80,380);
    this.sprite = 'images/enemy-bug.png';
    this.state.start = true;
    this.state.playing = true;
};

Enemy.prototype = Object.create(Entity.prototype);

Enemy.prototype.startPosition = function(index){
    switch (index) {
        case 1:
            return 60;
        case 2:
            return 140;
        case 3:
            return 220;
    }
}

Enemy.prototype.update = function(dt) {

    if(dt !== 0){
        this.position.x = this.position.x + (this.speed * dt);
        this.position.y = this.position.y;
        };

    if( this.position.x >= 550){
        this.reset();
        };
};

Enemy.prototype.reset = function() {
        this.position.x = Rand(-100,-10)
        this.position.y = this.startPosition(Rand(1,3));
    }
// END ENEMY

/////////////

// PLAYER
var Player = function(CHARACTER) {
    Entity.call(this);
    this.position.x = this.startPosition(Rand(1,4)); 
    this.position.y = 400;
    this.sprite = 'images/' + CHARACTER + '.png';
    this.state.start = true;
    this.state.playing = true;
};

Player.prototype = Object.create(Entity.prototype);

Player.prototype.handleInput = function(key){
	switch (key) {
		case 'left':
			if (this.position.x <= 5) {
				this.position.x = 5;
			} else {
				this.position.x -= 100;
			}
			break;

		case 'right':
			if (this.position.x >= 305) {
				this.position.x = 405;
			} else {
				this.position.x += 100;
			}
			break;

		case 'up':
			if (this.position.y <= 72) {
				this.position.y = -4;
			} else {
				this.position.y -= 82;
			}
			break;

		case 'down':
			if (this.position.y >= 400) {
				this.position.y = 400;
			} else {
				if(this.position.y+80 >=400){
					this.position.y = 400;
				}
				else{
					this.position.y += 82;
				}
				
			}
			break;
	}
};

Player.prototype.startPosition = function(index){
	switch (index) {
		case 1:
            return 5;
        case 2:
            return 105;
        case 3:
            return 305;
        case 4:
            return 405;
    }
}

Player.prototype.celebrate = function(dt){

    self = this;
    this.state.won = true;
    this.winTimer = setTimeout(self.win, 4000);
    player.meta.wins = player.meta.wins + 1;
    $("#score").text(player.meta.wins);
};

Player.prototype.win = function(){

    reset = true;
    playerState.won = false;
    playerState.start = true;
    return true;   
};

Player.prototype.lose = function(){

    self = this;
    this.gameoverTimer = setTimeout(self.gameover, 2000);    
}

Player.prototype.gameover = function(){
    
    reset = true;
    playerState.gameover = false;

    return true; 
}

Player.prototype.reset = function() {
    this.state.start = true;
//    this.state.playing = true
    this.state.won = false;
    this.state.hit = false;
    this.state.gameover = false;
    this.state.playing = true;
//    this.state = playerState;
    this.position.x = this.startPosition(Rand(1,4));
    this.position.y = 400;
    player.render(true)
}
    
Player.prototype.update = function(dt) {

    if(this.state.start){
        this.state.start = true;
    }

    if(player.position.y >=318){
        playerState.playing = false;
    }
    
    if(player.position.y <= 236){
        playerState.playing = true;
    }
    
    if(player.position.y <= -4){
        playerState.playing = false;
        playerState.win = true;
    }
    
    if (this.state.playing){
        if (this.position.y === -4){
        	if (!this.state.won){
                this.celebrate(dt);
                this.state.won = true;
                playerState.won = true;
        	}
        };
        
        if (playerState.gameover){
            this.lose(dt);
            this.state.gameover = true;
            this.state.playing = false;
            this.meta.lives = 5;
            $("#lives").text("Lives:  " + player.meta.lives);
            player.meta.wins = 0;
            $("#score").text(player.meta.wins);
        }
    };
    
    if(this.state.won){
        playerState.win = true;
        playerState.playing = false;
    };
    
    if(reset === true){
        this.state.reset = true;
        }
    
    if(this.state.reset){
        this.reset();
        this.state.reset = false;
        reset = false;
    }
};
// END PLAYER

/////////////////

// GEM
var Gem = function () {
    Entity.call(this);
    this.position.x = this.startPositionX(Rand(1,3));
    this.position.y = this.startPositionY(Rand(1,3));//220;//140;//60;//Rand(50,180);
    this.speed = Rand(80,380);
    this.sprite = 'images/' + this.startGem(Rand(1,3)) + '.png';
    this.state.start = true;
    this.state.playing = true;
};

Gem.prototype = Object.create(Entity.prototype);

Gem.prototype.startPositionY = function(index){
    switch (index) {
        case 1:
            return 60;
        case 2:
            return 140;
        case 3:
            return 220;
    }
}

Gem.prototype.startPositionX = function(index){
	switch (index) {
		case 1:
            return 5;
        case 2:
            return 105;
        case 3:
            return 305;
        case 4:
            return 405;
    }
}

Gem.prototype.startGem = function(index){
    switch (index) {
        case 1:
            return "GemOrange";
        case 2:
            return "GemGreen";
        case 3:
            return "GemBlue";
    }
}
// END GEM

/////////////////

// SOUND CONTROLLER
SoundController = function(){
    this.openingSND = new Audio('sounds/opening.mp3');
    this.middleSND = new Audio('sounds/middle.mp3');
    this.winSND = new Audio('sounds/win.mp3');
    this.currentSND = this.openingSND;
};
SoundController.prototype.update = function(){
//
//    self = this;
//    isstarted = true;
//    iswinning = true;
//    if(playerState.start){
//            this.winSND.pause();
////            this.openingSND.currentTime = 0;
//            this.openingSND.play();
//        
//        }
////        this.currentSND.volume = 0;
////        this.currentSND.pause();
////        //Avoid thselfe Promise Error
////        setTimeout(function () {      
////           self.currentSND.play();
////        }, 150);
////
////    };
//    
//    if(playerState.playing){
//        playerState.start = false;
//        this.openingSND.pause();
////        this.middleSND.currentTime = 0;
//        this.middleSND.play();
//    }
//    if(playerState.win){
//        if(iswinning){
//            playerState.playing = false;
//            
//           //        this.currentSND.volume = 0;
//            this.middleSND.pause();
////            this.winSND.currentTime = 0;
//            this.winSND.play();
//            //Avoid the Promise Error
////            this.currentSND = this.winSND;
////            setTimeout(function () {      
////               self.currentSND.play();
////            }, 150);
//            iswinning = false;
////            console.log("in winning")
//        }
//
//
//        playerState.win = false;
//    }
};

//SoundController.prototype.play = function(){
//    
//    this.currentSND.play();
//};

// END SOUND CONTROLLER


/////////////////

//// UTILITIES
function checkCollisions() {
    
    if(playerState.playing){
        for(var i = 0; i<allEnemies.length; i++){
            if (allEnemies[i].position.x < player.position.x + player.size.w &&
                allEnemies[i].position.x + allEnemies[i].size.w > player.position.x &&
                allEnemies[i].position.y < player.position.y + player.size.h &&
                allEnemies[i].size.h + allEnemies[i].position.y > player.position.y){

                player.state.hit = true;
                player.reset();
                player.meta.lives = player.meta.lives - 1;
                if(player.meta.lives <= 0){
                    player.state.gameover = true;
                    playerState.gameover = true;
                }
                $("#lives").text("Lives:  " + player.meta.lives);
            }
        }
    
        for(var i = 0; i<gems.length; i++){
            if (gems[i].position.x < player.position.x + player.size.w &&
                gems[i].position.x + gems[i].size.w > player.position.x &&
                gems[i].position.y < player.position.y + player.size.h &&
                gems[i].size.h + gems[i].position.y > player.position.y){
                
                gems[i].state.hit = true;
                player.meta.gems = player.meta.gems + 1;
                $("#gems").text("Gems:  " + player.meta.gems);
                
                //remove gem from array
                var i = gems.indexOf(gems[i]);
                if(i != -1) {
                    gems.splice(i, 1);
                }
            }
        }
    }
};
    
var Rand = function (min, max) {
    return Math.floor((Math.random() * max) + min);
};

var CHARACTER
function loadData() {
        CHARACTER= location.search;
       if (!CHARACTER) return false;
       CHARACTER = CHARACTER.substr(1);

       var a = (/^a=/);
       CHARACTER = CHARACTER.split("&").filter(function(item) {
          return a.test(item);
       });
       if (!CHARACTER.length) return false;
       //gets the first element 'a' matched
       CHARACTER = CHARACTER[0].replace("a=", "");
    return true;
}

function timer(dt){
    time = 10
    time = time - dt
    console.log(time);
     $("#timer").text("Time:  " + time.toString);
}
// END UTILITIES

/////////////////

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// MAIN
var player;

var allEnemies, gems;
var audio ;
var reset;

var enemyAmount = 4;
var gemAmount = 4;

var time = 10.0;

playerState = {
        "start" : false,
        "playing" : false,
        "won" : false,
        "reset" : false,
        "gameover" : false,
        "gem" : false
    };

var Main = function(){
   loadData();
//    e = new Enemy();
    player = new Player(CHARACTER);
    playerState.start = true;
//    player.state = playerState;

    allEnemies = [];
    for (var i = 0; i < enemyAmount; i++) {
        allEnemies.push(new Enemy());
    }; 
    
    gems = [];
    for (var i = 0; i < gemAmount; i++) {
        gems.push(new Gem());
    }; 
    
    winScreen = new Win();
    gameoverScreen = new Gameover();
    
    checkCollisions();
    timer(null);

    audio = new SoundController();
//    audio.play();
};
// END MAIN

// SOUND
var isPlaying = true;
var onKeyDown = function(event) {
    if (event.keyCode == 27){
        if(!isPlaying){
            audio.play();
            isPlaying = true;
        }
        else{
            audio.pause();
            isPlaying = false;
        };    
    };
};
document.addEventListener('keydown', onKeyDown, false);
// END SOUND

Main();

