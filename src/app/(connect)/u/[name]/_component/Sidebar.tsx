import React from 'react'
import Wrapper from './Wrapper'
import Toogle from './Toogle'
import AdminDashboard from './AdminDashboard'
import { SessionProvider } from 'next-auth/react'

const Sidebar = () => {
    return (
        <Wrapper>
            <Toogle />
            <SessionProvider>
            <div className='space-y-4 pt-4 lg:pt-0'>
                <AdminDashboard data={"Exit"}/>
            </div>
            </SessionProvider>
        </Wrapper>
    )
}

export default Sidebar