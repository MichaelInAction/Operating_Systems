///<reference path="../globals.ts" />
/* ------------
     memory.ts

     Requires global.ts.
     ------------ */
var TSOS;
(function (TSOS) {
    var PCB = /** @class */ (function () {
        function PCB(PID, lastMemLocation, xReg, yReg, zFlag) {
            this.PID = PID;
            this.lastMemLocation = lastMemLocation;
            this.xReg = xReg;
            this.yReg = yReg;
            this.zFlag = zFlag;
            this.PID = PID;
            this.lastMemLocation = 0;
            this.xReg = 0;
            this.yReg = 0;
            this.zFlag = 0;
        }
        PCB.prototype.init = function (PID) {
            this.PID = PID;
            this.lastMemLocation = 0;
            this.xReg = 0;
            this.yReg = 0;
            this.zFlag = 0;
        };
        PCB.prototype.update = function (lastMemLocation, xReg, yReg, zFlag) {
            this.lastMemLocation = 0;
            this.xReg = 0;
            this.yReg = 0;
            this.zFlag = 0;
        };
        return PCB;
    }());
    TSOS.PCB = PCB;
})(TSOS || (TSOS = {}));
