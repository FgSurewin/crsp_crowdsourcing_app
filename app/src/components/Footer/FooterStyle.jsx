import styled, { css } from "styled-components/macro";
import { REM, lessThan, MEDIUM, SMALL } from "../../style/helper";

export const FooterWrapper = styled.footer`
  height: ${REM(377)};
  background: #484646;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: ${REM(485)};
  height: ${REM(220)};
  ${lessThan(
    SMALL,
    css`
      width: ${REM(285)};
    `
  )}
`;

export const ListTitle = styled.p`
  font-weight: bolder;
  font-size: ${REM(16)};
  text-transform: uppercase;
`;

export const ProjectList = styled.ul``;

export const ProjectItem = styled.li`
  margin-top: ${REM(6)};
  box-sizing: border-box;
`;

export const ConnectList = styled.ul``;

export const ConnectItem = styled.li`
  height: ${REM(35)};
  width: 100%;
  padding: ${REM(5)} 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`;

export const ConnectIcon = styled.img``;

export const ConnectText = styled.p`
  margin-left: ${REM(4)};
  margin-bottom: 0;
`;

export const Divider = styled.div`
  width: ${REM(955)};
  border: 2px solid #ffffff;
  ${lessThan(
    MEDIUM,
    css`
      width: 100%;
    `
  )}
`;

export const CopyRight = styled.p`
  font-weight: bold;
  font-size: ${REM(12)};
  margin-top: ${REM(20)};
`;

export const ProjectLink = styled.a`
  font-weight: 500;
  font-size: ${REM(14)};
  color: #fff;
  &:hover {
    border-bottom: 1px solid #fff;
  }
`;

export const ConnectLink = styled.a`
  display: flex;
  color: #fff;
  &:hover {
    border-bottom: 1px solid #fff;
  }
`;
