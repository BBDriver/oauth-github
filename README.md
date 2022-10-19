# github oauthトークンとか

タグ: HaraPeko部
作成日時: 2022年10月20日 午前 4:43

流れはこんな感じ

1. `/login`へリクエスト
2. トークン系の処理(github側)
3. `/callback` にリダイレクト
4. 返ってきたトークンからAPIへリクエストし、返ってきたデータをDBと照合
5. Cookieの付与

## env

```bash
CLIENT_ID=***********************
SECRET=************************************
```

## import_map.json

```json
{
  "imports": {
    "$fresh/": "https://deno.land/x/fresh@1.1.2/",
    "preact": "https://esm.sh/preact@10.11.0",
    "preact/": "https://esm.sh/preact@10.11.0/",
    "preact-render-to-string": "https://esm.sh/*preact-render-to-string@5.2.4",
    "@preact/signals": "https://esm.sh/*@preact/signals@1.0.3",
    "@preact/signals-core": "https://esm.sh/*@preact/signals-core@1.0.1",
    "oauth2_client": "https://deno.land/x/oauth2_client/mod.ts",
    "$std/": "https://deno.land/std@0.160.0/",
    "dotenv/": "https://deno.land/x/dotenv@v3.2.0/",
    "djwt/": "https://deno.land/x/djwt@v2.7/",
    "deno_csrf/": "https://deno.land/x/deno_csrf@0.0.5/"
  }
}
```

## github.ts

```tsx
import { OAuth2Client } from "oauth2_client";
import "dotenv/load.ts";

const client_id = Deno.env.get("CLIENT_ID");
const client_secret = Deno.env.get("SECRET");

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
```