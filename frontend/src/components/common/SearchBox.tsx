import React from "react";
import styled from "styled-components";

import { gray2, primary } from "../../assets/styles/palettes";
import searchIcon from "../../assets/icons/search.svg";
import searchPrimaryIcon from "../../assets/icons/searchPrimary.svg";
import valueDelete from "../../assets/icons/valueDelete.svg";

type SearchBoxProps = {
  width: string;
  name: string;
  margin: string;
  value: string;
  setValue(value: string): void;
  handleSubmit(e: React.FormEvent<HTMLFormElement>): void;
  handleSearchClick(): void;
};

const Outline = styled.div<{
  width: string;
  margin: string;
  hasValue: boolean;
}>`
  position: relative;
  border: 1px solid;
  border-color: ${(props) => (props.hasValue ? primary : gray2)};
  border-radius: 5px;
  height: auto;
  width: ${(props) => props.width};
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: ${(props) => props.margin};

  & > img {
    padding: 1%;
    cursor: pointer;
  }

  & > form {
    padding: 1%;
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;

    & > input {
      border: none;
      color: ${primary};
      width: 99%;
      font-family: Pretendard;
      font-size: 14px;
      font-weight: 600;

      &::placeholder {
        font-weight: normal;
      }

      &:focus {
        outline: none;
      }
    }
  }
`;

const DeleteButton = styled.img`
  padding: 1%;
  margin-right: 1%;
  cursor: pointer;
  height: 50%;
`;

export default function SearchBox({
  width,
  margin,
  name,
  value,
  setValue,
  handleSubmit,
  handleSearchClick,
}: SearchBoxProps) {
  const hasValue = value.trim() !== "";
  return (
    <Outline width={width} margin={margin} hasValue={hasValue}>
      {hasValue ? (
        <img
          src={searchPrimaryIcon}
          onClick={handleSearchClick}
          alt="검색아이콘색상"
        ></img>
      ) : (
        <img src={searchIcon} alt="검색아이콘기본"></img>
      )}
      <form onSubmit={handleSubmit}>
        <input
          name={name}
          placeholder="검색어를 입력해주세요."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></input>
      </form>
      {hasValue && (
        <DeleteButton
          src={valueDelete}
          alt="값 삭제 버튼"
          onClick={() => setValue("")}
        />
      )}
    </Outline>
  );
}
