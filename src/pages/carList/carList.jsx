import "./carList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setDrivers } from "../../store/actions/driverActions";

const CarList = () => {
	const user = useSelector((state) => state.firebase.auth);
	const data = useSelector((state) => state.allCars.cars);

	const handleDelete = (id) => {
		//setData(data.filter((item) => item.id !== id));
	};

	const columns = [
		{ field: "uid", headerName: "ID", width: 90, align: "right" },
		{
			field: "owner",
			headerName: "Owner",
			width: 200,
			// renderCell: (params) => {
			// 	return (
			// 		<div className="userListUser">
			// 			<div className="userListImg">
			// 				{params.row.fname[0]}
			// 				{params.row.lname[0]}
			// 			</div>
			// 			{params.row.fname} {params.row.lname}
			// 		</div>
			// 	);
			// },
			sortable: false,
		},
		{ field: "category", headerName: "Category", width: 200, sortable: true },
		{
			field: "subCategory",
			headerName: "Sub Category",
			width: 150,
			sortable: true,
		},
		{
			field: "serviceCategory",
			headerName: "Service Category",
			width: 150,
			sortable: true,
		},
		{
			field: "seats",
			headerName: "Seats",
			width: 90,
			sortable: true,
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
	if (!user.uid) return <Redirect to="/login" />;
	return (
		<>
			<div className="carList">
				<h1>Cars</h1>
				<DataGrid
					autoHeight
					rows={data}
					disableSelectionOnClick
					columns={columns}
					pageSize={8}
					checkboxSelection
				/>
				<div className="carListButtons">
					<Link to={"/carCategory"}>
						<Button variant="contained" color="primary">
							Car Categories
						</Button>
					</Link>{" "}
					<Link to={"/newCar"}>
						<Button variant="contained" color="primary">
							add a Car
						</Button>
					</Link>
				</div>
			</div>
		</>
	);
};

export default CarList;
