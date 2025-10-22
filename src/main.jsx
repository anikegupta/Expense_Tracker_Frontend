import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter,Route,Routes } from 'react-router'
import Layout from './pages/Layout.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import DashboardLayout from '../src/pages/user/DashboardLayout.jsx'
import AddExpense from './pages/user/AddExpense.jsx'
import ViewExpenses from './pages/user/ViewExpense.jsx'
import {ChatAssistant} from '../src/components/user/ChatAssistant.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import RecycleBin from './pages/user/RecycleBin.jsx'
import UserHome from './pages/user/UserHome.jsx'
import UserProfile from './pages/user/UserProfile.jsx'
createRoot(document.getElementById('root')).render(
   <BrowserRouter>
 <AuthProvider>
    <Routes>
      <Route path="" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="dashboard" element={<DashboardLayout />}>
        <Route path="" element={<UserHome />}/>
        <Route path="add-expense" element={<AddExpense/>}/>
        <Route path="expenses" element={<ViewExpenses />}/>
        <Route path="assistant" element={<h1><ChatAssistant /></h1>}/>
        <Route path="recycle-bin" element={<h1><RecycleBin /></h1>}/>
        <Route path="user-profile" element={<h1><UserProfile /></h1>}/>
        </Route>
      </Route>
    </Routes>
  </AuthProvider>
  </BrowserRouter>
)
