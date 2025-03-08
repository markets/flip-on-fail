# FlipOut.js

A modern JavaScript package that adds fun prefixes to error messages, inspired by the Ruby gem [table_flipper](https://github.com/iridakos/table_flipper). Turn your boring errors into expressive outbursts!

## Installation

```bash
npm install flipout
```

## Usage

### ES Modules (Recommended)

```javascript
// Import the package at the entry point of your application
import flipOut from 'flipout';

// Will throw: (╯°□°)╯︵ ┻━┻ This is an error!
throw new Error('This is an error!');
```

### Customizing the prefix

You can set a custom prefix for your error messages:

```javascript
import flipOut from 'flipout';

// Set a custom prefix
flipOut.setPrefix('¯\\_(ツ)_/¯');

// Will throw: ¯\_(ツ)_/¯ This is an error!
throw new Error('This is an error!');
```

### Disabling/Enabling

You can temporarily disable or re-enable error flipping:

```javascript
import flipOut from 'flipout';

// Disable error flipping
flipOut.disable();

// Will throw: This is an error! (without prefix)
throw new Error('This is an error!');

// Re-enable error flipping
flipOut.enable();

// Will throw: (╯°□°)╯︵ ┻━┻ This is an error!
throw new Error('This is an error!');
```

## Supported Error Types

The package modifies messages for the following error types:
- `Error`
- `TypeError`
- `SyntaxError`
- `ReferenceError`
- `RangeError`

## License

Copyright (c) Marc Anguera Insa. SuchTube is released under the [MIT License](LICENSE).
