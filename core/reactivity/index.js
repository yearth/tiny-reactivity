let currentEffect;

class Dep {
  constructor(val) {
    this.effects = new Set();
    this._val = val;
  }

  get value() {
    this.depend();
    return this._val;
  }

  set value(newValue) {
    this._val = newValue;
    this.notify();
  }

  /**
   * 收集依赖
   */
  depend() {
    if (currentEffect) {
      this.effects.add(currentEffect);
    }
  }

  /**
   * 触发更新
   */
  notify() {
    this.effects.forEach(effect => {
      effect();
    });
  }
}

function watchEffect(effect) {
  currentEffect = effect;
  effect();
  currentEffect = null;
}

const dep = new Dep(10);

let b;

watchEffect(() => {
  b = dep.value + 10;
  console.log("[+] enter watch effect b:", b);
});

// 值发生变化
dep.value = 20;
// dep.notify();
