const liffID = '2001461566-Ywj7B6mg',
	LiffAppId = liffID;

document.addEventListener('DOMContentLoaded', () => {
	init(liffID);
});

async function init() {
	await liff.init({ liffId: liffID });
	if (!liff.isLoggedIn()) {
		liff.login({ redirectUri: location.href });
	}
	UserLineID = (await liff.getProfile()).userId;
	const buttons = document.querySelectorAll('.button-85');
	buttons.forEach(function (button, index) {
		button.addEventListener('click', async function () {
			btnIndex = index;
			Quagga.init(
				{
					inputStream: {
						name: 'Live',
						type: 'LiveStream',
						target: document.querySelector('#barcodeScanner'),
					},
					decoder: {
						readers: ['code_128_reader'],
					},
				},
				function (err) {
					if (err) {
						console.error('Quagga 初始化失败', err);
						return;
					}
					console.log('Quagga 初始化成功，开始扫描');
					Quagga.start();
				}
			);

			Quagga.onDetected(function (data) {
				const scannedCode = data.codeResult.code;
				document.querySelectorAll('input[type=text]')[btnIndex].value = scannedCode;
				Quagga.stop();
				document.getElementById('barcodeScanner').innerHTML = '';
				document.getElementById('scanResult').innerHTML = '';
			});
		});
	});
}
