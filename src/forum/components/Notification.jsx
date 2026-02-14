import React from "react";

import "../styles/notifications.css"

const Notification = () => {
  return (
    <div className="notification-container">
      <div className="header">
        <span>Notifications</span>
      </div>
      <div className="notifications">
        <div className="notification unread">
          <div className="user-avatar">
            <img src="https://i.stack.imgur.com/5Kgaq.jpg?s=192&g=1" alt="pfp" />
          </div>
          <div className="description">
            <div className="text">
              <p className="mutual-friend">Rakul Singh</p>
              <p>and 23 others upvoted your post</p>
            </div>
            <div className="time text-muted">
              10 mins ago
            </div>
          </div>
        </div>
        <div className="notification">
          <div className="user-avatar">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwX9qBxst5evuOaVeYKH28O09mwfzN_yeSsOnHYqnnvjgeygbwU-b9N0Oj2dF6zWncAcI&usqp=CAU" alt="pfp" />
          </div>
          <div className="description">
            <div className="text">
              <p className="mutual-friend">Yaman Sarbariya</p>
              <p>commented on your post</p>
            </div>
            <div className="time text-muted">
              30 mins ago
            </div>
          </div>
        </div>
        <div className="notification">
          <div className="user-avatar">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYGY7hEAIBV9_PWjpbY8Ufx_XIHR6zP_zqUbozsFurx6veVKqL3KLj5Gt8wl04OME7FKA&usqp=CAU" alt="pfp" />
          </div>
          <div className="description">
            <div className="text">
              <p className="mutual-friend">Prabesh Shrestha</p>
              <p>and 4 others shared your post</p>
            </div>
            <div className="time text-muted">
              2 hours ago
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
