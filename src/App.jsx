import { useState } from 'react'
import './App.css'
import Login from './page/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FamilyTree from './page/FamilyTree'
import Sidebar from './components/Sidebar'
import WealthAssets from './page/WealthAssets'
import Register from './components/Register'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route element={<ProtectedRoute/>}>
      <Route element = {<Sidebar/>}>
        <Route path='/family-tree' element={<FamilyTree/>}/>
        <Route path='/wealth-assets' element={<WealthAssets/>}/>
      </Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
