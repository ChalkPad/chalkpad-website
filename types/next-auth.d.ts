// import { Role } from "@prisma/client";
//
// declare module "next-auth" {
//     interface NextAuthOptions {
//         allowDangerousEmailAccountLinking?: boolean;
//     }
//     interface User {
//         role?: Role;
//     }
//
//     interface Session {
//         user: {
//             id: string;
//             role: string;
//         } & DefaultSession["user"];
//     }
// }
//
// declare module "next-auth/jwt" {
//     interface JWT {
//         role?: string;
//     }
// }
