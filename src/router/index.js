import React from 'react';
import { Router, Route } from 'dva/router';
import * as Models from '../models'

const cached = {};
const registerModel = (app, model)=>{
    if (!cached[model.namespace]) {
        app.model(model)
        cached[model.namespace] = 1
    }
}

const RouterConfig = ({ history, app }) => {
    const App = cb => require.ensure([], require => { cb(null, require('../views/main')); })
    const User = cb => require.ensure([], require => { cb(null, require('../views/user')); })
    const UserFigure = cb => require.ensure([], require => { cb(null, require('../views/userFigure')); })
    // const Product = cb => require.ensure([], require => { registerModel(app, Models.Product); cb(null, require('../views/product')); })

    const routes = [
        {
            path: '/',
            getComponent(nextState, cb) { App(cb) },
            indexRoute: {
                getComponent(nextState, cb){ User(cb) }
            },

            childRoutes: [
                {
                    path: '/figure',
                    getComponent(nextState, cb) { UserFigure(cb) }
                }
            ]
            
        }
    ]

    return <Router history={history} routes={routes} />
}

export default RouterConfig