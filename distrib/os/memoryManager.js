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
        MemoryManager.prototype.loadInMainMemory = function (programToLoad) {
            var splitInput = programToLoad.split(" ", 256);
            for (var i = 0; i < splitInput.length; i++) {
                _Memory.mainMemory[i] = splitInput[i];
            }
            for (var i = splitInput.length; i < 256; i++) {
                _Memory.mainMemory[i] = "00";
            }
        };
        MemoryManager.prototype.getOpCode = function (index) {
            return _Memory.mainMemory[index];
        };
        MemoryManager.prototype.getValueFromMemory = function (location) {
            return TSOS.Utils.HexToInt(this.getOpCode(TSOS.Utils.HexToInt(location)));
        };
        MemoryManager.prototype.storeValueInMemory = function (location, value) {
            _Memory.mainMemory[TSOS.Utils.HexToInt(location)] = TSOS.Utils.IntToHex(value);
        };
        MemoryManager.prototype.incrementByteInMemory = function (location) {
            var temp = _MemoryManager.getValueFromMemory(location);
            temp = temp + 1;
            if (temp >= 256) {
                temp = temp - 256;
            }
            _MemoryManager.storeValueInMemory(location, temp);
        };
        return MemoryManager;
    }());
    TSOS.MemoryManager = MemoryManager;
})(TSOS || (TSOS = {}));
