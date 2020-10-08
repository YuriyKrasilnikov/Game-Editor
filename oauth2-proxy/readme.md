helm repo add stable https://kubernetes-charts.storage.googleapis.com/
helm repo update

helm install `
oauth2-proxy stable/oauth2-proxy `
-f oauth2-proxy/values.yaml `
--namespace oauth2