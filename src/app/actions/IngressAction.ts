'use server'

import {type CreateIngressOptions, IngressAudioEncodingPreset, IngressInput, IngressVideoEncodingPreset, RoomServiceClient, TrackSource, IngressClient, IngressVideoOptions, IngressAudioOptions} from 'livekit-server-sdk'


import prisma from '@/db'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache';

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
);

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!)


export const resetIngress = async (hostIdentity: string) => {
    const ingresses = await ingressClient.listIngress({
        roomName: hostIdentity
    });

    const rooms = await roomService.listRooms([hostIdentity]);

    for(const room of rooms){
        await roomService.deleteRoom(room.name)
    }

    for(const ingress of ingresses){
        if(ingress.ingressId){
            await ingressClient.deleteIngress(ingress.ingressId)
        }
    }
}


export const createIngress = async (ingressType:IngressInput) => {
    
    const session = await auth();
    if(!session || !session.user){
        throw new Error("invalid User")
    }

    const user = session.user

    await resetIngress(user.id)


    const options :CreateIngressOptions = {
        name: user.name,
        roomName: user.id,
        participantName: user.name,
        participantIdentity: user.id
    }

    if(ingressType === IngressInput.WHIP_INPUT){
        options.enableTranscoding = true
    } else {
        options.video = new IngressVideoOptions({
            source: TrackSource.CAMERA,
            encodingOptions: {
                case: 'preset',
                value: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS
            },
        });
        options.audio = new IngressAudioOptions({
            name: "audio",
            source: TrackSource.SCREEN_SHARE_AUDIO,
            encodingOptions: {
                case: 'preset',
                value: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS
            },
        });
    }

    const ingress = await ingressClient.createIngress(ingressType, options)

    if(!ingress || !ingress.url || !ingress.streamKey){
        throw new Error("Failed to create ingress")
    }

    await prisma.stream.update({
        where: {
            userId: user.id
        },
        data: {
            ingressId: ingress.ingressId,
            serverUrl: ingress.url,
            streamKey: ingress.streamKey
        }
    });

    revalidatePath(`/u/${user.name}/keys`)
    return {
        success: true,
        data: {
            ingressId: ingress.ingressId,
            name: user.name,
            streamKey: ingress.streamKey,
            url: ingress.url,
            inputType: ingress.inputType
        }
    }
}