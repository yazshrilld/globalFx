import Modal from "@mui/material/Modal";

const Warning = ({ open, solicitor, handleClose }) => {

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="absolute w-[40%] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white rounded-[10px] p-[3rem_2rem]">
         <h1 className="text-[#FDB815] font-bold capitalize text-[20px] mb-3">!!! Awaiting Confimation !!!</h1>
         <p>Your report has being received and is awaiting confirmation, Thank you for submitting your report.</p>
      </div>
    </Modal>
  );
};

export default Warning;
