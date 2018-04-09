// Type definitions for argon2 v0.14.0

/// <reference types="node" />

export interface Options {
    hashLength?: number;
    timeCost?: number;
    memoryCost?: number;
    parallelism?: number;
    type?: 0 | 1 | 2;
    salt?: Buffer;
    raw?: boolean;
}

export interface NumericLimit {
    max: number;
    min: number;
}

export interface OptionLimits {
    hashLength: NumericLimit;
    memoryCost: NumericLimit;
    timeCost: NumericLimit;
    parallelism: NumericLimit;
}

export const argon2d: 0;
export const argon2i: 1;
export const argon2id: 2;

export const defaults: Options;
export const limits: OptionLimits;
export function hash(plain: Buffer | string, options: Options & {raw: true}): Promise<Buffer>;
export function hash(plain: Buffer | string, options?: Options & {raw?: false}): Promise<string>;
export function verify(hash: string, plain: Buffer | string): Promise<boolean>;
