# Flip On Fail

[![](https://github.com/markets/flip-on-fail/actions/workflows/ci.yml/badge.svg)](https://github.com/markets/flip-on-fail/actions/workflows/ci.yml)
[![](https://img.shields.io/npm/v/flip-on-fail.svg)](https://www.npmjs.com/package/flip-on-fail)

> Turn your boring errors into expressive outbursts (╯°□°)╯︵ ┻━┻

A JavaScript package that adds fun prefixes to error messages. Designed to run seamlessly in both browser environments and Node.js.

## ⚙️ Installation

```bash
npm install flip-on-fail
```

Or using Yarn:

```bash
yarn add flip-on-fail
```

## 📚 Usage

```javascript
// Import the package at the entry point of your application
import flip from 'flip-on-fail'

// Will throw: (╯°□°)╯︵ ┻━┻ This is an error!
throw new Error('This is an error!')
```

You can also flip when using `console.error`, making debugging even funnier!

```javascript
// Will throw: (╯°□°)╯︵ ┻━┻ This is a console error message!
console.error('This is a console error message!')
```

### Customizing the prefix

You can define a custom prefix for your error messages. Maybe you like emojis too?

```javascript
flip.setPrefix('💥')

// Will throw: 💥 This is an error!
throw new Error('This is an error!')
```

But if you prefer the original ASCII art (you probably do!), here are some alternative "table flippers" for inspiration:
- (ﾉಥ益ಥ）ﾉ ┻━┻
- (╯'□')╯︵ ┻━┻
- ┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻
- (┛ಠ_ಠ)┛ 彡 ┻━┻
- (╯ರ ~ ರ）╯︵ ┻━┻
- (/¯◡ ‿ ◡)/¯ ~ ┻━┻
- (┛◉Д◉)┛彡 ┻━┻
- (╯°.°）╯ ┻━┻
- (┛✧ω✧)┛ 彡 ┻━┻

You are also able to come back to the default prefix by:

```javascript
flip.resetPrefix()
```

### Disabling/Enabling

You can temporarily disable or re-enable error flipping:

```javascript
// Disable error flipping
flip.disable()

// Will throw: This is an error!
throw new Error('This is an error!')

// Re-enable error flipping
flip.enable()

// Will throw: (╯°□°)╯︵ ┻━┻ This is an error!
throw new Error('This is an error!')
```

## 🙇 Acknowledgements

- This project was inspired by the [table_flipper](https://github.com/iridakos/table_flipper) Ruby gem.
- This project was pair-programmed with `Copilot` and the `Claude 3.7 Sonnet` model.

## 👀 Disclaimer

This project is intended as a light-hearted joke and should be used for fun. It adds a bit of humor, but please do not take it too seriously. Feel free to use it to bring some joy and laughter into your coding sessions! Remember, even your code needs a break sometimes, so let it flip out!

## 🤝 Contributing

(╯°□°)╯︵ ┻━┻ CONTRIBUTIONS? BRING 'EM ON!

We welcome all contributions, whether it's bug fixes or new features. Don't forget to add tests for behaviour changes and run the test suite by:

```bash
npm test
```

Thanks for contributing! Now go fix some errors! ┻━┻ ︵ ¯\\(ツ)/¯ ︵ ┻━┻

## 📜 License

Copyright (c) Marc Anguera Insa. `Flip On Fail` is released under the [MIT License](LICENSE).
