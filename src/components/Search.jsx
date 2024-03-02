import PropTypes from 'prop-types';

export default function Search({ setQuery }) {
  function handleSearchChange(e) {
    setQuery(e.target.value);
  }

  return (
    <div id='search-contain'>
      <div id='search-component'>
        <label htmlFor='search' className='invis'>
          Search
        </label>
        <input
          type='search'
          id='search'
          name='seach'
          onChange={handleSearchChange}
        ></input>
      </div>
    </div>
  );
}

Search.propTypes = {
  setQuery: PropTypes.func.isRequired,
};
