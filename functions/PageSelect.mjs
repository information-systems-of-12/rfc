import * as React from 'react'
const createElement = React.default.createElement
const Component = React.default.Component
import { useValueContext, setResetActionContext } from './contexts.mjs'
import { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } from 'constants';

export default class PageSelect extends Component {
  constructor( props ){
    try {
      super( props )
      this.state = {}
      this.state.currentPageNumber = props.currentPageNumber ? props.currentPageNumber : getCurrentPageNumber( props.optionsSkip, props.optionsLimit )
      this.state.pagesCount = Math.ceil( props.optionsTotalCount / props.optionsLimit )
      // debugger
      // optionsSkip,
      // optionsLimit,
      // optionsTotalCount,
      // currentPageId

      this.state.usingOptionId = props.usingOptionId !== undefined || props.usingOptionId !== false
      // ? props.usingOptionId
      // : false

      // this.state.usingOptionsId = props.usingOptionsId == undefined && Array.isArray( props.usingOptionsId ) === true && props.usingOptionsId.length > 0
      // ? props.usingOptionsId
      // : []

      this.usePage = this.usePage.bind( this )
      // this.checkIfIsUsing = this.checkIfIsUsing.bind( this )

    } catch ( error ) {
      console.error( error )
    }
  }

  render(){
    return createElement( useValueContext.Consumer, {},
      // useValue => this.props.options && Array.isArray( this.props.options ) === true && this.props.options.length > 0 ? createElement( this.props.components.Container, {},
      //   ...this.constructOptions( this.props.options, useValue )
      // ) : null
      useValue => this.props.options && Array.isArray( this.props.options ) === true && this.props.options.length > 0 ? 
      createElement( this.props.components.Container, {},
        createElement( this.props.components.PageContainer, { options: this.props.options } ),

        createElement( this.props.components.ControlsContainer, {},

          this.state.currentPageNumber > 1 ? createElement( this.props.components.ToFirstPageControlContainer, { ...this.state, usePage: async () => await this.usePage( 1 ) } ) : null,

          this.state.currentPageNumber > 1 ? createElement( this.props.components.ToPreviousPageControlContainer, { ...this.state, usePage: async () => await this.usePage( this.state.currentPageNumber - 1 ) } ) : null,

          this.state.currentPageNumber > 2 ? createElement( this.props.components.ToCurrentMinus2PageControlContainer, { ...this.state, usePage: async () => await this.usePage( this.state.currentPageNumber - 2 ) } ) : null,
          this.state.currentPageNumber > 1 ? createElement( this.props.components.ToCurrentMinus1PageControlContainer, { ...this.state, usePage: async () => await this.usePage( this.state.currentPageNumber - 1 ) } ) : null,

          createElement( this.props.components.CurrentPageControlContainer, { ...this.state, usePage: async () => await this.usePage( this.state.currentPageNumber ) } ),

          this.state.currentPageNumber < this.state.pagesCount - 1 ? createElement( this.props.components.ToCurrentPlus1PageControlContainer, { ...this.state, usePage: async () => await this.usePage( this.state.currentPageNumber + 1 ) } ) : null,
          this.state.currentPageNumber < this.state.pagesCount - 2 ? createElement( this.props.components.ToCurrentPlus2PageControlContainer, { ...this.state, usePage: async () => await this.usePage( this.state.currentPageNumber + 2 ) } ) : null,

    
          this.state.currentPageNumber < this.state.pagesCount ? createElement( this.props.components.ToNextPageControlContainer, { ...this.state, usePage: async () => await this.usePage( this.state.currentPageNumber + 1 ) } ) : null,

          this.state.currentPageNumber !== this.state.pagesCount ? createElement( this.props.components.ToLastPageControlContainer, { ...this.state, usePage: async () => await this.usePage( this.state.pagesCount ) } ) : null,
          
        )


      ) : null
    )
  }


  async usePage( page ){
    // debugger
    this.props.onUsePage ? this.props.onUsePage( page ) : null
    await this.setStateWrapper( { currentPageNumber: page } )
  }

  setStateWrapper( obj ){
    return new Promise( ( resolve, reject ) => {
      this.setState( obj, () => resolve( true ) )
    } )
  }

}



const getCurrentPageNumber = ( optionsSkip, optionsLimit, optionsCount ) => {

  const pageNumber = optionsSkip / optionsLimit
  return pageNumber + 1
}