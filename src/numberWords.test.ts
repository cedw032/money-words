import type { TripleDigitNumber } from './numbers'
import { toWords } from './numberWords'

const testDataForNumbersUnderTwenty = [
    { input: 1, expected: 'one' },
    { input: 2, expected: 'two' },
    { input: 3, expected: 'three' },
    { input: 4, expected: 'four' },
    { input: 5, expected: 'five' },
    { input: 6, expected: 'six' },
    { input: 7, expected: 'seven' },
    { input: 8, expected: 'eight' },
    { input: 9, expected: 'nine' },
    { input: 10, expected: 'ten' },
    { input: 11, expected: 'eleven' },
    { input: 12, expected: 'twelve' },
    { input: 13, expected: 'thirteen' },
    { input: 14, expected: 'fourteen' },
    { input: 15, expected: 'fifteen' },
    { input: 16, expected: 'sixteen' },
    { input: 17, expected: 'seventeen' },
    { input: 18, expected: 'eighteen' },
    { input: 19, expected: 'nineteen' },
]

const testDataForRoundTensUnderOneHundred = [
    { input: 10, expected: 'ten' },
    { input: 20, expected: 'twenty' },
    { input: 30, expected: 'thirty' },
    { input: 40, expected: 'forty' },
    { input: 50, expected: 'fifty' },
    { input: 60, expected: 'sixty' },
    { input: 70, expected: 'seventy' },
    { input: 80, expected: 'eighty' },
    { input: 90, expected: 'ninety' },
]

const testDataForRoundHundredsUnderOneThousand = [
    { input: 100, expected: 'one hundred' },
    { input: 200, expected: 'two hundred' },
    { input: 300, expected: 'three hundred' },
    { input: 400, expected: 'four hundred' },
    { input: 500, expected: 'five hundred' },
    { input: 600, expected: 'six hundred' },
    { input: 700, expected: 'seven hundred' },
    { input: 800, expected: 'eight hundred' },
    { input: 900, expected: 'nine hundred' },
]

const randomTestData = [
    { input: 21, expected: 'twenty one' },
    { input: 86, expected: 'eighty six' },
    { input: 97, expected: 'ninety seven' },
    { input: 145, expected: 'one hundred and forty five' },
    { input: 327, expected: 'three hundred and twenty seven' },
    { input: 115, expected: 'one hundred and fifteen' },
    { input: 256, expected: 'two hundred and fifty six' },
    { input: 812, expected: 'eight hundred and twelve' },
    { input: 999, expected: 'nine hundred and ninety nine' },
    { input: 438, expected: 'four hundred and thirty eight' },
    { input: 265, expected: 'two hundred and sixty five' },
    { input: 818, expected: 'eight hundred and eighteen' },
    { input: 316, expected: 'three hundred and sixteen' },
    { input: 660, expected: 'six hundred and sixty' },
    { input: 777, expected: 'seven hundred and seventy seven' },
    { input: 666, expected: 'six hundred and sixty six' },
    { input: 604, expected: 'six hundred and four' },
    { input: 808, expected: 'eight hundred and eight' },
]

const toWordsMeetsExpectations: (params: {
    input: number
    expected: string
}) => void = ({ input, expected }) =>
    expect(toWords(input as TripleDigitNumber)).toBe(expected)

describe('toWords', () => {
    it('converts to words correctly for zero', () => {
        expect(toWords(0 as TripleDigitNumber)).toBe('zero')
    })

    it('converts to words correctly for natural numbers under twenty', () =>
        testDataForNumbersUnderTwenty.forEach(toWordsMeetsExpectations))

    it('converts to words correctly for round tens under one hundred', () =>
        testDataForRoundTensUnderOneHundred.forEach(toWordsMeetsExpectations))

    it('converts to words correctly for round hundreds under one thousand', () =>
        testDataForRoundHundredsUnderOneThousand.forEach(
            toWordsMeetsExpectations
        ))

    it('converts an arbitrarily selected selection of values as expected', () =>
        randomTestData.forEach(toWordsMeetsExpectations))
})
