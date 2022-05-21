import { getFileRecount, isValidGitUrl } from './index';
import { firstTree, secondTree, thirdTree, fourthTree } from './test-utils';

global.fetch = jest.fn();

describe('getFinalRecount', () => {
  beforeEach(() => {
    fetch.mockClear();
  });
  test('returns the correct recount', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ tree: secondTree }),
      })
    );
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ tree: thirdTree }),
      })
    );
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ tree: fourthTree }),
      })
    );
    const res = await getFileRecount({ tree: firstTree });
    expect(res).toMatchObject({
      LICENSE: 1,
      gitignore: 1,
      js: 3,
      json: 2,
      md: 3,
      prettierrc: 1,
      tsx: 2,
    });
  });
});

describe('isValidGitUrl', () => {
  it('should match the refex and return the user and the repo name', async () => {
    const user = 'argoproj';
    const repo = 'argo-site';
    const url = `https://github.com/${user}/${repo}`;

    const match = isValidGitUrl(url);
    expect(match[0]).toBe(url);
    expect(match.groups.gitUser).toBe(user);
    expect(match.groups.gitRepo).toBe(repo);
  });
});
