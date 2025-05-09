import type { CoinNaminals } from '../consts/consts'

export interface LeaderBoardDto {
	_id: string
	login: string
	score: number
}

export interface IScoreCoins {
	lotCoin150: CoinNaminals[]
	lotCoin200: CoinNaminals[]
	lotCoin250: CoinNaminals[]
	lotCoin300: CoinNaminals[]
	lotCoin350: CoinNaminals[]
	totalScore: number
}
