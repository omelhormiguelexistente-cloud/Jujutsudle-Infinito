import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import App from './App';
import { CHARACTERS } from './data/characters';

function savedRound(): { game: { answerId: string } } {
  const stored = localStorage.getItem('jujutsudle-infinito-v2');
  if (!stored) throw new Error('O estado inicial não foi salvo.');
  return JSON.parse(stored) as { game: { answerId: string } };
}

async function pick(user: ReturnType<typeof userEvent.setup>, name: string) {
  const input = screen.getByRole('textbox', { name: 'Pesquisar personagem' });
  await user.clear(input);
  await user.type(input, name);
  const option = await screen.findByRole('option', { name: new RegExp(name, 'i') });
  await user.click(option);
}

describe('partida completa', () => {
  beforeEach(() => localStorage.clear());

  it('revela uma dica real, aceita um palpite e atualiza estatísticas e histórico ao vencer', async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitFor(() => expect(localStorage.getItem('jujutsudle-infinito-v2')).not.toBeNull());
    const answer = CHARACTERS.find(({ id }) => id === savedRound().game.answerId)!;

    await user.click(screen.getByRole('button', { name: /revelar dica/i }));
    expect(await screen.findByText(/PISTA 01/i)).toBeInTheDocument();

    const wrong = CHARACTERS.find(({ id }) => id !== answer.id)!;
    await pick(user, wrong.name);
    await user.click(screen.getByRole('button', { name: /enviar palpite/i }));
    expect(await screen.findByText('Suas comparações')).toBeInTheDocument();
    for (const category of ['Gender', 'Species', 'Grade', 'First Arc', 'Age', 'Affiliation', 'Occupation', 'Weapon']) {
      expect(screen.getByRole('columnheader', { name: new RegExp(`^${category}`, 'i') })).toBeInTheDocument();
    }

    await pick(user, answer.name);
    await user.click(screen.getByRole('button', { name: /enviar palpite/i }));
    expect(await screen.findByRole('heading', { level: 2, name: new RegExp(`Acertou\\. Era ${answer.name}`) })).toBeInTheDocument();
    await waitFor(() => expect(JSON.parse(localStorage.getItem('jujutsudle-infinito-v2')!).stats.completed).toBe(1));

    await user.click(screen.getByRole('button', { name: 'Histórico' }));
    expect(within(screen.getByRole('dialog')).getByText(answer.name)).toBeInTheDocument();
  });

  it('pesquisa sem acentos, mostra resultados e permite continuar sem limite diário após vitória', async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitFor(() => expect(localStorage.getItem('jujutsudle-infinito-v2')).not.toBeNull());
    const answer = CHARACTERS.find(({ id }) => id === savedRound().game.answerId)!;
    await pick(user, 'Choso');
    expect(screen.getByRole('button', { name: /enviar palpite/i })).toBeEnabled();

    await pick(user, answer.name);
    await user.click(screen.getByRole('button', { name: /enviar palpite/i }));
    await user.click(await screen.findByRole('button', { name: /próxima rodada/i }));
    await waitFor(() => expect(JSON.parse(localStorage.getItem('jujutsudle-infinito-v2')!).game.won).toBe(false));
    expect(screen.getByRole('textbox', { name: 'Pesquisar personagem' })).toBeInTheDocument();
  });
});
