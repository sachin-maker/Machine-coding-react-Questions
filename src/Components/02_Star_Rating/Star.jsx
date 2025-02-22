import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './style.css';

const Star = ({ noOfStars }) => {
  // State to track the selected rating
  const [rating, setRating] = useState(0);
  
  // State to track the hovered star (for visual effect)
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      {/* Loop through the number of stars */}
      {[...Array(noOfStars)].map((_, index) => {
        const starValue = index + 1; // Stars start from 1, not 0

        return (
          <FaStar
            key={starValue}
            size={40} // Set star size
            className={starValue <= (hover || rating) ? "active" : "inactive"} // Apply class based on hover or rating
            onClick={() => setRating(starValue)} // Click to set rating
            onMouseEnter={() => setHover(starValue)} // Hover effect
            onMouseLeave={() => setHover(rating)} // Reset hover effect when leaving
          />
        );
      })}
    </div>
  );
}

export default Star;
