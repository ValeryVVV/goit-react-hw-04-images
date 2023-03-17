import PropTypes from 'prop-types'; 
import { useEffect } from 'react';

import style from "./Modal.module.css";

export default function Modal({ onClose, pic }) {
    useEffect(() => {
        const handleKeyDown = e => {
            if (e.code === 'Escape') {
            return onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };

    }, [onClose]);

    return (
        <div className={style.overlay}>
        <div className={style.modal}>
          <img src={pic} alt="" />
        </div>
      </div>
    )
}

Modal.propTypes = {
    pic: PropTypes.string.isRequired,
};
