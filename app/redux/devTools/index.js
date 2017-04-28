import React from 'react'

//从redux-devtools中引入createDevTools
import {createDevTools} from 'redux-devtools'
//显示包是单独的，要额外指定
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

module.exports = createDevTools(
    <DockMonitor toggleVisibilityKey='ctrl-g'
                 changePositionKey='ctrl-q'
                 defaultIsVisible={false}>
        <LogMonitor/>
    </DockMonitor>
);