import * as React from 'react';
import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal, { ModalProps } from '@mui/material/Modal';
import { MAIN_BG_COLOR, MAIN_TXT_COLOR, cx } from './common';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  border: '2px solid #000',
  boxShadow: 24,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '90vh',
  p: 2,
};

interface CustomModalProps extends Omit<ModalProps, 'title'> {
  title: React.ReactNode;
  close: () => void;
}

const renderModalHeader = (title: React.ReactNode, close: () => void) => (
  <div className='flex pb-3'>
    <div className='flex-grow text-lg'>{title}</div>
    {/* Botón de cierre */}
    <div onClick={close} className='cursor-pointer'>
      <Icon size={1} path={mdiClose} />
    </div>
  </div>
);

export default function CustomModal({ children, title, close, ...props }: CustomModalProps) {
  return (
    <Modal onClose={close} {...props}>
      <Fade in={props.open}>
        <Box sx={modalStyle} className={cx(MAIN_BG_COLOR, MAIN_TXT_COLOR, 'rounded')}>
          {renderModalHeader(title, close)}
          {/* Contenido del Modal */}
          <div className='flex-grow overflow-y-auto'>{children}</div>
        </Box>
      </Fade>
    </Modal>
  );
}
