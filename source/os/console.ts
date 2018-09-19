///<reference path="../globals.ts" />

/* ------------
     Console.ts

     Requires globals.ts

     The OS Console - stdIn and stdOut by default.
     Note: This is not the Shell. The Shell is the "command line interface" (CLI) or interpreter for this console.
     ------------ */

module TSOS {

    export class Console {

        constructor(public currentFont = _DefaultFontFamily,
                    public currentFontSize = _DefaultFontSize,
                    public currentXPosition = 0,
                    public currentYPosition = _DefaultFontSize,
                    public history = [],
                    public historyIndex = 0,
                    public buffer = "") {
        }

        public init(): void {
            this.clearScreen();
            this.resetXY();
        }

        private clearScreen(): void {
            _DrawingContext.clearRect(0, 0, _Canvas.width, _Canvas.height);
        }

        private resetXY(): void {
            this.currentXPosition = 0;
            this.currentYPosition = this.currentFontSize;
        }

        public handleInput(): void {
            while (_KernelInputQueue.getSize() > 0) {
                // Get the next character from the kernel input queue.
                var chr = _KernelInputQueue.dequeue();
                // Check to see if it's "special" (enter or ctrl-c) or "normal" (anything else that the keyboard device driver gave us).
                if (chr === String.fromCharCode(13)) { //     Enter key
                    // The enter key marks the end of a console command, so ...
                    // ... tell the shell ...
                    _OsShell.handleInput(this.buffer);
                    // push the contents of the buffer into the history if the length is greater than 0
                    if (this.buffer.length > 0) {
                      this.history.push(this.buffer);
                      this.historyIndex = 0;
                    }
                    // ... and reset our buffer.
                    this.buffer = "";
                } else if (chr === String.fromCharCode(8)) { // Backspace
                    if(this.buffer.length > 0) {
                      var offset = _DrawingContext.measureText(this.currentFont, this.currentFontSize, this.buffer.substr(this.buffer.length - 1, this.buffer.length));
                      var yOffset = (_DefaultFontSize +
                                     _DrawingContext.fontDescent(this.currentFont, this.currentFontSize) +
                                     _FontHeightMargin)
                      _DrawingContext.clearRect(this.currentXPosition - offset, this.currentYPosition - yOffset/2, offset, yOffset);
                      this.currentXPosition = this.currentXPosition - offset;
                      this.buffer = this.buffer.substr(0, this.buffer.length - 1);
                    }
                } else if (chr === String.fromCharCode(9)) { // Tab
                  if(this.buffer.length > 0) {
                    var completed = _OsShell.completeCommand(this.buffer);
                    if (completed.length > 0) {
                      var offset = _DrawingContext.measureText(this.currentFont, this.currentFontSize, this.buffer);
                      var yOffset = (_DefaultFontSize +
                                     _DrawingContext.fontDescent(this.currentFont, this.currentFontSize) +
                                     _FontHeightMargin)
                      _DrawingContext.clearRect(this.currentXPosition - offset, this.currentYPosition - yOffset/2, offset, yOffset);
                      this.currentXPosition = this.currentXPosition - offset;
                      this.buffer = completed;
                      this.putText(this.buffer);
                    }
                  }
                } else if (chr === String.fromCharCode(40)) {
                  if (this.history.length > 0) {
                    this.historyIndex = this.historyIndex + 1;
                    if (this.historyIndex >= this.history.length) {
                      this.historyIndex = 0;
                    }
                    var offset = _DrawingContext.measureText(this.currentFont, this.currentFontSize, this.buffer);
                    var yOffset = (_DefaultFontSize +
                                   _DrawingContext.fontDescent(this.currentFont, this.currentFontSize) +
                                   _FontHeightMargin)
                    _DrawingContext.clearRect(this.currentXPosition - offset, this.currentYPosition - yOffset/2, offset, yOffset);
                    this.currentXPosition = this.currentXPosition - offset;
                    this.buffer = this.history[this.historyIndex];
                    this.putText(this.buffer);
                  }
                } else if (chr === String.fromCharCode(38)) {
                  if (this.history.length > 0) {
                    this.historyIndex = this.historyIndex - 1;
                    if (this.historyIndex < 0) {
                      this.historyIndex = this.history.length - 1;
                    }
                    var offset = _DrawingContext.measureText(this.currentFont, this.currentFontSize, this.buffer);
                    var yOffset = (_DefaultFontSize +
                                   _DrawingContext.fontDescent(this.currentFont, this.currentFontSize) +
                                   _FontHeightMargin)
                    _DrawingContext.clearRect(this.currentXPosition - offset, this.currentYPosition - yOffset/2, offset, yOffset);
                    this.currentXPosition = this.currentXPosition - offset;
                    this.buffer = this.history[this.historyIndex];
                    this.putText(this.buffer);
                  }
                } else if (chr === String.fromCharCode(188)) {
                  this.putText(',');
                  this.buffer += ',';
                } else if (chr === String.fromCharCode(192)) {
                  this.putText('`');
                  this.buffer += '``';
                } else if (chr === String.fromCharCode(190)) {
                  this.putText('.');
                  this.buffer += '.';
                } else if (chr === String.fromCharCode(186)) {
                  this.putText(';');
                  this.buffer += ';';
                } else if (chr === String.fromCharCode(222)) {
                  this.putText('\'');
                  this.buffer += '\'';
                } else if (chr === String.fromCharCode(219)) {
                  this.putText('[');
                  this.buffer += '[';
                } else if (chr === String.fromCharCode(221)) {
                  this.putText(']');
                  this.buffer += ']';
                } else if (chr === String.fromCharCode(220)) {
                  this.putText('\\');
                  this.buffer += '\\';
                } else if (chr === String.fromCharCode(187)) {
                  this.putText('=');
                  this.buffer += '=';
                } else {
                    // This is a "normal" character, so ...
                    // ... draw it on the screen...
                    this.putText(chr);
                    // ... and add it to our buffer.
                    this.buffer += chr;
                }
                // TODO: Write a case for Ctrl-C.
            }
        }

        public putText(text): void {
            // My first inclination here was to write two functions: putChar() and putString().
            // Then I remembered that JavaScript is (sadly) untyped and it won't differentiate
            // between the two.  So rather than be like PHP and write two (or more) functions that
            // do the same thing, thereby encouraging confusion and decreasing readability, I
            // decided to write one function and use the term "text" to connote string or char.
            //
            // UPDATE: Even though we are now working in TypeScript, char and string remain undistinguished.
            //         Consider fixing that.
            if (text !== "") {
                // find how long the
                var offset = _DrawingContext.measureText(this.currentFont, this.currentFontSize, text);
                if (offset > _Canvas.width) {
                  var averageLetterWidth = offset / text.length;
                  var lettersPerLine = _Canvas.width / averageLetterWidth;
                  for (var i = 0; i < lettersPerLine % text.length - 1; i++) {
                    var textToPrint = text.substring(0, lettersPerLine);
                    _DrawingContext.drawText(this.currentFont, this.currentFontSize, this.currentXPosition, this.currentYPosition, textToPrint);
                    this.advanceLine();
                    text = text.substring(lettersPerLine);
                  }
                }
                _DrawingContext.drawText(this.currentFont, this.currentFontSize, this.currentXPosition, this.currentYPosition, text);
                // Move the current X position.
                this.currentXPosition = this.currentXPosition + offset;
            }
         }

        public advanceLine(): void {
            this.currentXPosition = 0;
            /*
             * Font size measures from the baseline to the highest point in the font.
             * Font descent measures from the baseline to the lowest point in the font.
             * Font height margin is extra spacing between the lines.
             */
            var yOffset = _DefaultFontSize +
                      _DrawingContext.fontDescent(this.currentFont, this.currentFontSize) +
                      _FontHeightMargin;
            this.currentYPosition += yOffset

            // TODO: Handle scrolling. (iProject 1)
            if (this.currentYPosition > _Canvas.height) {
              this.currentYPosition -= yOffset;
              var tempImage = _DrawingContext.getImageData(0, yOffset, _Canvas.width, _Canvas.height - yOffset);
              this.clearScreen();
              _DrawingContext.putImageData(tempImage, 0, 0);
            }
        }
    }
 }
