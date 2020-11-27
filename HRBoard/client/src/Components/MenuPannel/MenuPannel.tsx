import * as React from "react";
import { Link } from "react-router-dom";
import { FaMoneyCheckAlt, FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoMdStats, IoMdDocument, IoMdChatboxes } from "react-icons/io";
import { BiSupport } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import "./MenuPannel.scss";

interface ILink {
  text: string;
  key: string;
  icon: React.ReactElement;
  href?: string;
}

type ArrayValue = Array<ILink>;

type SubTitle = "Tools" | "Other";

type Menus = Record<SubTitle, ArrayValue>;
const menus = {
  Tools: [
    {
      text: "DashBoard",
      key: "",
      icon: <MdDashboard />,
    },
    {
      text: "Finances",
      key: "finance",
      icon: <FaMoneyCheckAlt />,
    },
    {
      text: "People",
      key: "people",
      icon: <FaUser />,
    },
    {
      text: "Statistics",
      key: "stat",
      icon: <IoMdStats />,
    },
    {
      text: "Documents",
      key: "docs",
      icon: <IoMdDocument />,
    },
  ],
  Other: [
    {
      text: "Chat",
      key: "chat",
      icon: <IoMdChatboxes />,
    },
    {
      text: "Support",
      key: "Support",
      icon: <BiSupport />,
    },
  ],
};

Object.freeze(menus);

type Props = {};

const MenuPannel: React.FC<Props> = (props) => {
  const {} = props;
  const history = useHistory();
  const [historyState, setHistoryState] = React.useState(history.location.pathname);

  React.useEffect(() => {
    history.listen((location) => {
      setHistoryState(location.pathname);
    });
  }, [history]);

  return (
    <div className="MenuPannel">
      <h3 className="title">HBoard</h3>
      <div className="section section1">
        {Object.keys(menus as Menus).map((item) => {
          return (
            <React.Fragment key={item}>
              <p className="title">{item}</p>
              <ul className="menu-list">
                {(menus as any)[item as SubTitle].map((menu: ILink) => (
                  <Link to={menu.key} key={menu.key}>
                    <li className={`menu-list__item item1 ${historyState.split("/")[1] === menu.key ? "selected" : ""}`} key={menu.key}>
                      {menu.icon}
                      <span>{menu.text}</span>
                    </li>
                  </Link>
                ))}
              </ul>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default MenuPannel;
