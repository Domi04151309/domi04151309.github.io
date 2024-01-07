const USERNAME = 'Domi04151309';
const INVALID_LAYOUT = 'Invalid Layout.';

const projectList = document.querySelector('.projects');
const projectTemplate = document.getElementById('project');;

/**
 * @returns {Promise<Array<any>|null>}
 */
async function getRepositories() {
  /** @type {Array<any>|null} */
  let data = null;
  try {
    const request = await fetch(
      'https://api.github.com/users/' + USERNAME + '/repos'
    );
    data = await request.json();
  } catch {
    console.warn('Failed getting project data.');
  }
  return data;
}

/**
 * @param {Array<any>} repositories
 * @throws {Error}
 * @returns {void}
 */
function showRepositories(repositories) {
  if (
    !(projectTemplate instanceof HTMLTemplateElement) ||
    !(projectList instanceof Node)
  ) throw new Error(INVALID_LAYOUT);
  const filtered = repositories.filter(
    repository => repository.description !== null &&
    repository.archived === false &&
    repository.fork === false &&
    repository.is_template === false
  );
  filtered.sort(
    (first, second) => second.stargazers_count - first.stargazers_count
  );
  projectList.textContent = '';
  for (const repository of filtered) {
    const projectView = projectTemplate.content.cloneNode(true);
    if (
      !(projectView instanceof DocumentFragment)
    ) throw new Error(INVALID_LAYOUT);

    const title = projectView.querySelector('.project-title');
    const description = projectView.querySelector('.project-description');
    const language = projectView.querySelector('.project-language');
    const stars = projectView.querySelector('.project-stars');
    if (
      !(title instanceof Node) ||
      !(description instanceof Node) ||
      !(language instanceof Node) ||
      !(stars instanceof Node)
    ) throw new Error(INVALID_LAYOUT);
    title.textContent = repository.name;
    description.textContent = repository.description;
    language.textContent = repository.language;
    stars.textContent = repository.stargazers_count;
    projectList.append(projectView);
  }
}

const repositories = await getRepositories();
if (repositories !== null) showRepositories(repositories);

export {};
