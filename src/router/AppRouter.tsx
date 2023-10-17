import { ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'

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

const AppRouter = (): ReactElement => (
  <Routes>
    <Route path="/log-in" element={<LoginScreen />} />
    <Route path="/log-out" element={<LoginScreen />} />
    <Route path="/sign-up" element={<SignUpScreen />} />
    <Route path="/my-patches" element={<MyPatchesScreen />} />
    <Route path="/patch-details/:patchId" element={<PatchDetailsScreen />} />
    <Route path="/my-trades" element={<MyTradesScreen />} />
    <Route path="/trade-details/:tradeId" element={<TradeDetailsScreen />} />
    <Route path="/add-patch" element={<AddPatchScreen />} />
    <Route path="/user-profile" element={<UserProfileScreen />} />
    <Route path="/" element={<MarketScreen />} />
    <Route path="*" element={<NotFoundScreen />} />
  </Routes>
)

export default AppRouter


//<Route path="/my-patches">{isLoggedIn ? (<MyPatchesComponent />) : (<Redirect to="/Log-in" />)}/>