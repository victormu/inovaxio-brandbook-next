import { ChapterCover } from "@/components/manual/ChapterCover";
import { Panel } from "@/components/manual/Panel";
import { Topic } from "@/components/manual/Topic";
import { ChapterNext } from "@/components/manual/ChapterNext";
import { DoDontCard } from "@/components/ui/DoDontCard";

interface DoDontItem {
  variant: "do" | "dont";
  caption: string;
  imageLabel: string;
}

interface Touchpoint {
  id: string;
  title: string;
  note: string;
  items: DoDontItem[];
}

const DIGITAL: Touchpoint[] = [
  {
    id: "redes",
    title: "Redes sociais",
    note: "Avatar quadrado, capas e posts. O símbolo isolado funciona melhor que o logo horizontal em espaços quadrados.",
    items: [
      {
        variant: "do",
        caption: "Símbolo isolado no avatar, sobre fundo preto, com respiro ao redor.",
        imageLabel: "IMG -- Avatar correto",
      },
      {
        variant: "dont",
        caption: "Logo horizontal espremido no avatar quadrado ou sobre foto de baixo contraste.",
        imageLabel: "IMG -- Avatar incorreto",
      },
    ],
  },
  {
    id: "email",
    title: "Assinatura de e-mail",
    note: "A assinatura é um ponto de contato diário. Simples, legível e leve.",
    items: [
      {
        variant: "do",
        caption: "Texto: nome, cargo, contato e o símbolo em tamanho pequeno.",
        imageLabel: "IMG -- Assinatura correta",
      },
      {
        variant: "dont",
        caption: "Imagem pesada, gradiente, frase motivacional ou banner promocional.",
        imageLabel: "IMG -- Assinatura incorreta",
      },
    ],
  },
  {
    id: "apresentacao",
    title: "Apresentações",
    note: "Decks institucionais e comerciais seguem o mesmo respiro do site.",
    items: [
      {
        variant: "do",
        caption: "Fundo preto, um assunto por slide, tipografia da marca, muito respiro.",
        imageLabel: "IMG -- Slide correto",
      },
      {
        variant: "dont",
        caption: "Slide lotado, cores fora da paleta ou template genérico de mercado.",
        imageLabel: "IMG -- Slide incorreto",
      },
    ],
  },
];

const FISICO: Touchpoint[] = [
  {
    id: "papelaria",
    title: "Papelaria",
    note: "Cartão de visita, papel timbrado e envelope. A marca no físico é sóbria e respira.",
    items: [
      {
        variant: "do",
        caption: "Cartão preto, símbolo, um dado de contato por linha, muito respiro.",
        imageLabel: "IMG -- Cartão correto",
      },
      {
        variant: "dont",
        caption: "Cartão colorido, cheio de elementos ou logo ampliado sem área de proteção.",
        imageLabel: "IMG -- Cartão incorreto",
      },
    ],
  },
  {
    id: "documentos",
    title: "Documentos e licitação",
    note: "A capa carrega a marca. O corpo do documento técnico-jurídico segue o padrão legal, não a linguagem de marca.",
    items: [
      {
        variant: "do",
        caption: "Capa sóbria com o logo. No corpo, a terminologia exigida pelo edital.",
        imageLabel: "IMG -- Capa de proposta correta",
      },
      {
        variant: "dont",
        caption: "Forçar a linguagem de marca dentro do documento técnico-jurídico.",
        imageLabel: "IMG -- Documento incorreto",
      },
    ],
  },
  {
    id: "sinalizacao",
    title: "Sinalização e ambiente",
    note: "Fachada, placas e parede de escritório. Contraste e respiro acima de tudo.",
    items: [
      {
        variant: "do",
        caption: "Símbolo com respiro generoso, alto contraste, monocromático quando necessário.",
        imageLabel: "IMG -- Sinalização correta",
      },
      {
        variant: "dont",
        caption: "Logo distorcido pra caber no espaço ou sobre parede de cor conflitante.",
        imageLabel: "IMG -- Sinalização incorreta",
      },
    ],
  },
  {
    id: "brindes",
    title: "Brindes e uniforme",
    note: "Camiseta, caneca, adesivo, crachá, sacola. A cor do objeto define a versão do logo.",
    items: [
      {
        variant: "do",
        caption: "Aplicação monocromática (branco ou preto) conforme a cor do tecido ou objeto.",
        imageLabel: "IMG -- Brinde correto",
      },
      {
        variant: "dont",
        caption: "Forçar o gradiente ou distorcer o logo pra caber na peça.",
        imageLabel: "IMG -- Brinde incorreto",
      },
    ],
  },
];

function TouchpointBlock({ touchpoint }: { touchpoint: Touchpoint }) {
  return (
    <section
      aria-labelledby={`tp-${touchpoint.id}`}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-4)",
      }}
    >
      <div>
        <h3
          id={`tp-${touchpoint.id}`}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "var(--text-lg)",
            color: "var(--color-text)",
            lineHeight: "var(--leading-tight)",
            marginBottom: "var(--space-2)",
          }}
        >
          {touchpoint.title}
        </h3>
        <p
          style={{
            fontSize: "var(--text-sm)",
            color: "var(--color-text-muted)",
            lineHeight: "var(--leading-relaxed)",
            maxWidth: "60ch",
          }}
        >
          {touchpoint.note}
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))",
          gap: "var(--space-4)",
        }}
      >
        {touchpoint.items.map((item) => (
          <DoDontCard
            key={item.imageLabel}
            variant={item.variant}
            caption={item.caption}
            imageLabel={item.imageLabel}
            image={`/assets/aplicacoes/${touchpoint.id}-${item.variant}.jpg`}
          />
        ))}
      </div>
    </section>
  );
}


export default function AplicacoesMarcaPage() {
  return (
    <>
      <ChapterCover
        num="03"
        title="Aplicações da marca"
        lead="A marca não vive só na tela. Ela aparece em cada ponto de contato, on e off. Aqui está o que fazer e o que não fazer em cada peça."
        topics={["Digital", "Impresso e físico"]}
      />

      <Panel
        id="online"
        index="01 / 02"
        title="Digital"
        band="light"
        lead="Os pontos de contato em tela. São os que mais se repetem e os que mais escapam do controle, porque qualquer pessoa publica."
      >
        <Topic
          wide
          title="Antes de usar"
          lead="As regras abaixo são uma proposta inicial. Os mockups reais entram nos espaços marcados: ajuste ou aprove cada peça com o time de design antes de publicar."
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-8)",
            }}
          >
            {DIGITAL.map((tp) => (
              <TouchpointBlock key={tp.id} touchpoint={tp} />
            ))}
          </div>
        </Topic>
      </Panel>

      <Panel
        id="offline"
        index="02 / 02"
        title="Impresso e físico"
        band="dim"
        lead="O que sai da tela. Aqui a cor vira CMYK ou Pantone, e o tamanho mínimo do logo deixa de ser sugestão."
      >
        <Topic wide title="Peças" lead="Cada uma com o que fazer e o que não fazer.">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-8)",
            }}
          >
            {FISICO.map((tp) => (
              <TouchpointBlock key={tp.id} touchpoint={tp} />
            ))}
          </div>
        </Topic>
      </Panel>

      <ChapterNext current="visual" />
    </>
  );
}
