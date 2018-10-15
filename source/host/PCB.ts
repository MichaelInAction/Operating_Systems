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
                    public zFlag) {
          this.PID = PID;
          this.State = "New";
          this.PC = "00";
          this.IR = IR;
          this.Acc = "00";
          this.xReg = "00";
          this.yReg = "00";
          this.zFlag = "00";
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
