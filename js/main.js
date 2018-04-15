var EggToMars = EggToMars || {};

EggToMars.game = new Phaser.Game(360, 592, Phaser.AUTO);



EggToMars.game.state.add('Boot', EggToMars.BootState); 
EggToMars.game.state.add('Preload', EggToMars.PreloadState); 
EggToMars.game.state.add('Game', EggToMars.GameState);
EggToMars.game.state.add('Start', EggToMars.StartState);
EggToMars.game.state.add('End', EggToMars.EndState);


EggToMars.game.state.start('Boot'); 
