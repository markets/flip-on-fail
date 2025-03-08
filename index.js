// Default ASCII art for table flipping
const DEFAULT_FLIP = '(╯°□°)╯︵ ┻━┻';

// Store the original Error constructor
const OriginalError = Error;
const OriginalTypeError = TypeError;
const OriginalSyntaxError = SyntaxError;
const OriginalReferenceError = ReferenceError;
const OriginalRangeError = RangeError;

// Determine the global object (works in browser and Node.js)
const globalObject = typeof window !== 'undefined' ? window : 
                    typeof global !== 'undefined' ? global : this;

// Configuration object
const config = {
  prefix: DEFAULT_FLIP,
  enabled: true
};

// Factory to create error constructor overrides using arrow function
const createErrorWrapper = (OriginalErrorType) => {
  function WrappedError(...args) {
    // Create an instance of the original Error type
    const error = new OriginalErrorType(...args);
    
    // Add our prefix if the feature is enabled
    if (config.enabled) {
      error.message = `${config.prefix} ${error.message}`;
    }
    
    // Maintain the correct prototype chain
    Object.setPrototypeOf(error, Object.getPrototypeOf(this));
    
    // Capture stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, WrappedError);
    }
    
    return error;
  }
  
  // Set up prototype inheritance
  WrappedError.prototype = Object.create(OriginalErrorType.prototype, {
    constructor: {
      value: OriginalErrorType,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  
  return WrappedError;
};

// Create wrapped error constructors
const WrappedError = createErrorWrapper(OriginalError);
const WrappedTypeError = createErrorWrapper(OriginalTypeError);
const WrappedSyntaxError = createErrorWrapper(OriginalSyntaxError);
const WrappedReferenceError = createErrorWrapper(OriginalReferenceError);
const WrappedRangeError = createErrorWrapper(OriginalRangeError);

// Function to enable the error flipper
const enable = () => {
  config.enabled = true;
  globalObject.Error = WrappedError;
  globalObject.TypeError = WrappedTypeError;
  globalObject.SyntaxError = WrappedSyntaxError;
  globalObject.ReferenceError = WrappedReferenceError;
  globalObject.RangeError = WrappedRangeError;
};

// Function to disable the error flipper
const disable = () => {
  config.enabled = false;
  globalObject.Error = OriginalError;
  globalObject.TypeError = OriginalTypeError;
  globalObject.SyntaxError = OriginalSyntaxError;
  globalObject.ReferenceError = OriginalReferenceError;
  globalObject.RangeError = OriginalRangeError;
};

// Function to customize the prefix with default parameter
const setPrefix = (newPrefix = DEFAULT_FLIP) => {
  config.prefix = newPrefix;
};

// Initialize by enabling the flipper
enable();

// Export public API
export {
  enable,
  disable,
  setPrefix,
  DEFAULT_FLIP
};

// For CommonJS compatibility
export default {
  enable,
  disable,
  setPrefix,
  DEFAULT_FLIP
};