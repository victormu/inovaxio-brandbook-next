# Auditoria de resoluções e visibilidade

**Data:** 2026-09-18
**Alvo:** https://inovaxio-brandbook.vercel.app (produção)
**Método:** Playwright. Contraste calculado a partir das cores computadas, com
composição de alpha até o primeiro fundo opaco e fórmula de luminância WCAG.
Nada estimado: todo número abaixo foi medido.

## Cobertura

| | |
|---|---|
| Rotas | `/`, `/fundamentos`, `/verbal`, `/visual`, `/aplicacoes`, `/recursos`, `/visual/aplicacoes` |
| Larguras | 320, 360, 375, 390, 414, 480, 640, 768, 1024, 1280, 1440, 1920, 2560 |
| Combinações | 63 medidas na varredura principal, mais 32 numa passagem anterior em larguras de celular |

## Resultado

**Build:** limpo. `next build` compila as 10 rotas como estáticas, `tsc --noEmit`
sem erros, `npm test` 8 de 8, ESLint em 2 achados conhecidos.

**Responsividade: nenhum defeito.** Em 63 de 63 combinações:

- `scrollWidth === clientWidth`: zero rolagem horizontal
- zero elementos clipados sem ancestral rolável
- as tabelas que estouram (especificações de cor, formatos de grid, canais)
  estão todas dentro de wrapper com `overflow-x: auto`, que é a exceção
  prevista no critério 1.4.10 para dado tabular

**Visibilidade: três defeitos encontrados, três corrigidos.** Um item fica
aberto por decisão de conteúdo.

---

## Defeitos corrigidos

### 1. O selo de aprovado/reprovado herdava a cor do exemplo que julgava

**Onde:** `/visual`, tópico Acessibilidade, todos os breakpoints.
**Arquivo:** `components/sections/visual/ColorSection.tsx`, `ContrastCard`.

O selo circular com `✓` ou `✕` era montado com `background: statusColor` e
`color: bg`, ou seja, a cor de fundo do par que o card está demonstrando.
O resultado é que a legibilidade do indicador dependia das cores sendo
avaliadas:

| Card | Glifo sobre selo | Medido |
|---|---|---|
| Branco sobre Preto | preto sobre verde `#198044` | **4,21:1** |
| Azul claro sobre Navy | navy sobre verde `#198044` | **3,87:1** |
| Primário sobre Preto | preto sobre vermelho `#AF1D1D` | **3,02:1** |

Mínimo exigido: 4,5:1.

O selo é chrome, não é o objeto da demonstração. Passou a usar branco fixo.
Medido depois: **4,99:1** no verde e **6,96:1** no vermelho.

### 2. Texto secundário reprovava sobre a superfície mais escura do claro

**Onde:** `/recursos`, todos os breakpoints. Rótulos de formato (SVG, PNG, ASE,
CSS, PPTX, PDF, HTML) e o estado "Em breve".
**Arquivo:** `styles/tokens.css`, `--color-text-faint`.

O token valia `#6B6D78`. Ele passa sobre branco e sobre `--color-surface`, mas
não sobre `--color-surface-2`, que é onde esses rótulos vivem:

| Fundo | `#6B6D78` (antes) | `#666A75` (agora) |
|---|---|---|
| `#FFFFFF` branco | 5,14 | **5,41** |
| `#F4F4F7` surface | 4,68 | **4,93** |
| `#ECEDF4` surface-2 | **4,40** ✗ | **4,63** ✓ |

Escurecido para `#666A75`. A margem sobre surface-2 continua apertada (4,63
contra o mínimo de 4,5), então vale registrar: **qualquer novo fundo mais
escuro que `#ECEDF4` no contexto claro derruba esse token de novo.**

### 3. Alvo de toque do link da marca abaixo do mínimo

**Onde:** topbar, todas as rotas, todos os breakpoints.
**Arquivo:** `app/globals.css`, `.topbar__brand`.

O `<a>` é blockificado pelo flex do pai, então não vale a isenção de link em
linha de texto. Media **145 × 21px**, abaixo dos 24 × 24 do critério 2.5.8.
Passou a ter `min-height: 24px` com padding vertical: agora **140 × 25px**, sem
mudança visível no desenho.

---

## Aberto, por decisão de conteúdo

### O contra-exemplo de contraste reprova contraste

**Onde:** `/visual`, tópico Acessibilidade, card "Primário sobre Preto".
**Medido:** `#2E2EFE` sobre `#000000` = **2,94:1**.

Este é o card que existe justamente para mostrar um par que não deve ser usado,
e o número 2,94:1 está impresso ao lado dele com o selo `✕` e o texto "Texto
não acessível". O manual está certo no conteúdo.

Pela letra do critério 1.4.3 não há isenção para "exemplo": texto renderizado é
texto renderizado. Duas saídas, se conformidade limpa importar:

1. renderizar o par como imagem com `alt` descritivo
2. manter como está e registrar a exceção documentada

**Recomendação:** manter. Remover o contra-exemplo enfraquece o manual mais do
que o achado custa, e a informação já chega por três canais além da cor (o
símbolo, o rótulo textual e a razão numérica).

---

## Defeito que esta auditoria NÃO pegou

**Encontrado pelo Victor depois de eu declarar a varredura limpa.** Registrado
aqui porque a falha de método importa mais que o bug.

### Cabeçalho de tópico sobrepondo o conteúdo

**Onde:** todo `Topic` no modo `wide`, em todas as rotas. Visível em
`/visual#grid` ("Grid de colunas") e `/visual#fotografia` ("Faça e não faça").
**Arquivo:** `app/globals.css`, `.topic__head`.

O `.topic__head` é `position: sticky`. No modo de duas colunas ele fica ao lado
do conteúdo e grudar é o comportamento desejado. No modo `wide` ele fica
**acima** do conteúdo, então ao grudar o conteúdo sobe por baixo dele.

Progressão medida, rolando pelo painel Grid:

| Scroll | Sobreposição |
|---|---|
| repouso | 0px |
| +240px | 24px |
| +360px | 116px |
| +720px | 116px |

Corrigido com `.topic--wide .topic__head { position: static; }`.

### Por que a varredura de 63 combinações não pegou

Duas lacunas, ambas minhas:

1. **Sobreposição não estava na lista de checagens.** Eu media overflow,
   conteúdo clipado, contraste e alvo de toque. Elemento por cima de elemento
   nunca foi verificado, então "63 de 63 limpas" não dizia nada sobre isso.

2. **Tudo era medido com a página parada.** Este defeito só existe *durante* o
   scroll, porque depende do `sticky` ter saído da posição de repouso. Mesmo
   que a checagem existisse, medir só no topo da página não teria pego.

A varredura passou a rolar a página inteira em passos de 200px e a comparar o
retângulo do cabeçalho com o do conteúdo em cada passo, em `.topic` e em
`.panel`.

**Lição para a próxima auditoria:** layout com `position: sticky` só pode ser
auditado em movimento. Uma medição estática prova o repouso e mais nada.

---

## Falsos positivos que vale documentar

Dois achados da primeira passagem não eram defeitos, e ambos vieram de limitação
do meu próprio instrumento. Registrados para a próxima auditoria não repetir:

**Contraste da topbar.** A barra é `position: fixed` com fundo transparente, então
subir a árvore do DOM em busca do primeiro ancestral opaco chega no `body`
branco, e não na banda que está visualmente por baixo. Isso produziu falhas
falsas de 3,22:1 em todas as rotas. A medição correta usa
`elementsFromPoint(x, 57)` para achar a seção sob a barra. Depois disso: nenhuma
falha.

**Checkbox de 1×1 em `/verbal`.** É o padrão correto de input visualmente oculto,
com o `<label>` recebendo o clique. O label real mede **62px** de altura, bem
acima do mínimo. Não é achado.

---

## Tabela de referência: contraste de cada token em cada banda

Todo token passa na banda a que pertence. As falhas só aparecem quando um valor
é usado fora do seu contexto, que é exatamente o que o sistema de classes
(`.ctx-dim`, `.ctx-dark`, `.ctx-navy`) impede.

| Token | `#FFFFFF` | `#F4F4F7` | `#000000` | `#080830` |
|---|---|---|---|---|
| text (claro) `#0A0A0C` | 19,78 | 18,02 | 1,06 | 1,02 |
| muted (claro) `#51535C` | 7,66 | 6,98 | 2,74 | 2,52 |
| faint (claro) `#666A75` | 5,41 | 4,93 | 4,08 | 3,75 |
| text (escuro) `#FFFFFF` | 1,00 | 1,10 | 21,00 | 19,31 |
| muted (escuro) `#C2C4CB` | 1,74 | 1,59 | 12,05 | 11,08 |
| faint (escuro) `#8C8F9B` | 3,22 | 2,94 | 6,52 | 5,99 |

Mínimo para texto pequeno: 4,50.

---

## Header adaptativo

Testado separadamente porque foi reescrito nesta rodada. Percorrendo capa navy,
painel branco, painel preto, painel branco e painel cinza, em três alturas de
janela (700, 900 e 1100px): **15 de 15 corretos**.

A troca de cor interpola em 0,6s (`#0A0A0C → #757576 → #C0C0C1 → #E7E7E7 →
#FFFFFF`), e não salta.

Vale registrar o bug que causou isso, porque é o tipo que escapa de teste
headless: o `rootMargin` do observer era `-56px 0px -100% 0px`, que numa janela
de 900px produz uma área de detecção de **altura negativa** (900 − 56 − 900 =
−56px). Não é definido em spec: o Chrome headless tolerava e o navegador real
não, então os testes passavam enquanto o site falhava. Agora a faixa é montada
em pixels e o observer é remontado no `resize`.
