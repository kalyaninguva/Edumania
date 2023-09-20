import React from "react";
import { Link } from "react-router-dom";

const DisplayNotices = ({ notices }) => {
  console.log("in displaynotices");
    console.log(notices);

  return (
    <div style={{ backgroundColor: "#deebff", fontFamily: "sans-serif" }}>
      {notices.map((noti, index) => (
        <div key={noti._id}>
          <p style={{ color: "#ffa6a6" }}>
            <b>Result {index}</b>
          </p>
          <p>
            <b>Notice Title: </b> {noti.title}
          </p>
          <p>
            <b>Organisation name: </b>
            {noti.name}
          </p>
        
          <p>
            <b>Notice: </b>
            {noti.body}
          </p>
          <br></br>
          <br></br>
        </div>
      ))}
      <Link to="/notice">Go to Search</Link>
    </div>
  );
};

export default DisplayNotices;
