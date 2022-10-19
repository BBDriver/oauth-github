import { Handlers } from "$fresh/server.ts";
import { oauth2Client } from "../utils/github.ts";
import { setCookie } from "$std/http/cookie.ts";

interface User {
    email: string;
    login: string;
    name: string;
    avatar_url: string;
    bio: string;
}

export const handler: Handlers =  {
    async GET(req, ctx) {
        try {
            const tokens = await oauth2Client.code.getToken(req.url);
            const userResponse = await fetch(`https://api.github.com/user`,{
                headers: {
                    "Authorization": `token ${tokens.accessToken}`
                }
            });
            const user:User = await userResponse.json();
            console.log(user.login);

            
            const resp = new Response(``, {
                status: 302,
                headers: {
                    Location: "/user"
                }
            });
            setCookie(resp.headers, {
                name: "token",
                value: user.login,
                secure: true,
                httpOnly: true,
                path: "/",
                maxAge: 30*24*60*60,
                sameSite: "Lax"
            })

            return resp;

        } catch (error) {
            return new Response(`${error}`, {
                status: 302,
                headers: {
                    Location: "/"
                },
            });
        }
  }
};
