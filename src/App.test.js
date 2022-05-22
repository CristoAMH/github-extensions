import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { BranchProvider } from './context/branch-context';
import { TreeProvider } from './context/tree-context';
import * as branchContext from './context/branch-context';
import * as utils from './utils';

const customRender = (component) => {
  return render(
    <BranchProvider>
      <TreeProvider>{component}</TreeProvider>,
    </BranchProvider>
  );
};

describe('App tests', () => {
  test('Should render', () => {
    customRender(<App />);
    expect(
      screen.getByRole('button', { name: 'GET TREE RECOUNT' })
    ).toBeDisabled();
  });
  test('should change repo url', () => {
    customRender(<App />);
    fireEvent.change(screen.getByLabelText('Github Repository URL'), {
      target: { value: 'The url has changed' },
    });
    expect(screen.getByDisplayValue('The url has changed')).toBeVisible();
  });

  test('shoud enable "Get Tree Button" if there is', () => {
    branchContext.useBranch = jest.fn(() => ({
      state: {
        currentBranch: {
          name: 'main',
        },
      },
    }));
    utils.getBranchesFromUrl = jest.fn();

    customRender(<App />);

    fireEvent.change(screen.getByLabelText('Github Repository URL'), {
      target: { value: 'https://github.com/userName/repoName' },
    });
    expect(
      screen.getByRole('button', { name: 'GET TREE RECOUNT' })
    ).not.toBeDisabled();
  });
});
