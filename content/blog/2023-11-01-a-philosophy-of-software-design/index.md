---
layout: post
title: "A Philosophy of Software Design (John Ousterhout)"
date: 2023-11-01 19:24:04 +0100
tags: ["Libri"]
published: false
---

## 📚 Introduzione

Sto recuperando un pò alla volta un lista di libri che avrei sempre voluto leggere per aiutarmi nella mia carriera e nel mio lavoro di tutti giorni da sviluppatore, team leader e engineering manager. A philosophy of software dedign è sicuramente uno di quelli come la serie di Robert c. Martin. Partendo citando il paper di David Parnas del 1971 ["On the Criteria to be used in Decomposing Systems into Modules"](https://www.win.tue.nl/~wstomv/edu/2ip30/references/criteria_for_modularization.pdf) Ousterhout introduce il suo libro ricordandoci che alcuni concetti seppur di mezzo secolo fa siano attuali sul design del software.

Leggendo credo che parte della verità risieda sul fatto che il nostro processo di risoluzione dei problemi è tale da rimanere invariante nella storia e che certi concetti siano applicabili in senso lato e non solo nel software. Scrivere un software pulito, clean, e semplice da capire e da manuntenere è molto difficle. Uno dei problemi principali della computer science è infatti la **decomposizione**.

## 🚀 Complessità

La **modularizzazione** è alla base delle architetture software. Questo approccio permette di avere dei blocchi di codice isolati tra di loro e possibilmente indipendenti così che uno sviluppatore non debba conoscere il contenuto dei moduli ai quali non sta lavorando. Questo semplice concetto è il mattoncino base delle architetture, è semplice da capire ma molto difficile da sviluppare. Questo libro mi ha aiutato a fissare alcuni spunti interessanti e pratici.

A differenza di altre tipologie di progetto, quello software è caratterizzato da un **cono di incertezza** iniziale e **complessità** nel poter visualizzare e immaginare le conseguenze delle scelte di desgin nei sistemi software. Diamo la seguente definizione:

> Complessità è qualunque cosa relativa alla struttura di un sistema software che lo renda difficile da modificare e capire.

E per darne una definizione matemetica possiamo usare questa formula per un sitema:

```
C = SUM[(c/t)p]
```

La complessità è la sommatoria della complessità (intesa come peso) del singolo componente diviso il tempo impiegato da uno sviluppatore per quel componente.

Questa complessità si manifesta con diversi **sintomi**:

1. **Change amplification**: ogni modifica, anche semplice, richiede la modifica in diversi punti distanti tra loro.
2. **Carico cognitivo**: si riferisce alla quantità di conoscenza sulla codebase deve avere uno sviluppatore per completare un task. Spesso un'approccio dove si incapsula pù righe di codice può aiutare a ridurre il carico cognitivo a patto che la superficie dell'API sovrastante o la firma del metodo sia ridotta.
3. **Unknown unknowns**: il terzo sintomo si ha quando non è evidente cosa modificare per raggiungere il completamento di un task.

La complessità si stratifica nel tempo in piccoli passi ed è generata principalmente da **2 fattori** :

1. **Dipendenze**: le dipendenze sono relative a **interfacce** e **implementazioni**
2. **Oscurità**

Alcuni consigli per mitigare la complessità sono:

- Privilegiare **la strategia sulla tattica**, il codice non deve solo funzionare ma anche essere progettato bene da subito altrimenti si accumula **debito tecnico**.
- Modulizzare in modo che i cambiamenti impattino piccoli pezzi di codice
- Le **interfacce** devono essere semplici ed esporre una **piccola superficie** mentre le **implementazioni** devono essere **profonde** e nascondere la maggior parte o totalità della complessità. Classi e moduli profonde migliorano l'**information hiding**. Se un'informazione è nascosta naturalmente non può essere parte di una dipendenza. L'opposto invece aumenta l'**information leakage** che può essere addirittura pericoloso in termini di sicurezza del proprio modulo o classe.
- Le **eccezioni non dovrebbero esistere**: meglio gestire la maggior parte dei casi e ridurre i posti dove vengono gestite le eccezioni.
- **Commenti**: La maggior parte sono inutili se possono essere facilmente dedotti dal codice. I commenti di valore sono quelli che descrivono le interfacce perchè vanno a colmare quegli elementi unknown che non possono essere descritti dal codice di un'interfaccia. Inoltre affinchè siano mantenuti aggiornati è bene che si trovino **vicino al codice che documentano**. Un buon approccio è quello di **scriverli da subito**.
- Preferire l'**approccio general-purpose** e poi implementare per il caso specifico. L'interfaccia quindi dovrebbe essere pensata in modo generale per supportare usi multipli.
- Quando si trovano diversi metodi pass-through tra i layer di astrazione del sistema è consigliabile usare un **oggetto contesto**, che mantenga lo stato da passare piuttosot che esplodere il tutto con firme di metodi piene di argomenti.
- **Design it twice**: questo permette di fare challenge sulla prima progettazione in modo da trovare una soluzione sub ottimale in prima istanza senza partire subito con la sua implementazione.
- Crea **precisione e consistenza** nella codebase attraverso:
  - un buon **naming** delle varibili
  - standard e **convenzioni** di scritttura nel team
  - **interfacce**
  - **code review**
  - privilegiare **unit test**

## 🍷 Conclusione

## 🤓 Riferimento

John Ousterhout, _A Philosophy of Software Design_, Yaknyam Press, 2018. [Amazon](https://www.amazon.it/).

> "L’uomo dovrebbe mettere altrettanto ardore nel semplificare la sua vita quanto ce ne mette a complicarla.". (Henri Louis Bergson)
