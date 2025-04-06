const INTERVAL = 4000;
const KEYWORDS_EN = [
  'a Linux user!',
  'a mobile developer!',
  'a software engineer!',
  'a web designer!',
  'a web developer!'
];

const KEYWORD_BELOW = 'hero-keyword-below';
const KEYWORD_ABOVE = 'hero-keyword-above';

const keywordFields = [...document.querySelectorAll('.hero-keyword > *')];
const monthField = document.querySelector('.calendar > :nth-child(1)');
const daysField = document.querySelector('.calendar > :nth-child(2)');

const keywords = KEYWORDS_EN.toSorted(() => 0.5 - Math.random());
let counter = 1;

/**
 * @returns {void}
 */
function swapKeyword() {
  keywordFields[(counter - 1) % 3].classList.toggle(KEYWORD_BELOW, false);
  keywordFields[(counter - 1) % 3].classList.toggle(KEYWORD_ABOVE, true);

  keywordFields[counter % 3].textContent = keywords[counter % keywords.length];
  keywordFields[counter % 3].classList.toggle(KEYWORD_BELOW, false);
  keywordFields[counter % 3].classList.toggle(KEYWORD_ABOVE, false);

  keywordFields[(counter + 1) % 3].classList.toggle(KEYWORD_BELOW, true);
  keywordFields[(counter + 1) % 3].classList.toggle(KEYWORD_ABOVE, false);
  counter++;
}

/**
 * @throws
 * @returns {void}
 */
function setupCalendar() {
  if (monthField === null || daysField === null) throw new Error('Layout.');

  const today = new Date();
  const offset = new Date(
    today.getFullYear(),
    today.getMonth(),
    0
  ).getDay();
  const daysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();

  while (daysField.children.length > daysInMonth) daysField.lastChild?.remove();
  for (let index = 0; index < 2; index++) daysField.append(
    document.createElement('div')
  );
  // eslint-disable-next-line no-undefined
  monthField.textContent = today.toLocaleString(undefined, { month: 'long' });
  daysField.children[today.getDate() - 1].classList.add('today');
  daysField.children[today.getDate()].classList.add('tomorrow');
  daysField.children[today.getDate() + 1].classList.add('day-after-tomorrow');
  for (let index = 0; index < offset; index++) daysField.prepend(
    document.createElement('div')
  );
}

setInterval(() => {
  swapKeyword();
}, INTERVAL);
setupCalendar();
