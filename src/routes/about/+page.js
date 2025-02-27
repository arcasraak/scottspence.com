import { error } from '@sveltejs/kit'

export const load = async () => {
  try {
    const Copy = await import(`../../../copy/about.md`)
    return {
      Copy: Copy.default,
    }
  } catch (e) {
    throw error(404, 'Uh oh!')
  }
}
