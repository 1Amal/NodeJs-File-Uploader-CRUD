import { validationResult } from "express-validator";
import { prismaClientInstance } from "../db/prismaQuery.js";

export async function getHome(req, res, next) {
  res.render("index");
}

export async function getFileUpload(req, res, next) {
  res.render("uploadFiles");
}

export async function postUploadFiles(req, res, next) {
  console.log(req.file);

  res.render("fileuploaded", { uploadedFileDetails: req.file });
}

export async function authenticateUser(req, res, next) {
  try {
    const userSubmittedDetails = {
      user_name: req.body.user_name,
      password: req.body.password,
    };
    // console.log(userSubmittedDetails);
    res.render("uploadFiles");
    next();
  } catch (err) {
    next(err);
  }
}

export async function getNotAuthorized(req, res, next) {
  res.render("notAuthorized");
}

export async function formValidationSignIn(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("error", {
        errors: errors.array(),
      });
    }
    next();
  } catch (err) {
    next(err);
  }
}

export async function currentFileList(req, res, next) {
  try {
    const currentFileList = await prismaClientInstance.FileDetails.findMany();
    console.log(currentFileList);
    res.render("uploadFiles",{currentFileList:currentFileList});
  } catch (err) {
    next(err);
  }
}
