
<div align="center">
  <br/>
  <p>
    <h1>jform-react</h1>
    <p>Generate react forms using JSON schemas</p>
  </p>
  <br/>
  <p>
    <a href="https://github.com/Lexouden/jform-react/actions/workflows/quality_assurance.yml"><img src="https://github.com/Lexouden/jform-react/actions/workflows/quality_assurance.yml/badge.svg?style=for-the-badge" /></a>
  <a href="https://github.com/Lexouden/jform-react/actions/workflows/code_quality.yml"><img src="https://github.com/Lexouden/jform-react/actions/workflows/code_quality.yml/badge.svg?style=for-the-badge" /></a>
  <a href="https://github.com/Lexouden/jform-react/actions/workflows/codeql-analysis.yml"><img src="https://github.com/Lexouden/jform-react/actions/workflows/codeql-analysis.yml/badge.svg?style=for-the-badge" /></a>
  </p>
  <br/>
  <p>
    <a href="https://npmjs.org/package/jform-react"><img src="https://img.shields.io/npm/v/jform-react?style=for-the-badge" /></a>
    <a href="https://npmjs.org/package/jform-react"><img alt="npm" src="https://img.shields.io/npm/dw/jform-react?style=for-the-badge"></a>
  </p>
</div>

## Table of contents
- [About](#about)
- [Installation](#installation)
- [Example Usage](#example-usage)

## About
> This package is a updated TypeScript rewrite of [liform-react](https://github.com/Limenius/liform-react) and can be used as a drop-in upgrade/replacement
It uses [Ajv](https://www.npmjs.com/package/ajv) to validate JSON schemas given to the form.

## Installation
**Node.js 14.0.0 or newer is required.**

``` bash 
npm install jform-react --save 
```

## Example usage
```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { Provider } from 'react-redux';
import Jform from 'jform-react';


const reducer = combineReducers({
  form: formReducer
})

var schema = {
  "title": "Some form",
  "properties": {
    "name": { "type":"string","title":"Model", "default": "Ziummmm"},
    "description": { "type":"string", "title": "Description", "widget": "textarea" }
  },
  "required": ["name"]
};

const store = (window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)(reducer)

const showResults = values => {
    window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
}

const dest = document.getElementById('form-holder')

ReactDOM.render(
    <Provider store={store}>
        <Jform schema={schema} onSubmit={showResults}/>
    </Provider>,
    dest
)
```
