helm install `
redis bitnami/redis `
-f oauth2-proxy/redis/values.yaml `
--namespace oauth2