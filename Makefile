all: gallery.html smislinear.html deep-ba-sampling.html differentiable-binary-to-onehot.html

gallery.html: content/gallery.md
	pandoc -f markdown+implicit_figures --mathjax --standalone $< > $@

smislinear.html: content/smislinear.md
	pandoc --mathjax --standalone $< > $@

deep-ba-sampling.html: content/deep-ba-sampling.md
	pandoc --mathml --standalone $< > $@

differentiable-binary-to-onehot.html: content/differentiable-binary-to-onehot.md
	pandoc --mathml --standalone $< > $@
