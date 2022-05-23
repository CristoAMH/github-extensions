import { fireEvent, render, screen } from '@testing-library/react';
import Summary from './Summary';
import * as treeContext from '../context/tree-context';

const customRender = (component) => {
  return render(
    <treeContext.TreeProvider>{component}</treeContext.TreeProvider>
  );
};
describe('Summary tests', () => {
  beforeEach(() => {
    treeContext.useTree = jest.fn(() => ({
      state: {
        recount: {
          js: 2,
          tsx: 1,
          md: 12,
        },
        recountSortedBy: '',
      },
    }));
  });
  test('Render and loads the file extensions', () => {
    customRender(<Summary />);
    expect(screen.getByText(/js/)).toHaveTextContent('js2');
    expect(screen.getByText(/tsx/)).toHaveTextContent('tsx1');
    expect(screen.getByText(/md/)).toHaveTextContent('md12');
  });
  test('Filter extension correctly by name', () => {
    render(<Summary />);
    fireEvent.change(screen.getByLabelText('Filter by name - Results: 3'), {
      target: { value: 'j' },
    });
    expect(screen.getByText(/js/)).toHaveTextContent('js2');
    expect(screen.queryByText(/tsx/)).toBeNull();
    expect(screen.queryByText(/md/)).toBeNull();
  });
});
