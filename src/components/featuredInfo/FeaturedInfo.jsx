import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Drivers</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">15</span>
          <span className="featuredMoneyRate">
            3 <ArrowUpward className="featuredIcon positive" />
          </span>
        </div>
        <span className="featuredSub">Last 2 hours</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Riders</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">80</span>
          <span className="featuredMoneyRate">
            6 <ArrowUpward className="featuredIcon positive" />
          </span>
        </div>
        <span className="featuredSub">Last 2 hours</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Trips</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">134</span>
          <span className="featuredMoneyRate">
            +24 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Last 2 hours</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$1,347</span>
          <span className="featuredMoneyRate">
            +357 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Last 2 hours</span>
      </div>
    </div>
  );
}
