const { getFileRecount } = require('./index');

const firstTree = [
  {
    path: '.github',
    type: 'tree',
    url: 'URL-SECOND-TREE',
  },
  {
    path: '.gitignore',
    type: 'blob',
  },
  {
    path: '.prettierrc',
    type: 'blob',
  },
  {
    path: 'LICENSE',
    type: 'blob',
  },
  {
    path: 'README.md',
    type: 'blob',
  },
  {
    path: 'gatsby-config.js',
    type: 'blob',
  },
  {
    path: 'gatsby-node.js',
    type: 'blob',
  },
  {
    path: 'package-lock.json',
    type: 'blob',
  },
  {
    path: 'package.json',
    type: 'blob',
  },
  {
    path: 'postcss.config.js',
    type: 'blob',
  },
  {
    path: 'src',
    type: 'tree',
    url: 'URL-THIRD-TREE',
  },
];

const secondTree = [
  {
    path: '.github-flow',
    type: 'tree',
    url: 'URL-FOURTH-TREE',
  },
  {
    path: 'github.md',
    type: 'blob',
  },
];
const thirdTree = [
  {
    path: 'component.tsx',
    type: 'blob',
  },
];

const fourthTree = [
  {
    path: 'superComponent.tsx',
    type: 'blob',
  },
  {
    path: 'anotherMd.md',
    type: 'blob',
  },
];
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
    expect(res).toBe({ md: 2 });
  });
});
