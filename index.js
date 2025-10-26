const Minesweeper = (function() {

    var images = [
        'assets/nothing.png',
        'assets/1.png',
        'assets/2.png',
        'assets/3.png',
        'assets/4.png',
        'assets/5.png',
        'assets/6.png',
        'assets/7.png',
        'assets/8.png',
        'assets/mine.png',
        'assets/unknow.png',
        'assets/flag.png',
    ];

    var mines = generateMines(32, 32, 0.15);

    function createMinefield(width, height) {
        let minefield = [];
        for (let y = 0; y < height; y++) {
            minefield[y] = [];
            for (let x = 0; x < width; x++) {
                minefield[y][x] = { type: 10 };
            }
        }
        return minefield;
    }

    function generateMines(width, height, prop) {
        var n = Math.ceil(width * height * prop);
        var mines = [];
        for (var i = 0; i < height; i++) { //y
            mines[i] = [];
            for (var j = 0; j < width; j++) //x
                mines[i][j] = 0;
        }
        for (var k = 0; k < n; k++) {
            var rdmX = Math.floor(Math.random() * width);
            var rdmY = Math.floor(Math.random() * height);
            if (mines[rdmY][rdmX] == 1) k--;
            else mines[rdmY][rdmX] = 1;
        }
        return mines;
    }

    function demine(minefield, x, y) {
        x = +x;
        y = +y;
        if (minefield[y][x].type != 10) return;
        if (mines[y][x] == 0) {
            var value = 0;
            for (let i = Math.max(0, y - 1); i <= Math.min(mines.length - 1 , y + 1); i++) {
                for (let j = Math.max(0, x - 1); j <= Math.min(mines[i].length - 1, x + 1); j++) {
                    if (mines[i][j] == 1)
                        value++;
                }
            }
            minefield[y][x].type = value;
            if (value == 0) {
                for (let i = Math.max(0, y - 1); i <= Math.min(mines.length - 1 , y + 1); i++)
                    for (let j = Math.max(0, x - 1); j <= Math.min(mines[i].length - 1, x + 1); j++)
                        setTimeout(function() {
                            demine(minefield, j, i);
                        }, 100);
            }
        } else {
            minefield[y][x].type = 9
            alert("C'est perdu !\nActualise la page pour réessayer");
        }
    }

    function flag(minefield, x, y) {
        if (minefield[y][x].type == 10)
            minefield[y][x].type = 11;
        else if (minefield[y][x].type == 11)
            minefield[y][x].type = 10;
    }

    return {
        images,
        createMinefield,
        demine,
        flag
    };
})();