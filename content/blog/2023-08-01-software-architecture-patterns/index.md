---
layout: post
title: "Software Architecture Patterns (Mark Richards)"
date: 2023-08-01 19:24:04 +0100
tags: ["Libri"]
published: false
---
## 📚 Introduzione

Tra le letture tecniche che ho scelto quest'anno figura anche questa di Mark Richards. Mark è un software architect con quasi 30 di esperienza nell'industry ed in particolare 20 tra application architect, integration architect ed enterprise architect. In questo libro illustra in maniera semplice 5 delle architetture più facilmente ritrovabili nei progetti di tutti i giorni.  Il libro non va nei dettagli tecnici ma da un buon punto di inizio per poter scegliere quale strada perseguire a seconda del caso d'uso che abbiamo di fronte.

## 🚀 Cosa mi porto a casa da questa lettura

Mark descrive le principali architetture in auge in questo momento tra sistuazioni on-premise e in cloud. Un'applicazione senza un'architettura definita spesso ricade in quella che viene chiamata **big ball of mud** nella quale i componenti sono accoppiati, rigidi e con elevati costi per le modifiche. I pattern principali che l'autore propone sono 5:

1. Layered architecture
2. Event-driven architecture
3. Microkernel architecture
4. Microservices architecture
5. Space-based architecture

### Layered architecture  

Forse la più conosciuta e storica architettura, chiamata anche n-tier.  Si tratta di tagliare i componenti in **strati orizzontali** e per ogni strato incapsulare logiche di specifiche funzioni come ad esempio:

1. Presentation layer
2. Business layer
3. Persistence e database layer

Questa struttura ha il pregio di separare chiaramente i compiti di ogni livello. Robert Martin (Uncle Bob) propone anche di tagliare verticalmente l'architettura per casi d'uso.

Ci possono essere dei casi in cui uno strato è aperto oltre che agli strati adiacenti anche ad altri. Questo è il caso di livelli di servizio, con componenti condivisi. Ovvio che il rilassamento di questo vincolo porta ad accoppiamento monolitico dell'applicazione.

Questa architettura è una buona scelta iniziale, è general purpose e si adatta bene all'inizio. Le due considerazioni sono quelle di:

* non avere livelli asfittici, intesi come meri passa carte
* non accoppiare troppo i livelli per non creare un monolite

### Event-driven architecture  

L'architettura ad eventi è un pattern di **architettura asincrona distribuita** usata per applicazioni altamente scalabili. I componenti che processano gli eventi sono dei processori single-purpose. Esistono 2 principali topologie:

1. **Mediator**: usato per orchestrare step multipli. Il mediatore centrale riceve l'evento e ne genera altri per pilotare i singoli step. Si possono quindi identificare due eventi principali: l'evento iniziale e l'evento di processamento.
2. **Broker**: qui ogni processore può essere consumatore ed emettitore di eventi senza necessità di un mediatore centrale.

### Microkernel architecture  

L'architettura a microkernel o anche a plug-in è una pattern naturale per le applicazioni di prodotto. Può essere distribuita in pacchetti con versioni diverse ed inglobare codice di terze parti. L'idea alla base di questa architettura è quella di costruire:

* un kernel applicativo
* un registro dei plugin
* delle interfacce per registrare i plugin ed installarli nel microkernel
Un esempio è quello di Eclipse o di VSCode.

### Microservices architecture  

L'architettura  a microservizi è quella più in voga negli ultimi tempi perchè vuole superare i limiti di scalabilità dei monoliti a layer e dei pattern SOA, service oriented architecture. La sfida è quella di disegnare in maniere corretta questi microservizi, determinandone il giusto livello di granularità e senza necessitare di elementi di orchestrazione che appesantiscono l'architettura come avveniva per le architetture SOA.

Altro aspetto da tenere presente è la gestione delle transazioni distribuite su componenti diversi. Spesso per ottenere questo risultato sono necessarie prevedere delle operazioni compensative in caso di rollback logico.

Altri aspetti da considerare sono la governance dei contratti API, la gestione della mancata disponibilità dei servizi (circuit-braker, retry backoff) e la gestione dell'autenticazione e autorizzazione.

### Space-based architecture

L'architerrura space-based è pensata nello specifico per risolvere problemi di scalabilità e concorrenza. E' inoltre valida per gestire carichi non prevedibili. Spesso è identificabile con il pattern dell'architettura cloud. L'idea alla base è quella dell'uso di memoria condivisa distribuita. 

Gli elementi di questa architettura sono:

* **message grid**: per la gestione dei messaggi e delle sessioni in ingresso. Può anche essere usato per orchestare le unità di processamento
* **data grid**: per il caricamento e sincronizzazione in memoria della persistenza
* **processing grid**: che applica la business logic
* **deployment-manager component**: incaricato di scalare le unità di processamento in modo orizzontale

### Pattern-analysis summary

|             | layer | event driven | microkernel | micoservice | space-based |
| ----------- | :-----: | :------------: | :-----------: | :-----------: | :-----------: |
| Modifiche   |  🟥  |  🟩 |  🟩  |  🟩 | 🟩  |
| Rilascio    |  🟥  |  🟩 |  🟩  |  🟩 | 🟩  |
| Testabilità |  🟩  |  🟥 |  🟩  |  🟩 | 🟥  |
| Performance |  🟥  |  🟩 |  🟩  |  🟥 | 🟩  |
| Scalabilità |  🟥  |  🟩 |  🟥  |  🟩 | 🟩  |
| Sviluppo    |  🟩  |  🟥 |  🟥  |  🟩 | 🟩  |

## 🍷 Conclusione

Libro scorrevole come difficilmente si trovano tra i libri tecnici. Non è molto dettagliato ma fa il suo dovere nel senso che permette di avere una panoramica precisa su una possibile scelta di architettura di massima. L'ho trovato interessante proprio per la sua chiarezza senza tanti fronzoli ma efficace nello scopo.

## 🤓 Riferimento

> "All architectures become iterative because of unknown unknowns, Agile just recognizes this and does it sooner". (Mark Richards)
