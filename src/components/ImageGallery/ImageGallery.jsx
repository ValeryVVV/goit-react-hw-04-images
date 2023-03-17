import Modal from 'components/Modal/Modal';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types'; 
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';


import style from './ImageGallery.module.css';
import { useState } from 'react';
import { useEffect } from 'react';

export default function ImageGallery({ images }) {
    const [showModal, setShowModal] = useState(false);
    const [bigPic, setBigPic] = useState(null);

    useEffect(() => {
        document.addEventListener('click', e => {
            if (e.target.nodeName !== 'IMG') {
                setShowModal({ showModal: false });
              return;
            } else {

              let picture = images.filter(obj => {
                return obj.id === parseInt(e.target.alt);
              });

              setBigPic(picture[0].largeImageURL);
            }
          });

    }, [bigPic, images]);

    
      const toggleModal = () => {
        setShowModal(showModal => !showModal);
      };

    return (
        <>
            <ul className={style.gallery} onClick={toggleModal}>
            {images.map(img => {
                return (
                <ImageGalleryItem
                    key={nanoid()}
                    smallImgURL={img.webformatURL}
                    id={img.id}
                />
                );
            })}
            </ul>
            {showModal && bigPic && (
            <Modal onClose={toggleModal} pic={bigPic} />
            )}
        </>

    )

}

  ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            webformatURL: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,

        })
    )
};
