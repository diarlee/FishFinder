import React, { useState } from "react";
import styled from "styled-components";
import ImageContainer from "../../common/ImageContainer";
import Slider from "react-slick";
import Modal from "react-modal";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReviewTable from "./ReviewTable";

interface MidContentProps {
  content: string;
  thumbnail: image[];
  reviews: review[];
}

interface image {
  imageId: number;
  imageUri: string;
}

interface review {
  reviewId: number;
  fishId: number;
  fishName: string;
  weight: number;
  pricePerKg: number;
  totalPrice: number;
}

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 6%;
`;

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  arrows: false,
  appendDots: (dots: boolean) => (
    <div
      style={{
        width: "90%",
        position: "absolute",
        bottom: "1%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ul> {dots} </ul>
    </div>
  ),
};

export default function MidContent({
  content,
  thumbnail,
  reviews,
}: MidContentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  return (
    <Wrapper>
      <div style={{ fontSize: "16px", marginBottom: "2%" }}>{content}</div>
      {reviews && reviews.length > 0 && (
        <ReviewTable reviews={reviews}></ReviewTable>
      )}
      <Slider {...settings}>
        {thumbnail &&
          thumbnail.map((image, index) => (
            <div key={index}>
              <ImageContainer
                src={image.imageUri}
                alt="썸네일"
                width="100%"
                height="300px"
                objectFit="cover"
                onClick={() => {
                  setIsOpen(true);
                  setModalImage(image.imageUri);
                }}
              ></ImageContainer>
            </div>
          ))}
      </Slider>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: "rgb(26,26,26,0.5)",
          },
          content: {
            width: "80%",
            display: "flex",
            flexDirection: "column",
            alignSelf: "center",
            justifySelf: "center",
            overflow: "auto",
            fontFamily: "Pretendard",
            padding: "2%",
          },
        }}
      >
        <ImageContainer
          src={modalImage}
<<<<<<< HEAD
          alt="썸네일"
=======
          alt="모달이미지"
>>>>>>> 5420baa02bf1b7b7786162a4f73178f77c0be06f
          width="100%"
          height="100%"
          objectFit="contain"
          onClick={() => {
            setIsOpen(true);
          }}
        ></ImageContainer>
      </Modal>
    </Wrapper>
  );
}
