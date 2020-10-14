
# How to Install

###### 1. Start minikube (Windows)
minikube start `
--cpus=4 --memory=16g `
--network-plugin=cni `
--cni=flannel `
--mount-string=$PWD\src:/minikube-host --mount `
--v=5

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

###### 11. start frontend service
kubectl apply -f .\frontend_service\frontend.yaml

###### 12. start orchestrator service
kubectl apply -f .\backend\orchestrator\orchestrator.yaml

###### 13. start proxy
kubectl apply -f .\istio\proxy.yaml

###### 14. config auth on envoyfilter
kubectl apply -f .\istio\envoyfilter_auth.yaml



---

###### port-forward
kubectl port-forward -n istio-system service/istio-ingressgateway --address 0.0.0.0 80:80 --address 0.0.0.0 443:443

###### dashboard
istioctl dashboard kiali


---

# Всякое
## Create symbolic link for windows
new-item -itemtype symboliclink -path <path to location> -name <the name> -value <path to target>
или
cmd /c mklink /D <path of link> <path of target dir>

## curl
kubectl exec $pod -c istio-proxy -n development -- curl $host

## minikube ssh driver=hyperv
ssh docker@$(minikube ip)

### The default login minikube:
username: docker
password: tcuser 

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

