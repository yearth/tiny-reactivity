const { reactive, effect } = require("@vue/reactivity");

const a = reactive({
  number: 10
});
let b;

effect(() => {
  b = a.number + 10;
  console.log(b);
});

a.number = 20;
