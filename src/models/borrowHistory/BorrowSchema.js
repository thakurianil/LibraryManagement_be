// "_id": "ObjectId",
// "userId": "ObjectId",
// "bookId": "ObjectId",
// "borrowDate": "Date",
// "dueDate": "Date",
// "returnDate": "Date",
// "status": "string" // "borrowed" or "returned",

import mongoose, { now } from "mongoose";

const borrowSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookId: {
      type: mongoose.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    isReturned: {
      type: Boolean,
      default: false,
    },
    borrowDate: {
      type: Date,
      default: Date.now,
    },
    bookTitle: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      default: "",
    },
    returnedDate: {
      type: Date,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Borrow", borrowSchema);
