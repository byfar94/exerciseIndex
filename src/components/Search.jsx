import PropTypes from 'prop-types';
import searchSvg from '../assets/images/search.svg';

export default function Search({ setQuery }) {
  function handleSearchChange(e) {
    setQuery(e.target.value);
  }

  return (
    <div id='search-contain'>
      <div id='search-component'>
        <img id='mag' alt='magnifying glass' src={searchSvg}></img>
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
