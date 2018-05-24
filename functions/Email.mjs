import * as React from 'react'
const createElement = React.default.createElement
const Component = React.default.Component
import { useValueContext } from './contexts.mjs'

const AT_SYMBOL = '@'
const DOT_SYMBOL = '.'


export default class Email extends Component {
  constructor( props ){
    try {
      super( props )
      this.state = {}

      this.onChange = this.onChange.bind( this )
      this.onKeyDown = this.onKeyDown.bind( this )

      this.EmailAddressBodyInput = null
      this.EmailAddressDomainNameInput = null
      this.EmailAddressDomainInput = null

    } catch ( error ) {
      console.error( error )
    }
  }


  static getDerivedStateFromProps( nextProps, prevState ){
    const newState = {}
    newState.value1 = nextProps.defaultEmailAddressBodyValue !== undefined && prevState.value1 === undefined ? nextProps.defaultEmailAddressBodyValue : prevState.value1
    newState.value2 = nextProps.defaultEmailAddressDomainNameValue !== undefined && prevState.value2 === undefined ? nextProps.defaultEmailAddressDomainNameValue : prevState.value2
    newState.value3 = nextProps.defaultEmailAddressDomainValue !== undefined && prevState.value3 === undefined ? nextProps.defaultEmailAddressDomainValue : prevState.value3
    newState.value = prevState.value === undefined ? `${ newState.value1 }@${ newState.value2 }.${ newState.value3 }` : prevState.value
    
    return newState
  }

  render(){

    return createElement( useValueContext.Consumer, {},
 
      useValue => createElement( this.props.components.Container, {},
        
        createElement( this.props.components.EmailAddressBodyInputContainer, { 
          id: this.props.name,
          type: 'text',
          onChange: event => this.onChange( event, useValue, 1 ),
          onKeyDown: event => this.onKeyDown( event, useValue, 1 ),
          autoComplete: 'email-address-body',
          reference: input => {
            this.EmailAddressBodyInput = input
          },
          value: this.state.value1
        } ),

        createElement( this.props.components.AtSymbolContainer, {} ),

        createElement( this.props.components.EmailAddressDomainNameInputContainer, {
          type: 'text',
          onChange: event => this.onChange( event, useValue, 2 ),
          onKeyDown: event => this.onKeyDown( event, useValue, 2 ),
          autoComplete: 'email-address-domain-name',
          reference: input => {
            this.EmailAddressDomainNameInput = input
          },
          value: this.state.value2
        } ),

        createElement( this.props.components.DotSymbolContainer, {} ),
        createElement( this.props.components.EmailAddressDomainInputContainer, {
          type: 'text',
          onChange: event => this.onChange( event, useValue, 3 ),
          onKeyDown: event => this.onKeyDown( event, useValue, 3 ),
          autoComplete: 'email-address-domain',
          reference: input => {
            this.EmailAddressDomainInput = input
          },
          value: this.state.value3
        } )

      )

    
    )
    
  }


  async onChange( event, useValue, position ){

    const inputValue = event.target.value

    if ( position === 1 ){
      const value = inputValue + AT_SYMBOL + this.state.value2 + DOT_SYMBOL + this.state.value3
      await this.setStateWrapper( { value1: inputValue, value } )
    } else if ( position === 2 ){
      const value = this.state.value1 + AT_SYMBOL + inputValue + DOT_SYMBOL + this.state.value3
      await this.setStateWrapper( { value2: inputValue, value } )
    } else if ( position === 3 ){
      const value = this.state.value1 + AT_SYMBOL + this.state.value2 + DOT_SYMBOL + inputValue
      await this.setStateWrapper( { value3: inputValue, value } )
    }

    await useValue( this.props.name, this.state.value === AT_SYMBOL ? '' : this.state.value )


  }


  async onKeyDown( event, useValue, position ){

    if ( event.key === 'Backspace' || event.key === 'Delete' ) {
      if ( position === 2 && this.state.value2 === '' ){
        event.preventDefault()
        const value = this.state.value1 + AT_SYMBOL + '' + DOT_SYMBOL + this.state.value3
        await this.setStateWrapper( { value2: '', value } )
        await useValue( this.props.name, this.state.value === AT_SYMBOL ? '' : this.state.value )
        this.EmailAddressBodyInput.focus()
      } else if ( position === 3 && this.state.value3 === '' ){
        event.preventDefault()
        const value = this.state.value1 + AT_SYMBOL + this.state.value2 + DOT_SYMBOL + ''
        await this.setStateWrapper( { value3: '', value } )
        await useValue( this.props.name, this.state.value === AT_SYMBOL ? '' : this.state.value )
        this.EmailAddressDomainNameInput.focus()
      }
    }

  }


  setStateWrapper( obj ){
    return new Promise( ( resolve, reject ) => {
      this.setState( obj, () => resolve( true ) )
    } )
  }

}

// https://learn.javascript.ru/keyboard-events