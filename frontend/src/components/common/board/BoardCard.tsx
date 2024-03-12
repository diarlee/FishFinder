import React from 'react'
import styled from 'styled-components';

import {gray1,gray2, gray3, gray4} from '../../../assets/styles/palettes';
import ScrapIcon from '../../../assets/icons/scrap.svg';
import CommentsIcon from '../../../assets/icons/comments.svg';
import HeartIcon from '../../../assets/icons/heart.svg';
import ImageContainer from '../ImageContainer';
import { Button } from '../Button';

type BoardInfo = {
    id : number,
    title : string,
    content : string,
    createdAt : string,
    writer : string,
    postType : string,
    thumbnail : string,
    likeCount : number,
    scrapCount : number,
    commentCount : number
}

const Card = styled.div`
    width : 100%;
    height : auto;
    border-bottom: 1px solid ${gray2};
    display : flex;
    flex-direction : row;
`

const BoardContents = styled.div`
    font-family : Pretendard;
    width : 80%;
`

const UpContent = styled.div`
    display : flex;
    flex-directions : row;
    margin-left : 4%;
`
const Title = styled.div`
    font-size : 14px;
    font-weight : bold;
    margin-top : 5.5%;
`

const MidContent = styled.div`
    display : flex;
    flex-direction : row;
    font-size : 11px;
    color : ${gray3};
    margin-left : 4%;
    margin-top : 1%;
`

const ButtomContent = styled.div`
    display : flex;
    flex-direction : row;
    margin : 1% 4% 4% 4%;

    & > div{
        font-size : 11px;
        color : ${gray3};
        margin-right : 4%;
        margin-left : 1%;
}
`
const BoardImage = styled.div`
    position : relative;
    width : 20%;
    padding : 2%;
`

const Image = styled(ImageContainer)`
    position: absolute;
    top: 0;
    left: 0;
`

export default function BoardCard({id, title,  createdAt, postType, writer, thumbnail, likeCount, scrapCount, commentCount} : BoardInfo) {

    const formatCreatedAt = (createdAtString : string) => {
        const now = new Date();
        const createdAt = new Date(createdAtString);

        const isSameDay = now.getDate() === createdAt.getDate() &&
                          now.getMonth() === createdAt.getMonth() &&
                          now.getFullYear() === createdAt.getFullYear();
    
        if (isSameDay) {
            const hours = createdAt.getHours().toString().padStart(2, '0');
            const minutes = createdAt.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        } else {
            const month = (createdAt.getMonth() + 1).toString().padStart(2, '0'); 
            const date = createdAt.getDate().toString().padStart(2, '0');
            return `${month}.${date}`;
        }
    };


    return (
        <Card key={id}>
            <BoardContents>
                <UpContent>
                    {postType==="review" &&
                        <Button
                            width='auto'
                            height='auto'
                            border='0px'
                            color= {gray4}
                            fontSize = '12px'
                            padding = '2% 4% 2% 4%'
                            margin = '4% 4% 0% 0%'
                            backcolor={gray1}
                        >
                            리뷰
                        </Button>
                    }
                    <Title>{title}</Title>
                </UpContent>
                <MidContent>
                    {writer} &nbsp; {formatCreatedAt(createdAt)}
                </MidContent>
                <ButtomContent>
                    <img
                        src = {ScrapIcon}
                    ></img>
                    <div>{scrapCount}</div>
                    
                    <img
                        src = {CommentsIcon}
                    ></img>
                    <div>{commentCount}</div>

                    <img
                        src = {HeartIcon}
                    ></img>
                    <div>{likeCount}</div>
                </ButtomContent>
            </BoardContents>

            <BoardImage>
                {thumbnail &&
                    <Image
                        src = {thumbnail}
                        alt = '썸네일'
                        width= '100%'
                        height='100%'
                    ></Image>}
            </BoardImage>
        </Card>
    )
}
 