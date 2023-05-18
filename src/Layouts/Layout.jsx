import React from 'react'
import { Outlet } from 'react-router-dom'
import ResponsiveAppBar from '../components/ResponsiveAppBar'
function Layout() {
  return (
    <>
        <ResponsiveAppBar></ResponsiveAppBar>
        <Outlet/>
        
    </>
  )
}

export default Layout