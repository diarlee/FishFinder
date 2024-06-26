import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";

import Footer from "./components/common/Footer";
import Main from "./pages/main/Main";
import Board from "./pages/board/Board";
import Search from "./pages/search/Search";
import BoardDetail from "./pages/board/detail/BoardDetail";
import BoardDetail2 from "./pages/board/detail/BoardDetail2";
import BoardRegister from "./pages/board/register/BoardRegister";
import MyPage from "./pages/myPage/MyPage";
import Info from "./pages/info/Info";
import Scan from "./pages/scan/Scan";
import MarketCondition from "./pages/marketCondition/MarketCondition";
import Login from "./pages/login/Login";
import OAuth from "./pages/login/OAuth";
import NickName from "./components/common/Nickname";
import Tutorial from "./pages/tutorial/Tutorial";
import { userStore } from "./stores/userStore";
import { axiosInstance } from "./services/axios";

const Wrapper = styled.div`
  font-family: Pretendard;
  background-color: "#FFFFFF";
  margin: 0;
`;

function App() {
  const { userId, setUserId, setNickName } = userStore();

  useEffect(() => {
    if (!localStorage.getItem("RecentSearch")) {
      localStorage.setItem("RecentSearch", JSON.stringify([]));
    }

    if (userId !== -1) {
      axiosInstance.get("/api/users/check").catch((error) => {
        if (error.response.status === 401) {
          setUserId(-1);
          setNickName("");
          window.location.reload();
        }
      });
    }
  }, []);

  return (
    <Wrapper>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Footer />}>
            <Route path="" element={<Main />} />
            <Route path="board" element={<Board />} />
            <Route path="search" element={<Search />} />
            <Route path="mypage" element={<MyPage />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="board">
            <Route path=":boardId" element={<BoardDetail />} />
            <Route path="register" element={<BoardRegister />} />
          </Route>
          <Route path="info">
            <Route path=":fishId" element={<Info />} />
          </Route>
          <Route path="marketCondition">
            <Route path=":fishId" element={<MarketCondition />} />
          </Route>
          <Route path="scan" element={<Scan />} />
          <Route path="oauth">
            <Route path="callback">
              <Route path="kakao" element={<OAuth />} />
            </Route>
          </Route>
          <Route path="tutorial" element={<Tutorial />} />
          <Route path="boarddetail2" element={<BoardDetail2 />} />
          <Route path="nickname">
            <Route
              path=""
              element={<NickName title="닉네임을 변경해주세요" url="/mypage" />}
            />
            <Route
              path="signup"
              element={<NickName title="회원가입을 완료해주세요." url="/" />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Wrapper>
  );
}

export default App;
