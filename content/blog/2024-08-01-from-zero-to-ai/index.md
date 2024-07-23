---
layout: post
title: "Zero to AI A non-technical, hype-free guide to prospering in the AI era (Nicolò Valigi, Gianluca Mauro)"
date: 2024-08-01 19:24:04 +0100
tags: ["Libri"]
published: false
---

## 📚 Introduzione

Libro iniziato a leggere per caso, in un periodo nel quale ho iniziato ad addantrarmi nel mondo dell'AI. E' un buon libro non tecnico ma alla portata di tutti per introdurre i concetti base.

## 🚀 Cosa mi porto a casa da questa lettura

### Un pò di storia

- Intelligenza artificiale è stata coniato come termine il 31 Agosto 1955, da Jhon McCarthy, Mavin Lee Minsky, Rochester e Shannon. Si distinguono i primi due tipi di AI:
    1. Narrow AI: che risolve task specifici
    2. General AI: che rispondono a qualsiasi task presentato
    3. (Super AI: categoria aggiunta in seguito per esplorare AI che possano superare l'intelligenza umana)
- Nel 1959 Arthur Samuel inizia a parlare di Machine Learning. L'autore parte dal fatto che noi essere umani apprendiamo il linguaggio dai nostri simili ed in particolare dai nostri genitori senza conoscere prima la grammatica, ma con l'esperienza, così si immagina che imitando questo comporatmento si possa rendere le macchine capaci di apprendere senza dover sapere a priori tutte le regole linguistiche.
- Nei successivi decenni si parla di inverno dell'AI perchè a causa della scarsa capacità computazionale le teorie e la loro applicabilità sembrano inarrivabili per gli scienziati del momento
- Il disgelo e la primavera dell'AI inizia negli anni 80 quando Xerox e IBM investono nel campo con una nuova tecnologia chiamata **expert systems**. Tali sistemi provano a riprodurre le prestazioni di una o più persone esperte in un campo di attività. Il sistema esperto si compone principalmente di tre sezioni:
    1. una base di conoscenza, in cui sono accumulate le regole deduttive e i dettami procedurali di cui il sistema si serve nel suo operato;
    2. un motore inferenziale, in cui il programma si occupa di applicare in concreto le nozioni contenute nella base dati;
    3. un'interfaccia utente, che permette l’interazione fra il soggetto umano e il programma che deve dare risposta ai suoi problemi.
- Questi sistemi esperti iniziano a mostrare i loro difetti e molte aziende muoiono, è l'inizio del secondo inverno dell'AI. I problemi princiapli sono:
    1. La scara adattabilità: ogni miglioria del software richiede una reingenierizzazione
    2. La verticalità: il sistema non risponde a situazioni non previste a priori nella progettazione
    3. La manutenzione: il sistema è complesso e mette insieme migliaia di vincoli
- Negli anni 2000 l'attenzione per Machine Learning riprende vigore. Iniziano ad esserci i calcolatori e le memorie disco per poter affrontare realmente queste tematiche.

### Prime domande da farsi in un progetto di ML

Quando si vuole iniziare a realizzare un progetto di training di un modello di machine learning le prime domande da farsi sono:

1. Che algoritmo di ML usare?
2. Quale set di dati abbiamo a disposizione?
3. Abbiamo già le etichette (label) per tutti i dati?

#### Cos'è un modello ML

Anche se al suo interno è complesso un modello può essere considerato un normale calcolatore o risolutore. Prende in pasto degli input che sono delle feature, caratteristiche, li processa attraverso un algoritmo di ML e produce i risultati di cui abbiamo bisogno chiamati anche etichette o label. A molti piace anche descrivere un modello come un oggetto che indovina il risultato o che fa delle predizioni e infatti si parla di qualità di predizione del modello.

Prendiamo per esempio un modello che predice il prezzo di una macchina usata. Ecco che per ogni macchina possiamo definire delle feature e ottenere dei target / label.

| Macchina (Example) | Cilindrata (Feature 1) | Alimentazione (Feature 2) | Chilometraggio (Feature 3) | Prezzo (Target / label) |
| --- | --- | --- | --- | --- |
| A | 1.6 | Diesel | 150000 | 15k |
| B | 1.0 | Benzina | 1000 | 20k |
| C | 1.2 | Benzina | 90000 | 10k |
| D | 1.4 | Diesel | 90000 | 15k |

Dati questi dati ed un algoritmo di ML potremmo costruire un modello che risponde alla domanda: A quanto posso mettere in vendita un veicolo D con cilindrata 1.8, alimentazione Diesel etc etc. Questo processo si chiama inferenza nel senso che il modello fa una deduzione a partire dai dati che ha in pancia.

#### 1 Addrestramento (training)

Quindi preso un set di caratteristiche di un oggetto l'algoritmo può iniziare a imparare grazie ai target o label precostruiti.

#### 2 Predizione (inference)

L'output della fase di addestramento è un modello, un programma auto contenuto che può predirre le label a partire da un set di feature e che può essere applicato anche a tutti i casi di uso simili.

### Supervised Learning

Questo tipo di modelli sono quelli che hanno hanno avuto più successo nell'industry (almeno prima dell'avvento degli LLM large language model, novembre 2022 con ChatGPT 3, che non vengono trattati in questo libro rilasciato nel 2020).
Il concetto alla base di questi modelli è la ricerca di una mappatura, quindi un legame tra un set di features e una label. In fondo anche noi usiamo l'esperienza in assenza di tutte le regole fisiche e matematiche non conosciamo. Per questo anche se non tutti conoscono la fisica meccanica riusciamo ad attraversare un strada in sicurezza o sappiamo come calciare un pallone.

#### Machine Learning

Una branchia del supervised learning è il Machine Learning. Ma quali sono i casi d'uso? L'ottimizzazione per esempio è un caso d'uso che calza molto bene per gli ML. Ma altri problemi che potenzialmente potrebbero funzionare bene sono quelli:

- per i quali esiste un KPI importante
- questo KPI dipende da misure e parametri misurabili
- I parametri influenzano i KPI attraverso relazioni sconosciute o complesse (altrimenti sarebbero risolvibili con algoritmi di ricerca operativa)

La ricetta base per costruire un supervised learning model è composta da:

1. set di dati caratterizzati da feature, caratteristiche note. Spesso questa fase viene fatta da algoritmi specifici per estrarre le feature.
2. questi dati sono corredati dalle label: dei valori target che siamo interessati a predirre
3. Questi input vengono utilizzati per addestrarre il modello.
4. Si può usare il modello per input non ancora dati in pasto al modello che potrà predirre i target

### Unsupervised Learning

Quando non abbiamo le label, i valori target possimao immaginare di utilizzare un altro set di algoritmi chiamati unsupervised learning. Un tipico caso d'uso è quello della segmentazione di un set di dati. Un esempio concreto è l'attività che deve fare il marketing per segmentare la clientela secondo caratteristiche comuni. In letteratura ci sono diversi modi standard per farlo ma questo non implica che un modello di questo tipo possa trovare delle relazioni che con la nostra logica non abbiamo individuato.

#### Deep Learning

Il **deep learning** è uno degli ambiti di unsupervised learning. Questi algoritmi lavorano direttamente su dati grezzi e capiscono automaticamente le feature rilevanti.
Per farlo si avvale di strutture che vengono chiamate **reti neurali**, perchè organizzate come i neuroni in strati, detti layer che estraggono feature, ogni layer estrae una feature. Una rete può essere composta da molti layer.
Attraverso la tecnica della **backpropagation**, una sorta di feedback il neurone adatta le sue trasformazioni interne per migliorare l'accuratezza della classificazione.
La tecnologia di **transfer learning** permette di costruire algoritmi di ultima tecnologia partendo da un piccolo dataset e da codice open source. Nel transfer learning gli strati general purpose sono riutilizzati da task diversi addestrati in principio per problemi specifici. Da questi temi una tecnologia come **one-shot learning** è alla base per esempio del riconoscimento facciale del telefono. Il modello viene addestrato e poi personalizzato con poche immagini per rendere il modello capace di riconoscere un solo volto per esempio. Per farlo dai pochi dati di input vengono estratti dei numeri significativi detti **embeddings**: vengono chiamati così questi vettori perchè in pochi numeri racchiudono i dati significativi in pochi elementi.

I DL funzionano bene per:

1. Applicazioni che trattano immagini
2. Applicazioni che trattano audio

ed in particolare il **Natural language** e il **Sentiment Analysis**

### Metriche di un modello

1. *Complessità = Estensione x Profondità*: dove profondità è legata a quanto complesse debbano essere le capacità del modello ed estensione è legata alla taglia di vocabolario che il modello deve conoscere.
2. *Precisione = True Positive / (True positive + False positive)*: misura la precisione, quanto ci si può fidare del modello
3. *Recall = True Positive / (True positive + False negative)*: misura quanti elementi vengono correttamente identificati
4. *Accuratezza = (True positive + True negative)/totale del campionamento*: quanti errori vengono fatti

### Punti di attenzione

- Deployare un modello senza misurare le sue performace è irresponsabile (potrebbe allucinare e dare risultati privi di valore).
- L'accuratezza di un modello è la misurazione di quanto bene riesca il modello a legare set di feature ad una label
- La regola d'oro come dice Gerge Box è: "Tutti i modelli sono sbagliati, ma alcuni sono utili"
- Un "unkwon unkwouns" è il grado di allucinazioni che il modello da in output. Per questo gli ingegneri devono implementare delle policy si sanity check per garantire la sicurezza dell'output.
- Siccome le predizioni del ML hanno impatto sul business, valutare le loro perfomance sono importanti. Per un unsupervised learning model i problemi possibili sono 2
    1. Falsi positivi
    2. Falsi negativi
- Se un modello genera dei bias bisognerebbe vedere i dati di training per trovare la causa e la soluzione.
- Nella costruzione di un proprio progetto di AI, gli autori consigliano di adottare la seguente politica:
    1. Per primo prova a vedere se esiste una soluzione buy the funziona
    2. Altrimenti opta per una soluzione a noleggio, come le piattaforme che danno API su modelli
    3. Infine se ancora non vengono coperti i requisiti costruisciti una soluzione in casa. Questo è l'ultimo gradino perchè i costi di costruire un modello possono essere veramente elevati

## 🍷 Conclusione

Libro molto interessante e alla portata di chiunque non abbia un profilo tecnico. Può essere usato come una buona introduzione delle tematiche. E' interessante vedere come dal 2020, anno in cui è stato scritto il libro. Tutta la tecnologia sia stata stravolta dall'avvento dei modelli di Large Language Model che hanno letteralmente spalancato la via ad una rivoluzione.
Ora sarà da vedere le implicazioni e le applicazioni in campo business. Consigliato!

## 🤓 Riferimento

Nicolo Valigi, Gianluca Mauro, _Zero to AI A non-technical, hype-free guide to prospering in the AI era_, Manning Publications, 2020.  [Amazon](https://www.amazon.it/Zero-AI-Non-technical-Hype-free-Prospering/dp/1617296066/ref=sr_1_1?crid=2R9O6NH8H7SG8&dib=eyJ2IjoiMSJ9.aDK4uNZD4IYQWPn2henyEup79fYrQQlw_IfkZxbyaNnQE35xkURT7W0wxYLvsPN84650XYdw_aj407Noc7UYPUBLBfgUyxp-bshnft0j9HvA9xujTKq-9pSo3NTIQyeo9Ms5bDNPzbaTmx-CCjvXtio9_dUNRDHuKxaLNAz0_zqD3m-j_6T-keK4JPYUNlaKUVENhx3RqNfN6NsLYzlA5DNz11wbZ5CZPBPHjKcZKNIgr-hsCKqSsqV2thC1Hd9LbLjoc__7ZJytFXVd5KMhMT-lt5PZaN3Uclz1eU62qPw.0b3JX7Ns_Jgl_xPze7w3CiW-vbE30cVpIXWWKWouWjk&dib_tag=se&keywords=zero+to+ai&qid=1721763642&sprefix=zero+to+ai%2Caps%2C525&sr=8-1).

> "Prima di lavorare sull'intelligenza artificiale, perché non facciamo qualcosa contro la stupidità naturale?" (Steve Polyak)
