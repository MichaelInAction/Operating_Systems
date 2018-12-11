///<reference path="../globals.ts" />
///<reference path="../utils.ts" />
///<reference path="deviceDriver.ts" />
///<reference path="PCB.ts" />

/* ------------
     fileSystemDeviceDriver.ts

     Requires global.ts.
     ------------ */

module TSOS {

    export class fileSystemDeviceDriver extends DeviceDriver{

        fileBlocks: string[][];

        constructor() {
          super();
          this.fileBlocks = [];
        }

        //Initializes the fileSystemDeviceDriver with 4 tracks, 8 sectors, and 8 blocks,
        //in session storage, as well as creating an entry in the fileBlocks array to
        //keep track of the names of the files that correspond to each block
        public init() {
          if(window.sessionStorage) {
            for(var track = 0; track < 4; track++) {
              for(var sector = 0; sector < 8; sector++) {
                for(var block = 0; block < 8; block++) {
                  var storage = "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00";
                  var str = "" + track + ":" + sector + ":" + block;
                  window.sessionStorage.setItem(str, storage);
                  this.fileBlocks.push([str, ""]);
                }
              }
            }
          }
          else {
            console.log("This browser does not support session storage")
          }
        }

        //Performs a full format on the file system, filling in all blocks with zeros and
        //removing all names from the fileBlocks array
        public fullFormat() {
          if(window.sessionStorage) {
            for(var track = 0; track < 4; track++) {
              for(var sector = 0; sector < 8; sector++) {
                for(var block = 0; block < 8; block++) {
                  var storage = "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00";
                  var str = "" + track + ":" + sector + ":" + block;
                  window.sessionStorage.setItem(str, storage);
                  this.fileBlocks[(track * 8) + (sector * 8) + (block + 1)][1] = "";
                }
              }
            }
          }
          else {
            console.log("This browser does not support session storage")
          }
        }

        //Performs a quick format on the file system, replacing the first four bytes of each block
        //with zeros, and removing all names from the fileBlocks array
        public quickFormat() {
          if(window.sessionStorage) {
            for(var track = 0; track < 4; track++) {
              for(var sector = 0; sector < 8; sector++) {
                for(var block = 0; block < 8; block++) {
                  var str = "" + track + ":" + sector + ":" + block;
                  var storage = "00 00 00 00" + window.sessionStorage.getItem(str).substring(11);
                  window.sessionStorage.setItem(str, storage);
                  this.fileBlocks[(track * 8) + (sector * 8) + (block)][1] = "";
                }
              }
            }
          }
          else {
            console.log("This browser does not support session storage");
          }
        }

        //Creates a file in the file system with the given fileName
        //returns 0 if successful, returns 1 if filename already exists, and returns 2 if filesystem is full
        public create(fileName) {
          if(this.getFileName(fileName) === -1) {
            for(var i = 0; i < this.fileBlocks.length; i++) {
              if(this.fileBlocks[i][1] === "") {
                this.fileBlocks[i][1] = fileName;
                var today = new Date();
                this.fileBlocks[i][2] = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
                return 0;
              }
            }
            return 2;
          }
          else {
            return 1;
          }
        }

        //Writes to the file with the given fileName the given string
        //returns true if successful, returns false otherwise
        public write(fileName, string) {
          var index = this.getFileName(fileName);
          if(index !== -1) {
            if(window.sessionStorage) {
              var str = Utils.StringToHex(string);
              window.sessionStorage.setItem(this.fileBlocks[index][0], str + window.sessionStorage.getItem(this.fileBlocks[index][0]).substring(str.length));
              return true;
            }
            else {
              console.log("This browser does not support session storage");
              return false;
            }
          }
          else{
            return false;
          }
        }

        //reads from the given file and returns the contents
        public read(fileName) {
          var index = this.getFileName(fileName);
          if(index !== -1) {
            if(window.sessionStorage) {
              return Utils.HexToString(window.sessionStorage.getItem(this.fileBlocks[index][0]));
            }
            else {
              console.log("This browser does not support session storage");
              return null;
            }
          }
          else {
            return null;
          }
        }

        //deletes the given fileName
        //returns true if it was a success, false otherwise
        public delete(fileName) {
          var index = this.getFileName(fileName);
          if(index !== -1) {
            this.fileBlocks[index][1] = "";
            return true;
          }
          else {
            return false;
          }
        }

        //Stores a process on disk
        //returns the t:s:b that the file is stored in. returns null if there is no space
        public storeProcess(process, pid) {
          console.log(process);
          for(var i = 0; i < this.fileBlocks.length; i++) {
            if(this.fileBlocks[i][1] === "") {
              this.fileBlocks[i][1] = "-" + pid;
              if(window.sessionStorage) {
                window.sessionStorage.setItem(this.fileBlocks[i][0], process + window.sessionStorage.getItem(this.fileBlocks[i][0]).substring(process.length));
                var newPCB = new TSOS.PCB("" + currentPID, "On Disk", 0, process.substring(0, 2), 0, 0, 0, 0, 0, this.fileBlocks[i][0]);
                _ResidentList.enqueue(newPCB);
              }
              else {
                console.log("This browser does not support session storage");
                return null;
              }
              return this.fileBlocks[i][0];
            }
          }
          return null;
        }

        //Swaps a process in main memory with a process on disk
        public swapProcess(inMemoryPCB, onDiskPCB, processInMemory) {
          if(window.sessionStorage) {
            var tempProcess = window.sessionStorage.getItem(onDiskPCB.partition);
            window.sessionStorage.setItem(onDiskPCB.partition, processInMemory);
            for(var i = 0; i < this.fileBlocks.length; i++) {
              if(this.fileBlocks[i][0] === onDiskPCB.partition) {
                this.fileBlocks[i][1] = "-" + inMemoryPCB.PID;
              }
            }
            var tempPartition = inMemoryPCB.partition;
            inMemoryPCB.partition = onDiskPCB.partition;
            inMemoryPCB.State = "On Disk";
            onDiskPCB.partition = tempPartition;
            return tempProcess;
          }
          else {
            console.log("This browser does not support session storage");
          }
        }

        //deletes a process file of the given processName
        //used only by the cpu/cpuscheduler/os when the process is completed or killed
        //returns the deleted process code
        public deleteProcess(processName) {
          for(var i = 0; i < this.fileBlocks.length; i++){
            if(this.fileBlocks[i][1] === processName) {
              this.fileBlocks[i][1] = "";
              if(window.sessionStorage) {
                return window.sessionStorage.getItem(this.fileBlocks[i][0]);
              }
              else {
                console.log("This browser does not support session storage");
                return null;
              }
            }
          }
          return null;
        }

        //Function to get all of the blocks in the file system and their contents
        //returns an array of all blocks in the form of [[0:0:0, contents], [0:0:1, contents], ...]
        public getAllBlocks() {
          var blocks = [];
          if(window.sessionStorage) {
            for(var track = 0; track < 4; track++) {
              for(var sector = 0; sector < 8; sector++) {
                for(var block = 0; block < 8; block++) {
                  var str = "" + track + ":" + sector + ":" + block;
                  blocks.push([str, window.sessionStorage.getItem(str)]);
                }
              }
            }
          }
          else {
            console.log("This browser does not support session storage")
          }
          return blocks;
        }

        //Function to get all of the names of the files that exist in the file system
        //returns an array of all the non-hidden and non-process file names
        public getVisibleFileNames() {
          let toReturn = [];
          for(var i = 0; i < this.fileBlocks.length; i++) {
            if(this.fileBlocks[i][1] !== "" && this.fileBlocks[i][1].substring(0, 1) !== "." && this.fileBlocks[i][1].substring(0, 1) !== "-") {
              toReturn.push(this.fileBlocks[i][1]);
            }
          }
          return toReturn;
        }

        //Function to get all of the names of the files that exist in the file system, including hidden files
        //returns an array of all the non-process file names
        public getAllFileNames() {
          let toReturn = [];
          for(var i = 0; i < this.fileBlocks.length; i++) {
            if(this.fileBlocks[i][1] !== "" && this.fileBlocks[i][1].substring(0, 1) !== "-") {
              toReturn.push([this.fileBlocks[i][1], this.fileBlocks[i][2]]);
            }
          }
          return toReturn;
        }

        //gets the index in fileBlocks where the given fileName is
        //if the fileName exists, returns its index in fileBlocks, else returns -1
        public getFileName(fileName) {
          if(fileName.substring(0,1) !== "-") {
            for(var i = 0; i < this.fileBlocks.length; i++){
              if(this.fileBlocks[i][1] === fileName) {
                return i;
              }
            }
            return -1;
          }
          else {
            return -1;
          }
        }
    }
}
