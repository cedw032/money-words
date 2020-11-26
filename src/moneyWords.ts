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
    const dollars = extractDollars(m)
    const unit = isPlural(dollars) ? 'dollars' : 'dollar'
    return `${numberToWords(dollars)} ${unit}` as MoneyWords
}
function extractCentWords(m: ValidMoney): MoneyWords {
    const cents = extractCents(m)
    const unit = isPlural(cents) ? 'cents' : 'cent'
    return `${numberToWords(extractCents(m))} ${unit}` as MoneyWords
}

function isPlural(n: number): boolean {
    return n !== 1
}
