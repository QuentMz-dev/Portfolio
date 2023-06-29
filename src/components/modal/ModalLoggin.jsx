import { useDispatch, useSelector } from "react-redux";

import Portal from "./Portal";
import mc from "./modal.module.scss";
import { clearFieldsUser, updateFieldUser } from "../../reducers/userSlice";
import Button from "../button/Button";
import { signInThunk } from "../../api/users/signIn.api";
import { signUpThunk } from "../../api/users/signUp.api";

const Modal = ({ visible, handleCloseModal }) => {
  const { email, password } = useSelector((store) => {
    return store.userReducer;
  });

  const dispatch = useDispatch();
  const handleChangeInput = (event, key) => {
    const { value } = event.target;

    dispatch(updateFieldUser({ key, value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = { email, password };
    dispatch((dispatch, getState) => signInThunk(dispatch, getState, form));
    dispatch(clearFieldsUser());
  };

  const logginInput = (
    <div className={mc.inputContainer}>
      <span>Seuls les admins doivent s'identifier</span>
      <form onSubmit={(e) => handleSubmit(e)}>
        {/* EMAIL */}
        <div className={mc.input}>
          <input
            type="email"
            value={email}
            onChange={(e) => handleChangeInput(e, "email")}
          />
          <label className={email.length > 0 ? `${mc.actived}` : ""}>
            {"Email"}
          </label>
        </div>
        {/* PASSWORD */}
        <div className={mc.input}>
          <input
            type="password"
            value={password}
            onChange={(e) => handleChangeInput(e, "password")}
          />
          <label className={password.length > 0 ? `${mc.actived}` : ""}>
            {"Mot de passe"}
          </label>
        </div>
        <Button clss={["btn"]} txt={"Envoyer"} type={"submit"} />
      </form>
    </div>
  );

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
        {logginInput}
      </div>
    </div>
  );

  return <Portal visible={visible} element={modalHtml} />;
};

export default Modal;
