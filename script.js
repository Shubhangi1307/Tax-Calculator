const form = document.getElementById('tax-form');
const resultModal = document.getElementById('result-modal');
const closeModal = document.getElementsByClassName('close')[0];
const taxAmountSpan = document.getElementById('tax-amount');
const errorIcons = document.querySelectorAll('.error-icon');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const grossIncome = parseFloat(document.getElementById('gross-income').value) || 0;
  const extraIncome = parseFloat(document.getElementById('extra-income').value) || 0;
  const deductions = parseFloat(document.getElementById('deductions').value) || 0;
  const ageGroup = document.getElementById('age-group').value;

  if (!ageGroup) {
    showErrorIcon(document.querySelector('#age-group + .error-icon'));
    return;
  }

  const taxableIncome = grossIncome + extraIncome - deductions - 800000;
  let taxRate;

  switch (ageGroup) {
    case '<40':
      taxRate = 0.3;
      break;
    case '>=40&<60':
      taxRate = 0.4;
      break;
    case '>=60':
      taxRate = 0.1;
      break;
    default:
      taxRate = 0;
  }

  const taxAmount = taxableIncome > 0 ? taxableIncome * taxRate : 0;
  taxAmountSpan.textContent = `₹ ${taxAmount.toFixed(2)}`;
  resultModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
  resultModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === resultModal) {
    resultModal.style.display = 'none';
  }
});

errorIcons.forEach((icon) => {
  const input = icon.previousElementSibling;
  input.addEventListener('input', () => {
    if (input.validity.valid) {
      hideErrorIcon(icon);
    } else {
      showErrorIcon(icon);
    }
  });
});

function showErrorIcon(icon) {
  icon.style.display = 'block';
}

function hideErrorIcon(icon) {
  icon.style.display = 'none';
}