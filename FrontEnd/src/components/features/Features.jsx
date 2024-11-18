import featuresData from "../../data/features.json";
import iconChat from "../../assets/images/icon-chat.webp";
import iconMoney from "../../assets/images/icon-money.webp";
import iconSecurity from "../../assets/images/icon-security.webp";

const iconMap = {
  iconChat: iconChat,
  iconMoney: iconMoney,
  iconSecurity: iconSecurity,
};

const Features = () => {
  return (
    <section className="features">
      {featuresData.map((feature) => (
        <div key={feature.id} className="feature-item">
          <img
            src={iconMap[feature.image]}
            alt={feature.alt}
            className="feature-icon"
          />
          <h3 className="feature-item-title">{feature.title}</h3>
          <p>{feature.paragraph}</p>
        </div>
      ))}
    </section>
  );
};
export default Features;
