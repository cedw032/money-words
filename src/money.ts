import type {
    PositiveNumber,
    TripleDigitNumber,
    DoubleDigitNumber,
} from './numbers'
import {
    isPositiveNumber,
    isCorrectPrecision,
    isTripleDigitNumber,
    extractDoubleDigitNumber,
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

export const toValidMoney: (n: number) => ValidMoney | undefined = (n) =>
    isValidMoney(n) ? n : undefined

export const hasDollars: (m: ValidMoney) => boolean = (m) =>
    extractDollars(m) !== 0
export const hasCents: (m: ValidMoney) => boolean = (m) => extractCents(m) !== 0

export const extractCents: (m: ValidMoney) => Cents = (m) => {
    const totalMoneyAsCents = m * 100
    if (isPositiveNumber(totalMoneyAsCents)) {
        return extractDoubleDigitNumber(
            extractWholeNumber(totalMoneyAsCents)
        ) as Cents
    }
    throw new Error(
        'This error should only happen if the validation has been bypassed via casting'
    )
}
export const extractDollars: (m: ValidMoney) => Dollars = (m) =>
    extractWholeNumber(m) as Dollars
