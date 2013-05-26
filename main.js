jQuery(function($)
{
	var canvasOffset = $('#gameCanvas').offset();
	mainGame = new game();
	
	mainGame.canvasOffsetX = canvasOffset.left;
	mainGame.canvasOffsetY = canvasOffset.top;

	$(window).mousedown(function(e)
	{
		mainGame.input.mouseDown(e.button);	
	});
	
	$(window).mousemove(function(e)
	{
		mainGame.handleMouseInput(e.clientX, e.clientY);	
	});

	$(window).mouseup(function(e)
	{
		mainGame.input.mouseUp(e.button);
		mainGame.grid.clearSelected();
	});
	mainGame.setUpCanvas();	
	
	setInterval(tick, 2);
});
