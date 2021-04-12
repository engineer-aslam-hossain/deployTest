import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { Card, Modal } from "react-bootstrap";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const patientAppointments = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const router = useRouter();
  const [prescription, setPrescription] = useState({});

  const getPrescriptions = async () => {
    try {
      const getToken = JSON.parse(localStorage.getItem("loginToken"));
      const res = await fetch(
        `${process.env.API_BASE_URL}/user/get_patient_records?appointment_id=${router.query.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            sobar_daktar_session: getToken,
          },
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.length > 0) {
        setPrescription(data[0]);
        handleShow();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const generatePdf = () => {
    const doc = new jsPDF("p", "pt", "a4");
    doc.html(document.querySelector("#pdf_content"), {
      callback: function (pdf) {
        pdf.internal.write(0, "Tw"); // <- add this
        pdf.setFontSize(9);
        pdf.setCharSpace(0);
        pdf.save("prescription.pdf");
      },
    });
  };

  //   console.log(prescription);

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h1>Patient Appointments</h1>
          </div>
          <div className="col-lg-12 d-flex justify-content-between align-items-center mt-4">
            <button className="callNowBtn" onClick={getPrescriptions}>
              Preview Prescriptions
            </button>
          </div>
        </div>
      </div>

      <div className="prescriptionModal">
        <Modal
          show={show}
          onHide={handleClose}
          size="lg"
          dialogClassName="modal-90w"
        >
          <Card className="addDrugCard">
            <Card.Body>
              <div id="pdf_content">
                <div className="col-lg-12 d-flex px-0 prescritionTop pb-3 mb-3">
                  <div className="col-lg-8 pl-0">
                    <div>
                      <p className="mb-1">
                        Patients Name:{" "}
                        {prescription.patient_id &&
                          prescription.patient_id.fullname}
                      </p>
                      <p className="mb-2">Sex: {prescription.sex} </p>
                      <p className="mb-2">Age(years): {prescription.age}</p>
                      <p className="mb-2">Weight(Kg): {prescription.weight}</p>
                      <p className="mb-2">
                        Date: {new Date(prescription.date).toDateString()}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between patientDetails"></div>
                  </div>
                  <div className="d-flex flex-column  align-items-start py-3">
                    <img
                      src="/images/p_logo.png"
                      alt="P_logo"
                      className="img-fluid"
                    />
                    <div>www.sobardaktar.com</div>
                  </div>
                </div>
                <div className="col-lg-12 px-0">
                  <div>
                    <h6>Medicines</h6>
                  </div>
                  <div className="col-lg-12 mx-auto px-4">
                    {prescription.medicine &&
                      prescription.medicine.map((med, index) => (
                        <Fragment key={index}>
                          <div>
                            <p className="mb-1">{med.name}</p>
                          </div>
                          <div>
                            <span>{med.dosage} , </span>
                            <span> {med.direction} , </span>
                            <span> {med.duration} </span>
                          </div>
                          <div>
                            <p className="mb-1">{med.comment} </p>
                          </div>
                        </Fragment>
                      ))}
                  </div>
                </div>
                <div className="col-lg-12 px-0">
                  <div>
                    <h6>Advice</h6>
                  </div>
                  <div className="col-lg-12 mx-auto px-4">
                    {prescription.advice &&
                      prescription.advice.map((adv, index) => (
                        <Fragment key={index}>
                          <div>
                            <p className="mb-1">{adv}</p>
                          </div>
                        </Fragment>
                      ))}
                  </div>
                </div>
                <div className="col-lg-12 px-0">
                  <div>
                    <h6>Disease</h6>
                  </div>
                  <div className="col-lg-12 mx-auto px-4">
                    {prescription.disease &&
                      prescription.disease.map((dea, index) => (
                        <Fragment key={index}>
                          <div>
                            <p className="mb-1">{dea}</p>
                          </div>
                        </Fragment>
                      ))}
                  </div>
                </div>
                <div className="col-lg-12 px-0">
                  <div>
                    <h6>On Examination</h6>
                  </div>
                  <div className="col-lg-12 mx-auto px-4">
                    {prescription.on_examination &&
                      prescription.on_examination.map((exam, index) => (
                        <Fragment key={index}>
                          <div>
                            <p className="mb-1">{exam}</p>
                          </div>
                        </Fragment>
                      ))}
                  </div>
                </div>
                <div className="col-lg-12 px-0">
                  <div>
                    <h6>On Investigation</h6>
                  </div>
                  <div className="col-lg-12 mx-auto px-4">
                    {prescription.on_investigation &&
                      prescription.on_investigation.map((inves, index) => (
                        <Fragment key={index}>
                          <div>
                            <p className="mb-1">{inves}</p>
                          </div>
                        </Fragment>
                      ))}
                  </div>
                </div>
                <div className="col-lg-12 px-0">
                  <div>
                    <h6>On Symptoms</h6>
                  </div>
                  <div className="col-lg-12 mx-auto px-4">
                    {prescription.symptoms &&
                      prescription.symptoms.map((sym, index) => (
                        <Fragment key={index}>
                          <div>
                            <p className="mb-1">{sym}</p>
                          </div>
                        </Fragment>
                      ))}
                  </div>
                </div>
                <div className="col-lg-12 px-0">
                  <div>
                    <h6>On Test</h6>
                  </div>
                  <div className="col-lg-12 mx-auto px-4">
                    {prescription.test &&
                      prescription.test.map((test, index) => (
                        <Fragment key={index}>
                          <div>
                            <p className="mb-1">{test}</p>
                          </div>
                        </Fragment>
                      ))}
                  </div>
                </div>
                <div className="col-lg-12 px-0 prescriptionFooter mt-5">
                  <p className="mb-0 text-center">
                    This prescription was generated in an appointment with the
                    respective doctoor using www.sobardaktar.com
                  </p>
                  <p className="mb-0 text-center">
                    Sobar Daktar {new Date().getFullYear()} © all rights
                    reserved
                  </p>
                </div>
              </div>
              <div className="col-lg-12 px-0 d-flex justify-content-center mb-3">
                <button className="callNowBtn" onClick={generatePdf}>
                  Download Prescriptions
                </button>
              </div>
            </Card.Body>
          </Card>
        </Modal>
      </div>
    </section>
  );
};

export default patientAppointments;
