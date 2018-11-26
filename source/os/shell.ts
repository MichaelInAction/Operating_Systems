///<reference path="../globals.ts" />
///<reference path="../utils.ts" />
///<reference path="shellCommand.ts" />
///<reference path="userCommand.ts" />
///<reference path="kernel.ts" />
///<reference path="PCB.ts" />


/* ------------
   Shell.ts

   The OS Shell - The "command line interface" (CLI) for the console.

    Note: While fun and learning are the primary goals of all enrichment center activities,
          serious injuries may occur when trying to write your own Operating System.
   ------------ */

// TODO: Write a base class / prototype for system services and let Shell inherit from it.

module TSOS {
    export class Shell {
        // Properties
        public promptStr = ">";
        public commandList = [];
        public curses = "[fuvg],[cvff],[shpx],[phag],[pbpxfhpxre],[zbgureshpxre],[gvgf]";
        public apologies = "[sorry]";
        public status = "";
        public dateTime;

        constructor() {
        }

        public init() {
            var sc;
            //
            // Load the command list.

            // ver
            sc = new ShellCommand(this.shellVer,
                                  "ver",
                                  "- Displays the current version data.");
            this.commandList[this.commandList.length] = sc;

            // date
            sc = new ShellCommand(this.shellDate,
                                  "date",
                                  "- Shows the current date.");
            this.commandList[this.commandList.length] = sc;

            // whereami
            sc = new ShellCommand(this.shellWhereAmI,
                                  "whereami",
                                  "- Shows the current location.");
            this.commandList[this.commandList.length] = sc;

            // babel
            sc = new ShellCommand(this.shellBabel,
                                  "babel",
                                  "- Initializes a protocol to incapacitate the Justice League");
            this.commandList[this.commandList.length] = sc;

            // help
            sc = new ShellCommand(this.shellHelp,
                                  "help",
                                  "- This is the help command. Seek help.");
            this.commandList[this.commandList.length] = sc;

            // shutdown
            sc = new ShellCommand(this.shellShutdown,
                                  "shutdown",
                                  "- Shuts down the virtual OS but leaves the underlying host / hardware simulation running.");
            this.commandList[this.commandList.length] = sc;

            // cls
            sc = new ShellCommand(this.shellCls,
                                  "cls",
                                  "- Clears the screen and resets the cursor position.");
            this.commandList[this.commandList.length] = sc;

            // man <topic>
            sc = new ShellCommand(this.shellMan,
                                  "man",
                                  "<topic> - Displays the MANual page for <topic>.");
            this.commandList[this.commandList.length] = sc;

            // trace <on | off>
            sc = new ShellCommand(this.shellTrace,
                                  "trace",
                                  "<on | off> - Turns the OS trace on or off.");
            this.commandList[this.commandList.length] = sc;

            // rot13 <string>
            sc = new ShellCommand(this.shellRot13,
                                  "rot13",
                                  "<string> - Does rot13 obfuscation on <string>.");
            this.commandList[this.commandList.length] = sc;

            // prompt <string>
            sc = new ShellCommand(this.shellPrompt,
                                  "prompt",
                                  "<string> - Sets the prompt.");
            this.commandList[this.commandList.length] = sc;

            // status <string>
            sc = new ShellCommand(this.shellStatus,
                                  "status",
                                  "<string> - Sets the status.");
            this.commandList[this.commandList.length] = sc;

            // load
            sc = new ShellCommand(this.shellLoad,
                                  "load",
                                  "- Validates the users code in the User Program Input area.");
            this.commandList[this.commandList.length] = sc;

            // run <pid>
            sc = new ShellCommand(this.shellRun,
                                  "run",
                                  "<pid> - Runs the program with the given pid.");
            this.commandList[this.commandList.length] = sc;

            // Blue Screen of Death
            sc = new ShellCommand(this.shellBSOD,
                                  "bsod",
                                  "- Displays the Blue Screen of Death.");
            this.commandList[this.commandList.length] = sc;

            // clearmem - clear all memory partitions
            sc = new ShellCommand(this.shellClearMem,
                                  "clearmem",
                                  "- clears all memory partitions.");
            this.commandList[this.commandList.length] = sc;
            // runall - execute all programs at once
            sc = new ShellCommand(this.shellRunAll,
                                  "runall",
                                  " - executes all programs at once.");
            this.commandList[this.commandList.length] = sc;
            // ps  - list the running processes and their IDs
            sc = new ShellCommand(this.shellPS,
                                  "ps",
                                  " - lists the running processes and their IDs.");
            this.commandList[this.commandList.length] = sc;
            // kill <id> - kills the specified process id.
            sc = new ShellCommand(this.shellKill,
                                  "kill",
                                  "<id> - kills the process with the specified id.");
            this.commandList[this.commandList.length] = sc;
            // quantum <int> - let user set the Round Robin quantum
            sc = new ShellCommand(this.shellQuantum,
                                  "quantum",
                                  "<int> - sets the round robin quantum (measured in CPU cycles).");
            this.commandList[this.commandList.length] = sc;
            // getSchedule - show the user what cpu scheduling algorithm is being used
            sc = new ShellCommand(this.shellGetSchedule,
                                  "getschedule",
                                  " - Gets the current cpu scheduling algorithm.");
            this.commandList[this.commandList.length] = sc;

            //
            // Display the initial prompt.
            this.putPrompt();
            this.checkTime();
        }

        public putPrompt() {
            _StdOut.putText(this.promptStr);
        }

        public handleInput(buffer) {
            _Kernel.krnTrace("Shell Command~" + buffer);
            //
            // Parse the input...
            //
            var userCommand = this.parseInput(buffer);
            // ... and assign the command and args to local variables.
            var cmd = userCommand.command;
            var args = userCommand.args;
            //
            // Determine the command and execute it.
            //
            // TypeScript/JavaScript may not support associative arrays in all browsers so we have to iterate over the
            // command list in attempt to find a match.  TODO: Is there a better way? Probably. Someone work it out and tell me in class.
            var index: number = 0;
            var found: boolean = false;
            var fn = undefined;
            while (!found && index < this.commandList.length) {
                if (this.commandList[index].command === cmd) {
                    found = true;
                    fn = this.commandList[index].func;
                } else {
                    ++index;
                }
            }
            if (found) {
                this.execute(fn, args);
            } else {
                // It's not found, so check for curses and apologies before declaring the command invalid.
                if (this.curses.indexOf("[" + Utils.rot13(cmd) + "]") >= 0) {     // Check for curses.
                    this.execute(this.shellCurse);
                } else if (this.apologies.indexOf("[" + cmd + "]") >= 0) {        // Check for apologies.
                    this.execute(this.shellApology);
                } else { // It's just a bad command. {
                    this.execute(this.shellInvalidCommand);
                }
            }
        }

        // Note: args is an option parameter, ergo the ? which allows TypeScript to understand that.
        public execute(fn, args?) {
            // We just got a command, so advance the line...
            _StdOut.advanceLine();
            // ... call the command function passing in the args with some über-cool functional programming ...
            fn(args);
            // Check to see if we need to advance the line again
            if (_StdOut.currentXPosition > 0) {
                _StdOut.advanceLine();
            }
            // ... and finally write the prompt again.
            this.putPrompt();
        }

        public parseInput(buffer): UserCommand {
            var retVal = new UserCommand();

            // 1. Remove leading and trailing spaces.
            buffer = Utils.trim(buffer);

            // 2. Lower-case it.
            buffer = buffer.toLowerCase();

            // 3. Separate on spaces so we can determine the command and command-line args, if any.
            var tempList = buffer.split(" ");

            // 4. Take the first (zeroth) element and use that as the command.
            var cmd = tempList.shift();  // Yes, you can do that to an array in JavaScript.  See the Queue class.
            // 4.1 Remove any left-over spaces.
            cmd = Utils.trim(cmd);
            // 4.2 Record it in the return value.
            retVal.command = cmd;

            // 5. Now create the args array from what's left.
            for (var i in tempList) {
                var arg = Utils.trim(tempList[i]);
                if (arg != "") {
                    retVal.args[retVal.args.length] = tempList[i];
                }
            }
            return retVal;
        }

        //
        // Shell Command Functions.  Kinda not part of Shell() class exactly, but
        // called from here, so kept here to avoid violating the law of least astonishment.
        //
        public shellInvalidCommand() {
            _StdOut.putText("Invalid Command. ");
            _StdOut.putText("If you require my assistance, Master Bruce,");
            _StdOut.advanceLine();
            _StdOut.putText("just type 'help' ");
        }

        public shellCurse() {
            _StdOut.putText("Master Bruce, there's no need for profanity");
        }

        public shellApology() {
            _StdOut.putText("Master Bruce, are you quite alright?");
        }

        public shellVer(args) {
            _StdOut.putText(APP_NAME + " version " + APP_VERSION);
        }

        public shellDate() {
            var date: Date = new Date();
            _StdOut.putText("Master Bruce, it is currently " + date.toString());
        }

        public shellWhereAmI() {
            var rand: number = Math.floor(Math.random() * Math.floor(2));
            switch (rand){
                case 0:
                  _StdOut.putText("You are currently aboard the Watchtower.");
                  break;
                case 1:
                  _StdOut.putText("You're in the batcave, Master Bruce...");
                  _StdOut.advanceLine();
                  _StdOut.putText("Are you sure you didn't sustain any head injuries?");
                  break;
            }

        }

        public shellBabel() {
            _StdOut.putText("Initializing the Tower of Babel protocol...");
            _StdOut.advanceLine();
            _StdOut.putText("Superman....neutralized");
            _StdOut.advanceLine();
            _StdOut.putText("Wonder Woman....neutralized");
            _StdOut.advanceLine();
            _StdOut.putText("Martian Manhunter....neutralized");
            _StdOut.advanceLine();
            _StdOut.putText("Flash....neutralized");
            _StdOut.advanceLine();
            _StdOut.putText("Green Lanturn....neutralized");
            _StdOut.advanceLine();
            _StdOut.putText("Aquaman....neutralized");
            _StdOut.advanceLine();
            _StdOut.putText("Plastic Man....neutralized");
            _StdOut.advanceLine();
            _StdOut.putText("Batman....neutralized");
            _StdOut.advanceLine();
            _StdOut.putText("All Members of the Justice League are contained");
        }

        public shellLoad() {
          if(!_Memory.partition1Used || !_Memory.partition2Used || !_Memory.partition3Used){
            var userInput: string = document.getElementById('taProgramInput').value;
            var isValid = true;
            var invalidCharacters = new RegExp(/[^0-9A-F\s]/);
            if (userInput.trim().length == 0) {
              isValid = false;
              _StdOut.putText("No input detected");
            }
            else if (invalidCharacters.test(userInput)) {
              isValid = false;
              _StdOut.putText("Invalid character found");
            }
            else {
              var splitInput = userInput.split(" ", 256);
              for(var i = 0; i < splitInput.length; i++) {
                if(splitInput[i].length != 2) {
                  isValid = false
                  _StdOut.putText("Invalid code found");
                }
              }
            }
            if(isValid) {
              _MemoryManager.loadInMainMemory(userInput);
              _StdOut.putText("Program Loading Sequence was a success. The PID is " + currentPID);
              currentPID = currentPID + 1;
            }
          }
          else {
            _StdOut.putText("Memory partitions are full!");
          }
        }

        public shellRun(args) {
          var PIDExists = false;
          for(var i = 0; i < _ResidentList.getSize(); i++) {
            _PCB = _ResidentList.dequeue();
            if(_PCB.PID == args) {
              PIDExists = true;
              break;
            }
            else {
              _ResidentList.enqueue(_PCB);
              _PCB = null;
            }
          }
          if(PIDExists){
            _CPU.PC = _PCB.PC;
            _CPU.IR = _PCB.IR;
            _CPU.Acc = _PCB.Acc;
            _CPU.Xreg = _PCB.xReg;
            _CPU.Yreg = _PCB.yReg;
            _CPU.Zflag = _PCB.zFlag;
            _CPU.isExecuting = true;
          }
          else {
            _StdOut.putText("Master Bruce, there is no program with that PID...");
          }
        }

        public shellHelp(args) {
            _StdOut.putText("Commands:");
            for (var i in _OsShell.commandList) {
                _StdOut.advanceLine();
                _StdOut.putText("  " + _OsShell.commandList[i].command + " " + _OsShell.commandList[i].description);
            }
        }

        public shellShutdown(args) {
             _StdOut.putText("Shutting down...");
             // Call Kernel shutdown routine.
            _Kernel.krnShutdown();
            // TODO: Stop the final prompt from being displayed.  If possible.  Not a high priority.  (Damn OCD!)
        }

        public shellCls(args) {
            _StdOut.clearScreen();
            _StdOut.resetXY();
        }

        public shellMan(args) {
            if (args.length > 0) {
                var topic = args[0];
                switch (topic) {
                    case "help":
                        _StdOut.putText("Help displays a list of (hopefully) valid commands.");
                        break;
                    // TODO: Make descriptive MANual page entries for the the rest of the shell commands here.
                    default:
                        _StdOut.putText("No manual entry for " + args[0] + ".");
                }
            } else {
                _StdOut.putText("Usage: man <topic>  Please supply a topic.");
            }
        }

        public shellTrace(args) {
            if (args.length > 0) {
                var setting = args[0];
                switch (setting) {
                    case "on":
                        _Trace = true;
                        _StdOut.putText("Trace ON");
                        break;
                    case "off":
                        _Trace = false;
                        _StdOut.putText("Trace OFF");
                        break;
                    default:
                        _StdOut.putText("Invalid arguement.  Usage: trace <on | off>.");
                }
            } else {
                _StdOut.putText("Usage: trace <on | off>");
            }
        }

        public shellRot13(args) {
            if (args.length > 0) {
                // Requires Utils.ts for rot13() function.
                _StdOut.putText(args.join(' ') + " = '" + Utils.rot13(args.join(' ')) +"'");
            } else {
                _StdOut.putText("Usage: rot13 <string>  Please supply a string.");
            }
        }

        public shellPrompt(args) {
            if (args.length > 0) {
                _OsShell.promptStr = args[0];
            } else {
                _StdOut.putText("Usage: prompt <string>  Please supply a string.");
            }
        }

        public shellStatus(args) {
          this.status = args.join(' ');
          document.getElementById('taskBarStatus').innerHTML = " STATUS: " + this.status;
        }

        public shellBSOD() {
          _Kernel.krnInterruptHandler("INVALID_IRQ");
        }

        public shellClearMem() {
          _MemoryManager.clearMemoryPartition(1);
          _MemoryManager.clearMemoryPartition(2);
          _MemoryManager.clearMemoryPartition(3);
          _StdOut.putText("Memory Cleared");
        }

        public shellRunAll() {
          if(_ResidentList.getSize() > 0){
            _PCB = _ResidentList.dequeue();
            while(_ResidentList.getSize() > 0) {
              _ReadyQueue.enqueue(_ResidentList.dequeue());
            }
            _CPUScheduler.currentCount = 0;
            _CPU.PC = _PCB.PC;
            _CPU.IR = _PCB.IR;
            _CPU.Acc = _PCB.Acc;
            _CPU.Xreg = _PCB.xReg;
            _CPU.Yreg = _PCB.yReg;
            _CPU.Zflag = _PCB.zFlag;
            _CPU.isExecuting = true;
          }
          else {
            _StdOut.putText("There are no loaded programs");
          }
        }

        public shellQuantum(args) {
          quantum = args[0];
          _StdOut.putText("Round Robin quantum has been updated to " + quantum);
        }

        public shellGetSchedule() {
          let currentSchedule = "";
          if(schedule === "rr") {
            currentSchedule = "Round Robin";
          }
          else if(schedule === "fcfs") {
            currentSchedule = "First Come First Serve";
          }
          else if(schedule === "priority") {
            currentSchedule = "Priority";
          }
          _StdOut.putText("The current CPU scheduling algorithm is " + currentSchedule);
        }

        public shellPS() {
          if(_PCB != null) {
            _StdOut.putText("PID: " + _PCB.PID);
            _StdOut.advanceLine();
          }
          for(var i = 0; i < _ResidentList.getSize(); i++){
            var temp = _ResidentList.dequeue();
            _StdOut.putText("PID: " + temp.PID);
            _StdOut.advanceLine();
            _ResidentList.enqueue(temp);
          }
          for(var i = 0; i < _ReadyQueue.getSize(); i++){
            var temp = _ReadyQueue.dequeue();
            _StdOut.putText("PID: " + temp.PID);
            _StdOut.advanceLine();
            _ReadyQueue.enqueue(temp);
          }
        }

        public shellKill(args) {
          var found = false;
          var temp: TSOS.PCB;
          for(var i = 0; i < _ResidentList.getSize(); i++) {
            temp = _ResidentList.dequeue();
            if(temp.PID == args) {
              _MemoryManager.clearMemoryPartition(temp.partition);
              found = true;
            }
            else {
              _ResidentList.enqueue(temp);
              temp = null;
            }
          }
          for(var i = 0; i < _ReadyQueue.getSize(); i++) {
            temp = _ReadyQueue.dequeue();
            if(temp.PID == args) {
              _MemoryManager.clearMemoryPartition(temp.partition);
              found = true;
            }
            else {
              _ReadyQueue.enqueue(temp);
              temp = null;
            }
          }
          if(found) {
            _StdOut.putText("Process with PID " + args + " has been killed");
          } else {
            _StdOut.putText("That PID is not associated with an existing process");
          }
        }

        public checkTime() {
          this.dateTime = new Date();
          document.getElementById('taskBarDate').innerHTML = "Date: " + this.dateTime.toString() + " | Status: " + this.status;
          var t = setTimeout(this.checkTime, 500);
        }

        // This function returns the first command in the list that
        public completeCommand(args) {
          var ret = "";
          for (var i in this.commandList) {
            if (this.commandList[i].command.indexOf(args) == 0) {
              console.log('Found a match! The match is ' + this.commandList[i].command);
              ret = this.commandList[i].command;
            }
          }
          return ret;
        }

    }
}
