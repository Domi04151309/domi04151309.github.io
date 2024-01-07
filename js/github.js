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
 * @returns {Promise<{[key: string]: Array<string>|undefined}|null>}
 */
async function getBadges() {
  /** @type {{[key: string]: Array<string>|undefined}|null} */
  let data = null;
  try {
    const request = await fetch(
      '/js/repositories.json'
    );
    data = await request.json();
  } catch {
    console.warn('Failed getting project data.');
  }
  return data;
}

/**
 * @param {string} name
 * @returns {Node}
 */
function createBadge(name) {
  const badge = document.createElement('div');
  badge.classList.add('badge');
  badge.classList.add(name.toLowerCase());
  badge.title = name;
  return badge;
}

/**
 * @param {Array<any>} repositories
 * @param {{[key: string]: Array<string>|undefined}} badges
 * @throws {Error}
 * @returns {void}
 */
function showRepositories(repositories, badges) {
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
    const badgeContainer = projectView.querySelector('.badge-container');
    const description = projectView.querySelector('.project-description');
    const language = projectView.querySelector('.project-language');
    const stars = projectView.querySelector('.project-stars');
    if (
      !(title instanceof Node) ||
      !(badgeContainer instanceof Node) ||
      !(description instanceof Node) ||
      !(language instanceof Node) ||
      !(stars instanceof Node)
    ) throw new Error(INVALID_LAYOUT);
    title.textContent = repository.name;
    description.textContent = repository.description;
    language.textContent = repository.language;
    stars.textContent = repository.stargazers_count;
    const badgeViews = badges[/** @type {string} */ (repository.name)]?.map(
      tech => createBadge(tech)
    ).filter(Boolean) ?? [];
    badgeContainer.append(...badgeViews);
    projectList.append(projectView);
  }
}

/**
 * @throws {Error}
 * @returns {void}
 */
function showError() {
  if (
    !(projectTemplate instanceof HTMLTemplateElement) ||
    !(projectList instanceof Node)
  ) throw new Error(INVALID_LAYOUT);
  projectList.textContent = '';
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
  title.textContent = 'Failed Loading Projects';
  description.textContent = 'Take a look at my projects on GitHub instead.';
  /** @type {Element} */ (language.parentNode).remove();
  /** @type {Element} */ (stars.parentNode).remove();
  projectList.append(projectView);
}

const [repositories, badges] = await Promise.all([
  // eslint-disable-next-line unicorn/prefer-top-level-await
  getRepositories(),
  // eslint-disable-next-line unicorn/prefer-top-level-await
  getBadges()
]);
if (repositories !== null && badges !== null) showRepositories(
  repositories,
  badges
);
else showError();

export {};
