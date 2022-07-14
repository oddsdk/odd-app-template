
import type { TestInterface } from 'ava'

import anyTest from 'ava'

const test = anyTest as TestInterface<{ thing: string }>

test('validates a ucan', t => {
  t.is(true, true)
})