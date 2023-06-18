import React from 'react';
import { nanoid } from 'nanoid';

import css from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';

export default function ImageGallery({ gallery, onClick }) {
  return (
    <ul className={css.ImageGallery}>
      {gallery.map(({ id, webformatURL, tags, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            id={id}
            url={webformatURL}
            title={tags}
            urlForModal={largeImageURL}
            onClick={onClick}
          />
        );
      })}
    </ul>
  );
}
