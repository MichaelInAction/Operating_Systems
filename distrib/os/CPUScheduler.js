///<reference path="../globals.ts" />
/* ------------
     memory.ts

     Requires global.ts.
     ------------ */
var TSOS;
(function (TSOS) {
    var CPUScheduler = /** @class */ (function () {
        function CPUScheduler(currentCount) {
            if (currentCount === void 0) { currentCount = 0; }
            this.currentCount = currentCount;
        }
        CPUScheduler.prototype.contextSwitch = function () {
            var tempPCB = _PCB;
            if (_PCB != null) {
                _PCB.State = "Waiting";
                _ReadyQueue.enqueue(_PCB);
            }
            if (!_ReadyQueue.isEmpty()) {
                if (schedule === "rr" || schedule === "fcfs") {
                    _PCB = _ReadyQueue.dequeue();
                }
                else if (schedule === "priority") {
                    console.log("Getting priority");
                    _PCB = this.getHighestPriority();
                }
                _CPU.PC = _PCB.PC;
                _CPU.IR = _PCB.IR;
                _CPU.Acc = _PCB.Acc;
                _CPU.Xreg = _PCB.xReg;
                _CPU.Yreg = _PCB.yReg;
                _CPU.Zflag = _PCB.zFlag;
                if (_PCB.State === "On Disk") {
                    if (_ReadyQueue.getSize() >= 3) {
                        var tempPartition = tempPCB.partition;
                        _MemoryManager.swapIntoMemory(_FileSystemDeviceDriver.swapProcess(tempPCB, _PCB, _MemoryManager.getProcessFromMemory(tempPartition)), tempPartition);
                    }
                    else {
                        _MemoryManager.putIntoMemory(_FileSystemDeviceDriver.deleteProcess("-" + _PCB.PID), _PCB);
                    }
                }
            }
        };
        CPUScheduler.prototype.getHighestPriority = function () {
            console.log("getting highest priority");
            _PCB = _ReadyQueue.dequeue();
            var highestPriority = _PCB.priority;
            var highestPriorityId = _PCB.PID;
            _ReadyQueue.enqueue(_PCB);
            for (var i = 1; i < _ReadyQueue.getSize(); i++) {
                _PCB = _ReadyQueue.dequeue();
                if (highestPriority < _PCB.priority) {
                    highestPriority = _PCB.priority;
                    highestPriorityId = _PCB.PID;
                }
                _ReadyQueue.enqueue(_PCB);
            }
            console.log(_PCB.PID);
            var foundHighest = false;
            for (var i = 0; i < _ReadyQueue.getSize() - 1; i++) {
                var temp = _ReadyQueue.dequeue();
                if (temp.PID === highestPriorityId) {
                    _PCB = temp;
                    foundHighest = true;
                }
                else {
                    _ReadyQueue.enqueue(temp);
                }
            }
            if (!foundHighest) {
                _PCB = _ReadyQueue.dequeue();
            }
            return _PCB;
        };
        CPUScheduler.prototype.step = function () {
            this.currentCount = this.currentCount + 1;
            if (schedule === "rr" && ((this.currentCount >= quantum) && (_ReadyQueue.getSize() > 0))) {
                this.contextSwitch();
                this.currentCount = 0;
            }
        };
        return CPUScheduler;
    }());
    TSOS.CPUScheduler = CPUScheduler;
})(TSOS || (TSOS = {}));
