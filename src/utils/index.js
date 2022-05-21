export const getRepoTree = async ({ user, repo, sha }) => {
  // Los archivos tienen un tipo blob si es un directorio es tipo tree
  // Lost tipo tree tienen un url para acceder a su tree y así consecutivamente

  // tendremos el try catch aquí y estaría bien tener un manejador de errores
  try {
    const getTree = await fetch(
      `https://api.github.com/repos/${user}/${repo}/git/trees/${sha}`
    );
    const getTreeJson = await getTree.json();

    return getTreeJson.tree;
  } catch (e) {
    console.log(e);
  }
};

export const getFileRecount = async ({ url, tree }) => {
  if (!url && !tree) return;
  let recount = {};

  const iterateTree = async ({ url, tree }) => {
    let gitTree = tree;
    if (url) {
      const response = await fetch(url);
      const responseJson = await response.json();
      gitTree = responseJson.tree;
    }

    // Me tocará explicar porque el for each no vale para experar con el await
    for (const el of gitTree) {
      const extension = el.path.split('.').pop();

      // Sumamos el valor a nuestro objeto recount
      if (el.type === 'blob') {
        recount[extension] = recount[extension] ? recount[extension] + 1 : 1;
      }
      if (el.type === 'tree') {
        await iterateTree({ url: el.url });
      }
    }
  };

  await iterateTree({ url, tree });
  return recount;
};

export const getBranchesFromRepo = async (
  owner = 'argoproj',
  repo = 'argo-site'
) => {
  const url = `https://api.github.com/repos/${owner}/${repo}/branches `;
  try {
    const branches = await fetch(url);
    const branchesFormatted = await branches.json();

    return branchesFormatted;
  } catch (e) {
    console.log(e);
  }
};

export const isValidGitUrl = (url) => {
  var validGithubUrlRegex =
    /(?:git@|https:\/\/)github.com[:/](?<gitUser>.+?(?=\/))\/(?<gitRepo>.+?(?=\/|$))/;
  return url.match(validGithubUrlRegex);
};
