///<reference path="../globals.ts" />

/* ------------
     memory.ts

     Requires global.ts.
     ------------ */

module TSOS {

    export class Memory {

        constructor(public mainMemory = ["00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00",
                                         "00", "00", "00", "00", "00", "00", "00", "00"],
                    public partition1 = 0,
                    public partition2 = 256,
                    public partition3 = 512) {
        }

        public init(): void {
            this.mainMemory = ["00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00",
                               "00", "00", "00", "00", "00", "00", "00", "00"];
          this.partition1 = 0;
          this.partition2 = 256;
          this.partition3 = 512;
        }
    }
}
