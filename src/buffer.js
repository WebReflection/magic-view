const defaultOptions = {
    maxByteLength: 0Xffffff
};

class DynamicBuffer extends ArrayBuffer {
    constructor(length, { maxByteLength = maxByteLength } = defaultOptions) {
    }
}
