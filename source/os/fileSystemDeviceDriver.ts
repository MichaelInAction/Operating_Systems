///<reference path="../globals.ts" />
///<reference path="../utils.ts" />
///<reference path="deviceDriver.ts" />

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
          for(var i = 0; i < this.fileBlocks.length; i++){
            if(this.fileBlocks[i][1] === fileName) {
              return i;
            }
          }
          return -1;
        }
    }
}
