var EggToMars = EggToMars || {};

EggToMars.PreloadState = {
  preload: function() {


    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bar');
    this.preloadBar.anchor.setTo(0.5);
    this.preloadBar.scale.setTo(100, 1);

    this.load.setPreloadSprite(this.preloadBar);


//load Start Asset
    this.load.image('background', 'assets/images/background.png');
    this.load.image('egg', 'assets/images/egg.png');
    this.load.bitmapFont('fat-and-tiny', 'assets/images/fat-and-tiny.png', 'assets/images/fat-and-tiny.xml');


//load Game Asset

  
    this.load.image('arrowButton', 'assets/images/arrowButton.png');    
    this.load.image('slow', 'assets/images/slow.png');    
    this.load.image('speed', 'assets/images/speed.png');    
    this.load.image('health', 'assets/images/health.png');    

    this.load.spritesheet('player', 'assets/images/player_spritesheet.png', 32, 32);    

    this.load.image('tileset', 'assets/images/tileset.png');
    this.load.image('goal', 'assets/images/goal.png');
    
    this.load.tilemap('maplevel', 'assets/data/maplevel.json', null, Phaser.Tilemap.TILED_JSON);
    
   
  },
  create: function() {
    this.state.start('Start');
  }
};