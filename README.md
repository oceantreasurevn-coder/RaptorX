# SCATER RAPTOR X - Product Launch Event Website

Website giới thiệu sản phẩm RAPTOR X được xây dựng bằng HTML, CSS và JavaScript thuần túy, tối ưu để chạy trên GitHub Pages.

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
├── index.html      # Trang chủ
├── style.css       # Stylesheet chính
├── script.js       # JavaScript interactions
└── README.md       # Hướng dẫn
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

## 🎨 Tùy chỉnh

### Thay đổi màu sắc

Mở file `style.css` và chỉnh sửa các biến CSS trong `:root`:

```css
:root {
    --primary-dark: #150E60;    /* Màu chính tối */
    --primary-blue: #304254;    /* Màu xanh chính */
    --gray-dark: #262624;       /* Màu xám đậm */
    --gray-medium: #90908F;     /* Màu xám trung bình */
    --yellow: #fbbf24;          /* Màu vàng */
}
```

### Thay đổi nội dung

Mở file `index.html` và chỉnh sửa:
- Text trong các thẻ `<h1>`, `<p>`, `<button>`
- Đường dẫn hình ảnh trong thuộc tính `src`
- Thông tin lịch trình trong section `#schedule`

### Thay đổi hiệu ứng

Mở file `script.js` để:
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

## 📝 License

© 2025 SCATER RAPTOR X. All rights reserved.

## 🤝 Hỗ trợ

Nếu gặp vấn đề khi deploy hoặc cần tùy chỉnh thêm, hãy liên hệ hoặc tạo issue trên GitHub repository.

---

**Lưu ý:** Website này sử dụng hình ảnh từ external sources (janeportforlio.my.canva.site). Hãy đảm bảo bạn có quyền sử dụng các hình ảnh này trước khi deploy công khai.
