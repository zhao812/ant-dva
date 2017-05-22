import React, { PropTypes } from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import * as RouterConst from '../static/const'
const App = cb => require.ensure([], require => { cb(null, require('../view/main').default)}, "App")
const Login = cb => require.ensure([], require => { cb(null, require('../view/login').default)}, "Login")
const Register = cb => require.ensure([], require => { cb(null, require('../view/login/register').default)}, "Register")
const ForgetPW = cb => require.ensure([], require => { cb(null, require('../view/login/forgetPw').default)}, "ForgetPW")
const ResetPW = cb => require.ensure([], require => { cb(null, require('../view/login/resetPw').default)}, "ResetPW")
const Home = cb => require.ensure([], require => { cb(null, require('../view/home').default)}, "Home")
const User = cb => require.ensure([], require => { cb(null, require('../view/user').default)}, "User")
const Search = cb => require.ensure([], require => { cb(null, require('../view/search').default)}, "search")
const UserMirror = cb => require.ensure([], require => { cb(null, require('../view/userMirror').default)}, "userMirror")

const Message = cb => require.ensure([], require => { cb(null, require('../view/message/index').default)}, "Message")
const MessageSetUp = cb => require.ensure([], require => { cb(null, require('../view/message/setUp').default)}, "SetUp")
const MessageSetUpMobile = cb => require.ensure([], require => { cb(null, require('../view/message/setUpMobile').default)}, "SetUpMobile")
const MessageList = cb => require.ensure([], require => { cb(null, require('../view/messageList').default)}, "MessageList")

const Wechart = cb => require.ensure([], require => { cb(null, require('../view/wechat/createH5/index').default)}, "wechat")
const WechartNext= cb => require.ensure([], require => { cb(null, require('../view/wechat/createH5/next').default)}, "wechartNext")

const Favorite = cb => require.ensure([], require => { cb(null, require('../view/favorite').default)}, "Favorite")

const Routers = {
	path: RouterConst.ROUTER_HOME,
	getComponent(nextState, cb){ App(cb) },
	indexRoute: {
		getComponent(nextState, cb){ Home(cb) }
	},
	childRoutes: [
		{
			path: RouterConst.ROUTER_LOGIN,
			getComponent(nextState, cb){ Login(cb) }
		},
		{
			path: RouterConst.ROUTER_REGISTER,
			getComponent(nextState, cb){ Register(cb) }
		},
		{
			path: RouterConst.ROUTER_FORGET_PW,
			getComponent(nextState, cb){ ForgetPW(cb) }
		},
		{
			path: RouterConst.ROUTER_RESET_PW,
			getComponent(nextState, cb){ ResetPW(cb) }
		},
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
			path: RouterConst.WECHART,
			getComponent(nextState, cb){ Wechart(cb) }
		},
		{	
			path: RouterConst.WECHARTNEXT,
			getComponent(nextState, cb){ WechartNext(cb) }
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
		{
			path: RouterConst.ROUTER_FAVORITE,
			getComponent(nextState, cb){ Favorite(cb) }
		}
	]
}

export default Routers