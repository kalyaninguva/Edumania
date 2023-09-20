import React from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Fragment, useState } from "react";
// import PropTypes from "prop-types";
// const axios = require("axios");
const DisplaySchools = require("./DisplaySchools");
const Schools = (props) => {
  const [formData, setFormData] = useState({
    type: "",
    capacity: 0,
    location: "",
    city: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  let history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await fetch("http://localhost:5000/schools/search", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      console.log("After Fetch");
      const data = await result.json();
      console.log(data);
      history.push({
        pathname: "/search",
        state: { data: data },
      });
    } catch (err) {
      console.log("In error");
    }
    // setTimeout(
    //   () =>
    //     setFormData({
    //       type: "",
    //       capacity: 0,
    //       location: "",
    //       city: "",
    //     }),
    //   1600
    // );
  };

  const { type, capacity, location, city } = formData;

  return (
    <Fragment>
      <p>
        <b>Search a school</b>
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        {/* <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div> */}
        <div className="form-group">
          <input
            type="text"
            placeholder="Type"
            name="type"
            value={type}
            onChange={(e) => onChange(e)}
          ></input>
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="Capacity"
            name="capacity"
            value={capacity}
            onChange={(e) => onChange(e)}
          ></input>
        </div>
        {/* <div className="form-group">
          <input
            type="text"
            placeholder="Contact"
            name="contact"
            value={contact}
            onChange={(e) => onChange(e)}
          ></input>
        </div> */}
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          ></input>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="City"
            name="city"
            value={city}
            onChange={(e) => onChange(e)}
          ></input>
        </div>
        <div className="form-group">
          <input type="submit" value="Submit" className="btn btn-block" />
        </div>
      </form>
    </Fragment>
  );
};

Schools.propTypes = {};

export default Schools;
