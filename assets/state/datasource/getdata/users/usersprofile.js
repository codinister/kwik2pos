import fetchApiUrl from '../../../../utils/fetchApiUrl.js';
import urlCode from '../../../../utils/urlCode.js';

const usersprofile = (callback) => {
  Promise.allSettled([
    fetch(fetchApiUrl('usersprofile', 'userDetails') + urlCode()).then((resp) =>
      resp.json()
    ),
    fetch(fetchApiUrl('usersprofile', 'usersNotes') + urlCode()).then((resp) =>
      resp.json()
    ),
    fetch(fetchApiUrl('usersprofile', 'usersPrivilleges') + urlCode()).then(
      (resp) => resp.json()
    ),
  ])
    .then((value) => {
      const note = Object.values(value[1].value)
        .map((v) => ({
          note_id: v.note_id,
          title: v.title,
          message: v.message,
          user_id: v.user_id,
          createdAt: v.createdAt,
          arrs: [
            {
              note_id: v.note_id,
              title: v.title,
              message: v.message,
              user_id: v.user_id,
              createdAt: v.createdAt,
            },
          ],
        }))
        .reduce((a, b) => {
          if (a[b.user_id]) {
            a[b.user_id].arrs.push({
              note_id: b.note_id,
              title: b.title,
              message: b.message,
              user_id: b.user_id,
              createdAt: b.createdAt,
            });
          } else {
            a[b.user_id] = b;
          }

          return a;
        }, {});

      const menu = Object.values(value[2].value)
        .map((v) => {
          return {
            usermenu_id: v.usermenu_id,
            menu_name: v.menu_name,
            menu_id: v.menu_id,
            menus: [
              {
                [v.menu_name]: {
                  usermenu_id: v.usermenu_id,
                  menu_name: v.menu_name,
                  menu_id: v.menu_id,
                },
              },
            ],
          };
        })
        .reduce((a, b) => {
          if (a[b.user_id]) {
            a[b.user_id].menus.push({
              [b.menu_name]: {
                usermenu_id: b.usermenu_id,
                menu_name: b.menu_name,
                menu_id: b.menu_id,
              },
            });
          } else {
            a[b.user_id] = b;
          }
          return a;
        }, {});

      const users = Object.values(value[0].value).map((v) => {
        return {
          createdAt: v.createdAt,
          user_id: v.user_id,
          firstname: v.firstname,
          lastname: v.lastname,
          phone: v.phone,
          residence: v.residence,
          email: v.email,
          hire_date: v.hire_date,
          username: v.username,
          role_id: v.role_id,
          status: v.status,
          signature: v.signature,
          photo: v.photo,
          menus: menu ? menu[v.user_id]?.menus : '',
          note: note ? note[v.user_id]?.arrs : '',
        };
      });

    
      callback(users);
    })
    .catch((err) => console.log(err));
};

export default usersprofile;
