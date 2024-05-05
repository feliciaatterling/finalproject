// Component for favorite locations on home page
import React, { useState, useEffect } from "react";
import "./App.css";
import { BiSolidStar, BiStar } from "react-icons/bi";

function Favorites() {
  const [favs, setFavs] = useState([]);
  const [favsView, setFavsView] = useState(0);

  useEffect(() => {
    fetchFavs();
  }, []);

  const fetchFavs = async () => {
    try {
      const response = await fetch("http://localhost:8082/listFavorites");
      const favss = await response.json();
      setFavs(favss);
      console.log(favs);
    } catch (error) {
      console.error("There was a problem with the fetch operation: ", error);
    }
  };

  const AddFavorite = async (data) => {
    console.log("add data", data);
    try {
      const response = await fetch("http://localhost:8082/addFavorite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: data.id,
          location: data.location,
          cost: data.cost,
          duration: data.duration,
          url: data.url,
        }),
      });

      const result = await response.json();
      console.log("Inserted document ID:", result);
      await fetchFavs();
      setFavsView(0);
    } catch (error) {
      console.error("Failed to add the product: ", error);
    }
  };

  const removeFavorite = async (id) => {
    console.log("id", id);
    try {
      const response = await fetch(
        `http://localhost:8082/deleteFavorite/${id}`,
        {
          method: "DELETE",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ id: id }),
        }
      );
      const result = await response.json();
      await fetchFavs();
      setFavsView(0);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const listAllFavorites = (favs) => {
    return (
      <div>
        <div class="container" style={{ margin: 40 }}>
          <h3>Favorites</h3>
          <div class="row">
            {favs.map((item, index) => (
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

                      <div class="col">
                        <button
                          className="icon-button"
                          onClick={() => AddFavorite(item.id)}
                          style={{
                            background: "transparent",
                            border: "none",
                            fontSize: "30px",
                          }}
                        >
                          <BiStar />
                        </button>
                        <button
                          className="icon-button"
                          onClick={() => removeFavorite(item.id)}
                          style={{
                            background: "transparent",
                            border: "none",
                            fontSize: "30px",
                          }}
                        >
                          <BiSolidStar />
                        </button>
                        <button
                          type="button"
                          class="btn"
                          style={{
                            backgroundColor: "bisque",
                            marginLeft: 110,
                          }}
                          onClick={() => setBookingItem(dealItem)} // go too booking page
                        >
                          Book
                        </button>
                      </div>
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

  return <div>{listAllFavorites(favs)}</div>;
}

export default Favorites;
