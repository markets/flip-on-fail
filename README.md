# Flip Out

> Turn your boring errors into expressive outbursts (╯°□°)╯︵ ┻━┻

A JavaScript package that adds fun prefixes to error messages.

## Installation

```bash
npm install flip-out
```

Or using Yarn:

```bash
yarn add flip-out
```

## Usage

```javascript
// Import the package at the entry point of your application
import flipOut from 'flip-out';

// Will throw: (╯°□°)╯︵ ┻━┻ This is an error!
throw new Error('This is an error!');
```

### Customizing the prefix

You can set a custom prefix for your error messages:

```javascript
import flipOut from 'flip-out';

// Set a custom prefix
flipOut.setPrefix('💥');

// Will throw: 💥 This is an error!
throw new Error('This is an error!');
```

### Disabling/Enabling

You can temporarily disable or re-enable error flipping:

```javascript
import flipOut from 'flip-out';

// Disable error flipping
flipOut.disable();

// Will throw: This is an error! (without prefix)
throw new Error('This is an error!');

// Re-enable error flipping
flipOut.enable();

// Will throw: (╯°□°)╯︵ ┻━┻ This is an error!
throw new Error('This is an error!');
```

### Supported Error Types

The package modifies messages for the following error types:
- `Error`
- `TypeError`
- `SyntaxError`
- `ReferenceError`
- `RangeError`

## Acknowledgements

- This project was inspired by the [table_flipper](https://github.com/iridakos/table_flipper) Ruby gem.
- This project was pair-progammed with Copilot and Claude 3.7 Sonnet.

## License

Copyright (c) Marc Anguera Insa. SuchTube is released under the [MIT License](LICENSE).
