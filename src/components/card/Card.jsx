import mc from "./card.module.scss";

const Card = ({ icone, txt, sub }) => {
  return (
    <div className={mc.container}>
      <span>{icone}</span>
      <span className={mc.txt}>{txt}</span>
      <span className={mc.sub}>{sub}</span>
    </div>
  );
};

export default Card;
