import { useState, useEffect, useRef } from "react";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&family=Sora:wght@600;700;800&display=swap');
*{box-sizing:border-box;}
.app{font-family:'Nunito',sans-serif;background:#FFF8F3;min-height:100vh;display:flex;}
.sidebar{width:240px;min-height:100vh;background:#fff;border-right:1.5px solid #FFE0D3;display:flex;flex-direction:column;position:fixed;top:0;left:0;bottom:0;overflow-y:auto;z-index:50;}
.logo{padding:22px 20px 18px;border-bottom:1.5px solid #FFE8DF;}
.logo-title{font-family:'Sora',sans-serif;font-size:22px;font-weight:800;background:linear-gradient(135deg,#E8593A,#F4A261);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.logo-sub{font-size:11px;color:#B87A6A;margin-top:3px;font-weight:600;}
.nav-sec{padding:10px 0;}
.nav-lbl{font-size:10px;font-weight:800;color:#C4A09A;text-transform:uppercase;letter-spacing:1.2px;padding:0 18px 6px;}
.nav-item{display:flex;align-items:center;gap:10px;padding:9px 12px;cursor:pointer;font-size:13px;font-weight:700;color:#6E4A42;transition:all .18s;margin:2px 8px;border-radius:10px;}
.nav-item:hover{background:#FFF0EA;color:#E8593A;}
.nav-item.active{background:#FFE8E0;color:#E8593A;}
.nav-ico{font-size:16px;width:22px;text-align:center;}
.content{margin-left:240px;flex:1;min-height:100vh;}
.page{padding:30px 34px;max-width:1060px;}
.card{background:#fff;border-radius:16px;padding:22px;border:1.5px solid #FFE8DF;margin-bottom:18px;}
.btn-p{background:#E8593A;color:#fff;border:none;padding:10px 22px;border-radius:10px;font-family:'Nunito',sans-serif;font-size:13px;font-weight:800;cursor:pointer;transition:all .18s;}
.btn-p:hover{background:#D44A2C;transform:translateY(-1px);}
.btn-p:disabled{opacity:.5;cursor:not-allowed;transform:none;}
.btn-s{background:#FFF0EA;color:#E8593A;border:1.5px solid #FFD5C7;padding:8px 18px;border-radius:10px;font-family:'Nunito',sans-serif;font-size:13px;font-weight:700;cursor:pointer;transition:all .18s;}
.btn-s:hover{background:#FFE0D3;}
.tag{display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:800;}
.tag-c{background:#FFE8E0;color:#C4401F;}.tag-t{background:#E0F5F0;color:#1E7A68;}.tag-l{background:#EEE8FF;color:#5B43A6;}.tag-a{background:#FFF3E0;color:#B06B10;}.tag-g{background:#E8F8EE;color:#1A7A4A;}.tag-r{background:#FFE8E8;color:#C42020;}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;}
.chat-wrap{height:calc(100vh - 200px);display:flex;flex-direction:column;background:#fff;border-radius:16px;border:1.5px solid #FFE8DF;overflow:hidden;}
.chat-msgs{flex:1;overflow-y:auto;padding:18px;display:flex;flex-direction:column;gap:10px;}
.msg-u{align-self:flex-end;background:#E8593A;color:#fff;padding:11px 15px;border-radius:16px 16px 3px 16px;max-width:72%;font-size:13px;line-height:1.6;}
.msg-a{align-self:flex-start;background:#FFF8F3;border:1.5px solid #FFE0D3;color:#3D2E2A;padding:11px 15px;border-radius:16px 16px 16px 3px;max-width:72%;font-size:13px;line-height:1.6;}
.chat-in{padding:14px 18px;border-top:1.5px solid #FFE8DF;display:flex;gap:10px;align-items:flex-end;}
.chat-ta{flex:1;border:1.5px solid #FFD5C7;border-radius:12px;padding:10px 14px;font-family:'Nunito',sans-serif;font-size:13px;outline:none;resize:none;background:#FFF8F3;max-height:100px;}
.chat-ta:focus{border-color:#E8593A;}
.pbar{background:#FFE8DF;border-radius:8px;height:7px;overflow:hidden;}
.pfill{height:100%;border-radius:8px;transition:width .5s;}
.ptitle{font-family:'Sora',sans-serif;font-size:26px;font-weight:800;color:#2D1A14;margin-bottom:5px;}
.psub{font-size:13px;color:#8A6A62;margin-bottom:26px;}
.stitle{font-size:15px;font-weight:800;color:#3D2E2A;margin-bottom:11px;}
.fl{display:flex;align-items:center;}
.fg{display:flex;flex-direction:column;margin-bottom:14px;}
.flbl{font-size:12px;font-weight:800;color:#6E4A42;margin-bottom:5px;}
.finp{width:100%;border:1.5px solid #FFD5C7;border-radius:10px;padding:10px 13px;font-family:'Nunito',sans-serif;font-size:13px;outline:none;background:#FFF8F3;color:#3D2E2A;}
.finp:focus{border-color:#E8593A;}
.fta{width:100%;border:1.5px solid #FFD5C7;border-radius:10px;padding:10px 13px;font-family:'Nunito',sans-serif;font-size:13px;outline:none;resize:vertical;min-height:78px;background:#FFF8F3;color:#3D2E2A;}
.fta:focus{border-color:#E8593A;}
.hero{background:linear-gradient(135deg,#FFF0EA 0%,#FFF8F3 50%,#E8FAF5 100%);border-radius:20px;padding:36px;margin-bottom:24px;border:1.5px solid #FFE0D3;position:relative;overflow:hidden;}
.stat-card{text-align:center;padding:18px;background:#fff;border-radius:14px;border:1.5px solid #FFE8DF;}
.stat-num{font-family:'Sora',sans-serif;font-size:30px;font-weight:800;}
.stat-lbl{font-size:11px;color:#8A6A62;margin-top:3px;font-weight:700;}
.course-card{background:#fff;border-radius:16px;border:1.5px solid #FFE8DF;overflow:hidden;cursor:pointer;transition:all .2s;}
.course-card:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(232,89,58,.12);}
.post-card{background:#fff;border-radius:14px;border:1.5px solid #FFE8DF;padding:17px;transition:all .2s;margin-bottom:11px;}
.post-card:hover{border-color:#E8593A30;box-shadow:0 4px 16px rgba(232,89,58,.07);}
.psych-card{background:#fff;border-radius:16px;border:1.5px solid #FFE8DF;padding:19px;display:flex;gap:15px;transition:all .2s;margin-bottom:13px;}
.psych-card:hover{box-shadow:0 6px 20px rgba(232,89,58,.1);}
.modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.28);display:flex;align-items:center;justify-content:center;z-index:999;}
.modal{background:#fff;border-radius:20px;padding:26px;width:500px;max-width:92vw;max-height:85vh;overflow-y:auto;border:1.5px solid #FFE0D3;}
.ava{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;flex-shrink:0;}
.ldots{display:inline-flex;gap:4px;}
.ldots span{width:7px;height:7px;border-radius:50%;background:#E8593A;animation:ldot 1.4s infinite ease-in-out;}
.ldots span:nth-child(1){animation-delay:-.32s;}.ldots span:nth-child(2){animation-delay:-.16s;}
@keyframes ldot{0%,80%,100%{transform:scale(.5);opacity:.3;}40%{transform:scale(1);opacity:1;}}
input[type=range]{-webkit-appearance:none;width:100%;height:6px;border-radius:3px;background:#FFE0D3;outline:none;}
input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:#E8593A;cursor:pointer;}
select{border:1.5px solid #FFD5C7;border-radius:10px;padding:9px 13px;font-family:'Nunito',sans-serif;font-size:13px;outline:none;background:#FFF8F3;color:#3D2E2A;cursor:pointer;width:100%;}
select:focus{border-color:#E8593A;}
::-webkit-scrollbar{width:5px;}
::-webkit-scrollbar-thumb{background:#FFD0C0;border-radius:3px;}
.toast{position:fixed;bottom:22px;right:22px;background:#4CAFA0;color:#fff;padding:13px 18px;border-radius:14px;font-size:13px;font-weight:700;z-index:9999;box-shadow:0 6px 20px rgba(76,175,160,.3);}
@media(max-width:768px){.sidebar{display:none;}.content{margin-left:0;}.page{padding:18px 14px;}.g2,.g3,.g4{grid-template-columns:1fr;}}
`;

async function callClaude(messages, system = "") {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system, messages }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.content.map(c => c.text || "").join("");
}

const NAV = [
  { id: "home", icon: "🏠", label: "Bosh sahifa", sec: "Asosiy" },
  { id: "chat", icon: "🤖", label: "AI Yordamchi", sec: "Asosiy" },
  { id: "childmap", icon: "📊", label: "Bola Rivojlanishi", sec: "Vositalar" },
  { id: "health", icon: "💚", label: "Oila Salomatligi", sec: "Vositalar" },
  { id: "conflict", icon: "⚖️", label: "Konflikt Simulator", sec: "Vositalar" },
  { id: "risk", icon: "🔔", label: "Risk Aniqlash", sec: "Vositalar" },
  { id: "community", icon: "👥", label: "Hamjamiyat", sec: "Ijtimoiy" },
  { id: "psychologists", icon: "🧠", label: "Psixologlar", sec: "Ijtimoiy" },
  { id: "courses", icon: "📚", label: "Kurslar", sec: "Ijtimoiy" },
];

function Sidebar({ page, setPage }) {
  const secs = ["Asosiy", "Vositalar", "Ijtimoiy"];
  return (
    <div className="sidebar">
      <div className="logo">
        <div className="logo-title">ParentAI</div>
        <div className="logo-sub">Raqamli ota-ona yordamchisi</div>
      </div>
      {secs.map(s => (
        <div className="nav-sec" key={s}>
          <div className="nav-lbl">{s}</div>
          {NAV.filter(i => i.sec === s).map(it => (
            <div key={it.id} className={`nav-item${page === it.id ? " active" : ""}`} onClick={() => setPage(it.id)}>
              <span className="nav-ico">{it.icon}</span>{it.label}
            </div>
          ))}
        </div>
      ))}
      <div style={{ marginTop: "auto", padding: "18px", borderTop: "1px solid #FFE8DF", textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "#B87A6A" }}>© 2025 ParentAI · <span style={{ color: "#E8593A" }}>v1.0</span></div>
      </div>
    </div>
  );
}

function HomePage({ setPage }) {
  const stats = [
    { n: "24/7", l: "AI yordam", c: "#E8593A" },
    { n: "12+", l: "Psixologlar", c: "#4CAFA0" },
    { n: "50+", l: "Kurslar", c: "#9B87C5" },
    { n: "1000+", l: "Ota-onalar", c: "#F4A261" },
  ];
  const feats = [
    { ic: "🤖", t: "AI Maslahat", d: "Har qanday tarbiya savollariga darhol AI javobi", p: "chat", bg: "#FFF0EA", br: "#FFD0BB" },
    { ic: "📊", t: "Rivojlanish Xaritasi", d: "Bolangiz rivojlanishini kuzating va tahlil qiling", p: "childmap", bg: "#E8FAF5", br: "#B8EDE0" },
    { ic: "💚", t: "Oila Salomatligi", d: "Oilaviy muhit va munosabatlar bahosi", p: "health", bg: "#F0EEFF", br: "#CEC3FF" },
    { ic: "⚖️", t: "Konflikt Simulator", d: "Turli yondashuvlar natijalarini ko'ring", p: "conflict", bg: "#FFF8E8", br: "#FFE4A0" },
    { ic: "🔔", t: "Risk Aniqlash", d: "Muammolarni erta aniqlash va oldini olish", p: "risk", bg: "#FFE8E8", br: "#FFC0C0" },
    { ic: "👥", t: "Hamjamiyat", d: "Ota-onalar bilan tajriba almashish", p: "community", bg: "#E8F0FF", br: "#B8C8FF" },
  ];
  return (
    <div className="page">
      <div className="hero">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20 }}>
          <div style={{ flex: 1 }}>
            <span className="tag tag-c" style={{ marginBottom: 12, display: "inline-block" }}>🌟 AI asosidagi platforma</span>
            <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: 32, fontWeight: 800, color: "#2D1A14", lineHeight: 1.3, marginBottom: 12 }}>
              Sog'lom oila —<br />kuchli jamiyat
            </h1>
            <p style={{ fontSize: 14, color: "#6E4A42", maxWidth: 420, lineHeight: 1.75, marginBottom: 22 }}>
              ParentAI ota-onalarga 24/7 AI yordamchi, psixologik maslahat va oilaviy sog'liqni kuzatish imkoniyatini beradi.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn-p" onClick={() => setPage("chat")}>AI bilan boshlash</button>
              <button className="btn-s" onClick={() => setPage("courses")}>Kurslar</button>
            </div>
          </div>
          <div style={{ fontSize: 72, flexShrink: 0 }}>👨‍👩‍👧</div>
        </div>
      </div>

      <div className="g4" style={{ marginBottom: 24 }}>
        {stats.map((s, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-num" style={{ color: s.c }}>{s.n}</div>
            <div className="stat-lbl">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="stitle">Barcha xizmatlar</div>
      <div className="g3">
        {feats.map((f, i) => (
          <div key={i} onClick={() => setPage(f.p)} style={{ background: f.bg, border: `1.5px solid ${f.br}`, borderRadius: 16, padding: 18, cursor: "pointer", transition: "all .2s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "none"}>
            <div style={{ fontSize: 30, marginBottom: 9 }}>{f.ic}</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#2D1A14", marginBottom: 5 }}>{f.t}</div>
            <div style={{ fontSize: 12, color: "#6E4A42", lineHeight: 1.65 }}>{f.d}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 22, background: "#FFFBF5", borderColor: "#FFE0A0" }}>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <div style={{ fontSize: 30 }}>💡</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#8B6000", marginBottom: 4 }}>Bugungi maslahat</div>
            <div style={{ fontSize: 13, color: "#6E5000", lineHeight: 1.7 }}>
              Farzandingiz bilan kuniga kamida 15 daqiqa sifatli vaqt o'tkazing — o'yin, kitob o'qish yoki shunchaki suhbat. Bu oddiy amal uning emosional rivojlanishiga katta ta'sir qiladi.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AIChatPage() {
  const [msgs, setMsgs] = useState([
    { role: "assistant", content: "Salom! Men ParentAI — ota-onalar uchun AI yordamchiman. 👋\n\nTarbiya, bola rivojlanishi, oilaviy munosabatlar yoki psixologik savollarga javob berishga tayyorman. Nima haqida gaplashamiz?" }
  ]);
  const [inp, setInp] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  const SYS = `Sen ParentAI — o'zbek tilida ishlaydigan ota-onalar uchun AI psixologik yordamchisan. Bolalar psixologiyasi, tarbiya usullari, oilaviy munosabatlar bo'yicha chuqur bilimlarga ega. O'zbek tilida yoz. Qisqa, aniq, amaliy maslahatlar ber. Mehribon va qo'llab-quvvatlovchi bo'l. Har javobda: asosiy maslahat + 2-3 amaliy qadam.`;

  const QQ = ["3 yoshli bola nima qilishi kerak?", "Bola yig'lasa nima qilaman?", "O'smirlar bilan muloqot", "Ekran vaqtini cheklash"];

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = async (text) => {
    const t = (text || inp).trim();
    if (!t) return;
    const newMsgs = [...msgs, { role: "user", content: t }];
    setMsgs(newMsgs);
    setInp("");
    setLoading(true);
    try {
      const reply = await callClaude(newMsgs, SYS);
      setMsgs([...newMsgs, { role: "assistant", content: reply }]);
    } catch {
      setMsgs([...newMsgs, { role: "assistant", content: "❌ Xatolik yuz berdi. Qayta urinib ko'ring." }]);
    }
    setLoading(false);
  };

  return (
    <div className="page">
      <div className="ptitle">🤖 AI Yordamchi</div>
      <div className="psub">24/7 tarbiya maslahatchi — har qanday savolingizga darhol javob</div>
      <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 14 }}>
        {QQ.map((q, i) => <button key={i} className="btn-s" style={{ fontSize: 11, padding: "5px 12px" }} onClick={() => send(q)}>{q}</button>)}
      </div>
      <div className="chat-wrap">
        <div className="chat-msgs">
          {msgs.map((m, i) => (
            <div key={i} className={m.role === "user" ? "msg-u" : "msg-a"} style={{ whiteSpace: "pre-line" }}>
              {m.role === "assistant" ? <span>🤖 {m.content}</span> : m.content}
            </div>
          ))}
          {loading && <div className="msg-a"><div className="ldots"><span /><span /><span /></div></div>}
          <div ref={endRef} />
        </div>
        <div className="chat-in">
          <textarea className="chat-ta" value={inp} onChange={e => setInp(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Muammoyingizni yozing... (Enter = yuborish)" rows={2} />
          <button className="btn-p" onClick={() => send()} disabled={loading || !inp.trim()}>Yuborish</button>
        </div>
      </div>
    </div>
  );
}

function ChildMapPage() {
  const [name, setName] = useState("Ziyoda");
  const [age, setAge] = useState(4);
  const [checked, setChecked] = useState({});
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);

  const DATA = {
    "0-1": { "🧠 Psixologik": ["Ota-onani taniydi","Tabassum qiladi","Ko'z bilan kuzatadi"], "👥 Ijtimoiy": ["Tovushga munosabat","Begonaga reaktsiya","Ko'zga qarashni yaxshi ko'radi"], "🏃 Jismoniy": ["Boshini ko'taradi","Qo'lini ko'radi","Yordamsiz o'tiradi"] },
    "1-3": { "🧠 Psixologik": ["Oddiy savollarni tushunadi","His-tuyg'ularini ifodalaydi","Hamdardlik bildiradi"], "👥 Ijtimoiy": ["Bolalar bilan o'ynaydi","Raqobat tuyg'usi","'Men' deydi"], "🏃 Jismoniy": ["Yuradi","Sakraydi","Rasm chizadi"] },
    "3-6": { "🧠 Psixologik": ["Sabab-oqibatni tushunadi","Xayoliy o'yin o'ynaydi","Qoidalarga rioya qiladi"], "👥 Ijtimoiy": ["Do'stlar orttiradi","Navbatga turadi","Guruhda ishlaydi"], "🏃 Jismoniy": ["Velosiped minadi","Qaychi bilan kesadi","To'pni ushlab oladi"] },
    "6-12": { "🧠 Psixologik": ["Mantiqiy fikrlaydi","O'z-o'zini baholaydi","Muammolarni hal qiladi"], "👥 Ijtimoiy": ["Yaqin do'stlar bor","Guruh tuyg'usi kuchli","Adolat tushunchasi yaxshi"], "🏃 Jismoniy": ["Sport mashqlar qiladi","Mayda motorika yaxshi","Koordinatsiya a'lo"] },
    "12-18": { "🧠 Psixologik": ["Abstrakt fikrlash bor","Shaxsiyat shakllangan","Qadriyatlar tizimi bor"], "👥 Ijtimoiy": ["Tengdoshlarga moyil","Guruhda lider","Romantik qiziqish"], "🏃 Jismoniy": ["Jismoniy voyaga yetgan","Koordinatsiya mukammal","Sportga qiziqish kuchli"] },
  };

  const ag = age < 1 ? "0-1" : age < 3 ? "1-3" : age < 6 ? "3-6" : age < 12 ? "6-12" : "12-18";
  const cur = DATA[ag];
  const cats = Object.keys(cur);
  const catBg = { "🧠 Psixologik": ["#EEE8FF","#9B87C5"], "👥 Ijtimoiy": ["#E0F5F0","#4CAFA0"], "🏃 Jismoniy": ["#FFF0EA","#E8593A"] };

  const prog = cat => {
    const items = cur[cat];
    return Math.round(items.filter((_, i) => checked[`${cat}-${i}`]).length / items.length * 100);
  };

  const getAI = async () => {
    setLoading(true); setAdvice("");
    try {
      const pos = cats.flatMap(c => cur[c].filter((_, i) => checked[`${c}-${i}`]).map(m => `✓ ${m}`));
      const neg = cats.flatMap(c => cur[c].filter((_, i) => !checked[`${c}-${i}`]).map(m => `✗ ${m}`));
      const r = await callClaude([{ role: "user", content: `Bola: ${name}, yoshi: ${age}, guruhi: ${ag}\nBajarilgan: ${pos.join(", ") || "hech biri"}\nBajarilmagan: ${neg.join(", ")}\n\nO'zbek tilida qisqa rivojlanish tahlili va 3 ta amaliy maslahat ber.` }],
        "Sen bolalar rivojlanishi bo'yicha mutaxassis psixologsan. O'zbek tilida javob ber.");
      setAdvice(r);
    } catch { setAdvice("Xatolik yuz berdi."); }
    setLoading(false);
  };

  return (
    <div className="page">
      <div className="ptitle">📊 Bola Rivojlanish Xaritasi</div>
      <div className="psub">Farzandingizning rivojlanish bosqichlarini kuzating va tahlil qiling</div>

      <div className="g2" style={{ marginBottom: 20 }}>
        <div className="card">
          <div className="stitle">Bola ma'lumotlari</div>
          <div className="fg"><label className="flbl">Ism</label><input className="finp" value={name} onChange={e => setName(e.target.value)} /></div>
          <div className="fg">
            <label className="flbl">Yosh: <strong style={{ color: "#E8593A" }}>{age} yil</strong></label>
            <input type="range" min={0} max={17} value={age} onChange={e => setAge(Number(e.target.value))} />
          </div>
          <span className="tag tag-c">Yosh guruhi: {ag}</span>
        </div>
        <div className="card">
          <div className="stitle">Rivojlanish darajasi</div>
          {cats.map(c => (
            <div key={c} style={{ marginBottom: 13 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 12, fontWeight: 700 }}>{c}</span>
                <span style={{ fontSize: 12, color: "#8A6A62" }}>{prog(c)}%</span>
              </div>
              <div className="pbar"><div className="pfill" style={{ width: `${prog(c)}%`, background: catBg[c][1] }} /></div>
            </div>
          ))}
        </div>
      </div>

      {cats.map(c => (
        <div className="card" key={c} style={{ background: catBg[c][0], borderColor: catBg[c][1] + "50" }}>
          <div className="stitle" style={{ color: catBg[c][1] }}>{c} rivojlanishi</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
            {cur[c].map((m, i) => (
              <div key={i} onClick={() => setChecked(p => ({ ...p, [`${c}-${i}`]: !p[`${c}-${i}`] }))} style={{ display: "flex", alignItems: "center", gap: 9, padding: "10px 13px", background: checked[`${c}-${i}`] ? catBg[c][1] + "20" : "#fff", border: `1.5px solid ${checked[`${c}-${i}`] ? catBg[c][1] : "#FFE0D3"}`, borderRadius: 10, cursor: "pointer", transition: "all .18s", fontSize: 12, fontWeight: 700 }}>
                <div style={{ width: 18, height: 18, borderRadius: 5, border: `2px solid ${catBg[c][1]}`, background: checked[`${c}-${i}`] ? catBg[c][1] : "transparent", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 10, flexShrink: 0 }}>
                  {checked[`${c}-${i}`] ? "✓" : ""}
                </div>
                {m}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{ textAlign: "center", margin: "18px 0" }}>
        <button className="btn-p" onClick={getAI} disabled={loading}>{loading ? "Tahlil qilinmoqda..." : "🤖 AI tahlil va maslahat olish"}</button>
      </div>
      {advice && (
        <div className="card" style={{ background: "#F0EEFF", borderColor: "#CEC3FF" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#5B43A6", marginBottom: 7 }}>🤖 AI Tahlil — {name}</div>
          <div style={{ fontSize: 13, lineHeight: 1.75, whiteSpace: "pre-line" }}>{advice}</div>
        </div>
      )}
    </div>
  );
}

function FamilyHealthPage() {
  const [scores, setScores] = useState({ muloqot: 65, stress: 40, konflikt: 70, birlik: 75, farzand: 80 });
  const [advice, setAdvice] = useState(""); const [loading, setLoading] = useState(false);

  const METRICS = [
    { k: "muloqot", l: "Muloqot sifati", ic: "💬", c: "#4CAFA0" },
    { k: "stress", l: "Stress darajasi", ic: "😤", c: "#E8593A", inv: true },
    { k: "konflikt", l: "Konflikt yechimi", ic: "⚖️", c: "#9B87C5" },
    { k: "birlik", l: "Oilaviy birlik", ic: "🤝", c: "#F4A261" },
    { k: "farzand", l: "Bola farovonligi", ic: "👶", c: "#E8593A" },
  ];

  const total = Math.round(Object.entries(scores).reduce((s, [k, v]) => {
    const m = METRICS.find(x => x.k === k); return s + (m?.inv ? 100 - v : v);
  }, 0) / METRICS.length);

  const gc = s => s >= 70 ? "#4CAFA0" : s >= 50 ? "#F4A261" : "#E8593A";
  const gl = s => s >= 70 ? "Yaxshi ✅" : s >= 50 ? "O'rtacha ⚠️" : "Yaxshilash kerak 🔴";

  const getAI = async () => {
    setLoading(true); setAdvice("");
    try {
      const d = METRICS.map(m => `${m.l}: ${scores[m.k]}%`).join(", ");
      const r = await callClaude([{ role: "user", content: `Oilaviy sog'liqni baholash: ${d}. Umumiy ball: ${total}/100. O'zbek tilida qisqa tahlil va 3 ta yaxshilash tavsiyasi ber.` }],
        "Sen oilaviy psixologsan. Qisqa, amaliy, iliq maslahatlar ber. O'zbek tilida.");
      setAdvice(r);
    } catch { setAdvice("Xatolik."); }
    setLoading(false);
  };

  return (
    <div className="page">
      <div className="ptitle">💚 Oila Salomatligi Monitoringi</div>
      <div className="psub">Oilaviy muhit va munosabatlar holati — Family Health Score</div>
      <div className="g2">
        <div>
          <div className="card">
            <div className="stitle">Ko'rsatkichlarni baholang</div>
            {METRICS.map(m => (
              <div key={m.k} style={{ marginBottom: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>{m.ic} {m.l}</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: m.c }}>{scores[m.k]}%</span>
                </div>
                <input type="range" min={0} max={100} value={scores[m.k]} style={{ accentColor: m.c }}
                  onChange={e => setScores(p => ({ ...p, [m.k]: Number(e.target.value) }))} />
              </div>
            ))}
          </div>
          <button className="btn-p" style={{ width: "100%" }} onClick={getAI} disabled={loading}>{loading ? "Tahlil qilinmoqda..." : "🤖 AI tahlil olish"}</button>
        </div>
        <div>
          <div className="card" style={{ textAlign: "center", marginBottom: 14 }}>
            <div className="stitle" style={{ textAlign: "left" }}>Family Health Score</div>
            <div style={{ width: 130, height: 130, borderRadius: "50%", margin: "8px auto", border: `9px solid ${gc(total)}`, background: gc(total) + "20", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontSize: 34, fontWeight: 800, color: gc(total), fontFamily: "'Sora',sans-serif" }}>{total}</div>
              <div style={{ fontSize: 11, color: "#8A6A62" }}>/ 100</div>
            </div>
            <div style={{ fontSize: 15, fontWeight: 800, color: gc(total) }}>{gl(total)}</div>
          </div>
          <div className="card">
            <div className="stitle">Holat ko'rsatkichlari</div>
            {METRICS.map(m => {
              const v = m.inv ? 100 - scores[m.k] : scores[m.k];
              return (
                <div key={m.k} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #FFE8DF" }}>
                  <span style={{ fontSize: 12 }}>{m.ic} {m.l}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div className="pbar" style={{ width: 80 }}><div className="pfill" style={{ width: `${v}%`, background: gc(v) }} /></div>
                    <span style={{ fontSize: 11, fontWeight: 800, color: gc(v), minWidth: 28 }}>{v}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {advice && (
        <div className="card" style={{ marginTop: 18, background: "#E8FAF5", borderColor: "#B8EDE0" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#1E7A68", marginBottom: 7 }}>💚 Oilaviy Sog'liqni Yaxshilash Tavsiyalari</div>
          <div style={{ fontSize: 13, lineHeight: 1.75, whiteSpace: "pre-line" }}>{advice}</div>
        </div>
      )}
    </div>
  );
}

function ConflictSimPage() {
  const [sit, setSit] = useState(""); const [apps, setApps] = useState(null);
  const [loading, setLoading] = useState(false); const [sel, setSel] = useState(null);
  const [res, setRes] = useState(""); const [resLoad, setResLoad] = useState(false);

  const EX = ["Bola maktabga bormaydi", "O'smirga ekran vaqtini cheklash", "Uy vazifasini bajarmaydi", "Ota-onaga qo'pollik qildi"];

  const simulate = async () => {
    if (!sit.trim()) return;
    setLoading(true); setApps(null); setSel(null); setRes("");
    try {
      const r = await callClaude([{ role: "user", content: `Muammo: "${sit}"\n3 xil yondashuv taklif qil. JSON: {"approaches":[{"title":"...","description":"...","emoji":"..."}]}\nFaqat JSON.` }],
        "Sen ota-onalar uchun konflikt mutaxassisissan. O'zbek tilida javob ber. Faqat JSON qaytar.");
      const clean = r.replace(/```json|```/g, "").trim();
      setApps(JSON.parse(clean).approaches);
    } catch {
      setApps([
        { title: "Tinch suhbat", description: "Bola bilan xotirjam muhitda gaplashing", emoji: "💬" },
        { title: "Qoida belgilash", description: "Aniq qoidalar va natijalar belgilang", emoji: "📋" },
        { title: "Mukofot tizimi", description: "Ijobiy xulq uchun rag'bat kiriting", emoji: "🌟" },
      ]);
    }
    setLoading(false);
  };

  const pick = async (a) => {
    setSel(a); setResLoad(true); setRes("");
    try {
      const r = await callClaude([{ role: "user", content: `Muammo: "${sit}"\nYondashuv: "${a.title}" — ${a.description}\nBu yondashuvning natijalarini va amalga oshirish usulini O'zbek tilida tushuntir.` }],
        "Sen ota-onalar psixolog maslahatchisin. Amaliy, aniq, iliq. O'zbek tilida.");
      setRes(r);
    } catch { setRes("Xatolik."); }
    setResLoad(false);
  };

  return (
    <div className="page">
      <div className="ptitle">⚖️ Konflikt Simulator</div>
      <div className="psub">Muammoni yozing — turli yondashuvlar natijalarini ko'ring va to'g'ri usulni tanlang</div>
      <div className="card">
        <div className="stitle">Muammo/Vaziyatni tasvirlanh</div>
        <textarea className="fta" value={sit} onChange={e => setSit(e.target.value)} style={{ marginBottom: 11 }}
          placeholder="Masalan: Mening 10 yoshli o'g'lim har kuni uy vazifasini bajarishni rad etadi..." />
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 12 }}>
          {EX.map((ex, i) => <button key={i} className="btn-s" style={{ fontSize: 11 }} onClick={() => setSit(ex)}>{ex}</button>)}
        </div>
        <button className="btn-p" onClick={simulate} disabled={loading || !sit.trim()}>{loading ? "Tahlil qilinmoqda..." : "⚖️ Yondashuvlarni ko'rish"}</button>
      </div>

      {apps && (
        <div style={{ marginTop: 18 }}>
          <div className="stitle">Mumkin bo'lgan yondashuvlar</div>
          <div className="g3">
            {apps.map((a, i) => (
              <div key={i} onClick={() => pick(a)} style={{ background: sel?.title === a.title ? "#FFF0EA" : "#fff", border: `2px solid ${sel?.title === a.title ? "#E8593A" : "#FFE0D3"}`, borderRadius: 16, padding: 18, cursor: "pointer", transition: "all .2s", transform: sel?.title === a.title ? "scale(1.02)" : "none" }}>
                <div style={{ fontSize: 30, marginBottom: 9 }}>{a.emoji}</div>
                <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 5 }}>{a.title}</div>
                <div style={{ fontSize: 12, color: "#6E4A42", lineHeight: 1.65 }}>{a.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {sel && (
        <div className="card" style={{ marginTop: 18, background: "#FFF8F3", borderColor: "#FFD0BB" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#E8593A", marginBottom: 7 }}>{sel.emoji} "{sel.title}" natijasi</div>
          {resLoad ? <div className="ldots"><span /><span /><span /></div> : <div style={{ fontSize: 13, lineHeight: 1.75, whiteSpace: "pre-line" }}>{res}</div>}
        </div>
      )}
    </div>
  );
}

function RiskDetectPage() {
  const [ans, setAns] = useState({}); const [res, setRes] = useState(null); const [loading, setLoading] = useState(false);

  const QS = [
    { id: "cry", l: "Bola tez-tez yig'laydi yoki g'amgin ko'rinadi", bg: "#EEE8FF" },
    { id: "sleep", l: "Uyqu muammolari (ko'p yoki kam uxlaydi)", bg: "#FFF0EA" },
    { id: "school", l: "Maktab bahosi keskin pasaydi", bg: "#FFF8E8" },
    { id: "friend", l: "Do'stlardan uzoqlashmoqda", bg: "#E0F5F0" },
    { id: "aggress", l: "Tajovuzkor xulq-atvor kuzatilmoqda", bg: "#FFE8E8" },
    { id: "eat", l: "Ovqatlanish muammolari (kam yoki ko'p)", bg: "#FFF0EA" },
    { id: "alone", l: "Ko'p vaqt yolg'iz o'tkazmoqda", bg: "#E0F5F0" },
    { id: "anxiety", l: "Kuchli qo'rquv yoki tashvish belgilari", bg: "#EEE8FF" },
    { id: "conflict", l: "Oilada tez-tez janjal bo'lyapti", bg: "#FFE8E8" },
    { id: "phone", l: "Ekran oldida kuniga 5+ soat o'tiradi", bg: "#FFF8E8" },
  ];

  const analyze = async () => {
    setLoading(true); setRes(null);
    const pos = QS.filter(q => ans[q.id] === "ha");
    const lv = pos.length <= 2 ? "past" : pos.length <= 5 ? "o'rta" : "yuqori";
    try {
      const syms = pos.map(q => q.l).join(", ");
      const r = await callClaude([{ role: "user", content: `Bolada kuzatilgan belgilar: ${syms || "hech biri"}.\nRisk darajasi: ${lv}.\nO'zbek tilida qisqa tahlil va keyingi qadamlar tavsiyasi ber. Ota-onaga iliq murojaat qil.` }],
        "Sen bolalar psixologiyasi mutaxassisissan. O'zbek tilida javob ber.");
      setRes({ lv, advice: r, cnt: pos.length });
    } catch { setRes({ lv, advice: "Tahlil yuklanmadi.", cnt: pos.length }); }
    setLoading(false);
  };

  const LC = { past: "#4CAFA0", "o'rta": "#F4A261", yuqori: "#E8593A" };

  return (
    <div className="page">
      <div className="ptitle">🔔 Risk Aniqlash</div>
      <div className="psub">Psixologik muammo belgilarini erta aniqlash va mutaxassisga yo'naltirish</div>
      <div className="card">
        <div className="stitle">Kuzatilgan belgilarni belgilang</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginBottom: 18 }}>
          {QS.map(q => (
            <div key={q.id} style={{ padding: "11px 13px", borderRadius: 12, background: q.bg, border: `1.5px solid ${ans[q.id] === "ha" ? "#E8593A" : "transparent"}` }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 7, color: "#3D2E2A" }}>{q.l}</div>
              <div style={{ display: "flex", gap: 7 }}>
                {["ha", "yo'q", "bilmayman"].map(opt => (
                  <button key={opt} onClick={() => setAns(p => ({ ...p, [q.id]: opt }))} style={{ padding: "3px 11px", borderRadius: 20, fontSize: 11, fontWeight: 800, cursor: "pointer", background: ans[q.id] === opt ? (opt === "ha" ? "#E8593A" : "#4CAFA0") : "#fff", color: ans[q.id] === opt ? "#fff" : "#6E4A42", border: `1.5px solid ${ans[q.id] === opt ? "transparent" : "#FFD5C7"}`, transition: "all .18s" }}>{opt}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button className="btn-p" onClick={analyze} disabled={loading}>{loading ? "Tahlil qilinmoqda..." : "🔍 Tahlil qilish"}</button>
      </div>

      {res && (
        <div className="card" style={{ marginTop: 18, borderColor: LC[res.lv] + "50", background: LC[res.lv] + "10" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: LC[res.lv] + "30", border: `3px solid ${LC[res.lv]}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
              {res.lv === "past" ? "✅" : res.lv === "o'rta" ? "⚠️" : "🚨"}
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 800, color: LC[res.lv] }}>Risk darajasi: {res.lv.toUpperCase()}</div>
              <div style={{ fontSize: 12, color: "#6E4A42" }}>{res.cnt} ta belgi aniqlandi</div>
            </div>
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.75, whiteSpace: "pre-line" }}>{res.advice}</div>
          {res.lv === "yuqori" && (
            <div style={{ marginTop: 14, padding: "11px 14px", background: "#FFE8E8", borderRadius: 10, border: "1.5px solid #FFC0C0", fontSize: 13 }}>
              <strong style={{ color: "#C42020" }}>🚨 Muhim:</strong>
              <span style={{ color: "#8A2020", marginLeft: 7 }}>Mutaxassis psixologga murojaat qilishni tavsiya qilamiz. "Psixologlar" bo'limiga o'ting.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CommunityPage() {
  const [posts, setPosts] = useState([
    { id: 1, av: "OA", nm: "Ona (Anonim)", tm: "2 soat oldin", tg: "Tarbiya", tx: "4 yoshli qizim uxlashdan oldin doim yig'laydi. Biror maslahat bormi? 😢", lk: 12, rp: 5 },
    { id: 2, av: "OM", nm: "Ota (Anonim)", tm: "5 soat oldin", tg: "O'smirlar", tx: "14 yoshli o'g'lim bilan muloqot juda qiyin. Uning xonasidan chiqmaydi, telefonidan ajralmaydi...", lk: 28, rp: 14 },
    { id: 3, av: "OA", nm: "Ona (Anonim)", tm: "1 kun oldin", tg: "Maktab", tx: "O'g'lim maktabda do'stlashishda qiynaladi, uy vazifasidan bosh tortadi.", lk: 9, rp: 3 },
    { id: 4, av: "OM", nm: "Ota (Anonim)", tm: "2 kun oldin", tg: "Ovqatlanish", tx: "Bolam sabzavot umuman emaydi. Qanday qilib e'lon qilish mumkin?", lk: 31, rp: 18 },
  ]);
  const [np, setNp] = useState(""); const [tag, setTag] = useState("Tarbiya"); const [lkd, setLkd] = useState({});
  const TAGS = ["Tarbiya", "O'smirlar", "Maktab", "Ovqatlanish", "Ruhiyat", "O'yin"];
  const TC = { "Tarbiya": "tag-c", "O'smirlar": "tag-l", "Maktab": "tag-t", "Ovqatlanish": "tag-a", "Ruhiyat": "tag-l", "O'yin": "tag-t" };

  const addPost = () => {
    if (!np.trim()) return;
    setPosts(p => [{ id: Date.now(), av: "OA", nm: "Ona (Anonim)", tm: "Hozir", tg: tag, tx: np, lk: 0, rp: 0 }, ...p]);
    setNp("");
  };

  const like = (id) => {
    setLkd(p => ({ ...p, [id]: !p[id] }));
    setPosts(p => p.map(x => x.id === id ? { ...x, lk: x.lk + (lkd[id] ? -1 : 1) } : x));
  };

  return (
    <div className="page">
      <div className="ptitle">👥 Ota-onalar Hamjamiyati</div>
      <div className="psub">Anonim ravishda tajriba almashing, savollar bering, bir-biridan o'rganing</div>
      <div className="card" style={{ marginBottom: 18 }}>
        <div className="stitle">Yangi post qo'shish</div>
        <textarea className="fta" value={np} onChange={e => setNp(e.target.value)} placeholder="Muammoingizni anonim yozing..." style={{ marginBottom: 10 }} />
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 11 }}>
          {TAGS.map(t => <button key={t} onClick={() => setTag(t)} style={{ padding: "5px 13px", borderRadius: 20, fontSize: 11, fontWeight: 800, cursor: "pointer", background: tag === t ? "#E8593A" : "#FFF0EA", color: tag === t ? "#fff" : "#E8593A", border: "1.5px solid #FFD0BB", transition: "all .18s" }}>{t}</button>)}
        </div>
        <button className="btn-p" onClick={addPost} disabled={!np.trim()}>Anonim joylash</button>
      </div>
      {posts.map(p => (
        <div className="post-card" key={p.id}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 9 }}>
            <div style={{ display: "flex", gap: 9, alignItems: "center" }}>
              <div className="ava" style={{ width: 34, height: 34, background: "#FFE8DF", color: "#E8593A", fontSize: 11 }}>{p.av}</div>
              <div><div style={{ fontSize: 12, fontWeight: 800 }}>{p.nm}</div><div style={{ fontSize: 10, color: "#8A6A62" }}>{p.tm}</div></div>
            </div>
            <span className={`tag ${TC[p.tg] || "tag-c"}`}>{p.tg}</span>
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.7, marginBottom: 11 }}>{p.tx}</div>
          <div style={{ display: "flex", gap: 14 }}>
            <button onClick={() => like(p.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, color: lkd[p.id] ? "#E8593A" : "#8A6A62" }}>{lkd[p.id] ? "❤️" : "🤍"} {p.lk}</button>
            <span style={{ fontSize: 12, color: "#8A6A62" }}>💬 {p.rp} javob</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function PsychologistPage() {
  const [flt, setFlt] = useState("Barchasi"); const [bk, setBk] = useState(null); const [toast, setToast] = useState("");

  const PS = [
    { id: 1, nm: "Dr. Malika Yusupova", sp: "Bolalar psixologi", ex: "8 yil", rt: 4.9, pr: 80, av: "Bugun mavjud 🟢", bg: "#FFF0EA", tgs: ["Bolalar", "O'smirlar"], bi: "Bolalar va o'smirlar psixologiyasi bo'yicha mutaxassis. CBT usulida ishlaydi." },
    { id: 2, nm: "Dr. Jasur Karimov", sp: "Oilaviy psixolog", ex: "12 yil", rt: 4.8, pr: 100, av: "Ertaga mavjud 🟡", bg: "#E0F5F0", tgs: ["Oila", "Juftlik"], bi: "Oilaviy munosabatlar va konfliktlarni hal qilish bo'yicha mutaxassis." },
    { id: 3, nm: "Dr. Nilufar Rashidova", sp: "Klinik psixolog", ex: "6 yil", rt: 4.7, pr: 90, av: "Bugun mavjud 🟢", bg: "#EEE8FF", tgs: ["Tashvish", "Depressiya"], bi: "Ruhiy salomatlik va emosional intellekt bo'yicha maslahat beradi." },
    { id: 4, nm: "Dr. Bobur Ergashev", sp: "O'smirlar psixologi", ex: "5 yil", rt: 4.6, pr: 70, av: "2 kun ichida 🔵", bg: "#FFF8E8", tgs: ["O'smirlar", "Maktab"], bi: "O'smirlar bilan ishlashda ixtisoslashgan, maktab muammolarini hal qiladi." },
  ];

  const FLTS = ["Barchasi", "Bolalar", "O'smirlar", "Oila"];
  const filtered = flt === "Barchasi" ? PS : PS.filter(p => p.tgs.includes(flt));

  const confirm = () => {
    setBk(null);
    setToast("Uchrashuv muvaffaqiyatli belgilandi! ✅");
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <div className="page">
      <div className="ptitle">🧠 Psixologlar Hamjamiyati</div>
      <div className="psub">Tajribali mutaxassislar bilan onlayn konsultatsiya — arzon va qulay</div>
      <div style={{ display: "flex", gap: 7, marginBottom: 20 }}>
        {FLTS.map(f => <button key={f} onClick={() => setFlt(f)} style={{ padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 800, cursor: "pointer", background: flt === f ? "#E8593A" : "#FFF0EA", color: flt === f ? "#fff" : "#E8593A", border: "1.5px solid #FFD0BB", transition: "all .18s" }}>{f}</button>)}
      </div>
      {filtered.map(p => (
        <div className="psych-card" key={p.id} style={{ background: p.bg }}>
          <div className="ava" style={{ background: "#E8593A", color: "#fff", fontFamily: "'Sora',sans-serif" }}>{p.nm.split(" ").slice(1).map(w => w[0]).join("").slice(0, 2)}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
              <div><div style={{ fontSize: 14, fontWeight: 800 }}>{p.nm}</div><div style={{ fontSize: 12, color: "#6E4A42" }}>{p.sp} · {p.ex} tajriba</div></div>
              <div style={{ textAlign: "right" }}><div style={{ fontSize: 13, fontWeight: 800, color: "#E8593A" }}>⭐ {p.rt}</div><div style={{ fontSize: 11, color: "#6E4A42" }}>{p.pr}k so'm/soat</div></div>
            </div>
            <div style={{ fontSize: 12, color: "#4A3A36", lineHeight: 1.65, marginBottom: 10 }}>{p.bi}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {p.tgs.map(t => <span key={t} className="tag tag-c">{t}</span>)}
                <span style={{ fontSize: 11, color: "#4CAFA0", fontWeight: 800 }}>{p.av}</span>
              </div>
              <button className="btn-p" style={{ padding: "7px 14px", fontSize: 12 }} onClick={() => setBk(p)}>Uchrashuv belgilash</button>
            </div>
          </div>
        </div>
      ))}

      {bk && (
        <div className="modal-bg" onClick={() => setBk(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 4 }}>📅 Uchrashuv belgilash</div>
            <div style={{ fontSize: 12, color: "#6E4A42", marginBottom: 18 }}>{bk.nm} · {bk.sp}</div>
            <div className="fg"><label className="flbl">Sana</label><input type="date" className="finp" /></div>
            <div className="fg"><label className="flbl">Vaqt</label><select><option>09:00</option><option>10:00</option><option>11:00</option><option>14:00</option><option>15:00</option><option>16:00</option></select></div>
            <div className="fg"><label className="flbl">Muammo haqida qisqacha</label><textarea className="fta" placeholder="..." /></div>
            <div style={{ display: "flex", gap: 9 }}>
              <button className="btn-p" style={{ flex: 1 }} onClick={confirm}>Tasdiqlash</button>
              <button className="btn-s" style={{ flex: 1 }} onClick={() => setBk(null)}>Bekor</button>
            </div>
          </div>
        </div>
      )}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

function CoursesPage() {
  const [flt, setFlt] = useState("Barchasi"); const [sel, setSel] = useState(null);
  const [enrolled, setEnrolled] = useState({}); const [aiSum, setAiSum] = useState(""); const [sumLoad, setSumLoad] = useState(false);

  const CS = [
    { id: 1, em: "🧠", t: "Bolalar Psixologiyasi Asoslari", ct: "Psixologiya", ls: 8, dur: "4 soat", lv: "Boshlang'ich", bg: "#EEE8FF", dc: "0-12 yosh davridagi bolalar psixologiyasini o'rganing" },
    { id: 2, em: "💬", t: "O'smirlar bilan Muloqot", ct: "Muloqot", ls: 6, dur: "3 soat", lv: "O'rta", bg: "#E0F5F0", dc: "Teenager bilan samarali muloqot usullari" },
    { id: 3, em: "🌱", t: "Zamonaviy Tarbiya Usullari", ct: "Tarbiya", ls: 10, dur: "5 soat", lv: "Boshlang'ich", bg: "#FFF0EA", dc: "Ilmiy asoslangan zamonaviy tarbiya yondashuvlari" },
    { id: 4, em: "😤", t: "Stress Boshqarish", ct: "Sog'liq", ls: 5, dur: "2.5 soat", lv: "Boshlang'ich", bg: "#FFF8E8", dc: "Ota-onalar uchun stress boshqarish texnikalari" },
    { id: 5, em: "⚖️", t: "Oilaviy Nizolarni Hal Qilish", ct: "Muloqot", ls: 7, dur: "3.5 soat", lv: "O'rta", bg: "#FFE8E8", dc: "Konstruktiv konflikt boshqarish usullari" },
    { id: 6, em: "📱", t: "Raqamli Bolalar Tarbiyasi", ct: "Zamonaviy", ls: 4, dur: "2 soat", lv: "Boshlang'ich", bg: "#E8F0FF", dc: "Texnologiya davrida bola tarbiyasi" },
  ];

  const CATS = ["Barchasi", "Psixologiya", "Muloqot", "Tarbiya", "Zamonaviy"];
  const filtered = flt === "Barchasi" ? CS : CS.filter(c => c.ct === flt);

  const pickCourse = async (c) => {
    setSel(c); setAiSum(""); setSumLoad(true);
    try {
      const r = await callClaude([{ role: "user", content: `"${c.t}" kursi haqida qisqacha ma'lumot ber. Bu kursdan nima o'rganish mumkin va ota-onaga qanday foydali? O'zbek tilida 3-4 jumlada.` }],
        "Sen ta'lim maslahatchisin. O'zbek tilida qisqa, motivatsion javob ber.");
      setAiSum(r);
    } catch { setAiSum("Ma'lumot yuklanmadi."); }
    setSumLoad(false);
  };

  return (
    <div className="page">
      <div className="ptitle">📚 Mini Kurslar</div>
      <div className="psub">Ota-onalar uchun maxsus ishlab chiqilgan qisqa va amaliy kurslar</div>
      <div style={{ display: "flex", gap: 7, marginBottom: 22, flexWrap: "wrap" }}>
        {CATS.map(c => <button key={c} onClick={() => setFlt(c)} style={{ padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 800, cursor: "pointer", background: flt === c ? "#E8593A" : "#FFF0EA", color: flt === c ? "#fff" : "#E8593A", border: "1.5px solid #FFD0BB", transition: "all .18s" }}>{c}</button>)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 14 }}>
        {filtered.map(c => (
          <div className="course-card" key={c.id} onClick={() => pickCourse(c)}>
            <div style={{ height: 110, display: "flex", alignItems: "center", justifyContent: "center", background: c.bg, fontSize: 48 }}>{c.em}</div>
            <div style={{ padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span className="tag tag-c">{c.ct}</span>
                <span className="tag tag-t">{c.lv}</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 5, color: "#2D1A14" }}>{c.t}</div>
              <div style={{ fontSize: 12, color: "#6E4A42", lineHeight: 1.65, marginBottom: 11 }}>{c.dc}</div>
              <div style={{ display: "flex", gap: 12, fontSize: 11, color: "#8A6A62" }}>
                <span>📖 {c.ls} dars</span><span>⏱ {c.dur}</span>
                {enrolled[c.id] && <span style={{ color: "#4CAFA0", fontWeight: 800 }}>✅ Yozilgan</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {sel && (
        <div className="modal-bg" onClick={() => setSel(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 46, textAlign: "center", marginBottom: 11 }}>{sel.em}</div>
            <div style={{ fontSize: 18, fontWeight: 800, textAlign: "center", marginBottom: 6 }}>{sel.t}</div>
            <div style={{ display: "flex", gap: 7, justifyContent: "center", marginBottom: 14 }}>
              <span className="tag tag-c">{sel.ct}</span><span className="tag tag-t">{sel.lv}</span>
            </div>
            <div style={{ fontSize: 13, color: "#6E4A42", textAlign: "center", marginBottom: 14 }}>📖 {sel.ls} dars · ⏱ {sel.dur}</div>
            {sumLoad ? (
              <div style={{ textAlign: "center", padding: 14 }}><div className="ldots"><span /><span /><span /></div></div>
            ) : aiSum && (
              <div style={{ background: "#FFF0EA", borderRadius: 11, padding: 13, marginBottom: 14, border: "1.5px solid #FFD0BB" }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: "#E8593A", marginBottom: 5 }}>🤖 AI tavsifi</div>
                <div style={{ fontSize: 12, lineHeight: 1.7 }}>{aiSum}</div>
              </div>
            )}
            <div style={{ display: "flex", gap: 9 }}>
              <button className="btn-p" style={{ flex: 1 }} onClick={() => { setEnrolled(p => ({ ...p, [sel.id]: true })); setSel(null); }}>
                {enrolled[sel.id] ? "✅ Yozilgansiz" : "Kursga yozilish"}
              </button>
              <button className="btn-s" style={{ flex: 1 }} onClick={() => setSel(null)}>Yopish</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ParentAI() {
  const [page, setPage] = useState("home");

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = STYLES;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  const PAGES = {
    home: <HomePage setPage={setPage} />,
    chat: <AIChatPage />,
    childmap: <ChildMapPage />,
    health: <FamilyHealthPage />,
    conflict: <ConflictSimPage />,
    risk: <RiskDetectPage />,
    community: <CommunityPage />,
    psychologists: <PsychologistPage />,
    courses: <CoursesPage />,
  };

  return (
    <div className="app">
      <Sidebar page={page} setPage={setPage} />
      <div className="content">{PAGES[page]}</div>
    </div>
  );
}
