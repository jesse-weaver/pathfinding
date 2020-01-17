(() => {
  function tkey(tile) {
    return tile.join('-');
  }

  function inMaze(maze, tile) {
    return maze[tile[1]] && maze[tile[1]][tile[0]];
  }

  function traverseMaze(maze, startTile, goalTile, renderer) {
    const visitedTiles = {};

    (function recurse(tile) {
      const [col, row] = tile;
      const [gCol, gRow] = goalTile;
      if (!inMaze(maze, tile) || visitedTiles[tkey(tile)]) {
        return false;
      }
      renderer.paintTile(tile);
      visitedTiles[tkey(tile)] = true;
      if (row === gRow && col === gCol) {
        return true;
      }
      const translations = [
        [1,0],
        [0,-1],
        [0,1],
        [-1,0]
      ];
      for (let i = 0; i < translations.length; i++) {
        const t = translations[i];
        const translatedT = [col + t[0], row + t[1]];
        if (inMaze(maze, translatedT)) {
          let reachedGoal = recurse(translatedT);
          if (reachedGoal) {
            return true;
          }
        }
      }
      return false;
    })(startTile);
  }

  function main() {
    const {
      clientWidth,
      clientHeight,
    } = document.body;
    const canvas = document.getElementById('gl-canvas');
    canvas.width = clientWidth;
    canvas.height = clientHeight;

    const ctx = canvas.getContext('2d');

    ctx.fillStyle = COLORS.BARRIER;
    ctx.fillRect(0, 0, clientWidth, clientHeight);

    const startTile = [0, 2];
    const goalTile = [8, 6];
    const renderer = new vendor.MazeRenderer(mazes.maze1, 100, ctx, clientWidth, clientHeight);
    renderer.renderMaze(startTile, goalTile);

    traverseMaze(mazes.maze1, startTile, goalTile, renderer);
  }

  main();

  window.onresize = main;
})();
