import React, { useEffect } from "react";
import { useCursor } from "../context/CursorContext";
import { useFooter } from "../context/FooterContext";

export default function CursorSettingsModal() {
  const { isCursorModalOpen, setIsCursorModalOpen } = useCursor();
  const { openFooterModal } = useFooter();

  useEffect(() => {
    if (isCursorModalOpen) {
      setIsCursorModalOpen(false);
      openFooterModal("cursor");
    }
  }, [isCursorModalOpen, setIsCursorModalOpen, openFooterModal]);

  return null;
}
