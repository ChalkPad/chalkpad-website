/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/auth/[...nextauth]/route.ts

import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const authOptions = {
    callbacks: {
        async jwt(token: any, account: any) {
            // When the user signs in, store the provider's access token in the JWT
            if (account && account.access_token) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session(session: any, token: any) {
            // Expose the access token on the session object so it can be used in the client
            session.accessToken = token.accessToken as string | undefined;
            return session;
        },
    },
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: "/auth/login/",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        }),
    ],
    adapter: PrismaAdapter(prisma),
};
