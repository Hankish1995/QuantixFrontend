import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ai_logo from "../Images/logo.png";
import user_img from "../Images/userAvatar.svg";
import { TbUserEdit } from "react-icons/tb";
import Dropdown from "react-bootstrap/Dropdown";
import { get_logged_in_user_profile } from "../Utils/Store/AuthSlice/GetUserProfile";
import "./Header.css";
import { useNavigate } from "react-router";
import { MdLogout } from "react-icons/md";
import ChangePassword from "../Modal/Changepassword";
import { RiLockPasswordLine } from "react-icons/ri";
import EditProfile from "../Modal/EditProfile";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { clear_login_slice } from "../Utils/Store/AuthSlice/LoginSlice";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [shohEditProfileModal, setShowEditProfileModal] = useState(false);
  const [image, setImage] = useState("");
  const logged_in_user_details = useSelector((store) => store?.USER_PROFILE);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(clear_login_slice());
    navigate("/");
  };

  useEffect(() => {
    dispatch(get_logged_in_user_profile());
  }, [dispatch]);

  useEffect(() => {
    setImage(
      logged_in_user_details?.logged_in_user_details?.data?.userData?.profile
    );
  }, [logged_in_user_details]);

  return (
    <header className="navbar_outer">
      <Navbar expand="lg" className="bg-body-tertiary ">
        <div className="header_outer container-fluid">
          <div
            className="header_outer_wrapper d-flex login_header gap-2 align-items-center justify-content-center"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            <img src={ai_logo} className="quanti_logo" alt="ai_logo" />
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="">
              <Dropdown className="profile_dropdown_wrapper">
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className="profile_dropdown_outer"
                >
                  <img
                    className="user_img"
                    src={
                      logged_in_user_details?.data?.userData?.profile
                        ? logged_in_user_details?.data?.userData?.profile
                        : "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                    }
                    alt="user_img"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <ul className=" profile_item_wrapper">
                    <li
                      onClick={() => setShowEditProfileModal(true)}
                      className="cmn_small_heading"
                    >
                      <TbUserEdit /> Edit Profile
                    </li>
                    <li
                      className="cmn_small_heading"
                      onClick={() => {
                        setShowChangePasswordModal(true);
                      }}
                    >
                      <RiLockPasswordLine /> Change Password
                    </li>
                    <li onClick={logoutHandler} className="cmn_small_heading">
                      <MdLogout /> Logout
                    </li>
                  </ul>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
      {showChangePasswordModal && (
        <ChangePassword
          show={showChangePasswordModal}
          setShow={setShowChangePasswordModal}
        />
      )}
      {shohEditProfileModal && (
        <EditProfile
          show={shohEditProfileModal}
          setShow={setShowEditProfileModal}
        />
      )}
    </header>
  );
};

export default Header;
