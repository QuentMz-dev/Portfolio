import { useEffect } from "react";
import mc from "./contact-admin.module.scss";
import { useDispatch } from "react-redux";
import { readMessagesThunk } from "../../api/events/getMessage.api";
import { deleteMessageThunk } from "../../api/events/deleteMessage.api";
import { ROLE } from "../../constants/constants-personnal";

const ContactAdmin = ({ viewReducer, contactReducer }) => {
  const dispatch = useDispatch();

  const handleDeleteMessage = (id) => {
    dispatch(deleteMessageThunk(id));
  };

  useEffect(() => {
    dispatch(readMessagesThunk());
  }, []);
  return (
    <div className={mc.container}>
      {contactReducer.messages.length >= 1 ? (
        <ul>
          {contactReducer.messages.map((val, i) => (
            <li key={i}>
              <span>De : {val.name}</span>
              <span>Mail : {val.email}</span>
              <p>{val.text}</p>
              {viewReducer.role === ROLE.admin ? (
                <button onClick={() => handleDeleteMessage(val._id)}>x</button>
              ) : (
                ""
              )}
            </li>
          ))}
        </ul>
      ) : (
        "No message yet"
      )}
    </div>
  );
};

export default ContactAdmin;
