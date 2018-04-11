import * as React from 'react'
const createElement = React.default.createElement
const Component = React.default.Component
import { useValueContext } from './contexts.mjs'

const AT_SYMBOL = '@'

export default class Email extends Component {
  constructor( props ){
    try {
      super( props )
      this.state = { value: '', value1: '', value2: '' }
      this.onChange1 = this.onChange1.bind( this )
      this.onChange2 = this.onChange2.bind( this )

    } catch ( error ) {
      console.error( error )
    }
  }

  render(){
    const { Label, EmailAddressBodyInput, AtSymbolLabel, EmailAddressDomainNameInput } = this.props.components

    return createElement( useValueContext.Consumer, {},
 
      useValue => [
        createElement( Label, { key: 0, htmlFor: this.props.name } ),
        createElement( EmailAddressBodyInput, { key: 1, id: this.props.name, type: 'text', onChange: event => this.onChange1( event, useValue ), autoComplete: 'email-1' } ),
        createElement( AtSymbolLabel, { key: 2 } ),
        createElement( EmailAddressBodyInput, {  key: 3, type: 'text', onChange: event => this.onChange2( event, useValue ), autoComplete: 'email-2' } ),
      ]
    )
    
  }

  onChange1( event, useValue ){
    const value1 = event.target.value
    const value = value1 + AT_SYMBOL + this.state.value2
    this.setState( { value1, value } )
    useValue( this.props.name, value === AT_SYMBOL ? '' : value )
  }

  onChange2( event, useValue ){
    const value2 = event.target.value
    const value = this.state.value1 + AT_SYMBOL + value2
    this.setState( { value2, value } )
    useValue( this.props.name, value === AT_SYMBOL ? '' : value )
  }

}