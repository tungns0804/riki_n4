# Định dạng bài đọc hiểu

File `reading.json`:

```json
{
  "passages": [
    {
      "title": "Thông báo của thư viện",
      "paragraphs": ["Đoạn 1…", "Đoạn 2…"],
      "translation": ["Bản dịch đoạn 1…", "Bản dịch đoạn 2…"],
      "vocabulary": ["利用 (りよう),sử dụng", { "japanese": "貸出", "reading": "かしだし", "vietnamese": "cho mượn" }],
      "questions": [
        {
          "promptJapanese": "この文章の内容と合っているものはどれですか。",
          "prompt": "Câu nào đúng với nội dung bài đọc?",
          "choices": ["…", "…", "…", "…"],
          "answer": 2,
          "explanation": "Vì đoạn 2 nói rằng…"
        }
      ]
    }
  ]
}
```

- `paragraphs` nhận cả mảng đoạn lẫn một chuỗi dài có xuống dòng.
- `translation` mặc định ẨN trên giao diện, người học tự bấm hiện.
- `vocabulary` viết gọn được thành chuỗi `TIẾNG NHẬT (CÁCH ĐỌC),NGHĨA`.
- `answer` là SỐ THỨ TỰ của lựa chọn đúng (đếm từ 1), hoặc chính chuỗi đáp án.

## Bài đọc theo PDF "Đọc hiểu mới" của buổi học

PDF đọc hiểu của Riki (`oc-hieu-moi-bai-26.pdf`) gồm bài đọc (Kiến thức), bảng Từ mới,
問1 (○×) và 問2 (câu hỏi suy nghĩ, trả lời tự do). Chép thành MỘT bài
(`01-doc-hieu-moi/`, tên "Đọc hiểu mới · <tiêu đề bài đọc>"):

- `paragraphs`: mỗi lượt nói một đoạn; câu hỏi của người phỏng vấn giữ dấu `—` ở đầu như
  PDF. Hai dòng in liền nhau của cùng một câu trả lời gộp thành một đoạn.
- `translation`: dịch từng đoạn, cùng số đoạn.
- `vocabulary`: bảng Từ mới, đúng thứ tự PDF, thêm cách đọc cho từ có chữ Hán.
- 問1 ○× thành câu hỏi hai lựa chọn `○（正しい）` / `×（正しくない）`; `prompt` là bản dịch
  câu nhận định. PDF không in đáp án nên đáp án tự chấm theo bài đọc, `explanation`
  trích câu trong bài làm căn cứ.
- Bỏ qua 問2: câu hỏi mở, không chấm được.
