/// <reference types="node" />
/**
 * Sigma.js Camera Class
 * ======================
 *
 * Class designed to store camera information & used to update it.
 */
import { EventEmitter } from "events";
export interface CameraState {
    x?: number;
    y?: number;
    angle?: number;
    ratio?: number;
}
/**
 * Camera class
 *
 * @constructor
 */
export default class Camera extends EventEmitter implements CameraState {
    x: number;
    y: number;
    angle: number;
    ratio: number;
    nextFrame: any;
    previousState: CameraState;
    enabled: boolean;
    constructor();
    /**
     * Method used to enable the camera.
     *
     * @return {Camera}
     */
    enable(): Camera;
    /**
     * Method used to disable the camera.
     *
     * @return {Camera}
     */
    disable(): Camera;
    /**
     * Method used to retrieve the camera's current state.
     *
     * @return {object}
     */
    getState(): CameraState;
    /**
     * Method used to retrieve the camera's previous state.
     *
     * @return {object}
     */
    getPreviousState(): CameraState;
    /**
     * Method used to check whether the camera is currently being animated.
     *
     * @return {boolean}
     */
    isAnimated(): boolean;
    /**
     * Method returning the coordinates of a point from the graph frame to the
     * viewport.
     *
     * @param  {object} dimensions - Dimensions of the viewport.
     * @param  {number} x          - The X coordinate.
     * @param  {number} y          - The Y coordinate.
     * @return {object}            - The point coordinates in the viewport.
     */
    graphToViewport(dimensions: {
        width: number;
        height: number;
    }, x: number, y: number): {
        x: number;
        y: number;
    };
    /**
     * Method returning the coordinates of a point from the viewport frame to the
     * graph frame.
     *
     * @param  {object} dimensions - Dimensions of the viewport.
     * @param  {number} x          - The X coordinate.
     * @param  {number} y          - The Y coordinate.
     * @return {object}            - The point coordinates in the graph frame.
     */
    viewportToGraph(dimensions: {
        width: number;
        height: number;
    }, x: number, y: number): {
        x: number;
        y: number;
    };
    /**
     * Method returning the abstract rectangle containing the graph according
     * to the camera's state.
     *
     * @return {object} - The view's rectangle.
     */
    viewRectangle(dimensions: {
        width: number;
        height: number;
    }): {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        height: number;
    };
    /**
     * Method used to set the camera's state.
     *
     * @param  {object} state - New state.
     * @return {Camera}
     */
    setState(state: CameraState): Camera;
    /**
     * Method used to animate the camera.
     *
     * @param  {object}   state      - State to reach eventually.
     * @param  {object}   options    - Options:
     * @param  {number}     duration - Duration of the animation.
     * @param  {function} callback   - Callback
     * @return {function}            - Return a function to cancel the animation.
     */
    animate(state: CameraState, options?: any, callback?: () => void): this;
    /**
     * Method used to zoom the camera.
     *
     * @param  {number|object} factorOrOptions - Factor or options.
     * @return {function}
     */
    animatedZoom(factorOrOptions: number | {
        [key: string]: any;
    }): this;
    /**
     * Method used to unzoom the camera.
     *
     * @param  {number|object} factorOrOptions - Factor or options.
     * @return {function}
     */
    animatedUnzoom(factorOrOptions: number | {
        [key: string]: any;
    }): this;
    /**
     * Method used to reset the camera.
     *
     * @param  {object} options - Options.
     * @return {function}
     */
    animatedReset(options: {
        [key: string]: any;
    }): this;
}
