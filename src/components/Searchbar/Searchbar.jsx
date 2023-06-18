import React, { Component } from 'react';
import PropTypes from 'prop-types';

import css from './Searchbar.module.css';

export default class Searchbar extends Component {
  handleSubmit = event => {
    event.preventDefault();
    const searchText = event.target.elements.search.value;
    // console.log(event.currentTarget.elements.search.value);
    this.props.onSearch(searchText, event);
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            name="search"
            //   autocomplete="off"
            //   autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
