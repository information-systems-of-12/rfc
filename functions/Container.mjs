import * as React from 'react'
const createElement = React.default.createElement
const Component = React.default.Component

import { useValueContext, setResetActionContext } from './contexts.mjs'

export default class Container extends Component {
  constructor( props ){
    try {
      super( props )
      this.values = {}
      this.resetActions = {}

      this.useValue = this.useValue.bind( this )
      this.onReset = this.onReset.bind( this )

    } catch ( error ) {
      console.error( error )
    }
  }

  render(){
    return createElement( useValueContext.Provider, { value: this.useValue },
      createElement( 'form', { 
          autoComplete: 'off', 
          onSubmit: event => {
            event.preventDefault()
            return this.props.onSubmit( this.values )
          }
        },

        this.props.children
      )
    )
  }


  async useValue( name, value ){
    this.values[ name ] = value
    this.props.onChange( this.values, name, value )
  }

  setResetAction( componentName, action ){
    this.resetActions[ componentName ] = action
  }

  onReset( event ){
    this.values = {}
    for ( const [ cn, a ] of Object.entries( this.resetActions ) ){
      a()
    }

  }

}