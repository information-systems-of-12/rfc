import isString from './_isString.mjs'

export default email => {

  if ( email === undefined || email === false || isString( email ) === false ){
    throw new Error( 'email is not a string' )
  }
  const indexOfAtSymbol = email.indexOf( '@' )
  const indexOfDotSymbol = email.indexOf( '.' )
  const emailAddressBody = email.substring( 0, indexOfAtSymbol )
  const emailAddressDomainName = email.substring( indexOfAtSymbol + 1, indexOfDotSymbol )
  const emailAddressDomain = email.substring( indexOfDotSymbol + 1, email.length + 1 )

  return {
    emailAddressBody,
    emailAddressDomainName,
    emailAddressDomain
  }
}

