
// ENEMY
var Enemy = Object.create(Transform);
Enemy.prototype.constructor = Enemy;

var Enemy = function () {
    this.position = [Rand(-100,-10), Rand(50,180)];
    this.speed = Rand(50,180);
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    
    if(dt !== 0){
        this.position = [this.position[0] + this.speed * dt, this.position[1]];
        //console.log(this.position); 
        };
    
    if( this.position[0] > 550){
        this.reset();
        };
};

Enemy.prototype.reset = function() {
    this.position = [Rand(-100,-10), Rand(50,180)];
}

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.position[0], this.position[1]);
};
// END ENEMY


// PLAYER

var Player = function() {

    this.position = [];
    this.sprite = 'images/char-boy.png';
};

Player.prototype.handleInput = function(key){
    
};


Player.prototype.update = function(dt) {

};
// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
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
var player
var allEnemies
var Main = function(){
    
    player = new Player();

    allEnemies = [];
    for (var i = 0; i < 2; i++) {
        allEnemies.push(new Enemy());
    };  
};
// END MAIN

Main();

