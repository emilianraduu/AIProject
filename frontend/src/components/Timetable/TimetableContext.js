import React from 'react'
const initialState = {

}

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const TimetableContext = React.createContext()

function TimetableContextProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <TimetableContext.Provider value={{ state, dispatch }}>
      {props.children}
    </TimetableContext.Provider>
  )
}

const TimetableContextConsumer = TimetableContext.Consumer

export { TimetableContext, TimetableContextProvider, TimetableContextConsumer }
