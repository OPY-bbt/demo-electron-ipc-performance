const { ipcRenderer } = require("electron");
const data = require("./data.json");

const btn = document.body.querySelector("button");
const time = document.body.querySelector(".time");

setInterval(() => {
  time.innerHTML = new Date();
}, 1000);

btn.addEventListener("click", () => {
  console.log("render process click");
  ipcRenderer.send("message", data);
  //   loop();
});

ipcRenderer.on("reply", (event, arg) => {
  console.log(arg);
});

const loop = () => {
  const now = Date.now();

  while (Date.now() - now < 5 * 1000) {}

  console.log("loop end");
};
