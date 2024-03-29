---
layout: post
title: "WSL2 + GUI: Installare XFCE4 in WSL2 (Ubuntu 20.04)"
date: 2021-08-05 19:24:04 +0100
tags: ["Software"]
published: true
---

## :floppy_disk: Premessa

Sto facendo pratica con Kubernates su AWS (EKS) per un nuovo cliente. E' interessante sporcarsi le mani su un prodotto solo studiato e visto come architetto software. Mi rendo conto che molti "architetti", me compreso, spesso hanno disegnato sistemi complessi senza realmente padroneggiare la tecnologia ma seguendo white paper e casi d'uso dei provider di soluzioni cloud. Sporcarsi le mani e andare più sull'operation ti permette di comprendere più a fondo l'essenza dell'oggetto che si ha di fronte e di conseguenza di calarlo nelle soluzioni più adatte.

Nel mio caso particolare non riuscivo a fare un port forwarding di una dashboard di kubernates [https://docs.aws.amazon.com/eks/latest/userguide/dashboard-tutorial.html](https://docs.aws.amazon.com/eks/latest/userguide/dashboard-tutorial.html) attraverso WSL2 su Windows 10. Per risolvere la cosa ho seguito la strada di connettere Windows 10 attraverso un server RDP servito da WSL2. Qui mi sono scritto i passaggi per non perdermeli.

## Pulizia preliminare

Prima di iniziare dobbiamo assicuraci di pulire questo pacchetto. Dal terminale di Ubuntu WSL2 eseguire

```bash
sudo apt-get purge xrdp
```

## Installazione dei pacchetti

Ora si installa il server per la connessione RDP da Windows al Window Manager di WSL2, il windows manager XFCE4 (ho scelto questo per la sua leggerezza) ed un browser. Sempre da terminale di WSL 2 eseguire il seguente comando.

```bash
sudo apt-get install xrdp xfce4 xfce4-goodies firefox
```

## Configurazione

Passiamo alla configurazione del server RDP. Faremo un backup della precedente configurazione in caso qualcosa vada storto e anciamo ad abilitare la porta 3390 per la connessione da Windows 10.

```bash
sudo cp /etc/xrdp/xrdp.ini /etc/xrdp/xrdp.ini.bak
sudo sed -i 's/3389/3390/g' /etc/xrdp/xrdp.ini
sudo sed -i 's/max_bpp=32/#max_bpp=32\nmax_bpp=128/g' /etc/xrdp/xrdp.ini
sudo sed -i 's/xserverbpp=24/#xserverbpp=24\nxserverbpp=128/g' /etc/xrdp/xrdp.ini
echo xfce4-session > ~/.xsession
```

Ora correggiamo il windows manager da usare di default con il server RDP:

```bash
sudo nano /etc/xrdp/startwm.sh
```

Commentare queste ultime righe:

```bash
# test -x /etc/X11/Xsession && exec /etc/X11/Xsession
# exec /bin/sh /etc/X11/Xsession
```

e aggiungere le seguenti due:

```bash
# xfce
startxfce4
```

## Avvio del server RDP

Possiamo quindi procedere a testare il tutto con il seguente comando:

```bash
sudo /etc/init.d/xrdp start
```

Ora in Window avviare una connessione al desktop remoto `localhost:3390` inserendo quando richiesto username e password.

## Conclusione

Nel momento in cui sto scrivendo Microsoft sta già lavorando per portare il supporto alla GUI di WSL con il progetto WSLg. Purtroppo non è ancora disponibile se non per gli insider e non è adatto in un contesto di produzione. Questa procedura è un pò macchinosa ma permette di risolvere eventuali problemi di WSL2 [https://github.com/microsoft/WSL/issues/4199](https://github.com/microsoft/WSL/issues/4199) sul port fowarding tra WSL2 e WIndows 10.

## Riferimenti

- [https://dev.to/darksmile92/linux-on-windows-wsl-with-desktop-environment-via-rdp-522g](https://dev.to/darksmile92/linux-on-windows-wsl-with-desktop-environment-via-rdp-522g)
- [https://davidbombal.com/wsl2-ubuntu-gui/](https://davidbombal.com/wsl2-ubuntu-gui/)

> L'unico uomo che non commette mai errori, è l'uomo che non fa mai niente. (Theodore Roosevelt)
