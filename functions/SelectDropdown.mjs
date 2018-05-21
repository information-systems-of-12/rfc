import * as React from 'react'
const createElement = React.default.createElement
const Component = React.default.Component
import { useValueContext } from './contexts.mjs'

export default class SelectDropdown extends Component {
  constructor( props ){
    try {
      super( props )
      this.state = {}
      // this.state.usingOptionId = props.usingOptionId !== undefined || props.usingOptionId !== false ? props.usingOptionId : 0
      // this.state.usingOptionId = props.usingOptionId === undefined ? 0 : props.usingOptionId
      this.state.usingOptionId = !props.usingOptionId ? 0 : props.usingOptionId
      // this.state.usingOptionId = 0
      this.state.optionsPanelIsVisible = false
      this.useOption = this.useOption.bind( this )
      this.onClickUseNextOption = this.onClickUseNextOption.bind( this )
      this.onClickUsePreviousOption = this.onClickUsePreviousOption.bind( this )
      this.toggleOptionsPanel = this.toggleOptionsPanel.bind( this )

      // // debugger
      // if ( props.onInitialize ){
      //   // debugger
      //   props.onInitialize( props.options, this.state.usingOptionId )
      // }

    } catch ( error ) {
      console.error( error )
    }
  }


  render(){

    // debugger
    const usingOption = this.props.options.find( ( o, i ) => i === this.state.usingOptionId )
    return createElement( useValueContext.Consumer, {},
      useValue => createElement( this.props.components.Container, {},

        createElement( this.props.components.StateContainer, {},
          createElement( this.props.components.OptionContainer, {
            value: usingOption ? usingOption.value : this.props.options.find( ( o, i ) => i === 0 ).value,
            toggleOptionsPanel: this.toggleOptionsPanel,
            optionsPanelIsVisible: this.state.optionsPanelIsVisible
          } ),
          
          createElement( this.props.components.UseOptionPanelContainer, {},
            createElement( this.props.components.UsePreviousOptionContainer, { usePreviousOption: event => this.onClickUsePreviousOption( event, useValue ) }, ),
            createElement( this.props.components.UseNextOptionContainer, { useNextOption: event => this.onClickUseNextOption( event, useValue ) }, ),
          ),
        ),
          
          

        this.state.optionsPanelIsVisible === true ? createElement( this.props.components.PanelContainer, {},
          ...this.constructOptions( this.props.options, useValue )
        ) : null
        
      )
    )
  }

  async toggleOptionsPanel(){
    await this.setStateWrapper( { optionsPanelIsVisible: !this.state.optionsPanelIsVisible } )
  }
  
  async onClickUseNextOption( event, useValue ){

    const latestOptionId = this.props.options.length - 1
    if ( this.state.usingOptionId === latestOptionId ){
      return this.useOption( 0, useValue )
    } else {
      return this.useOption( this.state.usingOptionId + 1, useValue )
    }
    
  }

  async onClickUsePreviousOption( event, useValue ){
    const latestOptionId = this.props.options.length - 1
    if ( this.state.usingOptionId === 0 ){
      return this.useOption( latestOptionId, useValue )
    } else {
      return this.useOption( this.state.usingOptionId - 1, useValue )
    }
  }

   
  
  // * 18-05-18
  
  // static getDerivedStateFromProps( nextProps, prevState ){
  //   // return { usingOptionId: nextProps.usingOptionId }
  //   if ( nextProps.onPropsChange ) {
  //     // nextProps.onPropsChange( nextProps, prevState )
  //     nextProps.onPropsChange( nextProps.options[ prevState.usingOptionId ] )
  //   }
  //   return nextProps
  // }





  // static getDerivedStateFromProps( nextProps, prevState ){
  //   if ( nextProps.multi === false ){
  //     if ( ( nextProps.usingOptionId === undefined || nextProps.usingOptionId === false ) && ( prevState.usingOptionId === undefined || prevState.usingOptionId === false ) ){
  //       return { usingOptionId: false }
  
  //     } else if ( nextProps.usingOptionId === false && ( prevState.usingOptionId !== false && prevState.usingOptionId !== undefined ) ){
  //       return { usingOptionId: false }  
  
  //     } else if ( nextProps.usingOptionId && prevState.usingOptionId === false ){
  //       return { usingOptionId: nextProps.usingOptionId }
  
  //     } else {
  //       return { usingOptionId: nextProps.usingOptionId }
  //     }
  //   } else {
  //     if ( ( nextProps.usingOptionsId === undefined || nextProps.usingOptionsId === false ) && ( prevState.usingOptionsId === undefined || prevState.usingOptionsId.length === 0 ) ){
  //       return { usingOptionsId: [] }
  
  //     } else if ( nextProps.usingOptionsId.length === 0 && ( prevState.usingOptionsId.length > 0 || prevState.usingOptionsId !== undefined ) ){
  //       return { usingOptionsId: [] }
  
  //     } else if ( nextProps.usingOptionsId.length > 0 && prevState.usingOptionsId.length === 0 ){
  //       return { usingOptionsId: nextProps.usingOptionsId }
  
  //     } else {
  //       return {}
  //     }
  //   }
    
  // }


  constructOptions( options, useValue ){
    return options && Array.isArray( options ) === true && options.length && options.length > 0 ? options.map( ( option, index ) => createElement( this.props.components.PanelOptionContainer, {
      id: option.id,
      useOption: id => this.useOption( id, useValue ),
      value: option.value,
      isUsing: this.state.usingOptionId !== undefined && this.state.usingOptionId !== false && option.id === this.state.usingOptionId ? true : false
    } ) ) : null
  }


  async useOption( id, useValue ){
    await this.setStateWrapper( { usingOptionId: id, internal: true } )
    await useValue( this.props.name, this.props.options.find( o => o.id === id ) )
  }

  setStateWrapper( obj ){
    return new Promise( ( resolve, reject ) => {
      this.setState( obj, () => resolve( true ) )
    } )
    
  }

  getUsingOptionById( options, usingOptionId ){
    return options && Array.isArray( options ) === true && options.length > 0 ? options.find( o => o.id === usingOptionId ) : false
  }

}