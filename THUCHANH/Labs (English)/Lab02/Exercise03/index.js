const http = require('http');
const URL = require('url');
const queryParser = require('querystring');

let students = new Map();
let pattern = /\/students\/[a-zA-Z0-9]+\/*$/ig

const server = http.createServer((req, res) => {
    
    res.writeHead(200, { 'Content-Type': 'application/json' });

    let url = URL.parse(req.url);

    if (url.pathname === '/students') {
        if (req.method === 'POST') {
            return addStudent(req, res)
        }
        if (req.method === 'GET') {
            return loadStudent(req, res)
        }
        else return res.end(JSON.stringify({ code: 101, message: `Phương thức ${req.method} không được hỗ trợ tại /students` })); // dấu nháy `
    } else if (url.pathname.match(pattern)) {
        //đã tìm ra được url khớp, ta sẽ tách lấy id sinh viên
        let IdPattern = /[a-zA-Z0-9]+\/*$/ig
        let studentId = url.pathname.match(IdPattern)[0].replace(/\/*$/ig, '')

        return findStudentById(req, res, studentId)
    }

    else res.end(JSON.stringify({ code: 100, message: 'Đường dẫn không được hỗ trợ' }));
});

function findStudentById(req, res, studentId) {
    if (!students.has(studentId)) {
        return res.end(JSON.stringify({ code: 103, message: `Không tìm thấy sinh viên với mã ${studentId}` }));
    }
    let student = students.get(studentId);
    return res.end(JSON.stringify({ code: 0, message: 'Đã tìm thấy sinh viên', data: student }));
}

function loadStudent(req, res) {
    if (students.size === 0) {
        return res.end(JSON.stringify({ code: 102, message: 'Chưa có sinh viên trong dữ liệu' }));
    }
    let studentList = Array.from(students.values())
    return res.end(JSON.stringify({ code: 0, message: 'Đọc sinh viên thành công', data: studentList }));
}

function addStudent(req, res) {
    let body = '';
    req.on('data', d => body += d.toString());
    req.on('end', () => {
        let input = queryParser.decode(body)
        if (!input.id) {
            return res.end(JSON.stringify({ code: 1, message: 'Chưa có mã sinh viên' }))
        }
        if (!input.name) {
            return res.end(JSON.stringify({ code: 1, message: 'Chưa có tên sinh viên' }))
        }
        if (!input.age) {
            return res.end(JSON.stringify({ code: 1, message: 'Chưa có tuổi của sinh viên' }))
        }
        if(isNaN(input.age)) {
            return res.end(JSON.stringify({ code: 1, message: 'Tuổi sinh viên không đúng định dạng' }))
        }
        if (input.age < 15 || input.age > 100) {
            return res.end(JSON.stringify({ code: 1, message: 'Tuổi phải nằm trong khoảng từ 15 đến 100' }))
        }

        if (students.has(input.id)) {
            return res.end(JSON.stringify({ code: 2, message: `Sinh viên với mã số ${input.id} đã tồn tại` }))
        }

        students.set(input.id, input);

        return res.end(JSON.stringify({ code: 0, message: 'Đã thêm sinh viên thành công' }))
    });
}

server.listen(8080, () => {
    console.log('Server is running at http://localhost:8080')
});