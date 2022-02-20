/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
export function debounce(func, wait, immediate = true) {
  let timeout = null;
  return function () {
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) func.apply(this, arguments);
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
  };
}
export function thorttle(fn, delay = 1000) {
  let lastTime = "";
  let timer = "";
  let interval = delay;
  return function () {
    let args = arguments;
    let nowTime = Date.now();
    if (lastTime && nowTime - lastTime < interval) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        lastTime = nowTime;
        fn.apply(this, args);
      }, interval);
    } else {
      lastTime = nowTime;
      fn.apply(this, args);
    }
  };
}
