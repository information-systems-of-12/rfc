import * as React from 'react'
const createElement = React.default.createElement
const Component = React.default.Component
import { useValueContext, setResetActionContext } from './contexts.mjs'

export default class PageSelect extends Component {
  constructor( props ){
    try {
      super( props )
      this.state = {}

      this.usePage = this.usePage.bind( this )

    } catch ( error ) {
      console.error( error )
    }
  }

  render(){
    return createElement( useValueContext.Consumer, {},

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

  static getDerivedStateFromProps( nextProps, prevState ){
    const newState = {}

    if ( nextProps.optionsSkip !== undefined ){
      newState.optionsSkip = nextProps.optionsSkip
    }

    if ( nextProps.optionsLimit !== undefined ){
      newState.optionsLimit = nextProps.optionsLimit
    }

    if ( nextProps.currentPageNumber === undefined && nextProps.optionsSkip !== undefined && nextProps.optionsLimit !== undefined ){
      newState.currentPageNumber = getCurrentPageNumber( nextProps.optionsSkip, nextProps.optionsLimit )
    
    } else if ( nextProps.currentPageNumber !== undefined ){
      newState.currentPageNumber = nextProps.currentPageNumber
    }

    if ( nextProps.optionsTotalCount !== undefined && nextProps.optionsLimit !== undefined ){
      newState.pagesCount = Math.ceil( nextProps.optionsTotalCount / nextProps.optionsLimit )
    }

    if ( nextProps.usingOptionId !== undefined ){
      newState.usingOptionId = nextProps.usingOptionId
    }

    return newState

  }

  async usePage( page ){
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