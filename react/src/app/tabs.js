import { Fragment } from 'react';
import Bemvindo from './content/bemvindo';
import Documentos from './content/documentos';

export default function Tabs() {
	return (
		<Fragment>
			<div className='tab-content' id='nav-tabContent'>
				<div className='tab-pane fade ' id='nav-home' role='tabpanel'
						 aria-labelledby='nav-tab-home' tabIndex='0'>


					<Bemvindo />


				</div>
				<div className='tab-pane fade show active' id='nav-doc' role='tabpanel' aria-labelledby='nav-tab-doc'
						 tabIndex='0'>


					<Documentos />


				</div>
			</div>
		</Fragment>
	);

}
