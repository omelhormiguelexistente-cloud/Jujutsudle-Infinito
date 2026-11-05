import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { CHARACTERS } from './data/characters';

const css = readFileSync('src/styles.css', 'utf8');

describe('layout responsivo', () => {
  it('adapta a tabela em blocos sem rolagem horizontal', () => {
    expect(css).toContain('@media (max-width: 760px)');
    expect(css).toContain('@media (max-width: 410px)');
    expect(css).toContain('@media (max-width: 1120px)');
    expect(css).toContain('content: attr(data-label)');
    expect(css).toMatch(/\.table-scroll\s*\{[^}]*overflow:\s*visible/s);
    expect(css).toMatch(/\.guess-table\s*\{[^}]*min-width:\s*0/s);
  });

  it('inclui uma fonte de retrato para cada personagem', () => {
    expect(CHARACTERS).toHaveLength(97);
    for (const character of CHARACTERS) {
      expect(character.imageUrl).toBeTruthy();
      if (character.imageSourceUrl) {
        expect(character.imageUrl).toBe(character.imageSourceUrl);
      } else {
        expect(existsSync(`public/${character.imageUrl!.replace(/^\.\//, '')}`)).toBe(true);
      }
    }
  });
});
