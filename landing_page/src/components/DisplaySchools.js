import React from "react";
import { Link } from "react-router-dom";

const DisplaySchools = ({ schools }) => {
  console.log(schools);

  return (
    <div style={{backgroundColor:'#99ff99', fontFamily:'cursive' }}>
      {schools.map((sch, index) => (
        <div key={sch._id}>
          <p style={{ color: "red" }}>
            <b>Result {index}</b>
          </p>
          <p>
            <b>Name: </b> {sch.name}
          </p>
          <p>
            <b>Type: </b>
            {sch.type}
          </p>
          <p>
            <b>Capacity: </b>
            {sch.capacity}
          </p>
          <p>
            <b>Contact: </b>
            {sch.contact}
          </p>
          <p>
            <b>City: </b>
            {sch.city}
          </p>
          <br></br>
          <br></br>
        </div>
      ))}
      <Link to='/school'>Go to Search</Link>
    </div>
  );
};

export default DisplaySchools;
