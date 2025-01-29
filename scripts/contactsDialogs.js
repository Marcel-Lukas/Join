function validateFields(fields) {
  return fields.every(({ id, regex, alert, message, maxLength }) =>
    validateInput(document.getElementById(id), regex, message, alert, maxLength)
  );
}


async function validateForm() {
  const fields = [
    {
      id: "name",
      regex: /^[A-Za-zÄäÖöÜüß]+(\s+[A-Za-zÄäÖöÜüß]+){1,}$/,
      alert: "field_alert_name",
      message: "(min. two words, max. 23 chars)",
      maxLength: 23,
    },
    {
      id: "email",
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      alert: "field_alert_email",
      message: "Invalid email (test@test.de)",
    },
  ];
  const valid = validateFields(fields);
  if (valid) {
    await addContact();
  }
}


async function validateEditForm(contactId) {
  const fields = [
    {
      id: "inputEditName",
      regex: /^[A-Za-zÄäÖöÜüß]+(\s+[A-Za-zÄäÖöÜüß]+){1,}$/,
      alert: "edit_field_alert_name",
      message: "(min. two words, max. 23 chars)",
      maxLength: 23,
    },
    {
      id: "inputEditEmail",
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      alert: "edit_field_alert_email",
      message: "Invalid email (test@test.de)",
    },
  ];
  const valid = validateFields(fields);
  if (valid) {
    await editContact(contactId);
  }
}


async function openDialog() {
  const dialogContainer = document.getElementById("dialog_contacts");
  dialogContainer.open = true;
  dialogContainer.classList.add("d-flex");
  await wait(10);
  dialogContainer.classList.add("dialog-open");
  document.getElementById("grey_background").classList.remove("hidden");
}


async function openDialogEdit(contactId) {
  const contact = await getContact(contactId);
  const menu = document.getElementById("mobile_menu");
  if (menu.classList.contains("d-flex")) {
    menu.classList.remove("d-flex");
  }
  if (contact.id === 0) {
    document.getElementById("user_display_info").classList.add("d-none")
  }
  const dialogContainer = document.getElementById("dialog_edit");
  dialogContainer.open = true;
  dialogContainer.classList.add("d-flex");
  document.getElementById("grey_background").classList.remove("hidden");
  populateFormFields(contact);
  await wait(10);
  dialogContainer.classList.add("dialog-open");
  dialogBigLetterCircle(contact);
}


async function closeDialog() {
  const dialogContainer = document.getElementById("dialog_contacts");
  dialogContainer.classList.remove("dialog-open");
  document.getElementById("grey_background").classList.add("hidden");
  await wait(300);
  dialogContainer.classList.remove("d-flex");
  dialogContainer.open = false;
  clearForm();
}


async function closeDialogEdit() {
  const dialogContainer = document.getElementById("dialog_edit");
  dialogContainer.classList.remove("dialog-open");
  document.getElementById("grey_background").classList.add("hidden");
  await wait(300);
  dialogContainer.classList.remove("d-flex");
  dialogContainer.open = false;
  clearEditForm();
}


function populateFormFields(contact) {
  document.getElementById("inputEditName").value = contact.name;
  document.getElementById("inputEditEmail").value = contact.email;
  if (contact.phone === undefined) {
    contact.phone = "";
  }
  document.getElementById("inputEditPhone").value = contact.phone;
}


function dialogBigLetterCircle(contact) {
  document.getElementById("big_letter_circle").innerHTML =
    generateBigLetterCircle(contact);
  if (contact.color === "#ffffff") {
    document
      .getElementById("for_active_use_dialog_circel")
      .classList.add("letter-circel-user");
  }
}


async function openDialogSuccessfully(operation) {
  const dialogContainer = document.getElementById("succesfully_created");
  dialogContainer.innerHTML = generateSuccesssfullyHtml(operation);
  setTimeout(async () => {
    dialogContainer.open = true;
    await wait(300);
    dialogContainer.classList.add("dialog-open");
    dialogContainer.classList.add("d-flex");
    await wait(1500);
    dialogContainer.classList.remove("dialog-open");
    await wait(300);
    dialogContainer.classList.remove("d-flex");
    dialogContainer.open = false;
  }, 300);
}


function getInputValue(id) {
  return document.getElementById(id).value;
}


function setError(inputElement, message, alertElementId) {
  const alertElement = document.getElementById(alertElementId);
  alertElement.innerText = message;
  alertElement.style.display = "block";
  inputElement.classList.add("error");
}


function clearError(inputElement, alertElementId) {
  const alertElement = document.getElementById(alertElementId);
  alertElement.innerText = "";
  alertElement.style.display = "none";
  inputElement.classList.remove("error");
}


function clearForm() {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  clearError(nameInput, "field_alert_name");
  clearError(emailInput, "field_alert_email");
  clearError(phoneInput, "field_alert_phone");
}


function clearEditForm() {
  const nameEditInput = document.getElementById("inputEditName");
  const emailEditInput = document.getElementById("inputEditEmail");
  const phoneEditInput = document.getElementById("inputEditPhone");
  clearError(nameEditInput, "edit_field_alert_name");
  clearError(emailEditInput, "edit_field_alert_email");
  clearError(phoneEditInput, "edit_field_alert_phone");
}


function validateInput(input, regex, errorMsg, errorId, maxLength) {
  const valid = maxLength
    ? input.value.match(regex) && input.value.length <= maxLength
    : input.value.match(regex);
  if (!valid) {
    setError(input, errorMsg, errorId);
    input.value = "";
  } else {
    clearError(input, errorId);
  }
  return valid;
}


function updateCrossImage() {
  const imgElements = document.querySelectorAll(".cross");
  imgElements.forEach((imgElement) => {
    if (window.innerWidth < 1024) {
      imgElement.src = "../assets/img/png/close-white.png"; 
    } else {
      imgElement.src = "../assets/img/png/close.png"; 
    }
  });
}


async function editContact(contactId) {
  const existingContact = await getContact(contactId);
  if(contactId === 0) {
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));
    existingContact.id = activeUser.id;
  }
  const updatedContact = createUpdatedContact(existingContact);
  const endpoint =
    existingContact.color === "#ffffff"
      ? `users/${existingContact.id - 1}/`
      : `contacts/${existingContact.id - 1}/`;
  await postData(endpoint, updatedContact);
  closeDialogEdit();
  openDialogSuccessfully('edited');
  await renderContent();
  checkDisplayForInfo(existingContact)
}


function checkDisplayForInfo(existingContact){
  if (window.innerWidth <= 777) {
    const infoDiv = document.getElementById("mobile_contact_info");
    infoDiv.classList.add("d-none");
    infoDiv.classList.remove("pos-abs");
  } else {
    if ( existingContact.color === "#ffffff") {
      existingContact.id = 0;
    }
    displayContactInfo(existingContact.id);
  }
}


function createUpdatedContact(existingContact) {
    const updatedName = document.getElementById("inputEditName").value;
    const updatedEmail = document.getElementById("inputEditEmail").value;
    const updatedPhone = document.getElementById("inputEditPhone").value;
    const updatedInitials = getInitials(updatedName);
    return {
      ...existingContact,
      name: updatedName,
      email: updatedEmail,
      phone: updatedPhone,
      initials: updatedInitials,
    };
  }


window.addEventListener("load", updateCrossImage);


window.addEventListener("resize", updateCrossImage);
