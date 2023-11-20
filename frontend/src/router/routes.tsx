import { ReactElement } from 'react'
import LoginScreen from '../screens/LoginScreen.tsx'
import SignUpScreen from '../screens/SignUpScreen.tsx'
import MyPatchesScreen from '../screens/MyPatchesScreen.tsx'
import PatchDetailsScreen from '../screens/PatchDetailsScreen.tsx'
import MyTradesScreen from '../screens/MyTradesScreen.tsx'
import TradeDetailsScreen from '../screens/TradeDetailsScreen.tsx'
import AddPatchScreen from '../screens/AddPatchScreen.tsx'
import UserProfileScreen from '../screens/UserProfileScreen.tsx'
import FAQScreen from '../screens/FAQScreen.tsx'
import MarketScreen from '../screens/MarketScreen.tsx'
import LogoutScreen from '../screens/LogoutScreen.tsx'

export type AppRoute = {
    path: string
    element: ReactElement
}

export const privateRoutes: Array<AppRoute> = [
  {
    path: '/my-patches',
    element: <MyPatchesScreen />,
  },
  {
    path: '/patch-details/:patchId',
    element: <PatchDetailsScreen />,
  },
  {
    path: '/my-trades',
    element: <MyTradesScreen />,
  },
  {
    path: '/trade-details/:tradeId',
    element: <TradeDetailsScreen />,
  },
  {
    path: '/add-patch',
    element: <AddPatchScreen />,
  },
  {
    path: '/user-profile',
    element: <UserProfileScreen />,
  },
  {
    path: '/faq',
    element: <FAQScreen />,
  },
  {
    path: '/log-out',
    element: <LogoutScreen />,
  },
  {
    path: '/',
    element: <MarketScreen />,
  },
]

export const publicRoutes: Array<AppRoute> = [
  {
    path: '/log-in',
    element: <LoginScreen />,
  },
  {
    path: '/sign-up',
    element: <SignUpScreen />,
  },
]
