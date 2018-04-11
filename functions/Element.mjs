import * as React from 'react'
const createElement = React.default.createElement
const Component = React.default.Component
import { useValueContext } from './contexts.mjs'

export default class Element extends Component {
  constructor( props ){
    try {
      super( props )
    } catch ( error ) {
      console.error( error )
    }
  }

  render(){
    return createElement( useValueContext.Consumer, {},
      useValue => createElement( this.props.wrappedComponentConstructor, { useValue } )
    )
  }
}