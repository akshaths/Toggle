function gameSquare(i)
{
  	this.index = i;
	this.hasTetris = true;
	this.isSelected = false;
	this.letter = String.fromCharCode(Math.floor((Math.random() * 26) + 1) + 64);
	this.selectedColor = '#00ff00';
	this.borderColor = '#1DAEEF';
	this.color = '#9E9E9E';
}
