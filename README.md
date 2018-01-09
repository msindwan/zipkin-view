# Zipkin View (Beta)

[![circleci](https://circleci.com/gh/msindwan/zipkin-view.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/msindwan/zipkin-view)

This is an alternative UI for [OpenZipkin/zipkin](https://github.com/openzipkin/zipkin). The motivation for implementing
a new UI is to try and re-invent the existing layout while improving the usability and performance of the client-side
application. Zipkin View is built from scratch using React and other JavaScript technologies.

**By using Zipkin View you agree to the [terms of use and privacy policy](
    https://github.com/msindwan/zipkin-view/wiki/Terms-of-Use-and-Privacy-Policy)**

## Requirements

Zipkin View requires `node` to build and serve assets. Make sure to run `npm install` from the root directory before running any
npm scripts.

## Quick Start

Ensure that you have an instance of Zipkin running. To start the production server, run
`NODE_ENV=production ZIPKIN_API=<Zipkin instance's API URL> npm run prod -- [webpack-dev-server options]`. This will serve all
assets and make api requests against the specified Zipkin URL.

## Development

Suggestions and contributions are greatly appreciated! Please see the contribution guidelines.

To start the development process, run
`NODE_ENV=development ZIPKIN_API=<Zipkin instance's API URL> npm run dev -- [webpack-dev-server options]`.

## Other Deployment Options

If you want to serve files using a different http server (e.g nginx), you can build production assets alone by running
`NODE_ENV=production ZIPKIN_API=<Zipkin instance's API URL> npm run build`. If the build is successful, the scripts should exist
under the static directory. You can then configure your server to serve from the static directory. You would also need to fallback
on the index page if the requested resource is not found.

## License

Zipkin View is licensed under the Apache License, Version 2.0. It was inspired by the OpenZipkin/zipkin project and
released with the intention of complementing to the incredible work done by OpenZipkin. It is not, however, affiliated
or endorsed by the OpenZipkin authors.
