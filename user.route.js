import express from "express";

import {
    addUser,
    updateUser,
    findUser,
    userById,
} from "../Controllers/User.controller.js";
import { Authorize } from "../Controllers/auth.controller.js";
import { isKaryawan } from "../Middleware/roleValidation.js";

const app = express();

app.post("/", Authorize, isKaryawan, addUser);
app.put("/:id", Authorize, isKaryawan,updateUser);
app.get("/:id", userById);
app.get("/findwithfilter", findUser);

export default app;



