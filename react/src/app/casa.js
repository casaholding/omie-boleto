import { Fragment } from 'react';
import Menu from './menu';
import Tabs from './tabs';

export default function Casa() {
	return (
		<Fragment>
			<main>
				<div className='mx-5 py-4'>
					<div
						className='p-4 row align-items-center rounded-3 border shadow-lg'>

						<Menu />

						<div className='p-4 row align-items-center rounded-3 border shadow-sm'>

							<Tabs />

						</div>
					</div>
				</div>
			</main>
		</Fragment>
	);

}
