const vendor = (function() {
  class MazeRenderer {
    constructor(maze, tileSize, ctx, canvasWidth, canvasHeight) {
      if (!maze || !maze.length) {
        throw 'Maze must be a non-empty 2D array!';
      }
      this.maze = maze;
      this.tileSize = tileSize;
      this.ctx = ctx;
      this.cW = canvasWidth;
      this.cH = canvasHeight;
      this.rowCount = maze.length;
      this.columnCount = maze[0].length;
      this.toPaint = [];
    }
    renderMaze(startingTile, goalTile) {
      const [startC, startR] = startingTile;
      const [goalC, goalR] = goalTile;
      const {
        maze,
        ctx,
        cW,
        cH,
        tileSize,
        rowCount,
        columnCount
      } = this;
      
      if (!maze[startR][startC]) {
        throw 'Starting point must be on an empty tile!';
      }
      if (!maze[goalR][goalC]) {
        throw 'Goal point must be on an empty tile!';
      }

      ctx.translate((cW / 2) - ((columnCount >> 1) * tileSize), (cH / 2) - ((rowCount >> 1) * tileSize));

      for (let r = 0; r < maze.length; r++) {
        const row = maze[r];
        for (let c = 0; c < row.length; c++) {
          const [x,y] = [c*tileSize,r*tileSize];
          const isEmpty = row[c];
          if (startC === c && startR === r) {
            ctx.fillStyle = COLORS.START;
          } else if ( goalC === c && goalR === r) {
            ctx.fillStyle = COLORS.GOAL;
          } else {
            ctx.fillStyle = isEmpty ? COLORS.PATH : COLORS.BARRIER;
          }
          ctx.fillRect(x, y, tileSize, tileSize);
        }
      }

      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    paintTile(tile) {
      this.toPaint.push({ tile, num: this.toPaint.length });
      const {
        ctx,
        cW,
        cH,
        tileSize,
        rowCount,
        columnCount
      } = this;

      setTimeout(() => {
        const tileToPaint = this.toPaint.shift();
        ctx.translate((cW / 2) - ((columnCount >> 1) * tileSize), (cH / 2) - ((rowCount >> 1) * tileSize));

        ctx.fillStyle = COLORS.PAINT;
        ctx.beginPath();
        // ctx.arc(...tileToPaint.map(coord => ((coord * tileSize) + 25)), 10, 0, Math.PI * 2);
        ctx.font = `${tileSize / 2}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText(
          tileToPaint.num,
          tileToPaint.tile[0] * tileSize + (tileSize / 2),
          tileToPaint.tile[1] * tileSize + (tileSize * 2 / 3)
        );
        ctx.fill();

        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }, this.toPaint.length * 100);
    }
  }
  return {
    MazeRenderer,
  };
})();

