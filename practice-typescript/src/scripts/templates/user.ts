import User from 'scripts/types/user';

const displayUser = (user: User, index: number) => {
  const rowId = index + 1;
  localStorage.setItem(`user ${index}`, user.email)
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

export { displayUser };
