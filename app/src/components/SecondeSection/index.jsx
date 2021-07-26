import React from "react";
import { Container } from "../../style/globalStyle";
import { SecondSectionData } from "./data";
import {
	SecondSectionWrapper,
	SecondSectionIllustration,
	SecondSectionContent,
	SecondSectionTitle,
	SecondSectionText,
	SecondSectionBox,
	CommaMark,
} from "./SecondSectionStyle";

export default function SecondSection() {
	return (
		<SecondSectionWrapper>
			<Container reverse>
				<SecondSectionBox>
					<SecondSectionContent>
						<SecondSectionTitle>{SecondSectionData.title}</SecondSectionTitle>
						<SecondSectionText>{SecondSectionData.content}</SecondSectionText>
					</SecondSectionContent>
					<CommaMark src={SecondSectionData.comma} alt="comma" />
				</SecondSectionBox>
				<SecondSectionIllustration src={SecondSectionData.whole} alt="whole" />
			</Container>
		</SecondSectionWrapper>
	);
}
