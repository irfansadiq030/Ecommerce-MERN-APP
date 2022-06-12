import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../actions/productAction';
import Loader from '../Loader/Loader';
import ProductCard from "../Home/ProductCard";
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';


const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, products, productsCount, resultPerPage } = useSelector((state) => state.products)

  const dispatch = useDispatch();
  const { keyword } = useParams()

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage))
  }, [dispatch, keyword, currentPage])

  
  const setCurrentPageNo = (e) => {
    setCurrentPage(e)
  }
  return (
    <>
      <div className='products_heading'>
        <h1>All Products</h1>
        <button className='searchProducts'> <Link className='search_Link' to="/search">Search Products</Link> </button>
      </div>

      <div className='container'>

        {
          (loading) ? <Loader /> :
            products.map((product) => (
              <ProductCard product={product} />
            ))

        }
      </div>
      <div>
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={resultPerPage}
          totalItemsCount={productsCount}
          onChange={setCurrentPageNo}
          nextPageText="Next"
          prevPageText="Prev"
        />
      </div>
    </>
  )
}

export default Products