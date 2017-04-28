/**
 * Created by zhao 
 * 2017/3/14.
 */
import React, { PropTypes } from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import * as RouterConst from '../static/const'
const App = cb => require.ensure([], require => { cb(null, require('../view/main').default)}, "App")
const Home = cb => require.ensure([], require => { cb(null, require('../view/home').default)}, "Home")
const User = cb => require.ensure([], require => { cb(null, require('../view/user').default)}, "User")
const Routers = {
	path: RouterConst.ROUTER_HOME,
	getComponent(nextState, cb){ App(cb) },
	indexRoute: {
		getComponent(nextState, cb){ Home(cb) }
	},
	childRoutes: [
		{	
			path: RouterConst.USER,
			getComponent(nextState, cb){ User(cb) }
		},
	]
}

export default Routers