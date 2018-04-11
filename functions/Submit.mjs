import * as React from 'react'
const createElement = React.default.createElement
const Component = React.default.Component

export default props => createElement( props.component, { type: 'submit', value: props.text || props.children } )