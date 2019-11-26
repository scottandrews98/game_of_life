/**
 * Scott Andrews
 * 
 * Game of Life Challenge
*/
var canvasMain = document.getElementById('myCanvas');
var canvas = canvasMain.getContext('2d');
cells = [];
canvas.strokeStyle = '#e1e1e1';
canvas.fillStyle = '#000000';

let totalCellWidth = 100;
let totalCellHeight = 100;

init();

function init() {
    // Creates initial empty array
    for (var i=0; i<totalCellWidth; i++) {
        cells[i] = [];
        for (var j=0; j<totalCellHeight; j++) {
            cells[i][j] = 0;
        }
    }

    let totalCellWidthHalved = totalCellWidth / 2;
    let totalCellHeightHalved = totalCellHeight / 2;
    
    // Prefilled cells to match the task (will always appear in middle of canvas)
    [
        //[totalCellWidthHalved, totalCellHeightHalved],[totalCellWidthHalved, totalCellHeightHalved + 1],[totalCellWidthHalved, totalCellHeightHalved - 1],

        // Optional BBC Logo
        // First B
        [50,51],[50,52],[50,53],[50,54],[50,55],[50,56],[50,57],[50,58],[50,59],[50,60],[50,61],[50,62],
        [51,62],[52,62],[53,62],[54,62],[55,62],
        [55,61],[55,60],[55,59],[55,58],
        [54,58],[53,58],[52,58],[51,58],
        [54,57],[54,56],[54,55],[54,54],[54,53],[54,52],[54,51],
        [53,51],[52,51],[51,51],

        // Second B
        [60,51],[60,52],[60,53],[60,54],[60,55],[60,56],[60,57],[60,58],[60,59],[60,60],[60,61],[60,62],
        [61,62],[62,62],[63,62],[64,62],[65,62],
        [65,61],[65,60],[65,59],[65,58],
        [64,58],[63,58],[62,58],[61,58],
        [64,57],[64,56],[64,55],[64,54],[64,53],[64,52],[64,51],
        [63,51],[62,51],[61,51],

        // Third C
        [70,56],[70,57],[70,58],
        [71,55],[72,54],[73,53],[74,52],[75,51],[76,51],[77,51],
        [71,59],[72,60],[73,61],[74,62],[75,62],[76,62],[77,62],

    ]
    .forEach(function(point) {
        // Sets selected cells to 1 which means they have colour in them.
        cells[point[0]][point[1]] = 1;
    });
    
    update();
}

// Checks cells for next render
function update() {
    
    var result = [];
    
    // Counts total neighbours for each cell
    function _countNeighbours(x, y) {
        var amount = 0;
        
        function _isFilled(x, y) {
            return cells[x] && cells[x][y];
        }
        
        if (_isFilled(x-1, y-1)) amount++;  // Top Left
        if (_isFilled(x,   y-1)) amount++;  // Top Middle
        if (_isFilled(x+1, y-1)) amount++;  // Top Right
        if (_isFilled(x-1, y  )) amount++;  // Left
        if (_isFilled(x+1, y  )) amount++;  // Right
        if (_isFilled(x-1, y+1)) amount++;  // Bottom Left
        if (_isFilled(x,   y+1)) amount++;  // Bottom Middle
        if (_isFilled(x+1, y+1)) amount++;  // Bottom Right
        
        return amount;
    }
    
    cells.forEach(function(row, x) {
        result[x] = [];
        row.forEach(function(cell, y) {
            var alive = 0,
                count = _countNeighbours(x, y);
            
            if (cell > 0) {
                alive = count === 2 || count === 3 ? 1 : 0;
            } else {
                alive = count === 3 ? 1 : 0;
            }
            
            result[x][y] = alive;
        });
    });
    
    cells = result;
    
    draw();
}


//Draw cells on canvas
function draw() {
    canvas.clearRect(0, 0, 1512, 1512);
    cells.forEach(function(row, x) {
        row.forEach(function(cell, y) {
            canvas.beginPath();
            canvas.rect(x*8, y*8, 8, 8);
            if (cell) {
                canvas.fill();
            } else {
                canvas.stroke();
            }
        });
    });
    // Updates the canvas every 120 miliseconds
    setTimeout(update, 120);
}