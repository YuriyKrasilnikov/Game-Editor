# Всякое
## Create symbolic link for windows
new-item -itemtype symboliclink -path <path to location> -name <the name> -value <path to target>
или
cmd /c mklink /D <path of link> <path of target dir>

cmd /c mklink /D .\authorization\profiles\src ..\..\src\authorization\profiles\src

cmd /c mklink /D .\backend\command\billing\src ..\..\..\src\backend\command\billing\src
cmd /c mklink /D .\backend\command\charts\src ..\..\..\src\backend\command\charts\src
cmd /c mklink /D .\backend\command\profiles\src ..\..\..\src\backend\command\profiles\src

cmd /c mklink /D .\backend\orchestrator\src ..\..\src\backend\orchestrator\src

cmd /c mklink /D .\backend\producer\src ..\..\src\backend\producer\src

cmd /c mklink /D .\backend\query\billing\src ..\..\..\src\backend\query\billing\src
cmd /c mklink /D .\backend\query\charts\src ..\..\..\src\backend\query\charts\src
cmd /c mklink /D .\backend\query\profiles\src ..\..\..\src\backend\query\profiles\src

cmd /c mklink /D .\backend\saga\src ..\..\src\backend\saga\src

cmd /c mklink /D .\frontend\frontend_service\src ..\..\src\frontend\frontend_service\src
cmd /c mklink /D .\frontend\frontend_service\public ..\..\src\frontend\frontend_service\public

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

helm delete dbcharts --namespace database


# ssl в ручную
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -subj '/CN=gamescreator.co' -keyout ./openssl/gamescreator.co.key -out ./openssl/gamescreator.co.crt

kubectl create -n istio-system secret tls gamescreator-tsl --key=./openssl/gamescreator.co.key --cert=./openssl/gamescreator.co.crt



openssl req -out ./openssl/editor.gamescreator.co.csr -newkey rsa:2048 -nodes -keyout ./openssl/editor.gamescreator.co.key -subj "/CN=editor.gamescreator.co"
openssl x509 -req -days 365 -CA ./openssl/gamescreator.co.crt -CAkey ./openssl/gamescreator.co.key -set_serial 0 -in ./openssl/editor.gamescreator.co.csr -out ./openssl/editor.gamescreator.co.crt
kubectl create -n istio-system secret tls editor-gamescreator-tsl --key=./openssl/editor.gamescreator.co.key --cert=./openssl/editor.gamescreator.co.crt

curl --head -H Host:gamescreator.co --resolve "gamescreator.co:8000:gamescreator.co" --cacert ./openssl/gamescreator.co.crt "https://gamescreator.co:80"  


