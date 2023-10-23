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
        return res.status(400).json({ err });
      }

      if (req.file) {
        res.locals.filename = req.file.filename;
        // res.locals[`${fieldName}_filename`] = req.file.filename;
        // res.locals.profile_picture = req.file.filename;
        // res.locals.profile_background = req.file.filename;
      }
      next();
    });
  };
};

// export const uploadMultiple = (fieldNames: string[]) => {
//   const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "./uploads/");
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now();
//       cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
//     },
//   });

//   const uploadFile = multer({ storage: storage });

//   // return uploadFile.array(fieldNames);
//   // return (req: Request, res: Response, next: NextFunction) => {
//   //   uploadFile.array(fieldNames)(req, res, function (err) {
//   //     if (err) {
//   //       return res.status(400).json({ err });
//   //     }
//   //     next();
//   // });
//   // };
//   return (req: Request, res: Response, next: NextFunction) => {
//     uploadFile.fields(fieldNames.map((fieldName) => ({ name: fieldName })))(
//       req,
//       res,
//       function (err) {
//         if (err) {
//           return res.status(400).json({ err });
//         }

//         // if (req.files) {
//         //   res.locals[fieldNames[0]] = req.files[fieldNames[0]].filename;
//         //   res.locals[fieldNames[1]] = req.files[fieldNames[1]].filename;
//         // }
//         next();
//       }
//     );
//     next(); // Panggil next() setelah selesai
//   };
// };

export const uploadSingle = (fieldName) => {
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

  return (req: Request, res: Response, next: NextFunction) =>
    uploadFile.single(fieldName)(req, res, function (err) {
      if (err) {
        return res.status(400).json({ err });
      }

      if (req.file) {
        // res.locals.filename = req.file.filename;
        // res.locals[`${fieldName}_filename`] = req.file.filename;
        // res.locals.profile_picture = req.file.filename;
        // res.locals.profile_background = req.file.filename;
      }
      next();
    });
};

export const uploadFile = (
  profile_picture: string,
  profile_background: string
) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/"); //Lokasi penyimpanan file
    },
    filename: function (req, file, cb) {
      cb(
        null,
        "image-" + Date.now() + "-" + file.originalname.replace(/\s/g, "")
      );
    },
  });

  // Function untuk filter file berdasarkan type
  const fileFilter = function (req, file, cb) {
    // if (file.fieldname === image) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|git|GIF)$/)) {
      req.fileValidationError = {
        message: "Only image files are allowed!",
      };
      return cb(new Error("Only image files are allowed!"), false);
    }
    // }
    cb(null, true);
  };

  const sizeInMb = 10;
  const maxSize = sizeInMb * 1000 * 1000; //10Mb

  // Eksekusi upload multer dan menentukan disk storage, validation dan maxSize file
  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).fields([
    {
      name: profile_picture,
      maxCount: 1,
    },
    {
      name: profile_background,
      maxCount: 1,
    },
  ]); //Menentukan jumlah file

  return (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, function (err: any) {
      // Pesan error jika validasi gagal
      console.log(err);
      if (err) {
        // Jika size melebihi batas

        return res.status(400).send({
          message: "Error",
          status: err,
        });
      }
      return next();
    });
  };
};
