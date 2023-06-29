import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

const Portal = ({ element, visible }) => {
  const [isVisible, setVisible] = useState(visible);

  const hasDOM_ = () => {
    const hasDom = !!window && !!window.document && !!window.document.createElement;
    return hasDom;
  };

  const hasDOM = () => !!window?.document?.createElement;
  const showOrHide = () => setVisible(hasDOM() && visible);

  useEffect(showOrHide, [visible]);

  return <>{element && isVisible && createPortal(element, document.body)}</>;
};

export default Portal;
