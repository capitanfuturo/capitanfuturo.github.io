---
layout: post
title: "Installare Spark 2 sulla vm Cloudera Quickstart 5 (CCA175)"
date: 2020-09-01 19:24:04 +0100
tags: ["Software"]
published: true
---

## :floppy_disk: Premessa

Quest'anno ho provato a rinnovare la certificazione come Spark Developer su piattaforma Cloudera. Nel mondo Big Data abbiamo assistito alla più grande operazione di fusione di aziende concorrenti e in Cloudera abbiamo visto confluire Hortonworks.
Dalle due è nata una nuova distribuzione CDH 6.x e da inzio anno 2020 hanno rirpistinato la certifcazione [CCA-175](https://university.cloudera.com/content/cca175) basata su Spark 2.
La macchina virtuale offerta per fare training oltre ad essere esosa di risorse occupa anche un ragguardevole spazio su disco. Ecco che l'idea di poter usare la precedente macchina virtuale cloudera quickstart con Spark 2 può essere una valida alternativa per esercitarsi e non mettere a sedere il proprio pc.
In questo post scrivo alcuni appunti su come installare il tutto.

## Fase preliminare

### Download

Come prima cosa dobbiamo procurarci l'immagine della virtual machine da questo indirizzo: [https://downloads.cloudera.com/demo_vm/virtualbox/cloudera-quickstart-vm-5.13.0-0-virtualbox.zip](https://downloads.cloudera.com/demo_vm/virtualbox/cloudera-quickstart-vm-5.13.0-0-virtualbox.zip).

### Importazione

Avviamo il nostro VirtualBox e importiamo la macchina dal menu principale alla voce _File -> Importa_

- Se possibile impostate RAM a 8192 MB e CPU a 2

## Impostazioni iniziali

### Aggiungere le guest addition

Installare le Guest Addition di Virtualbox dal menu di Virtualbox -> Dispositivi -> inserisci l'immagine del cd delle Guest Addition.

Si avvierà una procedura automatica e vi verrà chiesta la password di root che è

| Utente | Password |
| ------ | -------- |
| root   | cloudera |

Una volta riavviata la macchina virtuale possiamo dotarci degli appunti bidirezionali dal menu:

Dispositivi -> Appunti condivisi -> Bidirezionale

Adesso possiamo copia-incollare snippet e comandi senza problemi da questo sito per esempio.

### Impostare la tastiera e layout italiano

system -> preferences -> keyboard preferences
aggiungere italiano ed eliminare americano

## Installazione Spark 2

Per l'installazione il consiglio è quello di seguire questo articolo di [Ali Yesilli](https://medium.com/@yesilliali/installing-apache-spark-2-x-to-cloudera-quickstart-wm-dd5314e6d9bd) con la sola accortezza di **NON DISINSTALLARE LA VERSIONE 1.7 DI JAVA**.
Versioni diverse di Java possono convivere senza problemi e mantenendo la 1.7 non rischierete di perdere le configurazioni per HDFS, (che fa comunque parte dell'esame) utile per importare esercizi e per controllare i file prodotti.

- Installare da terminale Java 8 con il comando:

```bash
sudo yum install java-1.8.0-openjdk
```

- Prendere nota della versione di Hadoop presente con il comando da terminale:

```bash
hadoop version
```

- Scaricare dal sito ufficiale [http://spark.apache.org/downloads.html](http://spark.apache.org/downloads.html) la versione opportuna.

- Decomprimere l'archivio e spostarlo in _/usr/local/spark/_

```bash
cd Downloads/
tar -xvf /home/cloudera/Downloads/spark-2.4.6-bin-hadoop2.6.tgz
sudo mv spark-2.4.6bin-hadoop2.6 /usr/local/spark
```

- Modificare i percorsi negli script di lancio di pyspark, spark-shell e spark-submit. Per agganciare il nuovo eseguibile di Spark 2 bisogna sostituire il percorso:

| Precedente percorso | Nuovo percorso   |
| ------------------- | ---------------- |
| /usr/lib/spark      | /usr/local/spark |

nei file:

- /usr/bin/pyspark
- /usr/bin/spark-shell
- /usr/bin/spark-submit

- Impostare nel PATH della shell la nuova versione di Java appena installata andando a modificare il file _.bashrc_ inserendo alla fine:

```bash
export JAVA_HOME=/usr/lib/jvm/jre-1.8.0-openjdk.x86_64

PATH=$PATH:$HOME/bin:$JAVA_HOME
export PATH
```

## Lavorare con Spark2 + Avro + Hive

Per non aver problemi sulla scrittura del metastore senza badare a questioni di sicurezza la via più semplice è quella di dare tutti i permessi alla directory di Hive

```bash
sudo chmod 777 /tmp/hive
```

Eseguire la spark-shell con il supporto ad Avro e con il puntamento al metastore di Hive

```c
spark-shell --packages org.apache.spark:spark-avro_2.11:2.4.5 --driver-java-options "-Dhive.metastore.uris=thrift://quickstart.cloudera:9083"
```

e questo dovrebbe bastare per fare gli esercizi di preparazione alla CCA175

## Tip: Reimpostare la risoluzione video

Se qualcosa dovesse andare storto con la risoluzione video della macchina virtuale il comando che fa al caso è _xrandr_.

```c
xrandr --current
xrandr --output VGA-0 --mode 1600x795
```

> L'unica chiave che apre tutte le catene è lo studio costante. (Stefano Chiacchiarini)
