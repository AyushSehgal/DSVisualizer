/**
 * Sigma.js Utils
 * ===============
 *
 * Various helper functions & classes used throughout the library.
 */
/**
 * Checks whether the given value is a plain object.
 *
 * @param  {mixed}   value - Target value.
 * @return {boolean}
 */
export declare function isPlainObject(value: any): boolean;
/**
 * Very simple recursive Object.assign-like function.
 *
 * @param  {object} target       - First object.
 * @param  {object} [...objects] - Objects to merge.
 * @return {object}
 */
export declare function assign(target: object, ...objects: any[]): object;
