import "./riderList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const RiderList = () => {
	const user = useSelector((state) => state.firebase.auth);
	const data = useSelector((state) => state.allRiders.riders);

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
			field: "Requests",
			headerName: "Requests",
			width: 120,
		},
		{
			field: "Rides",
			headerName: "Rides",
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
						<Link to={"/rider/" + params.row.id}>
							<button className="userListEdit">View</button>
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

	if (!user.uid) return <Redirect to="login" />;
	return (
		<div className="userList">
			<h1 className="driversTitle">Customers</h1>
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

export default RiderList;
