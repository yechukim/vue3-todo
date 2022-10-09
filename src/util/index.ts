export const todoStorage = {
	get(key: string) {
		try {
			const saved = localStorage.getItem(key)
			if (!saved) return []
			return JSON.parse(saved)
		} catch (e) {}
	},

	set(key: string, items: any) {
		try {
			localStorage.setItem(key, JSON.stringify(items))
		} catch (e) {}
	},
}
