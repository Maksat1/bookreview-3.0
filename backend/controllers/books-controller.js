const MongoClient = require('mongodb').MongoClient
const Book = require('../model/Book')
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wpvcli3.mongodb.net/?retryWrites=true&w=majority`
const { ObjectId } = require('mongodb');


// Create a new MongoClient
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Function to connect to the MongoDB cluster and return the books collection
const getBooksCollection = async () => {
    await client.connect(); // Connect to the MongoDB cluster
    const collection = client.db('booksdb').collection('booksdb'); // Access the books collection
    return collection;
};

// Get the book list available in the shop. async
const getAllBooks = async (req, res, next) => {
    try {
        const collection = await getBooksCollection()// collection.find().toArray() // Find all documents in the books collection
        const books = await collection.find().toArray() // Find all documents in the books collection   

        if (books.length === 0) {
            return res.status(404).json({ message: 'No books found' })
        }
        return res.status(200).json(books)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Server Error' });
    }
}

const getBookById = async (req, res, next) => {
    const id = req.params.id
    let bookById
    try {
        const collection = await getBooksCollection()
        bookById = await collection.findOne({ _id: new ObjectId(id) })
    } catch (err) {
        console.log(err)
    }
    if (!bookById) {
        return res.status(404).json({ message: 'No book found' })
    }
    return res.status(200).json({ bookById })
}

const updateBook = async (req, res, next) => {
    const id = req.params.id;
    const { isbn, title, author, image } = req.body;
    let book;
    try {
        const collection = await getBooksCollection()
        book = await collection.findOne({ _id: new ObjectId(id) })
        console.log(book, 'book')
        if (book) {
            await collection.updateOne({ _id: new ObjectId(id) }, { $set: { isbn, title, author, image } })
            // book = await collection.findOne({ _id: new ObjectId(id) })
            return res.status(200).json({ message: "Book Updated" });
        } else {
            return res.status(404).json({ message: "Unable To Update By this ID" });
        }
    } catch (err) {
        console.log(err);
    }
}

const deleteBook = async (req, res, next) => {
    const id = req.params.id;
    let book;
    try {
        const collection = await getBooksCollection()
        book = await collection.findOne({ _id: new ObjectId(id) })
        if (book) {
            await collection.deleteOne({ _id: new ObjectId(id) })
            return res.status(200).json({ message: "Book Deleted" });
        } else {
            return res.status(404).json({ message: "Unable To Delete By this ID" });
        }
    } catch (err) {
        console.log(err);
    }
}

const addBook = async (req, res) => {
    try {
        const { isbn, title, author, image } = req.body
        const book = new Book({ title, author, isbn, image })
        const collection = await getBooksCollection(); // Получение коллекции

        let result = await collection.insertOne(book);

        if (result) {
            return res.status(201).json({ book });
        } else {
            return res.status(500).json({ message: "Unable To Add" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server Error" });
    }

    // need to add check if the book is already in the database
}

exports.getAllBooks = getAllBooks
exports.addBook = addBook
exports.deleteBook = deleteBook
exports.getBookById = getBookById
exports.updateBook = updateBook
