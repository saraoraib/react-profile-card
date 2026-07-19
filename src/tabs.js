export async function getTabs(role) {
  return new Promise(resolve => {
    setTimeout(() => {
      if (role === 'admin') {
        resolve([
          {
            id: 'profile',
            label: 'Profile',
            url: 'https://jsonplaceholder.typicode.com/users/1',
          },
          {
            id: 'tasks',
            label: 'Tasks',
            url: 'https://jsonplaceholder.typicode.com/todos?userId=1&_limit=5',
          },
          {
            id: 'notifications',
            label: 'Notifications',
            url: 'https://jsonplaceholder.typicode.com/posts?userId=1&_limit=4',
          },
        ]);
      } else {
        resolve([
          {
            id: 'profile',
            label: 'Profile',
            url: 'https://jsonplaceholder.typicode.com/users/1',
          },
        ]);
      }
    }, 500);
  });
}