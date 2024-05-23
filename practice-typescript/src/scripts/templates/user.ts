import User from 'scripts/types/user';

// HTML string for the header row of the user table.
const displayHeadTable = `
  <tr>
    <td class="table-user__head table-user__head--id">#</td>
    <td class="table-user__head">Username</td>
    <td class="table-user__head">First Name</td>
    <td class="table-user__head">Last Name</td>
    <td class="table-user__head">Phone Number</td>
    <td class="table-user__head table-user__head-action">Actions</td>
  </tr>
`;

// Function to generate an HTML row indicating an empty table.
const displayTableEmpty = (value: string) => `
  <tr>
    <td class="empty-table">${value}</td>
  </tr>
`;

// Function to generate an HTML row for a user.
const displayUser = (user: User, index: number): string => {
  const rowId = index + 1;
  localStorage.setItem('maxId', rowId.toString());
  localStorage.setItem(`email ${user.id}`, user.email.toString());

  // Generate and return the HTML string for the user row.
  return `<tr class="tbl-item">
            <td class="table-user__item id-content">${rowId}</td>
            <td class="table-user__item username-content">${user.email}</td>
            <td class="table-user__item firstName-content">${user.first_name}</td>
            <td class="table-user__item lastName-content">${user.last_name}</td>
            <td class="table-user__item phone-content">${user.phone_number}</td>
            <td class="table-user__item table-user__item-action">
              <a href="javascript:void(0)" class="action-edit" data-id="${user.id}">Edit</a>
              <a href="javascript:void(0)" class="action-delete" data-id="${user.id}">Delete</a>
            </td>
          </tr>`;
};

export { displayUser, displayHeadTable, displayTableEmpty };
