///<reference path="../globals.ts" />
///<reference path="../Utils.ts" />

/* ------------
     memoryManager.ts

     Requires global.ts.
     ------------ */

module TSOS {

    export class MemoryManager {

        public constructor() {
        }

        public loadInMainMemory(programToLoad): void {
          var splitInput = programToLoad.split(" ", 256);
          for(var i = 0; i < splitInput.length; i++){
            _Memory.mainMemory[i] = splitInput[i];
          }
          for(var i: number = splitInput.length; i < 256; i++) {
            _Memory.mainMemory[i] = "00";
          }
        }

        public getOpCode(index): string {
          return _Memory.mainMemory[index];
        }

        public getValueFromMemory(location): number {
          return Utils.HexToInt(this.getOpCode(Utils.HexToInt(location)));
        }
    }
}
