export type World = Boolean[][];

export function createWorld(width: number, height: number): World {
  const world: World = [];
  for (let x = 0; x < width; x++) {
    const column: Boolean[] = [];
    for (let y = 0; y < height; y++) {
      column.push(false);
    }
    world.push(column);
  }
  return world;
}

export function worldDimensions(world: World) {
  return [world.length, world[0]?.length || 0];
}

export function setLiveCells(world: World, coordinateArray: number[][]) {
  for (let [x, y] of coordinateArray) {
    world[x][y] = true;
  }
}

export function toggleCell(world: World, x: number, y: number) {
  world[x][y] = !world[x][y];
}

export function safelyGet(world: World, x: number, y: number) {
  const [width, height] = worldDimensions(world);
  if (x < 0 || x >= width || y < 0 || y >= height) return false;
  else return world[x][y];
}

export function liveNeighborCount(world: World, x: number, y: number) {
  let count = 0;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      const neighborX = x + dx;
      const neighborY = y + dy;
      if (neighborX === x && neighborY === y) continue;
      if (safelyGet(world, neighborX, neighborY)) {
        count++;
      }
    }
  }
  return count;
}

export function nextGeneration(world: World): World {
  const [width, height] = worldDimensions(world);
  const newWorld = createWorld(width, height);

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const liveNeighbors = liveNeighborCount(world, x, y);
      if (world[x][y]) {
        if (liveNeighbors >= 2 && liveNeighbors <= 3) {
          newWorld[x][y] = true;
        }
      } else {
        if (liveNeighbors === 3) {
          newWorld[x][y] = true;
        }
      }
    }
  }

  return newWorld;
}

export function drawWorld(world: World, canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");
  if (!context) return;

  context.clearRect(0, 0, canvas.width, canvas.height);

  const [worldWidth, worldHeight] = worldDimensions(world);
  const cellWidth = Math.floor(canvas.width / worldWidth);
  const cellHeight = Math.floor(canvas.height / worldHeight);

  for (let x = 0; x < worldWidth; x++) {
    const canvasX = x * cellWidth;
    for (let y = 0; y < worldHeight; y++) {
      const canvasY = y * cellHeight;

      if (!world[x][y]) {
        context.strokeStyle = "#AAAAAA";
        context.strokeRect(canvasX, canvasY, cellWidth, cellHeight);
        continue;
      }

      context.fillStyle = "green";
      context.fillRect(canvasX, canvasY, cellWidth, cellHeight);

      context.strokeStyle = "red";
      context.strokeRect(canvasX, canvasY, cellWidth, cellHeight);
    }
  }
}

function xIfLive(world: World, x: number, y: number) {
  if (world[x][y]) return "x";
  return " ";
}

export function worldToString(
  world: World,
  fn: (world: World, x: number, y: number) => string = xIfLive
) {
  let str = "";
  const [width, height] = worldDimensions(world);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      str += fn(world, x, y);
    }
    str += "\n";
  }
  return str;
}

export function defaultWorld() {
  let world = createWorld(40, 40);
  setLiveCells(world, [
    [9, 9],
    [9, 10],
    [9, 11],
    [10, 10],
  ]);
  return world;
}
