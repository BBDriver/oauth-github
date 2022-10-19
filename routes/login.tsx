import { HandlerContext, Handlers } from "$fresh/server.ts";
import { oauth2Client } from '../utils/github.ts';


interface User {
  login: string;
  name: string;
  avatar_url: string;
}
export const handler: Handlers =  {
    GET(req, ctx){
      
      return Response.redirect(oauth2Client.code.getAuthorizationUri())
  }
};
