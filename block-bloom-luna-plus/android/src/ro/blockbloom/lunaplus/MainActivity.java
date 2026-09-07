package ro.blockbloom.lunaplus;

import android.app.Activity;
import android.os.Bundle;
import android.os.Build;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.view.WindowManager;
import android.webkit.*;
import android.widget.Toast;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import org.json.*;

/** Same API-35 Activity + WebView lifecycle as the working Luna-method app.
 *  No Internet, storage, camera, microphone, or account permissions.
 *  The narrowly-scoped bridge serves only the bundled, non-navigable game.
 */
public final class MainActivity extends Activity {
    private WebView web;
    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        getWindow().setStatusBarColor(Color.rgb(23,34,61));
        getWindow().setNavigationBarColor(Color.rgb(23,34,61));
        web = new WebView(this);
        web.setId(1001);
        web.setBackgroundColor(Color.rgb(23,34,61));
        WebSettings s=web.getSettings();
        s.setJavaScriptEnabled(true); s.setDomStorageEnabled(true);
        s.setAllowFileAccess(false); s.setAllowContentAccess(false); s.setBlockNetworkLoads(true);
        s.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW); s.setMediaPlaybackRequiresUserGesture(true);
        s.setBuiltInZoomControls(false); s.setSupportZoom(false); s.setSafeBrowsingEnabled(true);
        // All bridge operations are on WebView's bridge worker, not the UI thread.
        web.addJavascriptInterface(new DurableStorage(getSharedPreferences("bloom-save-v2",MODE_PRIVATE)),"BloomStorage");
        web.setWebViewClient(new WebViewClient(){
            @Override public boolean shouldOverrideUrlLoading(WebView v,WebResourceRequest r){return true;}
            @Override public boolean shouldOverrideUrlLoading(WebView v,String u){return true;}
        });
        web.setWebChromeClient(new WebChromeClient());
        setContentView(web);
        if(Build.VERSION.SDK_INT>=33)getOnBackInvokedDispatcher().registerOnBackInvokedCallback(0,this::handleBack);
        try(InputStream in=getAssets().open("index.html")){
            ByteArrayOutputStream b=new ByteArrayOutputStream();byte[] d=new byte[8192];int n;
            while((n=in.read(d))!=-1)b.write(d,0,n);
            web.loadDataWithBaseURL("https://appassets.androidplatform.net/",new String(b.toByteArray(),StandardCharsets.UTF_8),"text/html","UTF-8",null);
        }catch(Exception ex){Toast.makeText(this,"Block Bloom could not open. Reinstall the app.",Toast.LENGTH_LONG).show();finish();}
    }
    private void handleBack(){if(web==null){finish();return;}web.evaluateJavascript("Boolean(window.nativeBack&&window.nativeBack())",h->{if(!"true".equals(h))finish();});}
    @Override public void onBackPressed(){handleBack();}
    @Override protected void onPause(){if(web!=null){web.evaluateJavascript("window.nativePause&&window.nativePause()",null);web.onPause();}super.onPause();}
    @Override protected void onResume(){super.onResume();if(web!=null)web.onResume();}
    @Override protected void onDestroy(){if(web!=null){web.removeJavascriptInterface("BloomStorage");web.destroy();web=null;}super.onDestroy();}

    public static final class DurableStorage {
        private final SharedPreferences prefs;
        private static final String[] KEYS={"bloom.profile","bloom.game","bloom.settings"};
        private static final String[] MODES={"cozy","classic","adventure","prism"};
        DurableStorage(SharedPreferences prefs){this.prefs=prefs;}
        private boolean valid(String raw){
            try{JSONObject o=new JSONObject(raw);if(!o.has("bloom.profile"))return false;new JSONObject(o.getString("bloom.profile"));return true;}catch(Exception ex){return false;}
        }
        @JavascriptInterface public synchronized String read(){
            String current=prefs.getString("current", "{}");
            if(valid(current))return current;
            String backup=prefs.getString("previous", "{}");
            return valid(backup)?backup:"{}";
        }
        @JavascriptInterface public synchronized boolean write(String raw){
            if(raw==null||raw.length()>200000)return false;
            try{
                JSONObject input=new JSONObject(raw),output=new JSONObject();
                for(String k:KEYS){
                    if(input.isNull(k)){output.put(k,JSONObject.NULL);continue;}
                    Object value=input.get(k);
                    if(!(value instanceof String)||((String)value).length()>140000)return false;
                    new JSONObject((String)value); // stored values must be JSON objects
                    output.put(k,value);
                }
                JSONObject p=new JSONObject(output.getString("bloom.profile"));
                JSONObject bests=p.optJSONObject("bests");if(bests==null)return false;
                String old=read();
                JSONObject prev=new JSONObject(old);
                JSONObject oldP=prev.has("bloom.profile")?new JSONObject(prev.getString("bloom.profile")):new JSONObject();
                JSONObject oldB=oldP.optJSONObject("bests");
                for(String m:MODES){
                    long v=Math.max(0,Math.min(1000000000L,bests.optLong(m,0)));
                    if(oldB!=null)v=Math.max(v,Math.min(1000000000L,oldB.optLong(m,0)));
                    bests.put(m,v);
                }
                p.put("bests",bests);output.put("bloom.profile",p.toString());
                // One synchronous transaction: high scores, stars, puzzle and
                // settings cannot become an out-of-order set of checkpoints.
                return prefs.edit().putString("previous",old).putString("current",output.toString()).commit();
            }catch(Exception ex){return false;}
        }
    }
}
