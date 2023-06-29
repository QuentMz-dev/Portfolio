import { useDispatch } from "react-redux";
import mc from "./loggin.module.scss";
import { closeModal, toggleBooleanView } from "../../reducers/viewSlice";
import ModalLoggin from "../modal/ModalLoggin";

const Loggin = ({ viewReducer, userReducer }) => {
  const dispatch = useDispatch();

  const showModal = () => {
    dispatch(toggleBooleanView({ key: "showModal" }));
  };
  const handleCloseModal = (e) => {
    if (
      e.target === document.getElementById("container") ||
      e.target === document.getElementById("close-modal")
    )
      dispatch(closeModal());
  };

  return (
    <div className={mc.container}>
      <span onClick={showModal}>Connect</span>
      <ModalLoggin
        visible={viewReducer.showModal}
        userReducer={userReducer}
        handleCloseModal={handleCloseModal}
      />
      <span>-</span>
      <span>Developed with Vite + React </span>
    </div>
  );
};

export default Loggin;
