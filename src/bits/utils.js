//@ts-check

/**
 * @param {number[]} buffer
 * @param {Uint8Array} typed
 * @param {number} i
 */
export const read = (buffer, typed, i) => {
    let t = 0, length = typed.length;
    while (t < length) typed[t++] = buffer[i++];
};

/**
 * @param {number[]} buffer
 * @param {Uint8Array} typed
 * @param {number} i
 */
export const write = (buffer, typed, i) => {
    let t = 0, length = typed.length;
    while (t < length) buffer[i++] = typed[t++];
};
