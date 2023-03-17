import PropTypes from 'prop-types'; 

import style from "./ImageGalleryItem.module.css";


export default function ImageGalleryItem({ smallImgURL, id }) {
      return (
        <li className={style.galleryItem}>
          <img src={smallImgURL} alt={id} />
        </li>
      );
  }

  ImageGalleryItem.propTypes = {
    smallImgURL: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
};
