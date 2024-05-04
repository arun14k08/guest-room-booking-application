import { X } from "./SVGAssets";

const Modal = ({ open, setOpen, children }) => {
    return (
        <div
            className={`${
                open ? "visible" : "invisible"
            } fixed inset-0 flex flex-col justify-center items-center bg-[#6666665c] z-[999]`}
            onClick={() => setOpen(false)}
        >
            <div
                onClick={(event) => event.stopPropagation()}
                className="bg-white rounded-xl p-4 pt-8 relative"
            >
                <div
                    className="absolute top-2 right-2 cursor-pointer hover:bg-slate-300 rounded-full p-1"
                    onClick={() => setOpen(false)}
                >
                    <X />
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
