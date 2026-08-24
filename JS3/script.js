const loadBtn = document.getElementById('loadBtn');
const clearBtn = document.getElementById('clearBtn');
const tableBody = document.querySelector('#dataTable tbody');

//This line tracks whether the data has already been loaded once or not
let hasLoaded = false; 

loadBtn.addEventListener('click', () => {
  if (hasLoaded) {
    //This one right her is the data already loaded once and theres no further action needed
    return;
  }

  fetch('https://jsonplaceholder.typicode.com/todos/')
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        const row = document.createElement('tr');

        const statusClass = item.completed ? 'status-completed' : 'status-pending';
        const statusText = item.completed ? 'Completed' : 'Not yet Completed';

        row.innerHTML = `
          <td>${item.userId}</td>
          <td>${item.id}</td>
          <td>${item.title}</td>
          <td class="${statusClass}">${statusText}</td>
        `;

        tableBody.appendChild(row);
      });

      hasLoaded = true;
      document.getElementById('dataTable').style.display = 'table'; // This line right here reveals the table now that it has data
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});

clearBtn.addEventListener('click', () => {
  tableBody.innerHTML = '';
  document.getElementById('dataTable').style.display = 'none'; // hide it again since it's empty
});