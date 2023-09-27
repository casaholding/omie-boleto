import { Suspense } from 'react';
import Casa from './app/casa';

export default function App() {
	return (
		<div>
			<Suspense fallback={<div>Loading...</div>}>
				<Casa />
			</Suspense>
		</div>
	);
}
