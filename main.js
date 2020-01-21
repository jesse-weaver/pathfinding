(() => {
  function tkey(tile) {
    return tile.join('-');
  }

  function inMaze(maze, tile) {
    return maze[tile[1]] && maze[tile[1]][tile[0]] || false;
  }

  function canMoveToTile(maze, tile) {
    const [column, row] = tile;
    return maze[row] && maze[row][column];
  }

  const visited = {};

  function traverseMaze(maze, startTile, goalTile, renderer) {
    // FILL THIS OUT

    // if this is the goal tile return and stop
    if ((startTile[0] === goalTile[0] && startTile[1] === goalTile[1])) {
      throw new Error('I made it!');
    }

    // start at startTile
    // begin attempt to move each direction
    const [x, y] = startTile;
    const tileUp = [x, y - 1];
    const tileDown = [x, y + 1];
    const tileLeft = [x - 1, y];
    const tileRight = [x + 1, y];
    const tilesToTry = [tileLeft, tileRight, tileUp, tileDown];

    // check if my the desired tile is in the maze
    tilesToTry.forEach((tile) => {
      if (inMaze(maze, tile) === true
        && typeof visited[tkey(tile)] === 'undefined'  // check if I have already been to this tile before  
        && canMoveToTile(maze, tile)) // check if the desired tile is empty and I can move there
        {
          // if I can move there put an item on a stack to indicate I have been there
          renderer.paintTile(tile);
          visited[tkey(tile)] = true;

          // if not goal tile then repeat
          return traverseMaze(maze, tile, goalTile, renderer);
        }
    });
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
