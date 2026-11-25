# Sthetic Center V2

Base independente preparada a partir de sthetic_center_publicado em 25/11/2026.

- public_html/: raiz do site e da publicacao.
- tests/: testes existentes do fluxo da abertura.
- LEIA-ME-PUBLICACAO.txt: instrucoes herdadas. As notas de status sao historicas e nao comprovam o estado atual da hospedagem.

## Visualizar

Abra esta pasta no VS Code e inicie o Live Server. A configuracao incluida utiliza public_html como raiz para preservar os caminhos absolutos do site.

## Validar

Na raiz do repositorio:

```sh
node --test tests/opening-flow.cjs
```

## Proxima etapa

Comparar com dzcoded-ship-it/sthetic-center e selecionar com Daniel as qualidades a incorporar. A combinacao das versoes ainda nao foi iniciada.

Credenciais de FTP, backups da hospedagem e relatorios locais de publicacao nao integram este repositorio.
