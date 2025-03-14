// Default ASCII art for table flipping
const DEFAULT_FLIP = '(╯°□°)╯︵ ┻━┻'

// Configuration object
const config = {
  prefix: DEFAULT_FLIP,
  enabled: true
}

// Determine the global object (works in browser and Node.js)
const globalObject = typeof window !== 'undefined' ? window :
                     typeof global !== 'undefined' ? global : this

// Store the original Error constructor
const OriginalError = Error
const OriginalTypeError = TypeError
const OriginalSyntaxError = SyntaxError
const OriginalReferenceError = ReferenceError
const OriginalRangeError = RangeError
const OriginalURIError = URIError

// Factory to create error constructor overrides
const createErrorWrapper = (OriginalErrorType) => {
  function WrappedError(...args) {
    // Create an instance of the original Error type
    const error = new OriginalErrorType(...args)

    // Add our prefix if the feature is enabled
    if (config.enabled) {
      error.message = `${config.prefix} ${error.message}`
    }

    // Maintain the correct prototype chain
    Object.setPrototypeOf(error, Object.getPrototypeOf(this))

    // Capture stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, WrappedError)
    }

    return error
  }

  // Set up prototype inheritance
  WrappedError.prototype = Object.create(OriginalErrorType.prototype, {
    constructor: {
      value: OriginalErrorType,
      enumerable: false,
      writable: true,
      configurable: true
    }
  })

  return WrappedError
}

// Create wrapped error constructors
const WrappedError = createErrorWrapper(OriginalError)
const WrappedTypeError = createErrorWrapper(OriginalTypeError)
const WrappedSyntaxError = createErrorWrapper(OriginalSyntaxError)
const WrappedReferenceError = createErrorWrapper(OriginalReferenceError)
const WrappedRangeError = createErrorWrapper(OriginalRangeError)
const WrappedURIError = createErrorWrapper(OriginalURIError)

// Function to enable the error flipper
const enable = () => {
  config.enabled = true

  globalObject.Error = WrappedError
  globalObject.TypeError = WrappedTypeError
  globalObject.SyntaxError = WrappedSyntaxError
  globalObject.ReferenceError = WrappedReferenceError
  globalObject.RangeError = WrappedRangeError
  globalObject.URIError = WrappedURIError
}

// Function to disable the error flipper
const disable = () => {
  config.enabled = false

  globalObject.Error = OriginalError
  globalObject.TypeError = OriginalTypeError
  globalObject.SyntaxError = OriginalSyntaxError
  globalObject.ReferenceError = OriginalReferenceError
  globalObject.RangeError = OriginalRangeError
  globalObject.URIError = OriginalURIError
}

// Function to customize the prefix with default parameter
const setPrefix = (newPrefix = DEFAULT_FLIP) => {
  config.prefix = newPrefix
}

// Function to reset the prefix with the default flip
const resetPrefix = () => {
  setPrefix(DEFAULT_FLIP)
}

// Initialize by enabling the flipper
enable()

// Export public API
export default {
  config,
  enable,
  disable,
  setPrefix,
  resetPrefix
}
