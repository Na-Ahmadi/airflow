"use client";

import Icon from "@/components/shared/Icon/Icon";
import { useState } from "react";
import styles from "./FileUpload.module.css";

interface FileUploadProps {
  label: string;
  hint: string;
  accept?: string;
  onChange?: (file: File | null) => void;
}

export default function FileUpload({
  label,
  hint,
  accept = ".pdf,.dwg,.zip",
  onChange,
}: FileUploadProps) {
  const [fileName, setFileName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFileName(file?.name ?? "");
    onChange?.(file);
  };

  return (
    <label className={styles.fileLabel}>
      <Icon name="upload" size={24} />
      <div>
        <span className={styles.fileLabelTitle}>{label}</span>
        <span className={styles.fileHint}>{hint}</span>
        {fileName && <span className={styles.fileName}>{fileName}</span>}
      </div>
      <input
        type="file"
        className={styles.fileInput}
        accept={accept}
        onChange={handleChange}
      />
    </label>
  );
}
