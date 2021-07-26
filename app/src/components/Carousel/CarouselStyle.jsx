import styled, { css } from "styled-components/macro";
import { REM, lessThan, MEDIUM, SMALL, X_SMALL } from "../../style/helper";

export const CarouselWrapper = styled.section`
	position: relative;
`;

export const CarouselIllustration = styled.img`
	width: 100vw;
`;

export const SwiperSlide = styled.div`
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

export const SwiperCover = styled.div`
	transform: translateY(-10%);
`;

export const SlideContainer = styled.div`
	position: relative;
	height: ${REM(500)};
	${lessThan(
		SMALL,
		css`
			height: ${REM(600)};
		`
	)}
`;

export const SlideIcon = styled.img`
	position: absolute;
	width: ${REM(100)};
	height: ${REM(100)};
	border-radius: 50%;
	left: 50%;
	transform: translateX(-50%);
`;

export const SlideCover = styled.div`
	margin-top: 150px;
	width: 635px;
	height: 275px;
	background: #ffffff;
	box-shadow: 0px 4px 10px 8px rgba(0, 0, 0, 0.25);
	border-radius: 20px;
	color: black;
	padding: 30px 40px;
	${lessThan(
		MEDIUM,
		css`
			width: 500px;
			height: 300px;
		`
	)}
	${lessThan(
		SMALL,
		css`
			width: 400px;
			height: 330px;
			/* margin: 0 auto; */
		`
	)}
	${lessThan(
		X_SMALL,
		css`
			width: 300px;
			/* height: 30px; */
			padding: 4px;
		`
	)}
`;

export const SlideName = styled.p`
	font-weight: 500;
	font-size: ${REM(24)};
	/* width: 500px; */
	text-align: center;
	text-transform: uppercase;
`;
export const SlideContent = styled.p`
	font-weight: 500;
	font-size: ${REM(18)};
	margin-top: ${REM(30)};
	${lessThan(
		SMALL,
		css`
			margin-top: ${REM(20)};
		`
	)}
	${lessThan(
		SMALL,
		css`
			margin-top: ${REM(40)};
		`
	)}
`;

export const NavigationButton = styled.div`
	${(props) => props.left && "margin-left: 200px;"}
	${(props) => props.right && "margin-right: 200px;"} 
    color: #ffffff;
	background: #d6974d;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	width: 100px;
	height: 100px;
	border-radius: 50%;
	${lessThan(
		MEDIUM,
		css`
			${(props) => props.left && "margin-left: 20px;"}
			${(props) => props.right && "margin-right: 20px;"}
		`
	)}
	${lessThan(
		SMALL,
		css`
			${(props) => props.left && "margin-left: 10px;"}
			${(props) => props.right && "margin-right: 10px;"}
            width: 80px;
			height: 80px;
		`
	)}
	${lessThan(
		X_SMALL,
		css`
			${(props) => props.left && "margin-left: 4px;"}
			${(props) => props.right && "margin-right: 4px;"}
            width: 0;
			height: 0;
			color: #d6974d;
		`
	)}
`;

export const SwiperContainer = styled.div`
	position: relative;
	height: 500px;
`;

export const SwiperWrapper = styled.div``;
