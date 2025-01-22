import express from "express";

import passport from "passport";

import { passportInstance } from "./security/passportConfig.js";

import { prismaSession } from "./security/prismaSession.js";

const app = express();

app.use(prismaSession);

app.use(passport.initialize());

app.use(passport.session());

import path from "node:path";
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

import dotenv from "dotenv";
dotenv.config();

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

import AppRouter from "./routes/appRouter.js";
app.use("/", AppRouter);

app.listen(process.env.APP_PORT || 3000, () => {
  console.log(`File Uploader Running on localhost:${process.env.APP_PORT}`);
});
