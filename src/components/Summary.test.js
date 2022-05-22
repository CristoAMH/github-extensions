import { render, screen } from '@testing-library/react';
import Summary from './Summary';

jest.mock('../context/tree-context.js', () => ({
  useTree: () => ({
    state: {
      recount: {
        js: 2,
        tsx: 1,
        md: 12,
      },
    },
  }),
}));

test('loads and displays greeting', async () => {
  render(<Summary />);
  expect(screen.getByText(/js/)).toHaveTextContent('js2');
  expect(screen.getByText(/tsx/)).toHaveTextContent('tsx1');
  expect(screen.getByText(/md/)).toHaveTextContent('md12');
});
