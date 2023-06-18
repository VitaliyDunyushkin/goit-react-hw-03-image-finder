import React, { Component } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import PropTypes from 'prop-types';

import css from './Searchbar.module.css';

export default class Searchbar extends Component {
  handleSubmit = event => {
    event.preventDefault();
    const searchText = event.target.elements.search.value;

    this.props.onSearch(searchText, event);
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchFormButton}>
            <span className={css.searchFormButtonLabel111}>
              <AiOutlineSearch />
            </span>
          </button>

          <input
            className={css.searchFormInput}
            type="text"
            name="search"
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = { onSearch: PropTypes.func.isRequired };
