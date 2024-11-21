'use client'

import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { githubSignInAction, userSignOutAction } from '@/app/actions/authActions'
import Link from 'next/link'

export default function Navbar({session}: any) {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href={'/'}>
            <span className="text-2xl font-bold text-gray-800">Streamify</span>
            </Link>
          </div>
          
          <div className="ml-6 flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  {session ? (
                    <Image
                      src={session?.user?.image || '/placeholder.png'}
                      alt="User avatar"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    'Sign Up'
                  )}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent align="end" className="w-56">
                {session ? (
                  <DropdownMenuItem 
                    onClick={(e) =>{ 
                        e.preventDefault();
                        userSignOutAction()
                    }}
                    className="cursor-pointer"
                  >
                    Sign out
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem 
                  onClick={(e) =>{ 
                    e.preventDefault();
                    githubSignInAction()
                }}
                    className="cursor-pointer"
                  >
                    Login with GitHub
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}