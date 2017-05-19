/**
 * created by zhao at 2017/3/15
 */
'use strict'
import { combineReducers, createStore, applyMiddleware , compose } from 'redux';
import { hashHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'

import thunk from 'redux-thunk';

import * as reducers  from "./reducers";

const reducer = combineReducers({
	...reducers,
    routing: routerReducer
})

// 创建一个中间件集合
const routingMiddleware = routerMiddleware(hashHistory);

// 利用compose增强store，这个 store 与 applyMiddleware 和 redux-devtools 一起使用
let store, middleware, enhancer;
console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV != "production"){
    let DevTools = require('./devTools') ;// 利用redux-logger打印日志
	let {createLogger} = require('redux-logger') ;// 调用日志打印方法
    // 调用日志打印方法
    const loggerMiddleware = createLogger()
    middleware = applyMiddleware(routingMiddleware, loggerMiddleware, thunk);

    enhancer = compose(
        middleware,
        DevTools.instrument()
    );

    store = createStore(
        reducer,
        enhancer
    );
}else{
    middleware = applyMiddleware(routingMiddleware, thunk);
    enhancer = compose(
        middleware
    );
    store = createStore(reducer, enhancer);
}

const history = syncHistoryWithStore(hashHistory, store);

export {store, history}