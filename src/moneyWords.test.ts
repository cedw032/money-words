import { ValidMoney } from './money'
import { toWords, toMaybeWords } from './moneyWords'

type StringTestCase = {
    input: string
    expected: string
}

type NumberTestCase = {
    input: number
    expected: string
}

function toWordsMeetsExpectations({ input, expected }: NumberTestCase): void {
    return expect(toWords(input as ValidMoney)).toBe(expected)
}

function toMaybeWordsMeetsExpectations({
    input,
    expected,
}: NumberTestCase | StringTestCase): void {
    return expect(toMaybeWords(input)).toBe(expected)
}

function numberToStringTestCase({
    input,
    expected,
}: NumberTestCase): StringTestCase {
    return {
        input: `${input}`,
        expected,
    }
}

describe('toWords', () => {
    it('meets specification', () =>
        specificationTestData.forEach(toWordsMeetsExpectations))

    it('displays words for dollars only for dollar only numbers', () =>
        testDataForValuesWithDollarsOnly.forEach(toWordsMeetsExpectations))
    it('displays words for cents only for cents only numbers', () =>
        testDataForValuesWithCentsOnly.forEach(toWordsMeetsExpectations))
    it('displays words for cents and dollars only for numbers with cents and dollars', () =>
        testDataForValuesWithDollarsAndCents.forEach(toWordsMeetsExpectations))
    it('displays words for singular dollars and cents correctly', () =>
    testDataForSingularDollarsAndCents.forEach(toWordsMeetsExpectations))
})

describe('toMaybeWords', () => {
    it('meets specification', () =>
        specificationTestData.forEach(toMaybeWordsMeetsExpectations))

    it('displays words for dollars only for dollar only numbers', () =>
        testDataForValuesWithDollarsOnly.forEach(toMaybeWordsMeetsExpectations))
    it('displays words for cents only for cents only numbers', () =>
        testDataForValuesWithCentsOnly.forEach(toMaybeWordsMeetsExpectations))
    it('displays words for cents and dollars for numbers with cents and dollars', () =>
        testDataForValuesWithDollarsAndCents.forEach(
            toMaybeWordsMeetsExpectations
        ))
    it('displays words for singular dollars and cents correctly', () =>
    testDataForSingularDollarsAndCents.forEach(
            toMaybeWordsMeetsExpectations
        ))

    it('displays words for dollars only for dollar only strings', () =>
        testDataForValuesWithDollarsOnly
            .map(numberToStringTestCase)
            .forEach(toMaybeWordsMeetsExpectations))
    it('displays words for cents only for cents only strings', () =>
        testDataForValuesWithCentsOnly
            .map(numberToStringTestCase)
            .forEach(toMaybeWordsMeetsExpectations))
    it('displays words for cents and dollars for strings with cents and dollars', () =>
        testDataForValuesWithDollarsAndCents
            .map(numberToStringTestCase)
            .forEach(toMaybeWordsMeetsExpectations))
    it('displays words for singular dollars and cents correctly', () =>
    testDataForSingularDollarsAndCents
            .map(numberToStringTestCase)
            .forEach(toMaybeWordsMeetsExpectations))

    it('returns undefined for invalid input', () =>
        invalidInputTestData.forEach((v) =>
            expect(toMaybeWords(v)).toBe(undefined)
        ))
})

const specificationTestData = [
    { input: 0, expected: 'zero dollars' },
    { input: 0.12, expected: 'twelve cents' },
    { input: 10.55, expected: 'ten dollars and fifty five cents' },
    { input: 120, expected: 'one hundred and twenty dollars' },
]

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
    { input: 1.13, expected: 'one dollar and thirteen cents' },
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

const testDataForSingularDollarsAndCents = [
    { input: 1.01, expected: 'one dollar and one cent' },
    { input: 1.6, expected: 'one dollar and sixty cents' },
    { input: 1.13, expected: 'one dollar and thirteen cents' },
    { input: 1.4, expected: 'one dollar and four cents' },
    { input: 97.01, expected: 'ninety seven dollars and one cent' },
    { input: 400.01, expected: 'four hundred dollars and one cent' },
    {
        input: 512.01,
        expected: 'five hundred and twelve dollars and one cent',
    },
    {
        input: 720.01,
        expected: 'seven hundred and twenty dollars and sixty one cent',
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
