# Aplicações:

```typescript
export class Apps {

    private readonly request: Request;
    private readonly env: Env;
    private readonly ctx: ExecutionContext;
    
    constructor(request: Request, env: Env, ctx: ExecutionContext) {
        this.request = request;
        this.env = env;
        this.ctx = ctx;
    }

    async fluxo() {
        return new Response('Hello Teste!', {status: 200});
    }

}
```


