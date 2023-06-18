import React, { Component } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal';
import { Loader } from './Loader/Loader';
import { getPhotos } from 'api/getPhotos';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {
  state = {
    status: STATUS.IDLE,
    searchText: '',
    query: [],
    page: 1,
    photosOnPage: 12,
    error: '',
    isShowModal: false,
    isShowButton: false,
    photoForModal: { largeImageURL: '', title: '', id: '' },
  };

  handleSearch = value => {
    this.setState({ searchText: value, page: 1, query: [] });
  };

  handleButton = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = (urlForModal, title, id) => {
    this.setState({
      isShowModal: true,
      photoForModal: { largeImageURL: urlForModal, title: title, id: id },
    });
  };

  closeModal = () => {
    this.setState({ isShowModal: false });
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchText, page, photosOnPage, error } = this.state;

    if (searchText !== prevState.searchText || page !== prevState.page) {
      this.setState({ status: STATUS.PENDING });

      getPhotos(searchText, page)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.status);
          }
          return response.json();
        })
        .then(data => {
          if (data.totalHits === 0) {
            return this.setState({
              error: 'No matches found',
              status: STATUS.REJECTED,
            });
          }

          if (page * photosOnPage < data.totalHits) {
            this.setState({ isShowButton: true });
          } else {
            this.setState({ isShowButton: false });
          }

          this.setState(prevState => ({
            query: [...prevState.query, ...data.hits],
            status: STATUS.RESOLVED,
          }));

          console.log(data);
        })
        .catch(error => {
          this.setState({ error, status: STATUS.REJECTED });
        });
    }
  }

  render() {
    const { query, isShowModal, isShowButton, photoForModal, status, error } =
      this.state;

    if (status === STATUS.IDLE) {
      return <Searchbar onSearch={this.handleSearch} />;
    }

    if (status === STATUS.PENDING) {
      return <Loader />;
    }

    if (status === STATUS.RESOLVED) {
      return (
        <>
          <Searchbar onSearch={this.handleSearch} />
          <ImageGallery gallery={query} onClick={this.openModal} />
          {isShowButton && <Button onClick={this.handleButton} />}
          {isShowModal && (
            <Modal onClick={this.closeModal} modalContent={photoForModal} />
          )}
        </>
      );
    }

    if (status === STATUS.REJECTED) {
      return (
        <>
          <Searchbar onSearch={this.handleSearch} />
          <h1>{error}</h1>
        </>
      );
    }
  }
}
