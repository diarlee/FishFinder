import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import BackButton from '../../common/BackButton'
import IconButton from '../../common/IconButton'
import ExportIcon from '../../../assets/icons/export.svg';
import MenuIcon from '../../../assets/icons/dotsThree.svg';


const Wrapper = styled.div`
  width : 100%;
  height : auto;

  display : flex;
  flex-direction: row;
  justify-content: space-between;

  &>div{
    width : 16%;
    margin : 5% 0 5% 0;

    display : flex;
    justify-content: space-between;
  }
`


export default function Header() {
    const navigate = useNavigate();

    const onClickBackBtn = () => {
        navigate("/board");
      }

    return (
        <Wrapper>
            <BackButton onClickBtn={onClickBackBtn}></BackButton>
            <div>
            <IconButton width = '45%' icon = {ExportIcon}></IconButton>
            <IconButton width = '45%' icon = {MenuIcon}></IconButton>
            </div>
        </Wrapper>
    )
}
