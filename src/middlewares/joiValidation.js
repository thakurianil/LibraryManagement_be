import Joi from "joi";

const STR = Joi.string();
const STR_REQUIRED = STR.required();
const PHONE = STR.allow("", null);
const EMAIL = STR.email({ minDomainSegments: 2 });
const ISTRUE = Joi.boolean().allow(null);
const NUM_REQ = Joi.number();

const joiValidator = ({ req, res, next, schema }) => {
  try {
    const { error } = schema.validate(req.body);
    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};

export const newUserValidation = (req, res, next) => {
  const schema = Joi.object({
    fName: STR_REQUIRED,
    lName: STR_REQUIRED,
    phone: PHONE,
    email: EMAIL,
    password: STR_REQUIRED,
  });
  return joiValidator({ req, res, next, schema });
};

export const newBookValidation = (req, res, next) => {
  const schema = Joi.object({
    title: STR_REQUIRED,
    author: STR_REQUIRED,
    // thumbnail: STR_REQUIRED,
    isbn: STR_REQUIRED,
    publishedYear: Joi.number(),
    description: STR_REQUIRED,
  });
  return joiValidator({ req, res, next, schema });
};

export const updateBookValidation = (req, res, next) => {
  const schema = Joi.object({
    status: STR_REQUIRED,
    title: STR_REQUIRED,
    author: STR_REQUIRED,
    thumbnail: STR_REQUIRED,
    publishedYear: Joi.number(),
    description: STR_REQUIRED,
    isAvailable: ISTRUE,
    expectedAvailable: Joi.date().allow(null, ""),
  });
  return joiValidator({ req, res, next, schema });
};

// ============= Borrow validation

export const newBorrowValidation = (req, res, next) => {
  const schema = Joi.object({
    bookId: STR_REQUIRED,
    bookTitle: STR_REQUIRED,
    thumbnail: STR_REQUIRED,
  });
  return joiValidator({ req, res, next, schema });
};

// ============= Review validation

export const newReviewValidation = (req, res, next) => {
  const schema = Joi.object({
    bookId: STR_REQUIRED,
    bookTitle: STR_REQUIRED,
    borrowId: STR_REQUIRED,
    message: STR_REQUIRED,
    ratings: NUM_REQ,
    tilte: STR_REQUIRED,
    userId: STR_REQUIRED,
    thumbnail: STR_REQUIRED,
  });
  return joiValidator({ req, res, next, schema });
};
