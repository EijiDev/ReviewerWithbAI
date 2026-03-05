const ALLOWED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.ms-powerpoint",
  "text/plain",
];
const ALLOWED_EXTENSIONS = ["pdf", "pptx", "ppt", "txt"];
const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export function validateFile(file) {
  if (!file) return "No file selected.";

  const ext = file.name.split(".").pop().toLowerCase();

  if (!ALLOWED_EXTENSIONS.includes(ext) || !ALLOWED_TYPES.includes(file.type)) {
    return `Invalid file type. Allowed: ${ALLOWED_EXTENSIONS.join(", ").toUpperCase()} only.`;
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return `File too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`;
  }

  if (file.size === 0) {
    return "File is empty. Please upload a valid file.";
  }

  return null; 
}

export const STATUS_MESSAGES = {
  429: "Quota Limit: Masyadong maraming requests ngayon. Try again later.",
  403: "API Key Error: May problema sa AI service. Contact the admin.",
  503: "AI Overloaded: Medyo busy ang AI servers. Try again in a few minutes.",
  422: "Hindi ma-read ang file. Make sure may laman siya.",
  500: "Server Error: Malas ka hahahaha. Try again later.",
};

document.querySelector("#fileInput")?.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const error = validateFile(file);

  if (error) {
    alert(error);
    e.target.value = ""; 
  } else {
    console.log("File is valid:", file);
  }
});