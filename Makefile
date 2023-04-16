.PHONY: dist
dist: clean
	mkdir -p dist
	zip -r dist/firefox.zip * -x 'dist/*'

.PHONY: clean
clean:
	rm -rf dist
