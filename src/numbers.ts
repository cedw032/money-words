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
export type PrecisionValue = 0 | 1 | 2 | 3

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

export function extractWholeNumber(n: PositiveNumber): WholeNumber {
    return Math.floor(n) as WholeNumber
}
export function extractTripleDigitNumber(n: WholeNumber): TripleDigitNumber {
    return (n % 1000) as TripleDigitNumber
}
export function extractDoubleDigitNumber(n: WholeNumber): DoubleDigitNumber {
    return (n % 100) as DoubleDigitNumber
}
export function extractSingleDigitNumber(n: WholeNumber): SingleDigitNumber {
    return (n % 10) as SingleDigitNumber
}

export function toHundreds(n: TripleDigitNumber): SingleDigitNumber {
    return Math.floor(n / 100) as SingleDigitNumber
}
export function toTens(n: DoubleDigitNumber): SingleDigitNumber {
    return Math.floor(n / 10) as SingleDigitNumber
}

export function isCorrectPrecision(
    n: number,
    precision: PrecisionValue
): boolean {
    if (!isRealNumber(n)) {
        return false
    }
    const [, partial] = `${n}`.split('.')
    return partial === undefined || partial.length <= precision
}
