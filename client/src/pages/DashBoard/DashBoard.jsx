import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { Navigate } from "react-router";
import axios from "axios";

const DashBoard = () => {
    const { user } = useContext(UserContext);
    const [redirect, setRedirect] = useState("");
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get("/listings").then((response) => {
            setPlaces(response.data);
        });
    }, []);

    const addNewPlace = () => {
        setRedirect("/places/new");
    };

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    if (!user) {
        return <Navigate to={"/"} />;
    }
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="px-8 mt-8 w-full justify-end">
                <button
                    onClick={() => {
                        addNewPlace();
                    }}
                    className="button ml-auto"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                    </svg>
                    Add a new Place
                </button>
            </div>
            <div className="flex flex-col gap-4">
                {places.length > 0
                    ? places.map((place) => {
                          return (
                              <div
                                  className="flex gap-4 bg-slate-100 px-6 py-4 mx-8 my-4 rounded-lg"
                                  key={place._id}
                              >
                                  <div className="w-[250px]">
                                      <img
                                          src={
                                              "http://localhost:3000/uploads/" +
                                              place.photos[0]
                                          }
                                          alt="thumbnail"
                                          className="w-full rounded-lg"
                                      />
                                  </div>
                                  <div className="">
                                      <h2 className="text-[24px] font-semibold capitalize leading-8">
                                          {place.name}
                                      </h2>
                                      <p className="text-[14px] font-normal">
                                          {place.description}
                                      </p>
                                      <div className="flex gap-6 bg-slate-300 rounded-full mt-6 font-semibold text-[#525252] w-fit px-4">
                                          <p className="text-[16px]">
                                              $ {place.price}
                                          </p>
                                          <p className="text-[16px]">
                                              Rooms: {place.rooms}
                                          </p>
                                          <p className="text-[16px]">
                                              Beds: {place.beds}
                                          </p>
                                      </div>
                                  </div>
                              </div>
                          );
                      })
                    : "No places Added"}
            </div>
        </div>
    );
};

export default DashBoard;
