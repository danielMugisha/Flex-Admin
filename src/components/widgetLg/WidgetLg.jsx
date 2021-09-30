import "./widgetLg.css";

export default function WidgetLg() {
	const Button = ({ type }) => {
		return <button className={"widgetLgButton " + type}>{type}</button>;
	};
	return (
		<div className="widgetLg">
			<h3 className="widgetLgTitle">Latest Trips</h3>
			<table className="widgetLgTable">
				<tr className="widgetLgTr">
					<th className="widgetLgTh">Customer</th>
					<th className="widgetLgTh">Date</th>
					<th className="widgetLgTh">Amount</th>
					<th className="widgetLgTh">Status</th>
				</tr>
			</table>
			<div
				style={{
					width: "100%",
					height: "300px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				No Confirmed Trips
			</div>
		</div>
	);
}
