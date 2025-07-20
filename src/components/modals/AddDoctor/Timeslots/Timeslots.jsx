import { TextField } from "@mui/material";
import React, { useState } from "react";
import FasttagToggle from "../../../FasttagRevenue/FasttagToggle";

function Timeslots() {
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [toggleFasttag, setToggleFasttag] = useState(false);
  return (
    <div>
      <div>
        <div
          style={{ display: "flex", marginTop: 10, gap: 8, fontWeight: 500 }}
        >
          <FasttagToggle toggleFasttag={toggleFasttag} setToggleFasttag={setToggleFasttag}/>
          Auto Slotting
        </div>
        <h5 className="card-title mt-4">Fasttag</h5>
        <div className="row timeslot-container">
          <div className="col-12 col-md-6 col-xl-4">
            <div className="form-group">
              <label>
                From <span className="login-danger">*</span>
              </label>
              <div className="">
                <TextField
                  className="form-control"
                  id="outlined-controlled"
                  type="time"
                  value={startTime}
                  onChange={(event) => {
                    setStartTime(event.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-4">
            <div className="form-group">
              <label>
                Select Time To
                <span className="login-danger">*</span>
              </label>
              <div className="">
                <TextField
                  className="form-control"
                  id="outlined-controlled"
                  type="time"
                  value={endTime}
                  onChange={(event) => {
                    setEndTime(event.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-4">
            <div className="form-group">
              <label>
                Select Duration
                <span className="login-danger">*</span>
              </label>
              <input
                type="number"
                className="form-control"
                // placeholder="Enter registration number"
              />
            </div>
          </div>
        </div>
        <div style={{ color: "#1077DA", fontSize: "" }}>+ add more Timings</div>
      </div>

      <div>
        <h5 className="card-title mt-4">Normal Booking</h5>
        <div className="row timeslot-container">
          <div className="col-12 col-md-6 col-xl-4">
            <div className="form-group">
              <label>
                From <span className="login-danger">*</span>
              </label>
              <div className="">
                <TextField
                  className="form-control"
                  id="outlined-controlled"
                  type="time"
                  value={startTime}
                  onChange={(event) => {
                    setStartTime(event.target.value);
                  }}
                />
              </div>
            </div>
            <div style={{ color: "#1077DA", fontSize: "" }}>
              + add more Timings
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-4">
            <div className="form-group">
              <label>
                Select Time To
                <span className="login-danger">*</span>
              </label>
              <div className="">
                <TextField
                  className="form-control"
                  id="outlined-controlled"
                  type="time"
                  value={endTime}
                  onChange={(event) => {
                    setEndTime(event.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-4">
            <div className="form-group">
              <label>
                Select Duration
                <span className="login-danger">*</span>
              </label>
              <input
                type="number"
                className="form-control"
                // placeholder="Enter registration number"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timeslots;
