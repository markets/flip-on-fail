import test from 'ava'
import flipOut from './index.js'

// Helper to reset state before each test
test.beforeEach(() => {
  flipOut.enable()
  flipOut.resetPrefix()
})

test('Default prefix is added to error messages', t => {
  try {
    throw new Error('This is a test error!')
  } catch (e) {
    t.is(e.message, '(╯°□°)╯︵ ┻━┻ This is a test error!')
  }
})

test('Custom prefix is added to error messages', t => {
  const customPrefix = '💥'
  flipOut.setPrefix(customPrefix)

  try {
    throw new Error('This is a test error with custom prefix!')
  } catch (e) {
    t.is(e.message, `${customPrefix} This is a test error with custom prefix!`)
  }
})

test('Error flipper can be disabled', t => {
  flipOut.disable()

  try {
    throw new Error('This is a test error with flipper disabled!')
  } catch (e) {
    t.is(e.message, 'This is a test error with flipper disabled!')
  }
})

test('Error flipper can be re-enabled after being disabled', t => {
  // First disable
  flipOut.disable()

  // Then re-enable
  flipOut.enable()
  flipOut.resetPrefix()

  try {
    throw new Error('This is a test error after re-enabling!')
  } catch (e) {
    t.is(e.message, '(╯°□°)╯︵ ┻━┻ This is a test error after re-enabling!')
  }
})

test('Different error types are modified with prefix', t => {
  try {
    throw new TypeError('This is a type error!')
  } catch (e) {
    t.is(e.message, '(╯°□°)╯︵ ┻━┻ This is a type error!')
  }

  try {
    throw new SyntaxError('This is a syntax error!')
  } catch (e) {
    t.is(e.message, '(╯°□°)╯︵ ┻━┻ This is a syntax error!')
  }

  try {
    throw new ReferenceError('This is a reference error!')
  } catch (e) {
    t.is(e.message, '(╯°□°)╯︵ ┻━┻ This is a reference error!')
  }

  try {
    throw new RangeError('This is a range error!')
  } catch (e) {
    t.is(e.message, '(╯°□°)╯︵ ┻━┻ This is a range error!')
  }
})

test('Empty prefix falls back to default', t => {
  flipOut.setPrefix()

  try {
    throw new Error('This is a test error!')
  } catch (e) {
    t.is(e.message, '(╯°□°)╯︵ ┻━┻ This is a test error!')
  }
})
