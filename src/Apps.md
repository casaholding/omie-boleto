# Aplicação de Boletos Omie

- Imports: Dependencias do projeto.
- moment é para formatar datas, porque usa o calendário html5 no frontend.
- _async fluxo()_ é o método principal, que é chamado pelo servidor.
- usar cache para PDF - https://developers.cloudflare.com/workers/examples/cache-api/
- documentar melhor esse arquivo

```typescript
import {includes, JSON_HEADER, NOT_FOUND, readRequestBody} from './Utils';
import moment from 'moment-timezone';
import 'moment/locale/pt-br';

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
        try {
            this.data = await readRequestBody(this.request);

            if (includes(this.request.url, '/listaboletos')) {
                let resposta = await this.listaDeBoleto();

                return new Response(
                    JSON.stringify(resposta),
                    {
                        headers: JSON_HEADER,
                        status: 200,
                    },
                );
            } else if (includes(this.request.url, '/urlboleto')) {
                return await this.urlBoleto(this.request.url.split('/').pop());
            } else {
                return NOT_FOUND;
            }

        } catch (e) {
            console.error('Omie App', e, e.stack);
        }
        return new Response('Erro', {status: 500});
    }

    async urlBoleto(codigo: string) {
        return Response.redirect(
            (await (await fetch(
                'https://app.omie.com.br/api/v1/financas/pesquisartitulos/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        'call': 'ObterURLBoleto',
                        'app_key': this.env.OMIE_APP_KEY,
                        'app_secret': this.env.OMIE_APP_SECRET,
                        'param': [
                            {
                                'nCodTitulo': `${codigo}`,
                            },
                        ],
                    }),
                },
            )).json())['cLinkBoleto']
            , 301);

        // if (!titulo.cCodigoBarras || titulo.cCodigoBarras.trim().length < 10) {
        // 	titulo.cCodigoBarras = titulo.nCodCliente;
        // try {
        // 	titulo.cCodigoBarras = (await (await fetch(
        // 		'https://app.omie.com.br/api/v1/financas/contareceberboleto/',
        // 		{
        // 			method: 'POST',
        // 			headers: {
        // 				'Content-Type': 'application/json',
        // 				'Accept': 'application/json',
        // 			},
        // 			body: JSON.stringify({
        // 				'call': 'ObterBoleto',
        // 				'app_key': this.env.OMIE_APP_KEY,
        // 				'app_secret': this.env.OMIE_APP_SECRET,
        // 				'param': [
        // 					{
        // 						'nCodTitulo': titulo.nCodTitulo * 1,
        // 					},
        // 				],
        // 			}),
        // 		},
        // 	)).text());
        // } catch (e) {
        // }
        // titulo.cCodigoBarras = titulo.cCodigoBarras + '';
        // }

    }

    async listaDeBoleto() {
        let resposta = [];

        try {
            let retornoOmie = await fetch(
                'https://app.omie.com.br/api/v1/financas/pesquisartitulos/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        'call': 'PesquisarLancamentos',
                        'app_key': this.env.OMIE_APP_KEY,
                        'app_secret': this.env.OMIE_APP_SECRET,
                        'param': [
                            {
                                'dDtIncDe': moment(this.data['datade'], 'YYYY-MM-DD').format('DD/MM/YYYY'),
                                'dDtIncAte': moment(this.data['dataate'], 'YYYY-MM-DD').format('DD/MM/YYYY'),
                                'cNatureza': 'R',
                                'cTipo': 'BOL',
                                //'cStatus': 'AVENCER',
                                'nRegPorPagina': 200,
                            },
                        ],
                    }),
                },
            );
            resposta = (await retornoOmie.json());

            if (!resposta['titulosEncontrados']) {
                return [];
            }

            let boletos = [];
            for (let i = 0; i < resposta['titulosEncontrados'].length; i++) {
                boletos.push(await this.dtoBoleto(resposta['titulosEncontrados'][i]['cabecTitulo']));
            }
            resposta = boletos;

            resposta = resposta.sort(this.sorter);


        } catch (e) {
            console.error('Erro ao listar contas a receber', e, e.stack);
        }
        return resposta;
    }

    stringToSort(entity: any): string {
        return entity.cNumTitulo + '-' + entity.cNumParcela;
    }

    sorter(a: any, b: any): number {
        return this.stringToSort(a).localeCompare(this.stringToSort(b));
    }

    dtoBoleto(titulo: any) {
        return {
            'cCPFCNPJCliente': titulo.cCPFCNPJCliente,
            'nCodTitulo': titulo.nCodTitulo,
            'cNumTitulo': titulo.cNumTitulo ? titulo.cNumTitulo :
                titulo.cNumOS ? titulo.cNumOS :
                    titulo.cNumDocFiscal ? titulo.cNumDocFiscal :
                        titulo.nCodTitulo
            ,
            'cNumParcela': titulo.cNumParcela,
            'nValorTitulo': titulo.nValorTitulo,
            'cCodigoBarras': titulo.cCodigoBarras,
        };
    }
}
```
