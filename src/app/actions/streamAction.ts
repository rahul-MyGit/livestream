"use server"

import prisma from "@/db";
import { revalidatePath } from "next/cache";
import { Stream } from "@prisma/client";
import { auth } from "@/lib/auth";

export const getStreamByUserId = async (userId: string) => {
    try {

        const stream = await prisma.stream.findUnique({
            where: { userId }
        });

        return {
            success: true,
            data: stream
        }
    } catch (error: any) {
        return {
            success: true,
            error: error.message
        }
    }
}

export const updateStream = async (value: Partial<Stream>) => {
    try {
        const session = await auth()
        const userId = session?.user.id;

        if(!userId){
            throw new Error("User not found")
        }
        const user = await getStreamByUserId(userId)

        if(!user || !user.data) {
            throw new Error("User not found")
        }

        const validData = {
            name: value.name,
            isChatEnabled: value.isChatEnabled,
            isChatDelayed: value.isChatDelayed  
        }

        const stream = await prisma.stream.update({
            where: {
                id: user?.data.id
            },
            data: {
                ...validData
            }
        })

        revalidatePath(`/u/${user.data.name}/chat`)
        revalidatePath(`/u/${user.data.name}`)
        revalidatePath(`/${user.data.name} `)

        return {
            success: true,
            data: stream
        }

    } catch (error: any) {
        return {
            success: false,
            error: error.message
        }
    }
}