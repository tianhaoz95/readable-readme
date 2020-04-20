/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import { NamedTensorInfoMap, TensorInfo } from './kernel_registry';
import { PixelData } from './types';
export declare const Add = "Add";
export declare type AddInputs = BinaryInputs;
export declare const AddN = "AddN";
export declare type AddNInputs = TensorInfo[];
export declare type BinaryInputs = Pick<NamedTensorInfoMap, 'a' | 'b'>;
export declare const Div = "Div";
export declare type DivInputs = BinaryInputs;
export declare const FusedBatchNorm = "FusedBatchNorm";
export declare type FusedBatchNormInputs = Pick<NamedTensorInfoMap, 'x' | 'scale' | 'offset' | 'mean' | 'variance'>;
export interface FusedBatchNormAttrs {
    varianceEpsilon: number;
}
export declare const SquaredDifference = "SquaredDifference";
export declare type SquaredDifferenceInputs = BinaryInputs;
export declare const Square = "Square";
export declare type SquareInputs = Pick<NamedTensorInfoMap, 'x'>;
export declare const Transpose = "Transpose";
export declare type TransposeInputs = Pick<NamedTensorInfoMap, 'x'>;
export interface TransposeAttrs {
    perm: number[];
}
export declare const NonMaxSuppressionV5 = "NonMaxSuppressionV5";
export declare type NonMaxSuppressionV5Inputs = Pick<NamedTensorInfoMap, 'boxes' | 'scores'>;
export interface NonMaxSuppressionV5Attrs {
    maxOutputSize: number;
    iouThreshold: number;
    scoreThreshold: number;
    softNmsSigma: number;
}
export declare const BroadcastTo = "BroadcastTo";
export declare type BroadcastToInputs = Pick<NamedTensorInfoMap, 'x'>;
export interface BroadCastToAttrs {
    shape: number[];
    inputShape: number[];
}
export declare const OneHot = "OneHot";
export declare type OneHotInputs = Pick<NamedTensorInfoMap, 'indices'>;
export interface OneHotAttrs {
    depth: number;
    onValue: number;
    offValue: number;
}
export declare const Identity = "Identity";
export declare type IdentityInputs = Pick<NamedTensorInfoMap, 'x'>;
export declare const Tile = "Tile";
export declare type TileInputs = Pick<NamedTensorInfoMap, 'x'>;
export interface TileAttrs {
    reps: number[];
}
export declare const PadV2 = "PadV2";
export declare type PadV2Inputs = Pick<NamedTensorInfoMap, 'x'>;
export interface PadV2Attrs {
    paddings: Array<[number, number]>;
    constantValue: number;
}
/**
 * TensorFlow.js-only kernels
 */
export declare const FromPixels = "FromPixels";
export interface FromPixelsInputs {
    pixels: PixelData | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
}
export interface FromPixelsAttrs {
    numChannels: number;
}
export declare const MaxPoolWithArgmax = "MaxPoolWithArgmax";
export declare type MaxPoolWithArgmaxInputs = Pick<NamedTensorInfoMap, 'x'>;
export interface MaxPoolWithArgmaxAttrs {
    filterSize: [number, number] | number;
    strides: [number, number] | number;
    pad: 'valid' | 'same' | number;
    includeBatchInIndex: boolean;
}
