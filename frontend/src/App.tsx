import { BrowserRouter, Route, Routes } from 'react-router-dom'

import SignIn from 'pages/SignIn'
import SignUp from 'pages/SignUp'
import Home from 'pages/Home'
import Account from 'pages/Account'

import { PrivateRoute, NotAuthenticatedRoute } from 'utils/routes'
import { UserProvider } from 'contexts/userContext'
import { Navbar } from './components/Navbar'
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import CreateCentral from 'pages/CreateCentral'
import Centrals from 'pages/Centrals'
import Info from 'pages/Info'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NotAuthenticatedRoute />} >
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/info' element={<Info />} />
        </Route>
        <Route element={<PrivateRoute />} >
          <Route
              element={
                <UserProvider>
                  <Navbar />
                  <Outlet />
                </UserProvider>
              }
            >
            <Route path='*' element={<Navigate to='/' />} />
            <Route path='/' element={<Home />} />
            <Route path='/account' element={<Account />} />
            <Route path='/new-central' element={<CreateCentral />} />
            <Route path='/my-centrals' element={<Centrals />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
