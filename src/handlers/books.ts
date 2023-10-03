import { reqHandler } from "@src/handlers/types.js";
import { bookSchema, books } from "@src/models/books.js";
import { randomUUID } from "crypto";

const postBookPayloadSchema = bookSchema.omit({ id: true, finished: true, insertedAt: true, updatedAt: true });
const postBook: reqHandler = (req, h) => {
  const parsedPayload = postBookPayloadSchema.safeParse(req.payload);

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

export const bookHandlers = {
  postBook,
  getAllBooks,
};
