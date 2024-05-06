---
layout: post
title: ""
date: 2024-06-01 19:24:04 +0100
tags: ["Software"]
published: false
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
# variables
$jdkVersion = "jdk-18.0.2.1"
$jdkUrl = "https://download.oracle.com/java/18/archive/jdk-18.0.2.1_windows-x64_bin.zip"
$commandLineToolsUrl = "https://dl.google.com/android/repository/commandlinetools-win-11076708_latest.zip?hl=it"

$systemImage = "android-33"
$phoneName = "android33"
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

Write-Host "Creating the emulator."

# Crea la directory principale
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir
}
else {
    Write-Host "$outputDir already exists"
}

# Crea le sotto-directory
$platformsPath = "$outputDir\platforms"
$platformToolsPath = "$outputDir\platform-tools"
$cliToolsPath = "$outputDir\cmdline-tools"
$avdPath = "$outputDir\avd"

if (-not (Test-Path $platformsPath)) {
    Write-Host "Creating $platformsPath"
    New-Item -ItemType Directory -Path $platformsPath 
}
else {
    Write-Host "$platformsPath already exists"
}
if (-not (Test-Path $platformToolsPath)) {
    Write-Host "Creating $platformToolsPath"
    New-Item -ItemType Directory -Path $platformToolsPath
}
else {
    Write-Host "$platformToolsPath already exists"
}
if (-not (Test-Path $avdPath)) {
    Write-Host "Creating $avdPath"
    New-Item -ItemType Directory -Path $avdPath 
}
else {
    Write-Host "$avdPath already exists"
}
```

A questo punto scarichiamo e installiamo i tools e la JDK

```powershell
$zipFilePath = "$outputDir\commandlinetools-win-11076708_latest.zip"
if (-not (Test-Path $zipFilePath)) {
    Write-Host "Download command line tools."
    Invoke-WebRequest -Uri $commandLineToolsUrl -OutFile $zipFilePath
}
else {
    Write-Host "$zipFilePath already exists"
}

if (-not (Test-Path $cliToolsPath)) {
    Write-Host "Extract commandlinetools. This create $cliToolsPath"
    Expand-Archive -Path $zipFilePath -DestinationPath $outputDir
    Write-Host "Move $cliToolsPath into $outputDir\latest"
    Move-Item -Path $cliToolsPath -Destination "$outputDir\latest"
    Write-Host "Create  $cliToolsPath"
    New-Item -ItemType Directory -Path  $cliToolsPath
    Write-Host "Move $outputDir\latest into  $cliToolsPath"
    Move-Item -Path "$outputDir\latest" -Destination "$cliToolsPath"
}
else {
    Write-Host "$outputDir\latest already exists"
}

$zipFilePath = "$outputDir\jdk-18.0.2.1_windows-x64_bin.zip"
if (-not (Test-Path $zipFilePath)) {
    Write-Host "Download JDK"
    Invoke-WebRequest -Uri $jdkUrl -OutFile $zipFilePath
}
else {
    Write-Host "$zipFilePath already exists"
}

if (-not (Test-Path "$outputDir\$jdkVersion")) {
    Write-Host "Extract JDK"
    Expand-Archive -Path $zipFilePath -DestinationPath $outputDir
}
else {
    Write-Host "$outputDir\$jdkVersion already exists"
}
```

Salviamoci le precedenti variabili di ambiente e impostiamo quelle nuove

```powershell
# backup env val
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
    Start-Process -FilePath "$outputDir\cmdline-tools\latest\bin\sdkmanager.bat" -ArgumentList "--install", "system-images;$systemImage;google_apis;x86_64" -NoNewWindow -Wait
    Start-Process -FilePath "$outputDir\cmdline-tools\latest\bin\sdkmanager.bat" -ArgumentList "platform-tools platforms;$systemImage" -NoNewWindow -Wait
}

if (-not (Test-Path "$outputDir\avd\$phoneName.avd")) {
    Start-Process -FilePath "$outputDir\cmdline-tools\latest\bin\avdmanager.bat" -ArgumentList "create avd --name $phoneName --package system-images;$systemImage;google_apis;x86_64 --tag google_apis --abi x86_64 --device $device" -NoNewWindow -Wait
}
```

Eseguiamo l'emulatore

```powershell
# Write-Host "Emulator created."
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
