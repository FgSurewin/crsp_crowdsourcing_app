import React from "react";
import {
  NavbarHamburger,
  NavbarLogo,
  NavbarWrapper,
  NavbarList,
  NavbarItem,
  NavbarLink,
  Logo,
  NavbarContainer,
  MobileMenu,
  MobileItem,
  MobileLink,
} from "./NavbarStyle";
import { GoThreeBars, GoX } from "react-icons/go";
import { REM } from "../../style/helper";
import { useSelector } from "react-redux";
import { NICKNAME, readLocal } from "../../utils/localStorage";
import WhiterLogo from "../../images/BigLogo.svg";
import BlackLogo from "../../images/blackLogo.svg";
import Fade from "@material-ui/core/Grow";
import UserAvatar from "./UserAvatar";

export default function Navbar({
  primary = "black",
  isStatic = false,
  isFixed = false,
}) {
  const [showMenu, setShowMenu] = React.useState(false);
  const logoSrc = primary === "white" ? BlackLogo : WhiterLogo;

  // Redux
  const { nickname } = useSelector((state) => state.user);

  // LocalStorage
  const localNickname = readLocal(NICKNAME);

  const hasLogin = nickname || localNickname;

  return (
    <NavbarWrapper primary={primary} isStatic={isStatic} isFixed={isFixed}>
      <NavbarContainer isStatic={isStatic}>
        <NavbarLogo>
          <NavbarLink to="/home">
            <Logo src={logoSrc} alt="BigLogo" />
          </NavbarLink>
        </NavbarLogo>
        {!isStatic && (
          <NavbarHamburger
            primary={primary}
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? (
              <GoX style={{ fontSize: REM(36) }} />
            ) : (
              <GoThreeBars style={{ fontSize: REM(36) }} />
            )}
          </NavbarHamburger>
        )}
        <NavbarList isStatic={isStatic}>
          <NavbarItem>
            <NavbarLink primary={primary} to="/streetView">
              Start Exploring
            </NavbarLink>
          </NavbarItem>
          {/* <NavbarItem>
            <NavbarLink primary={primary} to="/pureValidation">
              Validation
            </NavbarLink>
          </NavbarItem> */}
          <NavbarItem>
            {hasLogin ? (
              <UserAvatar nickname={localNickname} />
            ) : (
              <NavbarLink size="circle" primary={primary} to="/login">
                Sign In
              </NavbarLink>
            )}
          </NavbarItem>
        </NavbarList>
      </NavbarContainer>
      <Fade in={showMenu}>
        <MobileMenu primary={primary}>
          <MobileItem>
            <MobileLink primary={primary} to="/streetView">
              Start Exploring
            </MobileLink>
          </MobileItem>
          {/* <MobileItem>
            <MobileLink primary={primary} to="/pureValidation">
              Validation
            </MobileLink>
          </MobileItem> */}
          <MobileItem>
            {hasLogin ? (
              <UserAvatar nickname={localNickname} />
            ) : (
              <MobileLink primary={primary} to="/login">
                Sign In
              </MobileLink>
            )}
          </MobileItem>
        </MobileMenu>
      </Fade>
    </NavbarWrapper>
  );
}
