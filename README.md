##简介
一个预加载类,利用`image()`对象实现.

##依赖
- **[jquery](http://)**: 异步加载需使用到jquery的`load()`方法

##使用

###new NZPreload(options)
实例化并传入配置参数.

**parameters**:
- **`options`**: `[object]` `[可选]`
  - **`onProgress`**: `[function] `预绑定`progress`事件.
  - **`onComplete`**: `[function] `预绑定`complete`事件.

**example**:
```javascript
var preload = new NZPreload({
    onProgress: function (e) {
        e.taskId//[number] 队列id.
        e.progress//[number] 队列完成度(百分比).
    },
    onComplete: function (e) {
        e.taskId//[number] 队列id.
    }
});
```
---
###.on(event,listener)
后绑定事件,传入事件名称及监听函数.

**parameters**:
- **`event`**: `[string]` 事件名称,可选值如下:
  - **`progress`**: 某个队列某个图片加载完成时触发.
  - **`complete`**: 某个队列全部图片加载完成时触发.
- **`listener`**: `[function]`

**example**:

```javascript
preload.on("progress",function(e){
    //code
});
preload.on("complete",function(e){
    //code
});
```
---

###.load(url)
根据传入的图片路径(字符串或字符串数组)加载图片,每次调用都会产生一个加载队列,可以同时存在多个加载队列,该方法会返回一个`taskId[number]`标识该队列.
注意,此方法返回值是`number`类型,不能链式调用.

**parameters**:
- **`url`**: `[string/array[string]]` 图片路径.

**return**:
- **`taskId`**: `[number]` 新加载的队列id.

**example**:
```javascript
var taskId,taskId2;
preload.on("progress",function(e){
    switch(e.taskId){
        case taskId:
            cnosole.log("progress for task " + taskId);
            break;
        case taskId2:
            cnosole.log("progress for task " + taskId2);
            break;
        default:
    }
});
taskId = preload.load("images/1.png");//加载并获取taskId.
taskId2 = preload.load([//加载并获取taskId2.
    "images/2.png",
    "images/3.png"
]);
```

---

###.getProgress(taskId)
获取某个队列加载情况,根据传入的`taskId`返回该队列的加载进度.
注意,此方法返回值是`number`类型,不能链式调用.

**parameters**:
- **`taskId`**: `[number]` taskId

**return**:
- **`progress`**: `[number]` 完成度.

**example**:
```javascript
var taskId = preload.load([//加载并获取taskId.
    "images/2.png",
    "images/3.png"
]);
console.log(preload.getProgress(taskId));//加载情况
```
---

###.isCompleted(taskId)
根据传入的`taskId`判断该队列是否已加载完成.
注意,此方法返回值是`boolean`类型,不能链式调用.

**parameters**:
- **`taskId`**: `[number]` `可选` taskId

**return**:
- **`progress`**: `[number]` 完成度.

**example**:
```javascript
console.log(preload.isCompleted(taskId));//是否加载完成
```
---


##支持

支持**`html5`**&**`css3`**的浏览器
