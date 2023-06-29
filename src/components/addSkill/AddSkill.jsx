import { useDispatch } from "react-redux";
import { switchBoolean, updateFieldSkill } from "../../reducers/skillsSlice";
import Button from "../button/Button";
import { sendSkillThunk } from "../../api/events/sendSkill.api";
import { SKILLS_TYPE } from "../../constants/constants-personnal";
import mc from "./add-skill.module.scss";

const AddSkill = ({ skillsReducer }) => {
  const dispatch = useDispatch();

  const handleChangeInput = (event, key) => {
    const { value } = event.target;
    console.log(skillsReducer);
    dispatch(updateFieldSkill({ key, value }));
  };
  const handleSwitchCertified = () => {
    console.log(skillsReducer);
    dispatch(switchBoolean());
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(sendSkillThunk(skillsReducer));
  };

  return (
    <form onSubmit={handleSubmit} className={mc.form}>
      {/* <input
        type="text"
        value={skillsReducer.core}
        onChange={(e) => handleChangeInput(e, "core")}
      /> */}
      <select
        onChange={(e) => {
          handleChangeInput(e, "core");
        }}
      >
        {SKILLS_TYPE.map((opt, i) => {
          return (
            <option key={i} value={opt.value}>
              {opt.name}
            </option>
          );
        })}
      </select>
      <input
        type="text"
        value={skillsReducer.name}
        onChange={(e) => handleChangeInput(e, "name")}
        placeholder="Name"
      />
      <input
        type="text"
        value={skillsReducer.level}
        onChange={(e) => handleChangeInput(e, "level")}
        placeholder="Sub"
      />
      <input
        type="checkbox"
        checked={skillsReducer.certified}
        onChange={handleSwitchCertified}
      />
      <Button clss={["btn"]} txt={"Envoyer"} onClick={handleSubmit} />
    </form>
  );
};
export default AddSkill;
