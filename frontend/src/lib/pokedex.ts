// Element type palette and sprite helpers
// Colors sourced from classic Pokemon type chart

export type ElementType =
  | "grass"
  | "poison"
  | "electric"
  | "psychic"
  | "fairy"
  | "water"
  | "fire"
  | "normal"
  | "ghost"
  | "rock"

export const TYPE_COLORS: Record<ElementType, string> = {
  grass: "#4fc07f",
  poison: "#a668c4",
  electric: "#f4c94e",
  psychic: "#f85f8f",
  fairy: "#f0a8c6",
  water: "#4f9ce8",
  fire: "#f0834a",
  normal: "#b5ae9e",
  ghost: "#7a6bb0",
  rock: "#b8a86c"
}

export const TYPE_LABELS: Record<ElementType, string> = {
  grass: "Grass",
  poison: "Poison",
  electric: "Electric",
  psychic: "Psychic",
  fairy: "Fairy",
  water: "Water",
  fire: "Fire",
  normal: "Normal",
  ghost: "Ghost",
  rock: "Rock"
}

// Sprite base from the public PokeAPI sprite repository
const SPRITE_BASE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon"

export function spriteUrl(id: number, shiny = false) {
  return shiny
    ? `${SPRITE_BASE}/shiny/${id}.png`
    : `${SPRITE_BASE}/${id}.png`
}

export function officialArtUrl(id: number, shiny = false) {
  return shiny
    ? `${SPRITE_BASE}/other/official-artwork/shiny/${id}.png`
    : `${SPRITE_BASE}/other/official-artwork/${id}.png`
}

// Animated showdown style sprites used for ambient wandering pokemon
export function animatedSpriteUrl(id: number, shiny = false) {
  return shiny
    ? `${SPRITE_BASE}/other/showdown/shiny/${id}.gif`
    : `${SPRITE_BASE}/other/showdown/${id}.gif`
}

export function animatedBackSpriteUrl(id: number, shiny = false) {
  return shiny
    ? `${SPRITE_BASE}/other/showdown/back/shiny/${id}.gif`
    : `${SPRITE_BASE}/other/showdown/back/${id}.gif`
}

// Action states supported by the PMD sprite sheets
export type PmdAction = "idle" | "walk" | "attack" | "sleep"

// Base for the PMDCollab animated sprite repository
const PMD_SPRITE_BASE =
  "https://raw.githubusercontent.com/PMDCollab/SpriteCollab/main/sprite"

// Utility helper: PMDCollab repository requires 4-digit padded Dex IDs (e.g. 1 -> "0001")
export function padPokemonId(id: number): string {
  return String(id).padStart(4, "0")
}

// Returns an animated sprite GIF for a given pokemon and action state
// Falls back directly to standard PokeAPI showdown animated GIFs for baseline compatibility
export function getPmdSprite(pokemonId: number, state: PmdAction, shiny = false): string {
  // Use action aware sprite variants so state changes are visible.
  // PMDCollab assets are not directly consumable as per-action GIF URLs, so we use
  // PokeAPI showdown assets for moving/attack states and static sprites for rest states.
  if (state === "attack") return animatedBackSpriteUrl(pokemonId, shiny)
  if (state === "sleep") return spriteUrl(pokemonId, shiny)
  return animatedSpriteUrl(pokemonId, shiny)
}

// Fallback used when a specific PMD action gif fails to load (e.g. via onError in <img>)
export function getPmdSpriteFallback(pokemonId: number, shiny = false): string {
  return animatedSpriteUrl(pokemonId, shiny)
}

// Odds used for the shiny easter egg across the site
export const SHINY_CHANCE = 0.05

export function rollShiny() {
  return Math.random() < SHINY_CHANCE
}

// A curated roster used across the site so each theme or category
// always points at the same familiar Pokemon
export const ROSTER = {
  bulbasaur: 1,
  ivysaur: 2,
  charmander: 4,
  squirtle: 7,
  caterpie: 10,
  pikachu: 25,
  meowth: 52,
  psyduck: 54,
  clefairy: 35,
  jigglypuff: 39,
  gastly: 92,
  haunter: 93,
  gengar: 94,
  drowzee: 96,
  eevee: 133,
  snorlax: 143,
  dragonite: 149,
  chikorita: 152,
  totodile: 158,
  celebi: 251,
  rayquaza: 384,
  dialga: 483
}

export const CATEGORY_TYPE: Record<string, ElementType> = {
  Medicine: "water",
  Poetry: "fairy",
  Biology: "grass",
  Writing: "psychic"
}

export const SUBJECT_TYPE: Record<string, ElementType> = {
  Biology: "grass",
  Chemistry: "poison",
  Physics: "electric",
  Mathematics: "normal",
  English: "psychic",
  Nepali: "fairy",
  Botany: "grass",
  Zoology: "water",
  Anatomy: "rock"
}