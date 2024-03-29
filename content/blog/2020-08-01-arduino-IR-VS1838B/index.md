---
layout: post
title: "Arduino e il ricevitore IR VS1838B"
date: 2020-08-01 18:24:04 +0100
tags: [Arduino]
published: true
---

## :computer: Premessa

Un altro componente da tenere nella propria cassetta degli attrezzi di Arduino può essere un ricevitore a infrarossi (IR). Lo usiamo comunemente nei telecomandi dei televisori e può essere utile per pilotare con semplici comandi prestabiliti la logica di un Arduino.

## Pinout del componente VS1838B

Visto frontalmente il componente presenta 3 PIN con il seguente schema:

![ir-pinout.jpg](./ir-pinout.jpg)

- Segnale
- Terra. GND
- Alimentazione. VDD

## Installazione della libreria Arduino-IRremote

Per aiutarci sulla gestione del ricevitore IR possiamo avvalerci di una libreria di terze parti: Arduino-IRremote che si trova in github a questo indirizzo: [http://z3t0.github.io/Arduino-IRremote/](http://z3t0.github.io/Arduino-IRremote/).
Per installare la libreria bisogna eseguire il download della libreria e andarlo ad importare nell'Arduino IDE dal menu principale selezionando:

1. Sketch
2. Include Library
3. Add .ZIP Library

Una volta fatto possiamo usare uno sketch come quello sottostante dopo aver connesso il PIN del segnale del ricevitore IR al PIN 7 di Arduino. Nell'esmpio potremo vedere nella console seriale i segnali inviati da un telecomando come quello della foto qui sotto:

![telecomando.jpg](./telecomando.jpg)

```c
#include <IRremote.h>
#include <IRremoteInt.h>

const unsigned int RECV_PIN = 7; // PIN segnale -> Arduino
IRrecv irrecv(RECV_PIN);
decode_results results;

void setup(){
  Serial.begin(9600); //inizializzo la seriale
  irrecv.enableIRIn(); //abilito il ricevitore
  irrecv.blink13(true); //configuro il LED al PIN 13 di Arduino ad illuminarsi all'arrivo di un segnale
}

void loop(){
  if (irrecv.decode(&results)){
        Serial.println(results.value, HEX); // stampo il codice arrivato dal telecomando in formato esadecimale
        irrecv.resume(); // mi preparo a ricevere un nuovo segnale
  }
}
```

Di seguito una foto del cablaggio:

![schema.jpg](./schema.jpg)

## Mappatura dei tasti del telecomando (codici HEX)

Dallo sketch precedente possiamo iniziare a mappare tutti i tasti del nostro telecomando per poterli poi usare nei nostri porssimi progetti. Da notare che nel mio caso c'è un segnale che arriva sempre e che viene usato come terminatore 0xFFFFFFFF

Esempio:

```c
FFA25D
FFFFFFFF
```

Qui di seguito porto la mappatura del telecomando che avevo in dotazione.

| PULSANTE | CODICE |
| -------- | ------ |
| CH-      | FFA25D |
| CH       | FF629D |
| CH+      | FFE21D |
| <<       | FF22DD |
| >>       | FF02FD |
| >ll      | FFC23D |
| -        | FFE01F |
| +        | FFA857 |
| EQ       | FF906F |
| 0        | FF6897 |
| 100+     | FF9867 |
| 200+     | FFB04F |
| 1        | FF30CF |
| 2        | FF18E7 |
| 3        | FF7A85 |
| 4        | FF10EF |
| 5        | FF38C7 |
| 6        | FF5AA5 |
| 7        | FF42BD |
| 8        | FF4AB5 |
| 9        | FF52AD |

## Leggere l'output Arduino dalla seriale con Linux

Un comando che ho trovato utile per leggere i segnali ricevuti dal telecomando direttamente dal terminale di Linux è il tail sul device al quale è montato Arduino. Nel mio caso /dev/ttyACM1:

```c
tail -f /dev/ttyACM1
```

## Conclusione

Tempo fa mi si è rotta una striscia LED che usavo per illuminare il retro della telivisione in camera. Il telecomnado infatti è un residuo di quel prodotto che a un certo punto ha smesso di funzionare. Dopo i porgetti sui LED ho pensato che sfruttando Arduino e la striscia che acora ho nel cassetto avrei potuto dargli nuova vita.
Ecco che questo progetto mi ha permesso di fare esperienza del mattoncino mancante per mettere insieme le due cose. Probabilmente scriverò qualcosa a riguardo nei prossimi post.

## Link Utili

[https://www.youtube.com/watch?v=zLR8EevE5_A](https://www.youtube.com/watch?v=zLR8EevE5_A)
[http://z3t0.github.io/Arduino-IRremote/](http://z3t0.github.io/Arduino-IRremote/)

> Acqua e luce creano l'arco dei sette colori. (Silvia Zoncheddu)
