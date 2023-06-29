import mc from "./contact.module.scss";
import { useDispatch } from "react-redux";
import { updateField } from "../../reducers/contactSlice";
import Button from "../button/Button";
import { useRef } from "react";
import { sendMessageThunk } from "../../api/events/sendMessage.api";

const Contact = ({ contactReducer, viewReducer }) => {
  const dispatch = useDispatch();

  const handleChangeInput = (event, key) => {
    const { value } = event.target;
    console.log(contactReducer.message);
    dispatch(updateField({ key, value }));
  };

  const handleSubmit = async (contactReducer) => {
    dispatch((dispatch, getState) =>
      sendMessageThunk(dispatch, getState, contactReducer)
    );
  };

  return (
    <div className={mc.container} id="contactSection">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <input
            type="text"
            value={contactReducer.userName}
            onChange={(e) => handleChangeInput(e, "userName")}
          />
          <label
            className={
              contactReducer.userName.length > 0 ? `${mc.actived}` : ""
            }
          >
            {"Nom"}
          </label>
        </div>
        <div>
          <input
            type="email"
            value={contactReducer.email}
            onChange={(e) => handleChangeInput(e, "email")}
          />
          <label
            className={contactReducer.email.length > 0 ? `${mc.actived}` : ""}
          >
            {"Mail"}
          </label>
        </div>
        <div className={mc.text}>
          <textarea
            value={contactReducer.message}
            onChange={(e) => handleChangeInput(e, "message")}
          ></textarea>
          <label
            className={
              contactReducer.message.length > 0 ? `${mc.stillActived}` : ""
            }
          >
            {"Votre message"}
          </label>
        </div>
        <Button
          clss={["btn"]}
          txt={"Envoyer"}
          onClick={() => handleSubmit(contactReducer)}
        />
      </form>
    </div>
  );
};
export default Contact;
