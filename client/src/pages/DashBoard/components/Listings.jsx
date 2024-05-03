import PropTypes from "prop-types";

const Listings = ({ places, redirectToEditPage }) => {
    if (!places) return <p>Loading...</p>;
    return (
        <>
            {places.length > 0 &&
                places.map((place) => {
                    return (
                        <div
                            className="flex gap-4 relative  bg-slate-100 px-8 py-6 mx-8 my-4 rounded-lg"
                            key={place._id}
                        >
                            <div className="w-[450px] max-h-[250px] rounded-lg flex flex-col justify-center overflow-hidden">
                                <img
                                    src={
                                        "http://localhost:3000/uploads/" +
                                        place.photos[0]
                                    }
                                    alt="thumbnail"
                                    className="rounded-lg object-cover"
                                />
                            </div>
                            <div className="w-full flex flex-col justify-between">
                                <div className="flex w-full justify-between">
                                    <div className="flex flex-col gap-2 max-w-[95%] px-4 py-2">
                                        <h2 className="text-[24px] font-semibold capitalize leading-8">
                                            {place.name}
                                        </h2>
                                        <p className="text-[14px] font-normal line-clamp-3">
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            {place.description}
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-10 hover:bg-slate-300 cursor-pointer rounded-full p-2"
                                            onClick={() =>
                                                redirectToEditPage(place._id)
                                            }
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                            />
                                        </svg>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="size-10 hover:bg-slate-300 cursor-pointer rounded-full p-2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex ml-2 mb-2 py-4 px-6 gap-6 bg-slate-300 rounded-full mt-6 font-semibold text-[#525252] w-fit">
                                    <p className="text-[16px]">
                                        $ {place.price}
                                    </p>
                                    <div className="w-[1px] -my-4 bg-slate-500 rounded-md">
                                        &nbsp;
                                    </div>
                                    <p className="text-[16px] flex gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
                                            />
                                        </svg>
                                        Rooms: {place.rooms}
                                    </p>
                                    <div className="w-[1px] -my-4 bg-slate-500 rounded-md">
                                        &nbsp;
                                    </div>
                                    <p className="text-[16px] flex gap-2">
                                        <img
                                            width="16"
                                            height="16"
                                            src="https://img.icons8.com/ios/50/bed.png"
                                            alt="bed"
                                        />
                                        Beds: {place.beds}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </>
    );
};

Listings.propTypes = {
    places: PropTypes.arrayOf({
        name: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.number,
        rooms: PropTypes.number,
        beds: PropTypes.number,
        photos: PropTypes.arrayOf(PropTypes.string),
    }),
    redirectToEditPage: PropTypes.func,
};

export default Listings;
