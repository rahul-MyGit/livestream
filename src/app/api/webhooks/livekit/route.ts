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
    const data = await req.text()
    const headerPayload = headers()
    const authentication = (await headerPayload).get('Authorization')

    console.log(data);
    console.log(authentication);

    return new Response(JSON.stringify({ data: data }))
}