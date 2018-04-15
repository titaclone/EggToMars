var EggToMars = EggToMars || {};

EggToMars.EndState = {

  create: function() {
      
    this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background');    
    
    this.background.autoScroll(0, 30);


    var result = this.add.bitmapText(this.world.centerX, 100, 'fat-and-tiny', 'Lost', 30);
    result.anchor.x = 0.5;
    result.smoothed = false;
    result.tint = 0xff0000;

    var start = this.add.bitmapText(this.world.centerX, this.world.centerY + 60, 'fat-and-tiny', 'CLICK TO PLAY AGAIN!', 40);
    start.anchor.x = 0.5;
    start.smoothed = false;
    start.tint = 0xff0000;

    this.background.inputEnabled = true;
    this.background.events.onInputDown.add(function(){
      this.state.start('Game');
    }, this);


  }
};