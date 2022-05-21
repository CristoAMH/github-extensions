import { useState, useEffect } from 'react';
import { isValidGitUrl } from '../utils';

const useGetUserAndRepoFromUrl = (gitRepoUrl) => {
  const [repoName, setRepoName] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (gitRepoUrl) {
      const match = isValidGitUrl(gitRepoUrl);
      if (match) {
        setUserName(match.groups.gitUser);
        setRepoName(match.groups.gitRepo);
      }
    }
  }, [gitRepoUrl]);

  return [userName, repoName];
};

export default useGetUserAndRepoFromUrl;
