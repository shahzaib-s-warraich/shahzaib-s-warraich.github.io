all: gallery.html

gallery.html: content/gallery.md
	pandoc -f markdown+implicit_figures --mathjax --standalone $< > $@
