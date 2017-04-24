import React from 'react';
import { Router, Route } from 'dva/router';
import * as Models from '../models'

const cached = {};
function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}

function RouterConfig({ history, app }) {

  const IndexPage = cb => require.ensure([], require => { cb(null, require('../views/indexPage'));})
  const Product = cb => require.ensure([], require => { registerModel(app, Models.Product); cb(null, require('../views/product'));})

  const routes = [
    {
      path: '/',
      getComponent(nextState, cb){ IndexPage(cb) },
    },
    {
      path: '/product',
      getComponent(nextState, cb){ Product(cb) },
    }
  ];

  return <Router history={history} routes={routes} />;
}

export default RouterConfig;
