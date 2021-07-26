import styled, { css } from "styled-components/macro";
import { lessThan, MEDIUM, REM, X_SMALL, SMALL } from "../../style/helper";

export const FirstSectionWrapper = styled.section`
	height: ${REM(810)};
	background-color: rgba(225, 207, 185, 0.15);
	display: flex;
	justify-content: center;
	${lessThan(
		MEDIUM,
		css`
			height: ${REM(980)};
		`
	)}
	${lessThan(
		SMALL,
		css`
			justify-content: start;
			padding-left: 30px;
		`
	)};
	${lessThan(
		X_SMALL,
		css`
			justify-content: start;
			padding-left: 0;
			height: ${REM(850)};
		`
	)};
`;

export const FirstSectionIllustration = styled.img`
	margin-left: ${REM(110)};
	width: 45%;
	transform: translateY(-10%);

	${lessThan(
		MEDIUM,
		css`
			margin-left: ${REM(0)};
			width: ${REM(500)};
			transform: translateY(0);
		`
	)}
	${lessThan(
		SMALL,
		css`
			width: ${REM(400)};
			margin-left: ${REM(0)};
		`
	)};
	${lessThan(
		X_SMALL,
		css`
			width: ${REM(340)};
			transform: translateX(4%);
		`
	)};
`;

export const FirstSectionBox = styled.div`
	position: relative;
	padding-right: ${REM(180)};
	transform: translateY(-30%);

	${lessThan(
		MEDIUM,
		css`
			margin-top: ${REM(50)};
			padding-right: ${REM(0)};
			padding-bottom: ${REM(80)};
			transform: translateY(0);
		`
	)}
	${lessThan(
		SMALL,
		css`
			padding-bottom: ${REM(200)};
		`
	)}
	${lessThan(
		X_SMALL,
		css`
			padding-bottom: ${REM(100)};
		`
	)}
`;

export const FirstSectionContent = styled.div`
	background-color: #ffffff;
	box-shadow: 0px 0px 13px 8px rgba(0, 0, 0, 0.25);
	border-radius: 20px;
	position: absolute;
	top: ${REM(100)};
	left: ${REM(100)};
	padding: ${REM(25)};
	z-index: 0;

	${lessThan(
		MEDIUM,
		css`
			width: 120%;
			top: 90px;
			left: 90px;
		`
	)}
	${lessThan(
		SMALL,
		css`
			width: 90%;
			top: 60px;
			left: 60px;
		`
	)}
	${lessThan(
		X_SMALL,
		css`
			position: inherit;
			top: 0;
			left: 12px;
			width: 100%;
			margin: 0 auto;
		`
	)}
`;

export const FirstSectionTitle = styled.h2`
	font-size: ${REM(36)};
	font-weight: bold;
	color: ${(props) => props.theme.primaryFont};
	margin-bottom: ${REM(10)};
	${lessThan(
		MEDIUM,
		css`
			font-size: ${REM(28)};
		`
	)}
	${lessThan(
		X_SMALL,
		css`
			text-align: center;
		`
	)}
`;

export const FirstSectionText = styled.p`
	/* width: ${REM(455)}; */
	font-weight: 500;
	font-size: ${REM(18)};
	line-height: ${REM(40)};
	color: ${(props) => props.theme.primaryFont};
	${lessThan(
		MEDIUM,
		css`
			font-size: ${REM(14)};
			width: 100%;
			/* width: ${REM(380)}; */
		`
	)}
	${lessThan(
		X_SMALL,
		css`
			width: ${REM(300)};
			font-size: ${REM(14)};
		`
	)}
`;

export const DotBackground = styled.img`
	z-index: 10;
	width: 100%;
	${lessThan(
		SMALL,
		css`
			/* width: ${REM(510)}; */
			width: 80%;
		`
	)}
	${lessThan(
		X_SMALL,
		css`
			display: none;
		`
	)}
`;

export const QuestionMark = styled.img`
	position: absolute;
	top: -14%;
	right: 0;
	${lessThan(
		SMALL,
		css`
			width: 35%;
		`
	)}
	${lessThan(
		X_SMALL,
		css`
			display: none;
		`
	)}
`;
