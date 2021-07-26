import React from "react";
import { Container } from "../../style/globalStyle";
import { FirstSectionData } from "./data";
import {
	FirstSectionWrapper,
	FirstSectionIllustration,
	FirstSectionContent,
	FirstSectionTitle,
	FirstSectionText,
	DotBackground,
	FirstSectionBox,
	QuestionMark,
} from "./FirstSectionStyle";

export default function FirstSection() {
	return (
		<FirstSectionWrapper>
			<Container>
				<FirstSectionBox>
					<FirstSectionContent>
						<FirstSectionTitle>{FirstSectionData.title}</FirstSectionTitle>
						<FirstSectionText>{FirstSectionData.content}</FirstSectionText>
						<QuestionMark
							src={FirstSectionData.questionMark}
							alt="QuestionMark"
						/>
					</FirstSectionContent>
					<DotBackground src={FirstSectionData.dot} alt="dot" />
				</FirstSectionBox>
				<FirstSectionIllustration
					src={FirstSectionData.illustration}
					alt="illustration"
				/>
			</Container>
		</FirstSectionWrapper>
	);
}
