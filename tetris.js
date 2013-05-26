var subField = new Array();
var savedState = new Array();
var rotation = 0;
var blockType = 0;

var position = {
	x: 0,
	y: 0,
};

function intializeBlockArray()
{
	//4x4 array
	subField = new Array(4);
	for (var i = 0; i < 4; i++)
	{  
		subField[i] = new Array(4);
	}

	for (var j = 0; j < 4; j++)
	{
		for(var k = 0; k < 4; k++)
		{
			subField[j][k] = new gameSquare();
		}
	}

	savedState = subField;
}

function createNextBlock()
{
    //new tetromino
    var i = Math.floor((Math.random() * 7) + 1);
    blockType = i;
    rotation = 0;
    if (i == 1) //O
    {
        subField[1][1].hasTetris = true;
        subField[1][2].hasTetris = true;
        subField[2][1].hasTetris = true;
        subField[2][2].hasTetris = true;
    }    
    else if (i == 2) //I
    {
        subField[1][0].hasTetris = true;
        subField[1][1].hasTetris = true;
        subField[1][2].hasTetris = true;
        subField[1][3].hasTetris = true;
    }
    else if (i == 3) //T
    {
        subField[2][0].hasTetris = true;
        subField[2][1].hasTetris = true;
        subField[2][2].hasTetris = true;
        subField[1][1].hasTetris = true;
    }
    else if (i == 4) //L
    {
        subField[2][0].hasTetris = true;
        subField[2][1].hasTetris = true;
        subField[2][2].hasTetris = true;
        subField[1][2].hasTetris = true;
    }
    else if (i == 5) //J
    {
        subField[1][0].hasTetris = true;
        subField[2][0].hasTetris = true;
        subField[2][1].hasTetris = true;
        subField[2][2].hasTetris = true;
    }
    else if (i == 6) //S
    {
        subField[2][0].hasTetris = true;
        subField[2][1].hasTetris = true;
        subField[1][1].hasTetris = true;
        subField[1][2].hasTetris = true;
    }
    else if (i == 7) //Z
    {
        subField[1][0].hasTetris = true;
        subField[1][1].hasTetris = true;
        subField[2][1].hasTetris = true;
        subField[2][2].hasTetris = true;
    }

	//new tetromino
	var i = Math.floor((Math.random() * 7) + 1);
	blockType = i;
	rotation = 0;
	if (i == 1) //O
	{
		subField[1][1].hasTetris = true;
		subField[1][2].hasTetris = true;
		subField[2][1].hasTetris = true;
		subField[2][2].hasTetris = true;
	}    
	else if (i == 2) //I
	{
		subField[1][0].hasTetris = true;
		subField[1][1].hasTetris = true;
		subField[1][2].hasTetris = true;
		subField[1][3].hasTetris = true;
	}
	else if (i == 3) //T
	{
		subField[2][0].hasTetris = true;
		subField[2][1].hasTetris = true;
		subField[2][2].hasTetris = true;
		subField[1][1].hasTetris = true;
	}
	else if (i == 4) //L
	{
		subField[2][0].hasTetris = true;
		subField[2][1].hasTetris = true;
		subField[2][2].hasTetris = true;
		subField[1][2].hasTetris = true;
	}
	else if (i == 5) //J
	{
		subField[1][0].hasTetris = true;
		subField[2][0].hasTetris = true;
		subField[2][1].hasTetris = true;
		subField[2][2].hasTetris = true;
	}
	else if (i == 6) //S
	{
		subField[2][0].hasTetris = true;
		subField[2][1].hasTetris = true;
		subField[1][1].hasTetris = true;
		subField[1][2].hasTetris = true;
	}
	else if (i == 7) //Z
	{
		subField[1][0].hasTetris = true;
		subField[1][1].hasTetris = true;
		subField[2][1].hasTetris = true;
		subField[2][2].hasTetris = true;
	}
}

function collision()
{
	for (var j = 0; j < 4; j++)
	{
		for(var k = 0; k < 4; k++)
		{
			if (subField[j][k].hasTetris == true)
			{
				if (mainGame.grid.squares[j + position.x + (k + position.y) * mainGame.grid.width].hasTetris && subField[j][k].hasTetris || position.x < 0 || position.x > mainGame.grid.width - 4)
					return true;
			}
		}
	}

	return false;
}

function moveRight()
{
	var validMove = true;
	for (var i = 0; i < 4; i++)
	{
		for(var j = 0; j < 4; j++)
		{
			if (collision(position.x, position.y) || ((position.x + i) + (position.y + j) * mainGame.grid.width) >= (mainGame.grid.width / mainGame.grid.squareWidth))
				validMove = false;
		}
	}

	if (validMove == true)
	{
		position.x = position.x + 1;
		writeState(position.x, position.y);
	}
	else
		revertState();
}

function moveLeft()
{
	var validMove = true;
	for (var i = 0; i < 4; i++)
	{
		for(var j = 0; j < 4; j++)
		{
			if (collision())
				validMove = false;
		}
	}

	if (validMove == true)
	{
		position.x = position.x - 1;
		writeState(position.x, position.y);
	}
	else
		revertState();
}

function naturalFall()
{
	var validMove = true;
	for (var i = 0; i < 4; i++)
	{
		for(var j = 0; j < 4; j++)
		{
			if (collision() == true)
				validMove = false;
		}
	}
    if (validMove == true)
    {
        writeState(position.x, position.y + 1);
    }
    else
        revertState();

	if (validMove == true)
	{
		position.y = position.y + 1;
		writeState(position.x, position.y);
	}
	else
		revertState();
}

function writeState()
{
	for (var i = 0; i < 4; i++)
	{
		for(var j = 0; j < 4; j++)
		{
			mainGame.grid[i + position.x  + (j + position.y) * mainGame.grid.width] = subField[i][j];
			[position.x + (j + position.y) * mainGame.grid.width].hasTetris = false;
			saveState();
		}
	}
}

function saveState()
{
	savedState = subField.slice(0);
}

function revertState()
{
	subField = savedState.slice(0);
}

function rotateClockwise()
{
	subField.clearField();

    if (rotation % 360 == 0)
    {
        if (blockType == 1)
        {
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
        }
        else if (blockType == 2)
        {
            subField[0][2].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[3][2].hasTetris = true;
        }
        else if (blockType == 3)
        {
            subField[1][1].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
        else if (blockType == 4)
        {
            subField[1][1].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[3][1].hasTetris = true;
            subField[3][2].hasTetris = true;
        }
        else if (blockType == 5)
        {
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
        else if (blockType == 6)
        {
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
        }
        else if (blockType == 7)
        {
            subField[1][0].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
        }
    }
    else if (rotation % 360 == 90)
    {
        if (blockType ==  1)
        {
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
        }
        else if (blockType == 2)
        {
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[2][3].hasTetris = true;
        }
        else if (blockType == 3)
        {
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
        else if (blockType == 4)
        {
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[3][0].hasTetris = true;
        }
        else if (blockType == 5)
        {
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[3][2].hasTetris = true;
        }
        else if (blockType == 6)
        {
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[3][0].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
        else if (blockType == 7)
        {
            subField[1][0].hasTetris = true;
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
    }
    else if (rotation % 360 == 180)
    {
        if (blockType ==  1)
        {
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
        }
        else if (blockType == 2)
        {
            subField[0][1].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
        else if (blockType == 3)
        {
            subField[1][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][0].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
        else if (blockType == 4)
        {
            subField[1][0].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
        else if (blockType == 5)
        {
            subField[1][1].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[3][0].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
        else if (blockType == 6)
        {
            subField[1][0].hasTetris = true;
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[3][2].hasTetris = true;
        }
        else if (blockType == 7)
        {
            subField[1][1].hasTetris = true;
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[3][0].hasTetris = true;
        }
    }
    else if (rotation % 360 == 270)
    {
        if (blockType == 1)
        {
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
        }
        else if (blockType == 2)
        {
            subField[1][0].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[1][3].hasTetris = true;
        }
        else if (blockType == 3)
        {
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[1][1].hasTetris = true;
        }
        else if (blockType == 4)
        {
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[1][2].hasTetris = true;
        }
        else if (blockType == 5)
        {
            subField[1][0].hasTetris = true;
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
        }
        else if (blockType == 6)
        {
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
        }
        else if (blockType == 7)
        {
            subField[1][0].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
        }
    }
    rotation = rotation + 90;

	if (rotation % 360 == 0)
	{
		if (blockType == 1)
		{
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
		}
		else if (blockType == 2)
		{
			subField[0][2].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[3][2].hasTetris = true;
		}
		else if (blockType == 3)
		{
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
		else if (blockType == 4)
		{
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[3][1].hasTetris = true;
			subField[3][2].hasTetris = true;
		}
		else if (blockType == 5)
		{
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
		else if (blockType == 6)
		{
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
		}
		else if (blockType == 7)
		{
			subField[1][0].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
		}
	}
	else if (rotation % 360 == 90)
	{
		if (blockType == 1)
		{
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
		}
		else if (blockType == 2)
		{
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[2][3].hasTetris = true;
		}
		else if (blockType == 3)
		{
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
		else if (blockType == 4)
		{
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[3][0].hasTetris = true;
		}
		else if (blockType == 5)
		{
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[3][2].hasTetris = true;
		}
		else if (blockType == 6)
		{
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[3][0].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
		else if (blockType == 7)
		{
			subField[1][0].hasTetris = true;
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
	}
	else if (rotation % 360 == 180)
	{
		if (blockType == 1)
		{
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
		}
		else if (blockType == 2)
		{
			subField[0][1].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
		else if (blockType == 3)
		{
			subField[1][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][0].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
		else if (blockType == 4)
		{
			subField[1][0].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
		else if (blockType == 5)
		{
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[3][0].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
		else if (blockType == 6)
		{
			subField[1][0].hasTetris = true;
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[3][2].hasTetris = true;
		}
		else if (blockType == 7)
		{
			subField[1][1].hasTetris = true;
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[3][0].hasTetris = true;
		}
	}
	else if (rotation % 360 == 270)
	{
		if (blockType == 1)
		{
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
		}
		else if (blockType == 2)
		{
			subField[1][0].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[1][3].hasTetris = true;
		}
		else if (blockType == 3)
		{
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[1][1].hasTetris = true;
		}
		else if (blockType == 4)
		{
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[1][2].hasTetris = true;
		}
		else if (blockType == 5)
		{
			subField[1][0].hasTetris = true;
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
		}
		else if (blockType == 6)
		{
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
		}
		else if (blockType == 7)
		{
			subField[1][0].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
		}
	}
	rotation = rotation + 90;
}

function rotateCounterClockwise()
{
	clearField();
	if (rotation % 360 == 0)
	{
		if (blockType == 1)
		{
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
		}
		else if (blockType == 2)
		{
			subField[1][0].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[1][3].hasTetris = true;
		}
		else if (blockType == 3)
		{
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[1][1].hasTetris = true;
		}
		else if (blockType == 4)
		{
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[1][2].hasTetris = true;
		}
		else if (blockType == 5)
		{
			subField[1][0].hasTetris = true;
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
		}
		else if (blockType == 6)
		{
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
		}
		else if (blockType == 7)
		{
			subField[1][0].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
		}
	}
	else if (rotation % 360 == 90)
	{
		if (blockType == 1)
		{
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
		}
		else if (blockType == 2)
		{
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[2][3].hasTetris = true;
		}
		else if (blockType == 3)
		{
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
		else if (blockType == 4)
		{
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[3][0].hasTetris = true;
		}
		else if (blockType == 5)
		{
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[3][2].hasTetris = true;
		}
		else if (blockType == 6)
		{
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[3][0].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
		else if (blockType == 7)
		{
			subField[1][0].hasTetris = true;
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
	}
	else if (rotation % 360 == 180)
	{
		if (blockType == 1)
		{
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
		}
		else if (blockType == 2)
		{
			subField[0][1].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
		else if (blockType == 3)
		{
			subField[1][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][0].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
		else if (blockType == 4)
		{
			subField[1][0].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
		else if (blockType == 5)
		{
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[3][0].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
		else if (blockType == 6)
		{
			subField[1][0].hasTetris = true;
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[3][2].hasTetris = true;
		}
		else if (blockType == 7)
		{
			subField[1][1].hasTetris = true;
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[3][0].hasTetris = true;
		}
	}
	else if (rotation % 360 == 270)
	{
		if (blockType == 1)
		{
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
		}
		else if (blockType == 2)
		{
			subField[0][2].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[3][2].hasTetris = true;
		}
		else if (blockType == 3)
		{
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
		else if (blockType == 4)
		{
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[3][1].hasTetris = true;
			subField[3][2].hasTetris = true;
		}
		else if (blockType == 5)
		{
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
		else if (blockType == 6)
		{
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
		}
		else if (blockType == 7)
		{
			subField[1][0].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
		}
	}
	rotation = rotation - 90;
}


function clearField()
{
	for (var j = 0; j < 4; j++)
	{
		for(var k = 0; k < 4; k++)
		{
			subField[j][k].hasTetris = false;
		}
	}
}
