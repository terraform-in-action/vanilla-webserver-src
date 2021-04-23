
# Go parameters
BINARY_NAME=server
PACKAGE_NAME=deployment
all:  clean build package
clean:
	rm -rf $(PACKAGE_NAME)
	rm -rf $(PACKAGE_NAME).zip
build: 
	cd server && GOOS=linux go build -o $(BINARY_NAME)
	cd client && npm run build
package:
	mkdir deployment
	mkdir deployment/public
	cp -r client/build/* deployment/public
	mv server/$(BINARY_NAME) deployment/$(BINARY_NAME)
	zip -r $(PACKAGE_NAME).zip deployment/*