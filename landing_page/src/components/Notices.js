import React from "react";
import { useHistory } from "react-router-dom";
import { Fragment, useState } from "react";

const DisplayNotices = require("./DisplayNotices");
const Notices = (props) => {
  const [formData, setFormData] = useState({
    name: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  let history = useHistory();

    const onSubmit = async (e) => {
        console.log("In submit")
        console.log(JSON.stringify(formData));
    e.preventDefault();
        console.log(JSON.stringify(formData));
    try {
      const result = await fetch(
        "http://localhost:5000/api/notices/searchnotice",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
        console.log("After Fetch");
        console.log(result);
      const data = await result.json();
      console.log(data);
      history.push({
        pathname: "/searchnotice",
        state: { data: data },
      });
    } catch (err) {
      console.log("In error2");
    }
  };

  const { name } = formData;

  return (
    <Fragment>
      <p>
        <b>Search a school</b>
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Organisation name"
            name="name"
            value={name}
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

Notices.propTypes = {};

export default Notices;
