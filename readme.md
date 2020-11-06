
# How to Install

###### * Start minikube (Windows)
minikube start --cpus=4 --memory=16g --cni=flannel --mount-string=$PWD\src:/minikube-host --mount --v=5

###### Start istio
istioctl install -f .\istio\values.yaml

###### Create certificate secret for https
kubectl create -n istio-system secret tls arch-homework-tsl --key=./openssl/arch.homework.key --cert=./openssl/arch.homework.crt

###### Create namespaces
kubectl apply -f .\namespaces\namespace.yaml

###### Confige istio mtls
kubectl apply -f .\namespaces\istio-mtls.yaml

###### Start web https gateway
kubectl apply -f .\istio\gateway\https-gateway.yaml

###### Start gateway route
kubectl apply -f .\istio\gateway\gateway-route.yaml



###### Config auth on envoyfilter
kubectl apply -f .\istio\gateway\client-auth-filter.yaml


###### Start query-route
kubectl apply -f .\istio\query\query-route.yaml

###### Start command-route
kubectl apply -f .\istio\command\command-route.yaml



###### Start oauth2-proxy
helm install `
oauth2-proxy stable/oauth2-proxy `
-f .\authorization\oauth2-proxy\values.yaml `
--namespace authorization

###### Start kafka
helm install `
command-kafka bitnami/kafka `
-f .\kafka\values.yaml `
--namespace kafka

###### Start Profiles DB
helm install `
dbprofiles bitnami/postgresql `
-f .\database\db_profiles\values.yaml `
--namespace database

###### Start Billing DB
helm install `
dbbilling bitnami/postgresql `
-f .\database\db_billing\values.yaml `
--namespace database


###### Start authorization-profiles service
kubectl apply -f .\authorization\profiles\authorization-profiles.yaml

###### Start frontend service
kubectl apply -f .\frontend\frontend_service\frontend-service.yaml

###### Start query orchestrator service
kubectl apply -f .\backend\orchestrator\query-webclient-orchestrator.yaml

###### Start command producer service
kubectl apply -f .\backend\producer\command-webclient-producer.yaml

###### Start command saga service
kubectl apply -f .\backend\saga\saga.yaml

###### Start command profiles service
kubectl apply -f .\backend\command\profiles\command-profiles.yaml

###### Start command billing service
kubectl apply -f .\backend\command\billing\command-billing.yaml

###### Start query profiles service
kubectl apply -f .\backend\query\profiles\query-profiles.yaml

###### Start query billings service
kubectl apply -f .\backend\query\billing\query-billing.yaml




---
# Запуск

###### port-forward
kubectl port-forward -n istio-system service/istio-ingressgateway --address 0.0.0.0 80:80 --address 0.0.0.0 443:443

###### dashboard
istioctl dashboard kiali

---
# Описание

