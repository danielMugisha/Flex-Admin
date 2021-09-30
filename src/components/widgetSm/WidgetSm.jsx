import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { SortedData } from "../../dummyData";

export default function WidgetSm() {
	const newMembers = SortedData();
	return (
		<div className="widgetSm">
			<span className="widgetSmTitle">Newly Joined Members</span>
			<ul className="widgetSmList">
				{newMembers &&
					newMembers.slice(0, 5).map((member) => {
						return (
							<li className="widgetSmListItem">
								<div
									className="widgetSmImg"
									style={{
										backgroundColor: "lightgrey",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<span className="widgetSmUsername">
										{member.fname[0]}
										{member.lname[0]}
									</span>
								</div>
								<div className="widgetSmUser">
									<span className="widgetSmUsername">
										{member.fname} {member.lname}
									</span>
									{member.status ? (
										<span className="widgetSmUserTitle">Driver</span>
									) : (
										<span className="widgetSmUserTitle">Rider</span>
									)}
								</div>
								<button className="widgetSmButton">
									<Visibility className="widgetSmIcon" />
									Display
								</button>
							</li>
						);
					})}
			</ul>
		</div>
	);
}
