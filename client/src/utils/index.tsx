export function loadMore(element: any, callback: any) {
  function _loadMore() {
    let clientHieght = element.clientHeight;
    let scrollTop = element.scrollTop;
    let scrollHeight = element.scrollHeight;
    if (clientHieght + scrollTop + 10 >= scrollHeight) {
      callback();
    }
  }
  element.addEventListener("scroll", debounce(_loadMore, 300));
}

export function downRefresh() {}

export function debounce(fn: any, wait: number) {
  let timeout: any = null;
  return function () {
    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(fn, wait);
  };
}

export function throttle(func: any, delay: number) {
  var prev = Date.now();
  return function () {
    var self = this;
    var args = arguments;
    var now = Date.now();
    if (now - prev >= delay) {
      func.apply(self.args);
      prev = Date.now();
    }
  };
}

export const store = {
  set(key: string, val: string) {
    sessionStorage.setItem(key, val);
  },
  get(key: string) {
    return sessionStorage.getItem(key);
  },
};
