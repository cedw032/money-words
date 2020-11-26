import type {
    PositiveNumber,
    TripleDigitNumber,
    DoubleDigitNumber,
} from './numbers'
import {
    isPositiveNumber,
    isCorrectPrecision,
    isTripleDigitNumber,
    extractWholeNumber,
} from './numbers'

export type ValidMoney = PositiveNumber & {
    readonly __ValidMoney: unique symbol
}
export type Dollars = TripleDigitNumber & { readonly __Dollars: unique symbol }
export type Cents = DoubleDigitNumber & { readonly __Cents: unique symbol }

export function isValidMoney(n: number): n is ValidMoney {
    return (
        isPositiveNumber(n) &&
        isCorrectPrecision(n, 2) &&
        isTripleDigitNumber(extractWholeNumber(n))
    )
}

export function toValidMoney(n: number): ValidMoney | undefined {
    return isValidMoney(n) ? n : undefined
}

export function hasDollars(m: ValidMoney): boolean {
    return extractDollars(m) !== 0
}
export function hasCents(m: ValidMoney): boolean {
    return extractCents(m) !== 0
}

export function extractDollars(m: ValidMoney): Dollars {
    return extractWholeNumber(m) as Dollars
}
export function extractCents(m: ValidMoney): Cents {
    const maybeCents = `${m}`.split('.')[1]
    return (maybeCents === undefined
        ? 0
        : maybeCents.length === 1
        ? +maybeCents * 10
        : +maybeCents) as Cents
}
