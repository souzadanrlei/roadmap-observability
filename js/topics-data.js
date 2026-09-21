/* =============================================
   TOPICS DATA — Roadmap Observability
   Data used by modal.js to show topic details
============================================= */

window.TOPICS = {

  /* ============ FUNDAMENTOS ============ */
  "O que é Observabilidade": {
    icon: "🔭", level: "Iniciante", levelClass: "iniciante",
    description: "Observabilidade é a capacidade de entender o estado interno de um sistema a partir das saídas que ele produz. Na prática, ela combina telemetria (logs, métricas, traces e perfis), contexto de negócio e engenharia de confiabilidade para explicar por que um sistema está se comportando de determinada forma.",
    concepts: [
      "Os três pilares: Logs, Métricas e Traces",
      "Perfis contínuos para CPU, memória e latência",
      "Diferença entre monitoramento e observabilidade",
      "OpenTelemetry e telemetria vendor-neutral",
      "Cardinalidade, retenção e custo",
      "Context propagation entre serviços",
      "SLIs, SLOs e error budgets",
      "Correlação entre telemetria técnica e experiência do usuário"
    ],
    tools: ["OpenTelemetry", "Prometheus", "Grafana", "Jaeger", "Loki"],
    realCase: "Google, Netflix e Amazon usam observabilidade para operar sistemas distribuídos em escala com SLOs e telemetria correlacionada.",
    code: "# Pergunta operacional\n# Qual serviço aumentou a latência após o último deploy?\n# Investigue métrica -> trace -> log correlacionado.",
    bestPractices: ["Instrumente desde o início", "Comece pelas jornadas críticas do usuário", "Use IDs de correlação", "Prefira logs estruturados", "Defina SLOs antes dos alertas", "Controle custo, retenção e cardinalidade"],
    antiPatterns: ["Monitorar apenas infraestrutura", "Criar alertas sem ação definida", "Coletar tudo sem retenção ou amostragem"],
    prerequisites: ["Conceitos básicos de redes", "HTTP", "Sistemas distribuídos básico"],
    nextSteps: ["Logs", "Métricas", "Traces", "SLI/SLO/SLA", "Golden Signals"],
    links: [
      { label: "OpenTelemetry — documentação", url: "https://opentelemetry.io/docs/" },
      { label: "OpenTelemetry — conceitos", url: "https://opentelemetry.io/docs/concepts/observability-primer/" },
      { label: "Google SRE Book — monitoramento", url: "https://sre.google/sre-book/monitoring-distributed-systems/" },
      { label: "Google SRE Workbook — SLOs", url: "https://sre.google/workbook/implementing-slos/" },
      { label: "CNCF — observabilidade cloud-native", url: "https://github.com/cncf/sig-observability/blob/main/whitepaper.md" },
      { label: "Prometheus — documentação", url: "https://prometheus.io/docs/introduction/overview/" },
      { label: "Grafana — learning journeys", url: "https://grafana.com/docs/learning-journeys/" },
      { label: "Jaeger — documentação", url: "https://www.jaegertracing.io/docs/" },
      { label: "Grafana Loki", url: "https://grafana.com/docs/loki/latest/" }
    ]
  },

  "Logs": {
    icon: "📋", level: "Iniciante", levelClass: "iniciante",
    description: "Logs registram eventos com contexto temporal e operacional. Quando estruturados e correlacionados, ajudam a explicar o que aconteceu em uma requisição ou processo.",
    concepts: ["Logs estruturados", "Níveis de severidade", "JSON logging", "trace_id e request_id", "Retenção", "Sampling"],
    tools: ["Loki", "Elasticsearch", "Fluent Bit", "Vector", "Logstash", "OpenTelemetry"],
    code: "{\n  \"level\": \"ERROR\",\n  \"service\": \"checkout\",\n  \"trace_id\": \"abc123\",\n  \"message\": \"payment timeout\"\n}",
    realCase: "Correlacionar um log de erro com trace_id e deployment transforma uma mensagem isolada em uma investigação reproduzível.",
    bestPractices: ["Use JSON consistente", "Inclua contexto suficiente", "Redija dados sensíveis", "Defina retenção por finalidade"],
    antiPatterns: ["Texto sem estrutura", "Logar tokens e PII", "Usar ERROR para tudo", "Guardar logs indefinidamente"],
    prerequisites: ["O que é Observabilidade"],
    nextSteps: ["Loki", "LogQL", "FluentBit", "Correlação de Logs e Traces"],
    links: [
      { label: "OpenTelemetry — logs", url: "https://opentelemetry.io/docs/concepts/signals/logs/" },
      { label: "Grafana Loki", url: "https://grafana.com/docs/loki/latest/" },
      { label: "Fluent Bit", url: "https://docs.fluentbit.io/manual/" }
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
}

`,
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

/* Enrichment for topics that previously had only a description and links. */
const CURATED_STUDY_PROFILES = {
  "Linux Fundamentos": ["processos, permissões, systemd e recursos do host", "Bash, systemd, journalctl, ss", "$ ps aux | sort -nrk 3 | head", "Comece pelo diagnóstico do host e sempre correlacione processos, recursos e logs.", "Containers & Docker"],
  "Redes & TCP/IP": ["IP, roteamento, TCP, UDP, portas, latência e MTU", "ip, ss, ping, traceroute, tcpdump", "$ ss -tan; tcpdump -ni any port 443", "Separe falhas de DNS, rota, firewall, handshake e aplicação.", "DNS & HTTP"],
  "DNS & HTTP": ["DNS recursivo, TTL, métodos HTTP, status, TLS e keep-alive", "dig, curl, openssl, DevTools", "$ dig +trace api.example.com; curl -sv https://api.example.com/health", "Investigue cada camada da requisição antes de alterar o código.", "Blackbox Exporter"],
  "Containers & Docker": ["namespaces, cgroups, imagens, volumes, rede e healthchecks", "Docker, BuildKit, Compose, Trivy", "docker run --rm --cpus=1 --memory=512m app:1.0", "Limites, probes e imagens reproduzíveis são parte da observabilidade operacional.", "Kubernetes Básico"],
  "Kubernetes Básico": ["Pods, Deployments, Services, probes, requests, limits e Events", "kubectl, kind, k9s, Helm", "kubectl describe pod checkout-7d8f; kubectl logs deploy/checkout", "Aprenda a localizar o workload e entender seu estado antes de instalar ferramentas.", "Kubernetes Observability"],
  "YAML & Configuração": ["estrutura YAML, schemas, templates e configuração declarativa", "yamllint, yq, Kustomize, Helm", "kubectl apply --dry-run=server -f deployment.yaml", "Valide manifests no CI e mantenha segredos fora do repositório.", "Helm Charts"],
  "Git & GitOps": ["commits, revisão, desired state, reconciliação e drift", "Git, GitHub, Argo CD, Flux", "git diff --check; git commit -m 'Add checkout SLO'", "Toda mudança operacional deve ser revisável, auditável e reversível.", "CI/CD + O11y"],
  "Cloud (AWS/GCP/Azure) Básico": ["regiões, IAM, redes, storage, serviços gerenciados e budgets", "AWS CLI, gcloud, Azure CLI, Terraform", "terraform plan -out=plan.tfplan", "Escolha serviços considerando confiabilidade, telemetria, segurança e custo.", "Object Storage (S3/GCS)"],
  "FluentBit": ["inputs, parsers, filters, buffers e outputs", "Fluent Bit, Kubernetes, Loki, OpenSearch", "fluent-bit -c fluent-bit.conf --dry-run", "Faça parsing na borda, controle buffers e monitore perda de eventos.", "Loki"],
  "Alertmanager": ["grouping, routing, silences, inhibition e receivers", "Alertmanager, Prometheus, PagerDuty, Slack", "amtool alert query --alertmanager.url=http://alertmanager:9093", "Cada alerta precisa de proprietário, severidade e ação documentada.", "Alertmanager Avançado"],
  "kube-prometheus-stack": ["Prometheus Operator, ServiceMonitor, Grafana e Alertmanager", "Helm, Prometheus Operator, Grafana", "helm upgrade --install monitoring prometheus-community/kube-prometheus-stack", "Instale em ambiente de laboratório e entenda cada CRD antes de customizar.", "Kubernetes Observability"],
  "Helm Charts": ["charts, values, templates, releases e hooks", "Helm, Artifact Hub, helm-docs", "helm template monitoring ./chart --values values-prod.yaml", "Fixe versões e revise o manifesto renderizado no CI.", "Git & GitOps"],
  "Node Exporter": ["collectors, métricas de CPU, memória, disco e filesystem", "Node Exporter, Prometheus, Grafana", "curl localhost:9100/metrics | grep node_filesystem", "Não confunda saturação do host com problema da aplicação.", "Recording Rules"],
  "Blackbox Exporter": ["probes HTTP, HTTPS, DNS, TCP, ICMP e latência externa", "Blackbox Exporter, Prometheus, Grafana", "curl 'localhost:9115/probe?target=https://example.com&module=http_2xx'", "Monitore a experiência vista de fora do serviço.", "Golden Signals"],
  "Recording Rules": ["avaliação periódica, nomes de séries e custo de queries", "Prometheus, PromQL, rule files", "record: service:http_errors:ratio_rate5m", "Pré-calcule somente consultas frequentes e valide a janela temporal.", "PromQL"],
  "Alertmanager Avançado": ["rotas hierárquicas, deduplicação, inibição e silences", "Alertmanager, amtool, PagerDuty", "amtool silence add alertname=HighLatency --duration=1h", "Reduza ruído sem esconder sinais críticos; audite silences.", "Alertas Inteligentes"],
  "Service Mesh (Istio/Linkerd)": ["sidecars, mTLS, traffic policy e telemetria de serviço", "Istio, Linkerd, Envoy, OpenTelemetry", "istioctl proxy-status; kubectl get servicemesh", "Comece observando o tráfego antes de aplicar políticas complexas.", "Network Observability"],
  "VictoriaMetrics": ["compatibilidade Prometheus, retenção, ingestão e MetricsQL", "VictoriaMetrics, vmagent, Grafana", "vmagent -promscrape.config=prometheus.yml", "Compare custo, operação e retenção com o stack que o time já domina.", "Multi-cluster Observability"],
  "Loki HA": ["distributor, ingester, querier, compactor e object storage", "Loki, Grafana, Alloy, S3/GCS", "helm upgrade --install loki grafana/loki --set deploymentMode=Distributed", "Modele retenção, limites e recuperação antes de declarar alta disponibilidade.", "Multi-tenant Observability"],
  "Tempo Distributed": ["distributor, ingester, querier, compactor e TraceQL", "Tempo, OpenTelemetry, Grafana, object storage", "{ .service.name = \"checkout\" && duration > 1s }", "Teste ingestão, consulta, retenção e correlação com logs.", "Grafana Tempo"],
  "Cilium": ["eBPF, CNI, NetworkPolicy e Hubble flows", "Cilium, Hubble, eBPF, Kubernetes", "hubble observe --namespace checkout --follow", "Use fluxos de rede para validar dependências e políticas reais.", "Network Observability"],
  "Multi-cluster Observability": ["identidade de cluster, federação, gateway e correlação", "OpenTelemetry Collector, Thanos, Mimir, Grafana", "cluster=prod-eu; cluster=prod-us; query_global_errors", "Padronize labels e ownership antes de centralizar consultas.", "Arquitetura Multi-cluster"],
  "Object Storage (S3/GCS)": ["buckets, lifecycle, classes, versionamento e durabilidade", "S3, GCS, MinIO, Thanos, Loki", "aws s3api put-bucket-lifecycle-configuration --bucket telemetry", "Use lifecycle e políticas de acesso para controlar retenção e custo.", "FinOps"],
  "Grafana Alloy": ["receivers, processors, exporters e pipelines declarativos", "Grafana Alloy, OpenTelemetry, Prometheus", "alloy run config.alloy", "Comece com um pipeline pequeno e monitore fila, erros e backpressure.", "OpenTelemetry Collector"],
  "OTel Operator": ["CRDs, Collector, auto-instrumentação e admission webhooks", "OpenTelemetry Operator, Kubernetes, Helm", "kubectl apply -f instrumentation.yaml", "Defina versões e namespaces explicitamente para evitar instrumentação surpresa.", "OpenTelemetry Collector"],
  "Cardinality Management": ["labels, séries ativas, custo, limites e agregação", "Prometheus, Mimir, Grafana cardinality dashboards", "topk(20, count by (__name__)({__name__=~\".+\"}))", "Proíba identificadores de alta cardinalidade como labels sem justificativa.", "FinOps"],
  "Adaptive Sampling": ["head sampling, tail sampling, policies e prioridades", "OpenTelemetry Collector, Tempo, Jaeger", "policy: status_code == ERROR or duration > 1s", "Preserve erros e traces lentos; meça o que foi descartado.", "Continuous Profiling"],
  "Multi-tenant Observability": ["isolamento, autenticação, quotas, RBAC e chargeback", "Mimir, Loki, Tempo, Grafana RBAC", "X-Scope-OrgID: team-checkout", "Defina limites por tenant e teste vazamento de dados entre equipes.", "Enterprise Governance"],
  "Chaos Engineering": ["hipótese, steady state, blast radius e aprendizado", "LitmusChaos, AWS FIS, Chaos Mesh", "kubectl delete pod checkout-0 --grace-period=0", "Experimentos devem ser pequenos, autorizados, observáveis e reversíveis.", "Incident Management"],
  "Incident Management": ["detecção, triagem, comando, comunicação e postmortem", "PagerDuty, Opsgenie, Slack, runbooks", "incident_id=INC-2026-001; severity=SEV-2", "Separe mitigação imediata de investigação da causa raiz.", "SRE"],
  "Capacity Planning": ["demanda, headroom, saturação, tendência e autoscaling", "Prometheus, Grafana, Kubernetes HPA, forecasting", "predict_linear(node_filesystem_avail_bytes[7d], 30*24*3600)", "Planeje com dados de crescimento e valide a previsão em revisões periódicas.", "Multi-region Observability"],
  "AIOps & Anomaly Detection": ["baseline, sazonalidade, correlação e revisão humana", "Prometheus, Grafana, Alertmanager", "holt_winters(request_rate[1h], 0.5, 0.5)", "Use anomalia para investigação, não como substituto automático de SLO.", "Alertas Inteligentes"],
  "Network Observability": ["flows, DNS, latência, perda, dependências e políticas", "Hubble, Cilium, tcpdump, eBPF", "hubble observe --protocol http --verdict DROPPED", "Correlacione fluxo de rede com serviço, pod e trace.", "Security Observability"],
  "Security Observability": ["identidade, eventos, runtime, rede e trilhas de auditoria", "Falco, Tetragon, Cilium, OpenTelemetry", "falco -A -r rules.yaml", "Colete apenas o necessário e trate telemetria de segurança como dado sensível.", "Enterprise Governance"],
  "Continuous Profiling": ["CPU, heap, goroutines, flame graphs e overhead", "Pyroscope, Parca, pprof", "go tool pprof http://localhost:6060/debug/pprof/profile", "Compare perfis antes e depois de mudanças e preserve amostras representativas.", "AIOps & Anomaly Detection"],
  "Arquitetura Multi-cluster": ["federation, isolamento, failover, identidade e governança", "Kubernetes, Thanos, Mimir, OpenTelemetry", "cluster=eu-west; cluster=us-east; route=global", "Defina fronteiras de falha e ownership por cluster.", "Multi-region Observability"],
  "Multi-region Observability": ["residência, replicação, latência, failover e consulta global", "Thanos, Mimir, object storage, Grafana", "sum by (region) (rate(http_requests_total[5m]))", "Teste perda de região e acesso à telemetria durante o failover.", "Disaster Recovery O11y"],
  "Disaster Recovery O11y": ["RPO, RTO, backup, restore e dependências críticas", "Velero, S3/GCS, Terraform, runbooks", "velero backup create observability-pre-dr", "Faça exercícios de restore; backup não validado não é estratégia de recuperação.", "Global Telemetry Pipelines"],
  "Global Telemetry Pipelines": ["ingestão, roteamento, transformação, backpressure e retenção", "OpenTelemetry Collector, Alloy, Kafka, object storage", "receivers -> processors -> exporters", "Planeje quedas de backend e limite filas para evitar cascatas.", "Enterprise Governance"],
  "Enterprise Governance": ["padrões, acesso, privacidade, retenção, custo e ownership", "OpenTelemetry, RBAC, policy as code, FinOps", "policy: telemetry.retention_days <= 30", "Transforme padrões em templates, validações e indicadores de adoção.", "RFC & Standards Internos"],
  "Observability Platform Design": ["personas, golden paths, SLO da plataforma e self-service", "Backstage, OpenTelemetry, Grafana, Kubernetes", "service create --template=observability-ready", "Trate a plataforma como produto: onboarding, suporte, roadmap e métricas de uso.", "Roadmap Técnico Plurianual"],
  "FinOps Estratégico": ["unit economics, budgets, chargeback, retention e ROI", "FinOps Framework, Grafana, Mimir, Loki", "cost_per_service = ingest_bytes * price_per_gb", "Decida o que reter pelo valor da investigação e pelo risco do negócio.", "Vendor Evaluation"],
  "RFC & Standards Internos": ["problema, alternativas, decisão, consequências e revisão", "Markdown, Git, ADR, OpenTelemetry", "status: accepted; owner: platform; review: 2026-12", "Registre decisões e revisite padrões quando evidências mudarem.", "Vendor Evaluation"],
  "Vendor Evaluation": ["cobertura, portabilidade, segurança, suporte e TCO", "CNCF Landscape, OpenTelemetry, FinOps", "score = value * reliability / total_cost", "Faça prova de conceito com dados e incidentes reais, não apenas demo.", "Roadmap Técnico Plurianual"],
  "Roadmap Técnico Plurianual": ["visão, capacidades, dependências, riscos e marcos", "RFCs, ADRs, SLOs, FinOps", "Q1: foundations; Q2: scale; Q3: governance; Q4: optimization", "Conecte cada iniciativa a um resultado mensurável para usuário e operação.", "Enterprise Governance"]
};

Object.entries(CURATED_STUDY_PROFILES).forEach(([topicName, profile]) => {
  const topic = window.TOPICS[topicName];
  if (!topic) return;
  topic.concepts ||= profile[0].split(", ");
  topic.tools ||= profile[1].split(", ");
  topic.code ||= profile[2];
  topic.realCase ||= profile[3];
  topic.bestPractices ||= ["Estude em laboratório antes de levar para produção", "Meça o resultado da mudança", "Documente decisões e procedimentos", "Relacione o tema a um SLI ou SLO"];
  topic.antiPatterns ||= ["Adotar a ferramenta sem definir o problema", "Operar sem limites, ownership ou rollback", "Ignorar custo, segurança e manutenção"];
  topic.prerequisites ||= ["O que é Observabilidade"];
  topic.nextSteps ||= [profile[4], "Prática em laboratório", "Revisão de SLOs"];
});

Object.entries(window.TOPICS).forEach(([topicName, topic]) => {
  topic.tools ||= [topicName, "Grafana", "OpenTelemetry"];
  topic.code ||= `# Exercício de estudo: ${topicName}
# Escolha um serviço de laboratório, observe o comportamento esperado
# e registre o sinal que confirma ou refuta sua hipótese.`;
  topic.realCase ||= `Em uma operação real, ${topicName} deve responder a uma pergunta clara de confiabilidade, desempenho ou custo antes de virar padrão da plataforma.`;
  topic.antiPatterns ||= ["Adotar a ferramenta sem definir a pergunta operacional", "Criar configuração sem teste, ownership ou rollback", "Ignorar segurança, custo e qualidade do sinal"];
  topic.bestPractices ||= ["Pratique em um laboratório reproduzível", "Defina uma hipótese e um sinal de sucesso", "Documente o procedimento e o rollback", "Relacione o resultado a um SLI, SLO ou risco de negócio"];
});

const DEVELOPER_TOPIC_PROFILES = {
  "HTTP & REST APIs": ["iniciante", "HTTP é o contrato mais comum entre aplicações. Observe método, status, latência, tamanho e erros sem vazar dados sensíveis.", ["métodos e status", "headers", "timeouts e retries", "idempotência", "paginação"], ["curl", "HTTPie", "OpenAPI", "Postman"], "curl -i -w '%{http_code} %{time_total}\\n' https://api.example.com/health", "Uma API pode retornar 200 e ainda estar degradada por latência, payload grande ou dependência lenta.", "Git & Controle de Versão", "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview", "https://spec.openapis.org/oas/latest.html"],
  "Git & Controle de Versão": ["iniciante", "Git registra a evolução do código e torna mudanças de instrumentação, alertas e configuração revisáveis.", ["commits", "branches", "pull requests", "rebase", "reversão"], ["Git", "GitHub", "pre-commit", "git bisect"], "git log --oneline --decorate -10\\ngit diff --check", "Um deploy regressivo pode ser associado a um commit e revertido com histórico auditável.", "Docker Básico", "https://git-scm.com/book/en/v2", "https://docs.github.com/en/pull-requests"],
  "Docker Básico": ["iniciante", "Docker empacota a aplicação e permite reproduzir localmente o mesmo processo observado em CI e produção.", ["imagem", "container", "layers", "volumes", "healthcheck"], ["Docker", "BuildKit", "Compose", "Trivy"], "docker build -t checkout:dev .\\ndocker run --rm -p 8080:8080 checkout:dev", "Um container saudável precisa de limites, logs para stdout e um endpoint de saúde verificável.", "Ambiente de Desenvolvimento", "https://docs.docker.com/get-started/", "https://docs.docker.com/build/building/best-practices/"],
  "Ambiente de Desenvolvimento": ["iniciante", "Um ambiente reproduzível reduz diferenças entre máquinas e facilita laboratórios de logs, métricas e traces.", ["dependências", "variáveis de ambiente", "dev containers", "dados locais", "paridade"], ["Dev Containers", "Docker Compose", "Make", "direnv"], "docker compose up -d\\nmake test\\nmake run", "Um compose local com a aplicação e o stack de observabilidade acelera a aprendizagem sem depender da nuvem.", "JSON & YAML", "https://containers.dev/guide/dockerfile", "https://docs.docker.com/compose/"],
  "JSON & YAML": ["iniciante", "JSON transporta eventos e APIs; YAML declara configurações, pipelines e recursos de infraestrutura.", ["objetos", "listas", "schemas", "serialização", "validação"], ["jq", "yq", "yamllint", "JSON Schema"], "jq '.trace_id, .duration_ms' event.json\\nyamllint deployment.yaml", "Schemas e lint detectam configurações inválidas antes de elas chegarem ao runtime.", "Curl & Debugging HTTP", "https://www.json.org/json-en.html", "https://yaml.org/spec/1.2.2/"],
  "Curl & Debugging HTTP": ["iniciante", "curl permite observar DNS, TLS, headers, redirects, status e tempo de cada requisição.", ["verbose mode", "headers", "timing", "TLS", "redirects"], ["curl", "openssl", "dig", "tcpdump"], "curl -v --trace-time -o /dev/null https://api.example.com", "A decomposição do tempo de uma chamada mostra se o gargalo está em DNS, conexão, TLS, servidor ou transferência.", "Health Checks / Readiness", "https://curl.se/docs/", "https://everything.curl.dev/"],
  "Logs Estruturados (JSON)": ["junior", "Logs estruturados transformam eventos em dados pesquisáveis, correlacionáveis e úteis para alertas.", ["schema de evento", "severidade", "contexto", "PII", "correlação"], ["Pino", "Winston", "Logback", "OpenTelemetry Logs"], "logger.info({ trace_id, route, duration_ms }, 'request finished')", "Um evento consistente permite filtrar erros por serviço, rota, versão e trace sem regex frágil.", "Trace IDs em Logs", "https://opentelemetry.io/docs/concepts/signals/logs/", "https://www.elastic.co/guide/en/ecs/current/ecs-reference.html"],
  "Métricas RED Method": ["junior", "RED mede Rate, Errors e Duration para acompanhar a saúde percebida de serviços e endpoints.", ["rate", "errors", "duration", "histogram", "percentis"], ["Prometheus", "OpenTelemetry Metrics", "Grafana"], "rate(http_requests_total[5m])\\nsum(rate(http_request_duration_seconds_count[5m]))", "Um dashboard RED por serviço revela tráfego, falhas e latência sem depender de logs individuais.", "Health Checks / Readiness", "https://grafana.com/docs/grafana-cloud/monitor-applications/application-observability/instrumentation/", "https://prometheus.io/docs/practices/instrumentation/"],
  "Health Checks / Readiness": ["junior", "Health checks informam se o processo está vivo e se pode receber tráfego; não devem mascarar dependências críticas.", ["liveness", "readiness", "startup", "dependências", "degradação"], ["Kubernetes probes", "HTTP", "gRPC health checking"], "GET /livez -> 200\\nGET /readyz -> 503 quando o banco não está pronto", "Readiness retira uma instância do tráfego; liveness reinicia apenas quando o processo não consegue se recuperar.", "Exposição /metrics (Prometheus)", "https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/", "https://grpc.io/docs/guides/health-checking/"],
  "Exposição /metrics (Prometheus)": ["junior", "O endpoint /metrics expõe séries para coleta pelo Prometheus e deve ser barato, estável e protegido conforme o ambiente.", ["scrape", "labels", "counters", "histograms", "content type"], ["Prometheus client libraries", "OpenMetrics", "Prometheus"], "curl http://localhost:8080/metrics | head", "Métricas de requisições e duração permitem alertar sem analisar cada log.", "Métricas RED Method", "https://prometheus.io/docs/instrumenting/exposition_formats/", "https://prometheus.io/docs/practices/instrumentation/"],
  "Trace IDs em Logs": ["junior", "Adicionar trace_id e span_id aos logs conecta a mensagem textual ao caminho distribuído da requisição.", ["trace_id", "span_id", "correlation", "W3C Trace Context"], ["OpenTelemetry", "Loki", "Grafana"], "logger.error({ trace_id: span.spanContext().traceId }, 'payment failed')", "O operador segue uma falha do dashboard para o trace e depois para o log exato do serviço.", "Dashboards Básicos", "https://opentelemetry.io/docs/concepts/signals/logs/", "https://www.w3.org/TR/trace-context/"],
  "Dashboards Básicos": ["junior", "Dashboards básicos devem responder rapidamente se o serviço está saudável e onde investigar em seguida.", ["painéis", "variáveis", "RED", "anotações", "links"], ["Grafana", "Prometheus", "Loki"], "rate(http_requests_total[5m])\\nsum(rate(http_requests_total{status=~'5..'}[5m]))", "Um dashboard enxuto com tráfego, erros, latência e links de runbook é mais útil que dezenas de gráficos.", "Alertas Simples", "https://grafana.com/docs/grafana/latest/dashboards/", "https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/best-practices/"],
  "Alertas Simples": ["junior", "Alertas simples detectam condições acionáveis, com severidade, owner, janela e orientação de resposta.", ["threshold", "for", "severity", "annotations", "runbook"], ["Prometheus", "Alertmanager", "Grafana Alerting"], "- alert: HighErrorRate\\n  expr: rate(http_requests_total{status=~'5..'}[5m]) > 0.05\\n  for: 10m", "Um alerta só deve acordar alguém quando houver risco ou ação clara.", "Docker Compose para O11y", "https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/", "https://grafana.com/docs/grafana/latest/alerting/"],
  "Docker Compose para O11y": ["junior", "Compose permite levantar aplicação, collector, Prometheus, Grafana e backend de traces em um laboratório local.", ["services", "networks", "volumes", "healthchecks", "profiles"], ["Docker Compose", "Prometheus", "Grafana", "OpenTelemetry Collector"], "docker compose up -d\\ndocker compose ps\\ndocker compose logs otel-collector", "Um laboratório local reproduz o fluxo instrumentação -> coleta -> armazenamento -> consulta.", "OpenTelemetry", "https://docs.docker.com/compose/", "https://opentelemetry.io/docs/collector/"],
  "OTel SDK (sua linguagem)": ["pleno", "O SDK configura tracer, meter, logger, recursos, propagação e exporters dentro da aplicação.", ["API", "SDK", "resource", "exporter", "provider"], ["OpenTelemetry SDK", "OTLP", "Collector"], "const tracer = trace.getTracer('checkout', '1.0.0');\\nconst span = tracer.startSpan('checkout');\\nspan.end();", "O SDK é o ponto de controle para padronizar telemetria sem acoplar a aplicação a um backend.", "Auto-instrumentação", "https://opentelemetry.io/docs/languages/", "https://opentelemetry.io/docs/concepts/sdk/"],
  "Auto-instrumentação": ["pleno", "Auto-instrumentação adiciona sinais comuns de HTTP, banco e messaging com pouca alteração no código.", ["agentes", "libraries", "zero-code", "configuração", "limites"], ["OpenTelemetry Agents", "Java agent", "Node SDK", "Python distro"], "OTEL_SERVICE_NAME=checkout\\nOTEL_EXPORTER_OTLP_ENDPOINT=http://collector:4317", "Comece com auto-instrumentação para obter baseline e complemente apenas os fluxos de negócio que faltarem.", "Instrumentação Manual", "https://opentelemetry.io/docs/zero-code/", "https://opentelemetry.io/docs/"],
  "Instrumentação Manual": ["pleno", "Instrumentação manual cria spans e métricas para operações de negócio que bibliotecas genéricas não conhecem.", ["spans", "atributos", "status", "exceptions", "lifecycle"], ["OpenTelemetry API", "OTLP", "Collector"], "const span = tracer.startSpan('reserve_inventory');\\nspan.setAttribute('order.id', orderId);\\nspan.end();", "Um span manual em checkout, pagamento ou envio explica valor de negócio além da infraestrutura.", "Context Propagation", "https://opentelemetry.io/docs/concepts/instrumentation/manual/", "https://opentelemetry.io/docs/concepts/signals/traces/"],
  "Context Propagation": ["pleno", "Context propagation carrega identidade da requisição entre processos, threads, filas e serviços.", ["traceparent", "baggage", "inject", "extract", "async context"], ["W3C Trace Context", "OpenTelemetry Context", "Propagators"], "propagator.inject(carrier);\\nclient.send(headers=carrier)", "Sem propagação, o trace termina no primeiro serviço e a investigação distribuída perde continuidade.", "Semantic Conventions", "https://opentelemetry.io/docs/concepts/context-propagation/", "https://www.w3.org/TR/trace-context/"],
  "Semantic Conventions": ["pleno", "Semantic conventions padronizam nomes e atributos para que sinais de serviços diferentes sejam comparáveis.", ["service.name", "HTTP attributes", "database attributes", "span kind"], ["OpenTelemetry", "OTel schemas", "OTLP"], "span.setAttribute('http.request.method', 'GET')", "A convenção permite dashboards e consultas reutilizáveis entre linguagens e equipes.", "Spans & Atributos", "https://opentelemetry.io/docs/concepts/semantic-conventions/", "https://github.com/open-telemetry/semantic-conventions"],
  "Exemplars": ["pleno", "Exemplars conectam uma amostra de métrica a um trace, permitindo sair de um percentil diretamente para uma requisição.", ["histograms", "trace_id", "Prometheus", "Grafana links"], ["Prometheus", "Grafana", "OpenTelemetry"], "http_request_duration_seconds_bucket{le='0.5'} # {trace_id='abc123'}", "Ao investigar p99, um exemplar aponta para o trace lento que explica o pico.", "Spans & Atributos", "https://prometheus.io/docs/prometheus/latest/feature_flags/", "https://grafana.com/docs/grafana/latest/fundamentals/exemplars/"],
  "Spans & Atributos": ["pleno", "Spans representam operações; atributos, eventos e status registram contexto suficiente para investigação.", ["span kind", "attributes", "events", "status", "links"], ["OpenTelemetry API", "OTLP", "Jaeger", "Tempo"], "span.setAttribute('db.system', 'postgresql');\\nspan.recordException(error);", "Atributos de rota, banco e resultado tornam um trace pesquisável sem registrar payload sensível.", "Sampling Strategies", "https://opentelemetry.io/docs/concepts/signals/traces/", "https://opentelemetry.io/docs/concepts/semantic-conventions/"],
  "Sampling Strategies": ["senior", "Sampling controla quanto tracing é armazenado, equilibrando custo, investigação e cobertura.", ["head sampling", "tail sampling", "probability", "errors", "latency"], ["OpenTelemetry Collector", "Tempo", "Jaeger"], "sample 100% errors; sample 10% successful requests", "A estratégia deve preservar erros, traces lentos e fluxos críticos mesmo sob volume alto.", "Tail-based Sampling", "https://opentelemetry.io/docs/concepts/sampling/", "https://opentelemetry.io/docs/collector/"],
  "Tail-based Sampling": ["senior", "Tail sampling decide após observar o trace completo, podendo selecionar erros, latência alta ou atributos específicos.", ["decision wait", "policies", "memory", "late spans"], ["OTel tail_sampling processor", "Tempo", "Collector"], "processors:\\n  tail_sampling:\\n    policies:\\n      - name: errors\\n        type: status_code", "Tail sampling melhora a qualidade dos traces retidos, mas exige memória, timeout e monitoramento do collector.", "Profiling Contínuo", "https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/tailsamplingprocessor", "https://opentelemetry.io/docs/concepts/sampling/"],
  "Profiling Contínuo": ["senior", "Profiling contínuo mostra onde CPU, memória e bloqueios são consumidos sem depender apenas de métricas agregadas.", ["CPU profiles", "heap", "flame graph", "overhead"], ["Pyroscope", "Parca", "pprof", "async-profiler"], "go tool pprof http://localhost:6060/debug/pprof/profile", "O perfil revela uma função quente que métricas de endpoint não conseguem explicar.", "Pyroscope", "https://grafana.com/docs/pyroscope/latest/", "https://www.brendangregg.com/flamegraphs.html"],
  "Pyroscope": ["senior", "Pyroscope armazena e consulta perfis contínuos, correlacionando custo de CPU e memória com serviços e versões.", ["profiles", "flame graphs", "labels", "diff", "retention"], ["Grafana Pyroscope", "eBPF", "pprof", "OTel"], "pyroscope analyze --service checkout --profile cpu", "Comparar perfis antes e depois de um deploy torna regressões de CPU mensuráveis.", "Performance Debugging", "https://grafana.com/docs/pyroscope/latest/", "https://github.com/grafana/pyroscope"],
  "Performance Debugging": ["senior", "Performance debugging combina métricas, traces, logs, profiles e testes para localizar gargalos.", ["latência", "CPU", "I/O", "locks", "regressão"], ["pprof", "perf", "Grafana", "OpenTelemetry"], "perf record -F 99 -p $PID -g -- sleep 30\\nperf script | flamegraph.pl", "O caminho mais rápido é formular hipótese, medir, alterar uma variável e comparar.", "Database Observability", "https://www.brendangregg.com/linuxperf.html", "https://opentelemetry.io/docs/"],
  "Database Observability": ["senior", "Observabilidade de banco acompanha consultas, locks, conexões, cache, replicação e saturação.", ["query latency", "slow queries", "locks", "connections", "replication lag"], ["pg_stat_statements", "MySQL Performance Schema", "database exporters", "Grafana"], "SELECT query, calls, mean_exec_time FROM pg_stat_statements ORDER BY mean_exec_time DESC LIMIT 10;", "Correlacionar trace, query e plano de execução diferencia problema da aplicação de problema do banco.", "Async & Queue Observability", "https://opentelemetry.io/docs/concepts/semantic-conventions/database/", "https://github.com/prometheus-community/postgres_exporter"],
  "Async & Queue Observability": ["senior", "Filas exigem observar backlog, idade da mensagem, throughput, retries, dead letters e tempo de processamento.", ["queue depth", "consumer lag", "ack", "retry", "DLQ"], ["OpenTelemetry", "Kafka Exporter", "RabbitMQ metrics", "Prometheus"], "queue_age_seconds = now - message.enqueued_at", "Uma fila pode estar disponível e ainda assim atrasar pedidos por crescimento de backlog.", "gRPC Observability", "https://opentelemetry.io/docs/concepts/signals/traces/", "https://opentelemetry.io/docs/concepts/semantic-conventions/messaging/"],
  "gRPC Observability": ["senior", "gRPC observability cobre RPCs, status, deadlines, retries, streams e tamanho de mensagens.", ["RPC status", "deadlines", "metadata", "streaming", "interceptors"], ["gRPC interceptors", "OpenTelemetry", "Prometheus", "grpc_health_probe"], "grpcurl -v api.example.com:443 list", "Deadlines e status grpc permitem separar falha de aplicação, rede e dependência.", "Service Mesh Tracing", "https://grpc.io/docs/guides/observability/", "https://opentelemetry.io/docs/languages/java/instrumentation/"],
  "Service Mesh Tracing": ["senior", "Service mesh tracing observa chamadas entre serviços com proxies, propagação e políticas de tráfego.", ["sidecar", "Envoy", "mTLS", "trace context", "sampling"], ["Istio", "Linkerd", "Envoy", "OpenTelemetry"], "istioctl dashboard envoy deploy/checkout", "O mesh mostra dependências que não aparecem no código de um único serviço.", "Error Tracking", "https://istio.io/latest/docs/tasks/observability/distributed-tracing/", "https://linkerd.io/2.16/features/observability/"],
  "Error Tracking": ["senior", "Error tracking agrupa exceções, stack traces, versões e contexto de usuário para priorizar falhas de aplicação.", ["exception grouping", "stack trace", "release", "breadcrumbs", "PII"], ["Sentry", "OpenTelemetry", "Bugsnag", "Rollbar"], "Sentry.captureException(error, { tags: { release: VERSION } })", "Agrupar a mesma exceção por release evita milhares de alertas para uma única regressão.", "SLO Alerting", "https://docs.sentry.io/", "https://opentelemetry.io/docs/specs/otel/trace/api/"],
  "SLO Alerting": ["senior", "SLO alerting usa burn rate e error budget para acordar o time quando a confiabilidade está em risco.", ["SLI", "SLO", "error budget", "burn rate", "multi-window"], ["Prometheus", "Sloth", "Pyrra", "Alertmanager"], "alert if error_budget_burn_rate_1h > 14.4 for 5m", "Alertar no consumo do budget reduz ruído de thresholds pontuais e conecta operação ao contrato de serviço.", "OTel Custom Exporters", "https://sre.google/workbook/alerting-on-slos/", "https://sloth.slok.dev/"],
  "OTel Custom Exporters": ["especialista", "Exporters customizados enviam sinais para um backend ou protocolo que não possui componente pronto.", ["exporterhelper", "retry", "queue", "timeout", "backpressure"], ["OTel Collector", "Go", "OTLP", "Go SDK"], "type Exporter struct { client *http.Client }\\nfunc (e *Exporter) ConsumeTraces(ctx context.Context, td ptrace.Traces) error", "Um exporter deve tratar falhas transitórias e nunca bloquear indefinidamente o pipeline.", "OTel Custom Processors", "https://opentelemetry.io/docs/collector/building/custom-components/", "https://github.com/open-telemetry/opentelemetry-collector"],
  "OTel Custom Processors": ["especialista", "Processors customizados filtram, enriquecem ou transformam telemetria dentro do pipeline.", ["transformação", "filter", "batch", "config", "testes"], ["OTel Collector", "Go", "OTTL", "unit tests"], "func (p *processor) process(ctx context.Context, td ptrace.Traces) (ptrace.Traces, error)", "Centralizar uma regra de enriquecimento evita duplicação em dezenas de serviços.", "Custom Semantic Conventions", "https://opentelemetry.io/docs/collector/building/processor/", "https://github.com/open-telemetry/opentelemetry-collector-contrib"],
  "Custom Semantic Conventions": ["especialista", "Convenções internas devem complementar, não contradizer, atributos semânticos oficiais.", ["namespace", "versioning", "schema", "ownership", "compatibility"], ["OpenTelemetry schemas", "JSON Schema", "RFC", "linters"], "checkout.payment.method = 'pix'\\ncheckout.order.type = 'subscription'", "Um vocabulário de domínio consistente torna consultas entre equipes possíveis.", "Baggage & Custom Context", "https://opentelemetry.io/docs/concepts/semantic-conventions/", "https://github.com/open-telemetry/semantic-conventions"],
  "Baggage & Custom Context": ["especialista", "Baggage propaga contexto adicional, mas deve ser pequeno, não sensível e controlado para não aumentar custo ou risco.", ["baggage", "propagation", "tenant", "correlation", "privacy"], ["W3C Baggage", "OpenTelemetry", "W3C Trace Context"], "baggage: tenant.id=acme\\ntraceparent: 00-...", "Contexto de tenant pode ajudar a correlacionar uma transação, desde que não carregue PII ou segredos.", "AI/LLM Observability", "https://www.w3.org/TR/baggage/", "https://opentelemetry.io/docs/concepts/context-propagation/"],
  "AI/LLM Observability": ["especialista", "LLM observability acompanha latência, tokens, custo, modelo, qualidade, segurança e contexto de cada chamada.", ["tokens", "prompt", "completion", "latência", "custo", "evals"], ["OpenTelemetry", "OpenLLMetry", "Langfuse", "Phoenix"], "span.setAttribute('gen_ai.response.id', response.id);\\nspan.setAttribute('gen_ai.usage.output_tokens', usage.output)", "Um trace de uma requisição de IA deve permitir explicar custo e qualidade sem armazenar prompts sensíveis por padrão.", "Observabilidade de Agentes IA", "https://opentelemetry.io/docs/semconv/gen-ai/", "https://github.com/traceloop/openllmetry"],
  "Observabilidade de Agentes IA": ["especialista", "Agentes exigem observar chamadas de ferramentas, loops, decisões, memória, custo e resultados intermediários.", ["agent runs", "tool calls", "handoffs", "evaluations", "guardrails"], ["OpenTelemetry", "Langfuse", "LangSmith", "Arize Phoenix"], "agent.span('tool_call', { tool: 'search', input_hash: hash(input) })", "A árvore de spans mostra por que um agente demorou, gastou tokens ou escolheu uma ferramenta inadequada.", "Frontend Observability", "https://opentelemetry.io/docs/semconv/gen-ai/", "https://langfuse.com/docs"],
  "Frontend Observability": ["especialista", "Frontend observability conecta erros JavaScript, performance web, navegação e experiência real aos serviços backend.", ["LCP", "CLS", "INP", "JS errors", "navigation"], ["OpenTelemetry Web", "Sentry", "Grafana Faro", "Browser DevTools"], "performance.mark('checkout-start');\\nperformance.measure('checkout', 'checkout-start');", "A correlação de session, route e trace mostra se uma tela lenta vem do browser ou da API.", "RUM (Real User Monitoring)", "https://opentelemetry.io/docs/languages/js/getting-started/browser/", "https://grafana.com/docs/grafana-cloud/monitor-applications/frontend-observability/"],
  "RUM (Real User Monitoring)": ["especialista", "RUM coleta sinais reais de navegadores e dispositivos para medir a experiência efetivamente vivida pelos usuários.", ["sessions", "Web Vitals", "errors", "geography", "sampling"], ["Grafana Faro", "Sentry", "OpenTelemetry Web", "GA4"], "faro.api.pushLog(['checkout_loaded']);", "RUM revela impacto por navegador, região e versão que testes sintéticos não capturam.", "Synthetic Monitoring", "https://grafana.com/docs/grafana-cloud/monitor-applications/frontend-observability/", "https://web.dev/articles/vitals"],
  "Synthetic Monitoring": ["especialista", "Synthetic monitoring executa jornadas controladas para detectar indisponibilidade antes de usuários reais reportarem.", ["probes", "journeys", "assertions", "locations", "frequency"], ["Grafana k6", "Playwright", "Blackbox Exporter", "Checkly"], "k6 run checkout-smoke.js", "Uma jornada sintética de login e checkout detecta regressão mesmo sem tráfego real.", "Chaos Engineering", "https://grafana.com/docs/k6/latest/", "https://playwright.dev/docs/test-intro"],
  "FinOps de Instrumentação": ["especialista", "FinOps de instrumentação controla custo de spans, métricas, logs, storage e processamento sem perder sinais críticos.", ["cardinality", "sampling", "retention", "ingestion", "unit cost"], ["OpenTelemetry Collector", "Grafana Cloud", "Mimir", "Loki"], "drop attributes where key matches 'user.email'; sample success traces at 10%", "O custo deve ser atribuído ao serviço e comparado ao valor de investigação e risco reduzido.", "Benchmark de Overhead", "https://www.finops.org/framework/", "https://opentelemetry.io/docs/concepts/sampling/"],
  "Benchmark de Overhead": ["especialista", "Benchmark mede CPU, memória, latência e throughput antes e depois da instrumentação.", ["baseline", "load test", "p50/p99", "CPU", "memory"], ["k6", "JMeter", "async-profiler", "pprof"], "k6 run --vus 50 --duration 60s api-load.js", "Uma decisão de instrumentação precisa mostrar custo incremental e valor dos sinais coletados.", "Arquitetura de Telemetria", "https://grafana.com/docs/k6/latest/testing-guides/benchmarking/", "https://opentelemetry.io/docs/concepts/observability-primer/"],
  "Arquitetura de Telemetria": ["staff", "Arquitetura define onde sinais nascem, como são transportados, processados, armazenados e consultados.", ["signals", "topology", "collector", "backends", "failure modes"], ["OpenTelemetry", "Collector", "Grafana LGTM", "Kubernetes"], "application -> agent -> gateway -> backend -> dashboard", "Uma arquitetura explícita evita agentes duplicados, caminhos sem ownership e perda silenciosa de telemetria.", "Observability Strategy", "https://opentelemetry.io/docs/collector/deployment/", "https://github.com/cncf/sig-observability/blob/main/whitepaper.md"],
  "Observability Strategy": ["staff", "Estratégia conecta objetivos de negócio, riscos, personas, sinais, SLOs e evolução da plataforma.", ["personas", "journeys", "SLOs", "maturity", "governance"], ["SRE Workbook", "OpenTelemetry", "FinOps", "RFCs"], "strategy: user_journey -> SLI -> telemetry -> action", "Uma estratégia boa define o que não coletar e como saber se a observabilidade melhorou decisões.", "Internal Developer Platform", "https://sre.google/workbook/table-of-contents/", "https://opentelemetry.io/docs/concepts/observability-primer/"],
  "Internal Developer Platform": ["staff", "IDP oferece caminhos self-service para criar serviços já com telemetria, dashboards, alertas e ownership.", ["golden path", "templates", "self-service", "platform SLO", "developer experience"], ["Backstage", "Crossplane", "Argo CD", "OpenTelemetry Operator"], "backstage create --template observability-service", "O time de produto recebe uma base observável sem conhecer todos os detalhes da plataforma.", "Instrumentação como Padrão", "https://backstage.io/docs/", "https://tag-app-delivery.cncf.io/whitepapers/platform-eng/"],
  "Instrumentação como Padrão": ["staff", "Instrumentação como padrão define defaults, bibliotecas suportadas e critérios mínimos para cada serviço.", ["defaults", "libraries", "service ownership", "quality gates", "adoption"], ["OpenTelemetry", "templates", "linters", "CI/CD"], "service.template -> logs + metrics + traces + owner + SLO", "O padrão reduz decisões repetidas e cria uma linha de base comparável entre times.", "Golden Paths para Devs", "https://opentelemetry.io/docs/", "https://opentelemetry.io/docs/concepts/semantic-conventions/"],
  "Golden Paths para Devs": ["staff", "Golden paths são caminhos suportados e opinativos para instrumentar, testar e operar serviços.", ["templates", "defaults", "escape hatch", "documentation", "support"], ["Backstage", "Cookiecutter", "Helm", "GitHub Actions"], "make new-service NAME=checkout LANGUAGE=java", "Um golden path reduz tempo de onboarding sem impedir casos avançados bem justificados.", "RFC & ADR de Observabilidade", "https://backstage.io/docs/features/software-templates/", "https://tag-app-delivery.cncf.io/whitepapers/platform-eng/"],
  "RFC & ADR de Observabilidade": ["staff", "RFCs e ADRs registram decisões, alternativas e consequências de padrões de instrumentação.", ["context", "decision", "alternatives", "consequences", "review"], ["Markdown", "Git", "ADR", "GitHub Discussions"], "status: accepted\\ncontext: trace backend\\ndecision: OTLP + Tempo", "Registrar por que uma decisão foi tomada evita reabrir debates e torna custos futuros visíveis.", "Mentoria & Code Review", "https://adr.github.io/", "https://www.rfc-editor.org/rfc/rfc2119"],
  "Mentoria & Code Review": ["staff", "Mentoria e code review disseminam práticas de instrumentação, segurança e operação dentro do time.", ["feedback", "checklists", "pairing", "ownership", "learning"], ["GitHub Reviews", "runbooks", "ADRs", "workshops"], "review: correlation_id?; secret_leak?; cardinality?; test?", "Uma revisão consistente previne logs sensíveis, labels explosivos e traces sem contexto antes do deploy.", "Capacitação de Times", "https://google.github.io/eng-practices/review/", "https://opentelemetry.io/docs/concepts/semantic-conventions/"],
  "Capacitação de Times": ["staff", "Capacitação transforma conhecimento de ferramentas em hábitos de investigação e decisões operacionais.", ["curriculum", "labs", "incident drills", "office hours", "feedback"], ["Labs", "runbooks", "GameDays", "SRE Workbook"], "lab: inject_error -> find_trace -> correlate_log -> write_postmortem", "Times treinados reduzem tempo de diagnóstico e dependência de uma única pessoa especialista.", "OTel Governance", "https://sre.google/workbook/table-of-contents/", "https://opentelemetry.io/docs/"],
  "OTel Governance": ["staff", "Governança OTel define versões, convenções, ownership, suporte, privacidade e política de evolução.", ["standards", "versioning", "schemas", "security", "lifecycle"], ["OpenTelemetry", "RFCs", "OpenLineage", "policy as code"], "supported_sdk_versions: java=2.x; python=1.x", "Governança evita deriva entre SDKs e garante que sinais possam ser consultados de forma consistente.", "Roadmap Técnico de O11y", "https://opentelemetry.io/docs/specs/otel/", "https://opentelemetry.io/docs/concepts/semantic-conventions/"],
  "Roadmap Técnico de O11y": ["staff", "Roadmap técnico organiza maturidade, migrações, riscos, investimento e resultados de observabilidade.", ["maturity", "milestones", "dependencies", "risks", "outcomes"], ["SRE Workbook", "RFC", "ADR", "FinOps"], "Q1: baseline; Q2: correlation; Q3: scale; Q4: governance", "Cada iniciativa deve ligar uma capacidade técnica a um problema de usuário ou operação.", "OTel Java / Spring Boot", "https://sre.google/workbook/table-of-contents/", "https://opentelemetry.io/docs/"],
  "OTel Java / Spring Boot": ["linguagem", "Instrumente aplicações Spring com agent ou starter, mantendo contexto em HTTP, JDBC, messaging e executors.", ["Java agent", "Spring Boot starter", "MDC", "JDBC", "Micrometer"], ["OpenTelemetry Java", "Spring Boot", "Micrometer", "OTLP"], "java -javaagent:opentelemetry-javaagent.jar -jar app.jar", "O agent oferece baseline rápido; spans manuais devem cobrir regras de negócio específicas.", "OTel Python / FastAPI / Flask", "https://opentelemetry.io/docs/languages/java/", "https://opentelemetry.io/docs/zero-code/java/agent/"],
  "OTel Python / FastAPI / Flask": ["linguagem", "Python pode combinar auto-instrumentação com middleware e spans manuais em rotas, tarefas e clientes.", ["middleware", "asyncio", "contextvars", "SQLAlchemy", "requests"], ["OpenTelemetry Python", "FastAPI", "Flask", "OTLP"], "opentelemetry-instrument uvicorn app:app", "Contextvars preserva correlação em código assíncrono quando a instrumentação é configurada corretamente.", "OTel Node.js / Express / NestJS", "https://opentelemetry.io/docs/languages/python/", "https://opentelemetry.io/docs/zero-code/python/"],
  "OTel Node.js / Express / NestJS": ["linguagem", "Node.js instrumenta HTTP, Express, Nest, bancos e promises preservando contexto assíncrono.", ["NodeSDK", "auto-instrumentations", "AsyncLocalStorage", "Express", "NestJS"], ["OpenTelemetry JS", "Express", "NestJS", "OTLP"], "node --require ./instrumentation.js server.js", "Inicialize o SDK antes dos módulos da aplicação para que as bibliotecas sejam instrumentadas.", "OTel Go / Gin / Fiber", "https://opentelemetry.io/docs/languages/js/", "https://opentelemetry.io/docs/zero-code/js/"],
  "OTel Go / Gin / Fiber": ["linguagem", "Go usa context.Context para transportar contexto e middlewares para instrumentar HTTP, gRPC e bancos.", ["context.Context", "middleware", "goroutines", "http", "gRPC"], ["OpenTelemetry Go", "Gin", "Fiber", "OTLP"], "ctx, span := tracer.Start(ctx, 'checkout'); defer span.End()", "Propagar context em cada chamada evita perder o trace ao trocar de goroutine ou camada.", "OTel .NET / ASP.NET", "https://opentelemetry.io/docs/languages/go/", "https://opentelemetry.io/docs/languages/go/instrumentation/"],
  "OTel .NET / ASP.NET": ["linguagem", ".NET usa ActivitySource, DiagnosticSource e instrumentação ASP.NET para correlacionar requests e dependências.", ["ActivitySource", "Activity", "ASP.NET", "HttpClient", "ILogger"], ["OpenTelemetry .NET", "ASP.NET Core", "NuGet", "OTLP"], "using var activity = source.StartActivity('checkout');", "Configure exporters e resource attributes no startup e evite criar ActivitySource sem listener.", "OTel PHP", "https://opentelemetry.io/docs/languages/net/", "https://opentelemetry.io/docs/zero-code/net/"],
  "OTel PHP": ["linguagem", "PHP instrumenta requests e frameworks por extensão, SDK e integrações de bibliotecas.", ["extension", "autoload", "PSR", "Laravel", "Symfony"], ["OpenTelemetry PHP", "Composer", "Laravel", "Symfony"], "OTEL_PHP_AUTOLOAD_ENABLED=true php -S localhost:8080", "Mantenha a extensão e o SDK compatíveis e valide o export em ambiente de teste.", "OTel Ruby / Rails", "https://opentelemetry.io/docs/languages/php/", "https://opentelemetry.io/docs/zero-code/php/"],
  "OTel Ruby / Rails": ["linguagem", "Ruby usa gems e middleware para instrumentar Rails, ActiveRecord, HTTP clients e jobs.", ["gems", "Rack", "ActiveRecord", "Sidekiq", "context"], ["OpenTelemetry Ruby", "Rails", "Sidekiq", "OTLP"], "bundle exec ruby -ropentelemetry/sdk app.rb", "Inicialize o SDK no boot da aplicação e valide contexto em jobs assíncronos.", "OTel Rust", "https://opentelemetry.io/docs/languages/ruby/", "https://github.com/open-telemetry/opentelemetry-ruby"],
  "OTel Rust": ["linguagem", "Rust instrumenta serviços com crates de tracing e OpenTelemetry, mantendo custo e segurança explícitos.", ["tracing", "spans", "tokio", "tower", "ownership"], ["OpenTelemetry Rust", "tracing", "Tokio", "OTLP"], "let span = tracer.start('checkout'); span.end();", "Combine tracing e OpenTelemetry com propagação em Tokio e cuidado com custo de atributos clonados.", "Arquitetura de Telemetria", "https://opentelemetry.io/docs/languages/rust/", "https://github.com/open-telemetry/opentelemetry-rust"]
};

Object.entries(DEVELOPER_TOPIC_PROFILES).forEach(([topicName, profile]) => {
  const [level, description, concepts, tools, code, realCase, nextStep, linkOne, linkTwo] = profile;
  const topic = window.TOPICS[topicName] ||= {};
  Object.assign(topic, {
    icon: topic.icon || "📘",
    level: level === "linguagem" ? "Linguagem" : level.charAt(0).toUpperCase() + level.slice(1),
    levelClass: level === "linguagem" ? "pleno" : level,
    description,
    concepts,
    tools,
    code,
    realCase,
    bestPractices: ["Comece com auto-instrumentação quando disponível", "Propague contexto sem dados sensíveis", "Meça custo e qualidade do sinal", "Teste em laboratório antes do deploy"],
    antiPatterns: ["Instrumentar cada linha sem hipótese", "Registrar secrets ou PII", "Ignorar cardinalidade e overhead"],
    prerequisites: ["O que é Observabilidade", "Logs", "Métricas", "Traces"],
    nextSteps: [nextStep, "Prática em laboratório", "Revisão de SLOs"],
    links: [{ label: linkOne.split('/')[2], url: linkOne }, { label: "Guia complementar", url: linkTwo }]
  });
});
