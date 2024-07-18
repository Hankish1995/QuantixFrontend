import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { update_user_profile } from "../Utils/Store/AuthSlice/UpdateUserProfile";
import { get_logged_in_user_profile } from "../Utils/Store/AuthSlice/GetUserProfile";
import { clear_user_profile_state } from "../Utils/Store/AuthSlice/UpdateUserProfile";

const EditProfile = ({ show, setShow }) => {
    const dispatch = useDispatch()
    const handleClose = () => setShow(false);
    const [imageName, setImageName] = useState("")
    const [image, setImage] = useState("")
    const [email, setEmail] = useState("")
    const logged_in_user_details = useSelector(store => store?.USER_PROFILE)
    const updated_user_data = useSelector(store => store.UPDATE_USER_PROFILE)
    const [handleImage, setHandleImage] = useState(false)
    const handleDrop = (e) => {
        e.preventDefault();
        setHandleImage(true)
        const file = e.dataTransfer.files[0];
        if (file.type === 'image/jpeg' || file.type === 'image/png') {
            setImageName(file);
            const imageURL = URL.createObjectURL(file);
            setImage(imageURL);
        } else {
            toast.error("Only JPG or PNG files are allowed");
        }
    };

    const handlePreviewImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const handle_update_profile = () => {
        dispatch(update_user_profile({ email: email ? email : logged_in_user_details?.data?.userData?.email, profile: imageName ? imageName : logged_in_user_details?.data?.userData?.profile }))
    }

    useEffect(() => {
        if (updated_user_data?.isSuccess) {
            setHandleImage(false)
            dispatch(get_logged_in_user_profile());
            toast.success(updated_user_data?.message?.message)
            dispatch(clear_user_profile_state())
            handleClose()
        }
        if (updated_user_data?.isError) {
            setHandleImage(false)
            toast.error(updated_user_data?.error?.message)
            dispatch(clear_user_profile_state())
        }
    }, [updated_user_data])
    return (
        <>
            <Modal show={show} onHide={handleClose} className='deleteplan_outer' centered size="md">
                <Modal.Header closeButton>
                    <Modal.Title className='cmn_heading_style'>Update Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body className='cmn_small_heading confirm_delete_text'>
                    <div className="d-flex justify-content-center" onDrop={(e) => handleDrop(e)} onDragOver={(e) => e.preventDefault()} >
                        <div>
                            {!handleImage ? <img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" className="image_preview" alt="user_img" />
                                : <img src={image} className="image_preview" alt="user_img" />}
                            <h3 className="user_name">{logged_in_user_details?.data?.userData?.username ? logged_in_user_details?.data?.userData?.username : null}</h3>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" value={email ? email : logged_in_user_details?.data?.userData?.email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Upload image</label>
                        <input type="file" className="form-control" onDrop={(e) => handleDrop(e)} onChange={(e) => { setImageName(e.target.files[0]); handlePreviewImage(e) }} />
                        <p className="image_drop_box">Drop files here or click to upload</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} className='cancel_button'>
                        Cancel
                    </Button>
                    <Button isLoading={updated_user_data?.isLoading} className='cmn_btn' onClick={() => handle_update_profile()}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditProfile