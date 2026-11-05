import { ADDITIONAL_CHARACTERS, ADDED_CHARACTER_IDS } from './additionalCharacters';

export const UNKNOWN = 'Unknown' as const;

export const GENDERS = ['Male', 'Female'] as const;
export const SPECIES = ['Unknown', 'Human', 'Curse', 'Hybrid'] as const;
export const GRADES = [
  'None', 'Unknown', 'Grade 4', 'Semi-Grade 3', 'Grade 3', 'Semi-Grade 2',
  'Grade 2', 'Semi-Grade 1', 'Grade 1', 'Special Grade 1', 'Special Grade',
] as const;
export const FIRST_ARCS = [
  'Cursed Child Arc', 'Fearsome Womb Arc', 'Vs. Mahito Arc', 'Kyoto Goodwill Event Arc', 'Death Painting Arc',
  "Gojo's Past Arc", 'Shibuya Incident Arc', "Itadori's Extermination Arc",
  'Perfect Preparation Arc', 'Culling Game Arc', 'Shinjuku Showdown Arc',
] as const;
export const AGE_RANGES = ['1-20', '21-40', '41-60', '61-80', '81-100', '100+'] as const;
export const AFFILIATIONS = [
  'None', 'Tokyo Jujutsu High', 'Kyoto Jujutsu High', 'Zenin Clan', 'Kamo Clan',
  'Culling Game Player', "Renchoku Girls' Junior High", "Mahito's Group",
  "Geto's Original Group", "Kenjaku's Group", 'Q', 'Time Vessel Association', 'U.S. Official',
] as const;
export const OCCUPATIONS = ['Jujutsu Sorcerer', 'Curse User', 'Non-Curse User', 'Civilian'] as const;
export const WEAPONS = ['None', 'Melee Weapon', 'Ranged Weapon', 'Hybrid Weapons', 'Blood', 'Broom', 'Guitar', 'Knife', 'Phone'] as const;

export type Gender = typeof GENDERS[number];
export type Species = typeof SPECIES[number];
export type Grade = typeof GRADES[number];
export type FirstArc = typeof FIRST_ARCS[number];
export type AgeRange = typeof AGE_RANGES[number];
export type Affiliation = typeof AFFILIATIONS[number];
export type Occupation = typeof OCCUPATIONS[number];
export type Weapon = typeof WEAPONS[number];

export type Character = {
  id: string;
  name: string;
  aliases: string[];
  gender: Gender;
  species: Species;
  grade: Grade;
  firstArc: FirstArc;
  ageRange: AgeRange | null;
  affiliation: Affiliation;
  occupation: Occupation;
  weapon: Weapon;
  imageUrl?: string;
  imageSourceUrl?: string;
  portrait: { hair: string; accent: string; mark?: 'panda' | 'spirit' | 'fire' | 'plant' };
  sourceUrl: string;
};

const EXISTING_CHARACTERS: Character[] = [
  {
    id: 'yuji-itadori', name: 'Yuji Itadori', aliases: ['Itadori', 'Yuji'],
    gender: 'Male', species: 'Human', grade: 'Unknown', firstArc: 'Fearsome Womb Arc', ageRange: '1-20',
    affiliation: 'Tokyo Jujutsu High', occupation: 'Jujutsu Sorcerer', weapon: 'None',
    imageUrl: './characters/yuji-itadori.png',
    portrait: { hair: '#ef7894', accent: '#ffcf71' },
    sourceUrl: 'https://jujutsukaisen.fandom.com/wiki/Yuji_Itadori',
  },
  {
    id: 'megumi-fushiguro', name: 'Megumi Fushiguro', aliases: ['Megumi', 'Fushiguro'],
    gender: 'Male', species: 'Human', grade: 'Grade 2', firstArc: 'Fearsome Womb Arc', ageRange: '1-20',
    affiliation: 'Tokyo Jujutsu High', occupation: 'Jujutsu Sorcerer', weapon: 'None',
    imageUrl: './characters/megumi-fushiguro.png',
    portrait: { hair: '#151923', accent: '#8195ef' },
    sourceUrl: 'https://jujutsukaisen.fandom.com/wiki/Megumi_Fushiguro',
  },
  {
    id: 'nobara-kugisaki', name: 'Nobara Kugisaki', aliases: ['Nobara', 'Kugisaki'],
    gender: 'Female', species: 'Human', grade: 'Grade 3', firstArc: 'Fearsome Womb Arc', ageRange: '1-20',
    affiliation: 'Tokyo Jujutsu High', occupation: 'Jujutsu Sorcerer', weapon: 'Hybrid Weapons',
    imageUrl: './characters/nobara-kugisaki.png',
    portrait: { hair: '#b85e4f', accent: '#f5a64b' },
    sourceUrl: 'https://jujutsukaisen.fandom.com/wiki/Nobara_Kugisaki',
  },
  {
    id: 'satoru-gojo', name: 'Satoru Gojo', aliases: ['Gojo', 'Satoru'],
    gender: 'Male', species: 'Human', grade: 'Special Grade', firstArc: 'Fearsome Womb Arc', ageRange: '21-40',
    affiliation: 'Tokyo Jujutsu High', occupation: 'Jujutsu Sorcerer', weapon: 'None',
    imageUrl: './characters/satoru-gojo.png',
    portrait: { hair: '#e7e9f1', accent: '#64c8ed' },
    sourceUrl: 'https://jujutsukaisen.fandom.com/wiki/Satoru_Gojo',
  },
  {
    id: 'maki-zenin', name: 'Maki Zenin', aliases: ['Maki', 'Zenin'],
    gender: 'Female', species: 'Human', grade: 'Grade 4', firstArc: 'Kyoto Goodwill Event Arc', ageRange: '1-20',
    affiliation: 'Tokyo Jujutsu High', occupation: 'Jujutsu Sorcerer', weapon: 'Melee Weapon',
    imageUrl: './characters/maki-zenin.png',
    portrait: { hair: '#24252b', accent: '#75c7a5' },
    sourceUrl: 'https://jujutsukaisen.fandom.com/wiki/Maki_Zenin',
  },
  {
    id: 'toge-inumaki', name: 'Toge Inumaki', aliases: ['Toge', 'Inumaki'],
    gender: 'Male', species: 'Human', grade: 'Semi-Grade 1', firstArc: 'Kyoto Goodwill Event Arc', ageRange: '1-20',
    affiliation: 'Tokyo Jujutsu High', occupation: 'Jujutsu Sorcerer', weapon: 'None',
    imageUrl: './characters/toge-inumaki.png',
    portrait: { hair: '#d7c6a2', accent: '#c593e8' },
    sourceUrl: 'https://jujutsukaisen.fandom.com/wiki/Toge_Inumaki',
  },
  {
    id: 'yuta-okkotsu', name: 'Yuta Okkotsu', aliases: ['Yuta', 'Okkotsu'],
    gender: 'Male', species: 'Human', grade: 'Special Grade', firstArc: "Itadori's Extermination Arc", ageRange: '1-20',
    affiliation: 'Tokyo Jujutsu High', occupation: 'Jujutsu Sorcerer', weapon: 'Melee Weapon',
    imageUrl: './characters/yuta-okkotsu.png',
    portrait: { hair: '#2b2e3c', accent: '#97baf8' },
    sourceUrl: 'https://jujutsukaisen.fandom.com/wiki/Yuta_Okkotsu',
  },
  {
    id: 'panda', name: 'Panda', aliases: ['Panda Gakuganji'],
    gender: 'Male', species: 'Unknown', grade: 'Semi-Grade 2', firstArc: 'Kyoto Goodwill Event Arc', ageRange: null,
    affiliation: 'Tokyo Jujutsu High', occupation: 'Jujutsu Sorcerer', weapon: 'None',
    imageUrl: './characters/panda.png',
    portrait: { hair: '#f0eee7', accent: '#20232d', mark: 'panda' },
    sourceUrl: 'https://jujutsukaisen.fandom.com/wiki/Panda',
  },
  {
    id: 'aoi-todo', name: 'Aoi Todo', aliases: ['Todo', 'Aoi'],
    gender: 'Male', species: 'Human', grade: 'Grade 1', firstArc: 'Kyoto Goodwill Event Arc', ageRange: '1-20',
    affiliation: 'Kyoto Jujutsu High', occupation: 'Jujutsu Sorcerer', weapon: 'None',
    imageUrl: './characters/aoi-todo.png',
    portrait: { hair: '#17171c', accent: '#e6a45c' },
    sourceUrl: 'https://jujutsukaisen.fandom.com/wiki/Aoi_Todo',
  },
  {
    id: 'kento-nanami', name: 'Kento Nanami', aliases: ['Nanami', 'Kento'],
    gender: 'Male', species: 'Human', grade: 'Grade 1', firstArc: 'Vs. Mahito Arc', ageRange: '21-40',
    affiliation: 'Tokyo Jujutsu High', occupation: 'Jujutsu Sorcerer', weapon: 'Melee Weapon',
    imageUrl: './characters/kento-nanami.png',
    portrait: { hair: '#d6b361', accent: '#86b7c9' },
    sourceUrl: 'https://jujutsukaisen.fandom.com/wiki/Kento_Nanami',
  },
  {
    id: 'suguru-geto', name: 'Suguru Geto', aliases: ['Geto', 'Suguru'],
    gender: 'Male', species: 'Human', grade: 'Special Grade', firstArc: "Gojo's Past Arc", ageRange: '21-40',
    affiliation: "Geto's Original Group", occupation: 'Curse User', weapon: 'None',
    imageUrl: './characters/suguru-geto.png',
    portrait: { hair: '#161622', accent: '#bb80d8' },
    sourceUrl: 'https://jujutsukaisen.fandom.com/wiki/Suguru_Geto',
  },
  {
    id: 'mahito', name: 'Mahito', aliases: [],
    gender: 'Male', species: 'Curse', grade: 'Special Grade', firstArc: 'Vs. Mahito Arc', ageRange: null,
    affiliation: "Mahito's Group", occupation: 'Non-Curse User', weapon: 'None',
    imageUrl: './characters/mahito.png',
    portrait: { hair: '#9aafb5', accent: '#71c6b9', mark: 'spirit' },
    sourceUrl: 'https://jujutsukaisen.fandom.com/wiki/Mahito',
  },
  {
    id: 'jogo', name: 'Jogo', aliases: ['Jōgo'],
    gender: 'Male', species: 'Curse', grade: 'Special Grade', firstArc: 'Fearsome Womb Arc', ageRange: null,
    affiliation: "Mahito's Group", occupation: 'Non-Curse User', weapon: 'None',
    imageUrl: './characters/jogo.png',
    portrait: { hair: '#5c322d', accent: '#fa7549', mark: 'fire' },
    sourceUrl: 'https://jujutsukaisen.fandom.com/wiki/Jogo',
  },
  {
    id: 'hanami', name: 'Hanami', aliases: [],
    gender: 'Male', species: 'Curse', grade: 'Special Grade', firstArc: 'Kyoto Goodwill Event Arc', ageRange: null,
    affiliation: "Mahito's Group", occupation: 'Non-Curse User', weapon: 'None',
    imageUrl: './characters/hanami.png',
    portrait: { hair: '#557666', accent: '#a8d58b', mark: 'plant' },
    sourceUrl: 'https://jujutsukaisen.fandom.com/wiki/Hanami',
  },
  {
    id: 'choso', name: 'Choso', aliases: ['Chōsō'],
    gender: 'Male', species: 'Hybrid', grade: 'Special Grade', firstArc: 'Death Painting Arc', ageRange: '100+',
    affiliation: 'None', occupation: 'Jujutsu Sorcerer', weapon: 'None',
    imageUrl: './characters/choso.png',
    portrait: { hair: '#26212b', accent: '#db766e' },
    sourceUrl: 'https://jujutsukaisen.fandom.com/wiki/Choso',
  },
  {
    id: 'shoko-ieiri', name: 'Shoko Ieiri', aliases: ['Shoko', 'Ieiri'],
    gender: 'Female', species: 'Human', grade: 'Unknown', firstArc: "Gojo's Past Arc", ageRange: '21-40',
    affiliation: 'Tokyo Jujutsu High', occupation: 'Jujutsu Sorcerer', weapon: 'None',
    imageUrl: './characters/shoko-ieiri.png',
    portrait: { hair: '#312c31', accent: '#a6a6b1' },
    sourceUrl: 'https://jujutsukaisen.fandom.com/wiki/Shoko_Ieiri',
  },
  {
    id: 'mei-mei', name: 'Mei Mei', aliases: ['Mei'],
    gender: 'Female', species: 'Human', grade: 'Grade 1', firstArc: 'Kyoto Goodwill Event Arc', ageRange: '21-40',
    affiliation: 'Tokyo Jujutsu High', occupation: 'Jujutsu Sorcerer', weapon: 'Melee Weapon',
    imageUrl: './characters/mei-mei.png',
    portrait: { hair: '#d7d9df', accent: '#9d8be7' },
    sourceUrl: 'https://jujutsukaisen.fandom.com/wiki/Mei_Mei',
  },
  {
    id: 'sukuna', name: 'Ryomen Sukuna', aliases: ['Sukuna', 'King of Curses', 'Rei das Maldições'],
    gender: 'Male', species: 'Unknown', grade: 'Special Grade', firstArc: 'Fearsome Womb Arc', ageRange: '100+',
    affiliation: 'Culling Game Player', occupation: 'Jujutsu Sorcerer', weapon: 'None',
    imageUrl: './characters/sukuna.png',
    portrait: { hair: '#382128', accent: '#f17961', mark: 'spirit' },
    sourceUrl: 'https://jujutsukaisen.fandom.com/wiki/Sukuna',
  },
];

export const CHARACTERS: Character[] = [...EXISTING_CHARACTERS, ...ADDITIONAL_CHARACTERS];
export { ADDED_CHARACTER_IDS };

export type AttributeKey = 'gender' | 'species' | 'grade' | 'firstArc' | 'ageRange' | 'affiliation' | 'occupation' | 'weapon';
export const ATTRIBUTES: { key: AttributeKey; label: string; short: string }[] = [
  { key: 'gender', label: 'Gender', short: 'Gender' },
  { key: 'species', label: 'Species', short: 'Species' },
  { key: 'grade', label: 'Grade', short: 'Grade' },
  { key: 'firstArc', label: 'First Arc', short: 'First Arc' },
  { key: 'ageRange', label: 'Age Range', short: 'Age' },
  { key: 'affiliation', label: 'Affiliation', short: 'Affiliation' },
  { key: 'occupation', label: 'Occupation', short: 'Occupation' },
  { key: 'weapon', label: 'Weapon', short: 'Weapon' },
];

export const CATEGORY_OPTIONS: Record<AttributeKey, readonly string[]> = {
  gender: GENDERS,
  species: SPECIES,
  grade: GRADES,
  firstArc: FIRST_ARCS,
  ageRange: AGE_RANGES,
  affiliation: AFFILIATIONS,
  occupation: OCCUPATIONS,
  weapon: WEAPONS,
};

export function normalizeText(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('en-US').trim();
}

export function searchCharacters(query: string): Character[] {
  const needle = normalizeText(query);
  if (!needle) return CHARACTERS;
  return CHARACTERS.filter((character) =>
    [character.name, ...character.aliases].some((name) => normalizeText(name).includes(needle)),
  );
}

export type Comparison = 'correct' | 'wrong' | 'higher' | 'lower' | 'unknown';

export function compareAttribute(target: Character, guess: Character, key: AttributeKey): Comparison {
  if (key === 'ageRange') {
    if (target.ageRange === null || guess.ageRange === null) return 'unknown';
    const targetRank = AGE_RANGES.indexOf(target.ageRange);
    const guessRank = AGE_RANGES.indexOf(guess.ageRange);
    if (targetRank === guessRank) return 'correct';
    return targetRank > guessRank ? 'higher' : 'lower';
  }
  if (key === 'grade') {
    const targetRank = GRADES.indexOf(target.grade);
    const guessRank = GRADES.indexOf(guess.grade);
    if (targetRank === guessRank) return 'correct';
    return targetRank > guessRank ? 'higher' : 'lower';
  }
  if (key === 'firstArc') {
    const targetRank = FIRST_ARCS.indexOf(target.firstArc);
    const guessRank = FIRST_ARCS.indexOf(guess.firstArc);
    if (targetRank === guessRank) return 'correct';
    return targetRank > guessRank ? 'higher' : 'lower';
  }
  return target[key] === guess[key] ? 'correct' : 'wrong';
}

export function displayAttribute(character: Character, key: AttributeKey): string {
  if (key === 'ageRange') return character.ageRange ?? UNKNOWN;
  return character[key];
}
