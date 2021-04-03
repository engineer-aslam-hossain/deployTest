import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DaktarContext from "../Context/Context";
import { Card, Modal } from "react-bootstrap";

const Profile = ({ handleShow }) => {
  const { loggedInUser, socket, incomingCall } = useContext(DaktarContext);

  return (
    <>
      <div className="col-md-12 mb-4 px-0">
        <h4 className="creditTitle">Your Personal Info</h4>
        <div className="Credits">
          <div className="d-flex justify-content-between flex-wrap">
            <p className="visibility">
              ThiThis information is only visible to you
            </p>
            <button className="editProfile" onClick={() => handleShow()}>
              <FontAwesomeIcon icon={faEdit} /> Edit Info
            </button>
          </div>
          <div>
            <h5 className="colorHeader">Gender</h5>
            <div className="px-3">
              <h6>
                {loggedInUser.gender ? loggedInUser.gender : "Not set Yet"}
              </h6>
            </div>
          </div>
          <div className="py-3">
            <h5 className="colorHeader">Email</h5>
            <div className="px-3">
              {loggedInUser.email_info &&
                loggedInUser.email_info.map((email, index) => (
                  <h6 key={index}>{email.email} </h6>
                ))}
            </div>
          </div>
          <div className="py-3">
            <h5 className="colorHeader">Phone</h5>
            <div className="px-3">
              <h6>{loggedInUser.phone_number}</h6>
            </div>
          </div>
          <div className="py-3">
            <h5 className="colorHeader">Birthdate</h5>
            <div className="px-3">
              <h6>
                {loggedInUser.date_of_birth &&
                  new Date(loggedInUser.date_of_birth).toDateString()}
              </h6>
            </div>
          </div>
          <div className="py-3">
            <h5 className="colorHeader">Mobile Banking</h5>
            <div className="px-3">
              <h6>
                {loggedInUser.mobile_banking_info &&
                  loggedInUser.mobile_banking_info.number}
                (
                {loggedInUser.mobile_banking_info &&
                  loggedInUser.mobile_banking_info.provider}
                )
              </h6>
            </div>
          </div>
          <div className="py-3">
            <h5 className="colorHeader">NID Number</h5>
            <div className="px-3">
              <h6>{loggedInUser.nid}</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-12 my-4 px-0">
        <h4 className="creditTitle">Credits and Finances</h4>
        <div className="Credits">
          <div className="d-flex justify-content-between flex-wrap">
            <p className="visibility">
              This information is only visible to you
            </p>
            <button className="editProfile">
              <AttachMoneyIcon /> Manage Credits
            </button>
          </div>
          <div>
            <h5 className="colorHeader">Sobar Daktar Credit Points</h5>
            <strong>{loggedInUser.credit}</strong>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
