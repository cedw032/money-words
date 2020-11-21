import type {
    PositiveNumber,
    WholeNumber,
    TripleDigitNumber,
    DoubleDigitNumber,
} from './numbers'
import {
    isRealNumber,
    isPositiveNumber,
    isWholeNumber,
    isTripleDigitNumber,
    extractWholeNumber,
    extractTripleDigitNumber,
    extractDoubleDigitNumber,
    extractSingleDigitNumber,
    toHundreds,
    toTens,
    isCorrectPrecision,
} from './numbers'

const unrealNumbers = [NaN, -Infinity, Infinity]
const sampleOfRealNumbers = [
    0,
    -18797,
    987987,
    -0.45435,
    0.343243,
    3243.56456,
    -54343.654,
]

const sampleOfNegativeNumbers = [-18797, -0.45435, -54343.654]
const sampleOfPositiveNumbers = [0, 987987, 0.343243, 3243.56456]

const sampleOfNotWholeNumbers = [0.343243, 3243.56456]
const sampleOfWholeNumbers = [0, 43, 764543]

const sampleOfNotTripleDigitNumbers = [7654, 87654567, 4534536, 1000]
const sampleOfTripleDigitNumbers = [0, 5, 10, 543, 457]

const extractWholeNumberTestData = [
    [234.45, 234],
    [34000, 34000],
    [54.5, 54],
    [326.8989, 326],
    [0, 0],
]

const extractTripleDigitNumberTestData = [
    [76543787564, 564],
    [3454, 454],
    [987, 987],
    [18, 18],
    [0, 0],
    [5, 5],
]

const extractDoubleDigitNumberTestData = [
    [76543787564, 64],
    [3454, 54],
    [987, 87],
    [18, 18],
    [0, 0],
    [5, 5],
]

const extractSingleDigitNumberTestData = [
    [76543787564, 4],
    [3454, 4],
    [987, 7],
    [18, 8],
    [0, 0],
    [5, 5],
]

const toHundredsTestData = [
    [891, 8],
    [453, 4],
    [67, 0],
    [8, 0],
    [0, 0],
]

const toTensTestData = [
    [54, 5],
    [86, 8],
    [3, 0],
    [0, 0],
]

const isCorrectPrecisionTestData = [
    [3, 0, true],
    [30, 1, true],
    [4, 2, true],
    [0, 3, true],

    [0.5, 0, false],
    [52.5, 1, true],
    [0.5, 2, true],
    [3.5, 3, true],

    [3.23, 0, false],
    [30.23, 1, false],
    [4.23, 2, true],
    [0.23, 3, true],

    [3.898, 0, false],
    [30.898, 1, false],
    [4.898, 2, false],
    [0.898, 3, true],

    [3.1212, 0, false],
    [30.1212, 1, false],
    [4.1212, 2, false],
    [0.1212, 3, false],
]

describe('isRealNumber', () => {
    it('returns false if an unreal number is supplied', () =>
        unrealNumbers.forEach((unrealNumber) =>
            expect(isRealNumber(unrealNumber)).toBe(false)
        ))

    it('returns true if an unreal number is supplied', () =>
        sampleOfRealNumbers.forEach((unrealNumber) =>
            expect(isRealNumber(unrealNumber)).toBe(true)
        ))
})

describe('isPositiveNumber', () => {
    it('returns false if an unreal number is supplied', () =>
        unrealNumbers.forEach((unrealNumber) =>
            expect(isPositiveNumber(unrealNumber)).toBe(false)
        ))

    it('returns false if a negative number is supplied', () =>
        sampleOfNegativeNumbers.forEach((negativeNumber) =>
            expect(isPositiveNumber(negativeNumber)).toBe(false)
        ))

    it('returns true if a positive number is supplied', () =>
        sampleOfPositiveNumbers.forEach((positiveNumber) =>
            expect(isPositiveNumber(positiveNumber)).toBe(true)
        ))
})

describe('isWholeNumber', () => {
    it('returns false if an unreal number is supplied', () =>
        unrealNumbers.forEach((unrealNumber) =>
            expect(isWholeNumber(unrealNumber)).toBe(false)
        ))

    it('returns false if a negative number is supplied', () =>
        sampleOfNegativeNumbers.forEach((negativeNumber) =>
            expect(isWholeNumber(negativeNumber)).toBe(false)
        ))

    it('returns false if a not whole number is supplied', () =>
        sampleOfNotWholeNumbers.forEach((notWholeNumber) =>
            expect(isWholeNumber(notWholeNumber)).toBe(false)
        ))

    it('returns true if a whole number is supplied', () =>
        sampleOfWholeNumbers.forEach((wholeNumber) =>
            expect(isWholeNumber(wholeNumber)).toBe(true)
        ))
})

describe('isTripleDigitNumber', () => {
    it('returns false if an unreal number is supplied', () =>
        unrealNumbers.forEach((unrealNumber) =>
            expect(isTripleDigitNumber(unrealNumber)).toBe(false)
        ))

    it('returns false if a negative number is supplied', () =>
        sampleOfNegativeNumbers.forEach((negativeNumber) =>
            expect(isTripleDigitNumber(negativeNumber)).toBe(false)
        ))

    it('returns false if a not whole number is supplied', () =>
        sampleOfNotWholeNumbers.forEach((notWholeNumber) =>
            expect(isTripleDigitNumber(notWholeNumber)).toBe(false)
        ))

    it('returns false if a number with more than three digits is supplied', () =>
        sampleOfNotTripleDigitNumbers.forEach((notTripleDigitNumber) =>
            expect(isTripleDigitNumber(notTripleDigitNumber)).toBe(false)
        ))

    it('returns true if a a number with three digits or fewer is supplied', () =>
        sampleOfTripleDigitNumbers.forEach((TripleDigitNumber) =>
            expect(isTripleDigitNumber(TripleDigitNumber)).toBe(true)
        ))
})

describe('extractWholeNumber', () => {
    it('returns the same number ignoring numbers after the decimal point', () =>
        extractWholeNumberTestData.forEach(([num, whole]) =>
            expect(extractWholeNumber(num as PositiveNumber)).toBe(whole)
        ))
})

describe('extractTripleDigitNumber', () => {
    it('returns the trailing three digits of a whole number', () =>
        extractTripleDigitNumberTestData.forEach(([num, threeDigits]) =>
            expect(extractTripleDigitNumber(num as WholeNumber)).toBe(
                threeDigits
            )
        ))
})

describe('extractDoubleDigitNumber', () => {
    it('returns the trailing two digits of a whole number', () =>
        extractDoubleDigitNumberTestData.forEach(([num, twoDigits]) =>
            expect(extractDoubleDigitNumber(num as WholeNumber)).toBe(twoDigits)
        ))
})

describe('extractSingleDigitNumber', () => {
    it('returns the trailing digit of a whole number', () =>
        extractSingleDigitNumberTestData.forEach(([num, twoDigits]) =>
            expect(extractSingleDigitNumber(num as WholeNumber)).toBe(twoDigits)
        ))
})

describe('toHundreds', () => {
    it('returns the leading digit of a three digit number', () =>
        toHundredsTestData.forEach(([num, hundreds]) =>
            expect(toHundreds(num as TripleDigitNumber)).toBe(hundreds)
        ))
})

describe('toTens', () => {
    it('returns the leading digit of a two digit number', () =>
        toTensTestData.forEach(([num, tens]) =>
            expect(toTens(num as DoubleDigitNumber)).toBe(tens)
        ))
})

describe('isCorrectPrecision', () => {
    it('returns false if the input n has more decimal places than the precision value provided', () =>
        isCorrectPrecisionTestData.forEach(([n, precision, expected]) =>
            expect(
                isCorrectPrecision(n as number, precision as 0 | 1 | 2 | 3)
            ).toBe(expected)
        ))
})
