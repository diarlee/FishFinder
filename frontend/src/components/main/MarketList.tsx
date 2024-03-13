import React, { useState } from 'react'
import styled from 'styled-components';
import Slider from 'react-slick';

import '../../../node_modules/slick-carousel/slick/slick.css'
import "../../../node_modules/slick-carousel/slick/slick-theme.css";

import marketImage1 from '../../assets/images/market/노량진1.jpg';
import marketImage2 from '../../assets/images/market/노량진2.jpg';
import marketImage3 from '../../assets/images/market/노량진3.jpg';


const settings = {
    dots : true,
    infinite : true,
    speed : 500,
    slidesToShow : 1,
    slidesToScroll : 1,
    autoplay : true,
    autoplaySpeed : 15000,
    arrows: false, 
    appendDots: (dots: boolean) => (
        <div
          style={{
            width: '100%',
            position: 'absolute',
            bottom: '5%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ul> {dots} </ul>
        </div>
      ),

}


const Wrapper = styled.div`
    width : 100%;
    height : auto;
    display : flex;
    flex-direction : column;

    font-family : Pretendard;
`

const UpContents = styled.div`
    margin : 3% 5% 0% 5%;
    width : 90%;
    font-size : 15px;

    & > span{
        margin-right : 3%;
        font-weight : 600;
        font-size : 20px;
    }
`

const ImageContainer = styled.img`
    margin : 3% 0 5% 0;
    width : 100%;
    height : 175px; 
    object-fit : cover;
`



export default function MarketList() {
    const [nickname] = useState("좌랑둥이"); //나중에 zustand를 이용해서 처리해야 됨

    return (
        <Wrapper>
            <UpContents>
                {nickname && <span>{nickname}님</span>}
                주변 수산물 시장
            </UpContents>
            <Slider {...settings}>
                <div>
                    <ImageContainer src = {marketImage1}></ImageContainer>
                </div>
                <div>
                    <ImageContainer src = {marketImage2}></ImageContainer>
                </div>
                <div>
                    <ImageContainer src = {marketImage3}></ImageContainer>
                </div>
            </Slider>
        </Wrapper>
    )
}
