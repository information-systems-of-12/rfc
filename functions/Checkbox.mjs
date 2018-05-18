import * as React from 'react'
const createElement = React.default.createElement
const Component = React.default.Component
import { useValueContext, setResetActionContext } from './contexts.mjs'

export default class Checkbox extends Component {
  constructor( props ){
    try {
      super( props )
      this.state = {}
      this.state.value = props.value !== undefined ? props.value : false
      
      this.useValue = this.useValue.bind( this )

    } catch ( error ) {
      console.error( error )
    }
  }

  render(){
    return createElement( useValueContext.Consumer, {},
      useValue => createElement( this.props.component, { value: this.state.value, useValue: value => this.useValue( value, useValue ) } )
    )
  }

  async useValue( value, useValue ){
    await this.setStateWrapper( { value } )
    await useValue( this.props.name, this.state.value )
  }

  setStateWrapper( obj ){
    return new Promise( ( resolve, reject ) => {
      this.setState( obj, () => resolve( true ) )
    } ) 
  }
}