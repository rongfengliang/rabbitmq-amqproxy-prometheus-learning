FROM rabbitmq:3.8.5-management-alpine
RUN rabbitmq-plugins enable --offline rabbitmq_prometheus

