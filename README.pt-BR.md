# DRAGON · OLIVER Open Source

**Inteligência pessoal entre seus dispositivos. Sob seu controle.**

[English](README.md) · [Apresentação](docs/PROJECT_BRIEF.md) · [Evidências](docs/TECHNICAL_EVIDENCE.md) · [Estado público](docs/STATUS.md) · [Roadmap](docs/ROADMAP.md) · [Contribuir](CONTRIBUTING.md)

O DRAGON é uma iniciativa brasileira que desenvolve a visão de uma camada de inteligência pessoal: conversa, contexto controlado pelo usuário e ações úteis entre dispositivos autorizados. **OLIVER é o assistente pessoal no centro dessa visão.** JARVIS é o nome histórico usado no desenvolvimento interno.

Nosso foco reúne português brasileiro, hardware acessível, controle explícito sobre ações e componentes que outras pessoas consigam reproduzir. A direção de longo prazo é acompanhar o usuário entre celular, computador e outros ambientes autorizados, com limites compreensíveis em cada etapa.

## Comece por algo que já pode verificar

O primeiro componente de software público é o **[OLIVER Turn Controller v0.1.0](packages/turn-controller/README.md)**. É um módulo JavaScript pequeno, sem dependências externas, que decide quando uma transcrição pode ser enviada.

Ele aguarda transcrição final e uma janela de silêncio configurável, rejeita eventos de turnos antigos, evita intenções de envio duplicadas, oferece cancelamento e pausa e exige revisão explícita quando o reconhecimento demora demais. O aplicativo que o integrar precisa executar os pedidos e respeitar o cancelamento.

```sh
git clone https://github.com/1998diegorocha-max/oliver-open-source.git
cd oliver-open-source
node --test
node examples/turn-cli.mjs
node examples/turn-lab/server.mjs
```

Use **Node.js 24.x**. Não é necessário rodar `npm install`, fornecer chave de API, baixar modelo ou contratar serviço. Após o último comando, abra **http://127.0.0.1:4173**. Ctrl+C encerra o servidor local.

**O laboratório simula eventos de transcrição e passagem do tempo.** Não abre microfone, gera respostas, sintetiza voz nem opera dispositivos. O servidor aceita conexões apenas pela interface local; o controlador não acessa rede, armazenamento ou temporizadores.

## O que está publicado

| Entrega | Onde conferir |
| --- | --- |
| Controlador reutilizável | [Código](packages/turn-controller/src/turn-controller.mjs) e [contrato da API](packages/turn-controller/README.md) |
| 35 casos de teste automatizados | [Lógica de turnos](test/turn-controller.test.mjs), [servidor da demonstração](test/demo-server.test.mjs) e comando `node --test` |
| Exemplos reproduzíveis | [Terminal](examples/turn-cli.mjs) e [laboratório interativo](examples/turn-lab/) |
| Execuções registradas e hashes dos fontes | [Evidências técnicas](docs/TECHNICAL_EVIDENCE.md) e [recibo](evidence/turn-controller-v0.1.0/validation.json) |
| Escopo e limites de segurança | [Proposta](docs/proposals/001-turn-controller.md) e [modelo de ameaças](docs/THREAT_MODEL.md) |
| Plataforma entre dispositivos, memória e agentes | [Visão de futuro](docs/VISION.md) e [roadmap](docs/ROADMAP.md) |

O componente público é uma primeira base de engenharia. O aplicativo Android completo, a naturalidade da voz, as integrações com modelos e a operação entre dispositivos ainda não são distribuídos ou validados por este repositório. A prototipação privada é separada. Consulte o [estado público completo](docs/STATUS.md).

## Visão e participação

Queremos assistência prática em português brasileiro, com controle sobre o momento de enviar, o que lembrar, quais dispositivos participam e o que um agente pode fazer. A arquitetura proposta separa sugestões de modelos da autorização de ferramentas e prevê revisão de ações relevantes.

Autenticação, criptografia, revogação e isolamento exigem implementação e avaliação próprias. Veja a [política de segurança](SECURITY.md). A próxima integração é um adaptador explícito de reconhecimento de fala, com testes realistas de tempo e interrupção.

Contribuições úteis incluem falhas reproduzíveis, cenários de conversa em português, acessibilidade e melhorias focadas no módulo. Leia o [guia de contribuição](CONTRIBUTING.md).

Diego Rocha de Oliveira — fundador e líder do projeto. Vinícius Messias — colaborador técnico.

Código e documentação públicos usam a [licença MIT](LICENSE). Modelos de terceiros, código privado e acesso a serviços externos não estão incluídos. Projeto independente, sem alegação de endosso de fornecedores ou certificação de segurança.
