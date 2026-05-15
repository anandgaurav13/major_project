# Use Node 22 (required for better-sqlite3). Falls back to Cursor's bundled Node.
$node22 = "C:\Program Files\nodejs\node.exe"
$cursorNode = "$env:LOCALAPPDATA\Programs\cursor\resources\app\resources\helpers\node.exe"

if (Test-Path $node22) {
  $ver = & $node22 -v
  if ($ver -match "^v22\.") {
    $env:Path = "C:\Program Files\nodejs;" + $env:Path
  } elseif (Test-Path $cursorNode) {
    Write-Host "Node $($ver.Trim()) detected — using Cursor Node 22 for this session."
    $env:Path = "$(Split-Path $cursorNode);C:\Program Files\nodejs;" + $env:Path
  }
} elseif (Test-Path $cursorNode) {
  $env:Path = "$(Split-Path $cursorNode);C:\Program Files\nodejs;" + $env:Path
}

Set-Location $PSScriptRoot
Write-Host "Node: $(node -v)"
npm run dev
