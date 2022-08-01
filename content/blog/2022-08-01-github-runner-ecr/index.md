---
layout: post
title: "GitHub runner self-hosted + AWS ECR docker registry"
date: 2022-08-01 19:24:04 +0100
tags: ["Software"]
published: true
---

## 💾 Premessa

Da un paio di anni sto utilizzando il piano free tier di Gitlab nell'azienda in cui lavoro. Gitlab è diventato un prodotto molto completo e utile per un team di dev. Da un paio di mesi sul blog ufficiale è uscita questa notizia [https://about.gitlab.com/blog/2022/03/24/efficient-free-tier/](https://about.gitlab.com/blog/2022/03/24/efficient-free-tier/) che mette delle restrizioni sul numero di utenti per namespace. Questa limitazione che impatta meno del 2% dell'utenza ci ha posto davanti ad alcune considerazioni sui costi dello strumento e ci ha fatto optare nel provare altre strade.

Il post di oggi racconta questo percorso di migrazione dei progetti e dei processi di CI/CD da GitLab a GitHub + AWS ECR. Quest'ultima accoppiata è dettata dal fatto che produciamo stack di container per i nostri progetti e cerchiamo con questo approccio di migliorare i processi di DevOps.

## 💥 Obiettivo

Sfruttare al massimo i servizi gratuiti e self hosted per minimizzare i costi dei processi di CI/CD

## 🗒️ Occorrente

Per raggiungere il nostro obiettivo abbiamo fatto delle prove partendo da alcuni pezzi infrastrutturali. Non andrò nel dettaglio dando per scontato che alcuni aspetti sono ben documentati nelle reference ufficiali.

* Account AWS, utenza dedicata per scrittura su ECR: creazione di repository e pubblicazione di immagini docker.
* Macchina con installato un docker engine su cui eseguire i runner di github in modalità self-hosted.
* Account GitHub

## 🏃 Runner GitHub self hosted

Per prima cosa abbiamo predisposto un runner per eseguire le actions di github. La scelta è ricaduta su un'immagine custom [myoung34/docker-github-actions-runner](https://github.com/myoung34/docker-github-actions-runner).

Questa immagine ha il pregio di funzionare nelle diverse modalità: per repository, per organization e per enterprise. Nel nostro caso volendo rimanere nella fascia free tier abbiamo impostao il livello di organization. Il runner si auto registra attraverso un PAT: personal access token generato da un owner dell'organizzazione: [https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

Per poter eseguire in contemporanea un numero di runner maggiore a 1 è necessario scrivere un docker-compose con il numero di service voluti e di dedicare delle working directory diverse per runner. Abbiamo visto infatti che senza una persistenza sul host il meccanismo non sempre funzionava. Ecco un esempio di compose:

```yaml
version: '2.3'

services:
  runner:
    image: myoung34/github-runner:latest
    environment:
      ACCESS_TOKEN: [github personal access token]
      RUNNER_SCOPE: 'org'
      ORG_NAME: [your organization name]
      RUNNER_WORKDIR: /tmp/runner/work
      AWS_ACCESS_KEY_ID: [aws access key]
      AWS_SECRET_ACCESS_KEY: [aws secret]
    security_opt:
      # needed on SELinux systems to allow docker container to manage other docker containers
      - label:disable
    volumes:
      - '/var/run/docker.sock:/var/run/docker.sock'
      - '/tmp/runner:/tmp/runner'
```

Da notare che abbiamo aggiunto delle variabili di ambiente che utilizzeremo in seguito. ⚠️ Da notare che questo meccanismo che non sfrutta i secret di github (a pagamento) ha dei problemi di sicurezza.

## GitHub workflow

GitHub mette a disposizione l'esecuzione di job costituiti da step a seguito di alcuni eventi, come per esempio al push su un branch. Con questo meccanismo di workflow possiamo costruire la nostra CI/CD. I file descrittivi sono in formato YAML e vanno scritti nella cartella `.github/workflows`.

Una volta compilata la nostra immagine docker con una action specifica andiamo a pubblicare su AWS ECR. Per farlo abbiamo trovato utile utilizzare la seguente action [kciter/aws-ecr-action](https://github.com/kciter/aws-ecr-action). Per accedere ad AWS abbiamo bisogno di autenticarci con una secret key e senza usare i secret di github si può pensare di passare al container del runner le credenziali e poi iniettarle nella action con il metodo che segue. Riporto un esempio di un file yaml che esegue il checkout di un repository, ne fa un'immagine docker e la pubblica su ECR.

```yaml
name: Build and Publish

env:
  AWS_ACCOUNT_ID: [aws id number]
  AWS_REGION: [aws region]
  ECR_REPOSITORY: [base repository]

on:
  push:
    branches:
      - master

jobs:
  build-and-publish:
    runs-on: self-hosted
    steps:
      -
        name: Set AWS_ACCESS_KEY_ID
        run: echo "AWS_ACCESS_KEY_ID=$(echo $AWS_ACCESS_KEY_ID)" >> $GITHUB_ENV
      -
        name: Set AWS_SECRET_ACCESS_KEY
        run: echo "AWS_SECRET_ACCESS_KEY=$(echo $AWS_SECRET_ACCESS_KEY)" >> $GITHUB_ENV
      -
        name: Get branch name
        id: branch-name
        uses: tj-actions/branch-names@v5.2
      -
        name: Checkout source code
        uses: actions/checkout@v2
      -
        name: Build and push docker image to AWS ECR
        uses: kciter/aws-ecr-action@v4
        with:
          access_key_id: ${{ env.AWS_ACCESS_KEY_ID }}
          secret_access_key: ${{ env.AWS_SECRET_ACCESS_KEY }}
          account_id: ${{ env.AWS_ACCOUNT_ID }}
          repo: ${{ env.ECR_REPOSITORY }}/${{ steps.branch-name.outputs.current_branch }}
          region: ${{ env.AWS_REGION }}
          tags: latest,${{ github.sha }}
          create_repo: true
          dockerfile: ./docker/Dockerfile
          path: .
```

## Deploy

Una volta costruito il meccanismo di build e pubblicazione degli artefatti non ci resta che predisporre la macchina target per il deploy.

Per accedere al repository è necessario usare la AWS CLI in cascata con docker login.

```bash
aws ecr get-login-password | docker login --username AWS --password-stdin ***.dkr.ecr.eu-central-1.amazonaws.com
```

## Conclusione

Quello che ho descritto è una POC che potrebbe essere utilizzata per piccole realtà IT che vogliano contenere i costi degli strumenti di sviluppo. Personalmente credo che i soldi investiti per account di team su github o gitlab siano ben spesi.

In ogni caso ho imparato molto da questo esperimento.
