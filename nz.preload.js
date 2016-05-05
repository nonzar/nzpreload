/**
 * Created by nonzar on 16/4/28.
 */
var NZPreload = function (opations) {
    NZPreload.prototype.__E = [["progress", "onProgress"], ["complete", "onComplete"]];
    this.__event = {};
    this.__files = [];
    if (opations) {
        //绑定事件
        for (var i = 0; i < this.__E.length; i++) {
            this.on(this.__E[i][0], opations[this.__E[i][1]]);
        }
    }
    return;
}
NZPreload.prototype.on = function (event, listener) {
    if (!event || !listener) {
        return this;
    }
    if (!this.__event[event]) {
        this.__event[event] = [];
    }
    this.__event[event].push(listener);
    return this;
}
NZPreload.prototype.__triggerEvent = function (event, args) {
    if (this.__event[event]) {
        for (var i = 0; i < this.__event[event].length; i++) {
            this.__event[event][i].apply(this, args);
        }
    }
    return this;
}
NZPreload.prototype.getProgress = function (taskId) {
    var len = 0;
    for (var i = 0; i < this.__files[taskId].length; i++) {
        if (this.__files[taskId][i].completed) {
            len++;
        }
    }
    return len / this.__files[taskId].length;
}
NZPreload.prototype.isCompleted = function (taskId) {
    if (this.getProgress(taskId) >= 1) {
        return true;
    }
    return false;
}
NZPreload.prototype.load = (function () {
    return function (files, callback) {
        if (!files) {
            return;
        }
        switch (typeof(files)) {
            case "string":
                files = [files];
                break;
            case "object":
                if (!(files instanceof Array)) {
                    return this;
                }
                break;
            default:
                return this;
        }
        this.__files.push([]);
        var taskId = this.__files.length - 1;
        for (var i = 0; i < files.length; i++) {
            this.__files[taskId].push({
                taskId: taskId,
                url: files[i],
                completed: false,
                image: new Image()
            });
            this.__files[taskId][i].image.addEventListener("load", function (idx) {
                this.__files[taskId][idx].completed = true;
                this.__triggerEvent("progress", [{
                    taskId: taskId,
                    progress: this.getProgress(taskId)
                }]);
                if (this.isCompleted(taskId)) {
                    this.__triggerEvent("complete", [{
                        taskId: taskId
                    }]);
                    if (typeof(callbak) == "function") {
                        callback.apply(this);
                    }
                }
            }.bind(this, i), false);
        }
        for (var i = 0; i < files.length; i++) {
            this.__files[taskId][i].image.src = this.__files[taskId][i].url;
            console.log(this.__files[taskId][i].image.complete);
        }
        return taskId;
    }
})();
var module = module || {exports: null}
module.exports = NZPreload;