import multer from "multer";

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
  "application/vnd.ms-powerpoint", // .ppt
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/msword", // .doc
];

const ALLOWED_EXTENSIONS = ["pdf", "pptx", "ppt", "docx", "doc"];
const MAX_FILE_SIZE_MB = 10;

const fileFilter = (req, file, cb) => {
  const ext = file.originalname.split(".").pop().toLowerCase();
  const validExt = ALLOWED_EXTENSIONS.includes(ext);
  const validMime = ALLOWED_MIME_TYPES.includes(file.mimetype);

  if (validExt && validMime) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Invalid file type. Allowed: ${ALLOWED_EXTENSIONS.join(", ").toUpperCase()} only.`
      ),
      false
    );
  }
};

export const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE_MB * 1024 * 1024 },
});