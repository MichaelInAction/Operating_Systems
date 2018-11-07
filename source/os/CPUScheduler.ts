///<reference path="../globals.ts" />

/* ------------
     memory.ts

     Requires global.ts.
     ------------ */

module TSOS {

    export class CPUScheduler {

        constructor(public currentCount = 0) {
        }

        public contextSwitch() {
          console.log("Context Switch");
          if(_PCB != null){
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
        }

        public step(): void {
          this.currentCount = this.currentCount + 1;
          if((this.currentCount >= quantum) && (_ReadyQueue.getSize() > 0)) {
            this.contextSwitch();
            this.currentCount = 0;
          }
        }
    }
}
