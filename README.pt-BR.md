# DRAGON · OLIVER Open Source

**Inteligência pessoal entre seus dispositivos. Sob seu controle.**

[English](README.md) · [Estado do projeto](docs/STATUS.md) · [Visão](docs/VISION.md) · [Roadmap](docs/ROADMAP.md) · [Contribuir](CONTRIBUTING.md) · [Segurança](SECURITY.md)

O DRAGON é uma iniciativa brasileira que desenvolve a visão de uma plataforma de inteligência pessoal: conversa, memória controlada pelo usuário e automações úteis conectadas entre dispositivos. OLIVER é a interface pessoal dessa experiência. JARVIS é o nome histórico usado no desenvolvimento interno.

Começamos pelo português brasileiro, por hardware acessível e por problemas práticos do dia a dia. A visão de longo prazo inclui celular, computador, dispositivos vestíveis e ambientes que o próprio usuário autorize integrar.

> **Estágio público: documentação e design.** Este repositório reúne a base do projeto, licença MIT, roadmap e orientações de colaboração. Ainda não contém assistente executável, módulos de software reutilizáveis ou versão pública do produto. A prototipação privada é separada e não pode ser reproduzida a partir deste conteúdo.

## Direções de desenvolvimento

| Frente | Valor pretendido |
| --- | --- |
| Conversa natural | Voz e texto úteis em português brasileiro |
| Contexto sob controle | Escolhas explícitas sobre memória, compartilhamento e exclusão |
| IA local acessível | Componentes avaliados pelo hardware, idioma e custo real |
| Continuidade entre dispositivos | Tarefas autorizadas acompanhando o usuário |
| Agentes supervisionados | Permissões restritas, ações revisáveis e registros compreensíveis |
| Componentes públicos reutilizáveis | Entregas pequenas com exemplos, testes e limites claros |

Essas frentes são objetivos. Naturalidade da voz, desenvolvimento autônomo, integração ampla e segurança de produção ainda exigem implementação e validação.

## Segurança construída com evidências

A proposta combina autenticação de dispositivos, proteção de chaves, acessos delimitados, isolamento de ferramentas e auditoria. Criptografia integra essa arquitetura; não existe promessa de invulnerabilidade ou certificação independente.

O fluxo defensivo planejado é detectar sinais suspeitos, conter o impacto, avisar o proprietário e preservar evidências. Relatórios destinados a terceiros dependeriam de revisão humana. Consulte a [política de segurança](SECURITY.md).

## Próximos passos e colaboração

A próxima entrega técnica pública é um primeiro módulo reutilizável, acompanhado de exemplo reproduzível e testes automatizados. Por enquanto, não há pacote para instalar ou serviço para executar neste repositório.

Veja a [visão](docs/VISION.md), o [roadmap com critérios de conclusão](docs/ROADMAP.md), o [estado público](docs/STATUS.md) e o [guia de contribuição](CONTRIBUTING.md).

## Pessoas e licença

Diego Rocha de Oliveira — fundador e líder do projeto. Vinícius Messias — colaborador técnico.

O conteúdo público deste repositório usa a [licença MIT](LICENSE). Código privado do DRAGON/JARVIS, modelos de terceiros e serviços externos não estão incluídos por essa licença. Cada dependência exige avaliação própria de licença, requisitos, cotas e custos.

Projeto independente, sem alegação de vínculo, endosso ou certificação por fornecedores de IA.
