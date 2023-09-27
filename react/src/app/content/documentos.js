import { Fragment, useState } from 'react';
import moment from 'moment-timezone';
import 'moment/locale/pt-br';
// import { PDFDocument } from 'pdf-lib';

export default function Documentos() {

	const [boletos, setResposta] = useState([]);
	const [datade, setDataDE] = useState(moment().format('YYYY-MM-DD'));
	const [dataate, setDataATE] = useState(moment().format('YYYY-MM-DD'));
	const [license, setLicense] = useState('');
	// const [pdfuri, setPDFURI] = useState('');
	const [loading, setLoading] = useState({
		status: false,
		message: 'Carregar!',
	});

	function carregar() {
		if (datade && dataate && license) {
			setLoading({
				status: true,
				message: 'Carregando...',
			});
			setResposta([]);
			fetch(
				'/listaboletos',
				{
					headers: {
						'Content-Type': 'application/json',
					},
					method: 'POST',
					body: JSON.stringify({ license, datade, dataate }),
				}).then(async response => {

				setResposta(await response.json());

			}).catch(async error => {

				setResposta([]);

			}).finally(() => {
				setLoading({
					status: false,
					message: 'Carregar!',
				});
			});
		}
	}

	function handleDataDE(e) {
		setDataDE(e.target.value);
		setDataATE(e.target.value);
	}

	function handleDataATE(e) {
		setDataATE(e.target.value);
	}

	function handleLicense(e) {
		setLicense(e.target.value);
	}

	// async function mergeAllPDFs() {
	//
	// 	try {
	// 		setLoading({
	// 			status: true,
	// 			message: 'Carregando...',
	// 		});
	// 		setPDFURI('');
	//
	// 		const pdfDoc = await PDFDocument.create();
	// 		const numDocs = boletos.length;
	//
	// 		for (const conta of boletos) {
	// 			if (conta.cCodigoBarras) {
	// 				const donorPdfBytes = (await fetch(
	// 					'/urlboleto/' + conta.nCodTitulo, {
	// 						redirect: 'manual',
	// 						mode: 'no-cors',
	// 					})).url;
	// 				console.log(donorPdfBytes);
	//
	// 				// const donorPdfBytes = await (await fetch(url, { mode: 'no-cors' })).arrayBuffer();
	// 				// .then(res => res.arrayBuffer());
	//
	// 				const donorPdfDoc = await PDFDocument.load(donorPdfBytes);
	// 				const docLength = donorPdfDoc.getPageCount();
	// 				for (var k = 0; k < docLength; k++) {
	// 					const [donorPage] = await pdfDoc.copyPages(donorPdfDoc, [k]);
	// 					console.log('Doc ' + conta.nCodTitulo + ', page ' + k);
	// 					pdfDoc.addPage(donorPage);
	// 				}
	// 			}
	// 		}
	//
	// 		const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
	// 		console.log(pdfDataUri);
	//
	// 		// strip off the first part to the first comma "data:image/png;base64,iVBORw0K..."
	// 		setPDFURI('data:application/pdf;base64,' + pdfDataUri.substring(pdfDataUri.indexOf(',') + 1));
	// 	} finally {
	// 		setLoading({
	// 			status: false,
	// 			message: 'Carregar!',
	// 		});
	// 	}
	// }

	return (
		<Fragment>
			<label>
				License:
				<input type='text' value={license} onChange={handleLicense} />
			</label>
			<div className='mx-auto p-1' />
			<label>
				Data Emissao Inicial:
				<input type='date' value={datade} onChange={handleDataDE} />
			</label>
			<label>
				Data Emissao Final:
				<input type='date' value={dataate} onChange={handleDataATE} />
			</label>
			<label>
				<button disabled={loading.status} onClick={() => carregar()}>{loading.message}</button>
			</label>
			{/*<div className='mx-auto p-1' />*/}
			{/*<label>*/}
			{/*	<button disabled={boletos.length === 0}*/}
			{/*			onClick={() => mergeAllPDFs()}>{(boletos.length !== 0 || !loading) ? 'Lote PDF' : loading.message}</button>*/}
			{/*</label>*/}
			{/*{pdfuri ? <a href={pdfuri} target='_blank'>Download</a> : ''}*/}
			<div className='mx-auto p-5' />


			<table className='table'>
				<thead>
				<tr>
					<th scope='col'> CNPJ/CPF</th>
					<th scope='col'> Numero Pedido</th>
					<th scope='col'> Numero da Parcela</th>
					<th scope='col'> Valor</th>
					{/*<th scope='col'> Codigo de barras</th>*/}
				</tr>
				</thead>
				<tbody>

				{
					(!boletos) ? '' :
						<Fragment>
							{
								boletos.map((item, index) => {
									return (
										<tr key={index}>
											<td>{item.cCPFCNPJCliente}</td>
											<td>{item.cNumTitulo}</td>
											<td>
												{item.cCodigoBarras ?
													<a href={'urlboleto/' + item.nCodTitulo} target='_blank'
													   rel='noreferrer'>{item.cNumParcela}</a>
													: 'N/A'}
											</td>
											<td>{item.nValorTitulo}</td>
											<td>{item.cCodigoBarras}</td>
										</tr>
									);
								})
							}
						</Fragment>
				}

				</tbody>
			</table>

		</Fragment>
	);

}
