import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isSidebarOpen } from "./atoms";
import React from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  position: fixed;
  z-index: 2;
  width: 280px;
  left: 0;
  top: 0;
  background-color: #222222;
  overflow-y: auto;
`;

const wrapperVariants = {
  initial: {
    x: -280,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: -280,
    opacity: 0,
  },
};

const Profile = styled.div`
  height: 85px;
  background-color: #2e4361;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-bottom: 25px;
`;

const ProfileColumn = styled.div`
  height: 100%;
  margin-right: 20px;
  :first-child {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  :last-child {
    flex-grow: 1;
    h4 {
      color: white;
      font-size: 17px;
      margin-bottom: 10px;
    }
    span {
      color: lightgray;
    }
  }
`;

const ProfileImg = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: white;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;

const overlayVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const SideMenu = styled.div`
  width: 100%;
  padding: 13px 0px;
  padding-left: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  transition: background-color 0.2s ease;
  cursor: pointer;
  :hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  span {
    font-size: 15px;
  }
`;

const SideMenuBtn = styled(motion.div)`
  height: 40px;
  width: 40px;
  position: absolute;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: color 0.2s ease;
  :hover {
    color: rgba(255, 255, 255, 1);
  }

  svg {
    transition: transform 0.3s ease;
  }
  .active {
    transform: rotateX(180deg);
  }
`;

const SideMenuDropDown = styled(motion.div)`
  width: 100%;
  overflow: hidden;
  color: rgba(255, 255, 255, 0.8);
  box-sizing: content-box;
`;

const SideMenuDropDownItem = styled.div`
  padding: 15px 0px;
  padding-left: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  transition: all 0.3s ease;
  color: rgba(100, 100, 100, 1);
  :hover {
    background-color: rgba(255, 255, 255, 0.4);
    color: rgba(255, 255, 255, 0.8);
  }
`;

const sVar = {
  sideInitial: {
    height: 0,
    opacity: 0,
    paddingBottom: "0px",
  },
  sideActivate: {
    height: "auto",
    opacity: 1,
    paddingBottom: "15px",
  },
  sideExit: {
    height: 0,
    opacity: 0,
    paddingBottom: "0px",
  },
};

function Sidebar() {
  const [sidebar, setSidebar] = useRecoilState(isSidebarOpen);
  const [sideDropDown, setSideDropDown] = useState([]);
  const BoardList = [
    "개드립",
    "유저 개드립",
    "읽을 거리 판",
    "커뮤니티",
    "게임 판",
    "놀이터",
    "기타",
  ];
  const onMenuBtnClick = (board) => {
    const icon = document.querySelector("." + board);
    icon.classList.toggle("active");
    const targetIndex = sideDropDown.findIndex((e) => e === board);
    targetIndex !== -1
      ? setSideDropDown((prev) => [
          ...prev.slice(0, targetIndex),
          ...prev.slice(targetIndex + 1),
        ])
      : setSideDropDown((prev) => [...prev, board]);
  };

  return (
    <>
      <AnimatePresence>
        {sidebar ? (
          <Overlay
            onClick={() => setSidebar(false)}
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Wrapper
              onClick={(e) => e.stopPropagation()}
              variants={wrapperVariants}
              transition={{ duration: 0.5, type: "linear" }}
              style={{ originX: 0 }}
            >
              <Profile>
                <ProfileColumn>
                  <ProfileImg></ProfileImg>
                </ProfileColumn>
                <ProfileColumn>
                  <h4>로그인 및 회원가입</h4>
                  <span>회원가입하세요!</span>
                </ProfileColumn>
              </Profile>
              {BoardList.map((board) => (
                <React.Fragment key={board + "frag"}>
                  <SideMenu key={board}>
                    <span>{board}</span>
                    <SideMenuBtn
                      onClick={() => onMenuBtnClick(board.replace(/ /g, ""))}
                    >
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={board.replace(/ /g, "")}
                      />
                    </SideMenuBtn>
                  </SideMenu>
                  <AnimatePresence>
                    {sideDropDown.find((e) => e === board.replace(/ /g, "")) ? (
                      <SideMenuDropDown
                        key={board + "Drop"}
                        variants={sVar}
                        initial="sideInitial"
                        animate="sideActivate"
                        exit="sideExit"
                        transition={{
                          duration: 0.3,
                          type: "tween",
                        }}
                        style={{ originX: 0.5, originY: 0 }}
                      >
                        <SideMenuDropDownItem>
                          <span>개드립</span>
                        </SideMenuDropDownItem>
                        <SideMenuDropDownItem>
                          <span>개드립 인기글</span>
                        </SideMenuDropDownItem>
                      </SideMenuDropDown>
                    ) : null}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </Wrapper>
          </Overlay>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Sidebar;
