import { getABookById, updateABookById } from "../models/books/BookModel.js";
import { insertBorrow } from "../models/borrowHistory/BorrowModel.js";

// Due date is 15 days from borrow date
const DUE_DURATION = 15;

export const createBorrowRecord = async (req, res, next) => {
  try {
    const { _id, name } = req.userInfo;

    const { bookId, bookTitle, thumbnail } = req.body;

    const dueDate = new Date(+new Date() + DUE_DURATION * 24 * 60 * 60 * 1000);

    const bookDatat = await getABookById(bookId);

    if (bookDatat) {
      if (bookDatat.isAvailable) {
        const obj = {
          userId: _id,
          bookId,
          bookTitle,
          thumbnail,
          dueDate,
        };
        const borrow = await insertBorrow(obj);

        if (borrow) {
          const bookBorrowed = await updateABookById(bookId, {
            isAvailable: false,
            expectedAvailable: dueDate,
          });

          return res.json({
            status: "success",
            message: "Book Borrowed Successfully",
          });
        }
      } else {
        const error = {
          status: 404,
          message: "Book already borrowed",
        };
        next(error);
      }
    } else {
      const error = {
        status: 404,
        message: "Book not found",
      };
      next(error);
    }
    // book available condition
  } catch (error) {
    next(error);
  }
};
