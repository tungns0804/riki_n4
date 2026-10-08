# Riki N4

Trang học tiếng Nhật cá nhân cho khoá **N4** của Riki Nihongo. Dựng trên cùng bộ khung với
[riki_nihongo](https://github.com/tungns0804/riki_nihongo) (N3): cùng màn hình, cùng định
dạng nội dung, chỉ khác học phần.

Học phần **N4** (`/n4`) — bảy phần:

| Phần                          | Đường dẫn         | Nội dung                                              |
| ----------------------------- | ----------------- | ----------------------------------------------------- |
| Bài kiểm tra nhập môn N4      | `/n4/test`        | Đề đầu vào: làm cả bài rồi nộp, chấm theo từng kỹ năng |
| Từ vựng                       | `/n4/vocabulary`  | Bảng từ + luyện tập sáu chiều                          |
| KANJI                         | `/n4/kanji`       | Thẻ chữ Hán: âm On/Kun, âm Hán Việt, số nét, từ ghép    |
| Ngữ pháp                      | `/n4/grammar`     | Trang lý thuyết: công thức, cách dùng, ví dụ — và đề    |
| Đọc hiểu                      | `/n4/reading`     | Bài đọc + câu hỏi trả lời tại chỗ + bản dịch ẩn         |
| Nghe hiểu                     | `/n4/listening`   | Trình phát + câu hỏi + lời thoại ẩn                     |
| Ngữ pháp MIMIKARA OBOERU      | `/n4/mimikara`    | Như phần Ngữ pháp, theo giáo trình 耳から覚える          |

Học phần N4 hiện mới có **bộ khung**: mỗi phần một bài mẫu `00-bai-mau` (hoặc một bài giữ
chỗ) để kiểm tra đường ống nội dung. Xoá bài mẫu khi đã có bài thật.

Mỗi **bài học** của Riki (Bài 26, Bài 27…) là một học phần riêng (`/bai-26`), các mục của
bài là các phần học của nó, mang đúng tên mục trên web Riki:

| Mục trên Riki                     | Đường dẫn             | Trạng thái |
| --------------------------------- | --------------------- | ---------- |
| Từ Vựng Cải Thiện                 | `/bai-26/vocabulary`  | Phần 1: 29 từ |
| Kanji - Hiền sensei               | `/bai-26/kanji`       | Kanji mới · Phần 1: 8 chữ |
| Ngữ Pháp Cải Thiện - Tuyển Sensei | `/bai-26/grammar`     | Phần 2: 3 mẫu |
| Đọc Hiểu - Mon sensei             | `/bai-26/reading`     | chờ nội dung |
| Nghe Hiểu - Lệ sensei             | `/bai-26/listening`   | chờ nội dung |

Hai mục "Luyện Tập" và "Kaiwa - Giáo Viên Nhật" chưa có loại phần học tương ứng, sẽ thêm
khi có nội dung.

Trang chạy hoàn toàn trong trình duyệt: không có máy chủ, không có tài khoản. Tiến độ học
lưu trong `localStorage` của chính máy đang dùng, khoá có tiền tố `riki-n4:` để không đụng
tiến độ của riki_nihongo (hai trang cùng nằm trên `tungns0804.github.io`).

Chấm một câu (luyện tập, câu hỏi của bài đọc / bài nghe) là có tiếng báo đúng / sai, tổng hợp
bằng Web Audio như minano_nihongo; nút loa trên thanh trên cùng bật / tắt nó.

## Bắt đầu

```bash
npm install
npm start           # sinh nội dung rồi chạy dev server ở http://localhost:4200
```

Các lệnh khác:

```bash
npm run build          # sinh nội dung rồi build ra dist/
npm run generate       # chỉ sinh public/content/ từ data-source/
npm run generate:clean # sinh lại và xoá file JSON không còn nguồn
npm run verify         # kiểm tra nội dung nguồn và phần đa ngôn ngữ
```

## Thêm bài học

Mọi nội dung nằm trong [`data-source/`](data-source/README.md) — mỗi học phần một thư
mục, trong đó mỗi phần học một thư mục, mỗi bài một thư mục con:

```
data-source/n4/vocabulary/01-danh-tu/
├── meta.json        tên hiển thị, mô tả, thứ tự (tuỳ chọn)
└── vocabulary.txt   nội dung bài
```

Chạy `npm run generate` là bài mới xuất hiện trên trang. Định dạng chi tiết của từng
loại nằm trong `README.md` của thư mục phần học:

- [Từ vựng](data-source/n4/vocabulary/README.md) — file `.txt`, mỗi từ một khối
- [Kanji](data-source/n4/kanji/README.md) — file `.txt`, mỗi dòng một chữ
- [Ngữ pháp](data-source/n4/grammar/README.md) và [Mimikara](data-source/n4/mimikara/README.md) — file `.json`
- [Đọc hiểu](data-source/n4/reading/README.md) — file `.json`
- [Nghe hiểu](data-source/n4/listening/README.md) — file `.json`, âm thanh đặt trong `public/audio/`
- [Đề kiểm tra](data-source/n4/entrance-test/README.md) — file `.json`, dùng cho cả bài
  dạng đề nằm trong phần Ngữ pháp / Từ vựng / Kanji (`"kind": "test"` trong `meta.json`)

Bài tập về nhà của một cụm từ vựng là **bài con**: `meta.json` khai `"parent"` (id bài mẹ)
và `"group"` (cụm), hiện ngay trên dòng cụm của bài mẹ chứ không ở danh sách bài.

## Kiến trúc

Angular 20, standalone component, state bằng signal. Không có backend.

```
src/app/
├── app.ts / app.html / app.css     vỏ ứng dụng: thanh bên, thanh trên, nút lên đầu trang
├── app.routes.ts                   route dựng từ COURSES × MODULES: /<học phần>/<phần>/<bài>
├── core/
│   ├── course/course.config.ts     ĐỊNH NGHĨA HỌC PHẦN VÀ PHẦN HỌC
│   ├── i18n/                       từ điển vi/ja, đổi ngôn ngữ lúc chạy
│   ├── models/                     hình dạng dữ liệu học và dữ liệu luyện tập
│   ├── practice/build-questions.ts dựng câu hỏi từ nội dung bài
│   ├── services/                   tải nội dung, phiên luyện tập, tiến độ, tông màu
│   └── utils/                      chấm đáp án, chuẩn hoá chữ, trộn ngẫu nhiên
└── features/
    ├── course-list/                trang gốc: chọn học phần
    ├── home/                       trang của một học phần: lưới các phần học
    ├── unit-list/                  danh sách bài — DÙNG CHUNG cho mọi phần
    ├── <loại>-detail/              màn hình chi tiết, mỗi loại nội dung một màn hình
    ├── entrance-test/              danh sách đề kiểm tra nhập môn
    ├── test-run/                   màn hình làm đề: nộp bài mới chấm
    ├── practice/ result/ stats/    luyện tập, kết quả, thống kê luyện tập
    └── shared/                     bộ chọn học phần, khung thiết lập luyện tập, …

scripts/
├── generate-content.mjs            data-source/ → public/content/ (+ index.json mỗi học phần)
├── content-core.mjs                bộ đọc từng định dạng nội dung
└── verify-i18n.mjs                 kiểm tra khoá vi/ja khớp nhau
```

**Thêm một học phần** (ví dụ Bài 27) = thêm một mục vào `COURSES` trong
`core/course/course.config.ts` VÀ trong `scripts/generate-content.mjs` (cùng `id` và
`modules`), thêm khoá `course.<id>.name` / `course.<id>.short` / `course.<id>.desc` vào
`core/i18n/messages.ts`, rồi đặt nội dung vào `data-source/<id>/`. Route tự có. Bài học
của Riki thì chép mục `bai-26`: `modules: LESSON_MODULES` và
`moduleLabels: LESSON_MODULE_LABELS` cho các phần học mang tên mục của Riki.

## Deploy

Push lên nhánh `main` là GitHub Actions tự build và deploy lên GitHub Pages
(`.github/workflows/deploy.yml`). Workflow tự bật Pages cho repo trong lần chạy đầu.

Trang chạy tại: https://tungns0804.github.io/riki_n4/
