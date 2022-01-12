import styled from 'styled-components';

export default function SelectAndSearch({
  category,
  setCategory,
  categories,
  setSearchValue,
  isError,
}) {
  return (
    <>
      <SearchContainer>
        <SelectWrapper>
          <label htmlFor="categories">Categories: </label>
          {/* // disable inputs including search if there's error from api call */}
          <select
            name="categories"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            disabled={isError}
          >
            <option value="all">All</option>
            {categories?.results?.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </SelectWrapper>
        <SearchWrapper>
          <label htmlFor="search">Search: </label>
          <input
            type="search"
            id="search"
            name="search"
            placeholder="Pikachu"
            onChange={(e) => setSearchValue(e.target.value)}
            disabled={isError}
          />
        </SearchWrapper>
      </SearchContainer>
    </>
  );
}

/******************** styled components ************************/

const SearchContainer = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 0.9fr;
  gap: 1.5em;
  margin: 1rem auto;
  padding: 0.2em;
  font-size: 0.95em;
  width: 100%;
  @media (max-width: 600.02px) {
    display: block;
  }
`;

const CommonFlexProperties = styled.div`
  display: grid;
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: row;
  align-items: center;
  justify-content: center;
`;

const SelectWrapper = styled(CommonFlexProperties)`
  select {
    text-transform: capitalize;
    width: 100%;
    margin-top: 0.7em;
    padding: 7px 40px 7px 10px;
    border: 1px solid #e8eaed;
    border-radius: 5px;
    background: white;
    box-shadow: 0 1px 3px -2px #9098a9;
    cursor: pointer;
  }
`;

const SearchWrapper = styled(CommonFlexProperties)`
  input {
    width: 100%;
    height: 34px;
    margin-top: 0.7em;
    padding: 7px 10px;
    border: 1px solid #e8eaed;
    border-radius: 5px;
    background: white;
    box-shadow: 0 1px 3px -2px #9098a9;
    :disabled {
      background-color: rgb(239, 239, 239);
    }
    ::-webkit-search-cancel-button {
      cursor: pointer;
    }
  }
  @media (max-width: 530.02px) {
    margin-top: 0.85em;
  }
`;
