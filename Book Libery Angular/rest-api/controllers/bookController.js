const { bookModel } = require('../models');
const { userModel } = require('../models')

function getBooks(req, res, next) {
    bookModel.find()
        .populate('userId')
        .then(books => res.json(books))
        .catch(next);
}

function getBook(req, res, next) {
    const { bookId } = req.params;

    bookModel.findById(bookId)
        .populate({
              path : 'userId'
          })
        .then(book => res.json(book))
        .catch(next);
}

function createBook(req, res, next) {
    const { title, description, imageUrl, type } = req.body;
    const { _id: userId } = req.user;
    console.log('create')
    bookModel.create({ title, description, imageUrl, type, userId })
    .then(post => {
        return Promise.all([
            userModel.updateOne({ id: userId }),
        ])
        .then(book => {
            res.status(200).json(book)
        })
         
    })
        .catch(next);
}

function getMyBooks(req, res, next) {
    const { _id: userId } = req.user;
    bookModel.find()
        .populate('userId')
        .then((books) =>{
            
            const ownerOFBooks = books.filter(x => x._id = userId)
            return res.json(ownerOFBooks)
        })
        .catch(next);
}

// function subscribe(req, res, next) {
//     const bookId = req.params.bookId;
//     const { _id: userId } = req.user;
//     bookModel.findByIdAndUpdate({ _id: bookId }, { $addToSet: { subscribers: userId } }, { new: true })
//         .then(updatedBook => {
//             res.status(200).json(updatedBook)
//         })
//         .catch(next);
// }

module.exports = {
    getBooks,
    createBook,
    getBook,
    getMyBooks
   
}
