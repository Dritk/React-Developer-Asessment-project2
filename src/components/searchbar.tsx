interface SearchBarProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ onChange }: SearchBarProps) => {
  return (
    <div className="">
      <input
        type="text"
        className="border  border-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search...."
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
