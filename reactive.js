const isObject = (value) => typeof value === "object" && value !== null;
const toReactive = (value) => (isObject(value) ? reactive(value) : value);

function reactive(target, isReadonly) {
  if (!isObject(target)) {
    console.log("isObject错误", target);
    return target;
  }
  if (isReadonly) {
    console.log("isReadonly", target);
    return readonly(target);
  }
  const proxy = new Proxy(target, {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver);
      console.log('reactive get:',key,result);
      return toReactive(result);
    },
    set(target, key, value, receiver) {
      console.log("reactive set:", key, value);
      return Reflect.set(target, key, value, receiver);
    },
  });
  return proxy;
}
function createRef(value) {
  return new Ref(value);
}

class Ref {
  _value;
  constructor(value) {
    this._value = toReactive(value);
  }
  get value() {
    // console.log("ref get:", this._value);
    return this._value;
  }
  set value(newValue) {
    // console.log("ref set:", newValue);
    this._value = toReactive(newValue);
  }
}

// ref 基础类型
// const baseRef = createRef(1);
// baseRef.value;
// baseRef.value = 2;

// ref 对象 const shallowObj = { foo: { bar: 1 } };
const objRef = createRef({ foo: { bar: 1 } });
objRef.value.foo.a = 1