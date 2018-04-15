var EggToMars = EggToMars || {};

//setting game configuration and loading the assets for the loading screen
EggToMars.BootState = {
  init: function() {
    //loading screen will have a white background
    this.game.stage.backgroundColor = '#fff';  
    
    //scaling options
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    
    //have the game centered horizontally
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    //physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);    
  },
  preload: function() {
   //assets we'll use in the loading screen
    this.load.image('bar', 'assets/images/preloader-bar.png'); 


    //this.load.image('bar', 'assets/images/2dbars/elve_bar.png');
  },
  create: function() {
    this.state.start('Preload');
  }
};