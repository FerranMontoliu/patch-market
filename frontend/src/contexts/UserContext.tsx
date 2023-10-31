import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react'
import { type User } from '../types.ts'

type UserState = User | null

type UserAction =
    | { type: 'SET_USER'; payload: User }
    | { type: 'LOGOUT_USER' }

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
  case 'SET_USER':
    return action.payload
  case 'LOGOUT_USER':
    return null
  default:
    return state
  }
}

const UserContext = createContext<[UserState, Dispatch<UserAction>]>([ null, (): void => {}])

type UserContextProviderProps = {
  children: ReactNode;
}

export const UserContextProvider: React.FC<UserContextProviderProps> = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null)

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserValue = (): User | null => {
  const [user] = useContext(UserContext)
  return user
}

export const useUserDispatch = (): Dispatch<UserAction> => {
  const [, dispatch] = useContext(UserContext)
  return dispatch
}

export const useUser = (): [User | null, Dispatch<UserAction>] => {
  const [user, dispatch] = useContext(UserContext)
  return [user, dispatch]
}

export default UserContext
