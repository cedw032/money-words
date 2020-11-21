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

export const toWords: (n: TripleDigitNumber) => string = (n) => {
    const hundredsWords = extractHundredsWords(n)
    const twoDigitWords = extractTwoDigitWords(n)

    return hundredsWords === undefined
        ? twoDigitWords
        : twoDigitWords === unitWordList[0]
        ? hundredsWords
        : `${hundredsWords} and ${twoDigitWords}`
}

const extractHundredsWords: (n: TripleDigitNumber) => string | undefined = (
    n
) => {
    const hundreds = toHundreds(n)
    return hundreds === (0 as SingleDigitNumber)
        ? undefined
        : `${toUnitWord(hundreds)} hundred`
}

const extractTwoDigitWords: (n: TripleDigitNumber) => string = (n) => {
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

const extractTensWord: (n: DoubleDigitNumber) => string = (n) =>
    toTensWord(toTens(n))
const toTensWord: (u: SingleDigitNumber) => string = (u) => tensWordList[u]

const extractTeenWord: (n: DoubleDigitNumber) => string = (n) =>
    toTeenWord(extractSingleDigitNumber(n))
const toTeenWord: (u: SingleDigitNumber) => string = (u) => teenWordList[u]

const extractUnitWord: (n: WholeNumber) => string = (n) =>
    toUnitWord(extractSingleDigitNumber(n))
const toUnitWord: (u: SingleDigitNumber) => string = (u) => unitWordList[u]
