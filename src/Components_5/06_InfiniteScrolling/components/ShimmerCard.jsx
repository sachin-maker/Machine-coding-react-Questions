import "./ShimmerCard.css";

const ShimmerCard = () => {
  return (
    <div className="shimmer-card" loading="lazy" >
      <div className="shimmer-image shimmer"></div>
      <div className="shimmer-text shimmer"></div>
      <div className="shimmer-text shimmer short"></div>
      <div className="shimmer-text shimmer"></div>
    </div>
  );
};

export default ShimmerCard;
