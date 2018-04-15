var TURTLETALE = TURTLETALE || {};

TURTLETALE.Player = function(state, x, y, data) {
  Phaser.Sprite.call(this, state.game, x, y, 'player');
  //Phaser.Sprite.call(this, state.game, x, y, 'attack_snakebite');

  this.state = state;
  this.game = state.game;
  this.data = Object.create(data);;
  this.anchor.setTo(0.5);


  //add energy health
  this.healthBar = new Phaser.Sprite(state.game, this.x, this.y, 'bar');
  this.game.add.existing(this.healthBar);
  this.healthBar.anchor.setTo(0.5);
  this.refreshHealthbar();


  //walking animation
  this.animations.add('walk', [0,1,2,3,2,1], 7, false);
  this.animations.add('attack', [4,5,6,7,8,9,10,11,12,13,14,15,16,17], 15, false);
  

  //enable physics
  this.game.physics.arcade.enable(this);
   this.game.physics.arcade.enable(this.healthBar);
};

TURTLETALE.Player.prototype = Object.create(Phaser.Sprite.prototype);
TURTLETALE.Player.prototype.constructor = TURTLETALE.Player;

TURTLETALE.Player.prototype.collectItem = function(item) {
  //two types of items, quest items and consumables
  if(item.data.isQuest) {
    this.data.items.push(item);

    //check quest completion
    this.checkQuestCompletion(item);
  }
  else {
    //consumable items

    //add properties
    this.data.health += item.data.health ? item.data.health : 0;
    this.data.attack += item.data.attack ? item.data.attack : 0;
    this.data.defense += item.data.defense ? item.data.defense : 0;
    this.data.eggs += item.data.eggs ? item.data.eggs : 0;
    this.data.speed += item.data.speed ? item.data.speed : 0;
    this.playerSpeed += this.data.speed;
    //refresh stats
    this.state.refreshStats();
  }
  item.kill();
},

TURTLETALE.Player.prototype.checkQuestCompletion = function(item) {
  var i = 0;
  var len = this.data.quests.length;

  while(i < len) {
    if(this.data.quests[i].code == item.data.questCode) {
      this.data.quests[i].isCompleted = true;
      console.log(this.data.quests[i].name + ' has been completed');
      break;
    }
    i++;
  }
},
TURTLETALE.Player.prototype.refreshHealthbar = function() {
  this.healthBar.scale.setTo(this.data.health ,0.5);
},

TURTLETALE.Player.prototype.update = function() {
  this.healthBar.x = this.x;
  this.healthBar.y = this.y - 25;

  this.healthBar.body.velocity = this.body.velocity;
};