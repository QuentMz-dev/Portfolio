import Portal from "./Portal";
import mc from "./modal.module.scss";

const Modal = ({ children, visible, handleCloseModal }) => {
  const modalHtml = (
    <div
      className={mc.container}
      id={"container"}
      onClick={(e) => handleCloseModal(e)}
    >
      <div className={mc["card"]} role="dialog" aria-modal={true}>
        <div
          id={"close-modal"}
          className={mc.close}
          onClick={(e) => handleCloseModal(e)}
        >
          X
        </div>
        {children}
      </div>
    </div>
  );

  return <Portal visible={visible} element={modalHtml} />;
};

export default Modal;
