<#
  verify.ps1 — vérification complète de la formation (Windows).
  À lancer depuis le dossier du projet :  pwsh -File tools\verify.ps1
  Nécessite un accès complet (navigateur headless) ; sans navigateur, seuls
  les contrôles Node sont exécutés.

  Sorties : tools\_out\selftest.txt, tools\_out\*.png, résumé console.
#>
param(
  [string]$Only = "all",
  [int]$Width = 1440,
  [int]$Height = 1100
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$outDir = Join-Path $root "tools\_out"
if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }

function Write-Step($message) { Write-Host "`n=== $message" -ForegroundColor Cyan }

# ---------------------------------------------------------------- 1. Node --
if ($Only -eq "all" -or $Only -eq "node") {
  Write-Step "Syntaxe des fichiers JavaScript"
  $bad = 0
  Get-ChildItem (Join-Path $root "assets\js") -Filter *.js | ForEach-Object {
    node --check $_.FullName 2>$null
    if ($LASTEXITCODE -ne 0) { Write-Host "  ECHEC  $($_.Name)" -ForegroundColor Red; $bad++ }
    else { Write-Host "  ok     $($_.Name)" -ForegroundColor DarkGray }
  }
  Get-ChildItem (Join-Path $root "content") -Filter *.js | ForEach-Object {
    node --check $_.FullName 2>$null
    if ($LASTEXITCODE -ne 0) { Write-Host "  ECHEC  $($_.Name)" -ForegroundColor Red; $bad++ }
    else { Write-Host "  ok     $($_.Name)" -ForegroundColor DarkGray }
  }
  node --check (Join-Path $root "start-server.mjs") 2>$null
  Write-Host ("  fichiers en erreur : {0}" -f $bad)

  Write-Step "Validation structurelle du contenu"
  node (Join-Path $root "tools\validate-content.mjs")
  $structureCode = $LASTEXITCODE
  Write-Host ("  code retour validation : {0}" -f $structureCode)
}

if ($Only -eq "node") { return }

# ------------------------------------------------------------- 2. Browser --
$browserCandidates = @(
  "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
  "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
  "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe"
)
$browser = $browserCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $browser) {
  Write-Host "`nAucun navigateur Chromium trouvé : tests navigateur ignorés." -ForegroundColor Yellow
  return
}
Write-Host "`nNavigateur : $browser"

$profile = Join-Path $env:TEMP "fw-verify-profile"
if (Test-Path $profile) { Remove-Item $profile -Recurse -Force -ErrorAction SilentlyContinue }
$base = "file:///" + ($root -replace '\\', '/')

function Invoke-Chrome([string]$arguments) {
  $cmd = '"' + $browser + '" --headless=new --disable-gpu --no-sandbox --no-first-run --disable-extensions ' +
         '--user-data-dir="' + $profile + '" --allow-file-access-from-files ' + $arguments
  $previous = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  cmd /c $cmd *> $null
  $ErrorActionPreference = $previous
}

if ($Only -eq "all" -or $Only -eq "selftest") {
  Write-Step "Self-test navigateur (corrigés + codes de départ)"
  $dest = Join-Path $outDir "selftest.txt"
  if (Test-Path $dest) { Remove-Item $dest -Force }
  $cmd = '"' + $browser + '" --headless=new --disable-gpu --no-sandbox --no-first-run --user-data-dir="' + $profile +
         '" --allow-file-access-from-files --virtual-time-budget=60000 --dump-dom "' + $base + '/tools/selftest.html" > "' + $dest + '" 2>nul'
  $previous = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  cmd /c $cmd *> $null
  $ErrorActionPreference = $previous
  Start-Sleep -Seconds 1

  if (!(Test-Path $dest) -or (Get-Item $dest).Length -eq 0) {
    Write-Host "  Le navigateur n'a rien écrit (accès sandbox ?)." -ForegroundColor Red
  } else {
    $dom = Get-Content $dest -Raw
    $text = [regex]::Matches($dom, '(?s)<pre id="out">(.*?)</pre>') | ForEach-Object { $_.Groups[1].Value }
    if (-not $text) { $text = $dom }
    $text = $text -replace '&lt;', '<' -replace '&gt;', '>' -replace '&amp;', '&' -replace '&quot;', '"'
    $lines = ($text -split "`n") | ForEach-Object { $_.TrimEnd() }
    $summary = $lines | Where-Object { $_ -match '^SUMMARY\|' }
    $fails = @($lines | Where-Object { $_ -match '^(FAIL|CRASH)\|' })
    $warns = @($lines | Where-Object { $_ -match '^WARN\|' })
    Write-Host ("  " + ($summary -join "`n  "))
    if ($warns.Count) {
      Write-Host ("  avertissements : {0}" -f $warns.Count) -ForegroundColor Yellow
      $warns | Select-Object -First 25 | ForEach-Object { Write-Host "    $_" -ForegroundColor Yellow }
    }
    if ($fails.Count) {
      Write-Host ("  ECHECS : {0}" -f $fails.Count) -ForegroundColor Red
      $fails | Select-Object -First 60 | ForEach-Object { Write-Host "    $_" -ForegroundColor Red }
    } else {
      Write-Host "  Aucun échec sur les corrigés." -ForegroundColor Green
    }
    $text | Out-File -Encoding utf8 (Join-Path $outDir "selftest-results.txt")
  }
}

if ($Only -eq "all" -or $Only -eq "layout") {
  Write-Step "Audit de mise en page (3 tailles d'écran x 10 pages)"
  $dest = Join-Path $outDir "layout.txt"
  if (Test-Path $dest) { Remove-Item $dest -Force }
  $cmd = '"' + $browser + '" --headless=new --disable-gpu --no-sandbox --no-first-run --user-data-dir="' + $profile +
         '" --allow-file-access-from-files --virtual-time-budget=600000 --dump-dom "' + $base + '/tools/layout-check.html" > "' + $dest + '" 2>nul'
  $previous = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  cmd /c $cmd *> $null
  $ErrorActionPreference = $previous
  Start-Sleep -Seconds 1

  if (!(Test-Path $dest) -or (Get-Item $dest).Length -eq 0) {
    Write-Host "  Le navigateur n'a rien écrit." -ForegroundColor Red
  } else {
    $dom = Get-Content $dest -Raw
    $text = [regex]::Matches($dom, '(?s)<pre id="out">(.*?)</pre>') | ForEach-Object { $_.Groups[1].Value }
    if (-not $text) { $text = $dom }
    $text = $text -replace '&lt;', '<' -replace '&gt;', '>' -replace '&amp;', '&' -replace '&quot;', '"'
    $lines = ($text -split "`n") | ForEach-Object { $_.TrimEnd() } | Where-Object { $_ -match '^(OK|FAIL|LAYOUT|CRASH)\|' }
    $lines | Out-File -Encoding utf8 (Join-Path $outDir "layout-results.txt")
    $summary = $lines | Where-Object { $_ -match '^LAYOUT\|' }
    $fails = @($lines | Where-Object { $_ -match '^FAIL\||^CRASH\|' })
    Write-Host ("  " + ($summary -join ""))
    if ($fails.Count) {
      Write-Host ("  ANOMALIES : {0}" -f $fails.Count) -ForegroundColor Yellow
      $fails | ForEach-Object { Write-Host "    $_" -ForegroundColor Yellow }
    } else {
      Write-Host "  Aucune anomalie de mise en page." -ForegroundColor Green
    }
  }
}

if ($Only -eq "all" -or $Only -eq "interactions") {
  Write-Step "Tests d'interaction (éditeur, vérification, quiz, projet, progression)"
  $dest = Join-Path $outDir "interactions.txt"
  if (Test-Path $dest) { Remove-Item $dest -Force }
  $cmd = '"' + $browser + '" --headless=new --disable-gpu --no-sandbox --no-first-run --user-data-dir="' + $profile +
         '" --allow-file-access-from-files --virtual-time-budget=300000 --dump-dom "' + $base + '/tools/interaction-check.html" > "' + $dest + '" 2>nul'
  $previous = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  cmd /c $cmd *> $null
  $ErrorActionPreference = $previous
  Start-Sleep -Seconds 1

  if (!(Test-Path $dest) -or (Get-Item $dest).Length -eq 0) {
    Write-Host "  Le navigateur n'a rien écrit." -ForegroundColor Red
  } else {
    $dom = Get-Content $dest -Raw
    $text = [regex]::Matches($dom, '(?s)<pre id="out">(.*?)</pre>') | ForEach-Object { $_.Groups[1].Value }
    if (-not $text) { $text = $dom }
    $text = $text -replace '&lt;', '<' -replace '&gt;', '>' -replace '&amp;', '&' -replace '&quot;', '"'
    $lines = ($text -split "`n") | ForEach-Object { $_.TrimEnd() } | Where-Object { $_ -match '^(OK|FAIL|CRASH|INTERACTIONS)\|' }
    $lines | Out-File -Encoding utf8 (Join-Path $outDir "interactions-results.txt")
    $summary = $lines | Where-Object { $_ -match '^INTERACTIONS\|' }
    $fails = @($lines | Where-Object { $_ -match '^FAIL\||^CRASH\|' })
    Write-Host ("  " + ($summary -join ""))
    $lines | Where-Object { $_ -match '^OK\|' } | ForEach-Object { Write-Host "    $_" -ForegroundColor DarkGray }
    if ($fails.Count) {
      Write-Host ("  ANOMALIES : {0}" -f $fails.Count) -ForegroundColor Yellow
      $fails | ForEach-Object { Write-Host "    $_" -ForegroundColor Yellow }
    } else {
      Write-Host "  Tous les parcours d'interaction fonctionnent." -ForegroundColor Green
    }
  }
}

if ($Only -eq "all" -or $Only -eq "shots") {
  Write-Step "Captures d'écran"
  $pages = @(
    @{ name = "01-accueil";     url = "$base/index.html" },
    @{ name = "02-module";      url = "$base/index.html#/module/css" },
    @{ name = "03-lecon";       url = "$base/index.html#/lesson/html-01" },
    @{ name = "04-exercice";    url = "$base/index.html#/exercise/html-ex-01" },
    @{ name = "05-quiz";        url = "$base/index.html#/quiz/html" },
    @{ name = "06-projet";      url = "$base/index.html#/projet" },
    @{ name = "07-guide";       url = "$base/index.html#/guide" },
    @{ name = "08-progression"; url = "$base/index.html#/progression" }
  )
  foreach ($page in $pages) {
    $file = Join-Path $outDir ($page.name + ".png")
    if (Test-Path $file) { Remove-Item $file -Force }
    Invoke-Chrome ("--window-size={0},{1} --hide-scrollbars --virtual-time-budget=8000 --screenshot=`"{2}`" `"{3}`"" -f $Width, $Height, $file, $page.url)
    Start-Sleep -Milliseconds 400
    if (Test-Path $file) { Write-Host ("  ok  {0} ({1} octets)" -f $page.name, (Get-Item $file).Length) -ForegroundColor Green }
    else { Write-Host ("  ECHEC {0}" -f $page.name) -ForegroundColor Red }
  }
}

Write-Host "`nTerminé. Résultats dans tools\_out\" -ForegroundColor Cyan
