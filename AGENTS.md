# Instruções do projeto

- Mantenha o app em React, TypeScript e Vite; preserve o modo estrito do TypeScript.
- Rode `npm test` e `npm run build` depois de mudanças de lógica ou interface.
- Toda ficha do banco deve ter uma página individual listada em `DATA_SOURCES.md`.
- Use `Desconhecido` quando a fonte não confirmar um atributo; não deduza atributos a partir do nome ou da lista geral.
- Ao acrescentar um personagem, inclua aliases normalizados para busca, ordem do arco, comparação e fonte individual.
- Preserve o fluxo infinito: uma pilha aleatória evita repetir o alvo até o ciclo de personagens se esgotar.
- Mantenha a interface acessível por teclado, com contraste suficiente e layout utilizável em telas estreitas.
- Os dados de jogo, dicas, estatísticas e configurações ficam no `localStorage` do navegador.
