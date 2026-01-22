Вставка данных о двух книгах в коллекцию:

db.books.insertMany([
  {
    title: 'Vlastelin Kolec',
    description: 'Приключения хоббитов и других жителей средиземноморья',
    authors: 'Tolkien',
  },
  {
    title: 'Сталкер',
    description: 'Фантастический роман о зонах и отважном сталкере',
    authors: 'Стругацкий',
  },
])

Запрос для поиска полей документов коллекции books по полю title:

db.books.find({ title: "Название книги"})

Запрос для редактирования полей description и authors коллекции books по _id записи:

db.books.updateOne(
    {
        _id: ObjectId("Нужный идентификатор")
    },
    {
        $set: {
            description: "Новое описание",
            authors: "Новый автор"
        }
    }
)

