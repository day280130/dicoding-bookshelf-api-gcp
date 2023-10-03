import { Lifecycle, ReqRefDefaults } from "@hapi/hapi";

export type reqHandler = Lifecycle.Method<ReqRefDefaults, Lifecycle.ReturnValue<ReqRefDefaults>>;
