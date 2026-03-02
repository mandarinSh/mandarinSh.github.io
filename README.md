# Dummy table

This repo contains a page login and page with table of products from Dummy https://dummyjson.com/docs/products.

Use https://dummyjson.com/users credentials for login.

Project uses React, TypeScript, MUI, Zustand, React Query (Tanstack).

### Features of the presentation include:

- Login using credentials from https://dummyjson.com/docs/products.
- Look at the table of products.

## Development

This app was built using [Vite](https://vitejs.dev/) for development.

### Installation

Before you start, you need to install the dependencies:

```sh
npm install
```

### Spin up a dev server

```sh
npm run dev
```

### Build

```sh
npm run build
```

---

## Функциональные требования

### Форма входа

- **Валидация полей** — все поля обязательны для заполнения
- **Обработка ошибок** — при ошибке API отображается уведомление под полями формы
- **Запоминание сессии:**
  - Чекбокс установлен — токен сохраняется в `localStorage`, сессия живёт после закрытия браузера
  - Чекбокс снят — токен хранится в `sessionStorage`, сессия сбрасывается при закрытии вкладки

### Таблица товаров

- **Отображение** — столбцы соответствуют макету Figma (наименование, вендор, артикул, оценка, цена)
- **Прогресс-бар** — линейный индикатор загрузки при подгрузке данных
- **Данные** — загружаются из API dummyjson.com
- **Сортировка** — по цене и рейтингу, состояние сортировки сохраняется в `sessionStorage`
- **Поиск** — реализован через API
- **Подсветка рейтинга** — если рейтинг товара ниже 3, значение выделяется красным цветом

### Добавление товара

- По нажатию кнопки «Добавить» открывается диалог с полями: наименование, цена, вендор, артикул
- При успешном добавлении отображается Toast-уведомление
- Сохранение через API не выполняется

---

## Functional Requirements

### Login Form

- **Field validation** — all fields are required
- **Error handling** — API errors are displayed as a notification below the form fields
- **Session persistence:**
  - Checkbox checked — token is stored in `localStorage`, session survives browser restart
  - Checkbox unchecked — token is stored in `sessionStorage`, session resets when the tab is closed

### Product Table

- **Display** — columns match the Figma mockup (name, vendor, SKU, rating, price)
- **Progress bar** — linear loading indicator while fetching data
- **Data** — loaded from the dummyjson.com API
- **Sorting** — by price and rating, sort state is persisted in `sessionStorage`
- **Search** — implemented via API
- **Rating highlight** — values below 3 are highlighted in red

### Add Product

- Clicking the "Add" button opens a dialog with fields: name, price, vendor, SKU
- A Toast notification is shown on successful submission
- No actual API persistence is performed
