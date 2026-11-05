import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import {
  Activity, ArrowDown, ArrowUp, Check, ChevronDown, CircleHelp, History,
  Lightbulb, Moon, RotateCw, Search, Settings2, Share2, Sparkles, Sun, Trophy, X,
} from 'lucide-react';
import {
  ADDED_CHARACTER_IDS, ATTRIBUTES, CHARACTERS, compareAttribute, displayAttribute,
  searchCharacters, type Character, type Comparison,
} from './data/characters';
import { appendMissingIds, canSubmitGuess, findCharacter, recordWin, shuffle, startRound, type GameRound, type GameHistoryRecord } from './lib/game';

const STORAGE_KEY = 'jujutsudle-infinito-v2';
const HINT_LIMIT = 3;
type ModalName = 'stats' | 'history' | 'settings' | null;
type Settings = { highContrast: boolean; reducedMotion: boolean };
type PersistedState = {
  game: GameRound;
  deck: string[];
  previousAnswerId?: string;
  stats: { completed: number; streak: number; bestStreak: number; totalGuesses: number };
  history: GameHistoryRecord[];
  settings: Settings;
};

function makeInitialState(): PersistedState {
  const ids = shuffle(CHARACTERS.map(({ id }) => id));
  const [first, ...deck] = ids;
  return {
    game: { answerId: first, guesses: [], hints: [], won: false, startedAt: new Date().toISOString() },
    deck,
    stats: { completed: 0, streak: 0, bestStreak: 0, totalGuesses: 0 },
    history: [],
    settings: { highContrast: false, reducedMotion: false },
  };
}

function loadState(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return makeInitialState();
    const saved = JSON.parse(raw) as Partial<PersistedState>;
    const knownIds = new Set(CHARACTERS.map(({ id }) => id));
    if (!saved.game || !knownIds.has(saved.game.answerId) || !Array.isArray(saved.game.guesses)) return makeInitialState();
    const savedDeck = Array.isArray(saved.deck)
      ? [...new Set(saved.deck.filter((id) => knownIds.has(id) && id !== saved.game!.answerId))]
      : [];
    return {
      ...makeInitialState(),
      ...saved,
      game: {
        ...saved.game,
        guesses: saved.game.guesses.filter((id) => knownIds.has(id)),
        hints: Array.isArray(saved.game.hints) ? saved.game.hints : [],
      },
      deck: appendMissingIds(savedDeck, saved.game.answerId, ADDED_CHARACTER_IDS),
      stats: { ...makeInitialState().stats, ...saved.stats },
      history: Array.isArray(saved.history) ? saved.history.slice(0, 30) : [],
      settings: { highContrast: false, reducedMotion: false, ...saved.settings },
    };
  } catch {
    return makeInitialState();
  }
}

function comparisonLabel(result: Comparison): string {
  switch (result) {
    case 'correct': return 'Correto';
    case 'higher': return 'O alvo está acima';
    case 'lower': return 'O alvo está abaixo';
    case 'unknown': return 'Informação desconhecida';
    default: return 'Incorreto';
  }
}

function classForResult(result: Comparison): string {
  return `cell-${result}`;
}

function CharacterPortrait({ character }: { character: Character }) {
  if (character.imageUrl) {
    return <img className="portrait-art character-image" src={character.imageUrl} alt={`Imagem de ${character.name}`} loading="lazy" />;
  }
  const { hair, accent, mark } = character.portrait;
  const safeId = character.id.replace(/[^a-z0-9-]/g, '');
  return (
    <svg className="portrait-art" viewBox="0 0 280 300" role="img" aria-label={`Retrato vetorial de ${character.name}`}>
      <defs>
        <linearGradient id={`bg-${safeId}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={accent} stopOpacity=".55" />
          <stop offset="1" stopColor="#141927" />
        </linearGradient>
        <linearGradient id={`coat-${safeId}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={accent} />
          <stop offset="1" stopColor="#262b3b" />
        </linearGradient>
      </defs>
      <rect width="280" height="300" rx="28" fill={`url(#bg-${safeId})`} />
      <circle cx="228" cy="52" r="68" fill="#fff" opacity=".08" />
      <path d="M30 300c9-67 40-97 110-97s101 30 110 97" fill={`url(#coat-${safeId})`} />
      {mark === 'panda' ? (
        <g>
          <ellipse cx="92" cy="84" rx="30" ry="34" fill="#181a20" />
          <ellipse cx="188" cy="84" rx="30" ry="34" fill="#181a20" />
          <ellipse cx="140" cy="133" rx="66" ry="76" fill="#f3f0e8" />
          <ellipse cx="113" cy="126" rx="15" ry="20" fill="#20232b" />
          <ellipse cx="167" cy="126" rx="15" ry="20" fill="#20232b" />
          <ellipse cx="140" cy="162" rx="24" ry="15" fill="#252730" />
        </g>
      ) : mark === 'spirit' || mark === 'fire' || mark === 'plant' ? (
        <g>
          <path d="M75 82c7-40 35-58 68-58 38 0 62 25 66 60l-18 13-10-25-13 32-12-36-18 32-10-31-22 34-10-34-14 29z" fill={hair} />
          <path d="M80 125c0-47 23-77 61-77s60 30 60 77v19c0 45-28 69-60 69s-61-24-61-69z" fill="#e8d5cc" />
          <path d="M91 119q18-12 36 0m25 0q18-12 36 0" fill="none" stroke="#272a34" strokeWidth="6" strokeLinecap="round" />
          <path d="M118 167q22 14 44 0" fill="none" stroke={accent} strokeWidth="6" strokeLinecap="round" />
          <path d="M88 141l-15 4m119-4 15 4" stroke={accent} strokeWidth="5" strokeLinecap="round" />
          {mark === 'fire' && <circle cx="140" cy="34" r="12" fill="#f9b16f" />}
          {mark === 'plant' && <path d="M139 54q-20-35-4-45 22 15 4 45m5 3q21-32 36-20-7 27-36 20" fill="#a5d482" />}
        </g>
      ) : (
        <g>
          <path d="M74 116c-9-58 12-94 66-94 51 0 72 37 66 98l-8 50H84z" fill={hair} />
          <path d="M84 117c0-44 20-72 56-72s56 28 56 72v28c0 41-25 67-56 67s-56-26-56-67z" fill="#eed8c7" />
          <path d="M95 129q17-11 33-1m24 0q17-10 33 1" fill="none" stroke="#232631" strokeWidth="5" strokeLinecap="round" />
          <ellipse cx="112" cy="138" rx="5" ry="7" fill="#252936" />
          <ellipse cx="168" cy="138" rx="5" ry="7" fill="#252936" />
          <path d="M126 173q14 10 28 0" fill="none" stroke="#9a6264" strokeWidth="4" strokeLinecap="round" />
          <path d="M76 111q23-23 34-57 12 32 21 7 12 23 20 0 13 22 34-10 9 24 19 41l-7 18q-18-11-27-36-18 20-35 19-19 0-32-19-11 26-25 35z" fill={hair} />
        </g>
      )}
      <rect x="18" y="250" width="244" height="36" rx="12" fill="#0c1018" opacity=".82" />
      <text x="140" y="274" textAnchor="middle" fill="#f7f8fc" fontSize="16" fontWeight="700" fontFamily="Arial, sans-serif">{character.name}</text>
    </svg>
  );
}

export default function App() {
  const [state, setState] = useState<PersistedState>(loadState);
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modal, setModal] = useState<ModalName>(null);
  const [toast, setToast] = useState('');
  const [shareFallback, setShareFallback] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => searchCharacters(query).filter((character) => !state.game.guesses.includes(character.id)), [query, state.game.guesses]);
  const answer = findCharacter(state.game.answerId);
  const guessedCharacters = state.game.guesses.map(findCharacter);
  const remainingHints = Math.max(0, HINT_LIMIT - state.game.hints.length);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    document.documentElement.dataset.contrast = state.settings.highContrast ? 'high' : 'normal';
    document.documentElement.dataset.motion = state.settings.reducedMotion ? 'reduced' : 'full';
  }, [state]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(''), 2600);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  useEffect(() => {
    if (!modal) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setModal(null); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [modal]);

  function submitGuess(characterId = selectedId) {
    if (!characterId || !canSubmitGuess(state.game, characterId)) {
      if (characterId && state.game.guesses.includes(characterId)) setToast('Esse personagem já foi usado nesta rodada.');
      return;
    }
    if (characterId === state.game.answerId) {
      setState((previous) => {
        if (!canSubmitGuess(previous.game, characterId)) return previous;
        const guesses = [...previous.game.guesses, characterId];
        const updated = recordWin(previous.stats, previous.history, { ...previous.game, guesses, won: true }, answer.name);
        return {
          ...previous,
          game: { ...previous.game, guesses, won: true },
          stats: updated.stats,
          history: updated.history,
        };
      });
      setToast(`Acertou! Era ${answer.name}.`);
    } else {
      setState((previous) => {
        if (!canSubmitGuess(previous.game, characterId)) return previous;
        return { ...previous, game: { ...previous.game, guesses: [...previous.game.guesses, characterId] } };
      });
      setToast('Ainda não. As cores mostram as pistas.');
    }
    setQuery('');
    setSelectedId(null);
    setDropdownOpen(false);
    inputRef.current?.focus();
  }

  function startNextRound() {
    setState((previous) => {
      const next = startRound(previous.deck, previous.game.answerId);
      return { ...previous, game: next.round, deck: next.deck, previousAnswerId: previous.game.answerId };
    });
    setQuery('');
    setSelectedId(null);
    setShareFallback('');
    setToast('Nova rodada pronta.');
    inputRef.current?.focus();
  }

  function revealHint() {
    if (state.game.won || remainingHints <= 0) return;
    const available = ATTRIBUTES.filter(({ key }) =>
      !state.game.hints.includes(key) && (key !== 'ageRange' || answer.ageRange !== null),
    );
    if (!available.length) {
      setToast('Não há mais informações confirmadas para revelar.');
      return;
    }
    const picked = available[Math.floor(Math.random() * available.length)];
    setState((previous) => ({ ...previous, game: { ...previous.game, hints: [...previous.game.hints, picked.key] } }));
    setToast(`Dica: ${picked.label} revelada.`);
  }

  async function shareResult() {
    const cells = guessedCharacters.map((guess) => ATTRIBUTES.map(({ key }) => {
      const outcome = compareAttribute(answer, guess, key);
      if (outcome === 'correct') return '🟩';
      if (outcome === 'higher') return '⬆️';
      if (outcome === 'lower') return '⬇️';
      if (outcome === 'unknown') return '⬜';
      return '🟥';
    }).join('')).join('\n');
    const shareText = `Jujutsudle Infinito ∞\n${guessedCharacters.length} palpites · ${state.game.hints.length} dicas\n\n${cells}`;
    try {
      await navigator.clipboard.writeText(shareText);
      setToast('Resultado copiado para compartilhar.');
      setShareFallback('');
    } catch {
      setShareFallback(shareText);
      setToast('Copie o resultado exibido abaixo.');
    }
  }

  function resetAllData() {
    if (!window.confirm('Apagar estatísticas, histórico e rodada atual deste navegador?')) return;
    const fresh = makeInitialState();
    setState(fresh);
    setModal(null);
    setToast('Dados locais redefinidos.');
  }

  function chooseResult(character: Character) {
    setSelectedId(character.id);
    setQuery(character.name);
    setDropdownOpen(false);
  }

  function onInputKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown' && dropdownOpen) {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, results.length - 1));
    } else if (event.key === 'ArrowUp' && dropdownOpen) {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (dropdownOpen && results[activeIndex]) chooseResult(results[activeIndex]);
      else if (selectedId) submitGuess(selectedId);
      else if (results[0]) chooseResult(results[0]);
    } else if (event.key === 'Escape') {
      setDropdownOpen(false);
    }
  }

  const average = state.stats.completed ? (state.stats.totalGuesses / state.stats.completed).toFixed(1) : '—';

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Jujutsudle Infinito início">
          <span className="brand-mark"><span>呪</span></span>
          <span className="brand-name">JUJUTSUDLE <b>∞</b></span>
        </a>
        <div className="top-actions">
          <button className="icon-button" aria-label="Como jogar" title="Como jogar" onClick={() => setModal('stats')}><CircleHelp size={18} /></button>
          <button className="icon-button" aria-label="Histórico" title="Histórico" onClick={() => setModal('history')}><History size={18} /></button>
          <button className="icon-button" aria-label="Estatísticas" title="Estatísticas" onClick={() => setModal('stats')}><Activity size={18} /></button>
          <button className="icon-button" aria-label="Configurações" title="Configurações" onClick={() => setModal('settings')}><Settings2 size={18} /></button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-kicker"><span className="status-dot" /> DESAFIO DE PERSONAGENS <span className="kicker-divider" /> SEM LIMITE DIÁRIO</div>
        <h1>Quem é o <span>feiticeiro?</span></h1>
        <p className="hero-copy">Adivinhe o personagem de <em>Jujutsu Kaisen</em>. Cada palpite revela novas pistas.</p>
        <div className="game-meta">
          <span><Sparkles size={15} /> Rodada infinita</span>
          <i />
          <span><FlameIcon /> {state.stats.streak} sequência</span>
          <i />
          <span><Trophy size={15} /> {state.stats.completed} acertos</span>
        </div>
      </section>

      <section className="play-card" aria-label="Jogo">
        {!state.game.won ? (
          <>
            <div className="input-heading">
              <div>
                <span className="eyebrow">SUA PRÓXIMA JOGADA</span>
                <h2>Escolha um personagem</h2>
              </div>
              <div className="round-count"><span>{state.game.guesses.length.toString().padStart(2, '0')}</span> palpites</div>
            </div>
            <div className="guess-form">
              <div className={`search-wrap ${dropdownOpen ? 'is-open' : ''}`}>
                <Search size={19} className="search-icon" />
                <input
                  ref={inputRef}
                  aria-label="Pesquisar personagem"
                  aria-autocomplete="list"
                  aria-expanded={dropdownOpen}
                  aria-controls="character-options"
                  placeholder="Digite um nome ou apelido..."
                  value={query}
                  onChange={(event) => { setQuery(event.target.value); setSelectedId(null); setDropdownOpen(true); setActiveIndex(0); }}
                  onFocus={() => query && setDropdownOpen(true)}
                  onKeyDown={onInputKeyDown}
                />
                <ChevronDown size={18} className="search-chevron" />
                {dropdownOpen && query.trim() && (
                  <div className="suggestions" id="character-options" role="listbox" aria-label="Resultados da pesquisa">
                    {results.length ? results.slice(0, 8).map((character, index) => (
                      <button
                        key={character.id}
                        type="button"
                        role="option"
                        aria-selected={index === activeIndex}
                        className={`suggestion ${index === activeIndex ? 'suggestion-active' : ''}`}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => chooseResult(character)}
                      >
                        <span className="suggestion-avatar" style={{ '--avatar-color': character.portrait.accent } as CSSProperties}>
                          {character.imageUrl ? <img src={character.imageUrl} alt="" loading="lazy" /> : character.name.slice(0, 1)}
                        </span>
                        <span>{character.name}<small>{character.affiliation}</small></span>
                        <span className="suggestion-enter">↵</span>
                      </button>
                    )) : <div className="no-results">Nenhum personagem encontrado.</div>}
                  </div>
                )}
              </div>
              <button className="primary-button" disabled={!selectedId} onClick={() => submitGuess()}><span>Enviar palpite</span><span className="button-arrow">↗</span></button>
            </div>
            <div className="form-footnote"><span>↵</span> para selecionar <span className="footnote-separator">·</span> <span>↵</span> novamente para enviar</div>

            <div className="hint-strip">
              <div className="hint-copy"><span className="hint-icon"><Lightbulb size={16} /></span><span><strong>Precisa de uma pista?</strong><small>Revele uma informação do personagem secreto.</small></span></div>
              <button className="secondary-button" onClick={revealHint} disabled={remainingHints <= 0}><Lightbulb size={15} /> Revelar dica <span className="hint-counter">{state.game.hints.length}/{HINT_LIMIT}</span></button>
            </div>
            {state.game.hints.length > 0 && (
              <div className="revealed-hints" aria-live="polite">
                {state.game.hints.map((key) => {
                  const attribute = ATTRIBUTES.find(({ key: attributeKey }) => attributeKey === key)!;
                  return <div className="revealed-hint" key={key}><span>PISTA {String(state.game.hints.indexOf(key) + 1).padStart(2, '0')}</span><b>{attribute.label}</b><strong>{displayAttribute(answer, key)}</strong></div>;
                })}
              </div>
            )}
          </>
        ) : (
          <div className="win-panel">
            <div className="win-art-wrap"><CharacterPortrait character={answer} /><span className="win-seal"><Check size={20} /></span></div>
            <div className="win-copy">
              <div className="win-kicker"><Sparkles size={15} /> CASO ENCERRADO</div>
              <h2>Acertou. Era <span>{answer.name}</span>.</h2>
              <p>Você descobriu o personagem em <strong>{state.game.guesses.length} {state.game.guesses.length === 1 ? 'palpite' : 'palpites'}</strong>{state.game.hints.length ? `, usando ${state.game.hints.length} ${state.game.hints.length === 1 ? 'dica' : 'dicas'}` : ', sem usar dicas'}.</p>
              <div className="win-actions">
                <button className="primary-button" onClick={startNextRound}><RotateCw size={16} /> Próxima rodada</button>
                <button className="secondary-button share-button" onClick={shareResult}><Share2 size={16} /> Compartilhar</button>
              </div>
              {shareFallback && <textarea className="share-fallback" aria-label="Resultado para copiar" readOnly value={shareFallback} onFocus={(event) => event.currentTarget.select()} />}
            </div>
          </div>
        )}
      </section>

      <section className="board-section" aria-label="Tabela de palpites">
        <div className="board-heading">
          <div><span className="eyebrow">QUADRO DE PISTAS</span><h2>{guessedCharacters.length ? 'Suas comparações' : 'A investigação começa aqui'}</h2></div>
          <span className="board-count">{guessedCharacters.length} {guessedCharacters.length === 1 ? 'palpite' : 'palpites'}</span>
        </div>
        {guessedCharacters.length ? (
          <div className="table-scroll">
            <table className="guess-table">
              <thead><tr><th className="character-heading">Personagem</th>{ATTRIBUTES.map(({ key, short }) => <th key={key} className={['ageRange', 'grade', 'firstArc'].includes(key) ? 'sortable-heading' : ''}>{short}{['ageRange', 'grade', 'firstArc'].includes(key) && <span className="sort-mark">↕</span>}</th>)}</tr></thead>
              <tbody>{[...guessedCharacters].reverse().map((guess) => (
                <tr className="guess-row" key={guess.id}>
                  <th scope="row" className="character-cell"><span className="table-avatar" style={{ '--avatar-color': guess.portrait.accent } as CSSProperties}>{guess.imageUrl ? <img src={guess.imageUrl} alt="" loading="lazy" /> : guess.name.slice(0, 1)}</span><span>{guess.name}</span></th>
                  {ATTRIBUTES.map(({ key, label }) => {
                    const outcome = compareAttribute(answer, guess, key);
                    const value = displayAttribute(guess, key);
                    return <td key={key} data-label={label} className={`value-cell ${classForResult(outcome)}`} aria-label={`${label}: ${value}. ${comparisonLabel(outcome)}`}>
                      <span className="cell-content">{value}{outcome === 'higher' && <ArrowUp size={13} aria-label="O alvo tem valor maior" />}{outcome === 'lower' && <ArrowDown size={13} aria-label="O alvo tem valor menor" />}</span>
                    </td>;
                  })}
                </tr>
              ))}</tbody>
            </table>
          </div>
        ) : (
          <div className="empty-board"><span className="empty-emblem">呪</span><p>Seus palpites aparecerão aqui.<br /><strong>Verde</strong> indica correspondência; <strong>amarelo</strong> mostra uma diferença; as setas indicam a faixa etária, o grau e o arco.</p></div>
        )}
        <div className="legend">
          <span><i className="legend-swatch swatch-correct" /> Correto</span>
          <span><i className="legend-swatch swatch-wrong" /> Diferente</span>
          <span><i className="legend-swatch swatch-unknown" /> Sem dado confirmado</span>
          <span><i className="legend-arrow">↑</i> Maior / posterior</span>
        </div>
      </section>

      <footer className="footer"><span>JUJUTSU KAISEN CHARACTER PUZZLE</span><span>Dados salvos somente neste navegador</span><button onClick={() => setModal('settings')}>Configurações</button></footer>

      {modal && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setModal(null); }}>
          <section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="modal-head"><div><span className="eyebrow">JUJUTSUDALE INFINITO</span><h2 id="modal-title">{modal === 'stats' ? 'Estatísticas e regras' : modal === 'history' ? 'Histórico de rodadas' : 'Configurações'}</h2></div><button className="icon-button" aria-label="Fechar" onClick={() => setModal(null)}><X size={19} /></button></div>
            {modal === 'stats' && <>
              <div className="stat-grid"><Stat value={state.stats.completed} label="Rodadas vencidas" /><Stat value={state.stats.streak} label="Sequência atual" /><Stat value={state.stats.bestStreak} label="Melhor sequência" /><Stat value={average} label="Média de palpites" /></div>
              <div className="rules-box"><h3>Como jogar</h3><p>Escolha um personagem. Verde significa que a informação coincide; amarelo indica diferença. Nas colunas de faixa etária, grau e arco, a seta mostra se o personagem secreto está acima ou abaixo.</p><p>“Unknown” na faixa etária significa que a idade não está confirmada; essa célula fica neutra. Você tem até três dicas por rodada e pode continuar jogando sem limite diário.</p></div>
            </>}
            {modal === 'history' && <div className="history-list">{state.history.length ? state.history.map((entry, index) => <div className="history-item" key={`${entry.date}-${index}`}><span className="history-check"><Check size={15} /></span><span className="history-name">{entry.name}<small>{new Date(entry.date).toLocaleDateString('pt-BR')}</small></span><span className="history-score">{entry.guesses} palpites<small>{entry.hints} dicas</small></span></div>) : <div className="modal-empty"><History size={24} /><p>Suas rodadas concluídas serão listadas aqui.</p></div>}</div>}
            {modal === 'settings' && <div className="settings-list">
              <button className="setting-row" onClick={() => setState((previous) => ({ ...previous, settings: { ...previous.settings, highContrast: !previous.settings.highContrast } }))}><span className="setting-icon"><Sun size={17} /></span><span><strong>Alto contraste</strong><small>Aumenta a diferença entre cores e bordas.</small></span><span className={`toggle ${state.settings.highContrast ? 'toggle-on' : ''}`}><i /></span></button>
              <button className="setting-row" onClick={() => setState((previous) => ({ ...previous, settings: { ...previous.settings, reducedMotion: !previous.settings.reducedMotion } }))}><span className="setting-icon"><Moon size={17} /></span><span><strong>Reduzir animações</strong><small>Desativa transições e rolagem animada.</small></span><span className={`toggle ${state.settings.reducedMotion ? 'toggle-on' : ''}`}><i /></span></button>
              <div className="settings-divider" />
              <button className="danger-button" onClick={resetAllData}>Apagar estatísticas e histórico</button>
            </div>}
          </section>
        </div>
      )}
      {toast && <div className="toast" role="status"><Check size={15} /> {toast}</div>}
    </main>
  );
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return <div className="stat-box"><strong>{value}</strong><span>{label}</span></div>;
}

function FlameIcon() {
  return <span className="flame-icon" aria-hidden="true">✦</span>;
}
