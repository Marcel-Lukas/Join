/**
 * Generates an HTML snippet displaying the active user as a special contact entry,
 * with a user icon in white, an indication of "YOU," and truncated name/email.
 * @function generateActiveUserContact
 * @param {Object} user - The data object for the active user.
 * @param {number} user.id - A unique identifier for the user (forced to 0 for active user).
 * @param {string} user.name - The full name of the active user.
 * @param {string} user.email - The email address of the active user.
 * @param {string} user.initials - The user's initials.
 * @returns {string} An HTML string representing the active user in the contact list.
 */
function generateActiveUserContact(user){
  const limitNameLength = limitTextLength(user.name);
  const limitEmailLength = limitTextLength(user.email);
  return `
      <div id="contact${user.id}" class="contacts" onclick="displayContactInfo(${user.id})">
        <div class="letter-circle letter-circel-user" style="background-color: white;">${user.initials}</div>
        <div class="contact-info">
          <span>${limitNameLength}(YOU)</span>
          <a class="contact-email" href="#">${limitEmailLength}</a>
        </div>
      </div>
    `;
}

/**
 * Generates an HTML snippet for displaying a regular contact in the contact list,
 * including a color-coded icon, truncated name, and truncated email.
 * @function generateContact
 * @param {Object} contact - The data object for the contact.
 * @param {number} contact.id - The unique identifier of the contact.
 * @param {string} contact.name - The contact's full name.
 * @param {string} contact.email - The contact's email address.
 * @param {string} contact.color - The color associated with the contact.
 * @param {string} contact.initials - The contact's initials.
 * @returns {string} An HTML string representing a contact in the contact list.
 */
function generateContact(contact) {
  const limitNameLength = limitTextLength(contact.name);
  const limitEmailLength = limitTextLength(contact.email);

  return `
      <div id="contact${contact.id}" class="contacts" onclick="displayContactInfo(${contact.id})">
        <div class="letter-circle" style="background-color: ${contact.color};">${contact.initials}</div>
        <div class="contact-info">
          <span>${limitNameLength}</span>
          <a class="contact-email" href="#">${limitEmailLength}</a>
        </div>
      </div>
    `;
}

/**
 * Generates an HTML snippet for a letter box (alphabetic separator) in the contact list,
 * used to group contacts by their first initial.
 * @function generateLetterBox
 * @param {string} initials - The single-letter string representing the grouped initial.
 * @returns {string} An HTML string containing the letter box and a separator.
 */
function generateLetterBox(initials) {
  return `<div class="letter-box">${initials}</div>
              <div class="contact-seperator"></div>`;
}

/**
 * Constructs an HTML snippet displaying detailed information about a contact,
 * including name, email, phone, and edit/delete controls.
 * @function generateContactInfo
 * @param {Object} contact - The data object for the contact.
 * @param {number} contact.id - The unique identifier of the contact.
 * @param {string} contact.name - The contact's full name.
 * @param {string} contact.email - The contact's email address.
 * @param {string} contact.color - The color associated with the contact.
 * @param {string} contact.initials - The contact's initials.
 * @param {string} [contact.phone] - The contact's phone number, if available.
 * @returns {string} An HTML snippet containing the contact's detailed info and action buttons.
 */
function generateContactInfo(contact) {
  const phone = contact.phone !== undefined ? contact.phone : "";
  return `
    <div class="contacts-info">
        <div class="contacts-info-name">
          <div id="for_active_user" class="big-letter-circle" style="background-color: ${contact.color};">${contact.initials}</div>
          <div class="contact-box-name">
            <h3>${contact.name}</h3>
            <div class="contact-box-edit-delete">
              <div onclick="openDialogEdit(${contact.id})" class="edit-link">
                <svg class="icon-edit" width="18" height="18" viewBox="0 0 19 19" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 17H3.4L12.025 8.375L10.625 6.975L2 15.6V17ZM16.3 6.925L12.05 2.725L13.45 1.325C13.8333 0.941667 14.3042 0.75 14.8625 0.75C15.4208 0.75 15.8917 0.941667 16.275 1.325L17.675 2.725C18.0583 3.10833 18.2583 3.57083 18.275 4.1125C18.2917 4.65417 18.1083 5.11667 17.725 5.5L16.3 6.925ZM14.85 8.4L4.25 19H0V14.75L10.6 4.15L14.85 8.4Z" />
                </svg>Edit
              </div>
              <div onclick="openDeleteDialog(${contact.id})" id="user_delete_display_info" class="delete-link">
                <svg class="icon-delete" width="16" height="18" viewBox="0 0 16 18" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3C0.716667 3 0.479167 2.90417 0.2875 2.7125C0.0958333 2.52083 0 2.28333 0 2C0 1.71667 0.0958333 1.47917 0.2875 1.2875C0.479167 1.09583 0.716667 1 1 1H5C5 0.716667 5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H10C10.2833 0 10.5208 0.0958333 10.7125 0.2875C10.9042 0.479167 11 0.716667 11 1H15C15.2833 1 15.5208 1.09583 15.7125 1.2875C15.9042 1.47917 16 1.71667 16 2C16 2.28333 15.9042 2.52083 15.7125 2.7125C15.5208 2.90417 15.2833 3 15 3V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM3 3V16H13V3H3ZM5 13C5 13.2833 5.09583 13.5208 5.2875 13.7125C5.47917 13.9042 5.71667 14 6 14C6.28333 14 6.52083 13.9042 6.7125 13.7125C6.90417 13.5208 7 13.2833 7 13V6C7 5.71667 6.90417 5.47917 6.7125 5.2875C6.52083 5.09583 6.28333 5 6 5C5.71667 5 5.47917 5.09583 5.2875 5.2875C5.09583 5.47917 5 5.71667 5 6V13ZM9 13C9 13.2833 9.09583 13.5208 9.2875 13.7125C9.47917 13.9042 9.71667 14 10 14C10.2833 14 10.5208 13.9042 10.7125 13.7125C10.9042 13.5208 11 13.2833 11 13V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V13Z" />
                </svg>Delete
              </div>
            </div>
          </div>
        </div>
        <div class="contacts-information">
          <span>Contact Information</span>
        </div>
        <div class="contacts-info-email-phone">
          <div class="contacts-info-email">
            <span style="font-weight: 700;">Email</span>
            <span style="color: #007CEE;"> 
              <a class="contact-email" href="mailto:${contact.email}">${contact.email}</a>
            </span>
          </div>
          <div class="contacts-info-phone">
            <span style="font-weight: 700;">Phone</span>
            <span>${phone}</span>
          </div>
        </div>
        </div>
      `;
}

/**
 * Generates an HTML snippet for a large letter circle (such as for editing a contact)
 * displaying the contact's initials.
 * @function generateBigLetterCircle
 * @param {Object} contact - The contact data object.
 * @param {string} contact.color - The background color for the circle.
 * @param {string} contact.initials - The contact's initials.
 * @returns {string} An HTML string for the large letter circle.
 */
function generateBigLetterCircle(contact) {
  return `
      <div id="for_active_use_dialog_circel" class="edit-big-letter-circle" style="background-color: ${contact.color}";>${contact.initials}
      </div>
      `;
}

/**
 * Constructs an HTML snippet with buttons displayed in a contact's detailed view,
 * allowing the user to delete or save changes to the contact.
 * @function generateButtonsInContactInfo
 * @param {Object} contact - The contact data object.
 * @param {number} contact.id - The unique identifier of the contact.
 * @returns {string} An HTML string containing two buttons: one for deletion and one for saving.
 */
function generateButtonsInContactInfo(contact) {
  return `
    <button onclick="openDeleteDialog(${contact.id})" id="user_display_info" class="button-delete">
    Delete
  </button>
  <button onclick="validateEditForm(${contact.id})" class="button-save">
    Save
    <img
      class="check-icon-button"
      src="../assets/img/png/check.png"
      alt="check"
    />
  </button>
    `;
}

/**
 * Generates the HTML snippet for a simple mobile menu, containing icons for editing
 * and deleting a contact.
 * @function generateMobileMenu
 * @param {Object} contact - The contact data object.
 * @param {number} contact.id - The unique identifier of the contact.
 * @returns {string} An HTML string with two image buttons for mobile edit and delete actions.
 */
function generateMobileMenu(contact){
  return ` <img onclick="openDialogEdit(${contact.id})" class="mobile-edit-img" src="../assets/img/png/edit-default.png" alt="edit">
      <img onclick="openDeleteDialog(${contact.id})" id="user_delete_mobile" class="mobile-delete-img" src="../assets/img/png/delete-default.png" alt="delete"></img>`;
}

/**
 * Constructs a confirmation button for deleting a contact, toggling the overlay
 * and closing any edit dialog upon click.
 * @function generateDeleteButton
 * @param {number} contactId - The unique identifier of the contact to delete.
 * @returns {string} An HTML button labeled "YES" that triggers contact deletion.
 */
function generateDeleteButton(contactId) {
  return `<button class="clear-button"
           onclick="deleteContact(${contactId});toggleOverlay('contact_delete_overlay'); closeDialogEdit() ">YES
      </button>`;
}

/**
 * Creates an HTML snippet indicating a successful creation, editing, or deletion of a contact.
 * @function generateSuccesssfullyHtml
 * @param {string} operation - A string describing the operation (e.g., "created," "edited," or "deleted").
 * @returns {string} A success message formatted in HTML.
 */
function generateSuccesssfullyHtml(operation){
  return `<span>Contacts successfully ${operation}</span>`;
}
