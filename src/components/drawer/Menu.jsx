import { useNavigate } from "react-router-dom";
import Search from "../search/CustomSearch";

import Notification from "../notifications/notification";
import { useEffect, useRef, useState } from "react";
import image from "../../assests/images/loginBg.png";

export default function Menu({ setVisible }) {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);

  const notificationRef = useRef(null);

  const notifications = [
    {
      message: "Liked your post",
      user: "John Doe",
      time: "Yesterday",
      avatar: image,
    },
    {
      message: "Commented on your post",
      user: "Jane Smith",
      time: "2 hours ago",
      avatar: image,
    },
  ];
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotification(false);
      }
    };

    if (showNotification) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNotification]);
  return (
    <>
      <div
        style={{
          backgroundColor: `var(--primary-light)`,
          minHeight: "10%",

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "var(--text-white)",
        }}
      >
        <i
          className="pi pi-bars ml-3 text-2xl   lg:hidden"
          onClick={() => setVisible(true)}
          style={{ color: "var(--text-white)" }}
        ></i>

        <p
          className="ml-2 font-semibold text-lg lg:text-2xl  "
          style={{ color: "var(--text-white)" }}
        >
          React Framework
        </p>
        <div className="hidden lg:block">
          <Search
            placeholder={"Search..."}
            className={"hidden lg:flex"}
            iconClassName={""}
            style={{ color: "var(--text-white)" }}
          />
        </div>

        <div>
          <i
            className="pi pi-bell text-lg lg:text-2xl  border-circle bg-primary p-1"
            style={{ color: "var(--text-white)" }}
            onClick={() => setShowNotification(!showNotification)}
          />
          <i
            className="pi   pi-user text-lg lg:text-2xl  border-circle mx-2 bg-primary p-1"
            style={{ color: "var(--text-white)" }}
            onClick={() => navigate("/profile")}
          />
        </div>
      </div>

      {showNotification && (
        <div ref={notificationRef}>
          <Notification
            notifications={notifications}
            onClick={() => {
              console.log("Notification clicked");
            }}
          />
        </div>
      )}
    </>
  );
}
