import type { ValidMoney } from './money'
import {
    isValidMoney,
    hasCents as moneyHasCents,
    hasDollars as moneyHasDollars,
    extractCents,
    extractDollars,
} from './money'
import { toWords as numberToWords } from './numberWords'

type MoneyWords = string & { readonly __MoneyWords: unique symbol }

export const toMaybeWords: (v: string | number) => MoneyWords | undefined = (
    v
) => {
    const n = +v
    return (v !== '' && isValidMoney(n) && toWords(n)) || undefined
}

export const toWords: (m: ValidMoney) => MoneyWords = (m) => {
    const hasDollars = moneyHasDollars(m)
    const hasCents = moneyHasCents(m)

    return hasDollars && hasCents
        ? (`${extractDollarWords(m)} and ${extractCentWords(m)}` as MoneyWords)
        : hasCents
        ? extractCentWords(m)
        : extractDollarWords(m)
}

const extractDollarWords: (m: ValidMoney) => MoneyWords = (m) =>
    `${numberToWords(extractDollars(m))} dollars` as MoneyWords
const extractCentWords: (m: ValidMoney) => MoneyWords = (m) =>
    `${numberToWords(extractCents(m))} cents` as MoneyWords
