import styled, { css } from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { hide_for_desktop, hide_for_mobile, REM } from "../../style/helper";

const circleStyle = css`
  border: 1px solid
    ${(props) =>
      props.primary === "white" ? props.theme.primaryFont : "white"};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 30px;
  padding: 6px 14px;
  &:hover {
    border: 1px solid #d6974d;
  }
`;

const fixedStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  /* max-width: 1256px; */
`;

export const NavbarWrapper = styled.nav`
  z-index: 110;
  background-color: transparent;
  position: relative;
  ${(props) => props.isStatic && "min-width: 1256px;"}
  ${(props) =>
    props.primary === "white" &&
    css`
      background: rgba(255, 255, 255, 0.9);
      box-shadow: 0px 4px 10px 6px rgba(0, 0, 0, 0.25);
      color: ${props.theme.primaryFont};
    `}
	${(props) => props.isFixed && fixedStyle}
`;

export const NavbarContainer = styled.div`
  ${(props) => (props.isStatic ? "width: 1256px;" : "max-width: 1256px;")}
  /* max-width: 1256px; */
	margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${REM(60)};
  padding: 0 30px;
  z-index: 110;
`;

export const NavbarLogo = styled.div`
  z-index: 110;
`;

export const Logo = styled.img``;

export const NavbarHamburger = styled.div`
  color: ${(props) =>
    props.primary === "white" ? props.theme.primaryFont : "white"};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 110;
  ${hide_for_desktop}
`;

export const NavbarList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${REM(16)};
  ${(props) => !props.isStatic && hide_for_mobile}
`;

export const NavbarItem = styled.li`
  margin: 0 ${REM(38)};
`;

export const NavbarLink = styled(NavLink)`
  text-decoration: none;
  color: ${(props) =>
    props.primary === "white" ? props.theme.primaryFont : "white"};
  font-size: ${REM(18)};
  ${(props) => props.size && circleStyle}
  &:hover {
    color: #d6974d;
    /* font-weight: bolder; */
  }
`;
const blackBackground = css`
  background: #000000; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left,
    #434343,
    #000000
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #434343,
    #000000
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;
const whiteBackground = css`
  background: #ece9e6; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left,
    #ffffff,
    #ece9e6
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #ffffff,
    #ece9e6
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;
export const MobileMenu = styled.ul`
  position: fixed;
  left: 0;
  top: 0;
  padding-top: ${REM(90)};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.primary === "white" ? "white" : "black"};
  transition: all 4s;
  &::after {
    content: "";
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    ${(props) =>
      props.primary === "white" ? whiteBackground : blackBackground}

    z-index: 100;
  }
`;

export const MobileItem = styled.li`
  padding: 20px 0px;
  font-size: ${REM(34)};
  text-align: center;
  cursor: pointer;
  width: 100%;
  z-index: 110;
  &:hover {
    background-color: #d6974d;
    font-weight: bolder;
  }
`;

export const MobileLink = styled(NavLink)`
  text-decoration: none;
  color: ${(props) =>
    props.primary === "white" ? props.theme.primaryFont : "white"};
  font-size: ${REM(28)};
  &:hover {
    color: ${(props) =>
      props.primary === "white" ? props.theme.primaryFont : "white"};
  }
`;
