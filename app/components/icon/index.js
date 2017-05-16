import React from 'react'
import classNames from 'classnames'
import './index.scss'

const Icon = props => {
  let url = require(`./symbol-defs.svg`)
  let { name, size, color, style, className } = props
  name = `icon-${name}`
  return (
    <svg
      style={{
        width: size + 'px',
        height: size + 'px',
        fill: color,
        ...style
      }} 
      className={classNames({icon:1,[className]:1})}>
      {<use xlinkHref={`${url}#${name}`}></use>}
    </svg>
  )
}
Icon.defaultProps = {
  // color: '#000',
  size: 16
}
export default Icon