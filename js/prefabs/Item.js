var TURTLETALE = TURTLETALE || {};

TURTLETALE.Item = function(state, x, y, key,data) {
  Phaser.Sprite.call(this, state.game, x, y, key);

  this.state = state;
  this.game = state.game;
  this.data = Object.create(data);;
  this.anchor.setTo(0.5);
  

    //make properties numbers
  this.data.attack = +this.data.attack;
  this.data.defense = +this.data.defense;
  this.data.health = +this.data.health;
  this.data.eggs = +this.data.eggs;
  this.data.speed = +this.data.speed;
  this.playerSpeed+= this.data.speed;

  //enable physics
  this.game.physics.arcade.enable(this);
};

TURTLETALE.Item.prototype = Object.create(Phaser.Sprite.prototype);
TURTLETALE.Item.prototype.constructor = TURTLETALE.Item;