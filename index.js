import { reactive, watchEffect } from "./core/reactivity/index.js";

const user = reactive({
  name: "Alex",
  age: 18
});

// 开开脑洞，b 可以是任意东西，包括视图
let b;
watchEffect(() => {
  b = user.age * 2;
  console.log("enter effect: name, b = double age", user.name, b);
});

user.name = "alice";
user.age = 20;
