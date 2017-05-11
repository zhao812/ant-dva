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

const Message = cb => require.ensure([], require => { cb(null, require('../view/message/index').default)}, "Message")
const MessageSetUp = cb => require.ensure([], require => { cb(null, require('../view/message/setUp').default)}, "SetUp")
const MessageSetUpMobile = cb => require.ensure([], require => { cb(null, require('../view/message/setUpMobile').default)}, "SetUpMobile")
const MessageList = cb => require.ensure([], require => { cb(null, require('../view/messageList').default)}, "MessageList")



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
		},
		{	
			path: RouterConst.GET_MESSAGE,
			getComponent(nextState, cb){ Message(cb) }
		},
		{	
			path: RouterConst.MESSAGE_STEPUP,
			getComponent(nextState, cb){ MessageSetUp(cb) }
		},
		{	
			path: RouterConst.MESSAGE_STEPUP_MOBILE,
			getComponent(nextState, cb){ MessageSetUpMobile(cb) }
		},
		{
			path: RouterConst.MESSAGE_LIST,
			getComponent(nextState, cb){ MessageList(cb) }
		},
	]
}

export default Routers