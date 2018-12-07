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
          var partition;
          if(!_Memory.partition1Used) {
            partition = 1;
            _Memory.partition1Used = true;
          } else if(!_Memory.partition2Used) {
            partition = 2;
            _Memory.partition2Used = true;
          } else {
            partition = 3;
            _Memory.partition3Used = true;
          }
          var splitInput = programToLoad.split(" ", 256);
          _StdOut.putText("Partition " + partition);
          for(var i = 0; i < splitInput.length; i++){
            console.log(splitInput[i]);
            _Memory.mainMemory[((partition - 1) * 256) + i] = splitInput[i];
          }
          for(var i: number = splitInput.length; i < 256; i++) {
            _Memory.mainMemory[((partition - 1) * 256) + i] = "00";
          }
          var newPCB = new TSOS.PCB("" + currentPID, "New", 0, _Memory.mainMemory[(partition - 1) * 256], 0, 0, 0, 0, 0, partition);
          _ResidentList.enqueue(newPCB);
        }

        public loadInMainMemoryWithPriority(programToLoad, priority): void {
          var partition;
          if(!_Memory.partition1Used) {
            partition = 1;
            _Memory.partition1Used = true;
          } else if(!_Memory.partition2Used) {
            partition = 2;
            _Memory.partition2Used = true;
          } else {
            partition = 3;
            _Memory.partition3Used = true;
          }
          var splitInput = programToLoad.split(" ", 256);
          _StdOut.putText("Partition " + partition);
          for(var i = 0; i < splitInput.length; i++){
            console.log(splitInput[i]);
            _Memory.mainMemory[((partition - 1) * 256) + i] = splitInput[i];
          }
          for(var i: number = splitInput.length; i < 256; i++) {
            _Memory.mainMemory[((partition - 1) * 256) + i] = "00";
          }
          var newPCB = new TSOS.PCB("" + currentPID, "New", 0, _Memory.mainMemory[(partition - 1) * 256], 0, 0, 0, 0, priority, partition);
          _ResidentList.enqueue(newPCB);
        }

        public getOpCode(index): string {
          return _Memory.mainMemory[index];
        }

        public getValueFromMemory(location): number {
          return Utils.HexToInt(this.getOpCode(location));
        }

        public storeValueInMemory(location, value): void {
          _Memory.mainMemory[location] = Utils.IntToHex(value);
        }

        public incrementByteInMemory(location): void {
          var temp = _MemoryManager.getValueFromMemory(location);
          temp = temp + 1;
          if(temp >= 256) {
            temp = temp - 256;
          }
          _MemoryManager.storeValueInMemory(location, temp);
        }

        public getStringFromMemory(startingLocation): string {
          var location: number = startingLocation;
          var returnString = "";
          while(_MemoryManager.getOpCode(location) !== "00"){
            returnString = returnString +
              String.fromCharCode(Utils.HexToInt(_MemoryManager.getOpCode(location)));
            location++;
          }
          return returnString;
        }

        public clearMemoryPartition(partition): void {
          for(var i = (256 * (partition - 1)); i < ((256 * partition) - 1); i++) {
            _Memory.mainMemory[i] = "00";
          }
          if(partition == 1) {
            _Memory.partition1Used = false;
          }
          else if(partition == 2) {
            _Memory.partition2Used = false;
          }
          else if(partition == 3) {
            _Memory.partition3Used = false;
          }
        }
    }
}
