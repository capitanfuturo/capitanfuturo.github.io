---
layout: post
title: "Refactoring: Improving the Design of Existing Code (Martin Fowler)"
date: 2023-12-15 19:24:04 +0100
tags: ["Libri"]
published: true
---
## 📚 Introduzione

Nella lista dei must da leggere, Martin Fowler è sempre una certezza. Refactoring è un manuale più che un libro nel quale vengono illustrati diversi pattern per poter affrontare un refactoring di codice legacy. Attenzione però che il focus è legato alla **programmazione ad oggetti**.
Devo dire che fortunatamente dopo quasi 15 anni di programmazione molti pattern sono conosciuti e applicati di default. Però come al solito, avere un linguaggio comune con cui chiamarli è d'aiuto per accordarsi con i dev. D'altronde a noi del genere umano piace molto dare il nome alle cose!

## 🚀 Cosa mi porto a casa da questa lettura

* **Il refactoring è una attività rischiosa perchè si va a modificare codice funzionante**. Questo aspetto va preso bene in considerazione perchè per poter affrontare bene questo processo l'unica cosa che ci può proteggere sono i **test**.
* L'obiettivo è quello di **non modificare il comportamento esterno ma migliorare la struttura interna**, perchè come espresso in libri come clean code e clean architecture di Robert C. Martin un sistema disegnato male è difficile da mantenere e da modificare
* L'attività di refactoring dovrebbe essere continua e fatta **ad ogni nuova feature** del codice, in modo che sia fatta per piccoli step e corredata da test. I piccoli step garantiscono che la superficie di impatto sia limitata da controllare. Mentre l'attività continua implica che nelle stime venga sempre messo in conto anche questa attività altrimenti il business difficilmente finanzierà questi tipi di attività che non hanno impatto sul cliente finale.
* Il primo refactoring che può dare massimo effetto con minimo sforzo è il **renaming**. Dare il nome giusto a metodi e a variabili rende il codice leggibile anche da chi lo vede per la prima volta.
* E' bene mantenere vecchi metodi, deprecarli e utilizzare al loro interno quelli nuovi. Sarà poi successivamente che sarà possibile eliminare il metodo deprecato.
* La maggior parte dei refactoring tendono a diminuire il codice ma ove non possibile non bisogna aver paura di scrivere più righe di codice. L'obiettivo è quello di migliorare la struttura interna del codice. Questo significa che a volte **è meglio avere un ciclo macchina in più che del codice difficile da mantenere**. In contesti non real time la cpu costa meno degli sviluppatori che devono lavorare su quella codebase.
* **Dopo tre volte che duplichi il codice è meglio estrarlo** in un metodo richiamato dai tre punti.
* Usare l'indirection (l'introduzione di un elemento di **disaccoppiamento** tra due layer) permette di:
  * abilitare la condivisione di logica
  * rendere esplicita l'intenzione del progettista e separare l'implementazione
  * isolare le modifiche
  * raggruppare logica condizionale
* Le interfacce sono dei strumenti di indirection potenti ma hanno il limite che una volta resi pubbliche o se vogliamo pubblicate il progettista ne perde il controllo perché non può sapere a priori quali siano le implementazioni. Questo vale soprattutto per i framework e per questo un consiglio è quello di non pubblicare troppo presto le interfacce.
* Alcuni blocchi che facilmente possono essere considerati oggetto di refactoring sono:
  * metodi lunghi
  * classi larghe
  * firme lunghe
* Quando senti il bisogno di scrivere un commento, prova prima a fare del refactoring in modo da rendere superfluo il commento.
* **Separa lo strato di dominio da quello di presentazione**.
* I test possono essere integrati nel codice usando in maniera appropriata le Assertion e le Exception. E quando si risolve un bug è buona norma affiancarlo da un unit test per verificarlo.
* Se si ritiene che un pezzo di codice debba essere riscritto... a quel punto non ha senso procedere con il refactoring ma semplicemente con la nuova implementazione

### 💩 Elenco dei principali Code Smells

* **Shotgun Surgery**: Una qualsiasi modifica ad una classe implica una serie di mini modifiche in tanti oggetti.
* **Feature Envy**: Si ha quando un metodo di una classe tratta principalmente dei dati di un'altra classe
* **Primitive Obsession**: si ha quando si usano solo campi primitivi invece di strutturare i dati in oggetti
* **Switch Statements**: gli switch case sono importanti ma se abusati o molto complessi vale la pena spezzarli in blocchi di if else then. Se si aggiunge una nuova clausola va poi rivisto tutto il flusso dei switch case
* **Parallel Inheritance Hierarchies**: avviene quando creando una sottoclasse di una classe c'è la necessità di creare una sottoclasse di un'altra class.
* **Lazy Class**: se una classe non viene usata o non fa abbastanza allora vale la pena eliminarla e spostare la logica
* **Speculative Generality**: si ha quando si trovano metodi, classi, campi o parametri non usati o pensati per un futuro
* **Temporary Field**: si ha quando di un oggetto alcuni campi vengono popolati solo in certe circostanze
* **Message Chains**: si ha quando si vede una catena di oggetti che chiamano oggetti in sequenza: a() -> b() -> c()
* **Inappropriate Intimacy**: si ha quando una classe usa un metodo o campo interno di un'altra classe
* **Middle man**: se una classe esegue solo un'azione allora vale la pena eliminarla. Spesso questa classe farà solo da tramite verso l'oggetto che realmente esegue la logica.

### 🔧 Elenco delle principali azioni di refactoring

* **Composizione di metodi** per aggregare logica in un solo blocco
* **Estrazione a metodo** di parte di logica ripetuta
* **Rinominare** metodi, variabili, campi
* **Estrarre oggetti** da metodi, da data value o da parametri
* Sostituzione di algoritmi
* **Sostituire magic number** con costanti.
* **Estrarre interfacce e astrazioni**.
* Introdurre l'**oggetto Null**.
* Sollevare eccezioni al posto di codici di errore
* Usare le asserzioni

### 💔 Quando non scrivere un refactoring

1. Quando non si sa bene come farlo
2. Se i vantaggi a lungo termine non ne valgono la pena
3. Se è troppo costoso
4. Se può rompere il funzionamento

## 🍷 Conclusione

Martin Fowler è uno dei più illustri scrittori di ingegneria del software e questo libro è un must. Può sembrare a volte banale per un programmatore scafato ma raccoglie in maniera ordinata tutta una serie di "code smells" che possono essere risolti per migliorare la struttura del codice.
Un ottimo strumento da utilizzare alla bisogna e in particolare da abbinare a questo sito che raccoglie anche visivamente delle schede sull'argomento: [Refactoring Guru](https://refactoring.guru/)

## 🤓 Riferimento

Martin Fowler, _Refactoring: Improving the Design of Existing Code_,  Addison-Wesley Professional, 2° edizione, 2020. [Amazon](https://www.amazon.it/Become-Effective-Software-Engineering-Manager-ebook/dp/B08GF7P3G8/ref=tmm_kin_swatch_0?_encoding=UTF8&qid=1695987600&sr=8-2).

> "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.". (Martin Fowler)
