# Jujutsudle Infinito

Um jogo de adivinhação de personagens de *Jujutsu Kaisen*, com partidas ilimitadas, oito categorias de comparação, dicas e estatísticas locais.

## Requisitos

- Node.js 20.19+ ou 22.12+
- npm

## Executar localmente

```bash
npm install
npm run dev
```

## Verificar e compilar

```bash
npm test
npm run build
npm run preview
```

## Como jogar

Pesquise um personagem pelo nome ou apelido e envie o palpite. Verde indica correspondência; amarelo indica diferença. As setas mostram se a faixa etária, o grau ou o arco do alvo está acima ou abaixo do palpite. `Unknown` na faixa etária representa um dado ausente e fica neutro.

Há até três dicas por rodada. O alvo é sorteado de uma pilha embaralhada para evitar repetição até todos os personagens do ciclo serem usados. A próxima rodada fica disponível após acertar. Vitórias, sequência, histórico, dicas e preferências são salvos neste navegador.

## Categorias

- **Gender:** Male, Female
- **Species:** Unknown, Human, Curse, Hybrid
- **Grade:** None, Unknown, Grade 4, Semi-Grade 3, Grade 3, Semi-Grade 2, Grade 2, Semi-Grade 1, Grade 1, Special Grade 1, Special Grade
- **First Arc:** Fearsome Womb Arc, Vs. Mahito Arc, Kyoto Goodwill Event Arc, Death Painting Arc, Gojo's Past Arc, Shibuya Incident Arc, Itadori's Extermination Arc, Perfect Preparation Arc, Culling Game Arc, Shinjuku Showdown Arc
- **Age Range:** 1-20, 21-40, 41-60, 61-80, 81-100, 100+
- **Affiliation:** None, Tokyo Jujutsu High, Kyoto Jujutsu High, Zenin Clan, Kamo Clan, Culling Game Player, Renchoku Girls' Junior High, Mahito's Group, Geto's Original Group, Kenjaku's Group, Q, Time Vessel Association, U.S. Official
- **Occupation:** Jujutsu Sorcerer, Curse User, Non-Curse User, Civilian
- **Weapon:** None, Melee Weapon, Ranged Weapon, Hybrid Weapons

## Banco, imagens e fontes

O banco atual contém 18 personagens. Os perfis individuais consultados estão em [DATA_SOURCES.md](DATA_SOURCES.md). Os retratos oficiais do site do anime estão salvos localmente em `public/characters/`, então o jogo não precisa carregar imagens externas para funcionar. Os titulares mantêm os direitos autorais das imagens.

A Wiki Fandom bloqueou a abertura integral dos perfis nesta sessão com HTTP 402. Os trechos indexados não confirmaram todos os campos; quando a faixa etária não está disponível, o jogo mostra `Unknown` como célula neutra. O banco de 200 fichas solicitado no briefing anterior ainda não foi ampliado.


