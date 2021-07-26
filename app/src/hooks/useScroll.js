import React from "react";

export const useScroll = () => {
	const [primary, setPrimary] = React.useState("black");
	React.useEffect(() => {
		window.onscroll = () => {
			if (document.documentElement.scrollTop > 80) setPrimary("white");
			else setPrimary("black");
		};
		// fix the react problem:
		// https://stackoverflow.com/questions/54954385/react-useeffect-causing-cant-perform-a-react-state-update-on-an-unmounted-comp
		return () => {
			setPrimary(null); // This worked for me
		};
	}, [setPrimary]);
	return primary;
};
