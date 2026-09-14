const OPEN_ERROR_CLASSES = ['border-error', 'bg-error-bg'];
const OPEN_SUCCESS_CLASSES = ['border-success'];

function setFieldState(input: HTMLInputElement | HTMLTextAreaElement, valid: boolean) {
  const errorMsg = input.parentElement?.querySelector('.field-error');
  if (valid) {
    input.classList.remove(...OPEN_ERROR_CLASSES);
    input.classList.add(...OPEN_SUCCESS_CLASSES);
    errorMsg?.classList.add('hidden');
  } else {
    input.classList.remove(...OPEN_SUCCESS_CLASSES);
    input.classList.add(...OPEN_ERROR_CLASSES);
    errorMsg?.classList.remove('hidden');
  }
}

function validateField(input: HTMLInputElement | HTMLTextAreaElement) {
  const valid = input.checkValidity() && input.value.trim() !== '';
  setFieldState(input, valid);
  return valid;
}

export function initContactForm(formId: string) {
  const form = document.getElementById(formId) as HTMLFormElement | null;
  if (!form) return;

  const successBox = form.querySelector('#form-success') as HTMLElement;
  const errorBox = form.querySelector('#form-error') as HTMLElement;
  const fields = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
    'input[required], textarea[required]'
  );
  const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;

  fields.forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    successBox.classList.add('hidden');
    errorBox.classList.add('hidden');

    let allValid = true;
    fields.forEach((field) => {
      if (!validateField(field)) allValid = false;
    });
    if (!allValid) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = await res.json();

      if (result.success) {
        successBox.classList.remove('hidden');
        form.reset();
        fields.forEach((f) => f.classList.remove(...OPEN_SUCCESS_CLASSES, ...OPEN_ERROR_CLASSES));
      } else {
        errorBox.classList.remove('hidden');
      }
    } catch {
      errorBox.classList.remove('hidden');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar mensaje';
    }
  });
}