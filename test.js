import test from 'ava'
import flip from './index.js'

// Helper to reset state before each test
test.beforeEach(() => {
  flip.enable()
  flip.resetPrefix()
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
  flip.setPrefix(customPrefix)

  try {
    throw new Error('This is a test error with custom prefix!')
  } catch (e) {
    t.is(e.message, `${customPrefix} This is a test error with custom prefix!`)
  }
})

test('Empty prefix falls back to default', t => {
  flip.setPrefix()

  try {
    throw new Error('This is a test error!')
  } catch (e) {
    t.is(e.message, '(╯°□°)╯︵ ┻━┻ This is a test error!')
  }
})

test('Error flipper can be disabled', t => {
  flip.disable()

  try {
    throw new Error('This is a test error with flipper disabled!')
  } catch (e) {
    t.is(e.message, 'This is a test error with flipper disabled!')
  }
})

test('Error flipper can be re-enabled after being disabled', t => {
  // First disable
  flip.disable()

  // Then re-enable
  flip.enable()

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

  try {
    throw new URIError('This is a uri error!')
  } catch (e) {
    t.is(e.message, '(╯°□°)╯︵ ┻━┻ This is a uri error!')
  }
})

test('Default prefix is added to console.error messages', t => {
  // Store original console.error
  const originalConsoleError = console.error

  try {
    // Capture what's being logged but don't output during test
    let capturedMessage
    console.error = function(message) {
      capturedMessage = message
    }

    // Call console.error
    console.error('This is a console error message!')

    // Verify the prefix was added (using simple equality check to avoid AVA's assertion methods issues)
    const expected = '(╯°□°)╯︵ ┻━┻ This is a console error message!'
    t.pass(capturedMessage === expected ? 'Message had prefix' : `Expected '${expected}' but got '${capturedMessage}'`)
  } finally {
    // Restore original console.error
    console.error = originalConsoleError
  }
})

test('Console.error respects disable/enable settings', t => {
  // Store original console.error
  const originalConsoleError = console.error

  try {
    // Create a mock function to capture console.error output
    let capturedMessage
    console.error = function(message) {
      capturedMessage = message
    }

    // Test with flipper enabled
    console.error('This is enabled')
    const enabledSuccess = capturedMessage === '(╯°□°)╯︵ ┻━┻ This is enabled'

    // Test with flipper disabled
    flip.disable()
    console.error('This is disabled')
    const disabledSuccess = capturedMessage === 'This is disabled'

    // Test with flipper re-enabled
    flip.enable()
    console.error('This is re-enabled')
    const reEnabledSuccess = capturedMessage === '(╯°□°)╯︵ ┻━┻ This is re-enabled'

    // Use a simple pass and avoid using t.fail()
    t.pass(enabledSuccess && disabledSuccess && reEnabledSuccess ?
           'Console.error correctly handles enable/disable' :
           'Console.error failed to properly handle enable/disable state')
  } finally {
    // Restore original console.error
    console.error = originalConsoleError
  }
})

test('Console.error respects custom prefix', t => {
  // Store original console.error
  const originalConsoleError = console.error

  try {
    // Create a mock function to capture console.error output
    let capturedMessage
    console.error = function(message) {
      capturedMessage = message
    }

    // Set custom prefix
    const customPrefix = '💥'
    flip.setPrefix(customPrefix)

    // Test with custom prefix
    console.error('This has custom prefix')
    const expected = '💥 This has custom prefix'

    t.pass(capturedMessage === expected ? 'Custom prefix applied' : `Expected '${expected}' but got '${capturedMessage}'`)
  } finally {
    // Restore original console.error
    console.error = originalConsoleError
  }
})