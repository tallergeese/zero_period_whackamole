var game;

$(document).ready(initializeGame);

function initializeGame(){
	game = new whackamole("#gameArea",2);
	game.init();
}

function whackamole(gameArea,moleCount){
	this.domGameElement = $(gameArea);
	this.statsObject;
	this.moleCount = moleCount;
	this.moles = [];
	this.score = 0;
	this.gameIsRunning = false;
	this.init = function(){
		this.createMole();
	}
	this.startGame = function(){
		for(var i=0; i<this.moles.length; i++){
			this.moles[i].startGame();
		}
		this.score = 0;
		this.gameIsRunning=true;
	}
	this.endGame = function(){
		this.gameIsRunning= false;
	}
	this.handleMoleClick = function(clickedMole){
		if(this.gameIsRunning){
			this.score+=2;
			clickedMole.handleHit();
			console.log('current score is '+this.score);
		} else {
			console.log('no score accrued, game is not running');
		}
	}
	this.createMole = function(){
		for(var i=0; i<this.moleCount; i++){
			var newMole = new this.mole(this);
			this.moles.push(newMole);
			this.domGameElement.append(newMole.createElement());
		}
	}
	//definition for mole object
	this.mole = function(parent){
		this.parent = parent;
		this.domMoleElement;
		this.state;  //up or down?
		this.hasBeenHit = false;
		this.createElement = function(){
			this.domMoleElement = $("<div>",{
				class: 'mole'
			});
			this.domMoleElement.click(this.handleClick.bind(this));
			return this.domMoleElement;
		}
		this.startGame = function(){
			this.hasBeenHit=false;
		}
		this.handleClick = function(someNumber, someString){
			console.log('mole was hit');
			if(!this.hasBeenHit){
				this.parent.handleMoleClick(this);
			}
		}
		this.handleHit = function(){
			this.hasBeenHit = true;
		}
	}

}






