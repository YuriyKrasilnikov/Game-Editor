
# How to Install

###### 1. start minikube (Windows)
minikube start `
--cpus=4 --memory=16g `
--network-plugin=cni `
--cni=flannel `
--mount-string=$PWD\src:/minikube-host --mount `
--v=5

###### 2. install istio
istioctl install -f .\istio\values.yaml

###### 3. create certificate secret for https
kubectl create -n istio-system secret tls arch-homework-tsl --key=./openssl/arch.homework.key --cert=./openssl/arch.homework.crt

###### 4. create namespaces
kubectl apply -f .\namespaces\namespace.yaml

###### 5. confige istio mtls
kubectl apply -f .\istio\mtls.yaml

###### 6. install auth proxy
helm install `
oauth2-proxy stable/oauth2-proxy `
-f oauth2-proxy/values.yaml `
--namespace oauth2

###### 7. add EnvoyFilter
kubectl apply -f .\istio\envoyfilter.yaml

###### 8. create config for cassandra
kubectl apply -f .\cassandra\config.yaml 

###### 9. install cassandra
helm install `
cassandra bitnami/cassandra `
-f cassandra/values.yaml `
--namespace cassandra

###### 10. install frontend
kubectl apply -f .\dev\frontend-grpc.yaml

###### 11. install backend
kubectl apply -f .\dev\backend-grpc.yaml

###### 12. proxy
kubectl apply -f .\istio\proxy.yaml


###### 13. port-forward
kubectl port-forward -n istio-system service/istio-ingressgateway --address 0.0.0.0 80:80 --address 0.0.0.0 443:443

###### 14. dashboard
istioctl dashboard kiali


---

# Всякое
## Create symbolic link for windows
new-item -itemtype symboliclink -path <path to location> -name <the name> -value <path to target>

## curl
kubectl exec $pod -c istio-proxy -n development -- curl $host

## minikube ssh driver=hyperv
ssh docker@$(minikube ip)

### The default login minikube:
username: docker
password: tcuser 

## restart minikube
minikube start `
--network-plugin=cni `
--cni=flannel `
--extra-config=apiserver.enable-admission-plugins=NamespaceLifecycle,LimitRanger,ServiceAccount,DefaultStorageClass,DefaultTolerationSeconds,NodeRestriction,MutatingAdmissionWebhook,ValidatingAdmissionWebhook,ResourceQuota,PodPreset `
--extra-config=apiserver.authorization-mode=Node,RBAC `
--mount-string=$PWD\src:/minikube-host --mount


---

# не разобранное
helm delete cassandra -n cassandra

kubectl delete pod/cassandra-client -n cassandra


kubectl run --namespace cassandra cassandra-client --rm --tty -i --restart='Never' `
--env CASSANDRA_PASSWORD=qDJ6hK6MyN `
--image docker.io/bitnami/cassandra:3.11.8-debian-10-r0 `
-- bash 


kubectl cp cassandra/cassandra-0:opt/bitnami/cassandra/conf/ ./conf

kubectl apply -f .\cassandra\config.yaml 

kubectl delete configmap cassandra-config -n cassandra 

kubectl describe pod/cassandra-0 -n cassandra

# ssl в ручную
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -subj '/CN=homework' -keyout ./openssl/homework.key -out ./openssl/homework.crt
openssl req -out ./openssl/arch.homework.csr -newkey rsa:2048 -nodes -keyout ./openssl/arch.homework.key -subj "/CN=arch.homework"
openssl x509 -req -days 365 -CA ./openssl/homework.crt -CAkey ./openssl/homework.key -set_serial 0 -in ./openssl/arch.homework.csr -out ./openssl/arch.homework.crt

kubectl create -n istio-system secret tls arch-homework-tsl --key=./openssl/arch.homework.key --cert=./openssl/arch.homework.crt


curl --head -H Host:arch.homework --resolve "arch.homework:8000:arch.homework" --cacert ./openssl/arch.homework.crt "https://arch.homework:8000"  

