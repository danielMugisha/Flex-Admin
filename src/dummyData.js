import axios from "axios";
const API_URL = "http://localhost:8080/api/drivers";
const API_BASE_URL = "http://localhost:8080/";

// window.onload = () => {
//   getDrivers();
// };

export const driverData = [
  {
    name: "Jan",
    "Active Drivers": 40,
  },
  {
    name: "Feb",
    "Active Drivers": 50,
  },
  {
    name: "Mar",
    "Active Drivers": 64,
  },
  {
    name: "Apr",
    "Active Drivers": 102,
  },
  {
    name: "May",
    "Active Drivers": 97,
  },
  {
    name: "Jun",
    "Active Drivers": 86,
  },
  {
    name: "Jul",
    "Active Drivers": 90,
  },
  {
    name: "Agu",
    "Active Drivers": 96,
  },
  {
    name: "Sep",
    "Active Drivers": 105,
  },
  {
    name: "Oct",
    "Active Drivers": 120,
  },
  {
    name: "Nov",
    "Active Drivers": 137,
  },
  {
    name: "Dec",
    "Active Drivers": 137,
  },
];

export const riderData = [
  {
    name: "Jan",
    "Active Riders": 47,
  },
  {
    name: "Feb",
    "Active Riders": 50,
  },
  {
    name: "Mar",
    "Active Riders": 70,
  },
  {
    name: "Apr",
    "Active Riders": 74,
  },
  {
    name: "May",
    "Active Riders": 69,
  },
  {
    name: "Jun",
    "Active Riders": 80,
  },
  {
    name: "Jul",
    "Active Riders": 87,
  },
  {
    name: "Agu",
    "Active Riders": 90,
  },
  {
    name: "Sep",
    "Active Riders": 105,
  },
  {
    name: "Oct",
    "Active Riders": 135,
  },
  {
    name: "Nov",
    "Active Riders": 200,
  },
  {
    name: "Dec",
    "Active Riders": 202,
  },
];

export const productData = [
  {
    name: "Jan",
    Sales: 4000,
  },
  {
    name: "Feb",
    Sales: 3000,
  },
  {
    name: "Mar",
    Sales: 5000,
  },
];

export const dummydrivers = [
  {
    id: 1,
    username: "Jon Snow",
    avatar:
      "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "jon@gmail.com",
    status: "active",
    rating: "5",
  },
  {
    id: 2,
    username: "Jon Snow",
    avatar:
      "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "jon@gmail.com",
    status: "active",
    rating: "5",
  },
  {
    id: 3,
    username: "Jon Snow",
    avatar:
      "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "jon@gmail.com",
    status: "active",
    rating: "5",
  },
  {
    id: 4,
    username: "Jon Snow",
    avatar:
      "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "jon@gmail.com",
    status: "active",
    rating: "5",
  },
  {
    id: 5,
    username: "Jon Snow",
    avatar:
      "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "jon@gmail.com",
    status: "active",
    rating: "5",
  },
  {
    id: 6,
    username: "Jon Snow",
    avatar:
      "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "jon@gmail.com",
    status: "active",
    rating: "5",
  },
  {
    id: 7,
    username: "Jon Snow",
    avatar:
      "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "jon@gmail.com",
    status: "active",
    rating: "5",
  },
  {
    id: 8,
    username: "Jon Snow",
    avatar:
      "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "jon@gmail.com",
    status: "active",
    rating: "5",
  },
];

// const getDrivers = async () => {
//   var serverDrivers = [];
//   const res = await axios.get(API_URL);
//   console.log("response data", res);
//   const data = res.data;
//   console.log("data", data);
//   var count = 1;
//   data.forEach((d) => {
//     var driver = {
//       id: count++,
//       username: d.lname + " " + d.fname,
//       avatar:
//         "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//       email: d.email,
//       status: d.status,
//       rating: "5",
//     };
//     serverDrivers.push(driver);
//   });
//   drivers = [...serverDrivers];
//   console.log(drivers);
//   return drivers;
// };

// export const serverData = drivers;

export const productRows = [
  {
    id: 1,
    name: "Apple Airpods",
    img: "https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    stock: 123,
    status: "active",
    price: "$120.00",
  },
  {
    id: 2,
    name: "Apple Airpods",
    img: "https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    stock: 123,
    status: "active",
    price: "$120.00",
  },
  {
    id: 3,
    name: "Apple Airpods",
    img: "https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    stock: 123,
    status: "active",
    price: "$120.00",
  },
  {
    id: 4,
    name: "Apple Airpods",
    img: "https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    stock: 123,
    status: "active",
    price: "$120.00",
  },
  {
    id: 5,
    name: "Apple Airpods",
    img: "https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    stock: 123,
    status: "active",
    price: "$120.00",
  },
  {
    id: 6,
    name: "Apple Airpods",
    img: "https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    stock: 123,
    status: "active",
    price: "$120.00",
  },
  {
    id: 7,
    name: "Apple Airpods",
    img: "https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    stock: 123,
    status: "active",
    price: "$120.00",
  },
  {
    id: 8,
    name: "Apple Airpods",
    img: "https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    stock: 123,
    status: "active",
    price: "$120.00",
  },
  {
    id: 9,
    name: "Apple Airpods",
    img: "https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    stock: 123,
    status: "active",
    price: "$120.00",
  },
  {
    id: 10,
    name: "Apple Airpods",
    img: "https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    stock: 123,
    status: "active",
    price: "$120.00",
  },
];
