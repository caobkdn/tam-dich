# Tâm Dịch

Sổ tu tập hằng ngày theo lộ trình **Tĩnh → Chính → Thuận → Ái**: ngồi yên, câu kinh mang theo, ba lần dừng lại, tỉnh thân buổi tối. Mỗi ngày được vẽ thành một quẻ Kinh Dịch: việc nào làm xong thì hào ấy thành hào dương.

## Cài lên điện thoại Android

1. Mở trên điện thoại: **Releases → bản mới nhất → TamDich.apk** để tải về.
2. Mở file vừa tải. Nếu máy hỏi, cho phép *Cài ứng dụng không rõ nguồn* đối với trình duyệt hoặc ứng dụng Tệp.
3. Mở app **Tâm Dịch**, bấm **Bật nhắc nhở** và cho phép thông báo.

Bản mới cài đè lên bản cũ, nhật ký giữ nguyên. Gỡ app thì nhật ký mất, nên hãy dùng **Lộ trình → Sao lưu lên Drive** (app nhắc mỗi tuần). Khi đổi máy: cài app, rồi **Khôi phục từ Drive** và chọn file `TamDich-saoluu-….json` mới nhất.

## Cách bản cài được tạo ra

Mỗi lần mã nguồn trên nhánh `main` thay đổi, GitHub Actions (`.github/workflows/build-apk.yml`) tự đóng gói APK và đăng vào Releases.

- Giao diện: `www/index.html` (một trang HTML, không cần mạng).
- Vỏ Android: Capacitor 7 (`android/`), thông báo bằng `@capacitor/local-notifications`, lưu dữ liệu bằng `@capacitor/preferences`.
- Khóa ký `android/app/tamdich.keystore` được giữ cố định để các bản cập nhật cài đè được. Đây là app cá nhân, không đưa lên cửa hàng.
