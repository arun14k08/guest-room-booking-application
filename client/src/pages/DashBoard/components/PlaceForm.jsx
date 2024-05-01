const PlaceForm = () => {
    return (
        <div>
            <form method="post" 
                className="px-8 py-6 flex flex-col gap-3"
                >
                <label htmlFor="name">
                    Name of the Place:
                    <input
                        id="name"
                        type="text"
                        placeholder="Enter your Place Name"
                    />
                </label>
                <label htmlFor="description">
                    Description:
                    <input
                        id="description"
                        type="text"
                        placeholder="Enter your Place Description"
                    />
                </label>
                <label htmlFor="location">
                    Location:
                    <input
                        id="location"
                        type="text"
                        placeholder="Enter your Place Address"
                    />
                </label>
                <label htmlFor="price">
                    Price:
                    <input
                        id="price"
                        type="text"
                        placeholder="Enter the Price"
                    />
                </label>
                <label htmlFor="image" className="cursor-pointer">
                    Image:
                    <div className="size-32 border-2 border-slate-500 rounded-lg">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth=".5"
                            stroke="currentColor"
                            className="w-full"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                    </div>
                    <input id="image" type="file" className="hidden" />
                </label>
                <button
                    className="button"
                    >Add Place</button>
            </form>
        </div>
    );
};

export default PlaceForm;
