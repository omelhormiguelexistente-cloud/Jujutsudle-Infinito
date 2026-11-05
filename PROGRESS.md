# Progresso

## Concluído

- [x] React, TypeScript e Vite configurados.
- [x] Estrutura inicial, CSS responsivo e documentação criados.
- [x] Banco inicial com 18 personagens e fontes individuais registradas.
- [x] Busca sem acentos e por aliases.
- [x] Oito categorias definidas nas opções pedidas; setas para faixa etária, grau e arco.
- [x] Retratos locais do site oficial do anime para os 18 personagens cadastrados.
- [x] Palpites reorganizados para mostrar todas as categorias sem rolagem horizontal, com retratos maiores.
- [x] Alvo aleatório sem repetição até consumir o ciclo de personagens.
- [x] Dicas funcionais, vitória, próxima rodada e compartilhamento.
- [x] Estatísticas, histórico, acessibilidade básica e persistência em localStorage.
- [x] Workflow de publicação no GitHub Pages.
- [x] Testes unitários, de integração e uma verificação automatizada dos breakpoints responsivos executados.
- [x] `npm test`: 12 testes passaram.
- [x] `npm run build`: build de produção concluído.

## Limitações e pendências

- A abertura direta da Wiki retornou HTTP 402. A busca indexada forneceu páginas individuais, mas ainda falta conferir cada campo no conteúdo integral e ampliar o banco para 200 fichas. Campos sem confirmação permanecem como `Unknown` ou neutros quando a categoria não oferece esse valor.
- `npm install` relatou seis avisos de auditoria (3 moderados, 1 alto e 2 críticos). A consulta detalhada à auditoria do npm não pôde ser concluída porque o registro externo não estava acessível no ambiente.
- A pasta de trabalho não continha repositório Git remoto. O workflow de Pages está pronto, mas precisa ser enviado a um repositório para publicar.
- O servidor de desenvolvimento não pôde pré-compilar dependências no ambiente restrito (erro de leitura em `../../..`). O build de produção e os testes funcionaram; a inspeção visual da versão atualizada ainda está pendente.
