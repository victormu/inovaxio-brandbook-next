# Banners de topo de seção

Cada seção abre com um banner em aberto (imagem OU vídeo, você decide).
Enquanto o arquivo não existe, aparece o placeholder "BANNER OU VÍDEO -- a definir".
Solte um arquivo com o nome-base abaixo e ele aparece automaticamente.

O formato é detectado pela extensão. Ordem de prioridade: vídeo antes de imagem.

| Nome-base | Onde aparece |
|---|---|
| `fundamentos.*` | 01 Fundamentos |
| `verbal.*` | 02 Sistema Verbal |
| `visual.*` | 03 Sistema Visual |
| `aplicacoes.*` | 04 Aplicações |
| `recursos.*` | 05 Recursos |

## Extensões aceitas

- Vídeo (entra como fundo em loop, mudo): `.mp4`, `.webm`
- Imagem: `.avif`, `.webp`, `.jpg`, `.jpeg`, `.png`

Ex.: soltar `visual.mp4` faz o banner de Sistema Visual virar vídeo.
Soltar `visual.jpg` faz virar imagem. Se existirem os dois, o vídeo ganha.

## Dimensões sugeridas

- Proporção larga (o banner tem altura de 280px a 460px, largura total do conteúdo).
- Imagem: no mínimo 1600px de largura. Vídeo: 1920x1080, curto, sem áudio.
- O título fica sobreposto embaixo, com um degradê escuro por cima para leitura.
