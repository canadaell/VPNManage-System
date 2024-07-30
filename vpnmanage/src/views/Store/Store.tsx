import React from 'react';
import './store.scss';

interface Feature {
  text: string;
}

interface PricingCardProps {
  name: string;
  price: number;
  features: Feature[];
}

const PricingCard: React.FC<PricingCardProps> = ({ name, price, features }) => (
  <div className="pricing-card">
    <div className="card-header">
      <h3>{name}</h3>
    </div>
    <div className="card-price">
      <h2>€{price}</h2>
      <p>30 days</p>
    </div>
    <ul className="features">
      {features.map((feature, index) => (
        <li key={index}>
          <span className="checkmark">✓</span> {feature.text}
        </li>
      ))}
    </ul>
    <button className="cta-button">next step →</button>
  </div>
);

const PricingCards: React.FC = () => {
  const blueCardFeatures: Feature[] = [
    { text: "100GB of data traffic" },
    { text: "Reset to 100GB every 30 days" },
    { text: "No client number limitation" },
    { text: "No speed limitation" },
    { text: "Support for all node routes" },
    { text: "Streaming media unblocking" },
    { text: "All nodes support ChatGPT and other AI tools" },
    { text: "Support for users in mainland China and overseas globally" },
    { text: "Fast customer service response" },
    { text: "Cross-platform client" }
  ];

  const whiteCardFeatures: Feature[] = [
    { text: "200GB of data traffic" },
    { text: "Reset to 200GB every 30 days" },
    { text: "No client number limitation" },
    { text: "No speed limitation" },
    { text: "Support for all node routes" },
    { text: "Streaming media unblocking" },
    { text: "All nodes support ChatGPT and other AI tools" },
    { text: "Support for users in mainland China and overseas globally" },
    { text: "Fast customer service response" },
    { text: "Cross-platform client" }
  ];

  return (
    <>
      <div className='pricing-title'>
        <h1>Subscribing plans</h1>
      </div>
      <div className="pricing-container">
        <PricingCard name="Standard" price={1} features={blueCardFeatures} />
        <PricingCard name="Premium" price={2} features={whiteCardFeatures} />
      </div>
    </>
  );
};

export default PricingCards;