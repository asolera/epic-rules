import { defaultRules } from './defaultRules.js';
const btnRuleSelector = document.getElementById('btnRuleSelector');
const btnRuleEditor = document.getElementById('btnRuleEditor');
const rulesResult = document.getElementById('rulesResult');
const rulesInput = document.getElementById('rulesInput');
const btnRuleSave = document.getElementById('btnRuleSave');
const btnRuleDefault = document.getElementById('btnRuleDefault');
const numberLoops = 40;
const loopDelay = 10;
const loopDelayIncrement = 5;

const getRules = () => JSON.parse(localStorage.getItem('rules'));

const setRules = (rules = null) => {
  if (rules === null) rules = defaultRules;
  localStorage.setItem('rules', JSON.stringify(rules));
  rulesInput.value = convertRulesToInput(getRules());
}

const convertRulesToInput = (rules) => rules.join("\n");

setRules(getRules());

const getRandomIndex = (min, max) => Math.round(Math.random() * max + min);

const selectRandomRule = () => {
  const rules = JSON.parse(localStorage.getItem('rules'));
  const totalRules = rules.length;
  const randomIndex = getRandomIndex(0, totalRules - 1);
  return rules[randomIndex];
};

const renderRule = (rule) => {
  rulesResult.innerHTML = rule;
}

const highlightChosenRule = () => {
  rulesResult.classList.add('highlighted-rule');
};

const removeRuleHighlight = () => {
  rulesResult.classList.remove('highlighted-rule');
};

const loopRules = (counter, delay) => {
  delay += loopDelayIncrement;
  setTimeout(() => {
    const randomRule = selectRandomRule();
    renderRule(randomRule);
    counter++;
    if (counter < numberLoops) {
      loopRules(counter, delay);
    } else {
      highlightChosenRule();
    }
  }, delay);
}

btnRuleSelector.addEventListener('click', () => {
  removeRuleHighlight();
  loopRules(1, loopDelay);
});

btnRuleEditor.addEventListener('click', () => {
  editorModal.style.display = "block";
});

var editorModal = document.getElementById("editorModal");

var span = document.getElementsByClassName("close")[0];

const closeRuleEditor = () => {
  editorModal.style.display = "none";
};

span.onclick = function() {
  closeRuleEditor();
}

window.onclick = function(event) {
  if (event.target == editorModal) {
    closeRuleEditor()
  }
}

const getInputRules = () => document.getElementById('rulesInput').value.split("\n");

btnRuleSave.addEventListener('click', () => {
  const inputRules = getInputRules();
  setRules(inputRules);
  closeRuleEditor();
});

btnRuleDefault.addEventListener('click', () => {
  setRules(defaultRules);
  closeRuleEditor();
});