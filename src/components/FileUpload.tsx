
import { useRef, useState, useEffect } from "react";
import type { ChangeEvent, DragEvent } from "react";
import {
  Button,
  Card,
  Field,
  MessageBar,
  MessageBarBody,
  Text,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import {
  ArrowUploadRegular,
  DismissRegular,
  DocumentRegular,
} from "@fluentui/react-icons";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = ["pdf", "doc", "docx", "jpg", "jpeg", "png"];

const useStyles = makeStyles({
  root: { width: "100%", minWidth: 0 },
  heading: {
    display: "block",
    marginBottom: "12px",
    color: "#334155",
    fontSize: "14px",
    fontWeight: 600,
  },
  dropZone: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "160px",
    padding: "24px 16px",
    boxSizing: "border-box",
    border: "2px dashed #bfdbfe",
    borderRadius: "12px",
    backgroundColor: "#f8fafc",
    textAlign: "center",
    transition: "background-color 200ms, border-color 200ms",
    "@media (min-width: 640px)": { minHeight: "176px" },
  },
  dragging: { backgroundColor: "#eff6ff" },
  uploadIcon: {
    fontSize: "36px",
    color: "#2563eb",
    marginBottom: "8px",
  },
  instruction: {
    color: "#334155",
    fontSize: "14px",
    fontWeight: 500,
  },
  orText: {
    margin: "4px 0 8px",
    color: "#64748b",
    fontSize: "14px",
  },
  hint: {
    marginTop: "12px",
    color: "#64748b",
    fontSize: "12px",
    lineHeight: "20px",
  },
  hiddenInput: { display: "none" },
  errors: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    marginTop: "12px",
  },
  errorText: { overflowWrap: "anywhere", fontSize: "12px" },
  fileList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "12px",
  },
  fileCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "12px",
    width: "100%",
    minWidth: 0,
    minHeight: "60px",
    padding: "8px 12px",
    boxSizing: "border-box",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "10px",
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: "none",
  },
  preview: {
    width: "32px",
    height: "32px",
    flexShrink: 0,
    objectFit: "cover",
    borderRadius: "5px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  fileIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    flexShrink: 0,
    borderRadius: "5px",
    backgroundColor: "#eff6ff",
    color: "#2563eb",
    fontSize: "20px",
  },
  fileInfo: {
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
  },
  fileName: {
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    color: "#334155",
    fontSize: "13px",
    fontWeight: 500,
  },
  fileSize: {
    display: "block",
    marginTop: "2px",
    color: "#64748b",
    fontSize: "11px",
  },
  removeButton: { flexShrink: 0, minWidth: "32px" },
});

function getFileExtension(fileName: string): string {
  return fileName.split(".").pop()?.toLowerCase() ?? "";
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(0)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FilePreview({ file }: { file: File }) {
  const styles = useStyles();
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
        alt={`Preview of ${file.name}`}
        className={styles.preview}
      />
    );
  }

  return (
    <div className={styles.fileIcon} aria-hidden="true">
      <DocumentRegular />
    </div>
  );
}

type FileUploadProps = {
  label?: string;
  files?: File[];
  onChange: (files: File[]) => void;
};

function FileUpload({
  label = "Upload Documents",
  files = [],
  onChange,
}: FileUploadProps) {
  const styles = useStyles();
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
    <div className={styles.root}>
      <Field label={label}>
        <Card
          className={`${styles.dropZone} ${
            isDragging ? styles.dragging : ""
          }`}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <ArrowUploadRegular
            className={styles.uploadIcon}
            aria-hidden="true"
          />

          <Text className={styles.instruction}>
            Drag &amp; drop files here
          </Text>

          <Text className={styles.orText}>or</Text>

          <Button
            type="button"
            appearance="primary"
            onClick={() => inputRef.current?.click()}
            icon={<ArrowUploadRegular />}
          >
            Choose Files
          </Button>

          <input
            ref={inputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleInputChange}
            className={styles.hiddenInput}
            aria-label="Choose documents to upload"
          />

          <Text className={styles.hint}>
            Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10 MB each)
          </Text>
        </Card>
      </Field>

      {errors.length > 0 && (
        <div className={styles.errors} role="alert">
          {errors.map((error, index) => (
            <MessageBar key={`${error}-${index}`} intent="error">
              <MessageBarBody>{error}</MessageBarBody>
            </MessageBar>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <div className={styles.fileList}>
          {files.map((file, index) => (
            <Card
              key={`${file.name}-${file.lastModified}-${index}`}
              className={styles.fileCard}
            >
              <FilePreview file={file} />

              <div className={styles.fileInfo}>
                <Text className={styles.fileName} title={file.name}>
                  {file.name}
                </Text>
                <Text className={styles.fileSize}>
                  {formatFileSize(file.size)}
                </Text>
              </div>

              <Button
                className={styles.removeButton}
                type="button"
                appearance="subtle"
                size="small"
                icon={<DismissRegular />}
                aria-label={`Remove ${file.name}`}
                title="Remove file"
                onClick={() => removeFile(index)}
              />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default FileUpload;
