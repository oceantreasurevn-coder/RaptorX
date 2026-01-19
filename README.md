# SCATER RAPTOR X - Product Launch Event Website

Website giới thiệu sản phẩm RAPTOR X dùng React (CDN) + Tailwind CSS build bằng CLI, tối ưu để chạy trên GitHub Pages.

## 🚀 Tính năng

- ✨ Thiết kế hiện đại với animation mượt mà
- 📱 Responsive hoàn toàn trên mọi thiết bị
- 🎨 Gradient và glassmorphism effects
- 🎯 Smooth scrolling navigation
- 💫 Parallax effects và scroll animations
- 🎭 Interactive button effects với ripple animation

## 📁 Cấu trúc thư mục

```
.
├── index.html         # Trang chủ
├── src/app.jsx        # React app source
├── src/tailwind.css   # Tailwind entry
├── assets/app.js      # JS build output
├── assets/tailwind.css# CSS build output
└── README.md          # Hướng dẫn
```

## 🌐 Deploy lên GitHub Pages

### Cách 1: Sử dụng GitHub Desktop hoặc Web Interface

1. **Tạo repository mới trên GitHub:**
   - Đăng nhập vào GitHub
   - Click nút "New repository"
   - Đặt tên repository (ví dụ: `raptor-x-launch`)
   - Chọn "Public"
   - Click "Create repository"

2. **Upload files:**
   - Click "uploading an existing file"
   - Kéo thả các file: `index.html`, `style.css`, `script.js`, `README.md`
   - Click "Commit changes"

3. **Kích hoạt GitHub Pages:**
   - Vào tab "Settings" của repository
   - Scroll xuống phần "Pages" (bên trái)
   - Trong "Source", chọn "main" branch
   - Click "Save"
   - Đợi vài phút, website sẽ được publish tại: `https://[username].github.io/[repository-name]`

### Cách 2: Sử dụng Git Command Line

```bash
# Di chuyển vào thư mục dự án
cd "/Users/tanminhtrinh/Desktop/untitled folder"

# Khởi tạo Git repository
git init

# Thêm tất cả files
git add .

# Commit
git commit -m "Initial commit - RAPTOR X Launch Website"

# Thêm remote repository (thay YOUR_USERNAME và REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push code lên GitHub
git branch -M main
git push -u origin main
```

Sau đó làm theo bước 3 ở Cách 1 để kích hoạt GitHub Pages.

## 🛠 Build production (loại bỏ cảnh báo Tailwind/Babel)

```bash
npm install
npm run build
```

Lệnh build tạo `assets/tailwind.css` và `assets/app.js` để dùng trong production.

## 🎨 Tùy chỉnh

### Thay đổi màu sắc

Mở `index.html` để chỉnh CSS custom trong `<style>` hoặc cập nhật lớp Tailwind.

### Thay đổi nội dung

Mở file `index.html` và chỉnh sửa:
- Text trong các thẻ `<h1>`, `<p>`, `<button>`
- Đường dẫn hình ảnh trong thuộc tính `src`
- Thông tin lịch trình trong section `#schedule`

### Thay đổi hiệu ứng

Mở `src/app.jsx` để:
- Điều chỉnh thời gian animation
- Thêm/bỏ các hiệu ứng scroll
- Tùy chỉnh hành vi của buttons

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: ≥ 1024px

## 🔧 Yêu cầu

- Không cần cài đặt gì, chỉ cần trình duyệt web hiện đại
- Hỗ trợ: Chrome, Firefox, Safari, Edge (phiên bản mới nhất)

## 📬 Form đăng ký + Email xác nhận

Trang đăng ký gửi dữ liệu qua API `/api/register` để forward vào Google Form và gửi email xác nhận (tuỳ chọn).

Thiết lập biến môi trường khi chạy `server.js`:

- `RESEND_API_KEY`: API key từ Resend
- `RESEND_FROM`: địa chỉ gửi (vd: `Scaters <noreply@yourdomain.com>`)
- `RESEND_REPLY_TO` (tuỳ chọn)

Nếu thiếu các biến trên, form vẫn gửi về Google Form nhưng **không gửi email xác nhận**.

## 📝 License

© 2025 SCATER RAPTOR X. All rights reserved.

## 🤝 Hỗ trợ

Nếu gặp vấn đề khi deploy hoặc cần tùy chỉnh thêm, hãy liên hệ hoặc tạo issue trên GitHub repository.

---

**Lưu ý:** Website này sử dụng hình ảnh từ external sources (janeportforlio.my.canva.site). Hãy đảm bảo bạn có quyền sử dụng các hình ảnh này trước khi deploy công khai.
