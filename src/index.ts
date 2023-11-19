import { calcCell } from "./canvas-events.js";
import { createTimer } from "./timer.js";
import {
  createWorld,
  drawWorld,
  nextGeneration,
  setLiveCells,
  toggleCell,
} from "./world.js";

const canvas = document.getElementById("main-canvas") as HTMLCanvasElement;
const advanceButton = document.getElementById(
  "advance-button"
) as HTMLButtonElement;
const playPauseButton = document.getElementById(
  "play-pause-button"
) as HTMLButtonElement;
const delayInput = document.getElementById(
  "advance-delay-input"
) as HTMLInputElement;

// setup world
let world = createWorld(40, 40);
setLiveCells(world, [
  [9, 9],
  [9, 10],
  [9, 11],
  [10, 10],
]);

// setup app variables
const timer = createTimer();
timer.setDelay(500);

// initial draw
drawWorld(world, canvas);
delayInput.value = `${timer.getDelay()}`;

function advance() {
  world = nextGeneration(world);
  drawWorld(world, canvas);
}

timer.setTimerFunc(advance);

function handlePlayPause() {
  if (timer.isRunning()) {
    timer.stop();
    playPauseButton.innerHTML = "play";
  } else {
    timer.start();
    playPauseButton.innerHTML = "pause";
  }
}

function handleCanvasClick(event: MouseEvent) {
  const cell = calcCell(canvas, world, event);
  toggleCell(world, cell.x, cell.y);
  drawWorld(world, canvas);
}

function handleDelayChange(event: Event) {
  if (!("target" in event && event.target)) return;
  const target = event.target as HTMLInputElement;
  timer.setDelay(Number(target.value));
}

advanceButton.onclick = advance;
playPauseButton.onclick = handlePlayPause;
canvas.onclick = handleCanvasClick;
delayInput.onchange = handleDelayChange;
