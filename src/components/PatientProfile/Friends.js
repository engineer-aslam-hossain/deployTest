import React from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CloseIcon from "@material-ui/icons/Close";

const Friends = () => {
  return (
    <>
      <div className="col-md-12 my-4 px-0">
        <h4 className="creditTitle">List of Your Friends</h4>
        <div className="Credits px-0">
          <div className="col-md-12 px-4 mb-4">
            <InputGroup>
              <FormControl
                placeholder="Search for People by name or email"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                className="searchFriends"
              />
              <InputGroup.Append>
                <button className="searchFriends">Search New Freinds</button>
              </InputGroup.Append>
            </InputGroup>
          </div>
          <div className="col-md-12 mx-auto friendsApoint d-flex flex-wrap">
            <div className="col-md-6 d-flex flex-wrap singleFiends">
              <div className="pr-3">
                <img
                  src="/images/doc.png"
                  alt="userImg"
                  className="img-fluid"
                />
              </div>
              <div className="px-1 d-flex flex-column justify-content-between flex-grow-1">
                <div className="d-flex justify-content-between flex-wrap ">
                  <div>
                    <h3>Mr. Friend Here</h3>
                    <p>Male</p>
                  </div>
                  <div className="d-flex flex-column align-items-end">
                    <MoreHorizIcon />
                    {/* <button className="removeFriendsBtn">
                      <CloseIcon /> Remove Freinds
                    </button> */}
                  </div>
                </div>
                <div className="">
                  <button className="friendsApointmentBtn">
                    Appointments for Friends
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex flex-wrap singleFiends">
              <div className="pr-3">
                <img
                  src="/images/doc.png"
                  alt="userImg"
                  className="img-fluid"
                />
              </div>
              <div className="px-1 d-flex flex-column justify-content-between flex-grow-1">
                <div className="d-flex justify-content-between flex-wrap ">
                  <div>
                    <h3>Mr. Friend Here</h3>
                    <p>Male</p>
                  </div>
                  <div className="d-flex flex-column align-items-end">
                    <MoreHorizIcon />
                    <button className="removeFriendsBtn">
                      <CloseIcon /> Remove Freinds
                    </button>
                  </div>
                </div>
                <div className="">
                  <button className="friendsApointmentBtn">
                    Appointments for Friends
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex flex-wrap singleFiends">
              <div className="pr-3">
                <img
                  src="/images/doc.png"
                  alt="userImg"
                  className="img-fluid"
                />
              </div>
              <div className="px-1 d-flex flex-column justify-content-between flex-grow-1">
                <div className="d-flex justify-content-between flex-wrap ">
                  <div>
                    <h3>Mr. Friend Here</h3>
                    <p>Male</p>
                  </div>
                  <div className="d-flex flex-column align-items-end">
                    <MoreHorizIcon />
                    {/* <button className="removeFriendsBtn">
                      <CloseIcon /> Remove Freinds
                    </button> */}
                  </div>
                </div>
                <div className="">
                  <button className="friendsApointmentBtn">
                    Appointments for Friends
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex flex-wrap singleFiends">
              <div className="pr-3">
                <img
                  src="/images/doc.png"
                  alt="userImg"
                  className="img-fluid"
                />
              </div>
              <div className="px-1 d-flex flex-column justify-content-between flex-grow-1">
                <div className="d-flex justify-content-between flex-wrap ">
                  <div>
                    <h3>Mr. Friend Here</h3>
                    <p>Male</p>
                  </div>
                  <div className="d-flex flex-column align-items-end">
                    <MoreHorizIcon />
                    {/* <button className="removeFriendsBtn">
                      <CloseIcon /> Remove Freinds
                    </button> */}
                  </div>
                </div>
                <div className="">
                  <button className="friendsApointmentBtn">
                    Appointments for Friends
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex flex-wrap singleFiends">
              <div className="pr-3">
                <img
                  src="/images/doc.png"
                  alt="userImg"
                  className="img-fluid"
                />
              </div>
              <div className="px-1 d-flex flex-column justify-content-between flex-grow-1">
                <div className="d-flex justify-content-between flex-wrap ">
                  <div>
                    <h3>Mr. Friend Here</h3>
                    <p>Male</p>
                  </div>
                  <div className="d-flex flex-column align-items-end">
                    <MoreHorizIcon />
                    {/* <button className="removeFriendsBtn">
                      <CloseIcon /> Remove Freinds
                    </button> */}
                  </div>
                </div>
                <div className="">
                  <button className="friendsApointmentBtn">
                    Appointments for Friends
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Friends;
