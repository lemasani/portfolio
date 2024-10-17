

const fetchRepositories = async (username: string) => {
  const response = await fetch(`https://api.github.com/users/${username}/repos`);
  const repositories = await response.json();
  console.log(repositories);
  return repositories;
}


export default fetchRepositories;