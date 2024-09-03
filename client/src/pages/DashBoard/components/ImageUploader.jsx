import {
    FileUploaderMinimal,
    FileUploaderRegular,
} from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
const ImageUploader = ({ photos, setPhotos }) => {
    const handleChangeEvent = (items) => {
        setPhotos([
            ...items.allEntries
                .filter((file) => file.status === "success")
                .map((file) => {
                    return file.uuid;
                }),
        ]);
    };

    console.log(photos);

    return (
        <>
            <FileUploaderMinimal
                pubkey={`${import.meta.env.VITE_IMAGE_API_KEY}`}
                maxLocalFileSizeBytes={10000000}
                imgOnly={true}
                sourceList="local, url, camera, gdrive"
                onChange={handleChangeEvent}
            />
            <div className="grid grid-cols-4 lg:grid-cols-4 gap-4">
                {photos?.length > 0 ? (
                    photos?.map((photo, index) => {
                        return (
                            <div
                                key={index}
                                className="flex justify-center items-center h-32 overflow-hidden rounded-lg relative"
                            >
                                <img
                                    src={`${
                                        import.meta.env.VITE_UPLOAD_CARE_URL
                                    }${photo}/`}
                                    className="rounded-lg object-cover"
                                    alt={"photo" + index}
                                />
                                {/* <button
                                className="absolute bottom-1 right-1 rounded-full bg-slate-200"
                                onClick={(event) => {
                                    handleDeletePhoto(event, photo);
                                }}
                            >
                                <DeleteIcon />
                            </button>  */}
                            </div>
                        );
                    })
                ) : (
                    <p className="flex justify-center items-center">
                        No photos added
                    </p>
                )}
            </div>
        </>
    );
};

export default ImageUploader;
