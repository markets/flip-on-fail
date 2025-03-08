// Default ASCII art for table flipping
const DEFAULT_FLIP = '(╯°□°)╯︵ ┻━┻';

class FlipOut {
  #config;
  #OriginalError;
  #OriginalTypeError;
  #OriginalSyntaxError;
  #OriginalReferenceError;
  #OriginalRangeError;
  #globalObject;

  constructor() {
    this.#OriginalError = Error;
    this.#OriginalTypeError = TypeError;
    this.#OriginalSyntaxError = SyntaxError;
    this.#OriginalReferenceError = ReferenceError;
    this.#OriginalRangeError = RangeError;

    this.#globalObject = typeof window !== 'undefined' ? window :
                        typeof global !== 'undefined' ? global : this;

    this.#config = {
      prefix: DEFAULT_FLIP,
      enabled: true
    };

    this.enable();
  }

  #createErrorWrapper(OriginalErrorType) {
    const self = this;
    function WrappedError(...args) {
      const error = new OriginalErrorType(...args);

      if (self.#config.enabled) {
        error.message = `${self.#config.prefix} ${error.message}`;
      }

      Object.setPrototypeOf(error, Object.getPrototypeOf(this));

      if (Error.captureStackTrace) {
        Error.captureStackTrace(error, WrappedError);
      }

      return error;
    }

    WrappedError.prototype = Object.create(OriginalErrorType.prototype, {
      constructor: {
        value: OriginalErrorType,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });

    return WrappedError;
  }

  enable() {
    this.#config.enabled = true;
    this.#globalObject.Error = this.#createErrorWrapper(this.#OriginalError);
    this.#globalObject.TypeError = this.#createErrorWrapper(this.#OriginalTypeError);
    this.#globalObject.SyntaxError = this.#createErrorWrapper(this.#OriginalSyntaxError);
    this.#globalObject.ReferenceError = this.#createErrorWrapper(this.#OriginalReferenceError);
    this.#globalObject.RangeError = this.#createErrorWrapper(this.#OriginalRangeError);
  }

  disable() {
    this.#config.enabled = false;
    this.#globalObject.Error = this.#OriginalError;
    this.#globalObject.TypeError = this.#OriginalTypeError;
    this.#globalObject.SyntaxError = this.#OriginalSyntaxError;
    this.#globalObject.ReferenceError = this.#OriginalReferenceError;
    this.#globalObject.RangeError = this.#OriginalRangeError;
  }

  setPrefix(newPrefix = DEFAULT_FLIP) {
    this.#config.prefix = newPrefix;
  }
}

const flipOut = new FlipOut();
export default flipOut;
