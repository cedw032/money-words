import type {
    WholeNumber,
    TripleDigitNumber,
    DoubleDigitNumber,
    SingleDigitNumber,
} from './numbers'
import {
    toHundreds,
    toTens,
    extractDoubleDigitNumber,
    extractSingleDigitNumber,
} from './numbers'

const unitWordList = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
]

const teenWordList = [
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
]

const tensWordList = [
    '',
    '',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
]

export function toWords(n: TripleDigitNumber): string {
    const hundredsWords = extractHundredsWords(n)
    const twoDigitWords = extractTwoDigitWords(n)

    return hundredsWords === undefined
        ? twoDigitWords
        : twoDigitWords === unitWordList[0]
        ? hundredsWords
        : `${hundredsWords} and ${twoDigitWords}`
}

function extractHundredsWords(n: TripleDigitNumber): string | undefined {
    const hundreds = toHundreds(n)
    return hundreds === (0 as SingleDigitNumber)
        ? undefined
        : `${toUnitWord(hundreds)} hundred`
}

function extractTwoDigitWords(n: TripleDigitNumber): string {
    const twoDigits = extractDoubleDigitNumber(n)
    const tens = toTens(twoDigits)
    const ones = extractSingleDigitNumber(twoDigits)

    return tens === 0
        ? extractUnitWord(n)
        : tens === 1
        ? extractTeenWord(twoDigits)
        : ones === 0
        ? extractTensWord(twoDigits)
        : `${extractTensWord(twoDigits)} ${extractUnitWord(twoDigits)}`
}

function extractTensWord(n: DoubleDigitNumber): string {
    return toTensWord(toTens(n))
}
function toTensWord(u: SingleDigitNumber): string {
    return tensWordList[u]
}

function extractTeenWord(n: DoubleDigitNumber): string {
    return toTeenWord(extractSingleDigitNumber(n))
}
function toTeenWord(u: SingleDigitNumber): string {
    return teenWordList[u]
}

function extractUnitWord(n: WholeNumber): string {
    return toUnitWord(extractSingleDigitNumber(n))
}
function toUnitWord(u: SingleDigitNumber): string {
    return unitWordList[u]
}
