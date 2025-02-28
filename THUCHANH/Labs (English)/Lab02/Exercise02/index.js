const http = require('http');
const URL = require('url');
const queryString = require('querystring');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    })

    let url = URL.parse(req.url)

    if (url.pathname === '/') {
        //đọc html từ file login.html
        let html = fs.readFileSync(path.join(__dirname, 'views/login.html'))
        return res.end(html)
    }



    if (url.pathname === '/login') {

        return handleLogin(req, res)
    }

    let html = fs.readFileSync(path.join(__dirname, 'views/fail.html')).toString();
    html = html.replace('xxxxxxxxxx', 'Đường dẫn không hợp lệ')
    return res.end(html)
});

function handleLogin(req, res) {

    let html = fs.readFileSync(path.join(__dirname, 'views/fail.html')).toString();
    if (req.method !== 'POST') {
        html = html.replace('xxxxxxxxxx', `Phương thức ${req.method} không được hỗ trợ.`)
        return res.end(html)
    }

    let body = '';

    /* Vì dữ liệu body của http post gửi lên dạng stream
    nên ta không có được ngay mà phải đọc từng bước*/
    req.on('data', d => body += d.toString());
    req.on('end', () => {
        console.log('Đã nhận đủ body');
        let input = queryString.decode(body);
        if (!input.email) {
            return res.end(html.replace('xxxxxxxxxx', `Thiếu thông tin email`))
        }

        if (!input.pass) {
            return res.end(html.replace('xxxxxxxxxx', `Thiếu thông tin mật khẩu`))
        }

        if (!input.email.includes("@")) {
            return res.end(html.replace('xxxxxxxxxx', `Email không có dấu @ là sai`))
        }

        if (input.pass.length < 6) { // not password
            return res.end(html.replace('xxxxxxxxxx', `Mật khẩu phải có tối thiểu 6 ký tự`))
        }

        if (input.email !== 'admin@gmail.com' || input.pass !== '123456') {
            return res.end(html.replace('xxxxxxxxxx', `Sai email hoặc mật khẩu`))
        }

        let successHTML = fs.readFileSync(path.join(__dirname, 'views/success.html')).toString();
        return res.end(successHTML); // đăng nhập thành công
    });
}

server.listen(8080, () => {
    console.log('Server is listening at http://localhost:8080');
});