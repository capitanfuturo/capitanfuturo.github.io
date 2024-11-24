.DEFAULT_GOAL := help

##help: @ Show all commands
help:
	@fgrep -h "##" $(MAKEFILE_LIST)| sort | fgrep -v fgrep | tr -d '##'  | awk 'BEGIN {FS = ":.*?@ "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	
##start-docker: @ Start the blog with docker engine
start-docker: 
	docker compose up

##start: @ Start the blog with local node
start: 
	npm run start

##code: @ Open vscode
code: 
	code .

##publish: @ Push to master and publish
publish:
	git add .
	git commit -m "publish"
	git push
	git checkout main
	git pull
	git merge develop
	git push
	git checkout develop
