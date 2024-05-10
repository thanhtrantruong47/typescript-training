import User from 'scripts/types/user';

const displayHeadTable = `
    <tr>
      <td class="mytable__head mytable__head--id">#</td>
      <td class="mytable__head">Username</td>
      <td class="mytable__head">First Name</td>
      <td class="mytable__head">Last Name</td>
      <td class="mytable__head">Phone Number</td>
      <td class="mytable__head mytable__head-action">Actions</td>
    </tr>
  `;

const displayUser = (user: User, index: number) => {
  const rowId = index + 1;
  return `<tr class="tbl-item">
            <td class="mytable__item id-content">${rowId}</td>
            <td class="mytable__item username-content">${user.email}</td>
            <td class="mytable__item firstName-content">${user.first_name}</td>
            <td class="mytable__item lastName-content">${user.last_name}</td>
            <td class="mytable__item phone-content">${user.phone_number}</td>
            <td class="mytable__item mytable__item-action">
            <a href="javascript:void(0)" class="action-edit" data-id="${user.id}">Edit</a>
            <a href="javascript:void(0)" class="action-delete" data-id="${user.id}">Delete</a></td>
          </tr>`;
};

export { displayUser, displayHeadTable };
