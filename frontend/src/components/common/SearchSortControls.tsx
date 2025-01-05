interface SearchSortControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortField: string;
  onSortFieldChange: (value: string) => void;
  sortOrder: 'asc' | 'desc';
  onSortOrderChange: (value: 'asc' | 'desc') => void;
  sortOptions: Array<{value: string; label: string}>;
}

const SearchSortControls: React.FC<SearchSortControlsProps> = ({
  searchTerm,
  onSearchChange,
  sortField,
  onSortFieldChange,
  sortOrder,
  onSortOrderChange,
  sortOptions
}) => {
  return (
    <div className="search-sort-order">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      <select
        value={sortField}
        onChange={(e) => onSortFieldChange(e.target.value)}
        className="sort-select"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <select
        value={sortOrder}
        onChange={(e) => onSortOrderChange(e.target.value as 'asc' | 'desc')}
        className="order-select"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default SearchSortControls;