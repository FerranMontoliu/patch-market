import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react'
import { type User } from '../types.ts'

type UserState = {
  user: User | null
  isLoading: boolean
}

type UserAction =
    | { type: 'SET_USER'; payload: User }
    | { type: 'LOGOUT_USER' }

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
  case 'SET_USER':
    return {
      user: action.payload,
      isLoading: false,
    }
  case 'LOGOUT_USER':
    return {
      user: null,
      isLoading: false,
    }
  default:
    return state
  }
}

const initialValue: UserState = {
  user: null,
  isLoading: true,
}
const UserContext = createContext<[UserState, Dispatch<UserAction>]>([initialValue, (): void => {}])

type UserContextProviderProps = {
  children: ReactNode;
}

export const UserContextProvider: React.FC<UserContextProviderProps> = (props) => {
  const [user, userDispatch] = useReducer(userReducer, initialValue)

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserValue = (): User | null => {
  const [userState] = useContext(UserContext)
  return userState.user
}

export const useIsLoadingValue = (): boolean => {
  const [userState] = useContext(UserContext)
  return userState.isLoading
}

export const useUserDispatch = (): Dispatch<UserAction> => {
  const [, dispatch] = useContext(UserContext)
  return dispatch
}

export const useUser = (): [User | null, Dispatch<UserAction>] => {
  const [userState, dispatch] = useContext(UserContext)
  return [userState.user, dispatch]
}

export default UserContext
