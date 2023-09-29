import {Suspense} from 'react';
import Boleto from "./app/boleto";

export default function App() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <Boleto/>
            </Suspense>
        </div>
    );
}
