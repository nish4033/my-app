import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0)
  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=500");
    const json = await data.json();
    setProducts(json.products);
  }
  const PAGE_SIZE = 10
  const total_products = products.length;
  const noOfPages = Math.ceil(total_products / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const handleClick = (n) => {
    setCurrentPage(n);
  }
  useEffect(() => {
    fetchData();
  }, [])
  return !products.length ? (
    <h1>No Products found</h1>
  ) : (
    <div className="App">
      <h1>Pagination</h1>
      <div className='pagination-container'>
        {
          [...Array(noOfPages).keys()].map((n) => (
            <span className={(n == currentPage) ? "page-number active" : "page-number"} key={n} onClick={() => handleClick(n)}>
              {n + 1}
            </span>
          ))
        }
      </div>
      <div className="products-container">
        {
          products.slice(start, end).map((prod) => (
            <div className="product" key={prod.id}>
              <img src={prod.thumbnail} alt={prod.id} />
              {prod.title}
            </div>

          ))
        }
      </div>
    </div>
  );
}

export default App;
