import mc from "./button.module.scss";

const Button = ({ clss, txt, onClick, type }) => {
  const getClass = () => {
    let CL = `${mc.container}`;
    if (clss.length > 0) {
      for (let i = 0; i < clss.length; i++) {
        const el = clss[i];
        CL += ` ${mc[el]}`;
      }
    }
    return CL;
  };

  return (
    <button
      type={type ? type : "button"}
      onClick={onClick}
      className={getClass()}
    >
      {txt ? txt : ""}
    </button>
  );
};
export default Button;
