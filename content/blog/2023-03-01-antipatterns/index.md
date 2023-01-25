---
layout: post
title: "Antipatterns, Identification, Refactoring, and Management (Laplant, Neil)"
date: 2023-02-01 19:24:04 +0100
tags: ["Libri"]
published: false
---
## 📚 Introduzione

Quest'anno ho iniziato un percorso di leadership in azienda ed ho avuto la fortuna di partecipare ad una serie di eventi specifici sui feedback e sugli incontri con i colleghi. Quello che mi ha stupito è come la nostra mente possa rispondere in maniera più o meno positiva ad un messaggio con lo stesso contenuto ma formulato in maniera diversa. Saper parlare agli altri in maniera assertiva è un modo efficace per comunicare e saper ascoltare gli altri ancora di più.

Capire chi si ha di fronte aiuta a capire il taglio di comunicazione da usare. In particolare questo libro suggerito da un ingegnere del software mi ha colpito per il suo approccio tecnico... che per il mio lavoro è la base.

## 🚀 Cosa mi porto a casa da questa lettura

### Antipatterns

Uno dei punti più critici per una azienda non è tanto identificare i parametri per i quali l'organizzazione sta andando bene, per questo ci sono sfariati KPI, ma quanto attuare una **problem identification** per capire cosa invece vada male nell'organizzazione.

Al fine di attrezzarci di mezzi per identificare i problemi, ci può aiutare conoscere delle bad practice, che chiameremo **antipatterns**. Esistono 3 tipi di antipattern:

1. Architetturali (di struttura)
2. Design (di prodotto)
3. Management ed Environmental (di gestione dei processi e dell'ambiente lavorativo)

In questo libro ci si occupa del terzo tipo.

Il concetto di pattern nasce da Alexander Christofer che lo ha definito nel mondo delle costruzioni nel libro _"The timeless way of building"_. Il pattern è quindi definito da:

* una descrizione di un problema
* una descrizione del core della soluzione, il modo e non l'esecuzione specifica
* una coppia (nome problema, soluzione)

e può essere applicato a più contesti. **Antipattern** invece: descrive soluzioni che possono dare più danni che benefici.

### Human patterns

Alcuni psicologi come Carl Jung e Briggs Mayers hanno studiato a lungo le persone cercando di raggrupparle in alcuni gruppi con caratteristiche uguali, in particolare hanno identificato questi aspetti della personalità che ci caratterizzano:

* Estroverso E vs Introverso I
* Sensing S vs Intuitive N
* Thinking T vs Feeling F
* Judging J vs Perceiving P

Keirsey poi riassume in uno schema gli "ingredienti" di prima l'intelligenza emotiva così:

| GUARDIANS |  | ARTISANS  |  | IDEALIST  |  | RATIONALS  |  |
| :--------- | :--------: | :-------- | :--------: | :--------- | :---------: | :--------- | :---------: |
| supervisor | ESTJ | promoter | ESTP | teacher | ENFJ | field marshal | ENTJ |
| inspector | ISTJ | crafter | ISTP | counselor | INFJ | mastermind | INTJ |
| provider | ESFJ | performer | ESFP | champion | ENFP | inventor | ENTP |
| protector | ISFJ | composer | ISFP | healer | INFP | archietct | INTP |

Nei nostri team il suggerimento che gli autori ci danno è che:

* **Team Leader** dovrebbero avere la componente N+F e meglio se anche la J, quindi: teacher, counselor e poi champion e healer.
* **Analisti di sistema** dovrebbero avere la componente T+S: supervisor, inspector, promoter, crafter
* **Programmatori** dovrebbero avere E+S+J: supervisor, provider
* Chiunque si **interfacci con il cliente** dovrebbe avere J: supervisor, inspector, provider, protector, teacher, counselor, field marshal, mastermind

### Corncub (ovvero la pannocchia)

La "pannocchia" è una persona del 5% della popolazione che crea il 90% delle problemantiche interpersonali. Gli autori la chiamano pannocchia perchè in modo dispregiativo nel passato si usavano al posto della carta igienica. Questi tipi di persone sono sicuramente dannose ma come sempre in questi casi **non sono le persone, ma i loro comportamenti** che vanno identificati e migliorati.

Ci sono diversi _fenotipi_ di corncub:

* **Ostile aggressivo**, ed in paricolare si dividono in 3 tipi
    1. **Carrarmato sherman**: sono intimidatori sapendo che la maggior parte delle persone cercono di evitare lo scontro. La soluzione è rimanere calmo e fermo nella propria risposta senza farsi interrompere, senza farsi intimidire.
    2. **Cecchino**: cerca di mettere in imbarazzo e lo fa con battute in situazioni inopportune, spesso quando si è in gruppo e uno sta parlando. La soluzione è di fermarsi e chiamare fuori dal gruppo il cecchino per comunicargli l'inappropriatezza del gesto.
    3. **Esplovivo**: tipicamente è calmo ed ad un certo punto esplode. La soluzione è di non farsi interrompere e di aiutarlo a capire cosa lo sta facendo esplodere per portarlo ad una condizione di calma.
* **Indecisi**: non riescono a prendere una decisione e procrastinano sempre il momento in cui farlo. La soluzione è di comprendere qual è l'impedimento e aiutarla a costruire un percorso di problem solving facendo delle domande per spezzare il problema in sottoproblemi.
* **Piagnucoloni**: si lamentano di tutto e tendono a influenzare anche chi gli sta intorno. la soluzione è di non assecondarli, non scusarli ma attivarli nello scrivere in dettaglio i problemi di cui si lamentano e possibilmente proporre delle soluzioni.
* **Negativi**: la soluzione verso questo fenotipo è di rimanere positivi e realistici con loro ridordando gli aspetti buoni.
* **Vongole** o meglio tradotto in italiano, amebe. Non hanno reazioni nella maggior parte dei casi. In questo caso è meglio fare domande specifiche per farli parlare e in caso di silenzio rispondere con il silenzio. Bisogna sbloccarli senza avere la paura del silenzio.
* **Bulldozers** o meglio i tuttologi negativi, quelli cioè che argomentano in maniera tecnica le proprie negatività. In questo caso date le competenze del fenotipo la soluzione è di ampliare lo scenario e far vedere meglio il contesto per poter inquadrare quello che può essere negativo in un piano più ampio.
* **Superagreedable**, si tratta di quelle persone che dicono sempre di sì

### Teoria dei team di Tuckman

In questa parte del libro si tratta delle dinamiche di formazione di un nuovo team. Tuckman ne ha studiato le fasi principali che ha riassunto in:

1. **Forming**: primo momento di formazione e conoscimento dei membri del gruppo.
2. **Norming**: fase di formalizzazione di regole comuni e obiettivi.
3. **Storming**: fase di impostazione degli obiettivi e assegnazione di ruoli e attività.
4. **Performing**: il momento più alto di performance del team perchè coeso.
5. **Mourning**: debrief, retrospettiva del team, scioglimento.

Queste fasi possono evolvere da 1 a 5 ma anche essere percorse al contrario durante il ciclo di vita di un team. Sta al management gestire al meglio l'evoluzione del team. Si aggiunge poi un parallelo tra diversi sport e le tipologie di team nel mondo IT per capirne le caratteristiche principali che governano:

| SPORT | CARATTERISTICHE TEAM | ANALOGIA MONDO IT |
| :--------- | :-------- | :-------- |
| Nuoto | Performace e risultati da solista | Consulenti indipendenti |
| Baseball | I risultati di team dipendono molto da figure individuali e necessitano di coordinamento | Sviluppo Open Source |
| Football americano | Risultati di team, individui con responsabilità ben definite e specializzate, altamente coordinate | Software di larga scala |
| Calcio | Risultati di team, participazione costante, skills intercambiabili | Sviluppo Agile, gestione dei team |

### Guida dei team

I team hanno caratteristiche ben definite e abbiamo visto come evolvono. Un team però ha bisogno di un leader e questo può essere un punto critico per l'organizzazione. Ci sono diversi stili che hanno ripercussioni sulle performance del team stesso.
Ci piacerebbe un leader che sia inteso come facilitatore delle performance, più simile ad un coach che ad un capo ma non sempre è così.

#### Crescita dei team

Al creacere del team aumentano le interazioni personali tra i componenti. In particolare la formula che descrive questo andamento è ``n * (n-1) / 2``, quindi per esempio in una squadra da calcio di 11 persone avvengono 55 interazioni diverse e questo spiega perchè un Team Leader non dovrebbe gestire più di 10 persone e quindi 45 interazioni interpersonali.

#### Stili di leadership

Distinguiamo 2 tipi di stili di leadership: **Micromanagers** (super controllo) e **Laissez-Faire Managers** (fiducia piena degli altri) e tra qeusti due viene proposto una via di mezzo come comportamento equilibrato per la gestione di un team. La divisione per sistemi di management process-oriented versus people-oriented è un pò riduttiva e McGregor in _The Human Side of Enterprice_ definisce questi stili con Theory X, Y e successivamente verrà aggiunto il W e Z.

* **Theory X**: management stile militare con gerarchie e autorità. Controllo diretto e "coercitivo".
* **Theory Y**: controllo esterno e committment individuale. Più è chiaro il contesto e il task più sarà facile il committment.
* **Theory W**: mettere in campo un insieme di precondizioni, processi e risultati win-win
* **Theory Z**: identificata da Ouchi in _Theory Z: How American Management Can Meet the Japanese Challenge_. Il concetto principale è costruire un legame forte e subordinato tra i partecipanti del team e l'organizzazione.

Non esiste una formula magica ma il buon senso ed alcuni consigli possono aiutare a gestire un team. Un breve lista di consigli per prendere in gestione un team è questa:

* Sii esemplare e comunica spesso ed in modo efficace.
* Monitora e gestisci le relazioni tra te e gli altri e qulle altri-altri.
* Sii allineato alla cultura aziendale, se questa non ti appartiene, sei nel posto sbagliato.
* Tratta le persone con rispetto, imposta gli obiettivi, premia i comportamenti buoni e cura quelli cattivi.
* Sii ottimista. Nessuno sceglie di essere un fallito. Da agli altri il beneficio del dubbio.

### Management Antipatterns

Tra gli antipatterns manageriali i seguenti sono l'elenco completo. Mi sono aggiunto solo una nota per poi andarli a rivedere con calma.

* Absentee Manager: il manager assente
* All You Have Is A Hammer: risolvere tutto allo stesso modo
* Cage Match Negotiator: chi ha ragione ad ogni costo
* Doppelganger: dr jekyll and mr hyde
* Fruitless Hoops: richieste infinite
* Golden Child: chi ha un preferito
* Headless Chicken: manager confuso, senza piani
* Leader Not Manager: visione senza un piano
* Manager Not Leader: chi fa tutto per bene dal punto manageriale ma senza leadership
* Managerial Cloning: middle management che si comportano come high management
* Metric Abuse: chi si basa solo sulle metriche
* Mr. Nice Guy: il simpaticone che rifiuta il conflitto
* Mushroom Management: comunicazione inefficace
* Plate Spinning: chi devia dai problemi veri con task time-consuming
* Proletariat Hero: ultra disciplina senza lasciare spazio di soluzione al team
* Rising Upstart: superstar
* Road to Nowhere: nessun piano
* Spineless Executive: chi evita il confronto
* Three-Headed Knight: indeciso
* Ultimate Weapon: il fenomeno che deve condurre tutto
* Warm Bodies: gestione nella quale il collaboratore viene spostato da progetto a progetto mantenendo una minima performance

### Enviromental Antipatterns

Qui si intendono gli antipattern culturali o ambientali, non attribuibili ad una singola persona o comportamento. Questi creano degli ambienti tossici in cui lavorare e producono culture lavorative negative.

* Ant Colony: tutti contenti in superficie perchè costretti
* Atlas Shrug: organizzazioni sfinite che non riescono a mantenere il peso degli obiettivi raggiunti
* Autonomous Collective: auto-organizzazione portata all'estremo
* Boiling Frog Syndrome: organizzazione che peggiora piano piano
* Burning Bag of Dung: quando qualcuno lascia l'organizzazione in una situazione disastrosa
* Buzzword Mania: ... si spiega da sola, in questo momento mi vengono in mente 2 parole: blockchain e chatgpt
* Deflated Balloon: organizzazione sgonfia che non accetta l'evidenza
* Divergent Goals: non si ha una direzione comune
* Dogmatic About Dysfunction: ossessione per un processo inefficiente
* Dunkirk Spirit: con una pianificazione terribile il lavoro viene svolto per spirito di sacrificio
* Emperor’s New Clothes: nessuno ha il coraggio di dire la verità (il re è nudo)
* Fairness Doctrine: usare l'equità come scudo per non affrontare i problemi
* Fools Rush In: buttarsi senza nessun senso critico sulle nuove tecnologie
* Founderitis: i founder non riescono a far crescere l'azienda senza di loro
* French Waiter Syndrome: ambiente in cui i rapporti sono rudi
* Geek Hazing: ci si affida agli ultimi arrivati e li si butta nella mischia senza prepararli
* Institutional Mistrust: mancanza di fiducia diffusa
* Kiosk City: la memoria storica aziendale è frammentata sulle persone
* Mediocracy: quando non si ha una cultura del talento e dell'eccellenza
* One-Eyed King: quando il leader o il CTO è di poco più competente del resto dell'organizzazione
* Orange Stand Economics: quando l'organizzazione non sa capire i costi della propria struttura
* Pitcairn Island: quando un'organizzazione non applica standard ed è difficile l'inserimento di nuovi componenti
* Potemkin Village: facciatta fantastica mentre l'organizzazione si comporta in maniera disonesta nei confronti dei clienti, dei collaboratori e creditori
* Process Clash: quando si vogliono mettere insieme processi e funzioni aziendali senza concoradere dei passaggi ibridi
* Rubik’s Cube: organizzazioni confusionarie
* Shoeless Children: organizzazioni che non si attrezzano adeguatamente
* Worshipping the Golden Calf: visione povera e ci si basa su una unica tecnologia.

## 🍷 Conclusione

Antipatterns è un libro enciclopedico, che descrive in modo schematico e da manuale i diversi aspetti del management in azienda. E' un libro molto interessante soprattutto per chi sta iniziando a gestire dei gruppi di lavoro e vuole migliorarsi dando un nome ai propri comportamenti. Credo che lo riprenderò diverse volte per ripetere i concetti chiave.
Come ci is comporta nei confronti degli antipatterns?

* Sii gentile
* Non incolpare gli altri
* Impara a comunicare notizie cattive
* Non ti preoccupare delle altre persone
* Non sparare le notizie ma preparati
* Lascia che le persone imparino dai propri errori
* Non procrastinare
* Ascolta
* Negozia
* Non mollare
* Non essere malizioso
* Ricorda che ci vuole anche fortuna
* Le buone azioni ripagano
* Considera lo spazio, la posizione e il salario
* Sii un mentore
* Setta e incontra le aspettative

## 🤓 Riferimento

Philip A. Laplante - Colin J. Neil, _Antipatterns Identification, Refactoring, and Management_, Auerbach Publications, 2011. [Amazon](https://www.amazon.it/Antipatterns-Managing-Software-Organizations-Engineering-ebook/dp/B00BC7EE9S/ref=tmm_kin_swatch_0?_encoding=UTF8&qid=1672729519&sr=8-1)

> "The plan is nothing, planning is everything." (Dwight D. Eisenhower)
