import type { ValidMoney } from './money'
import {
    isValidMoney,
    toValidMoney,
    hasCents,
    hasDollars,
    extractCents,
    extractDollars,
} from './money'

describe('toValidMoney', () => {
    it('returns undefined when provided with unreal numbers', () => {
        unrealNumbers.forEach((unreal) =>
            expect(toValidMoney(unreal)).toBe(undefined)
        )
    })

    it('returns undefined when provided with negative numbers', () => {
        sampleOfNegativeNumbers.forEach((negative) =>
            expect(toValidMoney(negative)).toBe(undefined)
        )
    })

    it('returns undefined when provided with numbers of more then two decimal place precision', () => {
        sampleOfOverlyPreciseNumbers.forEach((overlyPrecise) =>
            expect(toValidMoney(overlyPrecise)).toBe(undefined)
        )
    })

    it('returns undefined when provided with numbers 1000 or greater', () => {
        sampleOfNumbersWhichAreTooLarge.forEach((tooLarge) =>
            expect(toValidMoney(tooLarge)).toBe(undefined)
        )
    })

    it('returns equal numeric value when constraints are met', () => {
        sampleOfNumbersWhichAreValidMoney.forEach((valid) =>
            expect(toValidMoney(valid)).toBe(valid)
        )
    })
})

describe('isValidMoney', () => {
    it('returns false when provided with unreal numbers', () => {
        unrealNumbers.forEach((unreal) =>
            expect(isValidMoney(unreal)).toBe(false)
        )
    })

    it('returns false when provided with negative numbers', () => {
        sampleOfNegativeNumbers.forEach((negative) =>
            expect(isValidMoney(negative)).toBe(false)
        )
    })

    it('returns false when provided with numbers of more then two decimal place precision', () => {
        sampleOfOverlyPreciseNumbers.forEach((overlyPrecise) =>
            expect(isValidMoney(overlyPrecise)).toBe(false)
        )
    })

    it('returns false when provided with numbers 1000 or greater', () => {
        sampleOfNumbersWhichAreTooLarge.forEach((tooLarge) =>
            expect(isValidMoney(tooLarge)).toBe(false)
        )
    })

    it('returns true when constraints are met', () => {
        sampleOfNumbersWhichAreValidMoney.forEach((valid) =>
            expect(isValidMoney(valid)).toBe(true)
        )
    })
})

describe('hasCents', () => {
    it('returns false if there are no cents in value', () =>
        sampleOfMoneyWithoutCents.forEach((noCents) =>
            expect(hasCents(noCents as ValidMoney)).toBe(false)
        ))

    it('returns true is there are cents in value', () =>
        sampleOfMoneyWithCents.forEach(([withCents]) =>
            expect(hasCents(withCents as ValidMoney)).toBe(true)
        ))
})

describe('extractCents', () => {
    it('returns 0 if there are no cents in value', () =>
        sampleOfMoneyWithoutCents.forEach((noCents) =>
            expect(extractCents(noCents as ValidMoney)).toBe(0)
        ))

    it('returns cents value if there are cents in value', () =>
        sampleOfMoneyWithCents.forEach(([withCents, cents]) =>
            expect(extractCents(withCents as ValidMoney)).toBe(cents)
        ))
})

describe('hasDollars', () => {
    it('returns false if there are no dollars in value', () =>
        sampleOfMoneyWithoutDollars.forEach((noDollars) =>
            expect(hasDollars(noDollars as ValidMoney)).toBe(false)
        ))

    it('returns true is there are dollars in value', () =>
        sampleOfMoneyWithDollars.forEach(([withDollars]) =>
            expect(hasDollars(withDollars as ValidMoney)).toBe(true)
        ))
})

describe('extractDollars', () => {
    it('returns 0 if there are no dollars in value', () =>
        sampleOfMoneyWithoutDollars.forEach((noDollars) =>
            expect(extractDollars(noDollars as ValidMoney)).toBe(0)
        ))

    it('returns cents value if there are dollars in value', () =>
        sampleOfMoneyWithDollars.forEach(([withDollars, dollars]) =>
            expect(extractDollars(withDollars as ValidMoney)).toBe(dollars)
        ))
})

const unrealNumbers = [NaN, -Infinity, Infinity]
const sampleOfNegativeNumbers = [-1, -8.5, -400, -0.505, -10500]
const sampleOfOverlyPreciseNumbers = [1.0607, 0.0001, 1000.065, -800.099]
const sampleOfNumbersWhichAreTooLarge = [1000, 1010, 40000.89, 6570.909]
const sampleOfNumbersWhichAreValidMoney = [
    0.5,
    1,
    30.5,
    450.56,
    999.99,
    6,
    80.08,
    724,
]

const sampleOfMoneyWithCents = [
    [0.55, 55],
    [45.76, 76],
    [960.21, 21],
]

const sampleOfMoneyWithoutCents = [0, 45, 960]

const sampleOfMoneyWithDollars = [
    [453.64, 453],
    [100, 100],
    [863.09, 863],
]

const sampleOfMoneyWithoutDollars = [0.65, 0, 0.99]
