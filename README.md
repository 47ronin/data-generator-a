# Data Generator, Type A

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

## Type A variant

Type A is designed only for very basic digital signage systems (Appspace, in this example) that can only handle generic dynamic data as retrievable, plain text files.

Type A will continuously generate text files if the URL is refreshed in the signage software. It does not rely on an internal timer for simplicity. In Appspace, an HTML “bug” can be placed in a sign application that refreshes itself every few seconds to call for new data. Within Appspace, “Plain Text” widgets in the sign layout pull their respective text file data via http, e.g. `47ronin.com/appfolder/output/output_stockQuote.txt`

Instead of using forecast.io’s `icon` for weather conditions, Type A will spell out the summary. Stock direction will simply be a `+` or `-` prepended to the parsed `Change` JSON value.

Type A is split into two URLs: `/` and `/stocks`. The `/` URL calls the `MainCtrl` controller and outputs only weather information as a POST variable called `payLoad`. The `/stocks` URL calls the `StockCtrl` controller and outputs stock information as a POST variable called `payLoad`. Both call `process.php` to write the files into an `output` directory.

`process.php` checks if each POST variable is set before attempting to overwrite the text files in the `output` directory. If a variable is not set (not sent via POST) then it will move on, leaving the current target file intact.

## Author

- Name: Glenn Batuyong
- Email: glenn@47ronin.com
- Twitter: https://twitter.com/gbatuyong
- GitHub: https://github.com/47ronin

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.
