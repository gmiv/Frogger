var Entity = function(){

    this.position = {
        "x":0,
        "y":0
    };
};
Entity.prototype.render = function(ctx) {
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

Enemy.prototype.render = function() {
    
    this.render();
    
};
//Enemy.prototype.render = function() {
//    ctx.drawImage(Resources.get(this.sprite), this.position.x, this.position.y);
//};
// END ENEMY

// PLAYER
var Player = Object.create(Entity);
Player.prototype.constructor = Player;

var Player = function() {

//    this.position = [];
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
//    e = new Enemy();
//    console.log(e);
    player = new Player();

    allEnemies = [];
    for (var i = 0; i < 3; i++) {
        allEnemies.push(new Enemy());
//        console.log(allEnemies[i]);
    };  
};
// END MAIN

Main();

