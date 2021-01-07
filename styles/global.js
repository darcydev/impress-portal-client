import { createGlobalStyle, css } from 'styled-components';

export default createGlobalStyle`
${() => css`
	html {
		height: 100%;

		body {
			margin: 0;
			padding: 0;
			box-sizing: border-box;

			#root {
				background: #efefef;
				color: #000;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				font-family: sans-serif;
				height: 100%;
				padding: 15px;
			}

			ul {
				padding: 0;
				margin: 0;
				list-style: none;
			}
		}
	}
`}
`;
