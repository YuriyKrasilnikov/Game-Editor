helm repo add stable https://kubernetes-charts.storage.googleapis.com/
helm repo add k8s-at-home https://k8s-at-home.com/charts/
helm repo update

helm install `
oauth2-proxy k8s-at-home/oauth2-proxy `
-f authorization/oauth2-proxy/values.yaml `
--namespace authorization