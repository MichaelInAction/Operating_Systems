///<reference path="../globals.ts" />

/* ------------
     memory.ts

     Requires global.ts.
     ------------ */

module TSOS {

    export class PCB {

        constructor(public PID,
                    public State,
                    public PC,
                    public IR,
                    public Acc,
                    public xReg,
                    public yReg,
                    public zFlag,
                    public partition) {
          this.PID = PID;
          this.State = "New";
          this.PC = 0;
          this.IR = IR;
          this.Acc = 0;
          this.xReg = 0;
          this.yReg = 0;
          this.zFlag = 0;
          this.partition = partition;
        }

        public update(State, PC, IR, Acc, xReg, yReg, zFlag): void {
          this.State = State;
          this.PC = PC;
          this.IR = IR;
          this.Acc = Acc;
          this.xReg = xReg;
          this.yReg = yReg;
          this.zFlag = zFlag;
        }
    }
}
