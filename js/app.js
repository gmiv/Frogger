// ENTITY
var Entity = function(){
    this.sprite = null;
    this.speed = 0;
    this.position = {
        "x":0,
        "y":0
    };
    this.state = {
        "start" : false,
        "playing" : false,
        "won" : false,
        "reset" : false
    };

    this.meta = {"wins":0,"losses":0,"gems":0};
};
Entity.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.position.x, this.position.y); 
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

// ENEMY
var Enemy = function () {
    Entity.call(this);
    this.position.x = Rand(-100,-10)
    this.position.y = this.startPosition(Rand(1,3));//220;//140;//60;//Rand(50,180);
    this.speed = Rand(80,280);
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
var Player = function() {
    Entity.call(this);
    this.position.x = this.startPosition(Rand(1,4)); 
    this.position.y = 400;
    this.sprite = 'images/char-boy.png';
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

Player.prototype.win = function(){
//    var ms = 3000 + new Date().getTime();
//    while (new Date() < ms){}
    
    reset = true;
    return true;   
};

Player.prototype.celebrate = function(dt){
    self = this;
    this.state.start = false;
    this.state.playing = false;
    this.state.won = true;
//    this.state = platerState;
    this.winTimer = setTimeout(self.win, 2000);
};

Player.prototype.reset = function() {
    this.state.start = true;
    this.state.playing = true
    this.state.won = false;
//    this.state = platerState;
    this.position.x = this.startPosition(Rand(1,4));
    this.position.y = 400;

}
    
Player.prototype.update = function(dt) {
//    var winningpos;
    if(this.state.start){
        this.state.start = true;
//        this.state = platerState;
    }
    if (this.state.start || this.state.playing){
        if (this.position.y === -4){
       
            this.celebrate(dt);
            this.state.won = true;
//            this.state = platerState;
            console.log("WINNNIGN")
            
        };
    };
    
    if(this.state.won){
        platerState.win = true;
    };
    
    if(reset === true){
        this.state.reset = true;
        }
    
    if(this.state.reset){
        this.reset();
        this.state.reset = false;
//        this.state = platerState;
        reset = false;
    }
};
// END PLAYER

/////////////

// SOUND CONTROLLER
SoundController = function(){
    this.openingSND = new Audio('sounds/opening.mp3');
    this.middleSND = new Audio('sounds/middle.mp3');
    this.winSND = new Audio('sounds/win.mp3');
    this.currentSND = this.openingSND;
};
SoundController.prototype.update = function(){
//    console.log(platerState);
    if(platerState.start){
        this.currentSND .pause()
//        this.currentSND.currentTime = 0
        this.currentSND = this.openingSND;
//        this.currentSND.play();
    };
    if(platerState.win){
        this.currentSND .pause()
//        this.currentSND.currentTime = 0
        this.currentSND = this.winSND;
        this.currentSND.play();
        platerState.win = false;
    }
};
SoundController.prototype.play = function(){
    
    this.currentSND.play();
};

// END SOUND CONTROLLER
// UTILITIES

function checkCollisions() {
    
};
    
var Rand = function (min, max) {
    return Math.floor((Math.random() * max) + min);
};
// END UTILITIES


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

var allEnemies;
var audio ;
var reset;
    
platerState = {
        "start" : false,
        "playing" : false,
        "won" : false,
        "reset" : false
    };
    
var Main = function(){
//    e = new Enemy();
    player = new Player();
    platerState.start = true;
//    player.state = platerState;

    allEnemies = [];
    for (var i = 0; i < 3; i++) {
        allEnemies.push(new Enemy());

    }; 
    
    winScreen = new Win();
    
    checkCollisions();
    
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


