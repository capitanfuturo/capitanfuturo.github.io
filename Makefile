.DEFAULT_GOAL := help

##help: @ Show all commands
help:
	@fgrep -h "##" $(MAKEFILE_LIST)| sort | fgrep -v fgrep | tr -d '##'  | awk 'BEGIN {FS = ":.*?@ "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	
##start: @ Start the blog with docker engine
start: 
	docker compose up

##code: @ Open vscode
code: 
	code .

##publish: @ Push to master and publish (MSG="..." required) -- es: make publish MSG="nuovo post"
publish:
ifndef MSG
	$(error MSG is required: make publish MSG="your commit message")
endif
	git add .
	git commit -m "$(MSG)"
	git push
	git checkout main
	git pull
	git merge develop
	git push
	git checkout develop
