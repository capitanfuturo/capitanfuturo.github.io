---
layout: post
title: "Clean Architecture (Robert C. Martin)"
date: 2023-07-01 19:24:04 +0100
tags: ["Libri"]
published: false
---
## 📚 Introduzione

Robert Cecil Martin è uno dei più autorevoli scrittori di libri dedicati all'arte della programmazione. Quest'anno dopo quasi 12 anni di lavoro in questa industry ho deciso di ripercorrere i "classici" leggendoli uno ad uno. Ho sempre letto articoli ed esempi su specifici passi di questi libri ma credo che per poter migliorare me stesso nel lavoro sia giusto dedicare del tempo alla lettura.

Ho iniziato dall'ultimo libro, Clean Architecture, un pò perchè con il tempo questi libri perdono di grip sull'attuale e un pò perchè mi sono trovato di fronte a sfide professionali legate a questo ruolo.

Al momento sono coinvolto nel refactoring di un monolite venduto con modello di business SaaS ad un sistema distribuito a microservizi e quindi spinto dall'urgenza ho fatto questa scelta.

## 🚀 Cosa mi porto a casa da questa lettura

Da questo libro mi porto a casa una strutturata descrizione degli utlimi 20 anni di programmazione e degli ultimi trend. Pattern e nomenclatura per poter discutere in ambito tecnico alcune delle scelte necessarie per produrre valore.

- Un'architettura software rappresenta le scelte fatte per costruire un sistema e la sua cifra è il costo che deve essere applicato per modificarlo, buildare e manuntenerlo. **Più un'architettura è semplice da modificare, deployare, manuntenere più è disegnata bene**.
- Nonostante il cono di incertezza che spesso ci è posto davanti alcuni percorsi e pattern ci possono aiutare a strutturare meglio la nostra architettura. Ogni cosa comunque ha il suo trade-off ma le regole di architettura rimangono per lo più invariate al variare del contesto e del business
- Anche gli sviluppatori sono degli stakeholder del prodotto

### Paradigmi di programmazione

1. **Structured programming** (Edsger Wybe Dijkstra nel 1968) che impone disciplina sul direct transfer of control
2. **Object Oriented Programming** (Ole Johan Dahl and Kristen Nygaard nel 1966) che impone disciplina sul indirect transfer of control. Le proprietà principali sono:
    1. encapsulation
    2. inheritance
    3. polymorphism, che ci porta al concetto di **dependancy inversion**
3. **Functional programming** (Alonzo Church nel 1936) impone disciplina sulle assegnazioni perchè in linea teorica non sono previste in questo tipo di programmazione e le variabili sono immutabili. I principali vantaggi di questo paradigma sono:
    1. NO race conditions
    2. NO deadlock conditions
    3. NO concurrent update

### Principi di Code Design - SOLID

1. **Single responsibility principle**: una classe dovrebbe avere una e una sola ragione per cambiare o per capire meglio un modulo dovrebbe essere responsabile di una ed una sola attività.
2. **Open-closed principle**: una classe dovrebbe essere aperta all'estensione ma chiusa alla modifica. Questo implica che un'estensione non deve poter modificare le logiche interne della classe.
3. **Liskov’s substitution principle**: gli oggetti in un programma dovrebbero essere sostituibili da istanze dei propri sottotipi senza alterare il comportamento del programma. Anche questo principio descrive come il disaccoppiamento e le dipendenze devono essere per lo più a livello di interfacce e non di implementazioni.
4. **Interface segregation principle**: meglio separare le interfacce per proprietà specifiche che non interfacce generiche.
5. **Dependency inversion principle**: le dipendenze dovrebbero avvenire sulle astrazioni e non sulle classi concrete.

### Principi dei Componenti

I componenti sono unità di deployment come jar, DLL o servizi e su queste entità possiamo individuare 3 principi per la coesione del componente:

1. **RRP - Reuse / Release Equivalence Principle**: la granularità del riuso è uguale alla granularità del rilascio.
2. **CCP - Common Closure Principle**: raggruppa nei componenti quelle classi che cambiano per lo stesso motivo nello stesso tempo. Questo si lega al SRP - single responsability principle.
3. **CRP - Common Reuse Principle**: non forzare l'utilizzatore di un componente a dipendere da cose che non necessita, legato al ISP - interface segregation principle.
Questi 3 principi possono essere disposti un diagramma di tensione, un triangolo nel quale i componenti si collocano. In generale non si possono ottenere contemporaneamente i 3 principi ma un trade-off dei 3 a seconda delle necessità.

Altri 3 principi esposti sono:

1. **Acyclic dependencies principle**: non ci devono essere cicli nel grafo delle dipendenze. Per risolvere eventuali cicli si può usare il principio di inversione delle dipendenze.
2. **Stable dependency principle**: i componenti meno stabili dovrebbero dipendere da componenti più stabili.
   **Stability** = (numero di dipendenze in uscita) / (somma delle dipendenze in uscita e in ingresso)
3. **Stable abstractions principle**: i componenti stabili dovrebbero essere delle astrazioni. Un esempio è una policy di alto livello che può essere modificata da un'estensione seuendo il principio del open-closed principle.
   **Abstractness** = (numero di classi astratte e interfacce) / (totale numero di classi e interfacce)

### Principi di architettura

- Un **architetto deve continuare ad essere un programmatore** per non avere troppo distacco dalle tematiche tecniche.
- Gli aspetti da tenere a mente per una buona architettura sono:
  - **development**
  - **deployment**
  - **operation**
  - **maintenance**
- Le regole di business non devono dipendere dalle scelte tecniche. Per fare questo un approccio è quello di **definire i confini** e separare in layer sia per **livelli logici** che per per **casi d'uso**.

L'architettura dovrebbe avere le seguenti caratteristiche:

- Testabile
- Indipendente dai framework
- Indipendente dalla UI
- Indipendente dal tipo di database
- Indipendente da agenti esterni

Un buon punto di partenza è l'**architettura esagonale** proposta da Alistair Cockburn nel 2005.

## 🍷 Conclusione

Libro da leggere per mettere in ordine dei concetti spesso nominati senza un filo conduttore. L'autore è un guru della tematica e mi è piaciuto molto leggerlo, soprattutto nella parte iniziale nella quale descrive come certi pattern e paradigmi siano nati dall'uso della tecnologia stessa, dai primi compilatori agli assembler.

Forse nonostante sia del 2017 questo libro sa di datato per alcune cose, nel senso che tecnologie serverless e cloud probabilmente sono più attuali del linguaggio ad oggetti però i principi fondamentali rimangono invariati.

## 🤓 Riferimento

Robert C. Martin, _Clean Architecture_, Addison-Wesley, 2017. [Amazon](https://www.amazon.it/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164/ref=sr_1_1?keywords=clean+architecture&qid=1682951643&sprefix=clean+ar%2Caps%2C148&sr=8-1).

> "The only way to go fast, is to go well" (Robert C. Martin)
