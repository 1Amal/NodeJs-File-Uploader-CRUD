import { Router } from "express";

import { getHome } from "../controllers/AppController.js";

import { ValidateUserLogin } from "../validators/signInFormValidation.js";

import {
  getFileUpload,
  authenticateUser,
  getNotAuthorized,
  formValidationSignIn,
} from "../controllers/AppController.js";

import { passportInstance } from "../security/passportConfig.js";
import passport from "passport";

const AppRouter = Router();

AppRouter.get("/", getHome);

// AppRouter.get("/uploadfiles", getFileUpload);

AppRouter.post(
  "/uploadfiles",
  ValidateUserLogin,
  formValidationSignIn,
  passport.authenticate("local", { failureRedirect: "/notauthorized" }),
  authenticateUser
);

AppRouter.get("/notauthorized", getNotAuthorized);

export default AppRouter;
