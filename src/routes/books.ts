import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";

const path = "/books";

export const BooksRoutes: ServerRoute<ReqRefDefaults>[] = [
  {
    method: "POST",
    path: `${path}`,
  },
];
