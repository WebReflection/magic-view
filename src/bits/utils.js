//@ts-check

export const LENGTH = 0XFFFF;

/**
 * @param {Uint8Array} view
 * @param {Uint8Array} typed
 * @param {number} i
 */
export const read = (view, typed, i) => {
    let t = 0, length = typed.length;
    while (t < length) typed[t++] = view[i++];
};

/**
 * @param {import("../wrapper.js").default} wrapper
 * @param {Uint8Array} typed
 * @param {number} i
 */
export const write = (wrapper, typed, i) => {
    let view = wrapper.view, size = i + typed.length;
    if (view.length < size) view = wrapper.grow(size);
    view.set(typed, i);
    if (wrapper.i < size) wrapper.i = size;
};
