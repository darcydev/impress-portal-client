import { render, screen } from '@testing-library/react';
import * as reactQuery from 'react-query';

import Home from '../pages/index';

describe('Home', () => {
	it('renders without crashing', () => {
		render(<Home />);

		expect(
			screen.getByRole('heading', { name: 'Welcome to Next.js!' })
		).toBeInTheDocument();
	});
});
