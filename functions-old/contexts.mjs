import * as React from 'react'
const createContext = React.default.createContext

export const useValueContext = createContext()
export const setResetActionContext = createContext()