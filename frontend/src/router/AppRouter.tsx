import { ReactElement } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import SignUpScreen from '../screens/SignUpScreen'
import LoginScreen from '../screens/LoginScreen.tsx'
import MyPatchesScreen from '../screens/MyPatchesScreen.tsx'
import PatchDetailsScreen from '../screens/PatchDetailsScreen.tsx'
import MarketScreen from '../screens/MarketScreen.tsx'
import NotFoundScreen from '../screens/NotFoundScreen.tsx'
import MyTradesScreen from '../screens/MyTradesScreen.tsx'
import TradeDetailsScreen from '../screens/TradeDetailsScreen.tsx'
import AddPatchScreen from '../screens/AddPatchScreen.tsx'
import UserProfileScreen from '../screens/UserProfileScreen.tsx'
import { useUserValue } from '../contexts/UserContext.tsx'
import { User } from '../types.ts'

const AppRouter = (): ReactElement => {
  const user : User | null= useUserValue()

  const isLoggedIn: boolean = user !== null

  return (
    <Routes>
      <Route path="/log-in" element={isLoggedIn ? <Navigate to="/" /> : <LoginScreen/>} />
      <Route path="/sign-up" element={isLoggedIn ? <Navigate to="/" /> : <SignUpScreen/>} />
      <Route path="/my-patches" element={isLoggedIn ? <MyPatchesScreen/> : <Navigate to="/log-in" />} />
      <Route path="/patch-details/:patchId" element={isLoggedIn ? <PatchDetailsScreen/> : <Navigate to="/log-in" />} />
      <Route path="/my-trades" element={isLoggedIn ? <MyTradesScreen/> : <Navigate to="/log-in" />} />
      <Route path="/trade-details/:tradeId" element={isLoggedIn ? <TradeDetailsScreen/> : <Navigate to="/log-in" />} />
      <Route path="/add-patch" element={isLoggedIn ? <AddPatchScreen/> : <Navigate to="/log-in" />} />
      <Route path="/user-profile" element={isLoggedIn ? <UserProfileScreen/> : <Navigate to="/log-in" />} />
      <Route path="/" element={isLoggedIn ? <MarketScreen/> : <Navigate to="/log-in" />} />
      <Route path="*" element={<NotFoundScreen/>}/>
    </Routes>
  )
}

export default AppRouter
