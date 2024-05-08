export let days = [
    {
        id: 1,
        name: "Sun",
    },
    {
        id: 2,
        name: "Mon",
    },
    {
        id: 3,
        name: "Tue",
    },
    {
        id: 4,
        name: "Wed",
    },
    {
        id: 5,
        name: "Thu",
    },
    {
        id: 6,
        name: "Fri",
    },
    {
        id: 7,
        name: "Sat",
    },
];

export let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

// write a function to get the number of days in a given month

export function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}
