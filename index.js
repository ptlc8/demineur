class Minesweeper {

    static images = [
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

    constructor(width = 10, height = 10, mineProportion = 0.15) {
        this.minefield = [];
        for (let y = 0; y < height; y++) {
            this.minefield[y] = [];
            for (let x = 0; x < width; x++) {
                this.minefield[y][x] = { type: 10 };
            }
        }
        if (mineProportion >= 0.8)
            mineProportion = 0.8;
        this.mineCount = Math.ceil(width * height * mineProportion);
        this.mines = null;
        this.alive = true;
    }

    generateMines(startX, startY) {
        const width = this.minefield[0].length;
        const height = this.minefield.length;
        this.mines = [];
        for (var i = 0; i < height; i++) { // y
            this.mines[i] = [];
            for (var j = 0; j < width; j++) // x
                this.mines[i][j] = 0;
        }
        for (var k = 0; k < this.mineCount; k++) {
            var rdmX = Math.floor(Math.random() * width);
            var rdmY = Math.floor(Math.random() * height);
            if (this.mines[rdmY][rdmX] == 1)
                k--;
            else if (Math.abs(rdmX - startX) <= 1 && Math.abs(rdmY - startY) <= 1)
                k--;
            else
                this.mines[rdmY][rdmX] = 1;
        }
    }

    demine(x, y) {
        if (!this.alive) return;
        if (this.mines == null) {
            this.generateMines(x, y);
        }
        x = +x;
        y = +y;
        if (this.minefield[y][x].type != 10) return;
        if (this.mines[y][x] == 0) {
            var value = 0;
            for (let i = Math.max(0, y - 1); i <= Math.min(this.mines.length - 1 , y + 1); i++) {
                for (let j = Math.max(0, x - 1); j <= Math.min(this.mines[i].length - 1, x + 1); j++) {
                    if (this.mines[i][j] == 1)
                        value++;
                }
            }
            this.minefield[y][x].type = value;
            if (value == 0) {
                for (let i = Math.max(0, y - 1); i <= Math.min(this.mines.length - 1 , y + 1); i++)
                    for (let j = Math.max(0, x - 1); j <= Math.min(this.mines[i].length - 1, x + 1); j++)
                        setTimeout(() => {
                            this.demine(j, i);
                        }, 100);
            }
        } else {
            this.minefield[y][x].type = 9
            this.alive = false;
            alert("C'est perdu !\nActualise la page pour réessayer");
        }
    }

    flag(x, y) {
        if (!this.alive) return;
        if (this.minefield[y][x].type == 10)
            this.minefield[y][x].type = 11;
        else if (this.minefield[y][x].type == 11)
            this.minefield[y][x].type = 10;
    }
}