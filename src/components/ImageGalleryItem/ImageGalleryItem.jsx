import React from 'react';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  id,
  url,
  title,
  urlForModal,
  onClick,
}) {
  return (
    <li
      key={id}
      className={css.ImageGalleryItem}
      onClick={() => onClick(urlForModal, title, id)}
    >
      <img className={css.ImageGalleryItemImage} src={url} alt={title} />
    </li>
  );
}
