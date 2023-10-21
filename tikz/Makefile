all: $(wildcard img/*.png)

img/%.png: out/%_tmp.pdf 
	convert -density 600 $< -quality 90 $@

out/%_tmp.pdf: %_tmp.tex 
	latexmk $< --outdir=out --pdf

%_tmp.tex: standalone.tex fig/%.tex 
	sed 's#file#fig/$*#' $< > $@
