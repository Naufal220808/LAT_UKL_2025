import express from "express";

import usersRoutes from "./Routes/user.route.js";
import LoginRoutes from "./Routes/login.route.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use("api/user", usersRoutes);
app.use("api/auth", LoginRoutes);
app.listen(port, () => console.log(`EXAMPLE APP LISTENING ON PORT ${port}!`));