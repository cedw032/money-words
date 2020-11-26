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

export function toMaybeWords(v: string | number): MoneyWords | undefined {
    const n = +v
    return (v !== '' && isValidMoney(n) && toWords(n)) || undefined
}

export function toWords(m: ValidMoney): MoneyWords {
    const hasDollars = moneyHasDollars(m)
    const hasCents = moneyHasCents(m)

    return hasDollars && hasCents
        ? (`${extractDollarWords(m)} and ${extractCentWords(m)}` as MoneyWords)
        : hasCents
        ? extractCentWords(m)
        : extractDollarWords(m)
}

function extractDollarWords(m: ValidMoney): MoneyWords {
    return `${numberToWords(extractDollars(m))} dollars` as MoneyWords
}
function extractCentWords(m: ValidMoney): MoneyWords {
    return `${numberToWords(extractCents(m))} cents` as MoneyWords
}
