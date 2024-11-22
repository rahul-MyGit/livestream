import { getSelfByUsername } from '@/app/actions/userActions'
import { redirect } from 'next/navigation';
import React from 'react'
import Sidebar from './_component/Sidebar';
import Container from './_component/Container';

interface CreaterLayoutProps {
    params: Promise<{name: string}>,
    children: React.ReactNode
}

const CreaterLayout = async ( {
    params,
    children
} : CreaterLayoutProps) => {

    const {name} = await params;

    const user = await getSelfByUsername(name);
    if(!user) {
        redirect('/')
    }
  return (
    <>
    <div className='flex h-[calc(100vh-64px)]'>
        <Sidebar />
        <Container>
        {children}
        </Container>
    </div>
    </>
  )
}

export default CreaterLayout