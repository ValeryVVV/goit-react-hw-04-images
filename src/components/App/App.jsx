import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Button from "../Button/Button";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import Searchbar from "../Searchbar/Searchbar";

import style from "./App.module.css";

const API_KEY = '32950349-b423a796dfbedf40b18320507';
const URL = 'https://pixabay.com/api/';

export default function App() {

    const [pictures, setPictures] = useState([]);
    const [error, setError] = useState('');
    const [status, setStatus] = useState('idle');
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    const [totalHits, setTotalHits] = useState(null);

    useEffect(() => {
        if (query === '') {
          return;
        }
        setStatus('pending');
        const fetchImg = () => {
          return fetch(
            `${URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
          )
            .then(res => {
              if (res.ok) {
                return res.json();
              }
              return Promise.reject(new Error('Failed to find any images'));
            })
            .then(pictures => {
                if (!pictures.total) {
                  alert('Did find anything, mate');
                }
                return pictures;
              })
              .catch(error => setError(error) && setStatus('rejected'));
          };
        fetchImg().then(pictures => {
          const selectedProperties = pictures.hits.map(
            ({ id, largeImageURL, webformatURL }) => {
              return { id, largeImageURL, webformatURL };
            }
          );
          setPictures(prevState => [...prevState, ...selectedProperties]);
          setStatus('resolved');
          setTotalHits(pictures.total);
        });
      }, [page, query]);

    const handleFormSubmit = query => {
        setQuery(query);
        setPage(1);
        setPictures([]);
    }

    const loadMore = () => {
        setPage(prevState => prevState + 1);
      };

    return(
        <div className={style.app}>
            <Searchbar onSubmit={handleFormSubmit} />
            <ImageGallery images={pictures} />
            {totalHits > pictures.length &&  <Button onClick={loadMore} /> }
            {status === 'pending' && <Loader />}
            {status === 'rejected' && { error }}
            <ToastContainer position="top-right" autoClose={3000} /> 
        </div>

    )
}
