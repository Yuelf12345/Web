const isObject = (value) => typeof value === "object" && value !== null;
const toReactive = (value) => (isObject(value) ? reactive(value) : value);

function reactive(target, isReadonly) {
  if (!isObject(target)) {
    console.log("isObject错误", target);
    return target;
  }
  if (isReadonly) {
    console.log("isReadonly", target);
    return target;
  }
  const proxy = new Proxy(target, {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver);
      console.log("reactive get:", key, result);
      return toReactive(result);
    },
    set(target, key, value, receiver) {
      console.log("reactive set:", key, value);
      return Reflect.set(target, key, value, receiver);
    },
  });
  return proxy;
}

function ref(value) {
  return createRef(value, false);
}
function shallowRef(value) {
  return createRef(value, true);
}
function createRef(value, shallow) {
  return new Ref(value, shallow);
}

class Dep {
  subs = [];

  track(sub) {
    // this.subs.push(sub);
  }

  trigger() {
    // this.subs.forEach((sub) => sub.update());
  }
}

class Ref {
  _value;

  dep = new Dep();

  constructor(value, isShallow) {
    this._value = isShallow ? value : toReactive(value);
  }
  get value() {
    // console.log("ref get:", this._value);
     this.dep.track()
    return this._value;
  }
  set value(newValue) {
    // console.log("ref set:", newValue);
    this.dep.trigger()
    this._value = toReactive(newValue);
  }
}

// ref 基础类型
// const baseRef = createRef(1);
// baseRef.value;
// baseRef.value = 2;

// ref 对象 const shallowObj = { foo: { bar: 1 } };
// const objRef = createRef({ foo: { bar: 1 } });
// objRef.value.foo.a = 1

// reactive 基础类型
// const baseReactive = reactive(1);
const objReactive = reactive({ foo: { bar: 1 } });
objReactive.foo.a = 1;
