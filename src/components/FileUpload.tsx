
import { useRef, useState, useEffect } from "react";
import type { ChangeEvent, DragEvent } from "react";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_EXTENSIONS = [
  "pdf",
  "doc",
  "docx",
  "jpg",
  "jpeg",
  "png",
];

function getFileExtension(fileName: string): string {
  return fileName.split(".").pop()?.toLowerCase() ?? "";
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(0)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FileTypeIcon({ extension }: { extension: string }) {
  const isPdf = extension === "pdf";
  const color = isPdf ? "#ef4444" : "#2563eb";

  return (
    <svg
      viewBox="0 0 40 40"
      className="h-9 w-9 shrink-0"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 3h13l9 9v23a2 2 0 0 1-2 2H10a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z"
        fill={color}
      />
      <path d="M23 3v9h9" fill="white" fillOpacity=".35" />
      <path
        d="M13 23h14M13 28h11"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <text
        x="20"
        y="19"
        fill="white"
        fontSize={isPdf ? "8" : "7"}
        fontWeight="bold"
        textAnchor="middle"
      >
        {isPdf ? "PDF" : "DOC"}
      </text>
    </svg>
  );
}
function FilePreview({ file,issText }: { file: File; issText?:unknown }) {
  const [previewUrl, setPreviewUrl] = useState("");

  const extension = getFileExtension(file.name);
  const isImage = ["jpg", "jpeg", "png"].includes(extension);

  useEffect(() => {
    if (!isImage) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPreviewUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);

    return () => reader.abort();
  }, [file, isImage]);

  if (isImage && previewUrl) {
    return (
      <img
        src={previewUrl}
        alt={file.name}
        className="h-10 w-10 shrink-0 rounded-lg border border-slate-200 object-cover"
      />
    );
  }

  return <FileTypeIcon extension={extension} />;
}

type FileUploadProps = {
  label?: string;
  files?: File[];
  onChange: (files: File[]) => void;
};

function FileUpload({ label = "Upload Documents", files = [], onChange }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  function processFiles(fileList: FileList | null) {
    const incomingFiles = Array.from(fileList ?? []);
    const newErrors: string[] = [];
    const validFiles: File[] = [];

    incomingFiles.forEach((file) => {
      const extension = getFileExtension(file.name);

      if (!ALLOWED_EXTENSIONS.includes(extension)) {
        newErrors.push(
          `${file.name}: Unsupported format. Use PDF, DOC, DOCX, JPG or PNG.`
        );
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        newErrors.push(`${file.name}: File size must not exceed 10 MB.`);
        return;
      }

      const alreadyExists = [...files, ...validFiles].some(
        (existingFile) =>
          existingFile.name === file.name &&
          existingFile.size === file.size &&
          existingFile.lastModified === file.lastModified
      );

      if (!alreadyExists) {
        validFiles.push(file);
      }
    });

    if (validFiles.length > 0) {
      onChange([...files, ...validFiles]);
    }

    setErrors(newErrors);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    processFiles(event.target.files);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    processFiles(event.dataTransfer.files);
  }

  function removeFile(indexToRemove: number) {
    onChange(files.filter((_, index) => index !== indexToRemove));
    setErrors([]);
  }

  return (
    <div className="w-full">
      <h2 className="mb-3 text-sm font-semibold text-slate-700">
        {label}
      </h2>

      
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`flex min-h-40 flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-6 text-center transition sm:min-h-44 ${
          isDragging
            ? "border-blue-600 bg-blue-50"
            : "border-blue-200 bg-slate-50/70 hover:border-blue-400"
        }`}
      >
        
        <svg
          viewBox="0 0 48 48"
          className="mb-2 h-10 w-10 text-blue-600"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M37.5 20.2A14 14 0 0 0 10 22.5 10 10 0 0 0 11 42h26a11 11 0 0 0 .5-21.8ZM26 33h-4v-7h-6l8-8 8 8h-6v7Z" />
        </svg>

        <p className="text-sm font-medium text-slate-700">
          Drag &amp; drop files here
        </p>

        <p className="my-1 text-sm text-slate-500">or</p>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
        >
          Choose Files
        </button>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={handleInputChange}
          className="hidden"
        />

        <p className="mt-3 text-xs leading-5 text-slate-500">
          Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10 MB each)
        </p>
      </div>

      
      {errors.length > 0 && (
        <div
          role="alert"
          className="mt-3 space-y-1 rounded-lg border border-red-100 bg-red-50 p-3"
        >
          {errors.map((error, index) => (
            <p key={`${error}-${index}`} className="break-all text-xs text-red-600">
              {error}
            </p>
          ))}
        </div>
      )}

      
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${file.lastModified}-${index}`}
              className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
            >
              <FilePreview file={file} />

              <div className="min-w-0 flex-1">
                <p
                  title={file.name}
                  className="truncate text-sm font-medium text-slate-700"
                >
                  {file.name}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {formatFileSize(file.size)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => removeFile(index)}
                aria-label={`Remove ${file.name}`}
                title="Remove file"
                className="shrink-0 rounded-md px-2 py-1 text-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600"
              >
                <svg
                  viewBox="0 0 20 20"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="m5 5 10 10M15 5 5 15" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FileUpload;
