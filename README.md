# FlipOut.js

A modern JavaScript package that adds fun prefixes to error messages, inspired by the Ruby gem [table_flipper](https://github.com/iridakos/table_flipper). Turn your boring errors into expressive outbursts!

## Installation

```bash
npm install flipout
```

## Usage

```javascript
// Import the package at the entry point of your application
import flipout from 'flipout';

// Will throw: (╯°□°)╯︵ ┻━┻ This is an error!
throw new Error('This is an error!');
```

You can also import specific functions:

```javascript
import { setPrefix, enable, disable } from 'flipout';
```

### Customizing the prefix

You can set a custom prefix for your error messages:

```javascript
import flipout from 'flipout';

// Set a custom prefix
flipout.setPrefix('¯\\_(ツ)_/¯');

// Will throw: ¯\_(ツ)_/¯ This is an error!
throw new Error('This is an error!');
```

### Disabling/Enabling

You can temporarily disable or re-enable error flipping:

```javascript
import flipout from 'flipout';

// Disable error flipping
flipout.disable();

// Will throw: This is an error! (without prefix)
throw new Error('This is an error!');

// Re-enable error flipping
flipout.enable();

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
