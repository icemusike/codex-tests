from playwright.sync_api import sync_playwright
from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from functools import partial
import threading,json
root=Path('/tmp/luna-build/web');out=Path('/tmp/luna-release/browser-tests');out.mkdir(parents=True,exist_ok=True)
server=ThreadingHTTPServer(('127.0.0.1',8765),partial(SimpleHTTPRequestHandler,directory=str(root)))
threading.Thread(target=server.serve_forever,daemon=True).start()
checks=[]
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,args=['--no-sandbox'])
 c=b.new_context(viewport={'width':1280,'height':800},has_touch=True)
 page=c.new_page();errors=[]
 page.on('pageerror',lambda error:errors.append(str(error)))
 page.goto('http://127.0.0.1:8765/',wait_until='networkidle')
 page.wait_for_timeout(300);page.screenshot(path=str(out/'home-tablet.png'))
 page.click('#start-button');page.click('[data-action="tutorial-start"]');page.wait_for_timeout(300)
 page.keyboard.press('a');assert page.evaluate('Game.score')==10
 page.keyboard.press('z');assert page.evaluate('Game.wrong')==1
 key=page.evaluate('Game.target().text[Game.target().done]');page.locator(f'.key[data-key="{key}"]').tap();assert page.evaluate('Game.hits')==2
 checks+=['physical keyboard events','touch keyboard','wrong-key feedback']
 page.click('#pause-button');elapsed=page.evaluate('Game.elapsed');page.wait_for_timeout(200);assert page.evaluate('Game.elapsed')==elapsed
 page.click('[data-action="resume"]');page.wait_for_timeout(100);assert page.evaluate('Game.elapsed')>elapsed
 checks.append('pause and resume')
 page.screenshot(path=str(out/'play-tablet.png'))
 page.set_viewport_size({'width':390,'height':844});page.wait_for_timeout(200)
 assert page.evaluate('document.documentElement.scrollWidth')==390
 assert page.locator('[data-key="M"]').is_visible();page.screenshot(path=str(out/'play-mobile.png'))
 checks.append('portrait resize with no overflow')
 page.evaluate('Game.finish()');assert page.evaluate('data.totalHits')==2
 page.click('[data-action="go-home"]');page.reload(wait_until='networkidle');assert page.evaluate('data.totalHits')==2
 checks.append('progress persists after reload')
 page.evaluate("data.mode='zen';data.selected=4;data.seenTutorial=true;beginSession()")
 page.wait_for_timeout(200);assert page.evaluate('Game.items[0].text')=='LUNA'
 page.keyboard.type('luna',delay=30);assert page.evaluate('Game.cleared')==1
 page.evaluate('Game.elapsed=999');page.wait_for_timeout(100);assert page.evaluate('Game.running')
 page.evaluate('Game.finish()');page.click('[data-action="go-home"]')
 checks+=['word typing','untimed practice']
 page.evaluate('data.mode="duo";data.selected=0;beginSession()');page.click('[data-action="duo-start"]');page.wait_for_timeout(200)
 page.keyboard.press('a');page.evaluate('Game.finish()');page.click('[data-action="duo-handoff"]');page.click('[data-action="duo-start"]');page.wait_for_timeout(200)
 page.keyboard.press('a');page.evaluate('Game.finish()');assert page.locator('text=Împreună străluciți!').is_visible()
 page.click('[data-action="go-home"]');checks.append('parent-child pass-and-play')
 page.wait_for_function('navigator.serviceWorker.controller !== null',timeout=15000)
 c.set_offline(True);page.reload(wait_until='domcontentloaded');assert page.locator('#start-button').is_visible()
 page.click('#start-button');page.wait_for_timeout(200)
 if page.locator('[data-action="duo-start"]').is_visible():page.click('[data-action="duo-start"]')
 page.wait_for_timeout(200);assert page.evaluate('Game.running')
 checks.append('cached game reloads and plays offline')
 assert not errors,errors
 (out/'results.json').write_text(json.dumps({'passed':checks,'browser_errors':errors},indent=2))
 print(json.dumps({'passed':checks,'browser_errors':errors}))
 b.close()
server.shutdown()
