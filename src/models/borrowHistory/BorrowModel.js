import BorrowSchema from "./BorrowSchema.js";

// insert
export const insertBorrow = (obj) => {
  return BorrowSchema(obj).save();
};

//Read all for the admin || public
export const getAllBorrows = (filter) => {
  return BorrowSchema.find(filter);
};

// get borrow by Id
export const getABorrowById = (_id) => {
  return BorrowSchema.findById(_id);
};

// update borrow by id
export const updateABorrowById = (_id, obj) => {
  return BorrowSchema.findByIdAndUpdate(_id, obj);
};

// delete borrow by id
export const deleteABorrowById = (_id) => {
  return BorrowSchema.findByIdAndDelete(_id);
};
