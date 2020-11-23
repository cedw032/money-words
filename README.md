## Requirements
- yarn
- node 14

## Setup
- run `yarn`

## Test
- run `yarn test`

## Recommended usage
### toMaybeWords
```TypeScript
import { toMaybeWords } from './moneyWords'

const moneyNumber = 342.23
const stringNumber = '500.54'

console.log(toMaybeWords(moneyNumber)) // three hundred and forty two dollars and twenty three cents
console.log(toMaybeWords(moneyString)) // five hundred dollars and fifty four cents

const notMoneyNumber = 1000.05
const notMoneyString = ''

console.log(toMaybeWords(notMoneyNumber)) // undefined
console.log(toMaybeWords(notMoneyString)) // undefined
```
This is the simplest usage, but does not guarantee that a MoneyWords string with be returned in all cases.
The result needs to be checked before it is used.  
This may cause issues if you are using the value with functions that are not well typed.
It also allows the failure to go unnoticed further into the code and may make it harder to handle.

### toWords - with gate
```TypeScript
import { toWords } from './moneyWords'
import { isValidMoney } from './money'

const moneyNumber = 342.23
const notMoneyNumber = 1000.05

const moneyWords: string = isValidMoney(moneyNumber) 
  ? toWords(moneyNumber) 
  : 'Could not convert money value to words because it was invalid'

const notMoneyWords: string = isValidMoney(notMoneyNumber) 
  ? toWords(notMoneyNumber) 
  : 'Could not convert money value to words because it was invalid'
  
console.log(moneyWords) // three hundred and forty two dollars and twenty three cents
console.log(notMoneyWords) // Could not convert money value to words because it was invalid
```
This method is prefered because it encourages to caller to handle the failure at the time.
Note that the type checker will report an error if `moneyNumber` or `notMoneyNumber` are passed into `toWords` 
without checking `isValidMoney` first.

### toWords - with data constructor
```TypeScript
import { toValidMoney } from './money'
import { 
  getUserInput, 
  continueProcessWithMoney, 
  displayError } 
from './someExample'

const money = toValidMoney(+getUserInput())

if (money !== undefined)
  continueProceessWithMoney(money)
} else {
  displayError()
}
```
Where:
```TypeScript
import type { ValidMoney } from './money'
import { toWords } from './moneyWords'

function continueProcessWitMoney(money: ValidMoney): void {
   console.log(toWords(money))
}
```
In this case the `console.log` function is guaranteed to print out valid money words because 
the value has already been validated.  
This solution allows us to separate the validation of the money from where we convert it into words.  

## Notes
### Files of Interest
I would suggest looking at `src/moneyWords.test.ts` [here](https://github.com/cedw032/money-words/blob/master/src/moneyWords.test.ts) to start as this is the best place to see how the specifications
for the `toWords` function are tested.
### Runtime safety
This implementation trusts that it is being used in a well typed system, and therefore trusts the type checker.
No runtime validation is provided over and above what the type checker suggests is necessary.
If you want to safely use this implementation you must ensure that all data coming from beyond
the application boundaries (Api requests, persistence, untyped packages) must be runtime checked when it enters
the system (Or at least before it is passed to these methods).
### Thoughts for the future
- Provide a runtime safe implementation of `toWords` and `toMaybeWords`
- Extend the upper limit to include larger numbers like [these](https://simple.wikipedia.org/wiki/Names_for_large_numbers)
- Perhaps allow configuration to support other languages and currencies
### Learnings
- The pattern of making phantom type field names unique allows the type to be extended by other more specific types which provide tighter guarantees.
- A lack of type checking around string literal templates allowed one error to slip through to testing.  `elslint` provides a rule that may address this in restricting the types that can be used as template elements.
- The typescript compiler currently allows types to implicitly resolve to the `never` type.  This prevented two errors from being picked up by the type checker before testing.  Once this type issue was resolved both errors were reported by the type checker. Adding a rule to 'prevent implicit never' would have prevented these errors from getting through to testing.
### Later learnings
- Named functions should be preferred to anonymous functions.
