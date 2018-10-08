///<reference path="../globals.ts" />

/* ------------
     memory.ts

     Requires global.ts.
     ------------ */

module TSOS {

    export class Memory {

        constructor(public PID,
                    public lastMemLocation,
                    public xReg,
                    public yReg,
                    public zFlag) {
          this.PID = PID;
          this.lastMemLocation = 0;
          this.xReg = 0;
          this.yReg = 0;
          this.zFlag = 0;
        }

        public init(PID): void {
          this.PID = PID;
          this.lastMemLocation = 0;
          this.xReg = 0;
          this.yReg = 0;
          this.zFlag = 0;
        }

        public update(lastMemLocation, xReg, yReg, zFlag): void {
          this.lastMemLocation = 0;
          this.xReg = 0;
          this.yReg = 0;
          this.zFlag = 0;
        }
    }
}
