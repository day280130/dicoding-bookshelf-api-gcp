import { reqHandler } from "@src/handlers/types.js";
import { bookSchema, books } from "@src/models/books.js";
import { randomUUID } from "crypto";
import { z } from "zod";

const payloadSchema = bookSchema.omit({ id: true, finished: true, insertedAt: true, updatedAt: true });

const paramSchema = bookSchema.pick({ id: true });

const queryParamsSchema = z.object({
  finished: z
    .enum(["0", "1"])
    .transform(finished => finished === "1")
    .optional(),
  reading: z
    .enum(["0", "1"])
    .transform(finished => finished === "1")
    .optional(),
  name: bookSchema.shape.name.transform(name => name.toLowerCase()).optional(),
});

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

const getAllBooks: reqHandler = (req, h) => {
  const parsedQueries = queryParamsSchema.safeParse(req.query);
  if (!parsedQueries.success)
    return h.response({
      status: "fail",
      error: parsedQueries.error.format(),
    });

  let currentBooks = books;
  const { name: nameQuery, finished: finishedQuery, reading: readingQuery } = parsedQueries.data;

  if (nameQuery) currentBooks = currentBooks.filter(book => book.name.toLowerCase().includes(nameQuery));

  if (finishedQuery !== undefined) currentBooks = currentBooks.filter(book => book.finished === finishedQuery);

  if (readingQuery !== undefined) currentBooks = currentBooks.filter(book => book.reading === readingQuery);

  return h.response({
    status: "success",
    data: {
      books: currentBooks.length <= 0 ? [] : currentBooks.map(({ id, name, publisher }) => ({ id, name, publisher })),
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

const deleteBook: reqHandler = (req, h) => {
  const parsedParams = paramSchema.safeParse(req.params);
  if (!parsedParams.success)
    return h
      .response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan",
        error: parsedParams.error.format().id,
      })
      .code(404);

  const bookIndex = books.findIndex(book => book.id === parsedParams.data.id);
  if (bookIndex < 0)
    return h
      .response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan",
      })
      .code(404);

  books.splice(bookIndex, 1);

  return h.response({
    status: "success",
    message: "Buku berhasil dihapus",
  });
};

export const bookHandlers = {
  postBook,
  getAllBooks,
  getBookById,
  putBook,
  deleteBook,
};
