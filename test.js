import { test, beforeEach } from 'node:test'
import assert from 'node:assert'
import flip from './index.js'

// Helper to reset state before each test
beforeEach(() => {
  flip.enable()
  flip.resetPrefix()
})

test('Default prefix is added to error messages', () => {
  try {
    throw new Error('This is a test error!')
  } catch (e) {
    assert.strictEqual(e.message, '(╯°□°)╯︵ ┻━┻ This is a test error!')
  }
})

test('Custom prefix is added to error messages', () => {
  const customPrefix = '💥'
  flip.setPrefix(customPrefix)

  try {
    throw new Error('This is a test error with custom prefix!')
  } catch (e) {
    assert.strictEqual(e.message, `${customPrefix} This is a test error with custom prefix!`)
  }
})

test('Empty prefix falls back to default', () => {
  flip.setPrefix()

  try {
    throw new Error('This is a test error!')
  } catch (e) {
    assert.strictEqual(e.message, '(╯°□°)╯︵ ┻━┻ This is a test error!')
  }
})

test('Error flipper can be disabled', () => {
  flip.disable()

  try {
    throw new Error('This is a test error with flipper disabled!')
  } catch (e) {
    assert.strictEqual(e.message, 'This is a test error with flipper disabled!')
  }
})

test('Error flipper can be re-enabled after being disabled', () => {
  // First disable
  flip.disable()

  // Then re-enable
  flip.enable()

  try {
    throw new Error('This is a test error after re-enabling!')
  } catch (e) {
    assert.strictEqual(e.message, '(╯°□°)╯︵ ┻━┻ This is a test error after re-enabling!')
  }
})

test('Different error types are modified with prefix', () => {
  try {
    throw new TypeError('This is a type error!')
  } catch (e) {
    assert.strictEqual(e.message, '(╯°□°)╯︵ ┻━┻ This is a type error!')
  }

  try {
    throw new SyntaxError('This is a syntax error!')
  } catch (e) {
    assert.strictEqual(e.message, '(╯°□°)╯︵ ┻━┻ This is a syntax error!')
  }

  try {
    throw new ReferenceError('This is a reference error!')
  } catch (e) {
    assert.strictEqual(e.message, '(╯°□°)╯︵ ┻━┻ This is a reference error!')
  }

  try {
    throw new RangeError('This is a range error!')
  } catch (e) {
    assert.strictEqual(e.message, '(╯°□°)╯︵ ┻━┻ This is a range error!')
  }

  try {
    throw new URIError('This is a uri error!')
  } catch (e) {
    assert.strictEqual(e.message, '(╯°□°)╯︵ ┻━┻ This is a uri error!')
  }
})

test('Default prefix is added to console.error messages', () => {
  // We need to test that the wrapper works, but since we can't easily intercept
  // the wrapped console.error, we'll test it indirectly by verifying the wrapper function exists
  // and that direct calls to the wrapped console.error include the prefix
  
  const originalConsoleError = console.error
  const originalWrite = process.stderr.write
  
  let capturedOutput = ''
  
  try {
    // Capture stderr output where console.error writes
    process.stderr.write = function(chunk) {
      capturedOutput += chunk
      return true
    }
    
    // Call console.error (which should be the wrapped version)
    console.error('This is a console error message!')
    
    // Verify the prefix was added to the output
    const expected = '(╯°□°)╯︵ ┻━┻ This is a console error message!'
    assert.ok(capturedOutput.includes(expected), `Expected output to contain '${expected}' but got '${capturedOutput}'`)
  } finally {
    // Restore original functions
    process.stderr.write = originalWrite
    console.error = originalConsoleError
  }
})
