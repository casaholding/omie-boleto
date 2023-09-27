# Página Inicial do Portal:

- Aqui será separado os métodos GET e POST para cada página do portal.
- O usuário quando entra em [portal.ideias.casa](https://portal.ideias.casa) vai entrar nessa página inicial e aqui vamos decidir se vai mostrado a página inicial do Frondend, feita em **REACT**, ou se vai redirecionar para algum serviço!

# [Aplicações:](Apps.md)

```typescript
import { Apps } from './Apps';

```

---

### Método principal de execução

```typescript
export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext) {

        if (request.method === 'GET' && !request.url.includes('/api/')) {
            
            return nuggets(request, env, ctx);
       
        } else {
            
           return new Apps(request, env, ctx).fluxo();
        
        }

        return new Response('404 Not found', { status: 404 });
    }
}
```


---
### Código:
- Padrão feito pela **Cloudflare** para servir arquivos estáticos:

```typescript
import { getAssetFromKV } from '@cloudflare/kv-asset-handler';
// @ts-ignore
import manifestJSON from '__STATIC_CONTENT_MANIFEST';

const assetManifest = JSON.parse(manifestJSON);

async function nuggets(request: Request, env: Env, ctx: ExecutionContext) {
    try {
        return await getAssetFromKV(
            // @ts-ignore
            {
                request,
                waitUntil(promise) {
                    return ctx.waitUntil(promise);
                },
            },
            {
                // @ts-ignore
                ASSET_NAMESPACE: env.__STATIC_CONTENT,
                ASSET_MANIFEST: assetManifest,
            },
        );
    } catch (e) {
        // if (e instanceof NotFoundError) {
        // } else if (e instanceof MethodNotAllowedError) {
    }
}

```

