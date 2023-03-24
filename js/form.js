//BASED ON CODE FROM THIS SITE:
// https://www.javascripttutorial.net/javascript-dom/javascript-form/

function showMessage(input, message, type) {
  const msg = input.parentNode.querySelector("small");
  msg.innerText = message;

  input.className = type ? "success" : "error";
  return type;
}

function showError(input, message) {
  return showMessage(input, message, false);
}

function showSuccess(input) {
  return showMessage(input, "", true);
}

function hasValue(input, message) {
  if (input.value.trim() === "") {
    return showError(input, message);
  }
  return showSuccess(input);
}

function validateEmail(input, requiredMsg, invalidMsg) {
  if (!hasValue(input, requiredMsg)) {
    return false;
  }

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const email = input.value.trim();
  if (!emailRegex.test(email)) {
    return showError(input, invalidMsg);
  }
  return true;
}

const form = document.querySelector("#submitform");

const NAME_REQUIRED = "PLEASE ENTER YOUR NAME";
const EMAIL_REQUIRED = "PLEASE ENTER YOUR E-MAIL";
const EMAIL_INVALID = "PLEASE ENTER A CORRECT E-MAIL ADDRESS FORMAT";
const MESSAGE_REQUIRED = "PLEASE WRITE YOUR MESSAGE";

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let nameValid = hasValue(form.elements["name"], NAME_REQUIRED);
  let messageValid = hasValue(form.elements["message"], MESSAGE_REQUIRED);
  let emailValid = validateEmail(
    form.elements["email"],
    EMAIL_REQUIRED,
    EMAIL_INVALID
  );

  if (nameValid && emailValid && messageValid) {
    alert("Thank you for contacting us! You will hear from us soon.");
  }
});
