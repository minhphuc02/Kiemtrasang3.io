const express = require('express');
const app = express();
const port = 3000;

// Middleware để xử lý dữ liệu POST từ form
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware để cung cấp các tài nguyên tĩnh từ thư mục public
app.use(express.static('public'));

// Middleware đơn giản kiểm tra trạng thái của yêu cầu và ghi log
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

// Định nghĩa các route
app.get('/', (req, res) => {
  res.send('Trang chủ');
});

app.get('/about', (req, res) => {
  res.send('Thông tin về chúng tôi');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Kiểm tra thông tin đăng nhập và xử lý
  res.send(`Xin chào ${username}, bạn đã đăng nhập thành công!`);
});

// Route không tồn tại
app.use((req, res) => {
  res.status(404).send('404 - Không tìm thấy trang');
});

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('500 - Lỗi máy chủ');
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
