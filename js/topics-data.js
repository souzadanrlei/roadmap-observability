/* =============================================
   TOPICS DATA — Roadmap Observability
   Data used by modal.js to show topic details
============================================= */
window.TOPICS = {

  /* ============ FUNDAMENTOS ============ */
  "O que é Observabilidade": {
    icon: "🔭", level: "Iniciante", levelClass: "iniciante",
    description: "Observabilidade é a capacidade de entender o estado interno de um sistema a partir das saídas que ele produz. Na prática, ela combina telemetria (logs, métricas, traces e perfis), contexto de negócio e engenharia de confiabilidade para explicar por que um sistema está se comportando de determinada forma. Monitoramento acompanha sinais conhecidos; observabilidade permite investigar perguntas novas, inclusive em sistemas distribuídos, ambientes cloud-native e arquiteturas com muitos serviços.",
    concepts: [
      "Os três pilares: Logs, Métricas e Traces (o11y trinity)",
      "Perfis contínuos (profiling) para investigar CPU, memória e latência",
      "Diferença entre monitoramento e observabilidade",
      "OpenTelemetry e o modelo vendor-neutral de telemetria",
      "Cardinalidade: impacto no custo e na granularidade",
      "Telemetria: coleta estruturada de dados de sistemas",
      "Context propagation: carregar contexto entre serviços",
      "SLIs, SLOs e error budgets orientando decisões de confiabilidade",
      "Observabilidade ativa vs passiva",
      "Correlação entre telemetria técnica e impacto para o usuário"
    ],
    tools: ["OpenTelemetry", "Prometheus", "Grafana", "Jaeger", "Loki"],
    realCase: "Google, Netflix e Amazon usam observabilidade como base para operar sistemas distribuídos em escala global com SLOs de 99,99%.",
    bestPractices: [
      "Instrumente desde o início, não como afterthought",
      "Comece pelas jornadas críticas do usuário e pelos SLIs mais importantes",
      "Use IDs de correlação em todos os serviços",
      "Prefira logs estruturados (JSON) a texto livre",
      "Defina SLOs antes de construir alertas",
      "Controle cardinalidade, retenção e amostragem para equilibrar valor e custo",
      "Teste consultas, painéis e alertas como parte do ciclo de entrega"
    ],
    antiPatterns: [
      "Monitorar apenas infraestrutura e esquecer a aplicação",
      "Criar alertas sem SLO definido",
      "Logs verbosos sem estrutura ou contexto"
    ],
    prerequisites: ["Conceitos básicos de redes", "HTTP", "Sistemas distribuídos básico"],
    nextSteps: ["Logs", "Métricas", "Traces", "SLI/SLO/SLA", "Golden Signals"],
    links: [
      { label: "OpenTelemetry — documentação oficial", url: "https://opentelemetry.io/docs/" },
      { label: "OpenTelemetry — conceitos de observabilidade", url: "https://opentelemetry.io/docs/concepts/observability-primer/" },
      { label: "Google SRE Book — monitoramento distribuído", url: "https://sre.google/sre-book/monitoring-distributed-systems/" },
      { label: "Google SRE Workbook — SLOs", url: "https://sre.google/workbook/implementing-slos/" },
      { label: "CNCF Cloud Native Observability Whitepaper", url: "https://github.com/cncf/sig-observability/blob/main/whitepaper.md" },
      { label: "Prometheus — documentação oficial", url: "https://prometheus.io/docs/introduction/overview/" },
      { label: "Grafana — fundamentos de observabilidade", url: "https://grafana.com/docs/learning-journeys/" },
      { label: "Jaeger — documentação de tracing", url: "https://www.jaegertracing.io/docs/" },
      { label: "Grafana Loki — documentação de logs", url: "https://grafana.com/docs/loki/latest/" },
      { label: "Elastic Observability — guia de conceitos", url: "https://www.elastic.co/guide/en/observability/current/observability-introduction.html" }
    ]
  },

  "Logs": {
    icon: "📋", level: "Iniciante", levelClass: "iniciante",
    description: "Logs são registros cronológicos de eventos gerados por sistemas. São o instrumento mais básico de observabilidade — essenciais para debugging, auditoria e análise de comportamento.",
    concepts: [
      "Logs estruturados vs não estruturados",
      "Níveis de log: DEBUG, INFO, WARN, ERROR, FATAL",
      "JSON logging: formato padrão para parsing automatizado",
      "Log correlation: usar trace_id e request_id nos logs",
      "Retenção e custo: quanto guardar e por quanto tempo",
      "Log sampling: reduzir volume sem perder visibilidade"
    ],
    tools: ["Loki", "Elasticsearch", "Fluentd", "FluentBit", "Vector", "Logstash"],
    code: `// Exemplo de log estruturado (JSON)
{
  "timestamp": "2026-01-15T10:30:00Z",
  "level": "INFO",
  "service": "checkout-api",
  "trace_id": "abc123def456",
  "span_id": "789xyz",
  "message": "Order processed",
  "order_id": "ORD-9876",
  "user_id": "usr-001",
  "duration_ms": 45
}`,
    bestPractices: [
      "Use sempre JSON estruturado em produção",
      "Inclua trace_id e span_id para correlação com traces",
      "Evite logar dados sensíveis (PII, senhas, tokens)",
      "Use log levels adequadamente — não ponha tudo em INFO",
      "Configure retenção: 7d para debug, 90d+ para auditoria"
    ],
    antiPatterns: [
      "Logs em texto livre sem estrutura",
      "Logar em cada linha de código (log verbosity excessivo)",
      "Não incluir contexto (quem, o quê, quando, onde)"
    ],
    prerequisites: ["O que é Observabilidade"],
    nextSteps: ["Loki", "LogQL", "FluentBit", "Correlação de Logs e Traces"],
    links: [
      { label: "Grafana Loki Docs", url: "https://grafana.com/docs/loki/latest/" },
      { label: "OpenTelemetry — logs", url: "https://opentelemetry.io/docs/concepts/signals/logs/" },
      { label: "Fluent Bit — documentação oficial", url: "https://docs.fluentbit.io/manual/" },
      { label: "Google SRE — monitoramento em sistemas distribuídos", url: "https://sre.google/sre-book/monitoring-distributed-systems/" }
    ]
  },

  "Métricas": {
    icon: "📊", level: "Iniciante", levelClass: "iniciante",
    description: "Métricas são medições numéricas coletadas ao longo do tempo. São eficientes para alertas, dashboards e análise de tendências — ideais para responder 'quantas vezes?' e 'quão rápido?'.",
    concepts: [
      "Tipos de métricas: Counter, Gauge, Histogram, Summary",
      "Labels/dimensions: chaves para filtrar e agregar",
      "Cardinalidade: número de combinações únicas de labels",
      "Scraping vs push: como o Prometheus coleta dados",
      "Time series: dados ordenados temporalmente",
      "Agregações: sum, rate, histogram_quantile"
    ],
    tools: ["Prometheus", "Grafana", "VictoriaMetrics", "Mimir", "Thanos", "OpenTelemetry"],
    code: `# Exemplo de métrica Prometheus
# HELP http_requests_total Total de requisições HTTP
# TYPE http_requests_total counter
http_requests_total{method="GET", status="200", endpoint="/api/v1/orders"} 1547
http_requests_total{method="POST", status="201", endpoint="/api/v1/orders"} 342
http_requests_total{method="GET", status="500", endpoint="/api/v1/orders"} 12`,
    bestPractices: [
      "Mantenha cardinalidade baixa — evite user_id como label",
      "Use Histogram para latências, não Summary",
      "Nomeie métricas seguindo convenções: namespace_subsystem_name_unit",
      "Adicione HELP descritivo em cada métrica",
      "Monitore as métricas do Prometheus em si (meta-monitoramento)"
    ],
    antiPatterns: [
      "Labels de alta cardinalidade (UUID, IP dinâmico, user_id)",
      "Usar Gauge onde Counter é o tipo correto",
      "Não definir unidades (use _seconds, _bytes, _total)"
    ],
    prerequisites: ["O que é Observabilidade"],
    nextSteps: ["Prometheus", "PromQL", "Golden Signals", "Alertas"],
    links: [
      { label: "Prometheus — documentação oficial", url: "https://prometheus.io/docs/introduction/overview/" },
      { label: "Prometheus — tipos de métricas", url: "https://prometheus.io/docs/concepts/metric_types/" },
      { label: "OpenTelemetry — métricas", url: "https://opentelemetry.io/docs/concepts/signals/metrics/" },
      { label: "Prometheus — práticas de instrumentação", url: "https://prometheus.io/docs/practices/instrumentation/" }
    ]
  },

  "Traces": {
    icon: "🔗", level: "Iniciante", levelClass: "iniciante",
    description: "Traces registram o caminho de uma requisição através de múltiplos serviços. Essenciais para debugging de latência em sistemas distribuídos — respondem 'onde está o gargalo?'.",
    concepts: [
      "Span: unidade básica de um trace (operação com início e fim)",
      "Trace: coleção de spans representando uma requisição completa",
      "Context propagation: passar trace_id entre serviços via headers",
      "Parent-child spans: árvore de chamadas",
      "Baggage: metadados propagados junto ao contexto",
      "Sampling: estratégias para reduzir volume de traces"
    ],
    tools: ["Jaeger", "Grafana Tempo", "Zipkin", "OpenTelemetry", "Datadog APM"],
    code: `// W3C Trace Context headers
traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01
tracestate: vendor1=value1

// Onde:
// 00 = versão
// 4bf92f3577b34da6a3ce929d0e0e4736 = trace-id (128 bits)
// 00f067aa0ba902b7 = parent-span-id (64 bits)
// 01 = flags (sampled)`,
    bestPractices: [
      "Use W3C Trace Context (traceparent/tracestate) como padrão",
      "Adicione atributos semânticos nos spans (db.system, http.method)",
      "Configure tail-based sampling para traces de erro",
      "Correlacione traces com logs via trace_id"
    ],
    antiPatterns: [
      "Criar spans para cada linha de código (overhead excessivo)",
      "Não propagar contexto em chamadas assíncronas/mensageria",
      "Fazer 100% sampling em produção sem análise de custo"
    ],
    prerequisites: ["O que é Observabilidade", "Sistemas distribuídos básico"],
    nextSteps: ["Jaeger", "Grafana Tempo", "OpenTelemetry", "Context Propagation"],
    links: [
      { label: "OpenTelemetry Tracing", url: "https://opentelemetry.io/docs/concepts/signals/traces/" },
      { label: "Jaeger Docs", url: "https://www.jaegertracing.io/docs/" },
      { label: "W3C Trace Context", url: "https://www.w3.org/TR/trace-context/" },
      { label: "OpenTelemetry — amostragem", url: "https://opentelemetry.io/docs/concepts/sampling/" }
    ]
  },

  "SLI / SLO / SLA": {
    icon: "🎯", level: "Iniciante", levelClass: "iniciante",
    description: "SLI (Service Level Indicator), SLO (Service Level Objective) e SLA (Service Level Agreement) formam a base da engenharia de confiabilidade. Definem como medir e garantir a qualidade do serviço.",
    concepts: [
      "SLI: métrica que quantifica um aspecto do serviço (ex: latência p99 < 200ms)",
      "SLO: meta interna de confiabilidade (ex: 99.9% das requisições < 500ms)",
      "SLA: contrato formal com penalidades (com clientes/stakeholders)",
      "Error Budget: quanto 'downtime' sobra no período (1 - SLO)",
      "Burn Rate: velocidade que o error budget está sendo consumido",
      "MTTR, MTTD, MTTF: métricas de incidentes"
    ],
    tools: ["Prometheus", "Grafana", "Sloth", "OpenSLO", "Pyrra"],
    code: `# Exemplo de SLO com Sloth (yaml)
apiVersion: sloth.slok.dev/v1
kind: PrometheusServiceLevel
metadata:
  name: checkout-availability
spec:
  service: checkout-api
  slos:
    - name: requests-availability
      objective: 99.9
      sli:
        events:
          errorQuery: sum(rate(http_requests_total{status=~"5.."}[{{.window}}]))
          totalQuery: sum(rate(http_requests_total[{{.window}}]))`,
    bestPractices: [
      "Defina SLOs antes de construir alertas",
      "Use SLOs baseados na experiência do usuário (user-facing)",
      "Alerte no burn rate, não no estado pontual",
      "Revise SLOs trimestralmente com o time de produto"
    ],
    prerequisites: ["Métricas", "Prometheus", "PromQL básico"],
    nextSteps: ["Error Budget Policy", "Alertas baseados em SLO", "Sloth/Pyrra"],
    links: [
      { label: "Google SRE Workbook — SLOs", url: "https://sre.google/workbook/implementing-slos/" },
      { label: "Sloth — SLO Tool", url: "https://sloth.slok.dev/" },
      { label: "OpenSLO — especificação", url: "https://openslo.com/" },
      { label: "Google SRE Book — error budgets", url: "https://sre.google/sre-book/embracing-risk/" }
    ]
  },

  "Golden Signals": {
    icon: "✨", level: "Iniciante", levelClass: "iniciante",
    description: "Os Four Golden Signals são as quatro métricas mais importantes para monitorar qualquer serviço, definidos pelo Google SRE Book: Latency, Traffic, Errors e Saturation.",
    concepts: [
      "Latency: tempo de resposta das requisições (p50, p95, p99)",
      "Traffic: volume de requisições por segundo (RPS/QPS)",
      "Errors: taxa de requisições com falha (4xx/5xx)",
      "Saturation: quão 'cheio' está o sistema (CPU, memória, filas)",
      "RED Method: Rate, Errors, Duration — para microserviços",
      "USE Method: Utilization, Saturation, Errors — para infraestrutura"
    ],
    tools: ["Prometheus", "Grafana", "OpenTelemetry"],
    bestPractices: [
      "Crie um dashboard com os 4 golden signals para cada serviço",
      "Use esses sinais como base para todos os alertas",
      "Combine Golden Signals com SLOs para alertas baseados em SLO"
    ],
    prerequisites: ["Métricas", "Prometheus básico"],
    nextSteps: ["Dashboards", "SLI/SLO/SLA", "Alertas", "RED Method", "USE Method"],
    links: [
      { label: "Google SRE Book — monitoring", url: "https://sre.google/sre-book/monitoring-distributed-systems/" },
      { label: "Grafana — RED method", url: "https://grafana.com/docs/grafana-cloud/monitor-applications/application-observability/instrumentation/" },
      { label: "Brendan Gregg — USE method", url: "https://www.brendangregg.com/usemethod.html" }
    ]
  },

  "Grafana": {
    icon: "📈", level: "Iniciante", levelClass: "iniciante",
    description: "Grafana é a plataforma de visualização e observabilidade mais popular do mundo open source. Centraliza dados de múltiplas fontes e permite criar dashboards, alertas e correlações.",
    concepts: [
      "Data Sources: conectores para Prometheus, Loki, Tempo, etc.",
      "Panels: componentes de visualização (gráficos, tabelas, gauges)",
      "Dashboards: coleção de painéis com variáveis",
      "Variables: filtros dinâmicos em dashboards",
      "Alerting: regras de alerta multi-datasource",
      "Explore: interface ad-hoc para consultas"
    ],
    tools: ["Grafana OSS", "Grafana Cloud", "Grafana Enterprise", "Mimir", "Loki", "Tempo"],
    bestPractices: [
      "Use variáveis de datasource para dashboards multi-ambiente",
      "Salve dashboards como código (JSON/Grafonnet/Terraform)",
      "Crie dashboards baseados nos Golden Signals",
      "Use exemplars para ir de métrica → trace em um clique"
    ],
    antiPatterns: [
      "Criar dashboards ad-hoc sem versionamento",
      "Ter centenas de painéis em um único dashboard",
      "Alertas sem runbook associado"
    ],
    prerequisites: ["Prometheus básico", "Conceitos de métricas"],
    nextSteps: ["PromQL", "Loki", "Grafana Tempo", "Dashboards Avançados", "Alertas"],
    links: [
      { label: "Grafana Docs", url: "https://grafana.com/docs/grafana/latest/" },
      { label: "Grafana — Learning Journeys", url: "https://grafana.com/docs/learning-journeys/" },
      { label: "Grafana Alerting", url: "https://grafana.com/docs/grafana/latest/alerting/" },
      { label: "Grafana — dashboards as code", url: "https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/manage-dashboard-links/" }
    ]
  },

  "Prometheus": {
    icon: "🔥", level: "Iniciante", levelClass: "iniciante",
    description: "Prometheus é o sistema de monitoramento e alertas open source mais adotado em ambientes cloud-native. É o coração da stack LGTM (Loki, Grafana, Tempo, Mimir).",
    concepts: [
      "Pull-based scraping: Prometheus busca métricas nos endpoints /metrics",
      "TSDB: banco de dados de séries temporais nativo",
      "Labels: sistema de dimensionamento de métricas",
      "Alertmanager: roteamento e deduplicação de alertas",
      "Recording Rules: pré-computar queries pesadas",
      "Remote Write: enviar dados para storage externo"
    ],
    tools: ["Prometheus", "Alertmanager", "Pushgateway", "Node Exporter", "Grafana"],
    code: `# prometheus.yml básico
global:
  scrape_interval: 15s
  evaluation_interval: 15s

alerting:
  alertmanagers:
    - static_configs:
        - targets: ['alertmanager:9093']

scrape_configs:
  - job_name: 'my-app'
    static_configs:
      - targets: ['app:8080']`,
    bestPractices: [
      "Use service discovery (Kubernetes SD) em vez de targets estáticos",
      "Configure retention de acordo com o uso (default: 15d)",
      "Use Recording Rules para queries complexas em dashboards",
      "Monitore o Prometheus em si (prometheus_tsdb_* métricas)"
    ],
    prerequisites: ["Métricas", "Docker/Kubernetes básico"],
    nextSteps: ["PromQL", "Alertmanager", "Thanos", "Mimir", "Recording Rules"],
    links: [
      { label: "Prometheus Docs", url: "https://prometheus.io/docs/introduction/overview/" },
      { label: "Prometheus — configuração", url: "https://prometheus.io/docs/prometheus/latest/configuration/configuration/" },
      { label: "Prometheus — alerting rules", url: "https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/" },
      { label: "Prometheus — exporters", url: "https://prometheus.io/docs/instrumenting/exporters/" }
    ]
  },

  "Loki": {
    icon: "🗂️", level: "Iniciante", levelClass: "iniciante",
    description: "Grafana Loki é um sistema de agregação de logs altamente eficiente. Ao contrário do Elasticsearch, só indexa metadados (labels) e comprime os logs, reduzindo drasticamente o custo de storage.",
    concepts: [
      "Labels-only indexing: só indexa labels, não o conteúdo do log",
      "Chunks: compressão e armazenamento eficiente dos logs",
      "LogQL: linguagem de consulta para logs (similar ao PromQL)",
      "Streams: conjunto de logs com o mesmo conjunto de labels",
      "Tail Sampling: sampling baseado no conteúdo do log",
      "Multi-tenancy: isolamento por X-Scope-OrgID"
    ],
    tools: ["Loki", "Grafana", "FluentBit", "Promtail", "Alloy"],
    code: `# LogQL — exemplos
# Filtrar erros do checkout
{app="checkout"} |= "ERROR"

# Extrair campos e agregar
{app="checkout"} | json | status_code >= 500
  | line_format "{{.trace_id}} {{.message}}"

# Métricas a partir de logs
sum(rate({app="checkout"} |= "ERROR" [5m])) by (pod)`,
    bestPractices: [
      "Use labels de baixa cardinalidade (app, env, pod, namespace)",
      "Configure chunk_idle_period para flush adequado",
      "Use Promtail ou FluentBit para coleta de logs no Kubernetes",
      "Ative compressão snappy para reduzir storage"
    ],
    antiPatterns: [
      "Usar campos de alta cardinalidade como labels (user_id, ip)",
      "Não configurar retenção — storage cresce indefinidamente",
      "Logar tudo sem sampling em alta frequência"
    ],
    prerequisites: ["Logs", "Docker/Kubernetes básico"],
    nextSteps: ["LogQL", "FluentBit", "Grafana Correlations", "Loki HA"],
    links: [
      { label: "Grafana Loki Docs", url: "https://grafana.com/docs/loki/latest/" },
      { label: "LogQL — documentação", url: "https://grafana.com/docs/loki/latest/query/" },
      { label: "Loki — arquitetura", url: "https://grafana.com/docs/loki/latest/get-started/architecture/" },
      { label: "Grafana Alloy — coleta de logs", url: "https://grafana.com/docs/alloy/latest/" }
    ]
  },

  "Jaeger": {
    icon: "🕵️", level: "Iniciante", levelClass: "iniciante",
    description: "Jaeger é uma plataforma de distributed tracing open source criada pelo Uber. Permite visualizar o fluxo de requisições entre microserviços e identificar gargalos de latência.",
    concepts: [
      "Trace visualization: grafo de spans em timeline",
      "Comparação de traces: analisa diferenças entre requests",
      "Search: busca por service, operation, tags, duração",
      "Adaptive Sampling: ajusta taxa de amostragem por operação",
      "Backends: Cassandra, Elasticsearch, Badger (local)",
      "Integração com OpenTelemetry via OTLP"
    ],
    tools: ["Jaeger", "OpenTelemetry", "Grafana Tempo (alternativa cloud-native)"],
    bestPractices: [
      "Use Grafana Tempo em ambientes Kubernetes modernos",
      "Configure tail-based sampling para capturar erros",
      "Adicione tags semânticas em spans (http.method, db.type)",
      "Correlacione com logs via trace_id"
    ],
    prerequisites: ["Traces", "Docker básico"],
    nextSteps: ["Grafana Tempo", "OpenTelemetry", "Distributed Tracing avançado"],
    links: [
      { label: "Jaeger Docs", url: "https://www.jaegertracing.io/docs/" },
      { label: "Jaeger — arquitetura", url: "https://www.jaegertracing.io/docs/2.0/architecture/" },
      { label: "OpenTelemetry — instrumentação", url: "https://opentelemetry.io/docs/languages/" }
    ]
  },

  /* ============ INTERMEDIÁRIO ============ */
  "PromQL": {
    icon: "🧮", level: "Pleno", levelClass: "pleno",
    description: "PromQL (Prometheus Query Language) é a linguagem para consultar séries temporais do Prometheus. É funcional e expressiva — permite calcular rates, percentis, predições e muito mais.",
    concepts: [
      "Instant vectors vs Range vectors",
      "Selectors: seleção por labels com matchers (=, !=, =~, !~)",
      "Functions: rate(), irate(), increase(), histogram_quantile()",
      "Aggregation operators: sum, avg, max, min, count, topk",
      "Binary operators: aritmética e lógica entre métricas",
      "Subqueries: range queries sobre range vectors"
    ],
    tools: ["Prometheus", "Grafana", "Thanos", "Mimir"],
    code: `# Taxa de erros 5xx por serviço
sum(rate(http_requests_total{status=~"5.."}[5m])) by (service)
/
sum(rate(http_requests_total[5m])) by (service)

# Latência p99 por endpoint
histogram_quantile(0.99,
  sum(rate(http_request_duration_seconds_bucket[5m])) by (le, endpoint)
)

# Predição de disco em 4h
predict_linear(node_filesystem_avail_bytes[1h], 4*3600) < 0`,
    bestPractices: [
      "Use rate() e não irate() para dashboards (irate para alertas de spike)",
      "Prefira histogram_quantile() a Summary para percentis",
      "Use Recording Rules para queries pesadas em dashboards de alto uso",
      "Evite joins de alta cardinalidade (on(label) ou without(label))"
    ],
    prerequisites: ["Prometheus", "Métricas", "Labels"],
    nextSteps: ["Recording Rules", "Alertas", "Thanos Query", "MetricsQL (VictoriaMetrics)"],
    links: [
      { label: "PromQL — conceitos básicos", url: "https://prometheus.io/docs/prometheus/latest/querying/basics/" },
      { label: "PromQL — funções", url: "https://prometheus.io/docs/prometheus/latest/querying/functions/" },
      { label: "PromQL — operadores", url: "https://prometheus.io/docs/prometheus/latest/querying/operators/" },
      { label: "Prometheus — recording rules", url: "https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/" }
    ]
  },

  "LogQL": {
    icon: "🔍", level: "Pleno", levelClass: "pleno",
    description: "LogQL é a linguagem de consulta do Grafana Loki. Suporta filtros de logs e métricas derivadas de logs — similar ao PromQL mas para dados de texto.",
    concepts: [
      "Log queries: {labels} | filter",
      "Metric queries: rate, count_over_time, bytes_rate",
      "Pipeline stages: json, regexp, pattern, unpack",
      "Label filters: após extração de campos",
      "Line filters: =, !=, |~, !~",
      "Formatação: line_format, label_format"
    ],
    code: `# Contar erros por serviço
sum by (service) (
  count_over_time({namespace="prod"} |= "ERROR" [5m])
)

# Extrair latência de logs estruturados
{app="api"} | json | duration > 1000
  | line_format "{{.trace_id}} {{.duration}}ms {{.path}}"

# Taxa de bytes por app
sum by (app) (bytes_rate({namespace="prod"}[5m]))`,
    prerequisites: ["Loki", "Logs estruturados"],
    nextSteps: ["Loki Ruler", "Derived Fields", "Grafana Correlations"],
    links: [
      { label: "LogQL — documentação oficial", url: "https://grafana.com/docs/loki/latest/query/" },
      { label: "LogQL — consultas de métricas", url: "https://grafana.com/docs/loki/latest/query/metric_queries/" },
      { label: "Grafana — correlação entre sinais", url: "https://grafana.com/docs/grafana/latest/explore/trace-integration/" }
    ]
  },

  "OpenTelemetry": {
    icon: "🌐", level: "Pleno", levelClass: "pleno",
    description: "OpenTelemetry (OTel) é o padrão CNCF para instrumentação de telemetria. Unifica a coleta de traces, métricas e logs em uma única API/SDK, eliminando dependência de vendor.",
    concepts: [
      "API: interface vendor-neutral para instrumentar código",
      "SDK: implementação da API com processamento e export",
      "Collector: agente/gateway para receber, processar e exportar telemetria",
      "OTLP: protocolo de transporte nativo do OTel (gRPC/HTTP)",
      "Semantic Conventions: atributos padronizados (http.method, db.system)",
      "Context Propagation: baggage e trace context entre processos"
    ],
    tools: ["OTel Collector", "Jaeger", "Grafana Tempo", "Prometheus", "Grafana Loki"],
    code: `// Instrumentação manual em Node.js
const { trace, context } = require('@opentelemetry/api');

const tracer = trace.getTracer('my-service', '1.0.0');

async function processOrder(orderId) {
  const span = tracer.startSpan('processOrder');
  span.setAttribute('order.id', orderId);

  try {
    const result = await db.getOrder(orderId);
    span.setStatus({ code: SpanStatusCode.OK });
    return result;
  } catch (err) {
    span.recordException(err);
    span.setStatus({ code: SpanStatusCode.ERROR });
    throw err;
  } finally {
    span.end();
  }
}`,
    bestPractices: [
      "Use auto-instrumentation como base, complemente com manual",
      "Siga Semantic Conventions para atributos de spans",
      "Configure o Collector em pipeline (receive → process → export)",
      "Use OTLP como protocolo padrão de exportação"
    ],
    prerequisites: ["Traces", "Métricas", "Logs", "Docker/K8s básico"],
    nextSteps: ["OTel Collector", "OTel SDK avançado", "Semantic Conventions", "Auto-instrumentation"],
    links: [
      { label: "OpenTelemetry.io", url: "https://opentelemetry.io/docs/" },
      { label: "OTel Semantic Conventions", url: "https://opentelemetry.io/docs/concepts/semantic-conventions/" },
      { label: "OpenTelemetry — getting started", url: "https://opentelemetry.io/docs/getting-started/" },
      { label: "OpenTelemetry — linguagens", url: "https://opentelemetry.io/docs/languages/" },
      { label: "CNCF — projeto OpenTelemetry", url: "https://www.cncf.io/projects/opentelemetry/" }
    ]
  },

  "Kubernetes Observability": {
    icon: "☸️", level: "Pleno", levelClass: "pleno",
    description: "Observabilidade em Kubernetes requer monitorar múltiplas camadas: nós, pods, containers, namespaces e aplicações. O ecossistema kube-prometheus-stack é o ponto de partida.",
    concepts: [
      "kube-state-metrics: estado dos objetos K8s (Deployments, Pods, etc.)",
      "node-exporter: métricas de hardware dos nós",
      "cAdvisor: métricas de containers (CPU, memória, rede)",
      "ServiceMonitor/PodMonitor: como o Prometheus descobre targets no K8s",
      "Kubernetes Events: observabilidade de eventos do cluster",
      "Vertical/Horizontal Pod Autoscaling observability"
    ],
    tools: ["kube-prometheus-stack", "Grafana", "Loki", "OpenTelemetry Operator", "Falco"],
    code: `# Instalar kube-prometheus-stack via Helm
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install kube-prometheus-stack prometheus-community/kube-prometheus-stack \\
  --namespace monitoring --create-namespace \\
  --set grafana.adminPassword=admin123`,
    bestPractices: [
      "Use o Operator de OpenTelemetry para auto-instrumentação de pods",
      "Configure PodDisruptionBudgets para o stack de observabilidade",
      "Monitore o etcd, api-server e scheduler do control plane",
      "Use Network Policies para isolar o namespace de monitoramento"
    ],
    prerequisites: ["Kubernetes básico", "Prometheus", "Helm"],
    nextSteps: ["OTel Operator", "eBPF", "Service Mesh", "kube-state-metrics avançado"],
    links: [
      { label: "kube-prometheus-stack", url: "https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack" },
      { label: "Kubernetes — observabilidade", url: "https://kubernetes.io/docs/concepts/cluster-administration/monitoring/" },
      { label: "kube-state-metrics", url: "https://github.com/kubernetes/kube-state-metrics" },
      { label: "OpenTelemetry Operator", url: "https://opentelemetry.io/docs/kubernetes/operator/" }
    ]
  },

  /* ============ AVANÇADO ============ */
  "OpenTelemetry Collector": {
    icon: "🔄", level: "Sênior", levelClass: "senior",
    description: "O OTel Collector é um componente vendor-agnostic que atua como agente ou gateway. Recebe telemetria, processa (filtra, enriquece, transforma) e exporta para múltiplos backends.",
    concepts: [
      "Receivers: como o Collector recebe dados (OTLP, Jaeger, Prometheus, etc.)",
      "Processors: transformações (filter, batch, attributes, sampling)",
      "Exporters: onde os dados são enviados (Jaeger, Prometheus, Loki, OTLP)",
      "Pipelines: conecta receiver → processor → exporter por sinal",
      "Extensions: funcionalidades extras (health check, pprof, zPages)",
      "Deployment: agente (sidecar/daemonset) vs gateway (centralizado)"
    ],
    code: `# otelcol-config.yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
  prometheus:
    config:
      scrape_configs:
        - job_name: 'app'
          static_configs:
            - targets: ['app:8080']

processors:
  batch:
    send_batch_size: 1000
    timeout: 10s
  filter:
    error_mode: ignore
    traces:
      span:
        - 'attributes["http.url"] == "/health"'
  resource:
    attributes:
      - key: env
        value: production
        action: upsert

exporters:
  otlp:
    endpoint: tempo:4317
  prometheusremotewrite:
    endpoint: http://mimir:9090/api/v1/push
  loki:
    endpoint: http://loki:3100/loki/api/v1/push

service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch, filter]
      exporters: [otlp]
    metrics:
      receivers: [otlp, prometheus]
      processors: [batch, resource]
      exporters: [prometheusremotewrite]`,
    bestPractices: [
      "Use o padrão agente + gateway para alta escala",
      "Configure memoryLimiterProcessor para evitar OOM",
      "Use tail-sampling para capturar traces de erro",
      "Monitore o próprio Collector (collector_process_* métricas)"
    ],
    prerequisites: ["OpenTelemetry", "Docker/K8s intermediário", "OTLP"],
    nextSteps: ["Tail Sampling Processor", "OTel Operator", "OpAMP", "Grafana Alloy"],
    links: [
      { label: "OTel Collector Docs", url: "https://opentelemetry.io/docs/collector/" },
      { label: "Collector — configuração", url: "https://opentelemetry.io/docs/collector/configuration/" },
      { label: "Collector — processors", url: "https://opentelemetry.io/docs/collector/configuration/#processors" },
      { label: "OpenTelemetry Collector Contrib", url: "https://github.com/open-telemetry/opentelemetry-collector-contrib" }
    ]
  },

  "Thanos": {
    icon: "🌌", level: "Sênior", levelClass: "senior",
    description: "Thanos estende o Prometheus para escala global — fornece alta disponibilidade, retenção de longo prazo em object storage (S3, GCS) e queries federadas entre múltiplos clusters.",
    concepts: [
      "Sidecar: lê dados do Prometheus e faz upload para object storage",
      "Store Gateway: serve blocos históricos do object storage",
      "Query: federação de múltiplos sidecars/stores com deduplicação",
      "Compactor: compactação e downsampling de dados históricos",
      "Ruler: avalia recording rules e alertas de forma global",
      "Receive: modo push — aceita remote write (alternativa ao sidecar)"
    ],
    tools: ["Thanos", "Prometheus", "S3/GCS/Azure Blob", "Grafana"],
    bestPractices: [
      "Use object storage de baixo custo (S3 Glacier, GCS Nearline) para dados antigos",
      "Configure downsampling: 5m após 40d, 1h após 1 ano",
      "Use Thanos Ruler para avaliação global de SLOs",
      "Monitore os componentes Thanos separadamente"
    ],
    prerequisites: ["Prometheus intermediário", "PromQL", "Object Storage (S3/GCS)"],
    nextSteps: ["Mimir", "VictoriaMetrics", "Cortex"],
    links: [
      { label: "Thanos Docs", url: "https://thanos.io/tip/thanos/quick-tutorial.md/" },
      { label: "Thanos — arquitetura", url: "https://thanos.io/tip/components/query.md" },
      { label: "Thanos — object storage", url: "https://thanos.io/tip/thanos/storage.md/" }
    ]
  },

  "Mimir": {
    icon: "💫", level: "Sênior", levelClass: "senior",
    description: "Grafana Mimir é o backend de métricas de longa duração da Grafana Labs — solução Prometheus-compatible de alta escala, com sharding automático e multi-tenancy nativo.",
    concepts: [
      "Horizontally scalable: microserviços separados por função",
      "Multi-tenancy: isolamento completo por tenant via X-Scope-OrgID",
      "Ruler: avaliação distribuída de recording rules e alertas",
      "Compactor: compactação e downsampling automáticos",
      "Store Gateway: serving de dados históricos do object storage",
      "Ingester: buffer em memória antes do flush para storage"
    ],
    tools: ["Grafana Mimir", "Prometheus", "S3/GCS", "Grafana"],
    bestPractices: [
      "Use Mimir como drop-in replacement para Cortex",
      "Configure limits por tenant para evitar cardinalidade explosiva",
      "Use a distribuição monolítica para ambientes menores",
      "Monitore ingester WAL e store gateway cache hit rate"
    ],
    prerequisites: ["Prometheus", "PromQL", "Thanos conceitos", "Object Storage"],
    nextSteps: ["Grafana Enterprise", "Multi-tenancy avançado", "Mimir Operator"],
    links: [
      { label: "Mimir Docs", url: "https://grafana.com/docs/mimir/latest/" },
      { label: "Mimir — arquitetura", url: "https://grafana.com/docs/mimir/latest/get-started/architecture/" },
      { label: "Mimir — limites por tenant", url: "https://grafana.com/docs/mimir/latest/configure/configure-metrics/" }
    ]
  },

  "eBPF": {
    icon: "⚡", level: "Especialista", levelClass: "especialista",
    description: "eBPF (extended Berkeley Packet Filter) permite executar programas sandboxed no kernel Linux. Revolucionou a observabilidade — captura dados de rede, sistema de arquivos, chamadas de sistema sem modificar aplicações.",
    concepts: [
      "BPF Programs: código que roda no kernel com verificação de segurança",
      "Maps: estruturas de dados compartilhadas entre kernel e userspace",
      "Tracepoints e Kprobes: pontos de instrumentação no kernel",
      "XDP (eXpress Data Path): processamento de pacotes de rede ultra-rápido",
      "CO-RE (Compile Once, Run Everywhere): portabilidade de programas eBPF",
      "BTF (BPF Type Format): informações de tipo para introspection"
    ],
    tools: ["Cilium", "Pixie", "Beyla", "Falco", "Tetragon", "bpftrace", "BCC"],
    code: `# Monitorar chamadas syscall com bpftrace
bpftrace -e '
tracepoint:syscalls:sys_enter_openat {
  printf("%s %s\\n", comm, str(args->filename));
}
'

# Monitorar latência de rede com Pixie
import px

df = px.DataFrame(table="network.tcp_events")
df = df[df.latency > 100]  # ms
px.display(df)`,
    bestPractices: [
      "Use Cilium para observabilidade de rede em Kubernetes",
      "Use Beyla para instrumentação zero-code de serviços HTTP",
      "Use Pixie para debugging sem reiniciar pods",
      "Monitore overhead do eBPF (geralmente < 1% CPU)"
    ],
    prerequisites: ["Linux intermediário", "Kubernetes", "Redes/networking"],
    nextSteps: ["Cilium", "Pixie", "Beyla", "Kernel observability", "Network policies"],
    links: [
      { label: "eBPF.io", url: "https://ebpf.io/" },
      { label: "Cilium Docs", url: "https://docs.cilium.io/" }
    ]
  },

  "Platform Engineering": {
    icon: "🏗️", level: "Staff", levelClass: "staff",
    description: "Platform Engineering é a disciplina de construir e operar plataformas internas que habilitam times de produto a se mover rápido com observabilidade como first-class citizen.",
    concepts: [
      "Internal Developer Platform (IDP): plataforma self-service para devs",
      "Golden Paths: caminhos pré-aprovados com defaults de observabilidade",
      "Observability as a Service: OTel Collector, dashboards, alertas prontos",
      "Paved roads: infraestrutura de telemetria automática por namespace",
      "Multi-tenancy: isolamento de dados por time/squad",
      "Governance: limites de cardinalidade, retenção e custo por tenant"
    ],
    tools: ["Backstage", "Crossplane", "ArgoCD", "Grafana LGTM Stack", "OTel Operator"],
    bestPractices: [
      "Trate observabilidade como produto interno com SLO",
      "Ofereça templates de dashboards e alertas prontos",
      "Automatize instrumentação via OTel Operator + Admission Webhooks",
      "Crie guias de onboarding para novos serviços"
    ],
    prerequisites: ["Kubernetes avançado", "CI/CD", "OTel Collector", "Grafana enterprise"],
    nextSteps: ["IDP com Backstage", "GitOps para observabilidade", "FinOps de observabilidade"],
    links: [
      { label: "CNCF — Platform Engineering", url: "https://tag-app-delivery.cncf.io/whitepapers/platform-eng/" },
      { label: "Backstage — documentação", url: "https://backstage.io/docs/" },
      { label: "OpenTelemetry Operator", url: "https://opentelemetry.io/docs/kubernetes/operator/" }
    ]
  },

  "FinOps": {
    icon: "💰", level: "Especialista", levelClass: "especialista",
    description: "FinOps de observabilidade é a prática de otimizar custos de telemetria sem perder visibilidade. Em escala, logs e métricas podem custar milhões de dólares por ano.",
    concepts: [
      "Cardinality Management: controle de labels e dimensões de métricas",
      "Adaptive Sampling: reduzir traces sem perder traces de erro",
      "Log Sampling: descartar logs de baixa importância",
      "Tiered Retention: hot/warm/cold storage por idade dos dados",
      "Metric Aggregation: pré-agregar antes do armazenamento",
      "Observability ROI: calcular valor do investimento em observabilidade"
    ],
    tools: ["Grafana Mimir (limits)", "VictoriaMetrics", "Loki Ruler", "OTel Processor"],
    bestPractices: [
      "Defina budgets de cardinalidade por serviço/time",
      "Use tail-based sampling com foco em traces de erro",
      "Implante retenção diferenciada: métricas críticas = 1 ano, debug = 7 dias",
      "Revise semanalmente os top 10 geradores de custo"
    ],
    prerequisites: ["Prometheus avançado", "OTel Collector", "Object Storage"],
    nextSteps: ["Grafana Adaptive Metrics", "Mimir Cardinality API", "Vector transforms"],
    links: [
      { label: "CNCF — FinOps", url: "https://www.cncf.io/finops/" },
      { label: "Grafana — cardinalidade de métricas", url: "https://grafana.com/docs/grafana-cloud/monitor-infrastructure/metrics/cardinality/" },
      { label: "OpenTelemetry — sampling", url: "https://opentelemetry.io/docs/concepts/sampling/" }
    ]
  },

  /* ============ FERRAMENTAS AVANÇADAS ============ */
  "Grafana Tempo": {
    icon: "⏱️", level: "Pleno", levelClass: "pleno",
    description: "Grafana Tempo é o backend de distributed tracing nativo do ecossistema Grafana. Armazena traces em object storage com custo mínimo e integra perfeitamente com Loki e Prometheus.",
    concepts: [
      "TraceQL: linguagem de consulta para traces (similar ao LogQL)",
      "Trace-to-Logs: link direto de span para logs correlatos no Loki",
      "Trace-to-Metrics: link de trace para métricas no Prometheus/Mimir",
      "Exemplars: pontos em métricas que linkam para traces",
      "Service Graph: mapa de dependências gerado a partir de traces",
      "Search: busca por atributos, duração, status"
    ],
    tools: ["Grafana Tempo", "OTel Collector", "Grafana", "Loki", "Prometheus"],
    code: `# TraceQL — buscar traces lentos com erro
{ .service.name = "checkout" && duration > 1s && status = error }

# Todos os traces de um endpoint específico
{ .http.url =~ "/api/v1/orders.*" && span.db.system = "postgresql" }`,
    bestPractices: [
      "Use Exemplars no Prometheus para link métrica → trace",
      "Configure Tempo com S3 para armazenamento barato de longo prazo",
      "Use TraceQL para análises complexas de distributed traces",
      "Integre com Loki para correlação trace ↔ log por trace_id"
    ],
    prerequisites: ["Traces", "Jaeger básico", "Object Storage"],
    nextSteps: ["TraceQL avançado", "Exemplars", "Service Graph", "Tempo Distributed"],
    links: [
      { label: "Grafana Tempo Docs", url: "https://grafana.com/docs/tempo/latest/" },
      { label: "Tempo — TraceQL", url: "https://grafana.com/docs/tempo/latest/traceql/" },
      { label: "Tempo — Trace to logs", url: "https://grafana.com/docs/tempo/latest/configuration/trace-to-logs/" }
    ]
  },

  "Dashboards Avançados": {
    icon: "🖥️", level: "Pleno", levelClass: "pleno",
    description: "Dashboards avançados no Grafana vão além de gráficos simples — incluem variáveis dinâmicas, transformações, annotations, links e correlações entre datasources.",
    concepts: [
      "Variables: $namespace, $cluster, $service para filtros dinâmicos",
      "Transformations: reorganizar dados sem mudar a query",
      "Override: customizar visual por série específica",
      "Annotations: marcar eventos (deploys, incidentes) em gráficos",
      "Links: navegar de dashboard para dashboard contextualmente",
      "Alert Annotations: visualizar histórico de alertas no gráfico"
    ],
    bestPractices: [
      "Use versioning de dashboards (Git + Grafonnet ou Terraform provider)",
      "Crie USE e RED dashboards para todos os serviços",
      "Use datasource variables para multi-cluster/multi-env",
      "Documente cada painel com description e links de runbook"
    ],
    prerequisites: ["Grafana básico", "PromQL", "LogQL"],
    nextSteps: ["Grafana Scenes", "Grafonnet", "Grafana as Code", "RBAC"],
    links: [
      { label: "Grafana — dashboards", url: "https://grafana.com/docs/grafana/latest/dashboards/" },
      { label: "Grafana — variáveis", url: "https://grafana.com/docs/grafana/latest/dashboards/variables/" },
      { label: "Grafana — provisioning", url: "https://grafana.com/docs/grafana/latest/administration/provisioning/" }
    ]
  },

  "Alertas Inteligentes": {
    icon: "🔔", level: "Pleno", levelClass: "pleno",
    description: "Alertas inteligentes usam SLO burn rates, anomaly detection e noise reduction para minimizar alertas não-acionáveis e focar no que realmente importa.",
    concepts: [
      "Alertmanager: roteamento, grouping, inibition e silencing",
      "SLO-based Alerting: alertar no burn rate do error budget",
      "Multi-window, multi-burn-rate: alertas de fast/slow burn",
      "Noise reduction: grouping de alertas relacionados",
      "Dead man's switch: alerta se o sistema de alertas parar",
      "Runbooks: documentação vinculada a cada alerta"
    ],
    code: `# Alerta de SLO Burn Rate (fast burn)
- alert: HighErrorBudgetBurnRate
  expr: |
    (
      slo:sli_error:ratio_rate1h{job="checkout"} > (14.4 * 0.001)
      and
      slo:sli_error:ratio_rate5m{job="checkout"} > (14.4 * 0.001)
    )
  labels:
    severity: critical
  annotations:
    summary: "High error budget burn rate — checkout"
    runbook: "https://wiki.internal/runbooks/checkout-slo"`,
    bestPractices: [
      "Cada alerta deve ter runbook com passos de mitigação",
      "Use multi-window burn rate (1h+5m para fast, 6h+30m para slow)",
      "Configure grouping por cluster+service para deduplicar alertas",
      "Revise alertas mensalmente — remova os que nunca são acionáveis"
    ],
    prerequisites: ["Prometheus", "PromQL", "SLI/SLO/SLA", "Alertmanager"],
    nextSteps: ["SLO Tooling", "Grafana OnCall", "PagerDuty integration", "Alert fatigue"],
    links: [
      { label: "Prometheus Alertmanager", url: "https://prometheus.io/docs/alerting/latest/alertmanager/" },
      { label: "Google SRE — alertas baseados em SLO", url: "https://sre.google/workbook/alerting-on-slos/" },
      { label: "Grafana Alerting", url: "https://grafana.com/docs/grafana/latest/alerting/" }
    ]
  },

  "CI/CD + O11y": {
    icon: "🚀", level: "Sênior", levelClass: "senior",
    description: "Observabilidade integrada ao pipeline de CI/CD permite detectar regressões de performance em PRs, validar SLOs antes de deployar e monitorar a saúde dos deploys em tempo real.",
    concepts: [
      "Deploy markers: annotations no Grafana para visualizar deploys",
      "Canary deployment observability: comparar baseline vs canary",
      "Test observability: traces e métricas em testes de integração",
      "Progressive delivery: Flagger + Prometheus para rollout automatizado",
      "Deployment validation: Argo Rollouts com análise de métricas",
      "SLO gates: bloquear deploy se SLO estiver em risco"
    ],
    tools: ["ArgoCD", "Flux", "Flagger", "Argo Rollouts", "Grafana", "Prometheus"],
    bestPractices: [
      "Configure Flagger ou Argo Rollouts para rollback automático por SLO",
      "Use synthetic tests pós-deploy para validar funcionalidades",
      "Adicione annotations de deploy automaticamente via webhook",
      "Monitore change failure rate como DORA metric"
    ],
    prerequisites: ["CI/CD intermediário", "Kubernetes", "Prometheus", "SLI/SLO"],
    nextSteps: ["Flagger", "Argo Rollouts", "DORA Metrics", "Chaos Engineering"],
    links: [
      { label: "Argo Rollouts", url: "https://argo-rollouts.readthedocs.io/en/stable/" },
      { label: "Flagger — progressive delivery", url: "https://flagger.app/" },
      { label: "DORA — métricas de entrega", url: "https://dora.dev/guides/dora-metrics-four-keys/" }
    ]
  },

  "SRE": {
    icon: "🛡️", level: "Sênior", levelClass: "senior",
    description: "Site Reliability Engineering aplica princípios de software engineering à operação de sistemas. Observabilidade é o fundamento do SRE — sem visibilidade, não há confiabilidade.",
    concepts: [
      "Error Budget Policy: o que fazer quando o budget acaba",
      "Toil: trabalho manual repetitivo que deve ser automatizado",
      "Runbooks: procedimentos documentados para incidentes",
      "Postmortems: análise blameless de incidentes",
      "Incident Management: detecção, resposta, resolução e revisão",
      "Capacity Planning: prever crescimento e necessidades futuras"
    ],
    bestPractices: [
      "Conduza postmortems blameless com timeline detalhada",
      "Automatize toil — meça horas gastas por sprint",
      "Defina Error Budget Policy antes de precisar aplicá-la",
      "Treine o time em chaos engineering para preparar para falhas"
    ],
    prerequisites: ["SLI/SLO/SLA", "Alertas", "Kubernetes", "Incidentes básicos"],
    nextSteps: ["Chaos Engineering", "Incident Management", "On-call practices", "Capacity Planning"],
    links: [
      { label: "Google SRE Book", url: "https://sre.google/sre-book/table-of-contents/" },
      { label: "SRE Workbook", url: "https://sre.google/workbook/table-of-contents/" }
    ]
  },

  "Linux Fundamentos": {
    icon: "🐧", level: "Iniciante", levelClass: "iniciante",
    description: "Fundamentos de Linux para operar servidores, containers e agentes de observabilidade com segurança.",
    links: [
      { label: "Linux Journey", url: "https://linuxjourney.com/" },
      { label: "Ubuntu Server — documentação", url: "https://ubuntu.com/server/docs" },
      { label: "Red Hat — fundamentos do Linux", url: "https://www.redhat.com/en/topics/linux" }
    ]
  },

  "Redes & TCP/IP": {
    icon: "🌐", level: "Iniciante", levelClass: "iniciante",
    description: "Base de redes necessária para entender conectividade, latência, portas, roteamento e falhas entre serviços.",
    links: [
      { label: "Cloudflare — o que é TCP/IP", url: "https://www.cloudflare.com/learning/network-layer/what-is-tcp-ip/" },
      { label: "Cloudflare — modelo OSI", url: "https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/" },
      { label: "Kubernetes — modelo de rede", url: "https://kubernetes.io/docs/concepts/cluster-administration/networking/" }
    ]
  },

  "DNS & HTTP": {
    icon: "🔗", level: "Iniciante", levelClass: "iniciante",
    description: "DNS e HTTP explicam como clientes encontram serviços e como requisições circulam entre aplicações.",
    links: [
      { label: "MDN — visão geral do HTTP", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview" },
      { label: "Cloudflare — DNS explicado", url: "https://www.cloudflare.com/learning/dns/what-is-dns/" },
      { label: "RFC 9110 — HTTP Semantics", url: "https://www.rfc-editor.org/rfc/rfc9110" }
    ]
  },

  "Containers & Docker": {
    icon: "🐳", level: "Iniciante", levelClass: "iniciante",
    description: "Containers empacotam aplicações e dependências de forma reproduzível, sendo uma base importante para workloads cloud-native.",
    links: [
      { label: "Docker — documentação", url: "https://docs.docker.com/get-started/" },
      { label: "Docker — boas práticas de imagens", url: "https://docs.docker.com/build/building/best-practices/" },
      { label: "OCI — especificação de runtime", url: "https://opencontainers.org/" }
    ]
  },

  "Kubernetes Básico": {
    icon: "☸️", level: "Iniciante", levelClass: "iniciante",
    description: "Kubernetes orquestra containers e fornece recursos para descoberta, escalabilidade, configuração e operação de serviços.",
    links: [
      { label: "Kubernetes — conceitos", url: "https://kubernetes.io/docs/concepts/" },
      { label: "Kubernetes — tutorial interativo", url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/" },
      { label: "CNCF — Kubernetes", url: "https://www.cncf.io/projects/kubernetes/" }
    ]
  },

  "YAML & Configuração": {
    icon: "🧾", level: "Iniciante", levelClass: "iniciante",
    description: "YAML é usado para declarar configurações de aplicações, pipelines, Helm e recursos Kubernetes.",
    links: [
      { label: "YAML — especificação", url: "https://yaml.org/spec/1.2.2/" },
      { label: "Kubernetes — objetos e YAML", url: "https://kubernetes.io/docs/concepts/overview/working-with-objects/" },
      { label: "Helm — valores e templates", url: "https://helm.sh/docs/chart_template_guide/values_files/" }
    ]
  },

  "Git & GitOps": {
    icon: "🌿", level: "Iniciante", levelClass: "iniciante",
    description: "Git versiona código e configuração; GitOps usa o repositório como fonte declarativa para operar ambientes.",
    links: [
      { label: "Pro Git — livro gratuito", url: "https://git-scm.com/book/en/v2" },
      { label: "OpenGitOps — princípios", url: "https://opengitops.dev/" },
      { label: "CNCF — GitOps", url: "https://www.cncf.io/projects/gitops/" }
    ]
  },

  "Cloud (AWS/GCP/Azure) Básico": {
    icon: "☁️", level: "Iniciante", levelClass: "iniciante",
    description: "Conheça computação, redes, identidade, armazenamento e serviços gerenciados nas principais nuvens.",
    links: [
      { label: "AWS — fundamentos", url: "https://aws.amazon.com/getting-started/" },
      { label: "Google Cloud — training", url: "https://cloud.google.com/learn/training" },
      { label: "Microsoft Learn — Azure", url: "https://learn.microsoft.com/en-us/training/azure/" }
    ]
  },

  "FluentBit": {
    icon: "📥", level: "Júnior", levelClass: "junior",
    description: "Fluent Bit coleta, processa e encaminha logs e métricas com baixo consumo de recursos.",
    links: [
      { label: "Fluent Bit — documentação", url: "https://docs.fluentbit.io/manual/" },
      { label: "Fluent Bit — pipeline de logs", url: "https://docs.fluentbit.io/manual/concepts/key-concepts" },
      { label: "Fluent Bit — Kubernetes", url: "https://docs.fluentbit.io/manual/installation/kubernetes" }
    ]
  },

  "Alertmanager": {
    icon: "🔔", level: "Júnior", levelClass: "junior",
    description: "Alertmanager agrupa, silencia, deduplica e roteia alertas do Prometheus para os canais responsáveis.",
    links: [
      { label: "Alertmanager — documentação", url: "https://prometheus.io/docs/alerting/latest/alertmanager/" },
      { label: "Alertmanager — configuração", url: "https://prometheus.io/docs/alerting/latest/configuration/" },
      { label: "Prometheus — regras de alerta", url: "https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/" }
    ]
  },

  "kube-prometheus-stack": {
    icon: "📦", level: "Júnior", levelClass: "junior",
    description: "Chart Helm que reúne Prometheus, Alertmanager, Grafana e exporters para iniciar a observabilidade de um cluster.",
    links: [
      { label: "kube-prometheus-stack — chart", url: "https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack" },
      { label: "Prometheus Operator — documentação", url: "https://prometheus-operator.dev/docs/" },
      { label: "Prometheus Operator — API", url: "https://prometheus-operator.dev/docs/api-reference/api/" }
    ]
  },

  "Helm Charts": {
    icon: "⎈", level: "Júnior", levelClass: "junior",
    description: "Helm empacota recursos Kubernetes em charts versionáveis e parametrizáveis.",
    links: [
      { label: "Helm — documentação", url: "https://helm.sh/docs/" },
      { label: "Helm — criação de charts", url: "https://helm.sh/docs/topics/charts/" },
      { label: "Artifact Hub — charts", url: "https://artifacthub.io/" }
    ]
  },

  "Node Exporter": {
    icon: "🖥️", level: "Júnior", levelClass: "junior",
    description: "Node Exporter expõe métricas do sistema operacional e do hardware para o Prometheus.",
    links: [
      { label: "Node Exporter — projeto", url: "https://github.com/prometheus/node_exporter" },
      { label: "Prometheus — exporters", url: "https://prometheus.io/docs/instrumenting/exporters/" },
      { label: "Node Exporter — collectors", url: "https://github.com/prometheus/node_exporter#collectors" }
    ]
  },

  "Blackbox Exporter": {
    icon: "🔎", level: "Júnior", levelClass: "junior",
    description: "Blackbox Exporter testa serviços externamente por HTTP, HTTPS, DNS, TCP e ICMP.",
    links: [
      { label: "Blackbox Exporter — projeto", url: "https://github.com/prometheus/blackbox_exporter" },
      { label: "Blackbox Exporter — configuração", url: "https://github.com/prometheus/blackbox_exporter/blob/master/README.md" },
      { label: "Prometheus — probes", url: "https://prometheus.io/docs/guides/multi-target-exporter/" }
    ]
  },

  "Recording Rules": {
    icon: "🧮", level: "Pleno", levelClass: "pleno",
    description: "Recording rules pré-calculam expressões PromQL para acelerar dashboards, consultas repetidas e alertas.",
    links: [
      { label: "Prometheus — recording rules", url: "https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/" },
      { label: "Prometheus — regras e alertas", url: "https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/" },
      { label: "Prometheus — boas práticas de nomenclatura", url: "https://prometheus.io/docs/practices/rules/" }
    ]
  },

  "Alertmanager Avançado": {
    icon: "🚨", level: "Pleno", levelClass: "pleno",
    description: "Operação avançada de alertas envolve rotas hierárquicas, agrupamento, silences, inibição e integração com plantões.",
    links: [
      { label: "Alertmanager — configuração", url: "https://prometheus.io/docs/alerting/latest/configuration/" },
      { label: "Alertmanager — API", url: "https://prometheus.io/docs/alerting/latest/clients/" },
      { label: "Google SRE — alertas acionáveis", url: "https://sre.google/sre-book/monitoring-distributed-systems/" }
    ]
  },

  "Service Mesh (Istio/Linkerd)": {
    icon: "🕸️", level: "Pleno", levelClass: "pleno",
    description: "Service meshes control comunicação entre serviços e oferecem métricas, traces, segurança e políticas de tráfego.",
    links: [
      { label: "Istio — documentação", url: "https://istio.io/latest/docs/" },
      { label: "Istio — observabilidade", url: "https://istio.io/latest/docs/tasks/observability/" },
      { label: "Linkerd — observabilidade", url: "https://linkerd.io/2.16/features/observability/" }
    ]
  },

  "VictoriaMetrics": {
    icon: "📈", level: "Sênior", levelClass: "senior",
    description: "VictoriaMetrics é uma plataforma de métricas compatível com Prometheus, focada em eficiência, retenção e escala.",
    links: [
      { label: "VictoriaMetrics — documentação", url: "https://docs.victoriametrics.com/" },
      { label: "VictoriaMetrics — arquitetura cluster", url: "https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html" },
      { label: "MetricsQL — documentação", url: "https://docs.victoriametrics.com/metricsql/" }
    ]
  },

  "Loki HA": {
    icon: "🗃️", level: "Sênior", levelClass: "senior",
    description: "Loki em alta disponibilidade exige componentes distribuídos, object storage, limites de ingestão e estratégia de retenção.",
    links: [
      { label: "Loki — arquitetura", url: "https://grafana.com/docs/loki/latest/get-started/architecture/" },
      { label: "Loki — deployment", url: "https://grafana.com/docs/loki/latest/setup/install/" },
      { label: "Loki — armazenamento", url: "https://grafana.com/docs/loki/latest/configure/storage/" }
    ]
  },

  "Tempo Distributed": {
    icon: "⏱️", level: "Sênior", levelClass: "senior",
    description: "Tempo Distributed escala tracing horizontalmente com componentes separados e armazenamento durável em object storage.",
    links: [
      { label: "Tempo — deployment distribuído", url: "https://grafana.com/docs/tempo/latest/setup/helm-chart/" },
      { label: "Tempo — arquitetura", url: "https://grafana.com/docs/tempo/latest/introduction/architecture/" },
      { label: "Tempo — configuração", url: "https://grafana.com/docs/tempo/latest/configuration/" }
    ]
  },

  "Cilium": {
    icon: "🐝", level: "Sênior", levelClass: "senior",
    description: "Cilium usa eBPF para networking, segurança e observabilidade de workloads Kubernetes.",
    links: [
      { label: "Cilium — documentação", url: "https://docs.cilium.io/en/stable/" },
      { label: "Hubble — observabilidade de rede", url: "https://docs.cilium.io/en/stable/observability/" },
      { label: "Cilium — Kubernetes networking", url: "https://docs.cilium.io/en/stable/network/" }
    ]
  },

  "Multi-cluster Observability": {
    icon: "🌍", level: "Sênior", levelClass: "senior",
    description: "Observabilidade multi-cluster padroniza coleta, identidade, correlação e consulta entre vários clusters Kubernetes.",
    links: [
      { label: "OpenTelemetry — Collector gateway", url: "https://opentelemetry.io/docs/collector/deployment/gateway/" },
      { label: "Thanos — múltiplos clusters", url: "https://thanos.io/tip/components/query.md/" },
      { label: "Grafana Mimir — multi-tenancy", url: "https://grafana.com/docs/mimir/latest/manage/secure/authentication-and-authorization/" }
    ]
  },

  "Object Storage (S3/GCS)": {
    icon: "🪣", level: "Sênior", levelClass: "senior",
    description: "Object storage oferece retenção durável e econômica para métricas, logs e traces de longo prazo.",
    links: [
      { label: "Amazon S3 — documentação", url: "https://docs.aws.amazon.com/s3/" },
      { label: "Google Cloud Storage — documentação", url: "https://cloud.google.com/storage/docs" },
      { label: "Thanos — object storage", url: "https://thanos.io/tip/thanos/storage.md/" }
    ]
  },

  "Grafana Alloy": {
    icon: "🔄", level: "Sênior", levelClass: "senior",
    description: "Grafana Alloy é um distribuidor OpenTelemetry para coletar, processar e encaminhar sinais de observabilidade.",
    links: [
      { label: "Grafana Alloy — documentação", url: "https://grafana.com/docs/alloy/latest/" },
      { label: "Alloy — componentes", url: "https://grafana.com/docs/alloy/latest/reference/" },
      { label: "Alloy — Kubernetes", url: "https://grafana.com/docs/alloy/latest/set-up/install/kubernetes/" }
    ]
  },

  "OTel Operator": {
    icon: "⚙️", level: "Sênior", levelClass: "senior",
    description: "O OpenTelemetry Operator gerencia Collectors e habilita padrões de instrumentação em clusters Kubernetes.",
    links: [
      { label: "OpenTelemetry Operator", url: "https://opentelemetry.io/docs/kubernetes/operator/" },
      { label: "Operator — instalação", url: "https://opentelemetry.io/docs/kubernetes/operator/install/" },
      { label: "Operator — auto-instrumentação", url: "https://opentelemetry.io/docs/kubernetes/operator/automatic/" }
    ]
  },

  "Cardinality Management": {
    icon: "📐", level: "Especialista", levelClass: "especialista",
    description: "Gestão de cardinalidade evita séries, índices e custos desnecessários sem perder sinais importantes para investigação.",
    links: [
      { label: "Prometheus — cardinalidade", url: "https://prometheus.io/docs/practices/instrumentation/#do-not-overuse-labels" },
      { label: "Grafana — cardinalidade", url: "https://grafana.com/docs/grafana-cloud/monitor-infrastructure/metrics/cardinality/" },
      { label: "Mimir — limites de métricas", url: "https://grafana.com/docs/mimir/latest/configure/configure-metrics/" }
    ]
  },

  "Adaptive Sampling": {
    icon: "🎯", level: "Especialista", levelClass: "especialista",
    description: "Amostragem adaptativa conserva sinais representativos e prioriza erros, latência alta e transações importantes.",
    links: [
      { label: "OpenTelemetry — sampling", url: "https://opentelemetry.io/docs/concepts/sampling/" },
      { label: "Collector — tail sampling", url: "https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/tailsamplingprocessor" },
      { label: "Grafana Tempo — sampling", url: "https://grafana.com/docs/tempo/latest/configuration/" }
    ]
  },

  "Multi-tenant Observability": {
    icon: "🏢", level: "Especialista", levelClass: "especialista",
    description: "Multi-tenancy isola dados, limites, acesso e custos de diferentes times ou clientes em uma plataforma compartilhada.",
    links: [
      { label: "Grafana Mimir — multi-tenancy", url: "https://grafana.com/docs/mimir/latest/manage/secure/authentication-and-authorization/" },
      { label: "Loki — multi-tenancy", url: "https://grafana.com/docs/loki/latest/operations/multi-tenancy/" },
      { label: "Tempo — multi-tenancy", url: "https://grafana.com/docs/tempo/latest/configuration/auth/" }
    ]
  },

  "Chaos Engineering": {
    icon: "💥", level: "Especialista", levelClass: "especialista",
    description: "Chaos Engineering testa hipóteses de resiliência com experimentos controlados e aprendizado operacional.",
    links: [
      { label: "Principles of Chaos Engineering", url: "https://principlesofchaos.org/" },
      { label: "CNCF — LitmusChaos", url: "https://litmuschaos.io/" },
      { label: "AWS — Fault Injection Service", url: "https://aws.amazon.com/fis/" }
    ]
  },

  "Incident Management": {
    icon: "🧯", level: "Especialista", levelClass: "especialista",
    description: "Gestão de incidentes organiza detecção, resposta, comunicação, mitigação e aprendizado após falhas.",
    links: [
      { label: "Google SRE — gerenciamento de incidentes", url: "https://sre.google/sre-book/managing-incidents/" },
      { label: "PagerDuty — Incident Response", url: "https://response.pagerduty.com/" },
      { label: "NIST — Computer Security Incident Handling", url: "https://csrc.nist.gov/pubs/sp/800/61/r2/final" }
    ]
  },

  "Capacity Planning": {
    icon: "📊", level: "Especialista", levelClass: "especialista",
    description: "Capacity planning combina demanda, crescimento, limites e desempenho para antecipar necessidades de infraestrutura.",
    links: [
      { label: "Google SRE — handling overload", url: "https://sre.google/sre-book/handling-overload/" },
      { label: "Kubernetes — autoscaling", url: "https://kubernetes.io/docs/concepts/workloads/autoscaling/" },
      { label: "AWS — Well-Architected reliability", url: "https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html" }
    ]
  },

  "AIOps & Anomaly Detection": {
    icon: "🧠", level: "Especialista", levelClass: "especialista",
    description: "Anomaly detection usa estatística e aprendizado de máquina para identificar desvios, sempre com contexto e validação humana.",
    links: [
      { label: "Grafana — alertas baseados em condições", url: "https://grafana.com/docs/grafana/latest/alerting/" },
      { label: "Prometheus — funções preditivas", url: "https://prometheus.io/docs/prometheus/latest/querying/functions/" },
      { label: "Google SRE — alertas", url: "https://sre.google/sre-book/monitoring-distributed-systems/" }
    ]
  },

  "Network Observability": {
    icon: "🛰️", level: "Especialista", levelClass: "especialista",
    description: "Network observability relaciona fluxos, latência, perdas, dependências e políticas para explicar problemas de conectividade.",
    links: [
      { label: "Cilium Hubble", url: "https://docs.cilium.io/en/stable/observability/" },
      { label: "Kubernetes — networking", url: "https://kubernetes.io/docs/concepts/cluster-administration/networking/" },
      { label: "eBPF — networking", url: "https://ebpf.io/applications/#networking" }
    ]
  },

  "Security Observability": {
    icon: "🔐", level: "Especialista", levelClass: "especialista",
    description: "Security observability conecta sinais de identidade, rede, workloads e eventos para detectar e investigar riscos.",
    links: [
      { label: "Falco — runtime security", url: "https://falco.org/docs/" },
      { label: "CNCF — Falco", url: "https://www.cncf.io/projects/falco/" },
      { label: "OpenTelemetry — segurança", url: "https://opentelemetry.io/docs/" }
    ]
  },

  "Continuous Profiling": {
    icon: "🔥", level: "Especialista", levelClass: "especialista",
    description: "Continuous profiling coleta perfis de CPU, memória e goroutines continuamente para encontrar custos e gargalos em produção.",
    links: [
      { label: "Pyroscope — documentação", url: "https://grafana.com/docs/pyroscope/latest/" },
      { label: "Parca — continuous profiling", url: "https://www.parca.dev/docs" },
      { label: "OpenTelemetry — profiling", url: "https://opentelemetry.io/docs/" }
    ]
  },

  "Arquitetura Multi-cluster": {
    icon: "🏗️", level: "Staff", levelClass: "staff",
    description: "Arquiteturas multi-cluster distribuem workloads e telemetria para isolamento, escala, resiliência e governança.",
    links: [
      { label: "Kubernetes — clusters federados", url: "https://kubernetes.io/docs/concepts/cluster-administration/federation/" },
      { label: "CNCF — multi-cluster", url: "https://github.com/cncf/k8s-conformance" },
      { label: "Thanos — query global", url: "https://thanos.io/tip/components/query.md/" }
    ]
  },

  "Multi-region Observability": {
    icon: "🌎", level: "Staff", levelClass: "staff",
    description: "Observabilidade multi-região precisa preservar disponibilidade, ordenação, residência de dados e correlação entre regiões.",
    links: [
      { label: "Google SRE — serviços distribuídos", url: "https://sre.google/sre-book/monitoring-distributed-systems/" },
      { label: "AWS — reliability pillar", url: "https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html" },
      { label: "Thanos — global querying", url: "https://thanos.io/tip/components/query.md/" }
    ]
  },

  "Disaster Recovery O11y": {
    icon: "🛟", level: "Staff", levelClass: "staff",
    description: "DR de observabilidade garante que telemetria, alertas e acesso continuem úteis durante a recuperação de uma região ou plataforma.",
    links: [
      { label: "AWS — disaster recovery", url: "https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-workloads-on-aws.html" },
      { label: "Kubernetes — backup e restore", url: "https://velero.io/docs/" },
      { label: "Google SRE — emergency response", url: "https://sre.google/sre-book/emergency-response/" }
    ]
  },

  "Global Telemetry Pipelines": {
    icon: "🛤️", level: "Staff", levelClass: "staff",
    description: "Pipelines globais de telemetria definem ingestão, processamento, roteamento, retenção e governança em escala.",
    links: [
      { label: "OpenTelemetry Collector — deployment", url: "https://opentelemetry.io/docs/collector/deployment/" },
      { label: "OpenTelemetry — gateway", url: "https://opentelemetry.io/docs/collector/deployment/gateway/" },
      { label: "CNCF — observability whitepaper", url: "https://github.com/cncf/sig-observability/blob/main/whitepaper.md" }
    ]
  },

  "Enterprise Governance": {
    icon: "⚖️", level: "Staff", levelClass: "staff",
    description: "Governança enterprise define padrões, acesso, retenção, privacidade, custos e responsabilidades para observabilidade.",
    links: [
      { label: "CNCF — observability whitepaper", url: "https://github.com/cncf/sig-observability/blob/main/whitepaper.md" },
      { label: "NIST — Privacy Framework", url: "https://www.nist.gov/privacy-framework" },
      { label: "OpenTelemetry — semantic conventions", url: "https://opentelemetry.io/docs/concepts/semantic-conventions/" }
    ]
  },

  "Observability Platform Design": {
    icon: "🧩", level: "Staff", levelClass: "staff",
    description: "Desenho de plataforma transforma telemetria em uma capacidade interna com experiência de desenvolvedor, confiabilidade e custos controlados.",
    links: [
      { label: "OpenTelemetry — arquitetura", url: "https://opentelemetry.io/docs/concepts/observability-primer/" },
      { label: "CNCF — Platform Engineering", url: "https://tag-app-delivery.cncf.io/whitepapers/platform-eng/" },
      { label: "Google SRE Book", url: "https://sre.google/sre-book/table-of-contents/" }
    ]
  },

  "FinOps Estratégico": {
    icon: "💰", level: "Staff", levelClass: "staff",
    description: "FinOps estratégico conecta custos de telemetria a valor de negócio, decisões de arquitetura e responsabilidades por domínio.",
    links: [
      { label: "FinOps Framework", url: "https://www.finops.org/framework/" },
      { label: "CNCF — FinOps", url: "https://www.cncf.io/finops/" },
      { label: "Grafana — custos de observabilidade", url: "https://grafana.com/docs/grafana-cloud/cost-management-and-billing/" }
    ]
  },

  "RFC & Standards Internos": {
    icon: "📜", level: "Staff", levelClass: "staff",
    description: "RFCs e padrões internos tornam decisões de instrumentação, nomenclatura, alertas e operação revisáveis e consistentes.",
    links: [
      { label: "IETF — RFC 2119", url: "https://www.rfc-editor.org/rfc/rfc2119" },
      { label: "OpenTelemetry — semantic conventions", url: "https://opentelemetry.io/docs/concepts/semantic-conventions/" },
      { label: "OpenSLO — specification", url: "https://openslo.com/" }
    ]
  },

  "Vendor Evaluation": {
    icon: "🔍", level: "Staff", levelClass: "staff",
    description: "Avaliação de vendors compara cobertura de sinais, portabilidade, retenção, segurança, integração, suporte e custo total.",
    links: [
      { label: "CNCF — observability landscape", url: "https://landscape.cncf.io/?group=observability-and-analysis" },
      { label: "OpenTelemetry — vendor neutrality", url: "https://opentelemetry.io/docs/concepts/observability-primer/" },
      { label: "FinOps — decisões baseadas em valor", url: "https://www.finops.org/framework/" }
    ]
  },

  "Roadmap Técnico Plurianual": {
    icon: "🗺️", level: "Staff", levelClass: "staff",
    description: "Um roadmap técnico plurianual organiza capacidades, riscos, migrações, investimentos e resultados esperados ao longo do tempo.",
    links: [
      { label: "Google SRE Workbook", url: "https://sre.google/workbook/table-of-contents/" },
      { label: "CNCF — landscape", url: "https://landscape.cncf.io/" },
      { label: "OpenTelemetry — roadmap do projeto", url: "https://github.com/open-telemetry/community/blob/main/projects/roadmap.md" }
    ]
  }
};
