/**
 * QuadTree class.
 *
 * @constructor
 * @param {object} boundaries - The graph boundaries.
 */
export default class QuadTree {
    data: Float32Array;
    containers: any;
    cache: any;
    lastRectangle: any;
    nodeFilter: any;
    constructor(params?: {
        [key: string]: any;
    });
    add(key: any, x: number, y: number, size: number): this;
    resize(boundaries: {
        x: number;
        y: number;
        width: number;
        height: number;
    }): void;
    clear(): this;
    point(x: number, y: number): any[];
    rectangle(x1: number, y1: number, x2: number, y2: number, height: number): any;
}
