import React from "react";
import Navbar from "../Navbar";
import {
	HeaderWrapper,
	HeaderVideo,
	Shade,
	HeaderTitleBox,
	HeaderSubtitleBox,
	HeaderTitle,
	HeaderSubtitle,
	HeaderIcon,
	HeaderButton,
	HeaderContent,
} from "./HeaderStyle";
import Background from "../../videos/background.mp4";
import { useScroll } from "../../hooks/useScroll";
import { HeaderData } from "./data";
import { NavLink } from "react-router-dom";

export default function Header() {
	const primary = useScroll();
	return (
		<HeaderWrapper>
			<Navbar primary={primary} isFixed />
			<HeaderVideo muted loop autoPlay src={Background} />
			<Shade />
			<HeaderContent>
				<HeaderTitleBox>
					<HeaderTitle>{HeaderData.title.one}</HeaderTitle>
					<HeaderTitle>{HeaderData.title.two}</HeaderTitle>
				</HeaderTitleBox>
				<HeaderSubtitleBox>
					<HeaderSubtitle>{HeaderData.subtitle.one}</HeaderSubtitle>
					<HeaderSubtitle>{HeaderData.subtitle.two}</HeaderSubtitle>
				</HeaderSubtitleBox>
				<HeaderButton>
					<NavLink to="/streetView" style={{ color: "white" }}>
						{HeaderData.button}
					</NavLink>
				</HeaderButton>
			</HeaderContent>
			<HeaderIcon src={HeaderData.icon} alt="scrollDown" />
		</HeaderWrapper>
	);
}
