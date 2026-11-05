import { describe, expect, it } from 'vitest';
import { ADDED_CHARACTER_IDS, AGE_RANGES, ATTRIBUTES, CATEGORY_OPTIONS, CHARACTERS, compareAttribute, searchCharacters } from './characters';

describe('banco de personagens', () => {
  it('mantém as oito categorias pedidas e IDs únicos', () => {
    expect(ATTRIBUTES.map(({ label }) => label)).toEqual(['Gender', 'Species', 'Grade', 'First Arc', 'Age Range', 'Affiliation', 'Occupation', 'Weapon']);
    expect(new Set(CHARACTERS.map(({ id }) => id)).size).toBe(CHARACTERS.length);
    expect(CATEGORY_OPTIONS.grade).toEqual(['None', 'Unknown', 'Grade 4', 'Semi-Grade 3', 'Grade 3', 'Semi-Grade 2', 'Grade 2', 'Semi-Grade 1', 'Grade 1', 'Special Grade 1', 'Special Grade']);
    expect(CATEGORY_OPTIONS.ageRange).toEqual(['1-20', '21-40', '41-60', '61-80', '81-100', '100+']);
    expect(CATEGORY_OPTIONS.gender).toEqual(['Male', 'Female']);
    expect(CATEGORY_OPTIONS.species).toEqual(['Unknown', 'Human', 'Curse', 'Hybrid']);
    expect(CATEGORY_OPTIONS.firstArc).toEqual(['Cursed Child Arc', 'Fearsome Womb Arc', 'Vs. Mahito Arc', 'Kyoto Goodwill Event Arc', 'Death Painting Arc', "Gojo's Past Arc", 'Shibuya Incident Arc', "Itadori's Extermination Arc", 'Perfect Preparation Arc', 'Culling Game Arc', 'Shinjuku Showdown Arc']);
    expect(CATEGORY_OPTIONS.affiliation).toEqual(['None', 'Tokyo Jujutsu High', 'Kyoto Jujutsu High', 'Zenin Clan', 'Kamo Clan', 'Culling Game Player', "Renchoku Girls' Junior High", "Mahito's Group", "Geto's Original Group", "Kenjaku's Group", 'Q', 'Time Vessel Association', 'U.S. Official']);
    expect(CATEGORY_OPTIONS.occupation).toEqual(['Jujutsu Sorcerer', 'Curse User', 'Non-Curse User', 'Civilian']);
    expect(CATEGORY_OPTIONS.weapon).toEqual(['None', 'Melee Weapon', 'Ranged Weapon', 'Hybrid Weapons', 'Blood', 'Broom', 'Guitar', 'Knife', 'Phone']);
    expect(ADDED_CHARACTER_IDS).toHaveLength(79);
  });

  it('pesquisa ignorando acentos e aceita apelidos', () => {
    expect(searchCharacters('Inumaki').map(({ name }) => name)).toContain('Toge Inumaki');
    expect(searchCharacters('Chōsō').map(({ name }) => name)).toContain('Choso');
    expect(searchCharacters('rei das maldições').map(({ name }) => name)).toContain('Ryomen Sukuna');
    expect(searchCharacters('não existe')).toHaveLength(0);
  });

  it('compara valores iguais e diferentes e deixa desconhecidos neutros', () => {
    const target = CHARACTERS.find(({ id }) => id === 'nobara-kugisaki')!;
    const sameSpecies = CHARACTERS.find(({ id }) => id === 'megumi-fushiguro')!;
    const panda = CHARACTERS.find(({ id }) => id === 'panda')!;
    expect(compareAttribute(target, sameSpecies, 'species')).toBe('correct');
    expect(compareAttribute(target, sameSpecies, 'gender')).toBe('wrong');
    expect(compareAttribute(panda, panda, 'species')).toBe('correct');
    expect(compareAttribute(target, panda, 'ageRange')).toBe('unknown');
  });

  it('aponta a direção certa para idade, grau e arco', () => {
    const olderTarget = CHARACTERS.find(({ id }) => id === 'satoru-gojo')!;
    const youngerGuess = CHARACTERS.find(({ id }) => id === 'nobara-kugisaki')!;
    expect(compareAttribute(olderTarget, youngerGuess, 'ageRange')).toBe('higher');
    expect(compareAttribute(youngerGuess, olderTarget, 'ageRange')).toBe('lower');
    expect(compareAttribute(olderTarget, youngerGuess, 'grade')).toBe('higher');
    const laterArcTarget = CHARACTERS.find(({ id }) => id === 'aoi-todo')!;
    expect(compareAttribute(laterArcTarget, youngerGuess, 'firstArc')).toBe('higher');
    expect(AGE_RANGES.indexOf('100+')).toBeGreaterThan(AGE_RANGES.indexOf('81-100'));
  });
});
