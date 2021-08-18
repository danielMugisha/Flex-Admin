import "./usersList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link, Redirect } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setDrivers } from "../../store/actions/driverActions";

const UsersList = () => {
	const user = useSelector((state) => state.firebase.auth);
	const data = useSelector((state) => state.allUsers.users);

	//console.log(data[0].serverTimestamp());

	const handleDelete = (id) => {
		//setData(data.filter((item) => item.id !== id));
	};

	const columns = [
		{ field: "uid", headerName: "ID", width: 90, align: "right" },
		{
			field: "firstName",
			headerName: "First Name",
			width: 200,
			sortable: false,
		},
		{
			field: "lastName",
			headerName: "Last Name",
			width: 200,
			sortable: false,
		},
		{
			field: "role",
			headerName: "Role",
			width: 120,
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
				<h1 className="driversTitle">Users</h1>
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

export default UsersList;
