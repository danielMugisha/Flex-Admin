import "./carCategory.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setDrivers } from "../../store/actions/driverActions";

const CarCategory = () => {
	const user = useSelector((state) => state.firebase.auth);

	const data = useSelector((state) => state.allCategories.categories);
	console.log("datatttta", data);
	// ADD CATEGORY START
	const ADD_URL = `${process.env.REACT_APP_API}/car/category/add`;
	const [subCategories, setSubCategories] = useState([]);
	const [name, setName] = useState("");
	const [subCat, setSubCat] = useState("");

	const handleChange = (e) => {
		console.log(e.target.value);
		console.log(subCategories);
		setName(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const category = { categoryName: name, subCategories: subCategories };
		try {
			axios({
				method: "post",
				url: ADD_URL,
				data: category,
				headers: { "Content-Type": "application/json" },
			})
				.then(function (response) {
					//handle success
					document.getElementById("myForm").reset();
					window.alert("sub category saved");
				})
				.catch(function (response) {
					//handle error
					window.alert("something went wrong");
				});
		} catch (err) {
			console.log(err);
			window.alert("something went wrong");
		}
	};

	const addSubCat = (e) => {
		document.getElementById("subcat").value = "";
		e.preventDefault();
		setSubCategories([...subCategories, subCat]);
		console.log(subCategories);
	};

	const renderSubCategories = (array) => array.map((s) => <li>{s}</li>);

	// ADD CATEGORY END

	// EDIT CATEGORY START
	const UPDATE_URL = `${process.env.REACT_APP_API}/car/category/update`;

	const [selectedCat, setSelectedCat] = useState(null);
	const [selectedSubCats, setSelectedSubCats] = useState([]);
	const [newName, setNewName] = useState("");
	const [newSubCat, setNewSubCat] = useState("");

	const onUpdate = (e) => {
		e.preventDefault();
		const category = {
			categoryId: selectedCat.id,
			categoryName: newName,
			subCategories: selectedSubCats,
		};
		console.log(" update category:", category);
		try {
			axios({
				method: "put",
				url: UPDATE_URL,
				data: category,
				headers: { "Content-Type": "application/json" },
			})
				.then(function (response) {
					//handle success
					console.log(response);
					document.getElementById("myForm").reset();
					window.alert("category updated");
				})
				.catch(function (response) {
					//handle error
					console.log(response);
					window.alert("something went wrong");
				});
		} catch (err) {
			console.log(err);
			window.log("something went wrong");
		}
	};

	const addNewSubCat = (e) => {
		document.getElementById("subcat").value = "";
		e.preventDefault();
		setSelectedSubCats([...selectedSubCats, newSubCat]);
		console.log(selectedSubCats);
	};

	useEffect(() => {
		if (selectedCat) {
			setSelectedSubCats(selectedCat.subCategories);
			setNewName(selectedCat.categoryName);
		}
		console.log("selected", selectedCat);
	}, [selectedCat]);
	// EDIT CATEGORY END

	const handleDelete = (id) => {
		//setData(data.filter((item) => item.id !== id));
	};
	const [show, setShow] = useState(true);

	const columns = [
		{ field: "uid", headerName: "ID", width: 90, align: "right" },

		{
			field: "categoryName",
			headerName: "Category",
			width: 200,
			sortable: true,
		},
		{
			field: "action",
			headerName: "Action",
			width: 150,
			renderCell: (params) => {
				return (
					<>
						<button className="userListEdit">Edit</button>

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

	const onCancel = (e) => {
		document.getElementById("myForm").reset();
	};
	if (!user.uid) return <Redirect to="/login" />;
	return (
		<>
			<h1>Categories</h1>
			<div className="wrapper">
				<div className="catList">
					<DataGrid
						autoHeight
						disableMultipleSelection
						rows={data}
						columns={columns}
						pageSize={8}
						onRowSelected={(e) => {
							setSelectedCat(e.data);
						}}
					/>
				</div>
				<div className="catList">
					{!selectedCat ? (
						<div className="newUser">
							<h3 className="subTitle">Add Car Category</h3>
							<div className="formWindow">
								<form id="myForm" className="newUserForm">
									<div className="newUserItem">
										<label>Category Name</label>
										<input
											type="text"
											placeholder="Bus"
											name="name"
											onChange={handleChange}
										/>
									</div>
									<div className="newUserItem">
										<label>Sub Category</label>
										<div className="addPanel">
											<input
												id="subcat"
												type="text"
												placeholder="Coaster"
												name="subcat"
												onChange={(e) => setSubCat(e.target.value)}
											/>
											<button className="addButton" onClick={addSubCat}>
												ADD
											</button>
										</div>
									</div>
									<div className="catDisplay">
										<h4> added sub categories</h4>
										{<ul>{renderSubCategories(subCategories)}</ul>}
									</div>
									<div className="buttons">
										<div className="createButton">
											<button
												className="newUserButton"
												onClick={(e) => onSubmit(e)}
											>
												Create Category
											</button>
										</div>
										<div className="cancelButton">
											<button
												name="cancelAdd"
												className="newUserButton"
												onClick={onCancel}
											>
												Cancel
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					) : (
						<div className="newUser">
							<h3 className="subTitle">Edit Car Category</h3>
							<div className="formWindow">
								<form id="myForm" className="newUserForm">
									<div className="newUserItem">
										<label>Category Name</label>
										<input
											type="text"
											placeholder="Bus"
											name="name"
											placeholder={selectedCat.categoryName}
											onChange={(e) => setNewName(e.target.value)}
										/>
									</div>
									<div className="newUserItem">
										<label>Sub Category</label>
										<div className="addPanel">
											<input
												id="subcat"
												type="text"
												placeholder="Coaster"
												name="subcat"
												onChange={(e) => setNewSubCat(e.target.value)}
											/>
											<button className="addButton" onClick={addNewSubCat}>
												ADD
											</button>
										</div>
									</div>
									<div className="catDisplay">
										<h4> added sub categories</h4>
										{console.log(selectedCat.subCategories)}
										{<ul>{renderSubCategories(selectedSubCats)}</ul>}
									</div>
									<div className="buttons">
										<div className="createButton">
											<button
												className="newUserButton"
												onClick={(e) => onUpdate(e)}
											>
												Update Category
											</button>
										</div>
										<div className="cancelButton">
											<button
												name="cancelEdit"
												className="newUserButton"
												onClick={onCancel}
											>
												Cancel
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default CarCategory;
