import * as React from 'react'
const createElement = React.default.createElement
const Component = React.default.Component
import { useValueContext } from './contexts.mjs'

export default class SelectDropdown extends Component {
  constructor( props ){
    try {
      super( props )
      this.state = {}
      this.state.usingOptionId = props.usingOptionId !== undefined || props.usingOptionId !== false ? props.usingOptionId : false
      this.state.optionsPanelIsVisible = false
      this.useOption = this.useOption.bind( this )
      this.onClickUseNextOptionButton = this.onClickUseNextOptionButton.bind( this )
      this.onClickUsePreviousOptionButton = this.onClickUsePreviousOptionButton.bind( this )
      this.toggleOptionsPanel = this.toggleOptionsPanel.bind( this )

    } catch ( error ) {
      console.error( error )
    }
  }
  render(){
    return createElement( useValueContext.Consumer, {},
      useValue => createElement( this.props.components.Container, {},

          createElement( this.props.components.OptionContainer, {
            value: this.props.options.find( ( o, i ) => i === this.state.usingOptionId ).value,
            toggleOptionsPanel: this.toggleOptionsPanel,
            optionsPanelIsVisible: this.state.optionsPanelIsVisible
          } ),
          
          createElement( this.props.components.UseOptionButtonPanelContainer, {},
            createElement( this.props.components.UsePreviousOptionButtonContainer, { usePreviousOption: event => this.onClickUsePreviousOptionButton( event, useValue ) }, ),
            createElement( this.props.components.UseNextOptionButtonContainer, { useNextOption: event => this.onClickUseNextOptionButton( event, useValue ) }, ),
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
  
  async onClickUseNextOptionButton( event, useValue ){

    const latestOptionId = this.props.options.length - 1
    if ( this.state.usingOptionId === latestOptionId ){
      return this.useOption( 0, useValue )
    } else {
      return this.useOption( this.state.usingOptionId + 1, useValue )
    }
    
  }

  async onClickUsePreviousOptionButton( event, useValue ){
    const latestOptionId = this.props.options.length - 1
    if ( this.state.usingOptionId === 0 ){
      return this.useOption( latestOptionId, useValue )
    } else {
      return this.useOption( this.state.usingOptionId - 1, useValue )
    }
  }

    
  static getDerivedStateFromProps( nextProps, prevState ){
    return { usingOptionId: nextProps.usingOptionId }
  }
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