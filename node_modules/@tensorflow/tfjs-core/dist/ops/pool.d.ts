/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
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
import { Tensor3D, Tensor4D, Tensor5D } from '../tensor';
import { TensorLike } from '../types';
/**
 * Computes the 2D max pooling of an image.
 *
 * @param x The input tensor, of rank 4 or rank 3 of shape
 *     `[batch, height, width, inChannels]`. If rank 3, batch of 1 is assumed.
 * @param filterSize The filter size: `[filterHeight, filterWidth]`. If
 *     `filterSize` is a single number, then `filterHeight == filterWidth`.
 * @param strides The strides of the pooling: `[strideHeight, strideWidth]`. If
 *     `strides` is a single number, then `strideHeight == strideWidth`.
 * @param pad The type of padding algorithm.
 *    - `same` and stride 1: output will be of same size as input,
 *       regardless of filter size.
 *    - `valid`: output will be smaller than input if filter is larger
 *       than 1x1.
 *    - For more info, see this guide:
 *     [https://www.tensorflow.org/api_guides/python/nn#Convolution](
 *          https://www.tensorflow.org/api_guides/python/nn#Convolution)
 * @param dimRoundingMode The rounding mode used when computing output
 *     dimensions if pad is a number. If none is provided, it will not round
 *     and error if the output is of fractional size.
 */
/** @doc {heading: 'Operations', subheading: 'Convolution'} */
declare function maxPool_<T extends Tensor3D | Tensor4D>(x: T | TensorLike, filterSize: [number, number] | number, strides: [number, number] | number, pad: 'valid' | 'same' | number, dimRoundingMode?: 'floor' | 'round' | 'ceil'): T;
/**
 * Computes the 2D average pooling of an image.
 *
 * @param x The input tensor, of rank 4 or rank 3 of shape
 *     `[batch, height, width, inChannels]`. If rank 3, batch of 1 is assumed.
 * @param filterSize The filter size: `[filterHeight, filterWidth]`. If
 *     `filterSize` is a single number, then `filterHeight == filterWidth`.
 * @param strides The strides of the pooling: `[strideHeight, strideWidth]`. If
 *     `strides` is a single number, then `strideHeight == strideWidth`.
 * @param pad The type of padding algorithm:
 *    - `same` and stride 1: output will be of same size as input,
 *       regardless of filter size.
 *    - `valid`: output will be smaller than input if filter is larger
 *       than 1x1.
 *    - For more info, see this guide:
 *     [https://www.tensorflow.org/api_guides/python/nn#Convolution](
 *         https://www.tensorflow.org/api_guides/python/nn#Convolution)
 * @param dimRoundingMode The rounding mode used when computing output
 *     dimensions if pad is a number. If none is provided, it will not round
 *     and error if the output is of fractional size.
 */
/** @doc {heading: 'Operations', subheading: 'Convolution'} */
declare function avgPool_<T extends Tensor3D | Tensor4D>(x: T | TensorLike, filterSize: [number, number] | number, strides: [number, number] | number, pad: 'valid' | 'same' | number, dimRoundingMode?: 'floor' | 'round' | 'ceil'): T;
/**
 * Performs an N-D pooling operation
 *
 * @param input The input tensor, of rank 4 or rank 3 of shape
 *     `[batch, height, width, inChannels]`. If rank 3, batch of 1 is assumed.
 * @param windowShape The filter size: `[filterHeight, filterWidth]`. If
 *     `filterSize` is a single number, then `filterHeight == filterWidth`.
 * @param poolingType The type of pooling, either 'max' or 'avg'.
 * @param pad The type of padding algorithm:
 *    - `same` and stride 1: output will be of same size as input,
 *       regardless of filter size.
 *    - `valid`: output will be smaller than input if filter is larger
 *       than 1x1.
 *    - For more info, see this guide:
 *     [https://www.tensorflow.org/api_guides/python/nn#Convolution](
 *         https://www.tensorflow.org/api_guides/python/nn#Convolution)
 * @param dilations The dilation rates: `[dilationHeight, dilationWidth]`
 *     in which we sample input values across the height and width dimensions
 *     in dilated pooling. Defaults to `[1, 1]`. If `dilationRate` is a single
 *     number, then `dilationHeight == dilationWidth`. If it is greater than
 *     1, then all values of `strides` must be 1.
 * @param strides The strides of the pooling: `[strideHeight, strideWidth]`. If
 *     `strides` is a single number, then `strideHeight == strideWidth`.
 */
/** @doc {heading: 'Operations', subheading: 'Convolution'} */
declare function pool_<T extends Tensor3D | Tensor4D>(input: T | TensorLike, windowShape: [number, number] | number, poolingType: 'avg' | 'max', pad: 'valid' | 'same' | number, dilations?: [number, number] | number, strides?: [number, number] | number): T;
/**
 * Computes the 3D average pooling.
 *
 * ```js
 * const x = tf.tensor5d([1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 2, 2, 1]);
 * const result = tf.avgPool3d(x, 2, 1, 'valid');
 * result.print();
 * ```
 *
 * @param x The input tensor, of rank 5 or rank 4 of shape
 *     `[batch, depth, height, width, inChannels]`.
 * @param filterSize The filter size:
 *     `[filterDepth, filterHeight, filterWidth]`.
 *     If `filterSize` is a single number,
 *     then `filterDepth == filterHeight == filterWidth`.
 * @param strides The strides of the pooling:
 *     `[strideDepth, strideHeight, strideWidth]`.
 *     If `strides` is a single number,
 *     then `strideDepth == strideHeight == strideWidth`.
 * @param pad The type of padding algorithm.
 *    - `same` and stride 1: output will be of same size as input,
 *       regardless of filter size.
 *    - `valid`: output will be smaller than input if filter is larger
 *       than 1*1x1.
 *    - For more info, see this guide:
 *     [https://www.tensorflow.org/api_guides/python/nn#Convolution](
 *          https://www.tensorflow.org/api_guides/python/nn#Convolution)
 * @param dimRoundingMode The rounding mode used when computing output
 *     dimensions if pad is a number. If none is provided, it will not round
 *     and error if the output is of fractional size.
 * @param dataFormat An optional string from: "NDHWC", "NCDHW". Defaults to
 *     "NDHWC". Specify the data format of the input and output data. With the
 *     default format "NDHWC", the data is stored in the order of: [batch,
 *     depth, height, width, channels]. Only "NDHWC" is currently supported.
 * @param dilations The dilation rates:
 *     `[dilationDepth, dilationHeight, dilationWidth]`
 *     in which we sample input values across the depth, height and width
 *     dimensions in dilated pooling.
 *     Defaults to `[1, 1, 1]`. If `dilations` is a single number,
 *     then `dilationDepth == dilationHeight == dilationWidth`.
 *     If it is greater than 1, then all values of `strides` must be 1.
 */
/** @doc {heading: 'Operations', subheading: 'Convolution'} */
declare function avgPool3d_<T extends Tensor4D | Tensor5D>(x: T | TensorLike, filterSize: [number, number, number] | number, strides: [number, number, number] | number, pad: 'valid' | 'same' | number, dimRoundingMode?: 'floor' | 'round' | 'ceil', dataFormat?: 'NDHWC' | 'NCDHW', dilations?: [number, number, number] | number): T;
/**
 * Computes the 3D max pooling.
 *
 * ```js
 * const x = tf.tensor5d([1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 2, 2, 1]);
 * const result = tf.maxPool3d(x, 2, 1, 'valid');
 * result.print();
 * ```
 *
 * @param x The input tensor, of rank 5 or rank 4 of shape
 *     `[batch, depth, height, width, inChannels]`.
 * @param filterSize The filter size:
 *     `[filterDepth, filterHeight, filterWidth]`.
 *     If `filterSize` is a single number,
 *     then `filterDepth == filterHeight == filterWidth`.
 * @param strides The strides of the pooling:
 *     `[strideDepth, strideHeight, strideWidth]`.
 *     If `strides` is a single number,
 *     then `strideDepth == strideHeight == strideWidth`.
 * @param pad The type of padding algorithm.
 *    - `same` and stride 1: output will be of same size as input,
 *       regardless of filter size.
 *    - `valid`: output will be smaller than input if filter is larger
 *       than 1*1x1.
 *    - For more info, see this guide:
 *     [https://www.tensorflow.org/api_guides/python/nn#Convolution](
 *          https://www.tensorflow.org/api_guides/python/nn#Convolution)
 * @param dimRoundingMode The rounding mode used when computing output
 *     dimensions if pad is a number. If none is provided, it will not round
 *     and error if the output is of fractional size.
 * @param dataFormat An optional string from: "NDHWC", "NCDHW". Defaults to
 *     "NDHWC". Specify the data format of the input and output data. With the
 *     default format "NDHWC", the data is stored in the order of: [batch,
 *     depth, height, width, channels]. Only "NDHWC" is currently supported.
 * @param dilations The dilation rates:
 *     `[dilationDepth, dilationHeight, dilationWidth]`
 *     in which we sample input values across the depth, height and width
 *     dimensions in dilated pooling.
 *     Defaults to `[1, 1, 1]`. If `dilations` is a single number,
 *     then `dilationDepth == dilationHeight == dilationWidth`.
 *     If it is greater than 1, then all values of `strides` must be 1.
 */
/** @doc {heading: 'Operations', subheading: 'Convolution'} */
declare function maxPool3d_<T extends Tensor4D | Tensor5D>(x: T | TensorLike, filterSize: [number, number, number] | number, strides: [number, number, number] | number, pad: 'valid' | 'same' | number, dimRoundingMode?: 'floor' | 'round' | 'ceil', dataFormat?: 'NDHWC' | 'NCDHW', dilations?: [number, number, number] | number): T;
export declare const maxPool: typeof maxPool_;
export declare const avgPool: typeof avgPool_;
export declare const pool: typeof pool_;
export declare const maxPool3d: typeof maxPool3d_;
export declare const avgPool3d: typeof avgPool3d_;
export {};
