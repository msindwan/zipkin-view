# Zipkin View (Beta)

[![circleci](https://circleci.com/gh/msindwan/zipkin-view.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/msindwan/zipkin-view)

This is an alternative UI for [OpenZipkin/zipkin](https://github.com/openzipkin/zipkin). The motivation for implementing
a new UI is to try and re-invent the existing layout while improving the usability and performance of the client-side
application. Zipkin View is built from scratch using React and other JavaScript technologies.

**By using Zipkin View you agree to the [terms of use and privacy policy](
    https://github.com/msindwan/zipkin-view/wiki/Terms-of-Use-and-Privacy-Policy)**

## Quick Start

Zipkin View is released as a zip folder of front-end assets. To deploy the application, simply serve the contents
of the folder using the HTTP server of your choice. Be sure to configure the server to proxy all 'api/' requests
to a running Zipkin instance.

Alternatively, see the [development](#development) section to deploy a dev version.

## Development

Suggestions and contributions are greatly appreciated! Please see the contribution guidelines.

Zipkin View requires `node` to build the front-end assets. To start the development process:

1. Run `npm install` from the root directory.
2. Ensure that you have an instance of Zipkin running. To start the dev server, run
`ZIPKIN_API=<Zipkin instance's API URL> npm run dev`. This will serve all assets and proxy API requests to Zipkin.
3. Code away!

To build a production set of assets, run `NODE_ENV=production npm run build`.

## License

Zipkin View is licensed under the Apache License, Version 2.0. It was inspired by the OpenZipkin/zipkin project and
released with the intention of complementing to the incredible work done by OpenZipkin. It is not, however, affiliated
or endorsed by the OpenZipkin authors.
