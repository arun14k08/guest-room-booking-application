const PlacePageShimmer = () => {
    return (
        <div className="flex flex-col gap-4 mx-24 mb-12 buffer">
            <div className="bg-slate-300 h-6 max-w-[45%] rounded-lg">
                &nbsp;
            </div>
            <div className="bg-slate-300 h-6 max-w-[25%] rounded-lg">
                &nbsp;
            </div>
            <div className="bg-slate-300 h-[450px] max-w-[95%] rounded-lg">
                &nbsp;
            </div>
            <div className="flex justify-between mr-16">
                <div className="bg-slate-100 h-[500px] w-[55%] flex flex-col gap-4 px-6 py-4">
                    <div className="bg-slate-300 h-6 max-w-[25%] rounded-lg">
                        &nbsp;
                    </div>
                    <div className="bg-slate-300 h-6 max-w-[55%] rounded-lg">
                        &nbsp;
                    </div>
                    <div className="bg-slate-300 h-[500px] max-w-[85%] rounded-lg">
                        &nbsp;
                    </div>
                </div>
                <div className="bg-slate-300 h-[500px] w-[35%] rounded-lg">
                    &nbsp;
                </div>
            </div>
        </div>
    );
};

export default PlacePageShimmer;
