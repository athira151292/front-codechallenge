import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface ConfirmationModalProps {
    open: boolean;
    modalContent: JSX.Element;
    actionConfirmed: (flag: boolean) => void;
}

const ConfirmationModal:FC<ConfirmationModalProps> = ({open, modalContent, actionConfirmed}) => {

  const handleClose = () => {

  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {modalContent}
          <div>
            <button onClick={() => actionConfirmed(false)}>No</button>
            <button onClick={() => actionConfirmed(true)}>Yes</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ConfirmationModal;