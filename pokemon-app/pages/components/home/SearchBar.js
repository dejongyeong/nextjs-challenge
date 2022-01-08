import React from 'react';
import styled from 'styled-components';

export default function SearchBar({ categories }) {
  const [value, setValue] = React.useState('all');

  return (
    <Container>
      <SelectWrapper>
        <label htmlFor="categories">Categories: </label>
        <select
          name="categories"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        >
          <option value="all">All</option>
          {categories.results.map((category, index) => (
            <option key={index} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </SelectWrapper>
      <SearchWrapper>
        <label htmlFor="search">Search: </label>
        <input type="text" id="search" name="search" placeholder="pikachu" />
      </SearchWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 0.9fr;
  gap: 1.5em;
  margin-top: 1.5em;
  padding: 0.2em;
  font-size: 0.95em;
  width: 100%;
`;

const SelectWrapper = styled.div`
  display: flex;
  gap: 0.7em;
  align-items: center;
  justify-content: center;
  select {
    text-transform: capitalize;
    width: 100%;
    padding: 7px 40px 7px 10px;
    border: 1px solid #e8eaed;
    border-radius: 5px;
    background: white;
    box-shadow: 0 1px 3px -2px #9098a9;
    cursor: pointer;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  gap: 0.7em;
  align-items: center;
  justify-content: center;
  input {
    width: 100%;
    padding: 7px 40px 7px 10px;
    border: 1px solid #e8eaed;
    border-radius: 5px;
    background: white;
    box-shadow: 0 1px 3px -2px #9098a9;
    cursor: pointer;
  }
`;
