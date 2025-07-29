// src/components/buttons/DownloadAssignmentBundleButton.tsx;

import { DownloadAllButton } from "@/components/buttons";

type MultiFileDownloadButtonProps = {
  files: {
    fileUrl: string;
    filename: string;
  }[];
};

const DownloadAssignmentBundleButton = ({
  files,
}: MultiFileDownloadButtonProps) => {
  const handleDownloadAll = () => {
    files.forEach(({ fileUrl, filename }, index) => {
      setTimeout(() => {
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = filename;
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, index * 300); // small delay between downloads
    });
  };

  return <DownloadAllButton onClick={handleDownloadAll} />;
};

export default DownloadAssignmentBundleButton;
