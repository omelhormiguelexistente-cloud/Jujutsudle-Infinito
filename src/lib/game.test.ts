import { describe, expect, it } from 'vitest';
import { ADDED_CHARACTER_IDS, CHARACTERS, FIRST_ARCS, WEAPONS } from '../data/characters';
import { appendMissingIds, canSubmitGuess, recordWin, shuffle, startRound, type GameRound } from './game';

describe('rodadas infinitas', () => {
  it('inclui os 79 novos personagens e mantém as opções de arco e arma', () => {
    expect(ADDED_CHARACTER_IDS).toHaveLength(79);
    expect(new Set(CHARACTERS.map(({ id }) => id)).size).toBe(CHARACTERS.length);
    expect(FIRST_ARCS[0]).toBe('Cursed Child Arc');
    expect(WEAPONS).toEqual(expect.arrayContaining(['Blood', 'Broom', 'Guitar', 'Knife', 'Phone']));
  });

  it('acrescenta novos alvos ao baralho salvo sem alterar a rodada em andamento', () => {
    const migrated = appendMissingIds(
      ['old-a', 'old-b', 'already-added'],
      'current-answer',
      ['new-a', 'current-answer', 'already-added', 'new-b'],
      () => 0.5,
    );
    expect(migrated.slice(0, 3)).toEqual(['old-a', 'old-b', 'already-added']);
    expect(migrated).toHaveLength(5);
    expect(migrated).toContain('new-a');
    expect(migrated).toContain('new-b');
    expect(migrated).not.toContain('current-answer');
  });

  it('embaralha sem perder nem duplicar personagens', () => {
    const ids = CHARACTERS.map(({ id }) => id);
    const shuffled = shuffle(ids, () => 0.3);
    expect(shuffled).toHaveLength(ids.length);
    expect(new Set(shuffled)).toEqual(new Set(ids));
  });

  it('não repete alvos até consumir a pilha de personagens', () => {
    let pile = shuffle(CHARACTERS.map(({ id }) => id), () => 0.42);
    const seen = new Set<string>();
    let previous: string | undefined;
    for (let index = 0; index < CHARACTERS.length; index += 1) {
      const result = startRound(pile, previous, () => 0.28);
      expect(seen.has(result.round.answerId)).toBe(false);
      if (previous) expect(result.round.answerId).not.toBe(previous);
      seen.add(result.round.answerId);
      previous = result.round.answerId;
      pile = result.deck;
    }
    expect(seen.size).toBe(CHARACTERS.length);
    expect(startRound(pile, previous, () => 0.75).round.answerId).not.toBe(previous);
  });

  it('bloqueia palpites repetidos ou enviados após a vitória', () => {
    const round: GameRound = { answerId: 'yuji-itadori', guesses: ['nobara-kugisaki'], hints: [], won: false, startedAt: '' };
    expect(canSubmitGuess(round, 'megumi-fushiguro')).toBe(true);
    expect(canSubmitGuess(round, 'nobara-kugisaki')).toBe(false);
    expect(canSubmitGuess({ ...round, won: true }, 'megumi-fushiguro')).toBe(false);
  });

  it('atualiza vitórias, sequência, média e histórico ao concluir uma rodada', () => {
    const round: GameRound = { answerId: 'yuji-itadori', guesses: ['nobara-kugisaki', 'yuji-itadori'], hints: ['ageRange'], won: true, startedAt: '' };
    const result = recordWin(
      { completed: 2, streak: 2, bestStreak: 4, totalGuesses: 7 },
      [{ name: 'Megumi Fushiguro', guesses: 3, date: '2026-01-01', hints: 0 }],
      round,
      'Yuji Itadori',
      '2026-11-04T12:00:00.000Z',
    );
    expect(result.stats).toEqual({ completed: 3, streak: 3, bestStreak: 4, totalGuesses: 9 });
    expect(result.history[0]).toEqual({ name: 'Yuji Itadori', guesses: 2, date: '2026-11-04T12:00:00.000Z', hints: 1 });
  });
});
