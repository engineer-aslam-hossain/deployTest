import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { Card, Modal, Toast } from "react-bootstrap";
import styles from "../../styles/Home.module.css";
import DaktarContext from "../Context/Context";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Layout = ({ children, title = "Sobar Daktar" }) => {
  const { incomingCall, loggedInUser, callAccepted, socket } = useContext(
    DaktarContext
  );

  const [state, setState] = useState({
    vertical: "top",
    horizontal: "right",
    open: false,
  });
  const { vertical, horizontal, open } = state;

  const [showCall, setShowCall] = useState(false);
  const handleCallClose = () => setShowCall(false);
  const handleCallShow = () => setShowCall(true);

  const acceptCallHandler = () => {
    try {
      socket.emit("acceptCall", {
        to: incomingCall.doctor_id,
        patient_name: incomingCall.patient_patient,
      });
    } catch (err) {
      console.log(err);
    }
    handleCallClose();
  };

  useEffect(() => {
    incomingCall &&
      incomingCall.doctor_id &&
      loggedInUser.user_type !== "DOCTOR" &&
      handleCallShow();
  }, [incomingCall]);

  useEffect(() => {
    loggedInUser.user_type === "DOCTOR" &&
      callAccepted &&
      callAccepted.length > 1 &&
      setState({
        ...state,
        open: true,
      });
  }, [callAccepted]);

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
      <Modal show={showCall} onHide={handleCallClose} className="callingModal">
        <Card style={{ padding: "2rem" }} className="">
          <div className="callWindow">
            <div>
              <p>Incoming Call from</p>
              <h4>{incomingCall.doctor_name}</h4>
            </div>
            <div className="callDocImgDiv">
              <img
                src={incomingCall.doctor_profile_pic}
                alt="docIMg"
                className="img-fluid "
              />
            </div>
            <div className="callAppointFor">
              <p>Appointment for</p>
              <h6>{incomingCall.patient_patient}</h6>
            </div>
          </div>
          <button onClick={acceptCallHandler} className="answerCallBtn">
            <img src="/icons/call.svg" alt="callImg" className="img-fluid" />
            Answer Call
          </button>
        </Card>
      </Modal>
      <Snackbar
        open={state.open}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={6000}
        onClose={() =>
          setState({
            ...state,
            open: false,
          })
        }
      >
        <Alert severity="success">{callAccepted}</Alert>
      </Snackbar>
    </div>
  );
};

export default Layout;
