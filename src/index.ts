import { server } from "@src/configs/server.js";
import "dotenv-safe/config.js";

// server.route(routes);

await server.start();
console.log(`Server berjalan pada ${server.info.uri}`);
