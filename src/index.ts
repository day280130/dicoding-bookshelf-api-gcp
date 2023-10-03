import "dotenv-safe/config.js";
import { server } from "@src/configs/server.js";
import { routes } from "@src/routes/index.js";

server.route(routes);

await server.start();
console.log(`Server berjalan pada ${server.info.uri}`);
