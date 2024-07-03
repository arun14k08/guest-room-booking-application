const PlaceCardsShimmer = () => {
    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array(10)
                .fill({})
                .map((_, index) => {
                    return (
                        <div
                            key={index}
                            className="shadow-lg px-4 py-4 rounded-md flex flex-col gap-3 cursor-pointer transition-all bg-white buffer min-h-[416px]"
                        >
                            <div className="bg-slate-300 min-h-[78%] rounded-lg">
                                &nbsp;
                            </div>
                            <div className="bg-slate-300 max-h-4 max-w-[65%] rounded-lg">
                                &nbsp;
                            </div>
                            <div className="bg-slate-300 max-h-4 max-w-[95%] rounded-lg">
                                &nbsp;
                            </div>
                            <div className="bg-slate-300 max-h-4 max-w-[25%] rounded-lg">
                                &nbsp;
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default PlaceCardsShimmer;
