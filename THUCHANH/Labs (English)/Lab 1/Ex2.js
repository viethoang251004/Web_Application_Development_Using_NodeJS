// let btn_Fetch, btn_Ajax, t_Body;
// const SERVER = 'https://web502070.web.app/lab1/students.json';

// window.addEventListener('load', () => {
//     btn_Ajax = document.getElementById('btn_Ajax');
//     btn_Fetch = document.getElementById('btn_Fetch');
//     t_Body = document.getElementById('table_Body');

//     btn_Ajax.addEventListener('click', load_By_Ajax);
//     btn_Fetch.addEventListener('click', load_By_Fetch);
// })

// function load_By_Ajax() {
//     let xhr = new XMLHttpRequest();
//     xhr.addEventListener('load', e => {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             let json = xhr.response;
//             let users = json.data;

//             let intervalId = setInterval(() => {
//                 btn_Ajax = document.getElementById('btn_Ajax');
//                 if (btn_Ajax) {
//                     btn_Ajax.addEventListener('click', load_By_Ajax);
//                     clearInterval(intervalId); // Stop checking once the element is found
//                 }
//             }, 100); // Check every 100 milliseconds

//             displayUsers(users);

//             // console.log(json);
//         } else console.log(e);
//     });
//     xhr.open('GET', SERVER, true);
//     xhr.responseType = 'json';
//     xhr.send();
// }

// function displayUsers(users) {
//     t_Body.innerHTML = '';
//     users.forEach(u => {
//         // console.log(u);
//         let tr = document.createElement('tr');
//         let td1 = document.createElement('td');
//         let td2 = document.createElement('td');
//         let td3 = document.createElement('td');

//         td1.innerHTML = u.id;
//         td2.innerHTML = u.name;
//         td3.innerHTML = u.age;

//         tr.appendChild(td1);
//         tr.appendChild(td2);
//         tr.appendChild(td3);

//         t_Body.appendChild(tr);
//     });
// }
// function load_by_Fetch() {
//     let result = fetch(SERVER);
//     // console.log(result);
//     result.then(kq => kq.json());
//     result.then(json => {
//         let users = json.data;
//         displayUsers(users);
//     });
//     result.catch(e => console.log(e));
// }




// Constants for button and table body
const fetchBtn = document.getElementById('fetchBtn');
const ajaxBtn = document.getElementById('ajaxBtn');
const studentTableBody = document.getElementById('studentTableBody');
// The server URL containing the JSON data
const API_URL = 'https://web-502070.web.app/lab1/students.json';
// Function to display users in the table
function displayStudents(students) {
    // Clear previous table data
    studentTableBody.innerHTML = '';

    // Loop through each student and create table rows
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
        `;
        studentTableBody.appendChild(row);
    });
}

// Fetch API method
function loadUsingFetch() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            displayStudents(data);
        })
        .catch(error => console.error('Error using Fetch API:', error));
}

// Ajax (XMLHttpRequest) method
function loadUsingAjax() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', API_URL, true);
    xhr.responseType = 'json';

    xhr.onload = function() {
        if (xhr.status === 200) {
            displayStudents(xhr.response);
        } else {
            console.error('Error using Ajax:', xhr.statusText);
        }
    };

    xhr.onerror = function() {
        console.error('Request error using Ajax.');
    };

    xhr.send();
}

// Event listeners for the buttons
fetchBtn.addEventListener('click', loadUsingFetch);
ajaxBtn.addEventListener('click', loadUsingAjax);
