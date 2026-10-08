# Định dạng bài kanji

File `kanji.txt`, mỗi dòng một chữ:

```
CHỮ,ÂM HÁN VIỆT,NGHĨA,ÂM ON,ÂM KUN,SỐ NÉT|TỪ GHÉP (CÁCH ĐỌC)=NGHĨA;TỪ GHÉP…
```

- Nhiều **âm On** hoặc **âm Kun** ngăn nhau bằng dấu `・` (dấu chấm giữa của tiếng
  Nhật), không dùng dấu phẩy vì dấu phẩy đã là dấu ngăn cột.
- Chỗ ngắt trong âm Kun viết bằng dấu chấm như từ điển: `けわ.しい`.
- **Từ ghép** viết sau dấu `|`, các từ ngăn nhau bằng `;`.
- Số nét để trống thì không hiện huy hiệu số nét.

Ví dụ:

```
険,HIỂM,hiểm/ nguy hiểm,ケン,けわ.しい,11|危険 (きけん)=nguy hiểm;保険 (ほけん)=bảo hiểm
```

## Nguồn và cách chép

Nguồn là **thẻ kanji** của từng "Bài N" trong phần KANJI trên website Riki, lấy từ ảnh
chụp màn hình. Cách chuẩn hoá: âm On viết katakana, chỗ ngắt đuôi âm Kun viết `.`,
nhiều âm ngăn bằng `・`, thẻ thiếu gì thì để trống.

Màn hình DANH SÁCH của website chỉ hiện chữ, âm Hán Việt, 音 và 訓; nghĩa của chữ, số nét
và từ ghép nằm sau nút "Tham khảo" — mở thẻ chi tiết để chép đủ.

## Các bài

Bài học của Riki (Bài 26…) là học phần riêng, kanji của bài nằm ở
`data-source/bai-<số bài>/kanji/` — mục "Kanji - Hiền sensei" trên web Riki. Nguồn là bản
PDF "Kanji mới" của buổi (`kanji-moi-bai-26-1.pdf` → thư mục `01-phan-1`, tên "Kanji mới ·
Phần 1"). PDF không in nghĩa riêng của chữ và số nét nên hai cột đó để trống.

| Thư mục                       | Tên                | Nội dung                                          |
| ----------------------------- | ------------------ | ------------------------------------------------- |
| `bai-26/kanji/01-phan-1`      | Kanji mới · Phần 1 | 8 chữ: 家 族 兄 弟 姉 妹 私 育                      |

`meta.json` của mỗi bài ghi `description` là một dòng **tóm tắt bài học gì** — trang bài
hiện nó ngay dưới tên bài, nên đọc một dòng đó là biết bài gồm những chữ nào và chúng
giống nhau ở đâu.

## Bài tập về nhà

BTVN là bài **con** của một bài kanji, đúng như BTVN bên phần Từ vựng: `meta.json` khai
`"kind": "test"` và `"parent"` là id bài mẹ, file dữ liệu tên `test.json`. Bài con không
hiện ở danh sách phần KANJI mà hiện thành một nút trên trang bài mẹ, và breadcrumb đi qua
bài mẹ. Cách viết câu hỏi (`promptReading`, `choicesVietnamese`, `choiceNotes`…) xem mục
"Bài tập về nhà" trong README ở gốc dự án.

Bài kanji không chia cụm như bài từ vựng nên `"group"` để trống: một bài mẹ, một BTVN.

Bài mới thì tạo thư mục `02-bai-2/` gồm `meta.json` (`"name": "Bài 2"`, `"order": 2`) và
`kanji.txt`, rồi chạy `npm run generate`.
