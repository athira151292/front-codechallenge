import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import { ModalButtons } from './ConfirmationModal.styles';

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

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {modalContent}
          <ModalButtons>
            <Button onClick={() => actionConfirmed(false)} variant="contained" data-testid="no-button">No</Button>
            <Button onClick={() => actionConfirmed(true)} variant="contained" data-testid="yes-button">Yes</Button>
          </ModalButtons>
        </Box>
      </Modal>
    </div>
  );
}

export default ConfirmationModal;