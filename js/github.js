import { updateRevealContainers } from './postprocess.js';

const USERNAME = 'Domi04151309';
const INVALID_LAYOUT = 'Invalid Layout.';

const projectList = document.querySelector('.projects');
const projectTemplate = document.getElementById('project');

/**
 * @typedef {object} ProjectView
 * @property {Element} badgeContainer
 * @property {Node} description
 * @property {Node} language
 * @property {DocumentFragment} projectView
 * @property {Node} stars
 * @property {Node} title
 */

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
    if (!request.ok) throw new Error('Not ok.');
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
    if (!request.ok) throw new Error('Not ok.');
  } catch {
    console.warn('Failed getting project data.');
  }
  return data;
}

/**
 * @throws {Error}
 * @returns {ProjectView}
 */
function getProjectView() {
  if (
    !(projectTemplate instanceof HTMLTemplateElement)
  ) throw new Error(INVALID_LAYOUT);
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
    !(title instanceof Element) ||
    !(badgeContainer instanceof Element) ||
    !(description instanceof Element) ||
    !(language instanceof Element) ||
    !(stars instanceof Element)
  ) throw new Error(INVALID_LAYOUT);
  return {
    badgeContainer,
    description,
    language,
    projectView,
    stars,
    title
  }
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
    !(projectList instanceof Node)
  ) throw new Error(INVALID_LAYOUT);
  const filtered = repositories.filter(
    repository => repository.description !== null &&
    repository.archived === false &&
    repository.fork === false &&
    repository.is_template === false &&
    repository.name in badges
  );
  filtered.sort(
    (first, second) => second.stargazers_count - first.stargazers_count
  );
  projectList.textContent = '';
  for (const repository of filtered) {
    const {
      badgeContainer,
      description,
      language,
      projectView,
      stars,
      title
    } = getProjectView();
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
    !(projectList instanceof Node)
  ) throw new Error(INVALID_LAYOUT);
  projectList.textContent = '';
  const {
    badgeContainer,
    description,
    language,
    projectView,
    stars,
    title
  } = getProjectView();
  title.textContent = 'Failed Loading Projects';
  description.textContent = 'Take a look at my projects on GitHub instead.';
  badgeContainer.remove();
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
updateRevealContainers();

export {};
