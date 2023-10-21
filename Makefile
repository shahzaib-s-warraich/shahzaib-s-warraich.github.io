all: gallery.html smislinear.html

gallery.html: content/gallery.md
	pandoc -f markdown+implicit_figures --mathjax --standalone $< > $@

smislinear.html: content/smislinear.md
	pandoc --mathjax --standalone $< > $@
