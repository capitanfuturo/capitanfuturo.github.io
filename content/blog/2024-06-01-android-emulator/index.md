---
layout: post
title: "Come costruirsi un Emulatore Android senza Android Studio"
date: 2024-06-01 19:24:04 +0100
tags: ["Software"]
published: true
---

## 💾 Premessa

A lavoro ho avuto la necessità di fornire un emulatore Andorid ai Project Manager dei team di sviluppo. Ne ho provati diversi ma tutti i più promettenti oltre a non essere open source spesso si presentano con molte pubblicità e il più delle volte vengono considerati dei malware o virus dai sistemi interni dell'ufficio. Mi sono quindi deciso di provare a costruire un emulatore come quello di Android Studio senza dover installare tutta l'IDE e dover applicare le varie configurazioni iniziali necessarie per eseguirlo.

## 💥 Obiettivo

Costruire un emulatore Android senza Android Studio.

## Script powershell

Purtroppo in ufficio abbiamo tutta l'infrastruttura basata su sistemi Microsoft, lo so sono un inguaribile romantico e continuo a credere prima o poi un desktop open source possa sostituire il dominio di prodotti closed source, d'altronde anche il software che vendiamo non è open 😄. Ma passiamo direttamente allo script che è disponibile come [gist](https://gist.github.com/capitanfuturo/cf3cd49f0108a12d0345f1d53d464484) ma che riporto anche qui sotto a blocchi.

**Nota**: Lo script crea una cartella output di fianco allo script nella quale mette tutto l'occorente.

### Configurazione iniziale

Per prima cosa si impostano delle variabili con i link ai tool necessari per la creazione dell'emulatore. In particolare la JDK di Java per la compilazione del codice necessario e i command line tools di Android che sono disponibili nella pagina di download di Android Studio e in particolare sulle opzioni di download.

```powershell
# Variables
$jdkVersion = "jdk-18.0.2.1"
$commandLineTool = "commandlinetools-win-11076708"
$jdkUrl = "https://download.oracle.com/java/18/archive/" + $jdkVersion + "_windows-x64_bin.zip"
$commandLineToolsUrl = "https://dl.google.com/android/repository/" + $commandLineTool + "_latest.zip?hl=it"

$systemImage = "android-29"
$phoneName = "android29"
$device = "pixel_3a"
```

### Costruzione dell'alberatura

Lo script poi si preoccupa di avere la struttura di base come segue:

```prompt
create-emulator.ps1
├── output
│   ├── avd
│   ├── cmdline-tools          
│   ├── platform-tools
│   ├── platforms
```

Il pezzo dedicato è il seguente:

```powershell
# Directory whose contents need to be deleted
$currentDirectory = $PWD.Path
$outputDir = "$currentDirectory\output"

Write-Host "* Start creating the emulator..."

# Crea la directory principale
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir | Out-Null
    Write-Host "$outputDir created"
}
else {
    Write-Host "- $outputDir already exists"
}

# Create the subfolders
$platformsPath = "$outputDir\platforms"
$platformToolsPath = "$outputDir\platform-tools"
$avdPath = "$outputDir\avd"

if (-not (Test-Path $platformsPath)) {
    New-Item -ItemType Directory -Path $platformsPath | Out-Null
    Write-Host "- $platformsPath created"
}
else {
    Write-Host "- $platformsPath already exists"
}
if (-not (Test-Path $platformToolsPath)) {
    New-Item -ItemType Directory -Path $platformToolsPath | Out-Null
    Write-Host "- $platformToolsPath created"
}
else {
    Write-Host "- $platformToolsPath already exists"
}
if (-not (Test-Path $avdPath)) {
    New-Item -ItemType Directory -Path $avdPath | Out-Null
    Write-Host "- $avdPath created"
}
else {
    Write-Host "- $avdPath already exists"
}
```

A questo punto scarichiamo e installiamo i tools e la JDK

```powershell
# Manage command line tool
$commandLineToolsPath = "$outputDir\cmdline-tools"
if (-not (Test-Path $commandLineToolsPath)) {
    $latestFolder = "$outputDir\latest"

    Write-Host "* Extract commandlinetools. This will create $commandLineToolsPath"
    Expand-Archive -Path $zipFilePath -DestinationPath $outputDir
    
    Rename-Item -Path $commandLineToolsPath -NewName $latestFolder -Force | Out-Null
    Write-Host "- $commandLineToolsPath renamed in $latestFolder"

    New-Item -ItemType Directory -Path $commandLineToolsPath | Out-Null
    Write-Host "- $commandLineToolsPath recreated"

    Move-Item -Path $latestFolder -Destination $commandLineToolsPath
    Write-Host "- $latestFolder moved into $commandLineToolsPath"
}
else {
    Write-Host "* Command line tools already exists"
}

$zipFilePath = "$outputDir\jdk-18.0.2.1_windows-x64_bin.zip"
if (-not (Test-Path $zipFilePath)) {
    Write-Host "* Download JDK"
    Invoke-WebRequest -Uri $jdkUrl -OutFile $zipFilePath
}
else {
    Write-Host "* JDK zip already exists"
}

if (-not (Test-Path "$outputDir\$jdkVersion")) {
    Write-Host "* Extract JDK"
    Expand-Archive -Path $zipFilePath -DestinationPath $outputDir
}
else {
    Write-Host "* JDK already exists"
}
```

Salviamoci le precedenti variabili di ambiente e impostiamo quelle nuove

```powershell
# Backup ENV values
$oldAvdHome = $env:ANDROID_AVD_HOME
$oldSdkHome = $env:ANDROID_SDK_HOME
$oldSdkRoot = $env:ANDROID_SDK_ROOT
$oldJavaHome = $env:JAVA_HOME
$oldTimeout = $env:ANDROID_EMULATOR_WAIT_TIME_BEFORE_KILL

$env:ANDROID_AVD_HOME = $avdPath
$env:ANDROID_SDK_HOME = $outputDir
$env:ANDROID_SDK_ROOT = $outputDir
$env:JAVA_HOME = "$outputDir\$jdkVersion"
$env:ANDROID_EMULATOR_WAIT_TIME_BEFORE_KILL = 5
```

Segue il lavoro sporco... installare il tutto. Il consiglio è di accettare i vari termini di utilizzo e di non impostare a mano le liriadi di impostazioni dell'emulatore. Invece presettiamo un device specifico per semplificarci la vita. nel mio caso un pixel_3a.

```powershell
if (-not (Test-Path "$outputDir\system-images\$systemImage")) {
    Write-Host "* Install the system image and the platform"
    Start-Process -FilePath "$outputDir\cmdline-tools\latest\bin\sdkmanager.bat" -ArgumentList "--install", "system-images;$systemImage;google_apis;x86_64" -NoNewWindow -Wait
    Start-Process -FilePath "$outputDir\cmdline-tools\latest\bin\sdkmanager.bat" -ArgumentList "platform-tools platforms;$systemImage" -NoNewWindow -Wait
}
else {
    Write-Host "* System image and platform already exists"
}
```

Eseguiamo l'emulatore

```powershell
# start the emulator
Write-Host "* Launch the emulator"
Start-Process -FilePath "$outputDir\emulator\emulator.exe" -ArgumentList "-avd $phoneName -qemu -m 3000" -NoNewWindow -Wait

```

Ripristiniamo le variabili ambiente

```powershell
$env:ANDROID_AVD_HOME = $oldAvdHome
$env:ANDROID_SDK_HOME = $oldSdkHome
$env:ANDROID_SDK_ROOT = $oldSdkRoot
$env:JAVA_HOME = $oldJavaHome
$env:ANDROID_EMULATOR_WAIT_TIME_BEFORE_KILL = $oldTimeout
```

## 🍷 Conclusione

Lo script permette con poco sforzo di ottenere un emulatore. Quello che però può essere un punto di attenzione è la fase di build dell'APK che si vuole testare. Il sistema appena descritto si aspetta una compilazione per x86_64 ma questa potrebbe non essere disponibile se l'APK viene compilata solo per ARM. Per il resto è stato un bel esercizio di stile e mi ha fatto comprendere la complessità che c'è dietro al processo di build e debug di uno sviluppo nativo per Android.

## 🔗 Link utili

- [How to create an Android emulator terminal](https://www.wrike.com/blog/how-to-create-an-android-emulator-terminal/)
- [How to install Android emulator without Android Studio](https://community.neptune-software.com/topics/tips--tricks/blogs/how-to-install--android-emulator-without--android--st)
- [How to run Android emulator for development without Android Studio](https://medium.com/@yohan.ardiansyah90/how-to-run-android-emulator-for-development-without-android-studio-f0e73682af3a)
- [Emulator Panic Broken Avd](https://stackoverflow.com/questions/61595161/emulator-panic-broken-avd-system-path-check-your-android-sdk-root-value-f-a)

> "Se l’opportunità non bussa, costruisciti una porta.". (Milton Berle)
