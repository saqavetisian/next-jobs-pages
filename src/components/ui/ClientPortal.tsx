import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
type ClientPortalInterface = {
  children: React.ReactNode;
  onClose?: () => void;
  selector: string;
};

const ClientPortal = ({ children, selector }: ClientPortalInterface) => {
  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.getElementById(selector);
  }, [selector]);
  return ref.current ? createPortal(children, ref.current as Element) : null;
};

export default ClientPortal;