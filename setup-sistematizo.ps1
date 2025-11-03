# Script para configurar remote do Sistematizo

Write-Host "🚀 Setup Sistematizo" -ForegroundColor Cyan
Write-Host ""

# 1. Verificar se já tem o remote
$remotes = git remote
if ($remotes -contains "sistematizo") {
    Write-Host "✅ Remote 'sistematizo' já existe!" -ForegroundColor Green
    git remote get-url sistematizo
} else {
    Write-Host "📝 Adicione a URL do repositório Sistematizo:" -ForegroundColor Yellow
    Write-Host "Exemplo: https://github.com/SeuUsuario/sistematizo-cnpj.git" -ForegroundColor Gray
    Write-Host ""
    $repoUrl = Read-Host "URL do repositório"
    
    if ($repoUrl) {
        git remote add sistematizo $repoUrl
        Write-Host "✅ Remote 'sistematizo' adicionado!" -ForegroundColor Green
    } else {
        Write-Host "❌ URL não fornecida. Cancelando." -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "📋 Remotes configurados:" -ForegroundColor Cyan
git remote -v

Write-Host ""
Write-Host "🎯 Próximos passos:" -ForegroundColor Yellow
Write-Host "1. Coloque a logo do Sistematizo em: client/public/logo-sistematizo.png" -ForegroundColor White
Write-Host "2. Teste localmente: cd client && npm run dev:sistematizo" -ForegroundColor White
Write-Host "3. Faça o primeiro push: git push sistematizo main" -ForegroundColor White
Write-Host ""
Write-Host "✨ Pronto! Consulte MULTI-BRAND.md para mais detalhes" -ForegroundColor Green

