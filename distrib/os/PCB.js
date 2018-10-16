///<reference path="../globals.ts" />
/* ------------
     memory.ts

     Requires global.ts.
     ------------ */
var TSOS;
(function (TSOS) {
    var PCB = /** @class */ (function () {
        function PCB(PID, State, PC, IR, Acc, xReg, yReg, zFlag) {
            this.PID = PID;
            this.State = State;
            this.PC = PC;
            this.IR = IR;
            this.Acc = Acc;
            this.xReg = xReg;
            this.yReg = yReg;
            this.zFlag = zFlag;
            this.PID = PID;
            this.State = "New";
            this.PC = "00";
            this.IR = IR;
            this.Acc = "00";
            this.xReg = "00";
            this.yReg = "00";
            this.zFlag = "00";
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
