///<reference path="../globals.ts" />
/* ------------
     memory.ts

     Requires global.ts.
     ------------ */
var TSOS;
(function (TSOS) {
    var PCB = /** @class */ (function () {
        function PCB(PID, State, PC, IR, Acc, xReg, yReg, zFlag, priority, partition) {
            this.PID = PID;
            this.State = State;
            this.PC = PC;
            this.IR = IR;
            this.Acc = Acc;
            this.xReg = xReg;
            this.yReg = yReg;
            this.zFlag = zFlag;
            this.priority = priority;
            this.partition = partition;
            this.PID = PID;
            this.State = State;
            this.PC = 0;
            this.IR = IR;
            this.Acc = 0;
            this.xReg = 0;
            this.yReg = 0;
            this.zFlag = 0;
            this.priority = priority;
            this.partition = partition;
        }
        PCB.prototype.update = function (State, PC, IR, Acc, xReg, yReg, zFlag) {
            this.State = State;
            this.PC = PC;
            this.IR = IR;
            this.Acc = Acc;
            this.xReg = xReg;
            this.yReg = yReg;
            this.zFlag = zFlag;
        };
        return PCB;
    }());
    TSOS.PCB = PCB;
})(TSOS || (TSOS = {}));
