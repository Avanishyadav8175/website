export const formattedFileSize = (bytes: number): string => {
  if (bytes < 0) {
    throw new Error("Size must be a non-negative number");
  }

  const bytesInKB = 1024;
  const bytesInMB = bytesInKB * 1024;
  const bytesInGB = bytesInMB * 1024;

  if (bytes >= bytesInGB) {
    const gb = bytes / bytesInGB;
    return `${gb.toFixed(2)} GB`;
  } else if (bytes >= bytesInMB) {
    const mb = bytes / bytesInMB;
    return `${mb.toFixed(2)} MB`;
  } else if (bytes >= bytesInKB) {
    const kb = bytes / bytesInKB;
    return `${kb.toFixed(2)} KB`;
  } else {
    return `${bytes} bytes`;
  }
};
