SOURCEDIR = ./src
OUTDIR = ./out

all:
	mkdir -p $(OUTDIR)
	uglifyjs $(SOURCEDIR)/automata.js > $(OUTDIR)/morse.js;
	uglifyjs $(SOURCEDIR)/morse.js >> $(OUTDIR)/morse.js;

forhtml:
	mkdir -p $(OUTDIR)
	uglifyjs $(SOURCEDIR)/forhtml.js > $(OUTDIR)/morse.js;
	uglifyjs $(SOURCEDIR)/automata.js >> $(OUTDIR)/morse.js;
	uglifyjs $(SOURCEDIR)/morse.js >> $(OUTDIR)/morse.js;

help:
	echo "npm install";
	
clean:
	rm -r $(OUTDIR)
