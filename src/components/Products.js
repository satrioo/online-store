import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, NavLink } from "react-router-dom";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product))
  }

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products/");
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className=" grid grid-cols-4 w-full grid-flow-row gap-7">
          <div className=" w-full">
            <Skeleton height={592} />
          </div>
          <div className=" w-full">
            <Skeleton height={592} />
          </div>
          <div className=" w-full">
            <Skeleton height={592} />
          </div>
          <div className=" w-full">
            <Skeleton height={592} />
          </div>
          <div className=" w-full">
            <Skeleton height={592} />
          </div>
          <div className=" w-full">
            <Skeleton height={592} />
          </div>
          <div className=" w-full">
            <Skeleton height={592} />
          </div>
          <div className=" w-full">
            <Skeleton height={592} />
          </div>
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };
  const ShowProducts = () => {
    return (
      <div className="">
        <div className="buttons text-center py-5">
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("men's clothing")}
          >
            Men's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("women's clothing")}
          >
            Women's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("jewelery")}
          >
            Jewelery
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("electronics")}
          >
            Electronics
          </button>
        </div>

        <div className=" grid grid-cols-4 grid-flow-row gap-7 mx-auto">
          {filter.map((product) => {
            return (
              <div
                id={product.id}
                key={product.id}
                className="w-full border rounded"
              >
                <div
                  className="card text-center h-100 px-4 py-6"
                  key={product.id}
                >
                  <figure className=" h-[400px] overflow-hidden flex items-center">
                    <img
                      className="card-img-top p-5 object-fill"
                      src={product.image}
                      alt="Card"
                    />
                  </figure>
                  <div className="card-body">
                    <h5 className="card-title">
                      {product.title.substring(0, 12)}...
                    </h5>
                    <p className="card-text">
                      {product.description.substring(0, 90)}...
                    </p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item lead">$ {product.price}</li>
                  </ul>
                  <div className="card-body mt-4">
                    <NavLink
                      to={"/product/" + product.id}
                      className=" bg-gray-500 text-white px-3 inline-flex items-center h-7 text-sm rounded"
                    >
                      Detail
                    </NavLink>
                    <button
                      className=" bg-gray-500 text-white px-3 py-1 text-sm rounded inline-flex items-center h-7 ml-1"
                      onClick={() => addProduct(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  return (
    <div>
      <div className=" mx-auto my-7 max-w-screen-xl">
        <div className="row justify-center">
          <h2 className="display-5 text-lg mb-4">
            Latest Products
          </h2>
          <hr />
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
};

export default Products;
