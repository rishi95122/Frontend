const styles = {
	global: () => ({
		"#gradient-canvas": {
			"--gradient-color-1": "#02c296",
			"--gradient-color-2": "#317eaa",
			"--gradient-color-3": "#0659c7",
			"--gradient-color-4": "#033540"
		},
		".rmdp-arrow": {
			border: "solid white",
			borderWidth: "0 2px 2px 0",
			display: "inline-block",
			height: "0.5rem",
			marginTop: "0px",
			padding: "2px",
			width: "0.5rem"
		},

		".rmdp-arrow-container": {
			alignItems: "center",
			borderRadius: "25%",
			cursor: "pointer",
			display: "flex",
			height: "1.5rem",
			justifyContent: "center",
			margin: "0 0",
			width: "1.5rem"
		},
		".rmdp-arrow-container:hover": {
			background: "whiteAlpha.300",
			border: "none",
			boxShadow: "none"
		},
		".rmdp-calendar": {
			background: "var(--chakra-colors-gray-700)",
			borderTopRadius: "1.25em"
		},
		".rmdp-day": {
			borderRadius: "25%",
			color: "white",
			fontFamily: "body"
		},
		".rmdp-day :hover": {
			background: "rgba(255,255,255,0.25) !important",
			borderRadius: "25%",
			fontFamily: "body",
			transition: "0.1s all"
		},
		".rmdp-day.rmdp-selected": {
			background: "transparent",
			borderRadius: "25%",
			fontFamily: "body"
		},
		".rmdp-day.rmdp-selected span:not(.highlight)": {
			background:
				"linear-gradient(45deg, var(--chakra-colors-brand-1),var(--chakra-colors-brand-2)) !important",
			borderRadius: "25%",
			color: "white"
		},
		".rmdp-day.rmdp-today span": {
			background: "rgba(255,255,255,0.1)",
			borderRadius: "25%",
			fontFamily: "body"
		},
		".rmdp-header": {
			color: "white !important",
			padding: "0px 0.25rem"
		},
		".rmdp-header-values": {
			color: "white",
			fontFamily: "heading",
			fontSize: "13pt"
		},
		".rmdp-shadow": {
			shadow: "none"
		},
		".rmdp-time-picker": {
			background: "var(--chakra-colors-gray-600)",
			borderBottomRadius: "1.25em",
			boxShadow: "var(--chakra-shadows-md)"
		},
		".rmdp-time-picker div input": {
			background: "transparent",
			color: "white",
			fontFamily: "heading",
			fontSize: "15pt",
			height: "1.5rem",
			width: "2rem"
		},
		".rmdp-week-day": {
			color: "white",
			fontFamily: "heading",
			fontSize: "10pt",
			height: "1rem"
		},
		".rmdp-wrapper": {
			border: "none !important",
			paddingTop: "0.25rem"
		},
		".swiper-pagination": {
			alignItems: "center"
		},
		".swiper-pagination-bullet": {
			background: "linear-gradient(45deg, #23E9C4, #2975CB) !important",
			height: "0.5rem",
			opacity: 0.5,
			transition: "0.2s all",
			width: "0.5rem"
		},
		".swiper-pagination-bullet-active": {
			background: "linear-gradient(45deg, #23E9C4, #2975CB) !important",
			height: "0.75rem",
			opacity: 1,
			transition: "0.2s all",
			width: "0.75rem"
		}
	})
}

export default styles
