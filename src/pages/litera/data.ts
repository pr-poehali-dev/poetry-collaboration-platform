export const HERO_IMG = "https://cdn.poehali.dev/projects/c594449b-200e-4beb-9cd7-c1f851b856f4/files/4ca2d958-22fa-4e64-a36c-d895cdfa827b.jpg";
export const AUTHOR_IMG = "https://cdn.poehali.dev/projects/c594449b-200e-4beb-9cd7-c1f851b856f4/files/a97ec54a-2d65-4949-b30d-58f1bf6aaf30.jpg";
export const MUSIC_IMG = "https://cdn.poehali.dev/projects/c594449b-200e-4beb-9cd7-c1f851b856f4/files/d5e42bf7-b32a-4a65-a358-5bf1ea8d2f88.jpg";

export type Section = "home" | "profile" | "poems" | "books" | "music" | "authors" | "about" | "contacts";

export const navItems: { id: Section; label: string }[] = [
  { id: "home", label: "Главная" },
  { id: "poems", label: "Стихотворения" },
  { id: "books", label: "Книги" },
  { id: "music", label: "Музыка" },
  { id: "authors", label: "Авторы" },
  { id: "about", label: "О нас" },
  { id: "contacts", label: "Контакты" },
];

export const poems = [
  { id: 1, title: "Осенний вечер", author: "Анна Светлова", preview: "Листья падают, как строки стихов,\nВ тишине — лишь шёпот ветра...", likes: 142, favorited: false, category: "Лирика" },
  { id: 2, title: "Городская ночь", author: "Михаил Горин", preview: "Фонари горят, как звёзды вниз,\nАсфальт блестит под летним дождём...", likes: 89, favorited: true, category: "Философия" },
  { id: 3, title: "Первый снег", author: "Елена Вишнева", preview: "Белый холст — и мир молчит,\nЗима рисует без спешки...", likes: 203, favorited: false, category: "Природа" },
  { id: 4, title: "Море внутри", author: "Дмитрий Крылов", preview: "Внутри меня — шторм и штиль,\nИ берег, что не найти...", likes: 176, favorited: false, category: "Лирика" },
  { id: 5, title: "Письма в никуда", author: "Анна Светлова", preview: "Пишу слова, что не дойдут,\nВкладываю в конверт из снов...", likes: 118, favorited: true, category: "Любовь" },
  { id: 6, title: "Тишина говорит", author: "Игорь Тёмный", preview: "Когда замолкают все слова,\nТишина начинает петь...", likes: 95, favorited: false, category: "Философия" },
];

export const books = [
  { id: 1, title: "Осколки рассвета", author: "Анна Светлова", year: 2024, genre: "Поэзия", pages: 128, cover: AUTHOR_IMG, rating: 4.8 },
  { id: 2, title: "Городские хроники", author: "Михаил Горин", year: 2023, genre: "Проза", pages: 312, cover: HERO_IMG, rating: 4.5 },
  { id: 3, title: "Между строк", author: "Елена Вишнева", year: 2024, genre: "Эссе", pages: 204, cover: MUSIC_IMG, rating: 4.7 },
  { id: 4, title: "Северные мотивы", author: "Дмитрий Крылов", year: 2022, genre: "Поэзия", pages: 96, cover: AUTHOR_IMG, rating: 4.6 },
];

export const musicians = [
  { id: 1, title: "Листопад", artist: "Анна Светлова", duration: "3:42", genre: "Романс", plays: "12.4к" },
  { id: 2, title: "Ночной город", artist: "Михаил Горин", duration: "4:18", genre: "Инди", plays: "8.7к" },
  { id: 3, title: "Снежный вальс", artist: "Елена Вишнева", duration: "2:55", genre: "Классика", plays: "19.2к" },
  { id: 4, title: "Морской бриз", artist: "Дмитрий Крылов", duration: "5:01", genre: "Медитация", plays: "6.3к" },
  { id: 5, title: "Письмо осени", artist: "Анна Светлова", duration: "3:27", genre: "Романс", plays: "15.8к" },
];

export const authors = [
  { id: 1, name: "Анна Светлова", bio: "Поэт, прозаик. Лауреат премии «Золотое перо».", works: 34, followers: "2.1к", avatar: AUTHOR_IMG },
  { id: 2, name: "Михаил Горин", bio: "Городская проза, философская лирика.", works: 18, followers: "1.4к", avatar: HERO_IMG },
  { id: 3, name: "Елена Вишнева", bio: "Музыкант, поэт. Природная лирика.", works: 27, followers: "3.2к", avatar: MUSIC_IMG },
  { id: 4, name: "Дмитрий Крылов", bio: "Философ, поэт. Морские мотивы.", works: 15, followers: "980", avatar: AUTHOR_IMG },
];
