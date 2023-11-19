export function createTimer() {
  let delay = 500;
  let fn = () => {};
  let started = false;

  function getDelay() {
    return delay;
  }

  function setDelay(newDelay: number) {
    delay = newDelay;
  }

  function recursiveRun() {
    if (!started) return;
    fn();
    setTimeout(recursiveRun, delay);
  }

  function start() {
    if (started) return;
    started = true;
    recursiveRun();
  }

  function stop() {
    started = false;
  }

  function setTimerFunc(timerFunc: () => void) {
    fn = timerFunc;
  }

  function isRunning() {
    return started;
  }

  return { getDelay, setDelay, start, stop, setTimerFunc, isRunning };
}
