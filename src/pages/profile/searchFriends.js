import { FormControl, InputGroup } from "react-bootstrap";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CloseIcon from "@material-ui/icons/Close";
import { useState } from "react";
import Swal from "sweetalert2";
import { Spinner } from "react-bootstrap";
const SearchFriends = () => {
  const [searchInfo, setsearchInfo] = useState([]);
  const [searchData, setSearchData] = useState({
    user_type: "USER",
    key: "",
  });

  const searchFriends = async (data) => {
    // console.log(data);
    document.querySelector(".SpinnerDiv").style.display = "block";
    try {
      const getToken = JSON.parse(localStorage.getItem("loginToken"));
      const friends = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/search_user?key=${data.key}&user_type=${data.user_type}`,
        {
          method: "GET",
          headers: { sobar_daktar_session: getToken },
          mode: "cors",
        }
      );
      const friendsData = await friends.json();
      console.log(friendsData);
      setsearchInfo(friendsData);
    } catch (err) {
      console.log(err);
    }
  };

  const addFriendsHandler = async (id) => {
    try {
      const getToken = JSON.parse(localStorage.getItem("loginToken"));
      const friend = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/patient/add_friend`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            sobar_daktar_session: getToken,
          },
          body: JSON.stringify({
            user_id: id,
          }),
        }
      );
      const friendData = await friend.json();
      //   console.log(friendData);
      if (friendData.success === "yes") {
        Swal.fire({
          icon: "success",
          title: "Successfully Added to your Friend List",
        });
      }
      if (friendData.success === "no") {
        Swal.fire({
          icon: "error",
          title: friendData.msg,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  //   console.log(searchInfo);

  return (
    <section>
      <div className="container px-0">
        <div className="row">
          <div className="col-lg-12 Credits">
            <div className="col-lg-12">
              <div className="col-md-12 mb-4">
                <InputGroup>
                  <FormControl
                    placeholder="Search for People by name or email"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    className="searchFriends"
                    onChange={(e) =>
                      setSearchData({
                        ...searchData,
                        key: e.target.value,
                      })
                    }
                  />
                  <InputGroup.Append>
                    <button
                      className="searchFriends"
                      onClick={() => searchFriends(searchData)}
                    >
                      Search New Freinds
                    </button>
                  </InputGroup.Append>
                </InputGroup>
              </div>
            </div>
            <div className="col-lg-12 mx-auto friendsApoint d-flex flex-wrap">
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
                        <button
                          className="friendsApointmentBtn"
                          onClick={() => addFriendsHandler(item._id)}
                        >
                          Add as Friends
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="d-flex justify-content-center align-items-center w-100 h-50 ">
                  <div className="SpinnerDiv">
                    <Spinner animation="border" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchFriends;
