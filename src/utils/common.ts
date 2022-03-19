/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
export function debounce(func: Function, wait: number, immediate = true) {
  let timeout: number | null = null;
  return function (this: Function) {
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = window.setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) func.apply(this, arguments);
    } else {
      timeout = window.setTimeout(function (this: Function) {
        func.apply(this, arguments);
      }, wait);
    }
  };
}
export function thorttle(func: Function, delay = 1000) {
  let lastTime = 0;
  let timer = 0;
  let interval = delay;
  return function (this: Function) {
    let nowTime = Date.now();
    if (lastTime && nowTime - lastTime < interval) {
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        lastTime = nowTime;
        func.apply(this, arguments);
      }, interval);
    } else {
      lastTime = nowTime;
      func.apply(this, arguments);
    }
  };
}

/**
 * @desc 文件大小计算
 * @param file 单个文件
 * @returns 文件大小
 */
export function fileSize(file: File) {
  if (file.size < 1024) return file.size + "bytes";
  else if (file.size >= 1024 && file.size < 1048576)
    return (file.size / 1024).toFixed(1) + "KB";
  else if (file.size >= 1048576) return (file.size / 1048576).toFixed(1) + "MB";
}
