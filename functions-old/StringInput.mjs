import * as React from 'react'
const createElement = React.default.createElement
const Component = React.default.Component
import { useValueContext, setResetActionContext } from './contexts.mjs'


export default class StringInput extends Component {
  constructor( props ){
    try {
      super( props )
      this.state = {}
      this.useString = this.useString.bind( this )

    } catch ( error ) {
      console.error( error )
    }
  }

  render(){
    return createElement( useValueContext.Consumer, {},
      useValue => createElement( this.props.component, { type: 'text', value: this.state.value, useString: string => this.useString( string, useValue ) }, )
    )
  }


  
  // static getDerivedStateFromProps( nextProps, prevState ){
  //   debugger
  //   if ( ( nextProps.usingString === undefined || nextProps.usingOptionId === false ) && ( prevState.value === undefined || prevState.value === false ) ){
  //     debugger
  //     return { value: '' }
      
  //   } else if ( nextProps.usingString === false && ( prevState.value !== false && prevState.value !== undefined ) ){
  //     debugger
  //     return { value: '' }

  //   } else if ( nextProps.usingString !== undefined && nextProps.usingString !== false && ( prevState.value === false || prevState.value === undefined || prevState.value === '' ) ){
  //     debugger
  //     return { value: nextProps.usingString }
    
  //   }  else if ( nextProps.usingString !== undefined && nextProps.usingString !== false && prevState.value !== false && prevState.value !== undefined && prevState.value !== '' ){
  //     debugger
  //     return { value: nextProps.usingString }

  //   } else {
  //     debugger
  //     return {}
  //   }

  // }


  static getDerivedStateFromProps( nextProps, prevState ){
    if ( nextProps.usingString !== undefined && prevState.value !== undefined && JSON.stringify( nextProps.usingString ) === prevState.value ){
      return {}

    } else {
      return { value: typeof nextProps.usingString === 'string' ? nextProps.usingString : String( nextProps.usingString ) }
    }
  }


  shouldComponentUpdate( nextProps, nextState ){
    if ( nextState.value === this.state.value || JSON.stringify( nextState.value ) === this.state.value ){
      return false
    } else {
      return true
    }
  }


  async useString( string, useValue ){
    await this.setStateWrapper( { value: string } )
    await useValue( this.props.name, this.state.value )
  }

  setStateWrapper( obj ){
    return new Promise( ( resolve, reject ) => {
      this.setState( obj, () => resolve( true ) )
    } )
    
  }

}