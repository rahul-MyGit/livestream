'use client'
import { toast } from "sonner";
import { useEffect, useState } from "react";
import {JwtPayload, jwtDecode} from 'jwt-decode'
import { createViewertoken } from "@/app/actions/tokenAction";


export const userViewerToken = (hostIdetity: string) => {
    const [token, setToken] = useState("")
    const [name, setName] = useState("")
    const [identity, setIdentity] = useState("")

    useEffect(() => {
        const createToken = async () => {
            try {
                const viewToken = await createViewertoken(hostIdetity)
                setToken(viewToken)

                const decodeToken = jwtDecode(viewToken) as JwtPayload & { name?: string}
                const name = decodeToken?.name
                const identity = decodeToken.jti   //change to iss to view stream
                console.log(decodeToken)
                

                if(identity) {
                    setIdentity(identity)
                }

                if(name){
                    setName(name)
                }
            } catch (error) {
                toast.error("Something went wrong")
            }
        }

        createToken()
    }, [hostIdetity]);

    return {
        token, name, identity
    };
};