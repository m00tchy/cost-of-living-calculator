import { useMemo, useState } from "react";

function yen(n) {
  if (!Number.isFinite(n)) return "0";
  return n.toLocaleString("ja-JP");
}

export default function App() {
  const [rent, setRent] = useState(50000);
  const [electricity, setElectricity] = useState(14000);
  const [water, setWater] = useState(3000);
  const [food, setFood] = useState(40000);
  const [gym, setGym] = useState(7000);
  const [idealFood, setIdealFood] = useState(3000);

  const monthly = useMemo(() => {
    return rent + electricity + water + food + gym + idealFood;
  }, [rent, electricity, water, food, gym, idealFood]);

  const yearly = monthly * 12;


  const Row = ({ label, value, onChange }) => (
    <label style={{ display: "grid", gridTemplateColumns: "1fr 180px", gap: 12, alignItems: "center", padding: "8px 0" }}>
      <span>{label}</span>
      <input
        type="number"
        min="0"
        step="1000"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #333", background: "#111", color: "#fff" }}
      />
    </label>
  );

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", padding: "0 16px", fontFamily: "system-ui, -apple-system, Segoe UI, Roboto" }}>
      <h1 style={{ fontSize: 28, marginBottom: 6 }}>生活コスト計算機</h1>
      <p style={{ opacity: 0.75, marginTop: 0, marginBottom: 24 }}>
        月額の固定費を入れると、月・年の合計を出します（v0）。
      </p>

      <div style={{ border: "1px solid #2a2a2a", borderRadius: 14, padding: 16, background: "#0b0b0b" }}>
        <Row label="家賃" value={rent} onChange={setRent} />
        <Row label="電気" value={electricity} onChange={setElectricity} />
        <Row label="水道" value={water} onChange={setWater} />
        <Row label="食費" value={food} onChange={setFood} />
        <Row label="ジム" value={gym} onChange={setGym} />
        <Row label="理想の食費" value={idealFood} onChange={setIdealFood} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
        <div style={{ border: "1px solid #2a2a2a", borderRadius: 14, padding: 16, background: "#0b0b0b" }}>
          <div style={{ opacity: 0.8, marginBottom: 6 }}>月額合計</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>¥{yen(monthly)}</div>
        </div>
        <div style={{ border: "1px solid #2a2a2a", borderRadius: 14, padding: 16, background: "#0b0b0b" }}>
          <div style={{ opacity: 0.8, marginBottom: 6 }}>年額合計</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>¥{yen(yearly)}</div>
        </div>
      </div>

      <p style={{ opacity: 0.6, marginTop: 16 }}>
        次の改善候補：保存（localStorage）、理想ライン/安定ライン、手取り換算。
      </p>
    </div>
  );
}
