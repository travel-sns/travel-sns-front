# webpack react setting

- 리액트 셋팅 프로젝트입니다.

https://travel-sns.github.io/travel-sns-front/

## basic webpack setting

- 웹팩 설정

### install webpack & plugins

```bash
npm init
npm install webpack
npm install webpack-cli ## webpack4 cli
npm install webpack-dev-server ## dev-server
npm install webpack-merge ## for config file merget
npm install html-webpack-plugin ## html template
```

### setting build script package.json

```js
  "scripts": {
    "build-dev": "webpack --mode development",
    "build": "webpack --mode production",
    "dev": "webpack-dev-server --open --mode development",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```

### make directory

```bash
.
├─ webpackconfig
│  ├─ webpack.config.common.js
│  ├─ webpack.config.dev.js
│  ├─ webpack.config.prod.js
│  └─ index.html
├─ src
│  └─ index.js
├─ .gitignore
├─ webpack.config.js ## webpack config file
├─ package-lock.json
└─ package.json
```

### webpack.config.js

- 개발서버, 빌드, 둘다 사용하는 config 나눠서 관리


#### src/webpack.config.js
- 개발은 common + dev, 운영은 common + prod 컨피그 머지함.

```js
const merge = require('webpack-merge');
const common = require('./webpackconfig/webpack.config.common.js');
const dev = require('./webpackconfig//webpack.config.dev.js');
const prod = require('./webpackconfig//webpack.config.prod.js');

module.exports = (env, options) => {
    if (options.mode === 'development') {
        return merge(common, dev);
    }
    if (options.mode === 'production') {
        return merge(common, prod);
    }
}
```

#### webpack.config.common.js
- HtmlWebpackPlugin : html 탬플렛 만들어서 빌드 하기 위해

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
const ROOT = path.resolve(__dirname, '../');
const APP_DIR = path.resolve(ROOT, 'src');
const BUILD_DIR = path.resolve(ROOT, 'dist');

module.exports = {
    entry: {
        app: [APP_DIR + '/index.js']
    },
    plugins: [
        //creation of HTML files to serve your webpack bundles
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html')
        })
    ]
}
```

### index.html

- html-webpack-plugin을 써서 이 html template으로 빌드 할 꺼임.
- `template: path.resolve(__dirname, 'index.html')` 이 경로에 템플릿 만들어 놓음

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>hello</title>
</head>

<body>
    <div id="app"></div>
</body>

</html>
```

#### webpack.config.prod.js

- 빌드 셋팅은 추후에 진행

```js
const path = require('path');
const ROOT = path.resolve(__dirname, '../');
const APP_DIR = path.resolve(ROOT, 'src');
const BUILD_DIR = path.resolve(ROOT, 'dist');

module.exports = {
    mode: 'production',
    output: {
      filename: "[name].[hash].js",
      chunkFilename: "[name].[hash].js",
      path: BUILD_DIR,
      publicPath: "/webpack-react-setting/"
    }
}
```

#### webpack.config.dev.js

- HotModuleReplacementPlugin : 소스 변경 시 바로 적용
- devtool : 용도에 맞게 쓰기

```js
const webpack = require('webpack');

const path = require('path');
const ROOT = path.resolve(__dirname, '../');
const APP_DIR = path.resolve(ROOT, 'src');
const BUILD_DIR = path.resolve(ROOT, 'dist');

module.exports = {
  mode: "development",
  //https://webpack.js.org/configuration/devtool/#devtool
  devtool: "cheap-module-source-map", //디버깅용
  output: {
    filename: "[name].[hash].js",
    path: BUILD_DIR,
    publicPath: "/",
    pathinfo: true
  },
  devServer: {
    index: "index.html",
    host: "localhost", //By default this is localhost
    port: 8080,
    hot: true, //Enable webpack's Hot Module Replacement
    compress: true,
    contentBase: path.join(ROOT, "public"), //Tell the server where to serve content from, path.join(__dirname, 'public')
    allowedHosts: ["host.com"], // This option allows you to whitelist services that are allowed to access the dev server.
    historyApiFallback: true, //When using the HTML5 History API, the index.html page will likely have to be served in place of any 404 responses
    overlay: true, //Shows a full-screen overlay in the browser when there are compiler errors or warnings
    clientLogLevel: "warning", //may be too verbose, you can turn logging off by setting it to 'silent'
    disableHostCheck: false, //When set to true this option bypasses host checking
    openPage: "webpack-react-setting" //Specify a page to navigate to when opening the browser
    // proxy: {
    //   "/api": {
    //     target: "https://other-server.example.com",
    //     secure: false //A backend server running on HTTPS
    //   }
    // }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
}
```

### src/index.js

- 엔트리

```js
function component() {
    var element = document.createElement('pre');
    element.innerHTML = 'HELLO !'
    return element;
}

document.body.appendChild(component());
```

## .gitigore

```bash
/node_modules
/dist
```

## build

```bash
npm run build
npm run dev
```

## webpack Plugins

### clean-webpack-plugin

- clean the /dist folder before each build
- https://webpack.js.org/guides/output-management/

``` js
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

    plugins: [
        new CleanWebpackPlugin()
    ]
```

## babel setting

### install babel

```bash
npm install @babel/core
npm install @babel/plugin-syntax-dynamic-import
npm install @babel/polyfill
npm install @babel/preset-env
npm install babel-loader
```

- @babel/core : Babel compiler core.
- @babel/plugin-syntax-dynamic-import : Allow parsing of import()
- @babel/polyfill : This will emulate a full ES2015+ environment (no < Stage 4 proposals) and is intended to be used in an application rather than a library/tool.
- @babel/preset-env : allows you to use the latest JavaScript without needing to micromanage which syntax transforms
- babel-loader :  allows transpiling JavaScript files using Babel and webpack.

### create babellc file

```js
{
    "presets": ["@babel/preset-env"],
    "plugins": ["@babel/plugin-syntax-dynamic-import"]
}
```

### set webpack module

```js
{
        test: /\.js/,
        exclude: /(node_modules)/,
        use: [{
            loader: 'babel-loader'
        }]
    }
```

## react setting

### install npm module

```bash
npm install react
npm install react-dom
npm install react-router-dom
npm install @babel/preset-react
```

### add babel preset

```js
  {
      "presets": ["@babel/preset-env", "@babel/preset-react"],
      "plugins": ["@babel/plugin-syntax-dynamic-import"]
  }
```

### edit webpack config module

```js
{
        test: /\.(js|jsx)$/,
        exclude: "/node_modules",
        use: ['babel-loader'],
}
```

## src/index.js
```js
import React from 'react';
import { render } from 'react-dom';

const App = () => (
  <div>
    <p>hello</p>
  </div>
);

render(<App />, document.getElementById('app'));

```

## react Router setting

- path.js
```js
import React from 'react';

const path = [
  {
    path: "/",
    exact: true,
    component: () => <h2>Home</h2>
  }, {
    path: "/users",
    component: () => <h2>users</h2>
  }, {
    path: "/about",
    component: () => <h2>about</h2>
  }, {
    path: "/will-match",
    component: () => <h2>will-match</h2>
  }
];

export default path;

```

- Menu.js

```js
import React from 'react';
import {Link} from "react-router-dom";

class Menu extends React.Component {
  render() {
    return (<nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about/">About</Link>
        </li>
        <li>
          <Link to="/users/">Users</Link>
        </li>
        <li>
          <Link to="/will-match/">Will Match</Link>
        </li>
        <li>
          <Link to="/old-match/">Old Match, to be redirected</Link>
        </li>
        <li>
          <Link to="/nomatch/">nomatch</Link>
        </li>
      </ul>
    </nav>);
  }
}

export default Menu;

```

- RoutePage.js

```js
import React from 'react';
import {Route, Switch, Redirect} from "react-router-dom";

import path from "./path"

class RoutePage extends React.Component {
  render() {
    return (<Switch>
      {
        path.map((obj, index) => {\
          return <Route key={index} path={obj.path} exact={obj.exact} component={obj.component}/>
        })
      }
      <Redirect from="/old-match" to="/will-match"/>
      <Route component={NoMatch}/>
    </Switch>);
  }
}

function NoMatch() {
  return <h2>404</h2>;
}

export default RoutePage;
```

- App.js

```js
import React from 'react';
import Menu from "./Menu.js"
import RoutePage from "./RoutePage.js"
import {BrowserRouter as Router} from "react-router-dom";

class App extends React.Component {
  render() {
    return (<div>
      <Router>
        <Menu/>
        <RoutePage/>
      </Router>
    </div>)
  }
}

export default App;

```


## alias setting
- 절대경로에 호칭 붙이기
- webpack.config
```js
module.exports = {
  resolve: {
    alias: {
      'Src': APP_DIR,
    },
    extensions: ['*', '.js', '.json']
  }
}

```

## css style loader setting
- style-loader : Adds CSS to the DOM by injecting a style tag, It's recommended to combine style-loader with the css-loader
- css-loader : The css-loader interprets import and url() like import/require() and will resolve them.

```js
{
  test: /\.css$/,
  use: [
    'style-loader',
    {
      loader: "css-loader",
      options: {
        modules: {
          localIdentName: '[path][name]__[local]--[hash:base64:5]', //모듈화 했을때 네이밍
          context: APP_DIR,
        }
      }
    }
  ]
}
```

## postcss setting
- postcss-preset-env : lets you convert modern CSS into something most browsers can understand

```bash
npm install postcss-loader
npm install postcss-preset-env
```

```js
{
  test: /\.css$/,
  use: [
    'style-loader',
    {
      loader: "css-loader",
      options: {
        importLoaders: 1, //The option importLoaders allows you to configure how many loaders before css-loader should be applied to @imported resources.
        modules: {
          localIdentName: '[path][name]__[local]--[hash:base64:5]',
          context: APP_DIR,
        }
      }
    },
    'postcss-loader'
  ]
}
```

- create postcs.config.js file

```js
module.exports = ({ file, options, env }) => ({
   plugins: {
     'postcss-preset-env': {}
   }
})
```


### mobx setting
- https://velog.io/@velopert/MobX-3-%EC%8B%AC%ED%99%94%EC%A0%81%EC%9D%B8-%EC%82%AC%EC%9A%A9-%EB%B0%8F-%EC%B5%9C%EC%A0%81%ED%99%94-%EB%B0%A9%EB%B2%95-tnjltay61n
``` bash
npm install mobx
npm install mobx-react
npm install mobx-react-devtools //버전문제있음 확인해야됨
npm install @babel/plugin-proposal-decorators
npm install @babel/plugin-syntax-dynamic-import
```

- .bablelrc 플러그인 추가
``` bash
{
  "plugins": [
    ["@babel/plugin-proposal-decorators", {
      "legacy": true
    }],
    ["@babel/plugin-proposal-class-properties", {
      "loose": true
    }]
  ]
}
```


### testing and http setting
- https://scotch.io/tutorials/nodejs-tests-mocking-http-requests
```bash
npm install mocha
npm install nock
npm install chai
npm install fs
npm install axios
```

- package.json script 추가
```js
"scripts": {
  "test": "mocha"
}
```

- example
```js
const expect = require('chai').expect;
const nock = require('nock');
const response = require('./response');
const axios = require('axios');

describe('Get User tests', () => {

  let container;

  beforeEach(() => {
    nock('https://api.github.com')
      .get('/users/octocat')
      .reply(200, response);
  });

  it('Get a user by username', () => {
    let getUser = (username) => {
      return axios.get(`https://api.github.com/users/${username}`)
        .then(res => res.data)
        .catch(error => console.log(error));
    };

    return getUser('octocat')
      .then(response => {
        //expect an object back
        expect(typeof response).to.equal('object');

        //Test result of name, company and location for the response
        expect(response.name).to.equal('The Octocat')
        expect(response.company).to.equal('GitHub')
        expect(response.location).to.equal('San Francisco')
      });
  });
});

```

### react testing setting
```bash
npm install @testing-library/react
npm install jest
```

- package.json script 추가
```js
"scripts": {
  "jest-test": "jest -c jest.config.js --watch"
}
```

- create jest config file, src/jest.config.js

```js
module.export = {
  roots: ['<rootDir>/src'],
  transform: {
    '\\.(js|jsx)?$': 'babel-jest',
  },
  testMatch: ['<rootDir>/src/**/>(*.)test.{js, jsx}'], // finds test
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/public/'],
  setupFilesAfterEnv: [
    'jest-dom/extend-expect',
    '@testing-library/react/cleanup-after-each'
  ] // setupFiles before the tests are ran
};
```

- component test example
- Profile.js
```js
import React from 'react';

const Profile = ({ username, name }) => {
  return (
      <h1>Hi {username} {name}!</h1>
  );
};

export default Profile;
```
- Profile.test.js
```js
import React from 'react'
import {
  render,
  cleanup
} from '@testing-library/react'
import Profile from './Profile'

afterEach(cleanup)

describe('This will test MyComponent', () => {
  test('renders message', () => {
    const {getByText} = render( <Profile username="Alejandro" name="Roman" /> )

    // as suggested by Giorgio Polvara a more idiomatic way:
    expect(getByText('Hi Alejandro Roman!'))
  })
})
```


### setting code splitting

- https://velog.io/@velopert/react-code-splitting

- create src/withSplitting.js for HOC

```js
import React, { Component } from 'react';

const withSplitting = getComponent => {
  // 여기서 getComponent 는 () => import('./SplitMe') 의 형태로 함수가 전달되야합니다.
  class WithSplitting extends Component {
    state = {
      Splitted: null
    };

    constructor(props) {
      super(props);
      getComponent().then(({ default: Splitted }) => {
        this.setState({
          Splitted
        });
      });
    }

    render() {
      const { Splitted } = this.state;
      if (!Splitted) {
        return null;
      }
      return <Splitted {...this.props} />;
    }
  }

  return WithSplitting;
};

export const About = withSplitting(() => import(/* webpackChunkName: "about" */'Src/Container/About/About'));
export const User = withSplitting(() => import(/* webpackChunkName: "user" */'Src/Container/User/User'));
export const SuperMarket = withSplitting(() => import(/* webpackChunkName: "superMarket" */'Src/Container/SuperMarket/SuperMarket'));
export const Profile = withSplitting(() => import(/* webpackChunkName: "profile" */'Src/Container/Profile/Profile'));

```

- path.js
```js
import React from 'react';
import {About, User, SuperMarket, Profile} from './withSplitting';

const path = [
  {
    path: "/",
    exact: true,
    component: () => <h2>Home</h2>
  }, {
    path: "/user",
    component: User
  }, {
    path: "/about",
    component: About
  }, {
    path: "/will-match",
    component: () => <h2>will-match</h2>
  }, {
    path: "/superMarket",
    component: SuperMarket
  }, {
    path: "/profile",
    component: () => <Profile username="moi" name="김유경"/>
  }
];

export default path;
```

# prod build server optimization

```js
optimization: {
  namedModules: true, //Tells webpack to use readable module identifiers for better debugging
  namedChunks: true, //webpack to use readable chunk identifiers for better debugging
  moduleIds: "named", //Readable ids for better debugging.
  mangleWasmImports: true, //tells webpack to reduce the size of WASM by changing imports to shorter strings.
  providedExports: true, //Tells webpack to figure out which exports are provided by modules to generate more efficient code for export * from
  removeAvailableModules: true, //Tells webpack to detect and remove modules from chunks when these modules are already included in all parents
  usedExports: true, //Tells webpack to determine used exports for each module
  concatenateModules: true, //Tells webpack to find segments of the module graph which can be safely concatenated into a single module
  minimizer: [
    //https://webpack.js.org/plugins/terser-webpack-plugin/
    new TerserPlugin({
      parallel: true, //Use multi-process parallel running to improve the build speed
      sourceMap: true, //Use source maps to map error message locations to modules
      //https://github.com/terser/terser#minify-options
      terserOptions: {
        mangle: true, //false to skip mangling names
        compress: {
          drop_console: true //Pass true to discard calls to console.* functions
        }
      }
    })
  ]
}
```
