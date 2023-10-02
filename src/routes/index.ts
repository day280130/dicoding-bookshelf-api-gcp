import { ServerRoute, ReqRefDefaults } from "@hapi/hapi";
import { BooksRoutes } from "@src/routes/books.js";

const path = "/";

export const routes: ServerRoute<ReqRefDefaults>[] = [
  ...BooksRoutes,
  {
    method: "*",
    path: `${path}{any*}`,
    handler: (req, h) => {
      return h.response("Rute tidak ditemukan").code(404);
    },
  },
];
