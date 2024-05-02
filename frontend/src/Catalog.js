// Component for our catalog on home page with searchbar
import Favorites from "./Favorites.js";
import Locations from "./Locations.js";
import locations from "./data.json";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import items from "./catalog.json";

function Catalog() {
  const [booking, setBooking] = useState([]);
  const FullCatalog = () => {
    const [ProductsCategory, setProductsCategory] = useState(items);
    const [query, setQuery] = useState("");
    const [search, setSearch] = useState(false);

    const listAllLocations = (ProductsCategory) => {
      return (
        <div>
          <div class="container" style={{ margin: 40 }}>
            <div class="row">
              {ProductsCategory.map((item, index) => (
                <div class="col" key={index}>
                  <div class="col">
                    <div
                      class="card shadow-sm"
                      style={{ width: 250, margin: 10 }}
                    >
                      <img class="card-img-top" src={item.url} />

                      <div class="card-body">
                        <div class="card-text lead">{item.location}</div>

                        <div class="card-text">{item.cost}</div>

                        <div class="card-text">{item.duration}</div>

                        <button
                          type="button"
                          class="btn"
                          style={{
                            width: 100,
                            backgroundColor: "bisque",
                            marginLeft: 110,
                          }}
                          onClick={() => setBooking(item)} // go too booking page
                        >
                          Book
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    };

    const handleChange = (e) => {
      setQuery(e.target.value);
      console.log("Target Value :", e.target.value, " Query Value :", query);
      const results = items.filter((eachProduct) => {
        if (e.target.value === "") {
          setSearch(false);
        } else {
          setSearch(true);
          return eachProduct.location
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
        }
      });

      setProductsCategory(results);
    };
    return (
      <div>
        <Form.Control
          type="text"
          size="lg"
          placeholder="Search"
          value={query}
          onChange={handleChange}
        />
        {search === true && listAllLocations(ProductsCategory)}
      </div>
    );
  };

  const Locations = () => {
    const listLocations = locations.map((el, index) => (
      <div>
        <div class="container" style={{ margin: 40 }}>
          <h3>Popular locations</h3>
          <div class="row" key={index}>
            {el.popular.map((popularItem) => (
              <div class="col">
                <div class="card shadow-sm" style={{ width: 250, margin: 10 }}>
                  <img class="card-img-top" src={popularItem.url} />

                  <div class="card-body">
                    <div class="card-text lead">{popularItem.location}</div>

                    <div class="card-text">{popularItem.cost}</div>

                    <div class="card-text">{popularItem.duration}</div>

                    <button
                      type="button"
                      class="btn"
                      style={{
                        width: 100,
                        backgroundColor: "bisque",
                        marginLeft: 110,
                      }}
                      onClick={() => setBooking(popularItem)} // go too booking page
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div class="container" style={{ margin: 40 }}>
          <h3>Deals</h3>
          <div class="row" key={index}>
            {el.deals.map((dealItem) => (
              <div class="col">
                <div class="card shadow-sm" style={{ width: 250, margin: 10 }}>
                  <img class="card-img-top" src={dealItem.url} />

                  <div class="card-body">
                    <div class="card-text lead">{dealItem.location}</div>
                    <div class="row">
                      <div class="card-text text-decoration-line-through">
                        {dealItem.costold}
                      </div>
                      <div class="card-text fw-bold">{dealItem.costnew}</div>
                    </div>
                    <div class="card-text">{dealItem.duration}</div>

                    <button
                      type="button"
                      class="btn"
                      style={{
                        width: 100,
                        marginLeft: 110,
                        backgroundColor: "lightblue",
                      }}
                      onClick={() => setBooking(dealItem)} // go too booking page
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ));

    return <div>{listLocations}</div>;
  };

  return (
    <div>
      <h1>Catalog of Trips</h1>
      <FullCatalog />
      <Locations />
      <Favorites />
    </div>
  );
}

export default Catalog;
