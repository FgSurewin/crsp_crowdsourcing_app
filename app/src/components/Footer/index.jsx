import React from "react";
import { FooterData } from "./data";
import {
	ConnectIcon,
	ConnectItem,
	ConnectLink,
	ConnectList,
	ConnectText,
	CopyRight,
	Divider,
	FooterContainer,
	FooterWrapper,
	ListTitle,
	ProjectItem,
	ProjectLink,
	ProjectList,
} from "./FooterStyle";

export default function Footer() {
	return (
		<FooterWrapper>
			<FooterContainer>
				<ProjectList>
					<ListTitle>{FooterData.project}</ListTitle>
					{FooterData.projectList.map((item, index) => (
						<ProjectItem key={index}>
							<ProjectLink href="/">{item}</ProjectLink>
						</ProjectItem>
					))}
				</ProjectList>
				<ConnectList>
					<ListTitle>{FooterData.connect}</ListTitle>
					{FooterData.connectList.map((item, index) => (
						<ConnectItem key={index}>
							<ConnectLink href="/">
								<ConnectIcon src={item.icon} alt={`icon${index}`} />
								<ConnectText>{item.content}</ConnectText>
							</ConnectLink>
						</ConnectItem>
					))}
				</ConnectList>
			</FooterContainer>
			<Divider />
			<CopyRight>{FooterData.copyRight}</CopyRight>
		</FooterWrapper>
	);
}
