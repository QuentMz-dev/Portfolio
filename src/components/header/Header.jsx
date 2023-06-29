import { useDispatch } from "react-redux";
import { pictureID } from "../../constants/constants-img";
import Button from "../button/Button";
import mc from "./header.module.scss";
import { readPdfThunk } from "../../api/events/getPdf.api";

const Header = ({ contactRef }) => {
  const dispatch = useDispatch();

  const handleDownloadPDF = () => {
    dispatch(readPdfThunk());
  };

  const handleScrollToContact = () => {
    contactRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className={mc.container}>
        <div className={mc.content}>
          <div className={mc.header}>
            <span>Hey ! Je suis </span>
            <span className={mc.name}>Quentin Mouzon</span>
            <span>Bienvenue sur mon site</span>
            <span className={mc.muted}>Developpeur Web & Application</span>
          </div>
          <div className={mc.picture}>
            <div className={mc["adaptive-img-contain"]}>
              <span>
                <img src={pictureID} alt="Picture-ID" />
              </span>
            </div>
          </div>
        </div>

        <div className={mc.action}>
          <Button
            clss={["btn"]}
            txt={"Télécharger mon Cv"}
            onClick={handleDownloadPDF}
          />
          <Button
            clss={["btn"]}
            txt={"Contactez moi !"}
            onClick={handleScrollToContact}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
