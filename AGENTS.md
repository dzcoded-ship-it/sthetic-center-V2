# Sthetic Center — Diretrizes de desenvolvimento e qualidade

## Objetivo
Desenvolver e evoluir **o site inteiro** da Sthetic Center — Estética & Saúde (Águas Claras, Brasília/DF), com estética premium, experiência intuitiva, confiança clínica, alto desempenho e foco em agendamentos. O projeto também é usado para o aprendizado do desenvolvedor: explicar cada mudança e seu propósito.

## Base atual
- Stack: HTML semântico, CSS e JavaScript vanilla, sem introduzir frameworks por padrão.
- Estrutura: `public_html/index.html`, `public_html/style.css`, `public_html/app.js`, `public_html/assets/...`.
- Desenvolvimento local com VS Code/Live Server e versionamento Git/GitHub.
- A identidade visual oficial (logotipo original) **não deve ser recriada nem alterada** sem solicitação explícita.

## Identidade e direção criativa
- Design elegante, sofisticado, editorial e acolhedor — luxo discreto, sem excesso de efeitos ou gradientes.
- Cores existentes: preto `#0D0D0D`, carvão `#1A1815`, dourado `#C8A45D`, dourado-claro `#E3C98B`, off-white `#F7F5F2` e off-white alternativo `#EFEAE1`.
- Tipografia existente: **Cinzel** (títulos), **Montserrat** (texto/interface), **Allura** (detalhes pontuais). Manter consistência e controlar contraste.
- Preferir fotografias reais da clínica/equipe, sem alterar pessoas ou inventar resultados clínicos.
- Espaçamento claro, alinhamento rigoroso, largura de conteúdo consistente, elementos e botões com estados de foco/hover/ativo.
- Priorizar dispositivos móveis: todas as seções e formulários devem funcionar sem rolagem horizontal indesejada.

## Escopo integral
Avaliar e melhorar de forma articulada: cabeçalho/navegação, hero, barra de confiança, história, filosofia, procedimentos, diferenciais, equipe, localização, FAQ, chamada para ação, formulário, rodapé e botão flutuante do WhatsApp.

## Padrão de animação
- Animações devem explicar mudanças de estado e conduzir a atenção; evitar efeitos gratuitos.
- Usar de preferência `transform` e `opacity` para transições fluidas.
- Definir escalas consistentes de duração/easing. A Filosofia possui requisito específico de transição horizontal de até 1,5 s, sem pausa artificial entre cartões ao saltar etapas.
- Preservar leitura, controle por teclado e `prefers-reduced-motion: reduce`.
- Evitar bloquear interações por longos intervalos sem necessidade.

## Qualidade de engenharia
- HTML semântico, labels, `alt`, landmarks, navegação por teclado e padrões ARIA corretos.
- Nunca adicionar links, preços, certificações, resultados de tratamento, depoimentos ou endereços que não foram confirmados.
- Corrigir e testar todas as interações: menus, abas da Filosofia, **abas de Procedimentos**, FAQ e envio ao WhatsApp.
- Para interfaces com abas, manter `aria-selected`, `tabindex` e visibilidade dos painéis sincronizados. Implementar navegação por setas quando seguir o padrão ARIA de tabs.
- Preferir código claro e modular e evitar duplicação, CSS específico desnecessário e estilos inline.
- Centralizar constantes e conteúdo reutilizado quando apropriado. Validar elementos DOM antes de instalar listeners em código reutilizável.
- Preferir assets separados e otimizados em vez de repetir imagens grandes em data URLs no HTML.
- Formulário: validação acessível, proteção contra entradas indevidas, `encodeURIComponent`/`URLSearchParams` para mensagem inteira, feedback apropriado se uma nova aba for bloqueada; não expor dados pessoais a serviços extras sem necessidade.
- Conferir links internos, SEO básico, metadados sociais, peso das imagens, desempenho e referências a arquivos.

## Método de trabalho
1. Diagnosticar o problema e as consequências no site como um todo.
2. Explicar brevemente a proposta, os arquivos afetados e o porquê.
3. Fazer alteração pequena e testável; evitar reescrever seções que já funcionam sem justificativa.
4. Pedir teste/avaliar telas desktop e mobile, sem afirmar que algo foi testado se não foi.
5. Preservar Git e facilitar reversão; documentar as mudanças com precisão.
6. Ensinar conceitos ao desenvolvedor em linguagem clara, um passo por vez, distinguindo fatos, hipóteses e opções de design.

## Critérios de aprovação
- Visual coerente do topo ao rodapé e preservação do logotipo oficial.
- Clareza das informações e CTAs de agendamento.
- Todos os componentes interativos funcionais com mouse, toque e teclado.
- Responsividade em mobile, tablet e desktop.
- Sem erros de console, imagens quebradas, textos provisórios publicados ou falsas alegações.
- Movimento reduzido respeitado e formulário WhatsApp testado.
- Carregamento eficiente, conteúdo acessível e código legível.
