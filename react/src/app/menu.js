import { Fragment } from 'react';

export default function Menu() {
	return (
		<Fragment>
			<nav>
				<div className='nav nav-pills flex-column flex-sm-row' id='nav-tab' role='tablist'>
					<button className='flex-sm-fill text-sm-center nav-link ' id='nav-tab-home' data-bs-toggle='tab'
									data-bs-target='#nav-home' type='button' role='tab' aria-controls='nav-home'
									aria-selected='true'>

						Bem vindo

					</button>
					<button className='flex-sm-fill text-sm-center nav-link active' id='nav-tab-doc' data-bs-toggle='tab'
									data-bs-target='#nav-doc' type='button' role='tab' aria-controls='nav-doc'
									aria-selected='false'>

						Documentos

					</button>
				</div>
			</nav>
		</Fragment>
	);

}
