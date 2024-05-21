import Calendar from "./Calendar";
import CalendarV2 from "./CalendarV2";

const BookingForm = ({
    checkInDate,
    checkOutDate,
    guests,
    totalDays,
    totalPrice,
    name,
    address,
    setAddress,
    setName,
    setCheckInDate,
    setCheckOutDate,
    setGuests,
    setTotalDays,
    setTotalPrice,
    place,
    handleSubmit,
    bookings,
    isCheckInSelected,
    user,
}) => {
    return (
        <form
            method="post"
            className="flex flex-col gap-4"
            onSubmit={(event) => {
                handleSubmit(event);
            }}
        >
            <div className="flex gap-4">
                <label htmlFor="check-in">
                    Check In:
                    <input
                        id="check-in"
                        type="date"
                        name="checkIn"
                        value={checkInDate}
                        placeholder="YYYY-MM-DD"
                        disabled
                        onChange={(event) => {
                            setCheckInDate(event.target.value);
                        }}
                        required
                    />
                </label>
                <label htmlFor="checkout" className="flex flex-col">
                    <span>Check Out: </span>

                    <input
                        id="checkout"
                        type="date"
                        name="checkOut"
                        value={checkOutDate}
                        placeholder="YYYY-MM-DD"
                        disabled
                        onChange={(event) => {
                            setCheckOutDate(event.target.value);
                        }}
                        required
                    />
                </label>
            </div>
            <div>
                {/*Availability  Calendar */}
                {/* <Calendar
                    checkInDate={checkInDate}
                    setCheckInDate={setCheckInDate}
                    checkOutDate={checkOutDate}
                    setCheckOutDate={setCheckOutDate}
                    setTotalDays={setTotalDays}
                    setTotalPrice={setTotalPrice}
                    price={place?.price}
                    minimumBookingDays={place?.minimumBooking}
                    maximumBookingDays={place?.maximumBooking}
                    bookings={bookings}
                /> */}
                <CalendarV2
                    checkInDate={checkInDate}
                    setCheckInDate={setCheckInDate}
                    checkOutDate={checkOutDate}
                    setCheckOutDate={setCheckOutDate}
                    setTotalDays={setTotalDays}
                    setTotalPrice={setTotalPrice}
                    price={place?.price}
                    minimumBookingDays={place?.minimumBooking}
                    maximumBookingDays={place?.maximumBooking}
                    bookings={bookings}
                />
            </div>
            <div className={`${checkOutDate ? "visible" : "hidden"}`}>
                <label htmlFor="name">
                    <input type="text" name="name"value={name} placeholder="Enter your Name" onChange={(event)=> setName(event.target.value)} />
                </label>
                <label htmlFor="address">
                    <textarea name="address"value={address} placeholder="Enter your Address" onChange={(event)=> setAddress(event.target.value)}/>
                </label>
                <label htmlFor="guests">
                    No of Guests: <b>Max- {place?.maxGuests}</b>
                    <input
                        id="guests"
                        type="number"
                        name="guests"
                        placeholder={`Max: ${place?.maxGuests} Members`}
                        required
                        min={1}
                        max={place?.maxGuests}
                        onChange={(event) => {
                            setGuests(event.target.value);
                        }}
                        value={guests}
                    />
                </label>
                <p className="font-bold text-xl ">{`₹ ${totalPrice?.toLocaleString()} for ${totalDays} ${
                    totalDays === 1 ? "night" : "nights"
                }`}</p>
            </div>
            <button className="button" type="submit">
                Book
            </button>
        </form>
    );
};

export default BookingForm;
