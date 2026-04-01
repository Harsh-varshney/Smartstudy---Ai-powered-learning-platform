import React from "react";
import "./SearchAndFilter.css";

function SearchAndFilter({ search, setSearch,showFilter = true, filter, setFilter }) {
  return (
    <div className="search-container d-flex flex-column flex-md-row gap-3 mb-3">

      {/* Search Box */}
      <input
        type="text"
        className="form-control search-input"
        placeholder="Search by title, content or tags..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filter Dropdown */}
      {showFilter && (
        <select
          className="form-select filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Notes</option>
          <option value="pinned">📌 Pinned Notes</option>
          <option value="recent">🕒 Recently Added</option>
        </select>
      )}
    </div>
  );
}

export default SearchAndFilter;