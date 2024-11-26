'use server'

import { AccessToken } from 'livekit-server-sdk'
import {v4 as uuidv4} from 'uuid'
import { getUserById } from './userActions'
import { auth } from '@/lib/auth'


export const createViewertoken = async (hostIdentity: string) => {
    let user;

    try {
        const session = await auth()
        user = session?.user
    } catch (error) {
        const id = uuidv4();
        const username = `guest#${Math.floor(Math.random() * 1000)}`
        user = {id , username}
    }

    const host = await getUserById(hostIdentity);

    if(!host) {
        throw new Error("User not found")
    }

    const isHost = user?.id === host.id
    const token = new AccessToken(
        process.env.LIVEKIT_API_KEY,
        process.env.LIVEKIT_API_SECRET,
        {
            identity:isHost ? `host-${user?.id}` : user?.id,
            name: user?.name
        }
    );

    token.addGrant({
        room: host.id,
        roomJoin: true,
        canPublish: false,
        canPublishData: true,
    });

    return await Promise.resolve(token.toJwt());
}
