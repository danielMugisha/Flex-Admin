import "./requestList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link, Redirect } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setDrivers } from "../../store/actions/driverActions";

const RequestList = () => {
	const user = useSelector((state) => state.firebase.auth);
	const data = useSelector((state) => state.allRequests.requests);

	//console.log(data[0].serverTimestamp());

	const handleDelete = (id) => {
		//setData(data.filter((item) => item.id !== id));
	};

	const columns = [
		{ field: "uid", headerName: "ID", width: 90, align: "right" },
		{
			field: "riderId",
			headerName: "Customer",
			width: 200,
		},
		{
			field: "location",
			headerName: "Pick Up Location",
			width: 200,
			valueGetter: (params) => {
				console.log({ params });
				let result = [];
				if (params.row.location) {
					if (params.row.location.name) {
						result.push(params.row.location.name);
					} else {
						result.push(params.row.location);
					}
					return result;
				}
			},
		},
		{
			field: "destination",
			headerName: "Destination",
			width: 200,
			valueGetter: (params) => {
				console.log({ params });
				let result = [];
				if (params.row.destination) {
					if (params.row.destination.name) {
						result.push(params.row.destination.name);
					} else {
						result.push(params.row.destination);
					}
					return result;
				}
			},
		},
		{
			field: "status",
			headerName: "Status",
			width: 200,
		},
		{
			field: "action",
			headerName: "Action",
			width: 150,
			renderCell: (params) => {
				return (
					<>
						<Link to={"/driver/" + params.row.id}>
							<button className="userListEdit">View</button>
						</Link>
						<DeleteOutline
							className="userListDelete"
							onClick={() => {
								console.log("id", params.row.id);
								handleDelete(params.row.id);
							}}
						/>
					</>
				);
			},
			sortable: false,
		},
	];

	if (!user.uid) return <Redirect to="login" />;
	return (
		<>
			<div className="userList">
				<h1 className="driversTitle">Requests</h1>
				<DataGrid
					autoHeight
					rows={data}
					disableSelectionOnClick
					columns={columns}
					pageSize={8}
					checkboxSelection
				/>
				<Link>
					<button className="driverAddButton">Register a new user</button>
				</Link>
			</div>
		</>
	);
};

export default RequestList;
