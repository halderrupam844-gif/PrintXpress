const SUPABASE_URL="https://bcqxhyqwuafdkcozqgwg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY="sb_publishable_DZ7Pp05MIcF3eBLZrnp5lg_ghO0sIU4";
const db=window.supabase?.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY);
const $=id=>document.getElementById(id);
const safe=v=>String(v??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function message(el,t,k=""){if(el){el.textContent=t;el.className="msg "+k;el.classList.remove("hidden")}}
async function signIn(e){e.preventDefault();message($("authMsg"),"Signing in…");const {error}=await db.auth.signInWithPassword({email:$("email").value,password:$("password").value});if(error)message($("authMsg"),error.message,"error");else location.reload()}
async function signOut(){await db.auth.signOut();location.reload()}
async function guard(role){const {data:{user}}=await db.auth.getUser();if(!user){$("loginPanel")?.classList.remove("hidden");$("dashboard")?.classList.add("hidden");return null}
const {data}=await db.from("profiles").select("role,display_name").eq("user_id",user.id).maybeSingle();
if(data?.role!==role){message($("authMsg"),"This account does not have the required role.","error");await db.auth.signOut();return null}
$("loginPanel")?.classList.add("hidden");$("dashboard")?.classList.remove("hidden");$("signout")?.classList.remove("hidden");return {user,profile:data}}
async function registerRetailer(e){e.preventDefault();message($("signupMsg"),"Creating account…");const {data,error}=await db.auth.signUp({email:$("newEmail").value,password:$("newPassword").value,options:{data:{shop_name:$("shopName").value,contact_phone:$("phone").value,address:$("address").value}}});if(error)message($("signupMsg"),error.message,"error");else message($("signupMsg"),data.session?"Account created; shop pending admin approval.":"Registration started. Confirm email if requested; shop approval is required.","success")}