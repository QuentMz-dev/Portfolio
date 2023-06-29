import { useDispatch } from "react-redux";
import { sendAboutThunk } from "../../api/events/sendAbout.api";
import { updateFieldAbout } from "../../reducers/aboutSlice";
import Button from "../button/Button";

const AddAbout = ({ aboutReducer }) => {
  const dispatch = useDispatch();

  const handleChangeInput = (event, key) => {
    const { value } = event.target;
    dispatch(updateFieldAbout({ key, value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(sendAboutThunk(aboutReducer));
  };
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea
          value={aboutReducer.text}
          onChange={(e) => handleChangeInput(e, "text")}
        ></textarea>

        <Button clss={["btn"]} txt={"Envoyer"} onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default AddAbout;
