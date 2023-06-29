import { useEffect } from "react";
import mc from "./skills.module.scss";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { readThunk } from "../../api/events/getSkills.api";
import { useDispatch } from "react-redux";
import { deleteSkillThunk } from "../../api/events/deleteSkill.api";
import AddSkill from "../addSkill/AddSkill";
import Certified from "../../img/certified_badge.png";
import { ROLE } from "../../constants/constants-personnal";

const Skills = ({ viewReducer, skillsReducer }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readThunk()); // Appel à readThunk à l'intérieur de la fonction de rappel
  }, []);

  const handleDeleteSkill = (id) => {
    dispatch(deleteSkillThunk(id));
  };

  return (
    <div className={mc.container}>
      <h3>Mes compétences</h3>
      {viewReducer.role === 1 ? <AddSkill skillsReducer={skillsReducer} /> : ""}
      <div className={mc.cards}>
        <div className={mc.frontEnd}>
          <h4>Développement FrontEnd</h4>
          <ul>
            {skillsReducer.frontEndArr.map((val, i) => (
              <li key={i}>
                <span>
                  {val.certified === true ? <CheckCircleOutlineIcon /> : ""}
                  {/* {val.certified === true ? (
                    <img src={Certified} alt="Certified_Badge" />
                  ) : (
                    ""
                  )} */}
                  {val.name}
                </span>

                <span>{val.level}</span>
                {viewReducer.role === ROLE.admin ? (
                  <button onClick={() => handleDeleteSkill(val._id)}>x</button>
                ) : (
                  ""
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className={mc.backEnd}>
          <h4>Développement BackEnd</h4>

          <ul>
            {skillsReducer.backEndArr.map((val, i) => (
              <li key={i}>
                <span>
                  {val.certified === true ? <CheckCircleOutlineIcon /> : ""}
                  {val.name}
                </span>

                <span> {val.level}</span>
                {viewReducer.role === ROLE.admin ? (
                  <button onClick={() => handleDeleteSkill(val._id)}>x</button>
                ) : (
                  ""
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className={mc.other}>
          <h4>Autres compétences</h4>

          <ul>
            {skillsReducer.otherArr.map((val, i) => (
              <li key={i}>
                <span>
                  {val.certified === true ? <CheckCircleOutlineIcon /> : ""}
                  {val.name}
                </span>
                {viewReducer.role === ROLE.admin ? (
                  <button onClick={() => handleDeleteSkill(val._id)}>x</button>
                ) : (
                  ""
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Skills;
