let currentEffect;

class Dep {
  constructor() {
    this.effects = new Set();
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

export function watchEffect(effect) {
  currentEffect = effect;
  effect();
  currentEffect = null;
}

const targetMap = new WeakMap();

function getDep(target, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }

  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Dep();
    depsMap.set(key, dep);
  }
  return dep;
}

export function reactive(raw) {
  return new Proxy(raw, {
    /**
     * 依赖收集
     * @param {*} target
     * @param {*} key
     * @returns
     */
    get(target, key) {
      const dep = getDep(target, key);
      dep.depend();

      return Reflect.get(target, key);
    },

    /**
     * 触发更新
     * @param {*} target
     * @param {*} key
     * @param {*} value
     * @returns
     */
    set(target, key, value) {
      const dep = getDep(target, key);
      const result = Reflect.set(target, key, value);
      dep.notify();
      return result;
    }
  });
}
