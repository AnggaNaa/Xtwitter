import { NextFunction, Request, Response } from "express";
import { func } from "joi";
import multer = require("multer");

export const upload = (fieldName: string) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
    },
  });

  const uploadFile = multer({ storage: storage });

  return (req: Request, res: Response, next: NextFunction) => {
    uploadFile.single(fieldName)(req, res, function (err) {
      if (err) {
        return res.status(400).json({ error: "File upload file." });
      }

      if (req.file) {
        res.locals.filename = req.file.filename;
      }
      next();
    });
  };
};
