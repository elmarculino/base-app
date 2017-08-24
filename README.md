# Base Node/Express App w/ Babel

This is my base Node app to test and run any node module ASAP with ES6 and Express. Just clone, install new modules, add your test code and run.

### Getting Started

Clone it
```shell
git clone git@github.com/elmarculino/base-app.git
cd base-app
```

Install dependencies.
```shell
$ npm install
```

Start development live-reload server
```shell
$ npm start
```

Test the app.
```shell
$ npm test
```

Build & Start production app.
```shell
$ npm run build
$ npm run serve
```


### Docker Support

Build your docker
```sh
docker build -t my/base-app .
```

Run your docker
```sh
docker run -p 3030:3030 my/base-app
```


That's all folks!
