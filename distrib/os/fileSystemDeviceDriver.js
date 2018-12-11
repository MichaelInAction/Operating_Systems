///<reference path="../globals.ts" />
///<reference path="../utils.ts" />
///<reference path="deviceDriver.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/* ------------
     fileSystemDeviceDriver.ts

     Requires global.ts.
     ------------ */
var TSOS;
(function (TSOS) {
    var fileSystemDeviceDriver = /** @class */ (function (_super) {
        __extends(fileSystemDeviceDriver, _super);
        function fileSystemDeviceDriver() {
            var _this = _super.call(this) || this;
            _this.fileBlocks = [];
            return _this;
        }
        //Initializes the fileSystemDeviceDriver with 4 tracks, 8 sectors, and 8 blocks,
        //in session storage, as well as creating an entry in the fileBlocks array to
        //keep track of the names of the files that correspond to each block
        fileSystemDeviceDriver.prototype.init = function () {
            if (window.sessionStorage) {
                for (var track = 0; track < 4; track++) {
                    for (var sector = 0; sector < 8; sector++) {
                        for (var block = 0; block < 8; block++) {
                            var storage = "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00";
                            var str = "" + track + ":" + sector + ":" + block;
                            window.sessionStorage.setItem(str, storage);
                            this.fileBlocks.push([str, ""]);
                        }
                    }
                }
            }
            else {
                console.log("This browser does not support session storage");
            }
        };
        //Performs a full format on the file system, filling in all blocks with zeros and
        //removing all names from the fileBlocks array
        fileSystemDeviceDriver.prototype.fullFormat = function () {
            if (window.sessionStorage) {
                for (var track = 0; track < 4; track++) {
                    for (var sector = 0; sector < 8; sector++) {
                        for (var block = 0; block < 8; block++) {
                            var storage = "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00";
                            var str = "" + track + ":" + sector + ":" + block;
                            window.sessionStorage.setItem(str, storage);
                            this.fileBlocks[(track * 8) + (sector * 8) + (block + 1)][1] = "";
                        }
                    }
                }
            }
            else {
                console.log("This browser does not support session storage");
            }
        };
        //Performs a quick format on the file system, replacing the first four bytes of each block
        //with zeros, and removing all names from the fileBlocks array
        fileSystemDeviceDriver.prototype.quickFormat = function () {
            if (window.sessionStorage) {
                for (var track = 0; track < 4; track++) {
                    for (var sector = 0; sector < 8; sector++) {
                        for (var block = 0; block < 8; block++) {
                            var str = "" + track + ":" + sector + ":" + block;
                            var storage = "00 00 00 00" + window.sessionStorage.getItem(str).substring(11);
                            window.sessionStorage.setItem(str, storage);
                            this.fileBlocks[(track * 8) + (sector * 8) + (block + 1)][1] = "";
                        }
                    }
                }
            }
            else {
                console.log("This browser does not support session storage");
            }
        };
        //Creates a file in the file system with the given fileName
        //returns 0 if successful, returns 1 if filename already exists, and returns 2 if filesystem is full
        fileSystemDeviceDriver.prototype.create = function (fileName) {
            if (this.getFileName(fileName) === -1) {
                for (var i = 0; i < this.fileBlocks.length; i++) {
                    if (this.fileBlocks[i][1] === "") {
                        this.fileBlocks[i][1] = fileName;
                        return 0;
                    }
                }
                return 2;
            }
            else {
                return 1;
            }
        };
        //Writes to the file with the given fileName the given string
        //returns true if successful, returns false otherwise
        fileSystemDeviceDriver.prototype.write = function (fileName, string) {
            var index = this.getFileName(fileName);
            if (index !== -1) {
                if (window.sessionStorage) {
                    var str = TSOS.Utils.StringToHex(string);
                    window.sessionStorage.setItem(this.fileBlocks[index][0], str + window.sessionStorage.getItem(this.fileBlocks[index][0]).substring(str.length));
                    return true;
                }
                else {
                    console.log("This browser does not support session storage");
                    return false;
                }
            }
            else {
                return false;
            }
        };
        //reads from the given file and returns the contents
        fileSystemDeviceDriver.prototype.read = function (fileName) {
            var index = this.getFileName(fileName);
            if (index !== -1) {
                if (window.sessionStorage) {
                    return TSOS.Utils.HexToString(window.sessionStorage.getItem(this.fileBlocks[index][0]));
                }
                else {
                    console.log("This browser does not support session storage");
                    return null;
                }
            }
            else {
                return null;
            }
        };
        //Function to get all of the blocks in the file system and their contents
        //returns an array of all blocks in the form of [[0:0:0, contents], [0:0:1, contents], ...]
        fileSystemDeviceDriver.prototype.getAllBlocks = function () {
            var blocks = [];
            if (window.sessionStorage) {
                for (var track = 0; track < 4; track++) {
                    for (var sector = 0; sector < 8; sector++) {
                        for (var block = 0; block < 8; block++) {
                            var str = "" + track + ":" + sector + ":" + block;
                            blocks.push([str, window.sessionStorage.getItem(str)]);
                        }
                    }
                }
            }
            else {
                console.log("This browser does not support session storage");
            }
            return blocks;
        };
        //gets the index in fileBlocks where the given fileName is
        //if the fileName exists, returns its index in fileBlocks, else returns -1
        fileSystemDeviceDriver.prototype.getFileName = function (fileName) {
            for (var i = 0; i < this.fileBlocks.length; i++) {
                if (this.fileBlocks[i][1] === fileName) {
                    return i;
                }
            }
            return -1;
        };
        return fileSystemDeviceDriver;
    }(TSOS.DeviceDriver));
    TSOS.fileSystemDeviceDriver = fileSystemDeviceDriver;
})(TSOS || (TSOS = {}));
