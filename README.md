[![Quality Assurance](https://github.com/Lexouden/jform-react/actions/workflows/quality_assurance.yml/badge.svg)](https://github.com/Lexouden/jform-react/actions/workflows/quality_assurance.yml)
[![Code Quality](https://github.com/Lexouden/jform-react/actions/workflows/code_quality.yml/badge.svg)](https://github.com/Lexouden/jform-react/actions/workflows/code_quality.yml)
[![CodeQL](https://github.com/Lexouden/jform-react/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Lexouden/jform-react/actions/workflows/codeql-analysis.yml)

# jform-react
Generate react forms using JSON objects


> This package is a updated TypeScript rewrite of [liform-react](https://github.com/Limenius/liform-react) and can be used as a drop-in upgrade/replacement

## Installation
``` bash 
npm install jform-react --save 
```

## Basic Usage
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
