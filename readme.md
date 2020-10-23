
# How to Install

###### 1. Start minikube (Windows)
minikube start --cpus=4 --memory=16g --network-plugin=cni --cni=flannel --mount-string=$PWD\src:/minikube-host --mount --v=5

###### 2. Start istio
istioctl install -f .\istio\values.yaml

###### 3. Create certificate secret for https
kubectl create -n istio-system secret tls arch-homework-tsl --key=./openssl/arch.homework.key --cert=./openssl/arch.homework.crt

###### 4. Create namespaces
kubectl apply -f .\namespaces\namespace.yaml

###### 5. Confige istio mtls
kubectl apply -f .\namespaces\istio-mtls.yaml

###### 6. Start Profiles DB
helm install `
dbprofiles bitnami/postgresql `
-f .\backend\db_profiles\values.yaml `
--namespace backend

###### 7. Start Records DB
helm install `
dbrecords bitnami/postgresql `
-f .\backend\db_records\values.yaml `
--namespace backend

###### 8. Start oauth2-proxy
helm install `
oauth2-proxy stable/oauth2-proxy `
-f .\authorization\oauth2-proxy\values.yaml `
--namespace authorization

###### 9. Start authorization-profiles service
kubectl apply -f .\authorization\profiles\authorization-profiles.yaml

###### 10. Start profiles service
kubectl apply -f .\backend\profiles\profiles.yaml

###### 11. Start records service
kubectl apply -f .\backend\records\records.yaml  

###### 12. start orchestrator service
kubectl apply -f .\backend\orchestrator\orchestrator.yaml

###### 13. start frontend service
kubectl apply -f .\frontend_service\frontend.yaml

###### 14. start proxy
kubectl apply -f .\istio\proxy.yaml

###### 15. config auth on envoyfilter
kubectl apply -f .\istio\envoyfilter_auth.yaml



---
# Запуск

###### port-forward
kubectl port-forward -n istio-system service/istio-ingressgateway --address 0.0.0.0 80:80 --address 0.0.0.0 443:443

###### dashboard
istioctl dashboard kiali

---
# Описание

