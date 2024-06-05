import { useLocation } from "react-router-dom";
import { deployLink } from "../../helpers/deploy.config";
import { useEffect, useState } from "react";
import { IoMdLink } from "react-icons/io";

function CopyLink() {
  const { pathname } = useLocation();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    let timerShow: NodeJS.Timeout;
    if (showSuccess) {
      timerShow = setTimeout(() => {
        setShowSuccess(false);
      }, 1000);
    }
    return () => clearTimeout(timerShow);
  }, [showSuccess]);

  return (
    <div
      className={showSuccess ? "tooltip tooltip-open" : ""}
      data-tip="Copied"
    >
      <button
        className="btn bg-amber-400 hover:bg-amber-400"
        onClick={() => {
          void navigator.clipboard
            .writeText(`${deployLink}${pathname}`)
            .then(() => {
              setShowSuccess(true);
            })
            .catch();
        }}
      >
        <span className="hidden sm:inline">Share Link</span>
        <IoMdLink className="h-6 w-6" />
      </button>
    </div>
  );
}

export default CopyLink;
