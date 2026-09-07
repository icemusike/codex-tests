package ro.blockbloom.lunaplus.test;
import android.app.*;
import android.os.*;
import android.content.*;
import android.webkit.WebView;
import android.view.*;
import org.json.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.*;
import java.io.*;
import java.nio.charset.StandardCharsets;

/** Test-only APK. The distributed game includes no debug mutation interface. */
public final class UpdateTests extends Instrumentation {
    private Activity activity; private WebView web; private Bundle args;
    private final StringBuilder passed=new StringBuilder();
    @Override public void onCreate(Bundle arguments){args=arguments;super.onCreate(arguments);start();}
    private void check(boolean ok,String name){if(!ok)throw new AssertionError(name);passed.append("PASS ").append(name).append('\n');Bundle b=new Bundle();b.putString("stream","PASS "+name+"\n");sendStatus(0,b);}
    private Object js(String code)throws Exception{
        CountDownLatch latch=new CountDownLatch(1);AtomicReference<String> v=new AtomicReference<>();
        runOnMainSync(()->web.evaluateJavascript(code,r->{v.set(r);latch.countDown();}));
        if(!latch.await(20,TimeUnit.SECONDS))throw new AssertionError("JavaScript callback timeout");
        return new JSONTokener(v.get()).nextValue();
    }
    private boolean yes(String code)throws Exception{return Boolean.TRUE.equals(js(code));}
    private int num(String code)throws Exception{return ((Number)js(code)).intValue();}
    private void tap(double x,double y)throws Exception{
        int[] loc=new int[2],w=new int[1];runOnMainSync(()->{web.getLocationOnScreen(loc);w[0]=web.getWidth();});
        double r=w[0]/((Number)js("innerWidth")).doubleValue();float px=(float)(loc[0]+x*r),py=(float)(loc[1]+y*r);
        long t=SystemClock.uptimeMillis();MotionEvent d=MotionEvent.obtain(t,t,0,px,py,0),u=MotionEvent.obtain(t,t+60,1,px,py,0);
        d.setSource(InputDevice.SOURCE_TOUCHSCREEN);u.setSource(InputDevice.SOURCE_TOUCHSCREEN);sendPointerSync(d);SystemClock.sleep(60);sendPointerSync(u);d.recycle();u.recycle();SystemClock.sleep(220);
    }
    private void click(String selector)throws Exception{
        // Scroll modal content into view before sending an actual touch event.
        js("document.querySelector("+JSONObject.quote(selector)+").scrollIntoView({block:'center'})");SystemClock.sleep(100);
        JSONObject p=(JSONObject)js("(()=>{let r=document.querySelector("+JSONObject.quote(selector)+").getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()");tap(p.getDouble("x"),p.getDouble("y"));
    }
    private boolean exists(String selector)throws Exception{return yes("!!document.querySelector("+JSONObject.quote(selector)+")");}
    private void confirm()throws Exception{if(exists("[data-action=confirmStart]"))click("[data-action=confirmStart]");if(exists("[data-action=helpDone]"))click("[data-action=helpDone]");}
    private void goHome()throws Exception{if(!yes("!document.getElementById('home').hidden")){if(yes("document.getElementById('overlay').hidden"))click("#pause");click("[data-action=home]");}}
    private String game(){return "JSON.parse(JSON.parse(BloomStorage.read())['bloom.game'])";}
    private String profile(){return "JSON.parse(JSON.parse(BloomStorage.read())['bloom.profile'])";}
    private String settings(){return "JSON.parse(JSON.parse(BloomStorage.read())['bloom.settings'])";}
    private void placeHint()throws Exception{
        JSONObject p=(JSONObject)js("(()=>{const st="+game()+",h=BloomEngine.hint(st);if(!h)throw Error('no move');const W=innerWidth,H=innerHeight,land=W/H>1.2,sh=land?560:Math.max(720,Math.min(980,H/W*420)),dw=land?900:420,s=Math.min(W/dw,H/sh),ox=(W-dw*s)/2,oy=(H-sh*s)/2,bs=land?356:Math.min(364,sh-415),bx=land?42:(420-bs)/2,by=land?136:212+(sh-800)*.035,tx=land?471:26,ty=land?261:by+bs+28,tw=land?365:368,th=land?110:98;return {tx:ox+(tx+h.slot*tw/3+(tw/3-5)/2)*s,ty:oy+(ty+th/2)*s,bx:ox+(bx+(h.x+.5)*bs/8)*s,by:oy+(by+(h.y+.5)*bs/8)*s};})()");
        tap(p.getDouble("tx"),p.getDouble("ty"));tap(p.getDouble("bx"),p.getDouble("by"));SystemClock.sleep(1600);
    }
    private void importState(String expression)throws Exception{
        goHome();click("#home-settings");click("[data-action=progress]");click("[data-action=import]");
        js("document.getElementById('import-code').value='BB2:'+btoa(unescape(encodeURIComponent(JSON.stringify({version:2,profile:"+profile()+",settings:"+settings()+",state:"+expression+"}))))");
        click("[data-action=importDo]");
        check(yes("!document.getElementById('home').hidden"),"game-state import uses the public backup UI");
    }
    private String solutions()throws Exception{
        try(InputStream in=getContext().getAssets().open("solutions.json")){ByteArrayOutputStream b=new ByteArrayOutputStream();byte[] a=new byte[4096];int n;while((n=in.read(a))!=-1)b.write(a,0,n);return new String(b.toByteArray(),StandardCharsets.UTF_8);}
    }
    @Override public void onStart(){Bundle out=new Bundle();try{
        activity=startActivitySync(new Intent(Intent.ACTION_MAIN).setClassName("ro.blockbloom.lunaplus","ro.blockbloom.lunaplus.MainActivity").addFlags(Intent.FLAG_ACTIVITY_NEW_TASK));
        for(int i=0;i<100;i++){runOnMainSync(()->web=(WebView)activity.findViewById(1001));if(web!=null){try{if(yes("window.BLOOM_VERSION==='2.0'"))break;}catch(Exception ignored){}}SystemClock.sleep(250);}
        check(web!=null&&yes("window.BLOOM_VERSION==='2.0'&&typeof BloomStorage.read==='function'"),"API-35 Luna shell starts with native save bridge on Android 16");
        SystemClock.sleep(900);
        check(yes("(()=>{let c=document.getElementById('game'),g=c.getContext('2d'),v=new Set();for(let x=0;x<c.width;x+=35)for(let y=0;y<c.height;y+=35)v.add(g.getImageData(x,y,1,1).data.join());return v.size>40})()"),"game canvas renders actual colored graphics");
        String phase=args==null?"first":args.getString("phase","first");
        if(phase.equals("first")){
            check(num("BloomEngine.SHAPES.length")==48,"48 shape designs available");
            click("#play-cozy");confirm();placeHint();
            int score=num(game()+".score");check(score>0&&num(profile()+".bests.cozy")>=score,"touch placement commits score AND best before returning");
            click("#undo");check(num(game()+".score")<score&&num(profile()+".bests.cozy")>=score,"Undo cannot decrease the persistent best");
            String paths=solutions();
            check(yes("(()=>{const E=BloomEngine,paths="+paths+";for(let l=1;l<=24;l++){let s=E.newGame('adventure',l);for(const [f,...a]of paths[l])if(!E[f](s,...a).ok||!E.validate(s))return false;if(s.status!=='won')return false;}return true;})()"),"all 24 Adventure solutions win inside Android WebView");
            check(yes("(()=>{for(let l=2;l<=24;l++){const a=BloomEngine.levelSpec(l-1),b=BloomEngine.levelSpec(l);if(b.target<=a.target||b.moves/b.target>=a.moves/a.target)return false;}return true})()"),"Adventure targets rise every level and move ratios tighten");
            // Complete level one using a saved state one legal touch away from victory.
            String path1=new JSONObject(paths).getJSONArray("1").toString();
            importState("(()=>{const s=BloomEngine.newGame('adventure',1),p="+path1+";for(const [f,...a]of p.slice(0,-1))BloomEngine[f](s,...a);return s})()");
            click("#continue");placeHint();
            check(num(profile()+".unlocked")>=2,"winning Adventure level one durably unlocks level two");
            check(exists("[data-action=nextLevel]"),"level victory offers next mission");click("[data-action=nextLevel]");
            check(yes("document.getElementById('modal').innerText.includes('Clear 4 lines')"),"next level requires FOUR lines rather than repeating three");
            click("[data-action=beginLevel]");confirm();check(num(game()+".target")==4,"level-two game engine loads its own goal");
            goHome();click("#play-prism");click("[data-action=beginPrism]");confirm();
            check(num(game()+".moveLimit")==40&&yes("!document.getElementById('rotate').hidden"),"new Prism mode exposes 40-move budget and rotation control");
            // Select first tray slot and verify free rotation against the engine.
            JSONObject tp=(JSONObject)js("(()=>{let W=innerWidth,H=innerHeight,l=W/H>1.2,sh=l?560:Math.max(720,Math.min(980,H/W*420)),s=Math.min(W/(l?900:420),H/sh),ox=(W-(l?900:420)*s)/2,oy=(H-sh*s)/2,bs=Math.min(364,sh-415),by=212+(sh-800)*.035;return {x:ox+((l?471:26)+(l?365:368)/6)*s,y:oy+((l?261:by+bs+28)+(l?110:98)/2)*s}})()");
            String before=js("JSON.stringify("+game()+".tray[0].cells)").toString();tap(tp.getDouble("x"),tp.getDouble("y"));click("#rotate");
            check(yes("JSON.stringify("+game()+".tray[0].cells)===JSON.stringify(BloomEngine.rotated("+before+"))")&&num(game()+".moves")==0,"touch Rotate changes selected piece without consuming a move");
            click("#pause");click("[data-action=settings]");click("[data-palette=neon]");
            check(yes(settings()+".palette==='neon'"),"Neon palette is committed to native storage");
            click("[data-action=settingsDone]");click("[data-action=home]");
            // Synthetic regression fixture, followed by a real touchscreen move.
            importState("Object.assign(BloomEngine.newGame('cozy',1,42),{score:49990})");click("#continue");placeHint();
            check(num(game()+".score")>=50000&&num(profile()+".bests.cozy")>=50000,"50,000-point regression: live move records the best immediately");
            check(yes("BloomStorage.write(JSON.stringify(Object.assign(JSON.parse(BloomStorage.read()),{'bloom.profile':JSON.stringify(Object.assign(JSON.parse(JSON.parse(BloomStorage.read())['bloom.profile']),{bests:{cozy:10}}))})))"),"native transaction accepts valid checkpoint");
            check(num(profile()+".bests.cozy")>=50000,"native safeguard rejects a lower replacement record");
            // Re-save current authoritative UI profile, then deliberately remove
            // WebView's copy. The native checkpoint must survive without it.
            js("window.nativePause();localStorage.clear()");
            check(num(profile()+".bests.cozy")>=50000,"native best exists independently of WebView localStorage");
        }else{
            check(num(profile()+".bests.cozy")>=50000,"50,000+ best survives process kill / reboot / reinstall");
            check(yes(settings()+".palette==='neon'"),"palette survives a new process");
            check(num(profile()+".unlocked")>=2,"Adventure unlock survives a new process");
            check(yes("document.getElementById('home-best').innerText.includes('50,')"),"home screen displays recovered 50,000+ best");
            if(phase.equals("restart")){
                check(num(game()+".score")>=50000,"active puzzle score survives reboot");
                click("#play-cozy");confirm();check(num(game()+".score")==0,"fresh Cozy session begins at zero");
                check(num(profile()+".bests.cozy")>=50000,"fresh lower-score session keeps the previous high score");
            }
        }
        out.putString("stream",passed+"\nBLOCK_BLOOM_2_TESTS_PASSED\n");finish(Activity.RESULT_OK,out);
    }catch(Throwable ex){out.putString("stream",passed+"\nFAILED: "+android.util.Log.getStackTraceString(ex));finish(Activity.RESULT_CANCELED,out);}}
}
