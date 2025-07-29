import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle"; // your drizzle instance
import { schema } from "@/db/schema";
import { nextCookies } from "better-auth/next-js";
import {Resend} from "resend";
import EmailVerification from "@/components/verification-email";
const resend = new Resend(process.env.RESEND_API_KEY);
export const auth = betterAuth({
    emailVerification: {
        sendVerificationEmail: async ( { user, url, token }, request) => {
            const { data, error } = await resend.emails.send({
                from: 'DocZap <adithyavinod1943@gmail.com>',
                to: [user.email],
                subject: 'DocZap: Verify your email address',
                react: EmailVerification({
                    userName: user.name,
                    verificationUrl: url,
                }),
              });
        },
        sendOnSignUp:true,
      },
    emailAndPassword:{
        enabled:true,
    },
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema,
    }),
    plugins: [nextCookies()]
});