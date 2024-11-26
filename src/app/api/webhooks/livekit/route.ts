import prisma from "@/db";
import { auth } from "@/lib/auth";
import { WebhookReceiver } from "livekit-server-sdk";
import { NextApiRequest, NextApiResponse } from "next";
import { headers } from "next/headers";

const receiver = new WebhookReceiver(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!
)

export async function POST(req: Request, res: Response) {
    const body = await req.text()
    const headerPayload = headers()
    const authorization = (await headerPayload).get('Authorization')

    if(!authorization) {
        return new Response("No authorization header", {status:400});
    }

    const event = receiver.receive(body, authorization)

    if((await event).event === "ingress_started"){
        await prisma.stream.update({
            where: {
                ingressId: (await event).ingressInfo?.ingressId
            },
            data: {
                isLive: false
            }
        })
    }

    if((await event).event === "ingress_ended"){
        await prisma.stream.update({
            where: {
                ingressId: (await event).ingressInfo?.ingressId
            },
            data: {
                isLive: false
            }
        })
    }
}