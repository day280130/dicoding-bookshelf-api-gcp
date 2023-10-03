import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
import { bookHandlers } from "@src/handlers/books.js";

const path = "/books";

export const BooksRoutes: ServerRoute<ReqRefDefaults>[] = [
  {
    method: "POST",
    path: `${path}`,
    handler: bookHandlers.postBook,
  },
];
