# Review — Catálogo de IA

> Revisão feita pela **Dev's Foundation** (Opus / Portátil), 2026-07-03.
> Objetivo: garantir que o repositório está íntegro e pronto a publicar. Sem edições ao seed às cegas — não há `pnpm`/typecheck nesta máquina, por isso limitei-me a verificações **objetivas** e a docs.

## Estado do repositório

- Extraído de `catalogo-ia-codigo-fonte.tar.gz`, `git init`, histórico limpo.
- Acrescentado pela marca: **README.md**, **CONTRIBUTING.md**, **.env.example**, este **REVIEW-OPUS.md**.
- `node_modules/` ignorado.
- **Falta apenas o push para GitHub** — o repo remoto ainda não existe e o `gh` não está instalado aqui. Criar um repo vazio (ex.: `Devs-Foundation/catalogo-ia`) e empurrar.

## Integridade dos dados (`scripts/src/seed-catalog.ts`)

Verificação automática (parsing + contagem):

| Verificação | Resultado |
|---|---|
| Providers | **24** |
| Modelos | **201** |
| `providerSlug` órfãos (apontam para provider inexistente) | **nenhum** ✓ |
| Slugs de modelo duplicados | **nenhum** ✓ |
| Providers sem qualquer modelo | **nenhum** ✓ |

**Distribuição por provider:** openai 22 · anthropic 13 · google-deepmind 13 · openrouter 13 · ollama 12 · meta 10 · alibaba 9 · nous-research 9 · xai 8 · elevenlabs 8 · mistral 7 · perplexity 7 · groq 7 · together-ai 7 · hugging-face 7 · fireworks-ai 7 · microsoft 7 · cohere 6 · deepseek 5 · replicate 5 · stability-ai 5 · runway 5 · assemblyai 5 · midjourney 4.

**Por tipo de preço (`pricingType`):** `open_source` 83 · `paid` 83 · `freemium` 32 · `free` 3 — bom equilíbrio pago/gratuito, que é exatamente o objetivo do catálogo.

## Notas / próximos passos (para quem continuar)

- Correções de docs já feitas: o README dizia "~20 providers e ~30+ models"; corrigido para **24 providers e 200+ models** (os números reais).
- **Não** editei valores do seed sem conseguir correr o typecheck — mudar a *forma* de uma entrada sem `pnpm run typecheck` arrisca partir o build. Quando houver ambiente com `pnpm`, correr `pnpm install && pnpm run typecheck && pnpm run build` antes de qualquer alteração de dados.
- Sugestão de valor futuro (roadmap): sync automático de preços/datas a partir das fontes dos providers, e um Short 9:16 a promover o catálogo.

---

<sub>Part of **Dev's Foundation** · N models. N devices. One brain.</sub>
