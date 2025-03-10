# Flip On Fail

> Turn your boring errors into expressive outbursts (╯°□°)╯︵ ┻━┻

A JavaScript package that adds fun prefixes to error messages. Designed to run seamlessly in both browser environments and Node.js.

## Installation

```bash
npm install flip-on-fail
```

Or using Yarn:

```bash
yarn add flip-on-fail
```

## Usage

```javascript
// Import the package at the entry point of your application
import flip from 'flip-on-fail'

// Will throw: (╯°□°)╯︵ ┻━┻ This is an error!
throw new Error('This is an error!')
```

### Customizing the prefix

You can set a custom prefix for your error messages:

```javascript
// Set a custom prefix
flip.setPrefix('💥')

// Will throw: 💥 This is an error!
throw new Error('This is an error!')
```

If you like the original ASCII art, here are some alternative "table flippers" you can also use:
- (ﾉಥ益ಥ）ﾉ ┻━┻
- (╯'□')╯︵ ┻━┻
- ┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻
- (┛ಠ_ಠ)┛彡 ┻━┻
- (/¯◡ ‿ ◡)/¯ ~ ┻━┻
- (┛◉Д◉)┛彡 ┻━┻
- (╯°.°）╯ ┻━┻

You can also reset to the default prefix by:

```javascript
// Reset to the default prefix
flip.resetPrefix()
```

### Disabling/Enabling

You can temporarily disable or re-enable error flipping:

```javascript
// Disable error flipping
flip.disable()

// Will throw: This is an error! (without prefix)
throw new Error('This is an error!')

// Re-enable error flipping
flip.enable()

// Will throw: (╯°□°)╯︵ ┻━┻ This is an error!
throw new Error('This is an error!')
```

## Acknowledgements

- This project was inspired by the [table_flipper](https://github.com/iridakos/table_flipper) Ruby gem.
- This project was pair-programmed with `Copilot` and the `Claude 3.7 Sonnet` model.

## Disclaimer

This project is intended as a light-hearted joke and should be used for fun. It adds a bit of humor, but please do not take it too seriously. Feel free to use it to bring some joy and laughter into your coding sessions! Remember, even your code needs a break sometimes, so let it flip out!

## License

Copyright (c) Marc Anguera Insa. `Flip On Fail` is released under the [MIT License](LICENSE).
