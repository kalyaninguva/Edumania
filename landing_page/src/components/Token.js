import React, { Component } from "react";
import axios from "axios";
import { Fragment, useState, useEffect } from "react";

const Token = () => {
  const [datax, setData] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/token").then((resp) => {
      console.log(resp);
      //   console.log(resp.data);
      setData(resp.data);
    });
  }, []);
    console.log(datax);
  const { token } = datax;
  return (
    <div>
      <h1> Your Token </h1>
      <h5>Valid for 7 days</h5>
      <p
        className="lead-mb-3"
        style= {{fontSize: "8px" }}
      >
        Your Token is :  {datax}
      </p>

    </div>
  );
};

export default Token;