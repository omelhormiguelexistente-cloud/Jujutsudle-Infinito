import { CHARACTERS, type AttributeKey, type Character } from '../data/characters';

export type GameRound = {
  answerId: string;
  guesses: string[];
  hints: AttributeKey[];
  won: boolean;
  startedAt: string;
};

export type GameStats = { completed: number; streak: number; bestStreak: number; totalGuesses: number };
export type GameHistoryRecord = { name: string; guesses: number; date: string; hints: number };

export function canSubmitGuess(round: GameRound, characterId: string): boolean {
  return !round.won && !round.guesses.includes(characterId);
}

export function recordWin(
  stats: GameStats,
  history: GameHistoryRecord[],
  round: GameRound,
  characterName: string,
  date = new Date().toISOString(),
): { stats: GameStats; history: GameHistoryRecord[] } {
  const completed = stats.completed + 1;
  const streak = stats.streak + 1;
  return {
    stats: {
      completed,
      streak,
      bestStreak: Math.max(stats.bestStreak, streak),
      totalGuesses: stats.totalGuesses + round.guesses.length,
    },
    history: [{ name: characterName, guesses: round.guesses.length, date, hints: round.hints.length }, ...history].slice(0, 30),
  };
}

export function shuffle<T>(items: T[], random: () => number = Math.random): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

export function appendMissingIds(
  deck: string[],
  currentAnswerId: string,
  newCharacterIds: string[],
  random: () => number = Math.random,
): string[] {
  const present = new Set([currentAnswerId, ...deck]);
  const additions = shuffle(newCharacterIds.filter((id) => !present.has(id)), random);
  return [...deck, ...additions];
}

export function startRound(
  deck: string[],
  previousAnswerId?: string,
  random: () => number = Math.random,
): { round: GameRound; deck: string[] } {
  const validIds = new Set(CHARACTERS.map((character) => character.id));
  let available = deck.filter((id) => validIds.has(id));
  if (available.length === 0) available = shuffle(CHARACTERS.map((character) => character.id), random);
  if (available.length > 1 && available[0] === previousAnswerId) {
    const alternateIndex = 1 + Math.floor(random() * (available.length - 1));
    [available[0], available[alternateIndex]] = [available[alternateIndex], available[0]];
  }
  const [answerId, ...remaining] = available;
  return {
    round: { answerId, guesses: [], hints: [], won: false, startedAt: new Date().toISOString() },
    deck: remaining,
  };
}

export function findCharacter(id: string): Character {
  const character = CHARACTERS.find((entry) => entry.id === id);
  if (!character) throw new Error(`Personagem inválido: ${id}`);
  return character;
}
