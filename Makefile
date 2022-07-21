.DEFAULT_GOAL := help

##help: @ Show all commands
help:
	@fgrep -h "##" $(MAKEFILE_LIST)| sort | fgrep -v fgrep | tr -d '##'  | awk 'BEGIN {FS = ":.*?@ "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	
##start: @ Start the blog
start: 
	docker-compose up

##code: @ Open vscode
code: 
	code .
