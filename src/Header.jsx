import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRandom, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSetRecoilState } from "recoil";
import { isSidebarOpen } from "./atoms";

const Nav = styled.div`
  background-color: #2e4361;
  top: 0;
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 1150px;
  justify-content: space-between;
  align-items: center;
`;

const NavColumn = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 15px;
  :nth-child(2) {
    flex-grow: 1;
  }
`;

const SideBarBtn = styled.div`
  width: 60px;
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  cursor: pointer;

  div {
    min-height: 2px;
    width: 70%;
    background-color: white;
    margin-bottom: 5px;
    transition: width 0.5s ease;
    :first-child {
      width: 50%;
    }
    :last-child {
      width: 60%;
    }
  }

  &:hover {
    div {
      width: 50%;
      :first-child,
      :last-child {
        width: 80%;
      }
      transition: width 0.5s ease;
    }
  }
`;

const Logo = styled.div`
  min-width: 150px;
  height: 100%;
  padding: 15px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 1);
  :hover {
    color: rgba(255, 255, 255, 0.7);
  }
  h1 {
    font-size: 24px;
  }
`;

const DropDownMenu = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DropDownItem = styled(motion.div)`
  height: 100%;
  padding: 0px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  position: relative;
  font-size: 15px;
`;

const dropDownItemVariants = {
  hover: {
    color: "rgba(255, 255, 255, 1)",
  },
};

const DropDownList = styled(motion.div)`
  width: 150px;
  position: absolute;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  top: 60px;
  left: 0;
  background-color: #222222;
  border: 1px solid rgba(255, 255, 255, 0.8);
  padding: 20px 15px;
`;

const dropDownListVariants = {
  initial: {
    scale: 0,
    opacity: 1,
  },
  animate: {
    scale: 1,
    opacity: 1,
  },
  exit: {
    scale: 0,
    opacity: 0,
  },
};

const LogIn = styled.div`
  padding: 10px 15px;
  background-color: #1b2a41;
  border-radius: 30px;
  color: white;
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

const LogInBox = styled(motion.div)`
  width: 400px;
  height: 400px;
  border-radius: 10px;
  background-color: #222222;
`;

const LogInBoxHeader = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  color: white;
  border-bottom: 1px solid white;
`;

const LogInBoxBody = styled.div`
  padding: 30px 25px;
  display: flex;
  flex-direction: column;

  input {
    border: none;
    outline: none;
    border-radius: 5px;
    padding: 15px 10px;
    margin-bottom: 30px;
    background-color: #494949;
    color: white;
    font-size: 16px;
    ::after {
      width: 100%;
    }
    :hover {
      transition: border-bottom 0.3s ease;
    }
  }
`;

const logInBoxVariants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

function Header() {
  const [dropDownHover, setDropDownHover] = useState("");
  const [inOverlay, setInOverlay] = useState(false);
  const BoardList = [
    "개드립",
    "유저 개드립",
    "읽을 거리 판",
    "커뮤니티",
    "게임 판",
    "놀이터",
    "기타",
  ];
  const setIsSidebarOpen = useSetRecoilState(isSidebarOpen);
  return (
    <>
      <Nav>
        <Wrapper>
          <NavColumn>
            <SideBarBtn onClick={() => setIsSidebarOpen((prev) => !prev)}>
              <div></div>
              <div></div>
              <div></div>
            </SideBarBtn>
            <Logo>
              <h1>DogDrip.net</h1>
            </Logo>
          </NavColumn>
          <NavColumn>
            <DropDownMenu>
              {BoardList.map((board) => (
                <DropDownItem
                  key={board}
                  onMouseEnter={() => setDropDownHover(board)}
                  onMouseLeave={() => setDropDownHover("")}
                  variants={dropDownItemVariants}
                  whileHover="hover"
                  transition={{ duration: 0.2 }}
                >
                  {board}
                  <AnimatePresence>
                    {dropDownHover === board ? (
                      <DropDownList
                        key={board + "1"}
                        variants={dropDownListVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        style={{ originX: 0, originY: 0 }}
                      ></DropDownList>
                    ) : null}
                  </AnimatePresence>
                </DropDownItem>
              ))}
            </DropDownMenu>
          </NavColumn>
          <NavColumn>
            <FontAwesomeIcon
              icon={faRandom}
              style={{ color: "white", marginRight: 30 }}
            />
            <LogIn onClick={() => setInOverlay((prev) => !prev)}>로그인</LogIn>
          </NavColumn>
        </Wrapper>
      </Nav>
      <AnimatePresence>
        {inOverlay ? (
          <Overlay
            onClick={() => setInOverlay((prev) => !prev)}
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <LogInBox
              onClick={(e) => e.stopPropagation()}
              variants={logInBoxVariants}
            >
              <LogInBoxHeader>
                <span>로그인</span>

                <FontAwesomeIcon icon={faTimes} style={{ color: "white" }} />
              </LogInBoxHeader>
              <LogInBoxBody>
                <input type="text" />
                <input type="text" />
              </LogInBoxBody>
            </LogInBox>
          </Overlay>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Header;
