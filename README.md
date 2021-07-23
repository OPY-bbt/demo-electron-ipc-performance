# demo-electron-ipc-performance

观察 Electron 主进程和渲染进程卡住对页面的影响。
在主进程文件 index.js 和 渲染进程文件 inline.js 中有 loop 函数用于模拟 CPU 密集任务。

在 inline.js 中每秒钟会更新时间（js 执行），css动画（合成线程工作）。

### 结果发现：
inline.js 中的 loop，会导致 js 执行卡住，合成线程无影响。
index.js  中的 loop，不会影响渲染进程js和合成线程，但是会block住鼠标事件，也无法滚动页面。

### IPC：
在 Electron3 中 使用 ipc 从 渲染进程发送大数据（16MB）到主进程会导致渲染进程js和合成线程卡住

在 Electron13 中没有此问题
