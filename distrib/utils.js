/* --------
   Utils.ts

   Utility functions.
   -------- */
var TSOS;
(function (TSOS) {
    var Utils = /** @class */ (function () {
        function Utils() {
        }
        Utils.trim = function (str) {
            // Use a regular expression to remove leading and trailing spaces.
            return str.replace(/^\s+ | \s+$/g, "");
            /*
            Huh? WTF? Okay... take a breath. Here we go:
            - The "|" separates this into two expressions, as in A or B.
            - "^\s+" matches a sequence of one or more whitespace characters at the beginning of a string.
            - "\s+$" is the same thing, but at the end of the string.
            - "g" makes is global, so we get all the whitespace.
            - "" is nothing, which is what we replace the whitespace with.
            */
        };
        Utils.rot13 = function (str) {
            /*
               This is an easy-to understand implementation of the famous and common Rot13 obfuscator.
               You can do this in three lines with a complex regular expression, but I'd have
               trouble explaining it in the future.  There's a lot to be said for obvious code.
            */
            var retVal = "";
            for (var i in str) { // We need to cast the string to any for use in the for...in construct.
                var ch = str[i];
                var code = 0;
                if ("abcedfghijklmABCDEFGHIJKLM".indexOf(ch) >= 0) {
                    code = str.charCodeAt(Number(i)) + 13; // It's okay to use 13.  It's not a magic number, it's called rot13.
                    retVal = retVal + String.fromCharCode(code);
                }
                else if ("nopqrstuvwxyzNOPQRSTUVWXYZ".indexOf(ch) >= 0) {
                    code = str.charCodeAt(Number(i)) - 13; // It's okay to use 13.  See above.
                    retVal = retVal + String.fromCharCode(code);
                }
                else {
                    retVal = retVal + ch;
                }
            }
            return retVal;
        };
        Utils.IntToHex = function (integer) {
            var temp = integer.toString(16);
            if (temp.length < 2) {
                temp = "0" + temp;
            }
            return temp;
        };
        Utils.HexToInt = function (hex) {
            return parseInt(hex, 16);
        };
        Utils.StringToHex = function (str) {
            var toReturn = "";
            for (var i = 0; i < str.length; i++) {
                toReturn = toReturn + this.IntToHex(str.charCodeAt(i)) + " ";
            }
            return toReturn.substring(0, toReturn.length - 1);
        };
        Utils.HexToString = function (hex) {
            var chars = hex.split(" ");
            var toReturn = "";
            for (var i = 0; i < chars.length; i++) {
                if (chars[i] !== "00") {
                    toReturn = toReturn + String.fromCharCode(this.HexToInt(chars[i]));
                }
            }
            return toReturn;
        };
        Utils.toggleSingleStepMode = function () {
            singleStepMode = !singleStepMode;
            console.log(singleStepMode);
        };
        Utils.executeSingleStep = function () {
            executeSingleStep = true;
        };
        return Utils;
    }());
    TSOS.Utils = Utils;
})(TSOS || (TSOS = {}));
