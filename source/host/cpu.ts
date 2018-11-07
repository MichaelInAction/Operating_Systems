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

module TSOS {

    export class Cpu {

        constructor(public PC: number = 0,
                    public IR: string = '00',
                    public Acc: number = 0,
                    public Xreg: number = 0,
                    public Yreg: number = 0,
                    public Zflag: number = 0,
                    public isExecuting: boolean = false) {

        }

        public init(): void {
            this.PC = 0;
            this.IR = '--';
            this.Acc = 0;
            this.Xreg = 0;
            this.Yreg = 0;
            this.Zflag = 0;
            this.isExecuting = false;
        }

        public cycle(): void {
            _Kernel.krnTrace('CPU cycle');
            // TODO: Accumulate CPU usage and profiling statistics here.
            // Do the real work here. Be sure to set this.isExecuting appropriately.
            if(this.isExecuting && ((!singleStepMode) || (singleStepMode && executeSingleStep))) {
              _PCB.State = 'Executing';
              this.IR = _PCB.IR;
              switch(this.IR) {
                case 'A9': {
                  this.PC++;
                  this.Acc = Utils.HexToInt(_MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1))));
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
                  this.Acc = _MemoryManager.getValueFromMemory(Utils.HexToInt(temp) + (256 * (_PCB.partition - 1)));
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
                  _MemoryManager.storeValueInMemory(Utils.HexToInt(temp) + (256 * (_PCB.partition - 1)), this.Acc);
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
                  this.Acc = this.Acc + _MemoryManager.getValueFromMemory(Utils.HexToInt(temp) + (256 * (_PCB.partition - 1)));
                  this.PC++;
                  this.IR = _MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1)));
                  _PCB.update(_PCB.State, this.PC, this.IR, this.Acc, this.Xreg, this.Yreg, this.Zflag);
                  break;
                }
                case 'A2': {
                  this.PC++;
                  this.Xreg = Utils.HexToInt(_MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1))));
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
                  this.Xreg = _MemoryManager.getValueFromMemory(Utils.HexToInt(temp) + (256 * (_PCB.partition - 1)));
                  this.PC++;
                  this.IR = _MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1)));
                  _PCB.update(_PCB.State, this.PC, this.IR, this.Acc, this.Xreg, this.Yreg, this.Zflag);
                  break;
                }
                case 'A0': {
                  this.PC++;
                  this.Yreg = Utils.HexToInt(_MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1))));
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
                  this.Yreg = _MemoryManager.getValueFromMemory(Utils.HexToInt(temp) + (256 * (_PCB.partition - 1)));
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
                _MemoryManager.clearMemoryPartition(_PCB.partition);
                _PCB = null;
                  if(_ReadyQueue.getSize() <= 0) {
                    this.isExecuting = false;
                    _StdOut.advanceLine();
                    _StdOut.putText(">");
                  }
                  else {
                    _CPUScheduler.contextSwitch();
                  }
                  break;
                }
                case 'EC': {
                  this.PC++
                  var temp = _MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1)));
                  this.PC++;
                  temp = _MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1))) + temp;
                  var tempNum = _MemoryManager.getValueFromMemory(Utils.HexToInt(temp) + (256 * (_PCB.partition - 1)));
                  if(tempNum === this.Xreg) {
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
                  var distanceToBranch = Utils.HexToInt(_MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1))));
                  if(this.Zflag === 0) {
                    this.PC = this.PC + distanceToBranch;
                    if(this.PC >= 256) {
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
                  if(this.Xreg === 1) {
                    console.log("Working");
                    _StdOut.putText("" + this.Yreg);
                  }
                  else if(this.Xreg === 2) {
                    _StdOut.putText(_MemoryManager.getStringFromMemory(this.Yreg + (256 * (_PCB.partition - 1))));
                  }
                  this.PC++;
                  this.IR = _MemoryManager.getOpCode(this.PC + (256 * (_PCB.partition - 1)));
                  _PCB.update(_PCB.State, this.PC, this.IR, this.Acc, this.Xreg, this.Yreg, this.Zflag);
                  break;
                }
              }
              if(this.PC > 255 || this.PC < 0) {
                console.log("Memory out of bounds error");
                _StdOut.putText("The process has attempted to access memory outside of the partition. The process has been stopped");
                _MemoryManager.clearMemoryPartition(_PCB.partition);
                _PCB = null;
                if(_ReadyQueue.getSize() <= 0) {
                  this.isExecuting = false;
                  _StdOut.advanceLine();
                  _StdOut.putText(">");
                }
                else {
                  _CPUScheduler.contextSwitch();
                }
              }
              else {
                _CPUScheduler.step();
              }
              executeSingleStep = false;
            }
        }
    }
}
