import { ValidMoney } from './money'
import { toWords, toMaybeWords } from './moneyWords'

const testDataForValuesWithDollarsOnly = [
    { input: 3, expected: 'three dollars' },
    { input: 11, expected: 'eleven dollars' },
    { input: 40, expected: 'forty dollars' },
    { input: 97, expected: 'ninety seven dollars' },
    { input: 400, expected: 'four hundred dollars' },
    { input: 512, expected: 'five hundred and twelve dollars' },
    { input: 720, expected: 'seven hundred and twenty dollars' },
]

const testDataForValuesWithCentsOnly = [
    { input: 0.6, expected: 'sixty cents' },
    { input: 0.13, expected: 'thirteen cents' },
    { input: 0.04, expected: 'four cents' },
    { input: 0.87, expected: 'eighty seven cents' },
]

const testDataForValuesWithDollarsAndCents = [
    { input: 3.6, expected: 'three dollars and sixty cents' },
    { input: 11.13, expected: 'eleven dollars and thirteen cents' },
    { input: 40.04, expected: 'forty dollars and four cents' },
    { input: 97.87, expected: 'ninety seven dollars and eighty seven cents' },
    { input: 400.6, expected: 'four hundred dollars and sixty cents' },
    {
        input: 512.13,
        expected: 'five hundred and twelve dollars and thirteen cents',
    },
    {
        input: 720.67,
        expected: 'seven hundred and twenty dollars and sixty seven cents',
    },
]

const invalidInputTestData = [
    'not a number',
    '',
    '0.45454',
    '1000',
    '5345798',
    1000,
    45455,
    0.453,
    34.7676,
    NaN,
    -Infinity,
    Infinity,
]

const toWordsMeetsExpectations: (params: {
    input: number
    expected: string
}) => void = ({ input, expected }) =>
    expect(toWords(input as ValidMoney)).toBe(expected)

const toMaybeWordsMeetsExpectations: (params: {
    input: number | string
    expected: string
}) => void = ({ input, expected }) => expect(toMaybeWords(input)).toBe(expected)

const inputNumbersToStrings: (params: {
    input: number
    expected: string
}) => { input: string; expected: string } = ({ input, expected }) => ({
    input: `${input}`,
    expected,
})

describe('toWords', () => {
    it('displays words for dollars only for dollar only numbers', () =>
        testDataForValuesWithDollarsOnly.forEach(toWordsMeetsExpectations))
    it('displays words for cents only for cents only numbers', () =>
        testDataForValuesWithCentsOnly.forEach(toWordsMeetsExpectations))
    it('displays words for cents and dollars only for numbers with cents and dollars', () =>
        testDataForValuesWithDollarsAndCents.forEach(toWordsMeetsExpectations))
})

describe('toMaybeWords', () => {
    it('displays words for dollars only for dollar only numbers', () =>
        testDataForValuesWithDollarsOnly.forEach(toMaybeWordsMeetsExpectations))
    it('displays words for cents only for cents only numbers', () =>
        testDataForValuesWithCentsOnly.forEach(toMaybeWordsMeetsExpectations))
    it('displays words for cents and dollars for numbers with cents and dollars', () =>
        testDataForValuesWithDollarsAndCents.forEach(
            toMaybeWordsMeetsExpectations
        ))

    it('displays words for dollars only for dollar only strings', () =>
        testDataForValuesWithDollarsOnly
            .map(inputNumbersToStrings)
            .forEach(toMaybeWordsMeetsExpectations))
    it('displays words for cents only for cents only strings', () =>
        testDataForValuesWithCentsOnly
            .map(inputNumbersToStrings)
            .forEach(toMaybeWordsMeetsExpectations))
    it('displays words for cents and dollars for strings with cents and dollars', () =>
        testDataForValuesWithDollarsAndCents
            .map(inputNumbersToStrings)
            .forEach(toMaybeWordsMeetsExpectations))

    it('returns undefined for invalid input', () =>
        invalidInputTestData.forEach((v) =>
            expect(toMaybeWords(v)).toBe(undefined)
        ))
})
