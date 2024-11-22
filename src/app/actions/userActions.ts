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

    const session = await auth();

    if(!session || !session.user){
        throw new Error("Unathorized")
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email || ""}
    });

    if(!user){
        throw new Error("User not Loggedin");
    }

    if(user.name !== name){
        throw new Error("unauthorized");
    }

    return user;
}