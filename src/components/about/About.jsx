import mc from "./about.module.scss";
import Card from "../card/Card";
import Button from "../button/Button";

import { pictureID } from "../../constants/constants-img.js";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { readAboutThunk } from "../../api/events/getAbout.api";

const About = ({ contactRef, aboutReducer }) => {
  const handleScrollToContact = () => {
    contactRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readAboutThunk());
  }, []);

  return (
    <div className={mc.container}>
      <h3>En savoir plus</h3>
      {/* photo */}
      <div className={mc.blocs}>
        <div className={mc.picture}>
          <div className={mc.effect}></div>
          <div className={mc["adaptive-img-contain"]}>
            <span>
              <img src={pictureID} alt="Picture-ID" />
            </span>
          </div>
        </div>
        {/* END */}
        <div className={mc.content}>
          <div className={mc.cards}>
            <Card
              icone={<SchoolRoundedIcon />}
              txt={"Expérience"}
              sub={"Jeune diplômé"}
            />
            <Card
              icone={<AccountTreeOutlinedIcon />}
              txt={"Projets réalisé"}
              sub={"2"}
            />
          </div>
          <div className={mc.text}>
            <p>{aboutReducer.text}</p>
            <Button
              clss={["btn"]}
              txt={"Contactez moi !"}
              onClick={handleScrollToContact}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
