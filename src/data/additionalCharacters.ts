import type {
  AgeRange, Affiliation, Character, FirstArc, Gender, Grade, Occupation, Species, Weapon,
} from './characters';

type NewCharacterRow = [
  name: string,
  gender: Gender,
  species: Species,
  grade: Grade,
  weapon: Weapon,
  ageRange: AgeRange | null,
  affiliation: Affiliation,
  occupation: Occupation,
  firstArc: FirstArc,
  profileSlug: string,
  imageSlug: string,
];

const rows: NewCharacterRow[] = [  ["Akari Nitta", "Female", "Human", "Unknown", "None", "21-40", "Tokyo Jujutsu High", "Jujutsu Sorcerer", "Vs. Mahito Arc", "akari-nitta", "akari-nitta"],
  ["Arata Nitta", "Male", "Human", "Unknown", "None", "1-20", "Kyoto Jujutsu High", "Jujutsu Sorcerer", "Shibuya Incident Arc", "arata-nitta", "arata-nitta"],
  ["Atsuya Kusakabe", "Male", "Human", "Grade 1", "Melee Weapon", "21-40", "Tokyo Jujutsu High", "Jujutsu Sorcerer", "Shibuya Incident Arc", "atsuya-kusakabe", "atsuya-kusakabe"],
  ["Bayer", "Male", "Human", "Unknown", "Knife", "21-40", "Q", "Jujutsu Sorcerer", "Gojo's Past Arc", "bayer", "bayer"],
  ["Charles Bernard", "Male", "Human", "Unknown", "Melee Weapon", "21-40", "Culling Game Player", "Jujutsu Sorcerer", "Culling Game Arc", "charles-bernard", "charles-bernard"],
  ["Chojuro Zenin", "Male", "Human", "Special Grade 1", "None", "81-100", "Zenin Clan", "Jujutsu Sorcerer", "Perfect Preparation Arc", "chojuro-zenin", "chojuro-zenin"],
  ["Cyrus Veil", "Male", "Human", "Unknown", "None", "41-60", "U.S. Official", "Civilian", "Culling Game Arc", "cyrus-veil", "cyrus-veil"],
  ["Dagon", "Male", "Curse", "Special Grade", "None", "100+", "Mahito's Group", "Curse User", "Fearsome Womb Arc", "dagon", "dagon"],
  ["Dhruv Lakdawalla", "Male", "Human", "Unknown", "None", "100+", "Culling Game Player", "Jujutsu Sorcerer", "Culling Game Arc", "dhruv-lakdawalla", "dhruv-lakdawalla"],
  ["Eso", "Male", "Curse", "Special Grade", "Blood", "100+", "Mahito's Group", "Curse User", "Death Painting Arc", "eso", "eso"],
  ["Fumihiko Takaba", "Male", "Human", "Unknown", "None", "21-40", "Culling Game Player", "Civilian", "Perfect Preparation Arc", "fumihiko-takaba", "fumihiko-takaba"],
  ["Furudate", "Male", "Human", "Unknown", "None", "81-100", "Zenin Clan", "Civilian", "Itadori's Extermination Arc", "furudate", "furudate"],
  ["Garry K. Johnson", "Male", "Human", "Unknown", "None", "41-60", "U.S. Official", "Civilian", "Culling Game Arc", "garry-k.-johnson", "garry-k-johnson"],
  ["Haba", "Male", "Human", "Unknown", "None", "21-40", "Culling Game Player", "Civilian", "Culling Game Arc", "haba", "haba"],
  ["Hagane Daido", "Male", "Hybrid", "Unknown", "Melee Weapon", "100+", "Culling Game Player", "Jujutsu Sorcerer", "Culling Game Arc", "hagane-daido", "hagane-daido"],
  ["Hajime Kashimo", "Male", "Hybrid", "Unknown", "Melee Weapon", "100+", "Culling Game Player", "Jujutsu Sorcerer", "Perfect Preparation Arc", "hajime-kashimo", "hajime-kashimo"],
  ["Hana Kurusu", "Female", "Hybrid", "Unknown", "None", "100+", "Culling Game Player", "Jujutsu Sorcerer", "Perfect Preparation Arc", "hana-kurusu", "hana-kurusu"],
  ["Hanyu", "Female", "Human", "Unknown", "None", "21-40", "Culling Game Player", "Civilian", "Culling Game Arc", "hanyu", "hanyu"],
  ["Haruta Shigemo", "Male", "Human", "Unknown", "Melee Weapon", "1-20", "Kenjaku's Group", "Curse User", "Kyoto Goodwill Event Arc", "haruta-shigemo", "haruta-shigemo"],
  ["Hiromi Higuruma", "Male", "Human", "Unknown", "Melee Weapon", "21-40", "Culling Game Player", "Civilian", "Perfect Preparation Arc", "hiromi-higuruma", "hiromi-higuruma"],
  ["Iori Hazenoki", "Male", "Hybrid", "Unknown", "Ranged Weapon", "100+", "Culling Game Player", "Jujutsu Sorcerer", "Culling Game Arc", "iori-hazenoki", "iori-hazenoki"],
  ["Jin Itadori", "Male", "Human", "Unknown", "None", "41-60", "None", "Civilian", "Itadori's Extermination Arc", "jin-itadori", "jin-itadori"],
  ["Jinichi Zenin", "Male", "Human", "Special Grade 1", "None", "41-60", "Zenin Clan", "Jujutsu Sorcerer", "Itadori's Extermination Arc", "jinichi-zenin", "jinichi-zenin"],
  ["Jiro Awasaka", "Male", "Human", "Unknown", "Melee Weapon", "61-80", "Kenjaku's Group", "Curse User", "Shibuya Incident Arc", "jiro-awasaka", "jiro-awasaka"],
  ["Junpei Yoshino", "Male", "Human", "Unknown", "None", "1-20", "None", "Curse User", "Fearsome Womb Arc", "junpei-yoshino", "junpei-yoshino"],
  ["Juzo Kumiya", "Male", "Human", "Unknown", "Melee Weapon", "21-40", "Kenjaku's Group", "Curse User", "Kyoto Goodwill Event Arc", "juzo-kumiya", "juzo-kumiya"],
  ["Kasumi Miwa", "Female", "Human", "Unknown", "Melee Weapon", "1-20", "Kyoto Jujutsu High", "Jujutsu Sorcerer", "Fearsome Womb Arc", "kasumi-miwa", "kasumi-miwa"],
  ["Kechizu", "Male", "Curse", "Special Grade", "Blood", "100+", "Mahito's Group", "Curse User", "Death Painting Arc", "kechizu", "kechizu"],
  ["Kenjaku", "Male", "Human", "Special Grade", "None", "100+", "Kenjaku's Group", "Curse User", "Fearsome Womb Arc", "kenjaku", "kenjaku"],
  ["Kinji Hakari", "Male", "Human", "Unknown", "None", "1-20", "Tokyo Jujutsu High", "Jujutsu Sorcerer", "Perfect Preparation Arc", "kinji-hakari", "kinji-hakari"],
  ["Kirara Hoshi", "Female", "Human", "Unknown", "None", "1-20", "Tokyo Jujutsu High", "Jujutsu Sorcerer", "Perfect Preparation Arc", "kirara-hoshi", "kirara-hoshi"],
  ["Kiyotaka Ijichi", "Male", "Human", "Grade 1", "None", "21-40", "Tokyo Jujutsu High", "Jujutsu Sorcerer", "Cursed Child Arc", "kiyotaka-ijichi", "kiyotaka-ijichi"],
  ["Kokichi Muta", "Male", "Human", "Semi-Grade 1", "Hybrid Weapons", "1-20", "Kyoto Jujutsu High", "Jujutsu Sorcerer", "Kyoto Goodwill Event Arc", "kokichi-muta", "kokichi-muta"],
  ["Kokun", "Male", "Human", "Unknown", "None", "21-40", "Q", "Jujutsu Sorcerer", "Gojo's Past Arc", "kokun", "kokun"],
  ["Larue", "Male", "Human", "Unknown", "None", "21-40", "Geto's Original Group", "Curse User", "Cursed Child Arc", "larue", "larue"],
  ["Mai Zenin", "Female", "Human", "Grade 3", "Ranged Weapon", "1-20", "Kyoto Jujutsu High", "Jujutsu Sorcerer", "Fearsome Womb Arc", "mai-zenin", "mai-zenin"],
  ["Manami Suda", "Female", "Human", "Unknown", "None", "21-40", "Geto's Original Group", "Curse User", "Cursed Child Arc", "manami-suda", "manami-suda"],
  ["Masamichi Yaga", "Male", "Human", "Grade 1", "None", "41-60", "Tokyo Jujutsu High", "Jujutsu Sorcerer", "Fearsome Womb Arc", "masamichi-yaga", "masamichi-yaga"],
  ["Miguel Oduol", "Male", "Human", "Unknown", "Melee Weapon", "21-40", "Geto's Original Group", "Curse User", "Cursed Child Arc", "miguel-oduol", "miguel-oduol"],
  ["Mimiko Hasaba", "Female", "Human", "Unknown", "None", "1-20", "Geto's Original Group", "Curse User", "Cursed Child Arc", "mimiko-hasaba", "mimiko-hasaba"],
  ["Misato Kuroi", "Female", "Human", "Unknown", "None", "1-20", "Renchoku Girls' Junior High", "Civilian", "Gojo's Past Arc", "misato-kuroi", "misato-kuroi"],
  ["Momo Nishimiya", "Female", "Human", "Unknown", "Broom", "1-20", "Kyoto Jujutsu High", "Jujutsu Sorcerer", "Kyoto Goodwill Event Arc", "momo-nishimiya", "momo-nishimiya"],
  ["Nagi Yoshino", "Female", "Human", "Unknown", "None", "41-60", "None", "Civilian", "Vs. Mahito Arc", "nagi-yoshino", "nagi-yoshino"],
  ["Nanako Hasaba", "Female", "Human", "Unknown", "Phone", "1-20", "Geto's Original Group", "Curse User", "Cursed Child Arc", "nanako-hasaba", "nanako-hasaba"],
  ["Naobito Zenin", "Male", "Human", "Special Grade 1", "None", "61-80", "Zenin Clan", "Jujutsu Sorcerer", "Kyoto Goodwill Event Arc", "naobito-zenin", "naobito-zenin"],
  ["Naoya Zenin", "Male", "Human", "Special Grade 1", "None", "21-40", "Zenin Clan", "Jujutsu Sorcerer", "Itadori's Extermination Arc", "naoya-zenin", "naoya-zenin"],
  ["Niji Ebina", "Male", "Human", "Unknown", "Melee Weapon", "21-40", "Kenjaku's Group", "Curse User", "Shibuya Incident Arc", "niji-ebina", "niji-ebina"],
  ["Nobuaki Zenin", "Male", "Human", "Unknown", "None", "21-40", "Zenin Clan", "Jujutsu Sorcerer", "Perfect Preparation Arc", "nobuaki-zenin", "nobuaki-zenin"],
  ["Nobuko Takada", "Female", "Human", "Unknown", "None", "1-20", "None", "Civilian", "Fearsome Womb Arc", "nobuko-takada", "nobuko-takada"],
  ["Noritoshi Kamo", "Male", "Human", "Semi-Grade 1", "Ranged Weapon", "1-20", "Kyoto Jujutsu High", "Jujutsu Sorcerer", "Kyoto Goodwill Event Arc", "noritoshi-kamo", "noritoshi-kamo"],
  ["Noritoshi Kamo (Old)", "Male", "Human", "Unknown", "Blood", "41-60", "Kamo Clan", "Jujutsu Sorcerer", "Death Painting Arc", "noritoshi-kamo-(old)", "noritoshi-kamo-2"],
  ["Ogami", "Female", "Human", "Unknown", "None", "81-100", "Kenjaku's Group", "Curse User", "Shibuya Incident Arc", "ogami", "ogami"],
  ["Ogi Zenin", "Male", "Human", "Special Grade 1", "Melee Weapon", "41-60", "Zenin Clan", "Jujutsu Sorcerer", "Itadori's Extermination Arc", "ogi-zenin", "ogi-zenin"],
  ["Ranta Zenin", "Male", "Human", "Semi-Grade 1", "None", "1-20", "Zenin Clan", "Jujutsu Sorcerer", "Perfect Preparation Arc", "ranta-zenin", "ranta-zenin"],
  ["Reggie Star", "Male", "Hybrid", "Unknown", "None", "100+", "Culling Game Player", "Jujutsu Sorcerer", "Culling Game Arc", "reggie-star", "reggie-star"],
  ["Remi", "Female", "Human", "Unknown", "None", "21-40", "Culling Game Player", "Jujutsu Sorcerer", "Culling Game Arc", "remi", "remi"],
  ["Rika Orimoto", "Female", "Human", "Unknown", "None", "1-20", "None", "Civilian", "Cursed Child Arc", "rika-orimoto", "rika-orimoto"],
  ["Riko Amanai", "Female", "Human", "Unknown", "None", "1-20", "Renchoku Girls' Junior High", "Civilian", "Gojo's Past Arc", "riko-amanai", "riko-amanai"],
  ["Rin Amai", "Male", "Human", "Unknown", "None", "1-20", "Culling Game Player", "Civilian", "Culling Game Arc", "rin-amai", "rin-amai"],
  ["Rokujushi Miyo", "Male", "Hybrid", "Unknown", "None", "100+", "Culling Game Player", "Civilian", "Culling Game Arc", "rokujushi-miyo", "rokujushi-miyo"],
  ["Ryu Ishigori", "Male", "Hybrid", "Unknown", "None", "100+", "Culling Game Player", "Curse User", "Culling Game Arc", "ryu-ishigori", "ryu-ishigori"],
  ["Shigeru Sonoda", "Male", "Human", "Unknown", "None", "61-80", "Time Vessel Association", "Non-Curse User", "Gojo's Past Arc", "shigeru-sonoda", "shigeru-sonoda"],
  ["Shino", "Male", "Human", "Unknown", "Blood", "81-100", "Kamo Clan", "Jujutsu Sorcerer", "Culling Game Arc", "shino", "shino"],
  ["Shiu Kong", "Male", "Human", "Unknown", "None", "41-60", "None", "Non-Curse User", "Gojo's Past Arc", "shiu-kong", "shiu-kong"],
  ["Takako Uro", "Female", "Hybrid", "Unknown", "None", "100+", "Culling Game Player", "Curse User", "Culling Game Arc", "takako-uro", "takako-uro"],
  ["Takuma Ino", "Male", "Human", "Grade 2", "Melee Weapon", "21-40", "Tokyo Jujutsu High", "Jujutsu Sorcerer", "Vs. Mahito Arc", "takuma-ino", "takuma-ino"],
  ["Tengen", "Female", "Hybrid", "Unknown", "None", "100+", "Tokyo Jujutsu High", "Jujutsu Sorcerer", "Perfect Preparation Arc", "tengen", "tengen"],
  ["Toji Fushiguro", "Male", "Human", "Unknown", "Melee Weapon", "21-40", "Zenin Clan", "Non-Curse User", "Gojo's Past Arc", "toji-fushiguro", "toji-fushiguro"],
  ["Toshihisa Negi", "Male", "Human", "Unknown", "None", "21-40", "Geto's Original Group", "Curse User", "Cursed Child Arc", "toshihisa-negi", "toshihisa-negi"],
  ["Tsumiki Fushiguro", "Female", "Human", "Unknown", "None", "1-20", "None", "Civilian", "Fearsome Womb Arc", "tsumiki-fushiguro", "tsumiki-fushiguro"],
  ["Ui Ui", "Male", "Human", "Unknown", "None", "1-20", "None", "Jujutsu Sorcerer", "Shibuya Incident Arc", "ui-ui", "ui-ui"],
  ["Uraume", "Female", "Human", "Unknown", "None", "100+", "Kenjaku's Group", "Curse User", "Kyoto Goodwill Event Arc", "uraume", "uraume"],
  ["Utahime Iori", "Female", "Human", "Semi-Grade 1", "None", "21-40", "Kyoto Jujutsu High", "Jujutsu Sorcerer", "Kyoto Goodwill Event Arc", "utahime-iori", "utahime-iori"],
  ["Wasuke Itadori", "Male", "Human", "Unknown", "None", "81-100", "None", "Civilian", "Fearsome Womb Arc", "wasuke-itadori", "wasuke-itadori"],
  ["Yorozu", "Female", "Hybrid", "Unknown", "None", "100+", "Culling Game Player", "Jujutsu Sorcerer", "Culling Game Arc", "yorozu", "yorozu"],
  ["Yoshinobu Gakuganji", "Male", "Human", "Grade 1", "Guitar", "61-80", "Kyoto Jujutsu High", "Jujutsu Sorcerer", "Fearsome Womb Arc", "yoshinobu-gakuganji", "yoshinobu-gakuganji"],
  ["Yu Haibara", "Male", "Human", "Grade 4", "None", "1-20", "Tokyo Jujutsu High", "Jujutsu Sorcerer", "Gojo's Past Arc", "yu-haibara", "yu-haibara"],
  ["Yuki Tsukumo", "Female", "Human", "Special Grade", "None", "21-40", "Tokyo Jujutsu High", "Jujutsu Sorcerer", "Kyoto Goodwill Event Arc", "yuki-tsukumo", "yuki-tsukumo"],
  ["Yuko Ozawa", "Female", "Human", "Unknown", "None", "1-20", "None", "Civilian", "Death Painting Arc", "yuko-ozawa", "yuko-ozawa"]];

const fallbackPalette = [
  ['#d9c7b8', '#9c83e7'], ['#20232d', '#76b9dc'], ['#bbb2a5', '#ed9c65'],
  ['#312b38', '#b982c8'], ['#d6d0c5', '#67c7ad'], ['#5b4440', '#ed7e82'],
] as const;

function aliasesFor(name: string): string[] {
  const coreName = name.replace(/\s+\([^)]*\)$/, '').trim();
  const words = coreName.split(/\s+/);
  return [...new Set([words[0], words.length > 1 ? words[words.length - 1] : ''])]
    .filter((alias) => alias && alias !== name);
}

export const ADDITIONAL_CHARACTERS: Character[] = rows.map((row, index) => {
  const [name, gender, species, grade, weapon, ageRange, affiliation, occupation, firstArc, profileSlug, imageSlug] = row;
  const id = profileSlug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const [hair, accent] = fallbackPalette[index % fallbackPalette.length];
  const imageSourceUrl = `https://jujutsudle.com/images/characters/jjk/${imageSlug}.webp`;
  return {
    id, name, aliases: aliasesFor(name), gender, species, grade, firstArc, ageRange,
    affiliation, occupation, weapon,
    imageUrl: imageSourceUrl,
    imageSourceUrl,
    portrait: { hair, accent },
    sourceUrl: `https://jujutsudle.com/${profileSlug}-jjk/`,
  };
});

export const ADDED_CHARACTER_IDS = ADDITIONAL_CHARACTERS.map(({ id }) => id);
