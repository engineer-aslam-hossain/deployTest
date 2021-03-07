import React, { useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CloseIcon from "@material-ui/icons/Close";
import { useRouter } from "next/router";
import { Spinner } from "react-bootstrap";
const Friends = ({ searchInfo, spinner }) => {
  const router = useRouter();

  return (
    <>
      <div className="col-md-12 my-4 px-0">
        <div className="d-flex justify-content-between align-items-center mb-4 px-3">
          <h4 className="creditTitle">List of Your Friends</h4>
          <button
            className="findDocBtn"
            onClick={() => router.push("/profile/searchFriends")}
          >
            Add New Friends
          </button>
        </div>
        <div className="Credits px-0">
          <div className="col-md-12 mx-auto friendsApoint d-flex flex-wrap">
            {searchInfo.length > 0 ? (
              searchInfo.map((item) => (
                <div
                  className="col-md-6 d-flex flex-wrap singleFiends"
                  key={item._id}
                >
                  <div className="pr-3">
                    <img
                      src={item.profile_pic}
                      alt="userImg"
                      className="img-fluid"
                    />
                  </div>
                  <div className="px-1 d-flex flex-column justify-content-between flex-grow-1">
                    <div className="d-flex justify-content-between flex-wrap ">
                      <div>
                        <h3>{item.fullname}</h3>
                        <p>{item.gender}</p>
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
              ))
            ) : (
              <div className="d-flex justify-content-center align-items-center w-100 h-50 ">
                <div className="">
                  <Spinner animation="border" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Friends;
