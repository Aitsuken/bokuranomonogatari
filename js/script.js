/* global monogatari */

// Define the messages used in the game.
monogatari.action ('message').messages ({
	'Help': {
		title: 'Help',
		subtitle: 'Some useful Links',
		body: `
			<p><a href='https://developers.monogatari.io/documentation/'>Documentation</a> - Everything you need to know.</p>
			<p><a href='https://monogatari.io/demo/'>Demo</a> - A simple Demo.</p>
		`
	}
});

// Define the notifications used in the game

monogatari.action ('notification').notifications ({
	'Welcome': {
		title: 'Welcome',
		body: 'This is the VN about IAAU life of a freshman',
		icon: ''
	}
});


// Define the Particles JS Configurations used in the game
monogatari.action ('particles').particles ({

});

// Define the canvas objects used in the game
monogatari.action ('canvas').objects ({

});

// Credits of the people involved in the creation of this awesome game
monogatari.configuration ('credits', {

});


// Define the images that will be available on your game's image gallery
monogatari.assets ('gallery', {

});

// Define the music used in the game.
monogatari.assets ('music', {
	'welcome':'welcome.mp3',
});

// Define the voice files used in the game.
monogatari.assets ('voices', {

});

// Define the sounds used in the game.
monogatari.assets ('sounds', {
	
});

// Define the videos used in the game.
monogatari.assets ('videos', {
	'menu':'menu.mp4',
});

// Define the images used in the game.
monogatari.assets ('images', {
	'street':'street.jpg',
});

// Define the backgrounds for each scene.
monogatari.assets ('scenes', {

});


// Define the Characters
monogatari.characters ({
	'u': {
		name: 'Neyz',
		color: '#5bcaff'
	},
	't': {
		name: 'Takumi',
		color: 'lightgreen'
	}

});

monogatari.script ({
	// The game starts here.
	'main-screen':[
		'show video menu background',
	],
	'Start': [
		'show scene #f7f6f6 with fadeIn',
		/*'show notification Welcome',*/
		/*{
			'Input': {
				'Text': 'What is your name?',
				'Validation': function (input) {
					return input.trim ().length > 0;
				},
				'Save': function (input) {
					this.storage ({
						player: {
							name: input
						}
					});
					return true;
				},
				'Revert': function () {
					this.storage ({
						player: {
							name: ''
						}
					});
				},
				'Warning': 'You must enter a name!'
			}
		},*/
		'play music welcome',
		'show image street',
		'u Hello "playerNickname", welcome to "My Irregularly Regular life in IAAU!"',
		'u You will play as Takumi, new IAAU student-freshman from IT department!',
		'u From your choices depends Takumis fate, from time to time past of characters will be revealed',
		'u Which will help you to make decisions and use yor judgment properly',
		'u We hope you have fun and enjoy our monogatari!',
		't Alright, lets do this!',
		'stop music welcome',
		'end'
		
		/*{
			'Choice': {
				'Dialog': 'y Have you already read some documentation?',
				'Yes': {
					'Text': 'Yes',
					'Do': 'jump Yes'
				},
				'No': {
					'Text': 'No',
					'Do': 'jump No'
				}
			}
		}
		*/
	],

	'Yes': [
		'y Thats awesome!',
		'y Then you are ready to go ahead and create an amazing Game!',
		'y I can’t wait to see what story you’ll tell!',
		'end'
	],

	'No': [

		'y You can do it now.',

		'show message Help',

		'y Go ahead and create an amazing Game!',
		'y I can’t wait to see what story you’ll tell!',
		'end'
	]
});