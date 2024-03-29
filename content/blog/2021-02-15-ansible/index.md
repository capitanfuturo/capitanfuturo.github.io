---
layout: post
title: "Ansible, una breve guida"
date: 2021-02-15 18:24:04 +0100
tags: [ComputerScience]
published: true
---

## :computer: Introduzione

Ansible è un prodotto Open Source di RedHat che permette di automatizzare la configurazione di server Linux like e Window. In questo breve post proverò a riassumere i concetti salienti per iniziarlo ad usare in modo produttivo.

L'architettura di base consiste in una macchina controllore (dove viene eseguito ansible) e i nodi target.

Per la comunicazione ci si basa su SSH mentre i prerequisiti per la macchina controllore sono aver installato python, pip ed ansible.

In questa pagina ho cercato di riassumere i concetti base del prodotto.

## Teoria

- Ansible si può paragonare ad un manager di macchine a stati per server Linux e Windows. Permette di dichiarare con del codice lo stato che si vuole impostare ad un server.
- Realizza un modo per ottenere la **Configuration as code**
- Permette di automatizzare task complessi e comuni.

### Cosa vuole risolvere

- Evitare errori umani
- Rendere la configurazione trasparente
- Rendere la configurazione ripetibile e deterministica
- **Documentare la configurazione dal codice stesso**
- **Rendere la configurazione portabile**
- Ridurre il tempo di configurazione

## Installazione

Per poter installare sulla macchina di controllo ansible serve avere **python3** e **pip3** installato nel proprio sistema

```bash
sudo apt install python3-pip
pip install ansible
ansible --version
```

### Creazione di una chiave ssh

La chiave ssh ci permette di accedere in maniera controllata al server privato in cloud o on premise che vogliamo configurare. Questo è il prerequisito per eseguire ansible. Creaiamo una chiave con il comando:

```bash
ssh-keygen -f ~/.ssh/nomefile
```

scegliamo il percorso e il nome file e una passphrase. Ora è possibile vedere la chiave pubblica con un semplice

```bash
cat $HOME/.ssh/nomefile.pub
```

### Installazione della chiave nel server target

Per installare la chiave ssh appena creata nel server target usiamo il comando:

```bash
ssh-copy-id -i ~/.ssh/nomefile.pub user@host
```

### Test della nuova chiave SSH

Possiamo provare la chiave appena installata con il comando:

```bash
ssh -i ~/.ssh/nomefile user@host
```

## System inventory

Un inventory Ansbile:

- contiene tutti gli indirizzi dei server (hostnames o IP)
- si possono usare dei gruppi per organizzare i server da gestire con Ansible
- può essere un file statico o provisionato da linea di comando o dinamicamente con API

es INI file **inventory.ini**

```ini
[webservers] #<- GROUP 1
104.248.97.73
104.248.97.74

[databases] #<- GROUP 2
104.248.97.75
```

ma possiamo usare anche file yaml

### Test del file inventory.ini

Adesso possiamo usarlo per eseguire un ping a tutti i server con ansible

```bash
ansible -i inventory.ini -u root -m ping all
```

dove:

- -u user di login
- -m module
- all per tutti i gruppi

## Ad-hoc commands

Il ping è solo uno dei comandi che possiamo usare. In generale questi comandi che eseguono un compito atomico vengono chiamati comandi ad hoc o **moduli** e possono servire per:

- Riavviare i server
- Gestire file
- Gestire pacchetti
- Gestire utenti e gruppi
- Gestire servizi
- Raccogliere informazioni

### Creare un utente Linux con il comando user

Uno dei comandi ad hoc è il modulo user che serve per creare delle utenze.

```bash
ansible -i inventory.ini -u root -m user -a "name=capitanfuturo state=present" all
```

dove:

- -a per gli argomenti
- state present per creare, absent per eliminare

### Installare un package

modulo package per installere dei pacchetti

```bash
ansible -i inventory.ini -u root -m package -a "name=nginx state=present" webserver
```

## Playbook

Il playbook è come un linguaggio **dichiaritivo** della **configurazione**, **installazione** e **orchestrazione** di Ansible.

Riprendendo la guida ufficiale:

_se i moduli sono gli strumenti, i playbook sono i manuali di istruzioni e l'inventory elencano i materiali grezzi gli host._

le caratterisctiche pricipali sono quindi:

- flessibilità
- possono essere innestati
- è una collezione di azioni, **Plays**, che sono a loro volta una collezione di **Task** che eseguono **moduli** (vedi i comandi ad hoc)
- documenta la configurazione di un server in modo dichiarativo

Per iniziare a scrivere un playbook creiamo un file **master.yml**. Come abbiamo scritto prima un playbook è una collezione di Plays che contiene task. Di seguito un esempio:

```yaml
- name: CONFIGURA WEBSERVER # <- si vedrà in console per il plays
  hosts: webservers # <- vedasi i gruppi in inventory.ini
  tasks:
    - name: Crea un utente non root # <- si vedrà in console per il task
      user: # <--- vedasi i moduli dei comandi ad-hoc
        name: capitanfuturo
      state: present
    - name: Installa nginx
      package:
        name: nginx
      state: present
```

per eseguire il playbook eseguiamo il comando:

```bash
ansible-playbook master.yml -i inventory.ini -u root
```

una volta eseguito potremmo vedere il risultato dell'esecuzione nella sezione _PLAY RECAP_.

## Ruoli

Un ruolo in Ansible è un pezzo di codice rieseguibile. Possiamo immaginarlo come un **package** di playbooks e configurazione che dovrebbe gestire una sola cosa, per un solo obiettivo.

Questo lo rende molto **portabile** e **riusabile** in diversi progetti di configuration as a code.

Essendo dichiaritivo e sotto forma di codice è anche versionabile

Vediamo per esempio la struttura del ruolo _common_. Il ruolo più usato

```bash
roles/
	common/
		tasks/
		handlers/
		files/
		templates/
		vars/
		defaults/
		meta/
```

Alcune directory sono obbligatorie:

- tasks
- defaults
- meta

mentre le altre sono opzionali.

Nella cartella tasks si possono scrivere tutti i playbook che si vogliono e che verranno eseguiti.

I ruoli possono essere pubblicati in un repository pubblico come per esempio **Ansible galaxy**

### Defaults

In defaults possiamo dichiare le varibili di default per il nostro role. Il file si chiama main.yaml ed è sttutturato come tale. Proviamo ad esempio a dichiare una lista di utenti:

```yaml
users:
  - username: pippo
    state: present
  - username: pluto
    state: present
  - username: paperino
    state: absent
```

### Tasks

Nella cartella tasks possiamo mettere i nostri playbook, la cosa interessante è che possiamo richiamare le variabili della direcotry dei defaults attraverso la sintassi del motore di template di python [Jinjia](https://jinja.palletsprojects.com/) come nell'esempio seguente per il solito file main.yaml:

```yaml
- name: Gestione utenti
  user: {% raw
    name: "{{ item.username }}"
  state: "{{ item.state }}"
  loop: "{{ users }}" # <- cicla sull'array users dei defaults
  {% endraw
```

### Uso dei ruoli nel playbook

Per usare un ruolo ein un playbook si usa la chiave **_roles_ che deve sempre essere scritta prima dei tasks**. Prendendo l'esempio precedente e immaginando di aver creato un ruolo chiamato users per la gestione degli utenti possiamo scrivere quanto segue:

```yaml
- name: CONFIGURA WEBSERVER # <- si vedrà in console per il plays
  hosts: webservers # <- vedasi i gruppi in inventory.ini
  roles:
    - users
  tasks:
    - name: Installa nginx
      package:
        name: nginx
      state: present
```

## Variabili, Condizioni booleane e cicli

Alcuni dei costrutti più comuni nei linguaggi di programmazione sono disponibili anche in Ansible.

### Variabili

Se vogliamo dichiarare delle varibili come visto per i default possiamo farlo direttamente nel playbook. La dichiarazione va fatta sotto la sezione _vars_ e poi può essere usata per esempio nella sezione _tasks_ come segue:

```yaml
- name: CONFIGURA WEBSERVER
  hosts: webservers
  vars:
    message: "Hello World" # <- valore scalare, (chiave, valore)
    mylist: [1,2,3] # <- lista numerica
    myliststr: # <- lista di stringhe
      - "Hello"
      - "World"
    mymap: # <- mappa
      uno: "hello"
      due: "world"
  tasks: {% raw
    - debug:
        msg: "message: {{ message }}"
    - debug:
        msg: "mylist: {{ mylist }}"
    - debug:
        msg: "myliststr: {{ mylist1 }}"
    - debug:
        msg: "myliststr: {{ mymap.uno }} {{ mymap.due }}"
    {% endraw
```

### Condizioni

Ansible permette di eseguire dei task a fronte di alcune condizioni. Per farlo possiamo usare la keyword _when_ come nell'esempio che segue.

Altri operatori sono:

- _not_ per negare una condizione
- _and_ inteso come AND logico
- _or_ inteso come OR logico

Per scrivere condizioni complesse si possono usare le _parentesi_ come si usa normalmente in un linguaggio di programmazione.

```yaml
- name: CONFIGURA WEBSERVER
  hosts: webservers
  vars:
    runTask: true
    mylist: 1
  tasks:
    - debug:
        msg: "Go go go!"
      when: runTask
    - dbug:
        msg: "Do not run"
      when: not runtask
```

#### AND come elenco di condizioni

E' possibile usare un elenco di condizioni che verranno considerate di default come degli AND:

```yaml
- name: CONFIGURA WEBSERVER
  hosts: webservers
  vars:
    runTask: true
    mylist: [1, 2, 3]
  tasks:
    - debug:
        msg: "Go go go!"
      when:
        - runTask
        - mylist[1] == true
```

#### OR come elenco di condizioni

E' possibile usare un elenco di condizioni ma affinchè siano valutate come OR dobbiamo scrivere le condizioni come segue:

```yaml
- name: CONFIGURA WEBSERVER
  hosts: webservers
  vars:
    runTask: true
    mylist: [1, 2, 3]
  tasks:
    - debug:
        msg: "Go go go!"
      when:
        - runTask
        - or # <- Dobbiamo aggiungere qui un OR logico
        - mylist[1] == true
```

## Cicli, Loop

Dalla versione 2.5 è disponibile la keyword _loop_ usato per semplici cicli. Esiste anche la keyword _with_items_ ma per la maggior parte dei casi basterà il loop.

```yaml
- name: CONFIGURA WEBSERVER
  hosts: webservers
  vars:
    mylist: [1, 2, 3]
    mymaplist:
      - key: 1
        value: a
      - key: 2
        value: b
    myobject:
      name: capitanfuturo
      age: 39
  tasks:
    - debug:
        msg: "Go list {{item}}"
      loop: "{{ mylist }}" # <- allo stesso livello del nome del modulo
    - debug:
        msg: "Go map list values: {{item.value}}"
      loop: "{{ mymaplist }}"
    - debug:
        msg: "Go obj properties {{item}}"
      loop: "{{ myobject|dict2items }}" # <- converte le property in mappe (chiave,valore)
```

## Tags

I tags sono molto utili a livello di Task, e possono essere usati per selezionare quale task eseguire.

I tags vengono dichiarati con la keyword _tags_ e va inserita alla fine del task da raggruppare.

Tutti i task con lo stesso tag vengono raggruppati logicamente.

Per eseguire un tag il comando è:

```bash
ansible-playbook master.yml -i inventory.ini -u root --tags=<nome del tag>
```

Per non eseguire un tag il comando è

```bash
ansible-playbook master.yml -i inventory.ini -u root --skip-tags=<nome del tag>
```

## Ansible Galaxy

Ansible Galaxy è un HUB, un registry dove trovare dei ruoli utili per costruire la propria configurazione as code: [https://galaxy.ansible.com/](https://galaxy.ansible.com/)

Per usare un ruolo il comando da usare è:

```bash
ansible-galaxy install <nome del ruolo>
```

Di default ansible installa i ruoli in _/etc/ansible/roles_ che richiede permesso di root per poter scrivere. Se si vuole sofrascrivere questo comportamento si può usare il flag **--roles-path** oppure la variabile di ambiente **ANSIBLE_ROLES_PATH**

```bash
ansible-galaxy install --roles-path ~/ansible-roles <nome del ruolo>
```

### Dichiarazione delle dipendenze

Un buon metodo per descrivere le dipendenze ai ruoli in ansible galaxy è l'udo del file **requirements.yml**

```bash
ansible-galaxy install -r requirements.yml
```

un esempio di file è:

```yaml
- src: yatesr.timezone

# from GitHub
- src: https://github.com/bennojoy/nginx

# from GitHub, overriding the name and specifying a specific tag
- src: https://github.com/bennojoy/nginx
  version: master
  name: nginx_role

# from a webserver, where the role is packaged in a tar.gz
- src: https://some.webserver.example.com/files/master.tar.gz
  name: http-role
```

## Conclusione

Ansible è uno dei taselli che possiamo usare per relaizzare i processi di dev-ops in azienda. Ci può aiutare in qui contesti nei quali ci è utile installare nuovi nodi della nostra architettura in maniera controllata e dichiarativa. Questa pagina non è altro che un blocco note e non pretende di essere esaustiva ma un punto di partenza per imparare sempre di più ad usare questo strumento.

## Links

- [https://www.ansible.com/](https://www.ansible.com/)
- [https://galaxy.ansible.com/](https://galaxy.ansible.com/)
- [https://jinja.palletsprojects.com/en/2.11.x/](https://jinja.palletsprojects.com/en/2.11.x/)

> La felicità si trova nel fare, non solo nel possedere. (Napoleon Hill).
