import "./styles.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(9);
  const [totalPage, setTotalpage] = useState(1);

  const handlePageChange = (selectedPage) => {
    setPage(selectedPage);
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
      );
      const { products } = data;
      setProducts(products);
      setTotalpage(data.total / 10);
    })();
  }, [page]);

  return (
    <div className="App">
      {products.length > 0 && (
        <div className="products">
          {products.map((ele) => (
            <div key={ele.id} className="product_single">
              <img src={ele.thumbnail} alt={ele.title} />
              <div>{ele.title}</div>
            </div>
          ))}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          {page > 1 && (
            <span onClick={() => handlePageChange(page - 1)}>Back</span>
          )}
          {[...Array(totalPage)].map((_, i) => (
            <span
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={page === i + 1 ? "pagination__selected" : ""}
            >
              {i + 1}
            </span>
          ))}
          {page < totalPage && (
            <span onClick={() => handlePageChange(page + 1)}>Next</span>
          )}
        </div>
      )}
    </div>
  );
}
