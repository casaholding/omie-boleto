import {Fragment} from 'react';
import Documentos from "./content/documentos";

export default function Boleto() {
    return (
        <Fragment>
            <main>
                <div className='mx-5 py-4'>

                    <div className='p-4 row align-items-center rounded-3 border shadow-lg'>

                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="https://ideias.cloudflareaccess.com/">Apps</a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Boletos</li>
                            </ol>
                        </nav>

                        <div>
                            <Documentos/>
                        </div>

                    </div>
                </div>
            </main>
        </Fragment>
    );

}
