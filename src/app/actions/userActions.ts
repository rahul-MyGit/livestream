'use server'

import prisma from "@/db";
import { auth } from "@/lib/auth";

export const getSelf = async () => {
    
    const session = await auth();

    if(!session || !session.user ){
        throw new Error("Unauthorized");
    }

    const user = await prisma.user.findUnique({
        where: { id: session.user.id}
    });

    if(!user) {
        throw new Error("Not found");
    }

    return user;
}

export const getSelfByUsername = async (name: string) => {

    console.log(name)
    

    if(!name) {
        throw new Error("Usernames is requied" + name)
    }

    const user = await prisma.user.findUnique({
        where: { name} , include: {stream: true}
    });

    return user;
}


export const getUserById = async (id: string) => {

    const user = await prisma.user.findUnique({
        where: {id} , include: {stream: true}
    });

    if(!user){
        throw new Error("User not Loggedin");
    }

    return user;
}