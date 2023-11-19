import { worldDimensions, type World } from "./world.js";

function calcCell_numbers(
  canvasWidth: number,
  canvasHeight: number,
  worldWidth: number,
  worldHeight: number,
  mouseX: number,
  mouseY: number
) {
  const x = Math.floor((mouseX / canvasWidth) * worldWidth);
  const y = Math.floor((mouseY / canvasHeight) * worldHeight);
  return { x, y };
}

export function calcCell(
  canvas: HTMLCanvasElement,
  world: World,
  event: MouseEvent
) {
  const canvasX = canvas.getBoundingClientRect().x;
  const canvasY = canvas.getBoundingClientRect().y;
  const [worldWidth, worldHeight] = worldDimensions(world);
  const hoverCell = calcCell_numbers(
    canvas.width,
    canvas.height,
    worldWidth,
    worldHeight,
    event.x - canvasX,
    event.y - canvasY
  );
  return hoverCell;
}
