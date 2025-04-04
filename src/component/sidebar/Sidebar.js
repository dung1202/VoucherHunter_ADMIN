import "./sidebar.css";
import EditIcon from "@mui/icons-material/Edit";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import {
  // LineStyle,
  // Timeline,
  // TrendingUp,
  PermIdentity,
  Storefront,
  // DynamicFeed,
  // ChatBubbleOutline,
  // Report,
  // } from "@material-ui/icons";
} from "@mui/icons-material";

import RequestPageOutlinedIcon from "@mui/icons-material/RequestPageOutlined";
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li>
          </ul>
        </div> */}
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/user" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/user/newuser" className="link">
              <li className="sidebarListItem">
                <PersonAddAltIcon className="sidebarIcon" />
                Newadmin
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to="/products/newproduct" className="link">
              <li className="sidebarListItem">
                <AddBusinessIcon className="sidebarIcon" />
                Newproduct
              </li>
            </Link>
            <Link to="/createnews" className="link">
              <li className="sidebarListItem">
                <EditIcon className="sidebarIcon" />
                Create news
              </li>
            </Link>
            <Link to="/newsdashboards" className="link">
              <li className="sidebarListItem">
                <NewspaperIcon className="sidebarIcon" />
                NewsDashBoards
              </li>
            </Link>
            <Link to="/invoice" className="link">
              <li className="sidebarListItem">
                <RequestPageOutlinedIcon className="sidebarIcon" />
                Invoice
              </li>
            </Link>
            <Link to="/newsletter" className="link">
              <li className="sidebarListItem">
                <MarkEmailUnreadOutlinedIcon className="sidebarIcon" />
                Newsletter
              </li>
            </Link>
          </ul>
        </div>
        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <Link to="/message" className="link">
              <li className="sidebarListItem">
                <ChatBubbleOutline className="sidebarIcon" />
                Message
              </li>
            </Link>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
}
