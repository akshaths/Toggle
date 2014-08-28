var subField = [];
var rotation = 0;
var blockType = 0;

var position = {
	x: 0,
	y: 0
};

function intializeBlockArray() {
	// 4x4 array
	for (var i = 0; i < 4; i++) {
		subField[i] = [];
		for (var j = 0; j < 4; j++) {
			subField[i][j] = new GameSquare();
		}
	}
}

function highestBlock() {
	for (var i = 0; i < mainGame.grid.width; i++) {
		for (var j = 0; j < mainGame.grid.height; j++) {
			if (mainGame.grid.squares[i + j * mainGame.grid.width].hasTetris) {
				return i + j * mainGame.grid.width;
			}
		}
	}
	return -1;
}

function createNextBlock() {
	//new tetromino
	var i = Math.floor((Math.random() * 7) + 1);
	blockType = i;
	rotation = 0;
	if (i === 1) { // O
		subField[1][1].hasTetris = true;
		subField[1][2].hasTetris = true;
		subField[2][1].hasTetris = true;
		subField[2][2].hasTetris = true;
	} else if (i === 2) { // Y
		subField[3][0].hasTetris = true;
		subField[3][1].hasTetris = true;
		subField[3][2].hasTetris = true;
		subField[3][3].hasTetris = true;
	} else if (i === 3) { // T
		subField[2][0].hasTetris = true;
		subField[2][1].hasTetris = true;
		subField[2][2].hasTetris = true;
		subField[1][1].hasTetris = true;
	} else if (i === 4) { // L
		subField[2][0].hasTetris = true;
		subField[2][1].hasTetris = true;
		subField[2][2].hasTetris = true;
		subField[1][2].hasTetris = true;
	} else if (i === 5) { // J
		subField[1][0].hasTetris = true;
		subField[2][0].hasTetris = true;
		subField[2][1].hasTetris = true;
		subField[2][2].hasTetris = true;
	} else if (i === 6) { // S
		subField[2][0].hasTetris = true;
		subField[2][1].hasTetris = true;
		subField[1][1].hasTetris = true;
		subField[1][2].hasTetris = true;
	} else if (i === 7) { // Z
		subField[1][0].hasTetris = true;
		subField[1][1].hasTetris = true;
		subField[2][1].hasTetris = true;
		subField[2][2].hasTetris = true;
	}
}

function collision(direction) {
	for (var j = 0; j < 4; j++) {
		for (var k = 0; k < 4; k++) {
			if (subField[k][j].hasTetris) {
				var index = j + position.x + (k + position.y + 1) * mainGame.grid.width + direction;
				if (index < mainGame.grid.width * mainGame.grid.height && mainGame.grid.squares[index].hasTetris) {
						return true;
				}
			}
		}
	}

	return false;
}

function collidesWithWalls(direction) {
	for (var j = 0; j < 4; j++) {
		for (var k = 0; k < 4; k++) {
			if (position.x + direction < leftestIndex() - 1 || position.x + direction > rightestIndex() - 1) {
				return true;
			}
		}
	}

	return false;
}

function moveRight() {
	var validMove = true;
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (collidesWithWalls(1)) {
				validMove = false;
			}
			if (collision(1)) {
				validMove = false;
			}
		}
	}
	if (validMove) {
		position.x = position.x + 1;
	}
}

function place() {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var index = (position.x + i) + (position.y + j) * this.mainGame.grid.width;
			if (index < mainGame.grid.width * mainGame.grid.height) {
				this.mainGame.grid.squares[index].hasTetris = subField[j][i].hasTetris || this.mainGame.grid.squares[index].hasTetris;
			}
		}
	}
	clearField();
	position.x = 0;
	position.y = 0;
	createNextBlock();
}

function leftestIndex() {
	var leftest = 3;
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (subField[i][j].hasTetris && i < leftest) {
				leftest = i;
			}
		}
	}
	return leftest;
}

function rightestIndex() {
	var rightest = 8;
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (subField[i][j].hasTetris && i > rightest) {
				rightest = i;
			}
		}
	}
	return rightest;
}

function bottomIndex() {
	var bottomest = 1;
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (subField[i][j].hasTetris && j > bottomest) {
				bottomest = j;
			}
		}
	}
	return bottomest + position.y;
}

function moveLeft() {
	var validMove = true;
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (collidesWithWalls(-1)) {
				validMove = false;
			} else if (collision(-1)) {
				validMove = false;
			}

		}
	}
	if (validMove) {
		position.x = position.x - 1;
	}
}

function naturalFall() {
	var validMove = true;
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (collision(0)) {
				validMove = false;
				place();
			}
		}
	}
	if (validMove) {
		if (bottomIndex() > mainGame.grid.height - 2) {
			place();
		}
		this.position.y++;
	}
}

function tetris() {
	var startSquares = [];
	var isTetris;
	var rowTetris;

	for (var i = 0; i < mainGame.grid.squares.length; i++) {
		if (i % mainGame.grid.width === 0) {
			startSquares.push(mainGame.grid.squares[i]);
		}
	}

	for (var i = 0; i < startSquares.length; i++) {
		isTetris = true;
		for (var j = 0; j < mainGame.grid.width; j++) {
			if (!mainGame.grid.squares[i * mainGame.grid.width + j].hasTetris) {
				isTetris = false;
			}
		}
		if (isTetris) {
			rowTetris = i;
		}
	}
	if (isTetris) {
		for (var j = 0; j < mainGame.grid.width; j++) {
			mainGame.grid.squares[rowTetris * mainGame.grid.width + j].hasTetris = false;
		}

		for (var i = rowTetris - 1; i >= 0; i--) {
			for (var j = 0; j < mainGame.grid.width; j++) {
				if (mainGame.grid.squares[i * mainGame.grid.width + j].hasTetris) {
					mainGame.grid.squares[i * mainGame.grid.width + j].hasTetris = false;
					mainGame.grid.squares[(i + 1) * mainGame.grid.width + j].hasTetris = true;
				}
			}
		}
		mainGame.score += 133;
		$("#score").html(mainGame.score);
	}
}

function rotateClockwise() {
	clearField();

    if (rotation % 360 === 0) {
        if (blockType === 1) {
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
        } else if (blockType === 2) {
            subField[0][1].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[3][1].hasTetris = true;
        } else if (blockType === 3) {
            subField[0][1].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][1].hasTetris = true;
        } else if (blockType === 4) {
            subField[0][1].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
        } else if (blockType === 5) {
            subField[0][1].hasTetris = true;
            subField[0][2].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[2][1].hasTetris = true;
        } else if (blockType === 6) {
            subField[0][1].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][2].hasTetris = true;
        } else if (blockType === 7) {
            subField[0][2].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][1].hasTetris = true;
        }
    } else if (rotation % 360 === 90) {
        if (blockType ===  1) {
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
        } else if (blockType === 2) {
            subField[3][0].hasTetris = true;
            subField[3][1].hasTetris = true;
            subField[3][2].hasTetris = true;
            subField[3][3].hasTetris = true;
        } else if (blockType === 3) {
            subField[1][0].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][1].hasTetris = true;
        } else if (blockType === 4) {
            subField[1][0].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][0].hasTetris = true;
        } else if (blockType === 5) {
            subField[1][0].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][2].hasTetris = true;
        } else if (blockType === 6) {
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
        } else if (blockType === 7) {
            subField[2][2].hasTetris = true;
            subField[1][0].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[2][1].hasTetris = true;
        }
    } else if (rotation % 360 === 180) {
        if (blockType ===  1) {
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
        } else if (blockType === 2) {
            subField[0][2].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[3][2].hasTetris = true;
        } else if (blockType === 3) {
            subField[0][1].hasTetris = true;
            subField[1][0].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[2][1].hasTetris = true;
        } else if (blockType === 4) {
            subField[0][0].hasTetris = true;
            subField[0][1].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[2][1].hasTetris = true;
        } else if (blockType === 5) {
            subField[0][1].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
        } else if (blockType === 6) {
            subField[0][0].hasTetris = true;
            subField[1][0].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[2][1].hasTetris = true;
        } else if (blockType === 7) {
            subField[0][1].hasTetris = true;
            subField[1][0].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[2][0].hasTetris = true;
        }
    } else if (rotation % 360 === 270) {
        if (blockType === 1) {
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
        } else if (blockType === 2) {
            subField[3][0].hasTetris = true;
            subField[3][1].hasTetris = true;
            subField[3][2].hasTetris = true;
            subField[3][3].hasTetris = true;
        } else if (blockType === 3) {
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[1][1].hasTetris = true;
        } else if (blockType === 4) {
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[1][2].hasTetris = true;
        } else if (blockType === 5) {
            subField[1][0].hasTetris = true;
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
        } else if (blockType === 6) {
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
        } else if (blockType === 7) {
            subField[1][0].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
        }
    }

	rotation = rotation + 90;
}

function clearField() {
	for (var j = 0; j < 4; j++) {
		for (var k = 0; k < 4; k++) {
			subField[j][k].hasTetris = false;
		}
	}
}
