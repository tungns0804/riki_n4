import { InjectionToken } from '@angular/core';

import type { MessageKey } from '../i18n/messages';
import { MODULE_IDS, ModuleId, UnitKind } from '../models/content.model';

/**
 * Định nghĩa các học phần và các phần học của chúng.
 *
 * Đây là chỗ DUY NHẤT mô tả một phần học: đường dẫn, biểu tượng, khoá thông điệp,
 * hình dạng dữ liệu và tên thư mục nguồn. Thanh điều hướng, trang chủ và bộ định
 * tuyến đều đọc từ đây, nên thêm một phần mới là thêm một dòng ở bảng dưới chứ không
 * phải sửa năm chỗ. Script sinh nội dung giữ một bản sao ngắn (không import được file
 * TypeScript) — xem `COURSES` trong scripts/generate-content.mjs.
 */

export interface CourseDef {
  /**
   * Cũng là đoạn đầu của địa chỉ (`/bai-26/vocabulary`) và tên thư mục nội dung
   * (`data-source/bai-26/`, `public/content/bai-26/`).
   */
  id: string;
  /**
   * Biểu tượng trên thẻ, cùng kiểu với thẻ phần học: một chữ Hán, hoặc số bài với học
   * phần là một bài học của Riki (`26`) — mười mấy bài cùng một chữ 課 thì không phân
   * biệt được bài nào với bài nào.
   */
  icon: string;
  /** Tên đầy đủ: thẻ ở trang gốc, tiêu đề trang của học phần, tiêu đề tab. */
  nameKey: MessageKey;
  /**
   * Tên ngắn cho chỗ chỉ đủ một dòng: thanh bên, nút chọn học phần trên breadcrumb.
   * Tên bài của Riki ("Bài 26 : Cách hình thành và sử dụng んです") không vừa mấy chỗ đó.
   */
  shortKey: MessageKey;
  descKey: MessageKey;
  /** 'active' = đang học được; 'soon' = đã có trong lộ trình của Riki nhưng chưa làm. */
  status: 'active' | 'soon';
  /**
   * Các phần học của học phần, theo thứ tự trên menu. Học phần "Sắp có" để rỗng.
   *
   * Khai theo từng học phần chứ không dùng chung bảy phần: BTVN chỉ là bài tập về
   * nhà, hiện đủ bảy thẻ thì sáu thẻ nằm "chưa có nội dung" mãi mãi, và người học
   * tưởng học phần đang soạn dở.
   */
  modules: readonly ModuleId[];
  /**
   * Tên riêng của phần học trong học phần này, đè lên `labelKey` chung của MODULES.
   *
   * Bài học của Riki gọi phần học theo tên mục trên web ("Từ Vựng Cải Thiện",
   * "Kanji - Hiền sensei"), còn tên chung là "Từ vựng", "KANJI". Chỉ đè tên đầy đủ:
   * thanh bên vẫn dùng tên ngắn chung, tên đầy đủ hiện khi rê chuột.
   */
  moduleLabels?: Partial<Record<ModuleId, MessageKey>>;
}

/**
 * Các mục của một bài học trên web Riki, đúng thứ tự trong bài, và tên Riki đặt cho
 * từng mục. Mọi bài (Bài 26, Bài 27…) dùng chung.
 *
 * Riki còn hai mục "Luyện Tập" và "Kaiwa - Giáo Viên Nhật": chưa có loại phần học nào
 * chứa được, thêm khi có nội dung đầu tiên của chúng.
 */
const LESSON_MODULES: readonly ModuleId[] = ['vocabulary', 'kanji', 'grammar', 'reading', 'listening'];

const LESSON_MODULE_LABELS: Partial<Record<ModuleId, MessageKey>> = {
  vocabulary: 'lesson.vocabulary.label',
  kanji: 'lesson.kanji.label',
  grammar: 'lesson.grammar.label',
  reading: 'lesson.reading.label',
  listening: 'lesson.listening.label',
};

/**
 * Các học phần, đúng thứ tự Riki liệt kê: bài kiểm tra nhập môn N4, rồi từng bài học
 * (Bài 26…) — mỗi bài một học phần, các mục của bài là các phần học của nó.
 *
 * Bài kiểm tra nhập môn là một học phần riêng chỉ có phần Kiểm tra, đứng ngang hàng với
 * các bài học ở trang gốc. Trước đây nó là một phần học của học phần "Khoá N4"; học phần
 * đó đã bỏ vì sáu phần còn lại chỉ có bài mẫu.
 *
 * Học phần chưa làm VẪN hiện trong bộ chọn, mờ đi kèm nhãn "Sắp có": người học phải
 * thấy trang gồm những học phần nào ngay từ đầu, ẩn đi thì trang trông như chỉ có
 * đúng những khoá đã làm.
 */
export const COURSES: readonly CourseDef[] = [
  {
    id: 'kiem-tra-nhap-mon',
    icon: '試',
    nameKey: 'course.kiem-tra-nhap-mon.name',
    shortKey: 'course.kiem-tra-nhap-mon.short',
    descKey: 'course.kiem-tra-nhap-mon.desc',
    status: 'active',
    modules: ['entrance-test'],
  },
  {
    id: 'bai-26',
    icon: '26',
    nameKey: 'course.bai-26.name',
    shortKey: 'course.bai-26.short',
    descKey: 'course.bai-26.desc',
    status: 'active',
    modules: LESSON_MODULES,
    moduleLabels: LESSON_MODULE_LABELS,
  },
];

/** Học phần dùng khi địa chỉ không nói gì và trình duyệt cũng chưa nhớ học phần nào. */
export const DEFAULT_COURSE: CourseDef = COURSES[0];

/** Học phần ĐANG HỌC ĐƯỢC có id này; null nếu không có, hoặc mới ở mức "Sắp có". */
export function courseById(id: unknown): CourseDef | null {
  return COURSES.find((course) => course.id === id && course.status === 'active') ?? null;
}

/**
 * Chỗ đến khi chọn một học phần: thẻ ở trang gốc, menu ở trang gốc, bộ chọn học phần.
 *
 * Học phần chỉ có MỘT phần học (Bài kiểm tra nhập môn) thì vào thẳng phần đó: trang của
 * học phần chỉ có đúng một thẻ cùng tên, bấm qua nó là một cú bấm thừa.
 */
export function courseEntryLink(course: CourseDef): string[] {
  return course.modules.length === 1
    ? ['/', course.id, moduleOf(course.modules[0]).path]
    : ['/', course.id];
}

/**
 * Học phần của cây route đang mở, cấp ở route cha của từng học phần (xem app.routes.ts).
 *
 * Đi qua DI chứ không qua input của route: ContentStore, ProgressStore và các guard
 * cũng cần biết học phần, mà chúng không có input nào để nhận.
 */
export const COURSE = new InjectionToken<CourseDef>('COURSE');

export interface ModuleDef {
  id: ModuleId;
  /** Đoạn địa chỉ sau học phần, ví dụ `vocabulary` trong `/bai-26/vocabulary`. */
  path: string;
  /** Một chữ Hán làm biểu tượng. Chọn chữ nói đúng nội dung phần đó. */
  icon: string;
  labelKey: MessageKey;
  /** Nhãn ngắn dùng trên thanh điều hướng, nơi không đủ chỗ cho tên đầy đủ. */
  shortKey: MessageKey;
  descKey: MessageKey;
  /** Khoá đếm số bài, ví dụ "12 bài" / "3 bài đọc". */
  unitKey: MessageKey;
  kind: UnitKind;
  /** Thư mục nguồn trong `data-source/<học phần>/`. */
  folder: string;
  /**
   * Phần này có màn hình luyện tập sinh câu hỏi từ dữ liệu không.
   *
   * Từ vựng / kanji / ngữ pháp thì có: câu hỏi dựng được từ chính bảng dữ liệu.
   * Đọc, nghe và bài kiểm tra thì không cần — câu hỏi đã nằm sẵn trong nội dung.
   */
  practice: boolean;
}

export const MODULES: readonly ModuleDef[] = [
  {
    id: 'entrance-test',
    path: 'test',
    icon: '試',
    labelKey: 'module.entrance-test.label',
    shortKey: 'module.entrance-test.short',
    descKey: 'module.entrance-test.desc',
    unitKey: 'module.entrance-test.unit',
    kind: 'test',
    folder: 'entrance-test',
    practice: false,
  },
  {
    id: 'vocabulary',
    path: 'vocabulary',
    icon: '語',
    labelKey: 'module.vocabulary.label',
    shortKey: 'module.vocabulary.short',
    descKey: 'module.vocabulary.desc',
    unitKey: 'module.vocabulary.unit',
    kind: 'vocabulary',
    folder: 'vocabulary',
    practice: true,
  },
  {
    id: 'kanji',
    path: 'kanji',
    icon: '漢',
    labelKey: 'module.kanji.label',
    shortKey: 'module.kanji.short',
    descKey: 'module.kanji.desc',
    unitKey: 'module.kanji.unit',
    kind: 'kanji',
    folder: 'kanji',
    practice: true,
  },
  {
    id: 'grammar',
    path: 'grammar',
    icon: '文',
    labelKey: 'module.grammar.label',
    shortKey: 'module.grammar.short',
    descKey: 'module.grammar.desc',
    unitKey: 'module.grammar.unit',
    kind: 'grammar',
    folder: 'grammar',
    practice: true,
  },
  {
    id: 'reading',
    path: 'reading',
    icon: '読',
    labelKey: 'module.reading.label',
    shortKey: 'module.reading.short',
    descKey: 'module.reading.desc',
    unitKey: 'module.reading.unit',
    kind: 'reading',
    folder: 'reading',
    practice: false,
  },
  {
    id: 'listening',
    path: 'listening',
    icon: '聴',
    labelKey: 'module.listening.label',
    shortKey: 'module.listening.short',
    descKey: 'module.listening.desc',
    unitKey: 'module.listening.unit',
    kind: 'listening',
    folder: 'listening',
    practice: false,
  },
  {
    id: 'mimikara',
    path: 'mimikara',
    icon: '耳',
    labelKey: 'module.mimikara.label',
    shortKey: 'module.mimikara.short',
    descKey: 'module.mimikara.desc',
    unitKey: 'module.mimikara.unit',
    // Cùng hình dạng dữ liệu với phần Ngữ pháp nên dùng chung màn hình chi tiết;
    // tách thành hai module vì đây là giáo trình khác, học song song chứ không nối tiếp.
    kind: 'grammar',
    folder: 'mimikara',
    practice: true,
  },
];

const BY_ID = new Map<ModuleId, ModuleDef>(MODULES.map((module) => [module.id, module]));

export function moduleOf(id: ModuleId): ModuleDef {
  const found = BY_ID.get(id);
  // MODULES phủ hết MODULE_IDS nên nhánh này không xảy ra; ném lỗi rõ ràng còn hơn
  // trả về undefined rồi hỏng ở một chỗ xa tít phía sau.
  if (!found) throw new Error(`Module không có trong cấu hình: ${id}`);
  return found;
}

/**
 * Một phần học như học phần này gọi nó: tên riêng trong `moduleLabels` (nếu có) đè lên
 * tên chung. Màn hình nào hiện tên phần học thì lấy phần học qua đây, không qua
 * `moduleOf`.
 */
export function moduleIn(course: CourseDef, id: ModuleId): ModuleDef {
  const module = moduleOf(id);
  const labelKey = course.moduleLabels?.[id];
  return labelKey ? { ...module, labelKey } : module;
}

/** Các phần học của một học phần, đúng thứ tự khai trong `modules`. */
export function modulesOf(course: CourseDef): ModuleDef[] {
  return course.modules.map((id) => moduleIn(course, id));
}

/** Kiểm tra lúc khởi động: mọi id khai trong model đều phải có định nghĩa ở đây. */
export const ALL_MODULES_DEFINED = MODULE_IDS.every((id) => BY_ID.has(id));
