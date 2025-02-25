# MagicView

A [DataView](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) like utility that automatically grows while adding data to its underlying buffer.

```ts
import MagicView from 'https://esm.run/@webreflection/magic-view';

type TypedArray = Int8Array     |
                  Uint8Array    |
                  Float16Array  |
                  Int16Array    |
                  Uint16Array   |
                  Float32Array  |
                  Int32Array    |
                  Uint32Array   |
                  Float64Array  |
                  BigInt64Array |
                  BigUint64Array;

type Init = number | number[] | ArrayBuffer | TypedArray;

class MagicView extends DataView {
    // meta-description of the constructor per `init` type
    constructor(init:Init?, byteOffset = 0) {
        if (typeof init === 'number')       // 0xFFFF
            this.buffer = new ArrayBuffer(init);
        else if (Array.isArray(init))       // [1, 2, 3, 4]
            this.buffer = new Uint8Array(init).buffer;
        else if (ArrayBuffer.isView(init))  // Uint8Array or others
            this.buffer = init.buffer;
        else if (init)                      // ArrayBuffer
            this.buffer = init;
        else
            this.buffer = new ArrayBuffer(0xFFFF);

        // internally the buffer is handled via optional byteOffset
        this.#view = new Uint8Array(this.buffer, byteOffset);
    }

    // like any other DataView method except
    setTyped(byteOffset:number, typed:TypedArray) {}

    // after all operations are done and the `buffer`
    // retrieved it's possible to start from 0 again
    reset() {}
}
```
