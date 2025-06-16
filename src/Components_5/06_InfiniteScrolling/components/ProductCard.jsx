import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.thumbnail} loading="lazy" alt={product.title} />
        <div className="offer-overlay">₹{product.discountPercentage} OFF ABOVE ₹{product.price}</div>
      </div>
      <div className="product-details">
        <h3>{product.title}</h3>
        <p className="rating">⭐ {product.rating} • {Math.floor(product.stock / 2) + 20} mins</p>
        <p className="desc">{product.description.slice(0, 40)}...</p>
        <p className="location">From: {product.brand}</p>
      </div>
    </div>
  );
};

export default ProductCard;
