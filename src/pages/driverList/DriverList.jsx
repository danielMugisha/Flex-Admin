import "./driverList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setDrivers } from "../../store/actions/driverActions";

const DriverList = () => {
  const API_URL = "http://localhost:8080/api/drivers";

  const data = useSelector((state) => state.allDrivers.drivers);
  const dispatch = useDispatch();

  const fetchDrivers = async () => {
    const response = await axios.get(API_URL).catch((err) => {
      console.log(err);
    });
    dispatch(setDrivers(response.data));
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleDelete = (id) => {
    //setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "uid", headerName: "ID", width: 90, align: "right" },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <div className="userListImg">
              {params.row.fname[0]}
              {params.row.lname[0]}
            </div>
            {params.row.fname} {params.row.lname}
          </div>
        );
      },
      sortable: false,
    },
    { field: "email", headerName: "Email", width: 200, sortable: false },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "address",
      headerName: "Address",
      width: 120,
      sortable: false,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
      sortable: false,
    },
  ];

  return (
    <div className="userList">
      <h1 className="driversTitle">Drivers</h1>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
};

export default DriverList;
