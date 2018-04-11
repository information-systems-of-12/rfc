import * as React from 'react'
const createElement = React.default.createElement
const Component = React.default.Component
import { useValueContext, setResetActionContext } from './contexts.mjs'

export default class Select extends Component {
  
  constructor( props ){
    try {
      super( props )
      this.state = {}
      this.state.usingOptionId = props.usingOptionId !== undefined || props.usingOptionId !== false ? props.usingOptionId : false
      this.state.usingOptionsId = props.usingOptionsId == undefined && Array.isArray( props.usingOptionsId ) === true && props.usingOptionsId.length > 0 ? props.usingOptionsId : []

      this.useOption = this.useOption.bind( this )
      this.checkIfIsUsing = this.checkIfIsUsing.bind( this )

    } catch ( error ) {
      console.error( error )
    }
  }

  render(){
    return createElement( useValueContext.Consumer, {},
      useValue => this.props.options && Array.isArray( this.props.options ) === true && this.props.options.length > 0 ? createElement( this.props.components.Container, {},
        ...this.constructOptions( this.props.options, useValue )
      ) : null
    )
    
  }




  
  constructOptions( options, useValue ){

    const checkIfIsUsing = this.checkIfIsUsing

    return options && Array.isArray( options ) === true && options.length && options.length > 0 ? options.map( ( option, index ) => createElement( this.props.components.Option, {
      id: option.id,
      useOption: id => this.useOption( id, useValue ),
      value: option.value,
      isUsing: checkIfIsUsing( option.id )
    } ) ) : null
  }


  checkIfIsUsing( optionId ){
    if ( this.props.multi === false ){
      return this.state.usingOptionId !== undefined && this.state.usingOptionId !== false && optionId === this.state.usingOptionId ? true : false

    } else if ( this.props.multi === true ){
      const findResult = this.state.usingOptionsId.find( id => id === optionId )
      const r = this.state.usingOptionsId !== undefined && this.state.usingOptionsId.length > 0 && findResult !== undefined ? true : false
      // debugger
      return r
    }

  }


  getUsingOptionById( options, usingOptionId ){
    return options && Array.isArray( options ) === true && options.length > 0 ? options.find( o => o.id === usingOptionId ) : false
  }




  static getDerivedStateFromProps( nextProps, prevState ){

    if ( nextProps.multi === false ){
      if ( ( nextProps.usingOptionId === undefined || nextProps.usingOptionId === false ) && ( prevState.usingOptionId === undefined || prevState.usingOptionId === false ) ){
        return { usingOptionId: false }
  
      } else if ( nextProps.usingOptionId === false && ( prevState.usingOptionId !== false && prevState.usingOptionId !== undefined ) ){
        return { usingOptionId: false }  
  
      } else if ( nextProps.usingOptionId && prevState.usingOptionId === false ){
        return { usingOptionId: nextProps.usingOptionId }
  
      } else {
        return { usingOptionId: nextProps.usingOptionId }
      }
    } else {
      if ( ( nextProps.usingOptionsId === undefined || nextProps.usingOptionsId === false ) && ( prevState.usingOptionsId === undefined || prevState.usingOptionsId.length === 0 ) ){
        return { usingOptionsId: [] }
  
      } else if ( nextProps.usingOptionsId.length === 0 && ( prevState.usingOptionsId.length > 0 || prevState.usingOptionsId !== undefined ) ){
        return { usingOptionsId: [] }
  
      } else if ( nextProps.usingOptionsId.length > 0 && prevState.usingOptionsId.length === 0 ){
        return { usingOptionsId: nextProps.usingOptionsId }
  
      } else {
        return {}
      }
    }
    
  }




  async useOption( id, useValue ){

    if ( this.props.multi === false ){

      // --- 05-04-18 modification to unset current option
      if ( this.state.usingOptionId === id ){
        await this.setStateWrapper( { usingOptionId: false } )
        await useValue( this.props.name, false )
      // --- 05-04-18 modification to unset current option


      } else {
        await this.setStateWrapper( { usingOptionId: id } )
        await useValue( this.props.name, this.props.options.find( o => o.id === id ) )

      }
      

    } else if ( this.props.multi === true ){


      const optionId = this.state.usingOptionsId.find( i => i === id )
      
      let f = null

      if ( optionId !== undefined ){
        f = this.state.usingOptionsId.filter( i => i !== id )
      } else {
        f = [ ...this.state.usingOptionsId, id ]
      }

      await this.setStateWrapper( { usingOptionsId: f } )
      
      let usingOptions = []
      for ( const o of this.props.options ){
        for ( const fid of f ){
          if ( o.id === fid ){
            usingOptions.push( o )
          }
        }
      }

      await useValue( this.props.name, usingOptions )

    }
    
    
  }


  setStateWrapper( obj ){
    return new Promise( ( resolve, reject ) => {
      this.setState( obj, () => resolve( true ) )
    } )
    
  }



}