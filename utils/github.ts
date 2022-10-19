import { OAuth2Client } from "oauth2_client";
import "dotenv/load.ts";


const client_id = Deno.env.get("ghi");
const client_secret = Deno.env.get("ghs");

export const oauth2Client = new OAuth2Client({
    clientId: `${client_id}`,
    clientSecret: client_secret,
    authorizationEndpointUri: "https://github.com/login/oauth/authorize",
    tokenUri: "https://github.com/login/oauth/access_token",
    resourceEndpointHost: "https://api.github.com",
    redirectUri: "http://localhost:8000/callback",
    defaults: {
        scope: "read:user",
    },
});
