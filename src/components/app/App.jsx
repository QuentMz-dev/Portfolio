import mc from "./App.module.scss";
import Header from "../header/Header";
import About from "../about/About";
import Skills from "../skills/Skills";
import Footer from "../footer/Footer";

import Contact from "../contact/Contact";
import { useSelector } from "react-redux";
import Loggin from "../loggin/Loggin";
import { ROLE } from "../../constants/constants-personnal";
import ContactAdmin from "../contact-admin/ContactAdmin";
import { useRef } from "react";
import AddAbout from "../addAbout/AddAbout";

const App = () => {
  const {
    viewReducer,
    contactReducer,
    skillsReducer,
    userReducer,
    aboutReducer,
  } = useSelector((store) => {
    return {
      viewReducer: store.viewReducer,
      contactReducer: store.contactReducer,
      skillsReducer: store.skillsReducer,
      userReducer: store.userReducer,
      aboutReducer: store.aboutReducer,
    };
  });
  const contactRef = useRef(null);
  return (
    <div className={mc.app}>
      <Header contactRef={contactRef} />
      <div className={mc.background}>
        <About contactRef={contactRef} aboutReducer={aboutReducer} />
        {viewReducer.role === ROLE.admin ? (
          <AddAbout aboutReducer={aboutReducer} />
        ) : (
          ""
        )}
        <Skills viewReducer={viewReducer} skillsReducer={skillsReducer} />
      </div>
      <div className={mc.background2}>
        <div ref={contactRef}>
          <Contact viewReducer={viewReducer} contactReducer={contactReducer} />
          {viewReducer.role === ROLE.admin ? (
            <ContactAdmin
              viewReducer={viewReducer}
              contactReducer={contactReducer}
            />
          ) : (
            ""
          )}
        </div>

        <Footer />
        <Loggin viewReducer={viewReducer} userReducer={userReducer} />
      </div>
    </div>
  );
};

export default App;
