const general = {
	transition: '0.3s',
};

export default {
	light: {
		colors: {
			txt: '#000',
			bg: '#fff',
		},
		...general,
	},
	dark: {
		colors: {
			txt: '#fff',
			bg: '#000',
		},
		...general,
	},
};