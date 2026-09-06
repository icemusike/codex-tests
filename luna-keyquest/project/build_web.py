from pathlib import Path
import re
root=Path(__file__).resolve().parent
html=(root/'src/index.html').read_text()
for key,file in [('CSS','style.css'),('ART','art.js'),('GAME','game.js')]:
    html=html.replace('/*__'+key+'__*/',(root/'src'/file).read_text())
(root/'web').mkdir(exist_ok=True)
(root/'web/index.html').write_text(html)
try:
 import cairosvg
 for size in (192,512):
    cairosvg.svg2png(url=str(root/'web/icon.svg'),write_to=str(root/f'web/icon-{size}.png'),output_width=size,output_height=size)
except ImportError:
 print('CairoSVG is needed only if icon PNGs are missing.')
