type RealNumber = number & { readonly __RealNumber: unique symbol }
export type PositiveNumber = RealNumber & {
    readonly __PositiveNumber: unique symbol
}
export type WholeNumber = PositiveNumber & {
    readonly __WholeNumber: unique symbol
}

export type TripleDigitNumber = WholeNumber & {
    readonly __TripleDigitNumber: unique symbol
}
export type DoubleDigitNumber = TripleDigitNumber & {
    readonly __DoubleDigitNumber: unique symbol
}
export type SingleDigitNumber = DoubleDigitNumber & {
    readonly __SingleDigitNumber: unique symbol
}

export function isRealNumber(n: number): n is RealNumber {
    return n - n === 0
}
export function isPositiveNumber(n: number): n is PositiveNumber {
    return isRealNumber(n) && n >= 0
}
export function isWholeNumber(n: number): n is WholeNumber {
    return isPositiveNumber(n) && extractWholeNumber(n) === n
}
export function isTripleDigitNumber(n: number): n is TripleDigitNumber {
    return isWholeNumber(n) && extractTripleDigitNumber(n) === n
}

export const extractWholeNumber: (n: PositiveNumber) => WholeNumber = (n) =>
    Math.floor(n) as WholeNumber
export const extractTripleDigitNumber: (n: WholeNumber) => TripleDigitNumber = (
    n
) => (n % 1000) as TripleDigitNumber
export const extractDoubleDigitNumber: (n: WholeNumber) => DoubleDigitNumber = (
    n
) => (n % 100) as DoubleDigitNumber
export const extractSingleDigitNumber: (n: WholeNumber) => SingleDigitNumber = (
    n
) => (n % 10) as SingleDigitNumber

export const toHundreds: (n: TripleDigitNumber) => SingleDigitNumber = (n) =>
    Math.floor(n / 100) as SingleDigitNumber
export const toTens: (n: DoubleDigitNumber) => SingleDigitNumber = (n) =>
    Math.floor(n / 10) as SingleDigitNumber

export const isCorrectPrecision: (
    n: number,
    precision: 0 | 1 | 2 | 3
) => boolean = (n, precision) => {
    if (!isRealNumber(n)) {
        return false
    }
    const [, partial] = `${n}`.split('.')
    return partial === undefined || partial.length <= precision
}
