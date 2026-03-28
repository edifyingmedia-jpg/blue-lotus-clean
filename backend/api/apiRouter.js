import express from "express";
import twin from "./twin.js";

const apiRouter = express.Router();

// TWIN API
apiRouter.use("/twin", twin);

export default apiRouter;
