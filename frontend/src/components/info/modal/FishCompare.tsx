import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { gray3 } from "../../../assets/styles/palettes";

import { axiosInstance } from "../../../services/axios";
import { AxiosResponse } from "axios";
import ImageContainer from "../../common/ImageContainer";

interface FishCompareProps {
  sourceFishId: number;
  targetFishId: number;
}

interface Compare {
  sourceFish: FishData;
  targetFish: FishData;
  attributes: Attribute[];
}

interface FishData {
  fishId: number;
  name: string;
  imgUri: string;
}

interface Attribute {
  attribute: string;
  source_value: string;
  target_value: string;
  source_img: string;
  target_img: string;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Contents = styled.div`
  width: 46%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Name = styled.div`
  font-size: 17px;
  margin: 10% 0 10% 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 15px;
  height: 55px;
  word-break: keep-all;
`;

const Line = styled.div`
  height: 100%;
`;

export default function FishCompare({
  sourceFishId,
  targetFishId,
}: FishCompareProps) {
  const [data, setData] = useState<Compare>();
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance
      .get(`/api/fishes/differences/${sourceFishId}/${targetFishId}`)
      .then((res: AxiosResponse) => {
        setData(res.data.data);
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }, []);

  return (
    <Wrapper>
      <div style={{ display: "none" }}>
        {sourceFishId} {targetFishId}
      </div>
      {data && (
        <>
          <Contents>
            <ImageContainer
              src={data.targetFish.imgUri}
              alt="비교 어종 사진 없음"
              width="100%"
              height="70px"
              onClick={() => {
                navigate(`/info/${data.targetFish.fishId}`);
              }}
            />
            <Name>{data.targetFish.name}</Name>
            {data.attributes &&
              data.attributes.map((content, index) => (
                <Content key={index}>{content.target_value}</Content>
              ))}
          </Contents>
          <Line style={{ borderRight: `1px solid ${gray3}` }}></Line>
          <Contents>
            <ImageContainer
              src={data.sourceFish.imgUri}
              alt="비교 어종 사진 없음"
              width="100%"
              height="70px"
              onClick={() => {
                navigate(`/info/${data.sourceFish.fishId}`);
              }}
            />
            <Name>{data.sourceFish.name}</Name>
            {data.attributes &&
              data.attributes.map((content, index) => (
                <Content key={index}>{content.source_value}</Content>
              ))}
          </Contents>
        </>
      )}
    </Wrapper>
  );
}
