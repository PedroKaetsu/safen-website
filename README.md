# SAFEN CYBERSECURITY - Landing Page

Repositório dedicado à hospedagem da landing page da SAFEN CYBERSECURITY utilizando GitHub Pages.

## 📋 Sobre o Projeto

Este repositório contém o código-fonte da landing page da SAFEN CYBERSECURITY, uma empresa especializada em consultoria em TI e Segurança da Informação.

## 🚀 Fluxo de Deploy

O site é hospedado no GitHub Pages e segue o seguinte fluxo:

1. **Branch de publicação**: `website`
2. **Pasta de destino**: `docs/`
3. **Build automático**: A cada commit ou push na branch `website`, o GitHub Pages automaticamente faz o build e publica o conteúdo da pasta `docs/`

### Como funciona:

- Todas as alterações devem ser feitas na branch `website`
- O arquivo principal do site está em `docs/index.html`
- Assets (imagens, CSS, etc.) devem ser colocados em `docs/assets/`
- Após fazer push para a branch `website`, o GitHub Pages detecta as mudanças e atualiza o site automaticamente

## 📁 Estrutura do Projeto

```
safen/
├── docs/                    # Pasta publicada no GitHub Pages
│   ├── index.html           # Página principal
│   └── assets/              # Recursos estáticos
│       └── images/
│           └── logo.svg     # Logo da empresa
├── README.md                # Este arquivo
└── .gitignore               # Arquivos ignorados pelo Git
```

## 🛠️ Desenvolvimento Local

Para visualizar o site localmente:

1. Clone o repositório:
   ```bash
   git clone https://github.com/PedroKaetsu/safen.git
   cd safen
   ```

2. Navegue até a pasta `docs/` e abra o `index.html` no navegador:
   ```bash
   open docs/index.html
   ```

   Ou use um servidor local simples:
   ```bash
   cd docs
   python3 -m http.server 8000
   # Acesse http://localhost:8000
   ```

## 📝 Como Contribuir

1. Faça checkout da branch `website`:
   ```bash
   git checkout website
   ```

2. Faça suas alterações nos arquivos dentro de `docs/`

3. Commit e push:
   ```bash
   git add .
   git commit -m "Descrição das alterações"
   git push origin website
   ```

4. O GitHub Pages atualizará o site automaticamente em alguns minutos

## ⚙️ Configuração do GitHub Pages

Para configurar ou verificar as configurações do GitHub Pages:

1. Acesse as configurações do repositório no GitHub
2. Vá em **Settings** → **Pages**
3. Configure:
   - **Source**: Branch `website`
   - **Folder**: `/docs`

> 📚 Para mais informações sobre GitHub Pages, consulte a [documentação oficial](https://docs.github.com/en/pages)

## 🔗 Links Úteis

- [Documentação do GitHub Pages](https://docs.github.com/en/pages)
- [Configurando uma fonte de publicação](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Troubleshooting do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites)

## 📄 Licença

© 2026 SAFEN CYBERSECURITY — Todos os direitos reservados.