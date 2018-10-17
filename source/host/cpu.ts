///<reference path="../globals.ts" />

/* ------------
     CPU.ts

     Requires global.ts.

     Routines for the host CPU simulation, NOT for the OS itself.
     In this manner, it's A LITTLE BIT like a hypervisor,
     in that the Document environment inside a browser is the "bare metal" (so to speak) for which we write code
     that hosts our client OS. But that analogy only goes so far, and the lines are blurred, because we are using
     TypeScript/JavaScript in both the host and client environments.

     This code references page numbers in the text book:
     Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
     ------------ */

module TSOS {

    export class Cpu {

        constructor(public PC: number = 0,
                    public IR: string = '00',
                    public Acc: number = 0,
                    public Xreg: number = 0,
                    public Yreg: number = 0,
                    public Zflag: number = 0,
                    public isExecuting: boolean = false) {

        }

        public init(): void {
            this.PC = 0;
            this.IR = '--';
            this.Acc = 0;
            this.Xreg = 0;
            this.Yreg = 0;
            this.Zflag = 0;
            this.isExecuting = false;
        }

        public cycle(): void {
            _Kernel.krnTrace('CPU cycle');
            // TODO: Accumulate CPU usage and profiling statistics here.
            // Do the real work here. Be sure to set this.isExecuting appropriately.
            if(this.isExecuting) {
              _PCB.State = 'Executing';
              this.IR = _PCB.IR;
              switch(this.IR) {
                case 'A9': {
                  this.PC++;
                  this.IR = _MemoryManager.getOpCode(this.PC);
                  _PCB.PC = this.PC;
                  _PCB.IR = this.IR;
                  break;
                }
                case 'AD': {
                  this.PC++;
                  this.IR = _MemoryManager.getOpCode(this.PC);
                  _PCB.PC = this.PC;
                  _PCB.IR = this.IR;
                  break;
                }
                case '8D': {
                  this.PC++;
                  this.IR = _MemoryManager.getOpCode(this.PC);
                  _PCB.PC = this.PC;
                  _PCB.IR = this.IR;
                  break;
                }
                case '6D': {
                  this.PC++;
                  this.IR = _MemoryManager.getOpCode(this.PC);
                  _PCB.PC = this.PC;
                  _PCB.IR = this.IR;
                  break;
                }
                case 'A2': {
                  this.PC++;
                  this.IR = _MemoryManager.getOpCode(this.PC);
                  _PCB.PC = this.PC;
                  _PCB.IR = this.IR;
                  break;
                }
                case 'AE': {
                  this.PC++;
                  this.IR = _MemoryManager.getOpCode(this.PC);
                  _PCB.PC = this.PC;
                  _PCB.IR = this.IR;
                  break;
                }
                case 'A0': {
                  this.PC++;
                  this.IR = _MemoryManager.getOpCode(this.PC);
                  _PCB.PC = this.PC;
                  _PCB.IR = this.IR;
                  break;
                }
                case 'AC': {
                  this.PC++;
                  this.IR = _MemoryManager.getOpCode(this.PC);
                  _PCB.PC = this.PC;
                  _PCB.IR = this.IR;
                  break;
                }
                case 'EA': {
                  this.PC++;
                  this.IR = _MemoryManager.getOpCode(this.PC);
                  _PCB.PC = this.PC;
                  _PCB.IR = this.IR;
                  break;
                }
                case '00': {
                  console.log("Found a 00 at " + this.PC);
                  _PCB.State = 'Finished';
                  _PCB.PC = this.PC;
                  _PCB.IR = this.IR;
                  this.isExecuting = false;
                  break;
                }
                case 'EC': {
                  this.PC++;
                  this.IR = _MemoryManager.getOpCode(this.PC);
                  _PCB.PC = this.PC;
                  _PCB.IR = this.IR;
                  break;
                }
                case 'D0': {
                  this.PC++;
                  this.IR = _MemoryManager.getOpCode(this.PC);
                  _PCB.PC = this.PC;
                  _PCB.IR = this.IR;
                  break;
                }
                case 'EE': {
                  this.PC++;
                  this.IR = _MemoryManager.getOpCode(this.PC);
                  _PCB.PC = this.PC;
                  _PCB.IR = this.IR;
                  break;
                }
                case 'FF': {
                  this.PC++;
                  this.IR = _MemoryManager.getOpCode(this.PC);
                  _PCB.PC = this.PC;
                  _PCB.IR = this.IR;
                  break;
                }
              }
            }
        }
    }
}
