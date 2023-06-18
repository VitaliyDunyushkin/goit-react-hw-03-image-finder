import React from 'react';
import css from './Modal.module.css';

export default function Modal({
  onClick,
  modalContent: { largeImageURL, title, id },
}) {
  //   const { largeImageURL, title } = modalContent;
  return (
    <div className={css.overlay} onClick={() => onClick()}>
      <div className={css.modal} key={id}>
        <img src={largeImageURL} alt={title} />
      </div>
    </div>
  );
}
