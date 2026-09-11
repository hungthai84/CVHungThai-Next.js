import React, { useEffect } from "react";
import { useSound } from "../context/SoundContext";
import { useFooter } from "../context/FooterContext";

export default function SoundSettingsModal() {
  const { isSoundModalOpen, setIsSoundModalOpen } = useSound();
  const { openFooterModal } = useFooter();

  useEffect(() => {
    if (isSoundModalOpen) {
      setIsSoundModalOpen(false);
      openFooterModal("sound");
    }
  }, [isSoundModalOpen, setIsSoundModalOpen, openFooterModal]);

  return null;
}
