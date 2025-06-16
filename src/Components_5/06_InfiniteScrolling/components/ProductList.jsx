import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productsSlice";
import ProductCard from "./ProductCard";
import ShimmerCard from "./ShimmerCard";
import "./ProductList.css";

const ProductList = () => {
  const dispatch = useDispatch();
  const requestInProgress = useRef(false);

  const {
    items = [],
    total = 0,
    loading = false,
  } = useSelector((state) => state.products || {});

  const isFetchingRef = useRef(false); // 🔒 lock to avoid multiple fetches

  // Initial fetch
  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  // Throttle function
  const throttle = (cb, delay) => {
    let lastCall = 0;
    return (...args) => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        cb(...args);
      }
    };
  };

 const handleScroll = useCallback(
  throttle(() => {
    const scrolledToBottom =
      window.innerHeight + window.scrollY + 500 >= document.documentElement.scrollHeight;

    if (
      scrolledToBottom &&
      !loading &&
      items.length < total &&
      !requestInProgress.current
    ) {
      requestInProgress.current = true;
      dispatch(fetchProducts()).finally(() => {
        requestInProgress.current = false;
      });
    }
  }, 500),
  [loading, items.length, total, dispatch]
);


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="grid-container">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}

      {loading &&
        Array(8)
          .fill(0)
          .map((_, index) => <ShimmerCard key={`shimmer-${index}`} />)}
    </div>
  );
};

export default ProductList;
