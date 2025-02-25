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
            this.#buffer = new ArrayBuffer(init);
        else if (Array.isArray(init))       // [1, 2, 3, 4]
            this.#buffer = new Uint8Array(init).buffer;
        else if (ArrayBuffer.isView(init))  // Uint8Array or others
            this.#buffer = init.buffer;
        else if (init)                      // ArrayBuffer
            this.#buffer = init;
        else
            this.#buffer = new ArrayBuffer(0xFFFF);

        // internally the buffer is handled via optional byteOffset
        this.#view = new Uint8Array(this.#buffer, byteOffset);
    }

    // returns the current Uint8Array view length which
    // might change in the future.
    get byteLength() {}

    // when accessed, it seals the deal, meaning all operations
    // after will likely fail due detached buffer. This is meant
    // to be accessed only after all operations are done.
    get buffer() {}

    // returns the current size of the written bytes which
    // will be the equivalent of the returned buffer byteLength
    get size() {}

    // like any other DataView method except it accepts
    // any TypedArray and it adds that to the underlying buffer
    // on matter the length of it: it will grow if needed.
    setTyped(byteOffset:number, typed:TypedArray) {}

    // after all operations are done and the `buffer`
    // has been retrieved, reuse this same instance
    // for better JIT performance, where possible.
    reset() {}
}
```

### What problem does this module solve?

The *DataView* primitive is pretty awesome but it's decoupled with the handling of the *buffer* in term of size, even if the *byteOffset* is mandatory and it should be tracked elsewhere while building up the final buffer.

Here, things are simpler:

```js
// add sequentially 3 Int32 values
mv.setInt32(mv.size, 123);
mv.setInt32(mv.size, 456);
mv.setInt32(mv.size, 789);
```

As the size of each numeric type is known it made somehow sense to me to have a thin indirection able to keep "*growing*" the buffer, without using a *resizable* *ArrayBuffer* at all, simply transfering buffers each time size boundaries are touched.

This utility avoids headaches around how much big should be the `maxByteLength` for a *resizable ArrayBuffer*, working as fast as a resizable *SharedArrayBuffer* would work but it tries to keep the amount of needed/used *RAM* minimal, with a default set to `0xFFFF` (*64K of RAM*) which is also the size it increments the buffer each time that limit is reached.

Such size is retrieved / inferred when an explicit initial size or *ArrayBuffer* with a specific size has been defined, so that it could start from more than *64K* or even less, if your encoding/decoding is going to be narrowed somehow.

As summary, this module is ideal to *encode* incrementally while a *DataView* would be ideal to *decode* as its performance would be unmatched, yet this module could be used to *decode* too with 2X slowdown due extra operations needed to populate each right number via the right data.
