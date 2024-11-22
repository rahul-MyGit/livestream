import React from 'react'
import Wrapper from './Wrapper'
import Toogle from './Toogle'
import AdminDashboard from './AdminDashboard'

const Sidebar = () => {
    return (
        <Wrapper>
            <Toogle />
            <div className='space-y-4 pt-4 lg:pt-0'>
                <AdminDashboard data={"Exit"}/>
            </div>
        </Wrapper>
    )
}

export default Sidebar