///<reference path="../globals.ts" />
///<reference path="../utils.ts" />
/* ------------
     CPU.ts

     Requires global.ts.

     Routines for the host CPU simulation, NOT for the OS itself.
     In this manner, it's A LITTLE BIT like a hypervisor,
     in that the Document environment inside a browser is the "bare metal" (so to speak) for which we write code
     that hosts our client OS. But that analogy only goes so far, and the lines are blurred, because we are using
     TypeScript/JavaScript in both the host and client environments.

     This code references page numbers in the text book:
     Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
     ------------ */
var TSOS;
(function (TSOS) {
    var Cpu = /** @class */ (function () {
        function Cpu(PC, IR, Acc, Xreg, Yreg, Zflag, isExecuting) {
            if (PC === void 0) { PC = 0; }
            if (IR === void 0) { IR = '00'; }
            if (Acc === void 0) { Acc = 0; }
            if (Xreg === void 0) { Xreg = 0; }
            if (Yreg === void 0) { Yreg = 0; }
            if (Zflag === void 0) { Zflag = 0; }
            if (isExecuting === void 0) { isExecuting = false; }
            this.PC = PC;
            this.IR = IR;
            this.Acc = Acc;
            this.Xreg = Xreg;
            this.Yreg = Yreg;
            this.Zflag = Zflag;
            this.isExecuting = isExecuting;
        }
        Cpu.prototype.init = function () {
            this.PC = 0;
            this.IR = '--';
            this.Acc = 0;
            this.Xreg = 0;
            this.Yreg = 0;
            this.Zflag = 0;
            this.isExecuting = false;
        };
        Cpu.prototype.cycle = function () {
            _Kernel.krnTrace('CPU cycle');
            // TODO: Accumulate CPU usage and profiling statistics here.
            // Do the real work here. Be sure to set this.isExecuting appropriately.
            if (this.isExecuting && ((!singleStepMode) || (singleStepMode && executeSingleStep))) {
                _PCB.State = 'Executing';
                this.IR = _PCB.IR;
                switch (this.IR) {
                    case 'A9': {
                        this.PC++;
                        this.Acc = TSOS.Utils.HexToInt(_MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1))));
                        this.PC++;
                        this.IR = _MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1)));
                        _PCB.update(_PCB.State, this.PC, this.IR, this.Acc, this.Xreg, this.Yreg, this.Zflag);
                        break;
                    }
                    case 'AD': {
                        this.PC++;
                        var temp = _MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1)));
                        this.PC++;
                        temp = _MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1))) + temp;
                        this.Acc = _MemoryManager.getValueFromMemory(TSOS.Utils.HexToInt(temp) + (256 * (_PCB.partition - 1)));
                        this.PC++;
                        this.IR = _MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1)));
                        _PCB.update(_PCB.State, this.PC, this.IR, this.Acc, this.Xreg, this.Yreg, this.Zflag);
                        break;
                    }
                    case '8D': {
                        this.PC++;
                        var temp = _MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1)));
                        this.PC++;
                        temp = _MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1))) + temp;
                        _MemoryManager.storeValueInMemory(TSOS.Utils.HexToInt(temp) + (256 * (_PCB.partition - 1)), this.Acc);
                        this.PC++;
                        this.IR = _MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1)));
                        _PCB.update(_PCB.State, this.PC, this.IR, this.Acc, this.Xreg, this.Yreg, this.Zflag);
                        break;
                    }
                    case '6D': {
                        this.PC++;
                        var temp = _MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1)));
                        this.PC++;
                        temp = _MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1))) + temp;
                        this.Acc = this.Acc + _MemoryManager.getValueFromMemory(TSOS.Utils.HexToInt(temp) + (256 * (_PCB.partition - 1)));
                        this.PC++;
                        this.IR = _MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1)));
                        _PCB.update(_PCB.State, this.PC, this.IR, this.Acc, this.Xreg, this.Yreg, this.Zflag);
                        break;
                    }
                    case 'A2': {
                        this.PC++;
                        this.Xreg = TSOS.Utils.HexToInt(_MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1))));
                        this.PC++;
                        this.IR = _MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1)));
                        _PCB.update(_PCB.State, this.PC, this.IR, this.Acc, this.Xreg, this.Yreg, this.Zflag);
                        break;
                    }
                    case 'AE': {
                        this.PC++;
                        var temp = _MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1)));
                        this.PC++;
                        temp = _MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1))) + temp;
                        this.Xreg = _MemoryManager.getValueFromMemory(TSOS.Utils.HexToInt(temp) + (256 * (_PCB.partition - 1)));
                        this.PC++;
                        this.IR = _MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1)));
                        _PCB.update(_PCB.State, this.PC, this.IR, this.Acc, this.Xreg, this.Yreg, this.Zflag);
                        break;
                    }
                    case 'A0': {
                        this.PC++;
                        this.Yreg = TSOS.Utils.HexToInt(_MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1))));
                        this.PC++;
                        this.IR = _MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1)));
                        _PCB.update(_PCB.State, this.PC, this.IR, this.Acc, this.Xreg, this.Yreg, this.Zflag);
                        break;
                    }
                    case 'AC': {
                        this.PC++;
                        var temp = _MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1)));
                        this.PC++;
                        temp = _MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1))) + temp;
                        this.Yreg = _MemoryManager.getValueFromMemory(TSOS.Utils.HexToInt(temp) + (256 * (_PCB.partition - 1)));
                        this.PC++;
                        this.IR = _MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1)));
                        _PCB.update(_PCB.State, this.PC, this.IR, this.Acc, this.Xreg, this.Yreg, this.Zflag);
                        break;
                    }
                    case 'EA': {
                        this.PC++;
                        this.IR = _MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1)));
                        _PCB.update(_PCB.State, this.PC, this.IR, this.Acc, this.Xreg, this.Yreg, this.Zflag);
                        break;
                    }
                    case '00': {
                        _PCB.State = 'Finished';
                        _StdOut.advanceLine();
                        _StdOut.putText(">");
                        _PCB.update(_PCB.State, this.PC, this.IR, this.Acc, this.Xreg, this.Yreg, this.Zflag);
                        this.isExecuting = false;
                        _MemoryManager.clearMemoryPartition(_PCB.partition);
                        _PCB = null;
                        break;
                    }
                    case 'EC': {
                        this.PC++;
                        var temp = _MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1)));
                        this.PC++;
                        temp = _MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1))) + temp;
                        var tempNum = _MemoryManager.getValueFromMemory(TSOS.Utils.HexToInt(temp) + (256 * (_PCB.partition - 1)));
                        if (tempNum === this.Xreg) {
                            this.Zflag = 1;
                        }
                        else {
                            this.Zflag = 0;
                        }
                        this.PC++;
                        this.IR = _MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1)));
                        _PCB.update(_PCB.State, this.PC, this.IR, this.Acc, this.Xreg, this.Yreg, this.Zflag);
                        break;
                    }
                    case 'D0': {
                        this.PC++;
                        var distanceToBranch = TSOS.Utils.HexToInt(_MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1))));
                        if (this.Zflag === 0) {
                            this.PC = this.PC + distanceToBranch;
                            if (this.PC >= 256) {
                                this.PC = this.PC - 256;
                            }
                        }
                        this.PC++;
                        this.IR = _MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1)));
                        _PCB.update(_PCB.State, this.PC, this.IR, this.Acc, this.Xreg, this.Yreg, this.Zflag);
                        break;
                    }
                    case 'EE': {
                        this.PC++;
                        var temp = _MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1)));
                        this.PC++;
                        temp = _MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1))) + temp;
                        _MemoryManager.incrementByteInMemory(temp + (256 * (_PCB.partition - 1)));
                        this.PC++;
                        this.IR = _MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1)));
                        _PCB.update(_PCB.State, this.PC, this.IR, this.Acc, this.Xreg, this.Yreg, this.Zflag);
                        break;
                    }
                    case 'FF': {
                        if (this.Xreg === 1) {
                            console.log("Working");
                            _StdOut.putText("" + this.Yreg);
                        }
                        else if (this.Xreg === 2) {
                            _StdOut.putText(_MemoryManager.getStringFromMemory(this.Yreg + (256 * (_PCB.partition - 1))));
                        }
                        this.PC++;
                        this.IR = _MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1)));
                        _PCB.update(_PCB.State, this.PC, this.IR, this.Acc, this.Xreg, this.Yreg, this.Zflag);
                        break;
                    }
                }
                executeSingleStep = false;
            }
        };
        return Cpu;
    }());
    TSOS.Cpu = Cpu;
})(TSOS || (TSOS = {}));
