const audioCache: Record<string, HTMLAudioElement> = {}

export function playSound(type: 'move' | 'capture') {
	const srcMap: Record<typeof type, string> = {
		move: '../../../../sounds/move_knight.mp3',
		capture: '../../../../sounds/move-monet.mp3',
	}

	const src = srcMap[type]

	if (!audioCache[type]) {
		audioCache[type] = new Audio(src)
	}

	const audio = audioCache[type]
	audio.currentTime = 0
	audio.play().catch(err => {
		console.warn(`[Sound:${type}] Failed to play:`, err)
	})
}
