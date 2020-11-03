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

kubectl run curl -n backend --image=radial/busyboxplus:curl -i --tty --rm

kubectl run --namespace cassandra cassandra-client --rm --tty -i --restart='Never' `
--env CASSANDRA_PASSWORD=qDJ6hK6MyN `
--image docker.io/bitnami/cassandra:3.11.8-debian-10-r0 `
-- bash 

kubectl cp cassandra/cassandra-0:opt/bitnami/cassandra/conf/ ./conf

kubectl apply -f .\cassandra\config.yaml 

kubectl delete configmap cassandra-config -n cassandra 

kubectl describe pod/cassandra-0 -n cassandra

helm delete command-kafka --namespace kafka


# ssl в ручную
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -subj '/CN=homework' -keyout ./openssl/homework.key -out ./openssl/homework.crt
openssl req -out ./openssl/arch.homework.csr -newkey rsa:2048 -nodes -keyout ./openssl/arch.homework.key -subj "/CN=arch.homework"
openssl x509 -req -days 365 -CA ./openssl/homework.crt -CAkey ./openssl/homework.key -set_serial 0 -in ./openssl/arch.homework.csr -out ./openssl/arch.homework.crt

kubectl create -n istio-system secret tls arch-homework-tsl --key=./openssl/arch.homework.key --cert=./openssl/arch.homework.crt


curl --head -H Host:arch.homework --resolve "arch.homework:8000:arch.homework" --cacert ./openssl/arch.homework.crt "https://arch.homework:8000"  