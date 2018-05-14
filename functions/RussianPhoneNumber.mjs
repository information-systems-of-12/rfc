import * as React from 'react'
const createElement = React.default.createElement
const Component = React.default.Component
import { useValueContext } from './contexts.mjs'

export default class RussianPhoneNumber extends Component {
  constructor( props ){
    try {
      super( props )
      this.state = {
        number1: props.defaultAreaCodeNumber1 || '',
        number2: props.defaultAreaCodeNumber2 || '',
        number3: props.defaultAreaCodeNumber3 || '',
        number4: props.defaultPhoneNumber1 || '',
        number5: props.defaultPhoneNumber2 || '',
        number6: props.defaultPhoneNumber3 || '',
        number7: props.defaultPhoneNumber4 || '',
        number8: props.defaultPhoneNumber5 || '',
        number9: props.defaultPhoneNumber6 || '',
        number10: props.defaultPhoneNumber7 || '',
      }
      this.onChange = this.onChange.bind( this )
      this.onKeyDown = this.onKeyDown.bind( this )

      this.Number1 = null
      this.Number2 = null
      this.Number3 = null
      this.Number4 = null
      this.Number5 = null
      this.Number6 = null
      this.Number7 = null
      this.Number8 = null
      this.Number9 = null
      this.Number10 = null

    } catch ( error ) {
      console.error( error )
    }
  }

  
  render(){
    return createElement( useValueContext.Consumer, {},

      useValue => createElement( this.props.components.Container, {},
        createElement( this.props.components.PlusContainer ),
        // area code
        createElement( this.props.components.SevenContainer ),
        createElement( this.props.components.Bracket1Container ),
        // country code
        createElement( this.props.components.Number1InputContainer, { type: 'text', value: this.state.number1, onChange: event => this.onChange( event, useValue, 1 ), onKeyDown: event => this.onKeyDown( event, 1 ),reference: input => this.Number1 = input } ),
        createElement( this.props.components.Number2InputContainer, { type: 'text', value: this.state.number2, onChange: event => this.onChange( event, useValue, 2 ), onKeyDown: event => this.onKeyDown( event, 2 ),reference: input => this.Number2 = input } ),
        createElement( this.props.components.Number3InputContainer, { type: 'text', value: this.state.number3, onChange: event => this.onChange( event, useValue, 3 ), onKeyDown: event => this.onKeyDown( event, 3 ),reference: input => this.Number3 = input } ),
        createElement( this.props.components.Bracket2Container ),
        // phone number
        createElement( this.props.components.Number4InputContainer, { type: 'text', value: this.state.number4, onChange: event => this.onChange( event, useValue, 4 ), onKeyDown: event => this.onKeyDown( event, 4 ), reference: input => this.Number4 = input } ),
        createElement( this.props.components.Number5InputContainer, { type: 'text', value: this.state.number5, onChange: event => this.onChange( event, useValue, 5 ), onKeyDown: event => this.onKeyDown( event, 5 ), reference: input => this.Number5 = input } ),
        createElement( this.props.components.Number6InputContainer, { type: 'text', value: this.state.number6, onChange: event => this.onChange( event, useValue, 6 ), onKeyDown: event => this.onKeyDown( event, 6 ),reference: input => this.Number6 = input } ),
        createElement( this.props.components.DashContainer ),
        createElement( this.props.components.Number7InputContainer, { type: 'text', value: this.state.number7, onChange: event => this.onChange( event, useValue, 7 ), onKeyDown: event => this.onKeyDown( event, 7 ),reference: input => this.Number7 = input } ),
        createElement( this.props.components.Number8InputContainer, { type: 'text', value: this.state.number8, onChange: event => this.onChange( event, useValue, 8 ), onKeyDown: event => this.onKeyDown( event, 8 ),reference: input => this.Number8 = input } ),
        createElement( this.props.components.DashContainer ),
        createElement( this.props.components.Number9InputContainer, { type: 'text', value: this.state.number9, onChange: event => this.onChange( event, useValue, 9 ), onKeyDown: event => this.onKeyDown( event, 9 ),reference: input => this.Number9 = input } ),
        createElement( this.props.components.Number10InputContainer, { type: 'text', value: this.state.number10, onChange: event => this.onChange( event, useValue, 10 ), onKeyDown: event => this.onKeyDown( event, 10 ),reference: input => this.Number10 = input } ),
        // + 7 ( n1 n2 n3 ) n4 n5 n6 - n7 n8 - n9 n10

      )
    )
  }


  async onChange( event, useValue, numberPosition ){

    let lastChar = ''
    if ( event.target.value.length > 1 ){
      lastChar = event.target.value[ event.target.value.length - 1 ]
    } else {
      lastChar = event.target.value
    }

    const number = lastChar
    await this.setStateWrapper( { [ `number${ numberPosition }` ]: number } )
    const fullNumber = `+7(${ this.state.number1 || '_' }${ this.state.number2 || '_' }${ this.state.number3 || '_' })${ this.state.number4 || '_' }${ this.state.number5 || '_' }${ this.state.number6 || '_' }-${ this.state.number7 || '_' }${ this.state.number8 || '_' }-${ this.state.number9 || '_' }${ this.state.number10 || '_' }`
    useValue( this.props.name, fullNumber )

    if ( number === '' && numberPosition !== 1 ){
      this[ `Number${ numberPosition - 1 }` ].focus()
    }

    if ( number && numberPosition !== 10 && /\d/.test( lastChar ) ){
      this[ `Number${ numberPosition + 1 }` ].focus()
    }
  }

  setStateWrapper( obj ){
    return new Promise( ( resolve, reject ) => {
      this.setState( obj, () => resolve( true ) )
    } )  
  }


  async onKeyDown( event, numberPosition ){
    if ( event.key === 'Backspace' || event.key === 'Delete' ) {
      event.preventDefault()
      if ( numberPosition !== 1 ){
        this[ `Number${ numberPosition - 1 }` ].focus()
      }
      await this.setStateWrapper( { [ `number${ numberPosition }` ]: '' } )
    }
  }

}
// https://support.twilio.com/hc/en-us/articles/223183008-Formatting-International-Phone-Numbers