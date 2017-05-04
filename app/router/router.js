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
const Search = cb => require.ensure([], require => { cb(null, require('../view/search').default)}, "search")
const UserMirror = cb => require.ensure([], require => { cb(null, require('../view/userMirror').default)}, "userMirror")


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
		{	
			path: RouterConst.SEARCH_LIST,
			getComponent(nextState, cb){ Search(cb) }
		},
		{
			path: RouterConst.USER_MIRROR,
			getComponent(nextState, cb){ UserMirror(cb) }
		}
	]
}

export default Routers