import { reqHandler } from "@src/handlers/types.js";
import { bookSchema, books } from "@src/models/books.js";
import { randomUUID } from "crypto";

const payloadSchema = bookSchema.omit({ id: true, finished: true, insertedAt: true, updatedAt: true });

const paramSchema = bookSchema.pick({ id: true });

const postBook: reqHandler = (req, h) => {
  const parsedPayload = payloadSchema.safeParse(req.payload);

  if (!parsedPayload.success) {
    const error = parsedPayload.error.format();

    if (error.name)
      return h
        .response({
          status: "fail",
          message: "Gagal menambahkan buku. Mohon isi nama buku",
        })
        .code(400);

    return h.response({
      status: "fail",
      error,
    });
  }

  if (parsedPayload.data.readPage > parsedPayload.data.pageCount)
    return h
      .response({
        status: "fail",
        message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);

  const id = randomUUID();
  const finished = parsedPayload.data.pageCount === parsedPayload.data.readPage;
  const insertedAt = new Date().toISOString();

  books.push({
    ...parsedPayload.data,
    id,
    finished,
    insertedAt,
    updatedAt: insertedAt,
  });

  return h
    .response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    })
    .code(201);
};

const getAllBooks: reqHandler = (_req, h) => {
  return h.response({
    status: "success",
    data: {
      books: books.length <= 0 ? [] : books.map(({ id, name, publisher }) => ({ id, name, publisher })),
    },
  });
};

const getBookById: reqHandler = (req, h) => {
  const parsedParams = paramSchema.safeParse(req.params);
  if (!parsedParams.success)
    return h
      .response({
        status: "fail",
        message: "Buku tidak ditemukan",
        error: parsedParams.error.format().id,
      })
      .code(404);

  const book = books.find(book => book.id === parsedParams.data.id);
  if (!book)
    return h
      .response({
        status: "fail",
        message: "Buku tidak ditemukan",
      })
      .code(404);

  return h.response({
    status: "success",
    data: { book },
  });
};

const putBook: reqHandler = (req, h) => {
  const parsedPayload = payloadSchema.safeParse(req.payload);

  if (!parsedPayload.success) {
    const error = parsedPayload.error.format();

    if (error.name)
      return h
        .response({
          status: "fail",
          message: "Gagal memperbarui buku. Mohon isi nama buku",
        })
        .code(400);

    return h.response({
      status: "fail",
      error,
    });
  }

  if (parsedPayload.data.readPage > parsedPayload.data.pageCount)
    return h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);

  const parsedParams = paramSchema.safeParse(req.params);
  if (!parsedParams.success)
    return h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan",
        error: parsedParams.error.format().id,
      })
      .code(404);

  const bookIndex = books.findIndex(book => book.id === parsedParams.data.id);
  if (bookIndex < 0)
    return h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan",
      })
      .code(404);

  books[bookIndex] = {
    ...books[bookIndex],
    ...parsedPayload.data,
    updatedAt: new Date().toISOString(),
  };

  return h.response({
    status: "success",
    message: "Buku berhasil diperbarui",
  });
};

export const bookHandlers = {
  postBook,
  getAllBooks,
  getBookById,
  putBook,
};
