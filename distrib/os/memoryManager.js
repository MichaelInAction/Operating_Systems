///<reference path="../globals.ts" />
///<reference path="../Utils.ts" />
/* ------------
     memoryManager.ts

     Requires global.ts.
     ------------ */
var TSOS;
(function (TSOS) {
    var MemoryManager = /** @class */ (function () {
        function MemoryManager() {
        }
        MemoryManager.prototype.swapIntoMemory = function (programToSwap, partition) {
            var splitInput = programToSwap.split(" ", 256);
            for (var i = 0; i < splitInput.length; i++) {
                _Memory.mainMemory[((partition - 1) * 256) + i] = splitInput[i];
            }
            for (var i = splitInput.length; i < 256; i++) {
                _Memory.mainMemory[((partition - 1) * 256) + i] = "00";
            }
        };
        MemoryManager.prototype.putIntoMemory = function (programToPut, PCB) {
            var partition;
            if (!_Memory.partition1Used) {
                partition = 1;
                PCB.partition = 1;
                _Memory.partition1Used = true;
            }
            else if (!_Memory.partition2Used) {
                partition = 2;
                PCB.partition = 2;
                _Memory.partition2Used = true;
            }
            else {
                partition = 3;
                PCB.partition = 3;
                _Memory.partition3Used = true;
            }
            var splitInput = programToPut.split(" ", 256);
            for (var i = 0; i < splitInput.length; i++) {
                _Memory.mainMemory[((partition - 1) * 256) + i] = splitInput[i];
            }
            for (var i = splitInput.length; i < 256; i++) {
                _Memory.mainMemory[((partition - 1) * 256) + i] = "00";
            }
        };
        MemoryManager.prototype.getProcessFromMemory = function (partition) {
            var str = "";
            str = _Memory.mainMemory[((partition - 1) * 256)];
            for (var i = 1; i < 256; i++) {
                str = str + " " + _Memory.mainMemory[((partition - 1) * 256) + i];
            }
            return str;
        };
        MemoryManager.prototype.loadInMainMemory = function (programToLoad) {
            var partition;
            if (!_Memory.partition1Used) {
                partition = 1;
                _Memory.partition1Used = true;
            }
            else if (!_Memory.partition2Used) {
                partition = 2;
                _Memory.partition2Used = true;
            }
            else {
                partition = 3;
                _Memory.partition3Used = true;
            }
            var splitInput = programToLoad.split(" ", 256);
            _StdOut.putText("Partition " + partition);
            for (var i = 0; i < splitInput.length; i++) {
                _Memory.mainMemory[((partition - 1) * 256) + i] = splitInput[i];
            }
            for (var i = splitInput.length; i < 256; i++) {
                _Memory.mainMemory[((partition - 1) * 256) + i] = "00";
            }
            var newPCB = new TSOS.PCB("" + currentPID, "New", 0, _Memory.mainMemory[(partition - 1) * 256], 0, 0, 0, 0, 0, partition);
            _ResidentList.enqueue(newPCB);
        };
        MemoryManager.prototype.loadInMainMemoryWithPriority = function (programToLoad, priority) {
            var partition;
            if (!_Memory.partition1Used) {
                partition = 1;
                _Memory.partition1Used = true;
            }
            else if (!_Memory.partition2Used) {
                partition = 2;
                _Memory.partition2Used = true;
            }
            else {
                partition = 3;
                _Memory.partition3Used = true;
            }
            var splitInput = programToLoad.split(" ", 256);
            _StdOut.putText("Partition " + partition);
            for (var i = 0; i < splitInput.length; i++) {
                _Memory.mainMemory[((partition - 1) * 256) + i] = splitInput[i];
            }
            for (var i = splitInput.length; i < 256; i++) {
                _Memory.mainMemory[((partition - 1) * 256) + i] = "00";
            }
            var newPCB = new TSOS.PCB("" + currentPID, "New", 0, _Memory.mainMemory[(partition - 1) * 256], 0, 0, 0, 0, priority, partition);
            _ResidentList.enqueue(newPCB);
        };
        MemoryManager.prototype.getOpCode = function (index) {
            return _Memory.mainMemory[index];
        };
        MemoryManager.prototype.getValueFromMemory = function (location) {
            return TSOS.Utils.HexToInt(this.getOpCode(location));
        };
        MemoryManager.prototype.storeValueInMemory = function (location, value) {
            _Memory.mainMemory[location] = TSOS.Utils.IntToHex(value);
        };
        MemoryManager.prototype.incrementByteInMemory = function (location) {
            var temp = _MemoryManager.getValueFromMemory(location);
            temp = temp + 1;
            if (temp >= 256) {
                temp = temp - 256;
            }
            _MemoryManager.storeValueInMemory(location, temp);
        };
        MemoryManager.prototype.getStringFromMemory = function (startingLocation) {
            var location = startingLocation;
            var returnString = "";
            while (_MemoryManager.getOpCode(location) !== "00") {
                returnString = returnString +
                    String.fromCharCode(TSOS.Utils.HexToInt(_MemoryManager.getOpCode(location)));
                location++;
            }
            return returnString;
        };
        MemoryManager.prototype.clearMemoryPartition = function (partition) {
            for (var i = (256 * (partition - 1)); i < ((256 * partition) - 1); i++) {
                _Memory.mainMemory[i] = "00";
            }
            if (partition == 1) {
                _Memory.partition1Used = false;
            }
            else if (partition == 2) {
                _Memory.partition2Used = false;
            }
            else if (partition == 3) {
                _Memory.partition3Used = false;
            }
        };
        return MemoryManager;
    }());
    TSOS.MemoryManager = MemoryManager;
})(TSOS || (TSOS = {}));
