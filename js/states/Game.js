var EggToMars = EggToMars || {};

EggToMars.GameState = {

  init: function(currentLevel) {    
    
    this.game.physics.arcade.gravity.y = 1000

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.game.world.setBounds(0,0,360,700);

    this.RUNNING_SPEED = 180;

    this.levelSpeed = 350;
    this.playerSpeed = 10;

    this.astroWallPool = this.add.group();

    this.health = 3;

    this.healths = this.add.group();
    this.speeds = this.add.group();
    this.slows = this.add.group();


   
  },
  create: function() {   

    //create a tilemap object
    this.map = this.add.tilemap('maplevel'); 
    //join the tile images to the json data     
    this.map.addTilesetImage('tileset'); 
    //create tile layers
    this.backgroundLayer = this.map.createLayer('backgroundLayer');

    this.collisionLayer = this.map.createLayer('collisionLayer');
    


    //send background to the back
    this.game.world.sendToBack(this.backgroundLayer);
    
    //collision layer
    this.map.setCollisionBetween(1,80, true, 'collisionLayer');
    //this.map.setCollisionByExclusion([7, 32, 35, 36, 47])
    
    //resize the world to fit the layer
    this.collisionLayer.resizeWorld();

    //create player
    //this.goal = this.add.sprite(150, 31000, 'goal');
    this.player = this.add.sprite(150, 31984, 'player');
    this.player.anchor.setTo(0.5);
    this.player.animations.add('walking', [0,1,2, 1], 6, true);
    this.game.physics.arcade.enable(this.player);
    this.player.customParams = {};
    this.player.body.collideWorldBounds = true;

    this.comet = this.add.sprite(200,30000,"goal");

   this.game.camera.follow(this.player);


   

    this.createOnscreenControls();

     //Comets
    //this.comets = this.add.group();
    //this.loadComets();
    this.loadHealth();
    this.loadSpeed();
    this.loadSlow();

    
  },   
  update: function() {  

   this.game.physics.arcade.collide(this.player, this.ground);
  //this.game.physics.arcade.collide(this.player, this.platforms);
  //this.game.physics.arcade.collide(this.player, this.astrowall);
   //player can't walk through walls
   var period = this.time.now * 0.008;
      var radius = 60;
      this.comet.x = 200 + Math.cos(period) * radius;
      this.comet.y = 30000 + Math.sin(period) * radius;

    this.game.physics.arcade.collide(this.player, this.collisionLayer,this.checkbounce, null, this);
    this.game.physics.arcade.collide(this.player, this.comet,this.checkbounce, null, this);
    

    this.healths.forEach(function(element){

      //this.game.physics.arcade.overlap(this.player, element,this.updateHealth(element), null, this);

    }, this);    


    this.player.body.velocity.y = -this.levelSpeed;
    //this.player.body.velocity.y = 0;
    this.player.body.velocity.x = 0;
    this.player.play('walking');

    if(this.cursors.left.isDown || this.player.customParams.isMovingLeft) {
      this.player.body.velocity.x = -this.RUNNING_SPEED;
      //this.player.scale.setTo(1, 1);
      //this.player.play('walking');
    }
    else if(this.cursors.right.isDown || this.player.customParams.isMovingRight) {
      this.player.body.velocity.x = this.RUNNING_SPEED;
      //this.player.scale.setTo(-1, 1);
      //this.player.play('walking');
    }
   else {
      //this.player.animations.stop();
      //this.player.frame = 1;

   }

    

   

  },
  createOnscreenControls: function(){
    this.leftArrow = this.add.button(20, 535, 'arrowButton');
    this.rightArrow = this.add.button(110, 535, 'arrowButton');
    //this.actionButton = this.add.button(280, 535, 'actionButton');

    this.leftArrow.alpha = 0.5;
    this.rightArrow.alpha = 0.5;
    //this.actionButton.alpha = 0.5;

    this.leftArrow.fixedToCamera = true;
    this.rightArrow.fixedToCamera = true;

    //left
    this.leftArrow.events.onInputDown.add(function(){
      this.player.customParams.isMovingLeft = true;
    }, this);

    this.leftArrow.events.onInputUp.add(function(){
      this.player.customParams.isMovingLeft = false;
    }, this);

    this.leftArrow.events.onInputOver.add(function(){
      this.player.customParams.isMovingLeft = true;
    }, this);

    this.leftArrow.events.onInputOut.add(function(){
      this.player.customParams.isMovingLeft = false;
    }, this);

    //right
    this.rightArrow.events.onInputDown.add(function(){
      this.player.customParams.isMovingRight = true;
    }, this);

    this.rightArrow.events.onInputUp.add(function(){
      this.player.customParams.isMovingRight = false;
    }, this);

    this.rightArrow.events.onInputOver.add(function(){
      this.player.customParams.isMovingRight = true;
    }, this);

    this.rightArrow.events.onInputOut.add(function(){
      this.player.customParams.isMovingRight = false;
    }, this);
  },
  killPlayer: function(player, powerup) {
    console.log('auch!');
    EggToMars.game.state.start('End');
  },
  win: function(player, goal) {
    alert('you win!');
    this.state.start('End');
  },

  findObjectsByType: function(targetType, tilemap, layer){
    var result = [];
    
    tilemap.objects[layer].forEach(function(element){
      if(element.properties.type == targetType) {
        element.y -= tilemap.tileHeight/2;        
        element.x += tilemap.tileHeight/2;        
        result.push(element);
      }
    }, this);
    
    return result;
  },
  loadComets: function(){
    var elementsArr = this.findObjectsByType('comet', this.map, 'objectsLayer');
    var elementObj;

    elementsArr.forEach(function(element){

      //elementObj = new EggToMars.Astre(this, element.x, element.y, 'goal');
      //create comets group
    //elementObj = this.add.sprite(element.x,element.y,"goal");
      //this.comets.add(elementObj);


    }, this);
  },
  loadHealth: function(){
    var elementsArr = this.findObjectsByType('health', this.map, 'objectsLayer');
    var elementObj;

    elementsArr.forEach(function(element){

      //elementObj = new EggToMars.Astre(this, element.x, element.y, 'goal');
      //create comets group
      elementObj = this.add.sprite(element.x,element.y,'health');
      this.game.physics.arcade.enable(elementObj);
      elementObj.body.immovable =true;
      elementObj.body.allowGravity = false;
      this.healths.add(elementObj);


    }, this);
  },

loadSpeed: function(){
    var elementsArr = this.findObjectsByType('speed', this.map, 'objectsLayer');
    var elementObj;

    elementsArr.forEach(function(element){

      //elementObj = new EggToMars.Astre(this, element.x, element.y, 'goal');
      //create comets group
      elementObj = this.add.sprite(element.x,element.y,'speed');
      this.speeds.add(elementObj);


    }, this);
  },

  loadSlow: function(){
    var elementsArr = this.findObjectsByType('slow', this.map, 'objectsLayer');
    var elementObj;

    elementsArr.forEach(function(element){

      //elementObj = new EggToMars.Astre(this, element.x, element.y, 'goal');
      //create comets group
      elementObj = this.add.sprite(element.x,element.y,'slow');
      this.slows.add(elementObj);


    }, this);
  },

  checkbounce:function(){

    if (this.health >0) {

      this.player.y += 200;
      this.health -= 1;

    }else{

      this.killPlayer();
    }
    
    //this.levelSpeed = 150;
    
  },

  updateHealth:function(sprite){

    sprite.kill();
    this.health += 1;
    console.log(this.health);
    //sprite.visible = false;

  }

 
  
  
};
