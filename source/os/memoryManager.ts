///<reference path="../globals.ts" />

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
    }
}
