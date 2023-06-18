import React, { Component } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal';
import { Loader } from './Loader/Loader';
import { getPhotos } from 'api/getPhotos';

export class App extends Component {
  state = {
    searchText: '',
    query: [],
    page: 1,
    error: '',
    isShowModal: false,
    photoForModal: { largeImageURL: '', title: '' },
    isShowLoader: false,
  };

  handleSearch = value => {
    this.setState({ searchText: value, page: 1 });

    // console.log(event);
  };

  handleButton = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = (urlForModal, title) => {
    this.setState({
      isShowModal: true,
      photoForModal: { largeImageURL: urlForModal, title: title },
    });

    // console.log(urlForModal, title);
  };

  closeModal = () => {
    this.setState({ isShowModal: false });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.searchText !== prevState.searchText ||
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      getPhotos(this.state.searchText, this.state.page)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.status);
          }
          return response.json();
        })
        .then(data => {
          if (this.state.page !== prevState.page) {
            this.setState(prevState => ({
              query: [...prevState.query, ...data.hits],
            }));
          } else {
            return this.setState({ query: data.hits });
          }

          // console.log(data);
        })
        .catch(error => {
          this.setState({ error });
        });
    }
  }

  render() {
    const { query, isShowModal, photoForModal, isShowLoader } = this.state;
    return (
      <>
        <Searchbar onSearch={this.handleSearch} />
        <ImageGallery gallery={query} onClick={this.openModal} />
        {isShowLoader && <Loader />}
        <Button onClick={this.handleButton} />
        {isShowModal && (
          <Modal onClick={this.closeModal} modalContent={photoForModal} />
        )}
      </>
    );
  }
}
