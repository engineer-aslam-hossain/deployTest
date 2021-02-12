import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import DaktarContext from "../../components/Context/Context";

const dynamicRoute = () => {
  const router = useRouter();

  const { setLoggedInUser } = useContext(DaktarContext);

  const backToHomePage = async () => {
    localStorage.setItem(
      "sobar_daktar_session",
      JSON.stringify(router.query.id)
    );
    const getToken = JSON.parse(localStorage.getItem("sobar_daktar_session"));

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
      method: "GET",
      headers: { sobar_daktar_session: getToken },
      mode: "cors",
    });
    const data = await res.json();

    setLoggedInUser(data);

    router.push("/");
  };

  useEffect(() => {
    if (router.query.id) {
      backToHomePage();
    }
  }, [router.query.id]);

  return (
    <div className="d-flex justify-content-center my-5 py-5 flex-column align-items-center h-100">
      <Spinner animation="border" />
    </div>
  );
};

export default dynamicRoute;
