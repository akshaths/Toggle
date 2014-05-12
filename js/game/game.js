function Game()
{
	this.canvasOffsetX = 0;
	this.canvasOffsetY = 0;
	this.squareWidth = 50;
	this.squareHeight = 50;
	this.canvasWidth = 0;
	this.canvasHeight = 0;
	this.score = 0;
	this.grid = new GameGrid(this);
	this.input = new GameInput();
	this.ctx = $('#game-canvas')[0].getContext('2d');
	this.previousSquare = 0;
	this.word = [];

	this.currentSquare = 0;
	this.previousSquare = 0;

	this.alphabetPoints = [1,3,3,3,1,3,2,4,2,5,4,3,4,2,2,2,9,2,2,2,4,4,3,9,4,11];
}

Game.prototype.update = function()
{
	this.input.update();
	tetris();
};

Game.prototype.draw = function()
{
	this.ctx.fillStyle = '#ADADAD';
	this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
	this.grid.draw(this.ctx);
};

Game.prototype.handleMouseInput = function(x, y)
{
	if (this.input.frameMouseStates[0])
	{
		this.grid.compilationUpdate(this.grid.getSquareIndex(x, y));
	}
};

Game.prototype.setUpCanvas = function()
{
	this.ctx.canvas.width = this.squareWidth * this.grid.width + this.grid.borderSize;
	this.ctx.canvas.height = this.squareHeight * this.grid.height + this.grid.borderSize;
	this.canvasWidth = this.ctx.canvas.width;
	this.canvasHeight = this.ctx.canvas.height;
};

Game.prototype.addLetter = function(prevSquareIndex, currSquareIndex)
{
	if (currSquareIndex === undefined)
	{
		this.word.push(this.grid.squares[prevSquareIndex]);
		this.grid.squares[prevSquareIndex].isSelected = true;
		return;
	}
	if(this.grid.checkSquare(currSquareIndex) && this.grid.isAdjacent(prevSquareIndex, currSquareIndex))
	{
		this.word.push(this.grid.squares[currSquareIndex]);
		this.grid.squares[currSquareIndex].isSelected = true;
	}
};

Game.prototype.clearWord = function()
{
	this.word = [];
	this.grid.clearSelected();
};

Game.prototype.updateScore = function()
{
	if (this.isWord())
	{
		for (var i = 0; i < this.word.length; i++)
		{
			var letter = this.word[i].letter;
			var asciiCode = letter.charCodeAt(0);
			this.score += this.alphabetPoints[asciiCode - 65] * 15;
		}

		$('#score').html(this.score);
	}
};

Game.prototype.isWord = function()
{
	var wordString = "";
	for (var i = 0; i < this.word.length; i++)
	{
		if (i === 0)
		{
			wordString += this.word[i].letter;
		}
		else
		{
			wordString += this.word[i].letter.toLowerCase();
		}
	}
	return dict.indexOf(wordString) !== -1;
};

function tick()
{
	if (!mainGame.input.frameMouseStates[0])
	{
		mainGame.clearWord();
	}
	mainGame.update();
	mainGame.draw();
}
