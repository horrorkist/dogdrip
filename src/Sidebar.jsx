import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isSidebarOpen } from "./atoms";

const Wrapper = styled(motion.div)`
  height: 100vh;
  position: fixed;
  z-index: 2;
  width: 280px;
  left: 0;
  top: 0;
  background-color: #222222;
  overflow: scroll;
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
`;

const SideList = styled.div``;

function Sidebar() {
  const [sidebar, setSidebar] = useRecoilState(isSidebarOpen);
  const BoardList = [
    "개드립",
    "유저 개드립",
    "읽을 거리 판",
    "커뮤니티",
    "게임 판",
    "놀이터",
    "기타",
  ];

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
                <SideMenu>
                  <span>{board}</span>
                  <SideMenuBtn>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </SideMenuBtn>
                </SideMenu>
              ))}
            </Wrapper>
          </Overlay>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Sidebar;
