///<reference path="../globals.ts" />
///<reference path="deviceDriver.ts" />

/* ----------------------------------
   DeviceDriverKeyboard.ts

   Requires deviceDriver.ts

   The Kernel Keyboard Device Driver.
   ---------------------------------- */

module TSOS {

    // Extends DeviceDriver
    export class DeviceDriverKeyboard extends DeviceDriver {

        constructor() {
            // Override the base method pointers.

            // The code below cannot run because "this" can only be
            // accessed after calling super.
            //super(this.krnKbdDriverEntry, this.krnKbdDispatchKeyPress);
            super();
            this.driverEntry = this.krnKbdDriverEntry;
            this.isr = this.krnKbdDispatchKeyPress;
        }

        public krnKbdDriverEntry() {
            // Initialization routine for this, the kernel-mode Keyboard Device Driver.
            this.status = "loaded";
            // More?
        }

        public krnKbdDispatchKeyPress(params) {
            // Parse the params.    TODO: Check that the params are valid and osTrapError if not.
            var keyCode = params[0];
            var isShifted = params[1];
            _Kernel.krnTrace("Key code:" + keyCode + " shifted:" + isShifted);
            var chr = "";
            // Check to see if we even want to deal with the key that was pressed.
            if (((keyCode >= 65) && (keyCode <= 90)) ||   // A..Z
                ((keyCode >= 97) && (keyCode <= 123))) {  // a..z {
                // Determine the character we want to display.
                // Assume it's lowercase...
                chr = String.fromCharCode(keyCode + 32);
                // ... then check the shift key and re-adjust if necessary.
                if (isShifted) {
                    chr = String.fromCharCode(keyCode);
                }
                // TODO: Check for caps-lock and handle as shifted if so.
                _KernelInputQueue.enqueue(chr);
            } else if (isShifted) {
              if (keyCode == 48) {
                chr = ")";
                _KernelInputQueue.enqueue(chr);
              } else if (keyCode == 49){
                chr = "!";
                _KernelInputQueue.enqueue(chr);
              } else if (keyCode == 50){
                chr = "@";
                _KernelInputQueue.enqueue(chr);
              } else if (keyCode == 51){
                chr = "#";
                _KernelInputQueue.enqueue(chr);
              } else if (keyCode == 52){
                chr = "$";
                _KernelInputQueue.enqueue(chr);
              } else if (keyCode == 53){
                chr = "%";
                _KernelInputQueue.enqueue(chr);
              } else if (keyCode == 54){
                chr = "^";
                _KernelInputQueue.enqueue(chr);
              } else if (keyCode == 55){
                chr = String.fromCharCode(355);
                _KernelInputQueue.enqueue(chr);
              } else if (keyCode == 56){
                chr = "*";
                _KernelInputQueue.enqueue(chr);
              } else if (keyCode == 57) {
                chr = String.fromCharCode(357);
                _KernelInputQueue.enqueue(chr);
              } else if (keyCode == 192){
                chr = "~";
                _KernelInputQueue.enqueue(chr);
              } else if (keyCode == 187){
                chr = "+";
                _KernelInputQueue.enqueue(chr);
              } else if (keyCode == 219){
                chr = "{";
                _KernelInputQueue.enqueue(chr);
              } else if (keyCode == 221){
                chr = "}";
                _KernelInputQueue.enqueue(chr);
              } else if (keyCode == 220){
                chr = "|";
                _KernelInputQueue.enqueue(chr);
              } else if (keyCode == 186){
                chr = ":";
                _KernelInputQueue.enqueue(chr);
              } else if (keyCode == 222){
                chr = "\"";
                _KernelInputQueue.enqueue(chr);
              } else if (keyCode == 188){
                chr = "<";
                _KernelInputQueue.enqueue(chr);
              } else if (keyCode == 190){
                chr = ">";
                _KernelInputQueue.enqueue(chr);
              }
            }else if (((keyCode >= 48) && (keyCode <= 57)) ||   // digits
                        (keyCode == 32)                     ||   // space
                        (keyCode == 13)                     ||   // enter
                        (keyCode == 8)                      ||   // backspace
                        (keyCode == 9)                      ||   // tab
                        (keyCode == 38)                      ||   // up arrow
                        (keyCode == 40)                      ||   // down arrow
                        (keyCode == 192)                      ||   // backtick
                        (keyCode == 188)                      ||   // comma
                        (keyCode == 190)                      ||   // period
                        (keyCode == 186)                      ||   // semicolon
                        (keyCode == 222)                      ||   // apostrophe
                        (keyCode == 219)                      ||   // left square bracket
                        (keyCode == 221)                      ||   // right square bracket
                        (keyCode == 220)                      ||   // backslash
                        (keyCode == 187)){                        // equals
                chr = String.fromCharCode(keyCode);
                _KernelInputQueue.enqueue(chr);
            }
        }
    }
}
