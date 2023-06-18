import React, { Component } from 'react';
import css from './Modal.module.css';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handlePressESC);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlePressESC);
  }

  handlePressESC = e => {
    if (e.code === 'Escape') this.props.onClick();
  };

  render() {
    const {
      modalContent: { largeImageURL, title, id },
      onClick,
    } = this.props;

    return (
      <div className={css.overlay} onClick={() => onClick()}>
        <div className={css.modal} key={id}>
          <img src={largeImageURL} alt={title} />
        </div>
      </div>
    );
  }
}
