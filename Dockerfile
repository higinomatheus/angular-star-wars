# Estágio 1: Build da aplicação Angular
# Usando a versão 22 do Node.js para alinhar com o ambiente de desenvolvimento local.
FROM node:22-alpine AS build

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o package.json e package-lock.json para aproveitar o cache do Docker
COPY package*.json ./

# Instala as dependências de forma otimizada para CI/CD
RUN npm ci

# Copia o restante do código-fonte da aplicação
COPY . .

# Gera os arquivos de build para produção
# O nome do projeto 'angular-star-wars' é uma suposição.
# Ajuste se o nome do seu projeto no arquivo angular.json for diferente.
RUN npm run build -- --configuration production

# Estágio 2: Servir a aplicação com um servidor Nginx leve
FROM nginx:alpine

# Copia os artefatos de build para a pasta padrão do Nginx
COPY --from=build /app/dist/angular-star-wars/browser/ /usr/share/nginx/html

# Adiciona a configuração customizada do Nginx para lidar com o roteamento do Angular
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80 para acesso externo
EXPOSE 80
