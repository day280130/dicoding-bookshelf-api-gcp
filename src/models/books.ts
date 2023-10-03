import { z } from "zod";

export const bookSchema = z.object({
  id: z.string({
    invalid_type_error: "id must be string",
    required_error: "id required",
  }),
  name: z.string({
    invalid_type_error: "id must be string",
    required_error: "id required",
  }),
  year: z.coerce
    .number({
      invalid_type_error: "year must be number",
      required_error: "year required",
    })
    .gte(0, "year cannot be negative"),
  author: z.string({
    invalid_type_error: "author must be string",
    required_error: "author required",
  }),
  summary: z.string({
    invalid_type_error: "summary must be string",
    required_error: "summary required",
  }),
  publisher: z.string({
    invalid_type_error: "publisher must be string",
    required_error: "publisher required",
  }),
  pageCount: z.coerce
    .number({
      invalid_type_error: "pageCount must be number",
      required_error: "pageCount required",
    })
    .gte(0, "pageCount cannot be negative"),
  readPage: z.coerce
    .number({
      invalid_type_error: "readPage must be number",
      required_error: "readPage required",
    })
    .gte(0, "readPage cannot be negative"),
  finished: z.coerce.boolean({
    invalid_type_error: "finished must be booleanish value",
  }),
  reading: z.coerce.boolean({
    invalid_type_error: "reading must be booleanish value",
  }),
  insertedAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Book = z.infer<typeof bookSchema>;

export const books: Book[] = [];
