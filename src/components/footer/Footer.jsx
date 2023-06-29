import { DATA_PERSONNAL } from "../../constants/constants-personnal";
import mc from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={mc.container}>
      <a
        className={`${`adaptive-img-contain`} ${mc.logo}`}
        href={DATA_PERSONNAL.linkGitHub}
        target="_blank"
      >
        <span>
          <img src="../../src/img/GitHub-Logo.png" alt="GitHub_logo" />
        </span>
      </a>
      <a
        className={`${`adaptive-img-contain`} ${mc.logo}`}
        href={DATA_PERSONNAL.linkLinkeIn}
        target="_blank"
      >
        <span>
          <img src="../../src/img/linkedin-logo.webp" alt="LinkeIn_logo" />
        </span>
      </a>
    </footer>
  );
};

export default Footer;
