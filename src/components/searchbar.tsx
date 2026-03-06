interface SearchBarProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ onChange }: SearchBarProps) => {
  return (
    <div className="">
      <input
        type="text"
        className="border border-black p-2"
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
