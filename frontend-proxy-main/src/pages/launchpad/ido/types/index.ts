export type IDOCardType = {
	bannerImages: string[]
	fullName: string
	logo: string
	shortDesc: string
	tokenSymbol: string
}

export type IDOPageType = {
	problem: {
		desc: string
		header: string
	}
	product: {
		bannerImages: string[]
		fullName: string
		header: string
		highlights: string[]
		logo: string
		longDesc: string
		shortDesc: string
		tokenSymbol: string
	}

	socials?: {
		discord?: string
		telegram?: string
		twitter?: string
	}
	solution: {
		desc: string
		header: string
	}
	team: {
		header: string
		members: Array<{
			desc: string
			name: string
			role: string
		}>
	}
	website?: string
	whitepaper?: string
}
