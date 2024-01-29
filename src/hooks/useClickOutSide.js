import { useEffect, useRef, useState } from "react";
export default function useClickOutSide() {
  const [show, setShow] = useState(false);
  const popupRef = useRef(null);
  const menuRef = useRef(null);
  useEffect(() => {
    function handleClickOutSide(e) {
      if (
        menuRef.current &&
        popupRef.current &&
        !popupRef.current.contains(e.target) &&
        !menuRef.current.contains(e.target)
      ) {
        setShow(false);
      }
    }
    document.addEventListener("click", handleClickOutSide);
    return () => document.removeEventListener("click", handleClickOutSide);
  }, []);
  return { show, setShow, popupRef, menuRef };
}
