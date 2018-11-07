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
            console.log("Context Switch");
            if (_PCB != null) {
                _PCB.State = "Waiting";
                _ReadyQueue.enqueue(_PCB);
            }
            _PCB = _ReadyQueue.dequeue();
            _CPU.PC = _PCB.PC;
            _CPU.IR = _PCB.IR;
            _CPU.Acc = _PCB.Acc;
            _CPU.Xreg = _PCB.xReg;
            _CPU.Yreg = _PCB.yReg;
            _CPU.Zflag = _PCB.zFlag;
        };
        CPUScheduler.prototype.step = function () {
            this.currentCount = this.currentCount + 1;
            if ((this.currentCount >= quantum) && (_ReadyQueue.getSize() > 0)) {
                this.contextSwitch();
                this.currentCount = 0;
            }
        };
        return CPUScheduler;
    }());
    TSOS.CPUScheduler = CPUScheduler;
})(TSOS || (TSOS = {}));
