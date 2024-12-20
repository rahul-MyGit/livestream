'use server'

import { signIn, signOut } from "@/lib/auth"

export async function githubSignInAction(){
    await signIn("github", {redirectTo: "/"});
}

export async function userSignOutAction(){
    await signOut({redirectTo: "/"});
}