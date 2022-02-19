.DEFAULT_GOAL := help

# prende i parametri e li converte
RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
$(eval $(RUN_ARGS):;@:)

# legge il file .env nella stessa cartella
ifneq (,$(wildcard ./dev.env))
    include dev.env
    export
endif

##help: @ Mostra tutti i comandi di questo makefile
help:
	@fgrep -h "##" $(MAKEFILE_LIST)| sort | fgrep -v fgrep | tr -d '##'  | awk 'BEGIN {FS = ":.*?@ "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	
##start: @ Avvia l'applicazione esponendo il backend sulla porta 3000 e il frontend sulla porta 4200
start: 
	npm run start

##code: @ Apre vscode
code: 
	code .
