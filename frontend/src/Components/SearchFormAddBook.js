import React from 'react'

const SearchFormAddBook = ({ query, onChange }) => {
  return (
    <div className="SearchBookSearchForm">
      <form className="field has-addons" id="SearchBookSearchFormBar">
        <div className="control is-expanded">
          <input
            className="input is-normal"
            type="search"
            placeholder="search book..."
            value={query}
            onChange={onChange}
          />
        </div>
      </form>
    </div>

  )
}
export default SearchFormAddBook