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
          if(_PCB != null){
            _PCB.State = "Waiting";
            _ReadyQueue.enqueue(_PCB);
          }
          if(!_ReadyQueue.isEmpty()) {
            if(schedule === "rr" || schedule === "fcfs") {
              _PCB = _ReadyQueue.dequeue();
            }
            else if(schedule === "priority") {
              console.log("Getting priority");
              _PCB = this.getHighestPriority();
            }
            _CPU.PC = _PCB.PC;
            _CPU.IR = _PCB.IR;
            _CPU.Acc = _PCB.Acc;
            _CPU.Xreg = _PCB.xReg;
            _CPU.Yreg = _PCB.yReg;
            _CPU.Zflag = _PCB.zFlag;
          }
        }

        public getHighestPriority() {
          console.log("getting highest priority");
          _PCB = _ReadyQueue.dequeue();
          var highestPriority: number = _PCB.priority;
          var highestPriorityId: number = _PCB.PID;
          _ReadyQueue.enqueue(_PCB);
          for(var i = 1; i < _ReadyQueue.getSize(); i++) {
            _PCB = _ReadyQueue.dequeue();
            if(highestPriority < _PCB.priority){
              highestPriority = _PCB.priority;
              highestPriorityId = _PCB.PID;
            }
            _ReadyQueue.enqueue(_PCB);
          }
          console.log(_PCB.PID);
          var foundHighest = false;
          for(var i = 0; i < _ReadyQueue.getSize() - 1; i++) {
            var temp = _ReadyQueue.dequeue();
            if(temp.PID === highestPriorityId) {
              _PCB = temp;
              foundHighest = true;
            }
            else {
              _ReadyQueue.enqueue(temp);
            }
          }
          if(!foundHighest){
            _PCB = _ReadyQueue.dequeue();
          }
          return _PCB;
        }

        public step(): void {
          this.currentCount = this.currentCount + 1;
          if(schedule === "rr" && ((this.currentCount >= quantum) && (_ReadyQueue.getSize() > 0))) {
            this.contextSwitch();
            this.currentCount = 0;
          }
        }
    }
}
