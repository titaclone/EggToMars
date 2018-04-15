var EggToMars = EggToMars || {};

EggToMars.StartState = {

  create: function() {
      
    this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background');    
    
    this.background.autoScroll(0, 30);

    var logo = this.add.sprite( this.world.centerX - 25,this.world.centerY -150,'egg');
    logo.scale.setTo(2);

    var title = this.add.bitmapText(this.world.centerX, 100, 'fat-and-tiny', 'Egg To Mars', 30);
    title.anchor.x = 0.5;
    title.smoothed = false;
    title.tint = 0x00ff00;

    var start = this.add.bitmapText(this.world.centerX, this.world.centerY + 60, 'fat-and-tiny', 'CLICK TO PLAY!', 40);
    start.anchor.x = 0.5;
    start.smoothed = false;
    start.tint = 0xff0000;

    this.background.inputEnabled = true;
    this.background.events.onInputDown.add(function(){
      this.state.start('Game');
    }, this);


  }
};