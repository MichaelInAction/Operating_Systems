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
        return MemoryManager;
    }());
    TSOS.MemoryManager = MemoryManager;
})(TSOS || (TSOS = {}));
