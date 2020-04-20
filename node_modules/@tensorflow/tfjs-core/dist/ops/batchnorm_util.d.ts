import { Tensor } from '../tensor';
import { Rank } from '../types';
export declare function warnDeprecation(): void;
export declare function xAs4D<R extends Rank>(x: Tensor<R>): Tensor<Rank.R4>;
