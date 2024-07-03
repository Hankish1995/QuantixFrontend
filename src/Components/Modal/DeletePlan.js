
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./style.css"
function DeletePlanModal({show,setShow,deleteHandler}) {
const handleClose = () => setShow(false);

  return (
    <>
      
      <Modal show={show} onHide={handleClose} className='deleteplan_outer' centered>
        <Modal.Header closeButton>
          <Modal.Title className='cmn_heading_style'>Delete Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body className='cmn_small_heading confirm_delete_text'>Are you sure you want to delete this plan?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} className='cancel_button'>
            Cancel
          </Button>
          <Button  className='cmn_btn' onClick={()=>{deleteHandler()}}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeletePlanModal;