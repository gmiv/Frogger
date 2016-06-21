var Entity = function(){
    this.sprite = null;
    this.speed = 0;
    this.position = {
        "x":0,
        "y":0
    };
    this.meta = {"wins":0,"losses":0,"gems":0};
};
Entity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.position.x, this.position.y);
};

// ENEMY
var Enemy = Object.create(Entity);
Enemy.prototype.constructor = Enemy;

var Enemy = function () {
    Entity.call(this);

    this.position.x = Rand(-100,-10)
    this.position.y = Rand(50,180);
    this.speed = Rand(50,280);
    this.sprite = 'images/enemy-bug.png';
};

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
    this.position.y = Rand(50,180);
}

Enemy.prototype.render = Entity.prototype.render;
// END ENEMY

// PLAYER
var Player = Object.create(Entity);
Player.prototype.constructor = Player;

var Player = function() {
    Entity.call(this);
    this.position.x = 5;//Rand(10,400); 
    this.position.y = 400;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.handleInput = function(key){
//    console.log("moved from:" + this.position.x +"," + this.position.y);
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
//    console.log("moved to:" + this.position.x +"," + this.position.y);
};


Player.prototype.update = function(dt) {

};
// Draw the enemy on the screen, required method for game
Player.prototype.render = Entity.prototype.render;
// END PLAYER

// UTILITIES
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
var Main = function(){
//    e = new Enemy();
//    console.log(e);
    player = new Player();

    allEnemies = [];
    for (var i = 0; i < 3; i++) {
        allEnemies.push(new Enemy());

    }; 
    audio = new Audio('sounds/Eight_Bit_Hollow_Night.mp3');
    audio.play();
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


