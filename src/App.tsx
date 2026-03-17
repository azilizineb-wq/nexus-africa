import React, { useMemo, useState } from "react";

const initialDeals = [
  {
    id: 1,
    title: "Industrial Services Platform",
    type: "Sale",
    country: "Morocco",
    sector: "Business Services",
    revenue: "€4.2m",
    ebitda: "€0.8m",
    summary: "Founder-led business with recurring B2B revenues and strong regional positioning.",
    ticket: "€3m - €7m",
    status: "Verified",
  },
  {
    id: 2,
    title: "Healthtech SaaS Expansion Round",
    type: "Fundraising",
    country: "Kenya",
    sector: "Technology",
    revenue: "€1.1m",
    ebitda: "Negative",
    summary: "Fast-growing software platform seeking growth capital to expand across East Africa.",
    ticket: "€1m - €3m",
    status: "In review",
  },
  {
    id: 3,
    title: "Consumer Goods Distributor",
    type: "Sale",
    country: "Senegal",
    sector: "Distribution",
    revenue: "€8.7m",
    ebitda: "€1.3m",
    summary: "Established distribution platform with dense retailer network and import capabilities.",
    ticket: "€5m - €12m",
    status: "Verified",
  },
  {
    id: 4,
    title: "Hospitality Group Seed Extension",
    type: "Fundraising",
    country: "Morocco",
    sector: "Hospitality",
    revenue: "Pre-revenue",
    ebitda: "Negative",
    summary: "Premium urban lifestyle concept seeking strategic investors and local rollout support.",
    ticket: "€0.3m - €1m",
    status: "Verified",
  },
];

const countries = ["All", "Morocco", "Kenya", "Senegal", "Nigeria", "Egypt"];
const sectors = ["All", "Technology", "Business Services", "Distribution", "Healthcare", "Hospitality"];
const dealTypes = ["All", "Sale", "Fundraising"];

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    color: "#0f172a",
    fontFamily: "Arial, sans-serif",
    padding: "24px",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  hero: {
    background: "white",
    borderRadius: "24px",
    padding: "32px",
    boxShadow: "0 2px 12px rgba(15, 23, 42, 0.08)",
    marginBottom: "24px",
  },
  badge: {
    display: "inline-block",
    background: "#e2e8f0",
    color: "#334155",
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: 600,
  },
  h1: {
    fontSize: "48px",
    margin: "16px 0 12px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#475569",
    maxWidth: "760px",
    lineHeight: 1.6,
  },
  buttonRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "20px",
  },
  primaryButton: {
    background: "#0f172a",
    color: "white",
    border: "none",
    borderRadius: "16px",
    padding: "12px 18px",
    cursor: "pointer",
    fontWeight: 600,
  },
  secondaryButton: {
    background: "white",
    color: "#0f172a",
    border: "1px solid #cbd5e1",
    borderRadius: "16px",
    padding: "12px 18px",
    cursor: "pointer",
    fontWeight: 600,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },
  statCard: {
    background: "white",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 2px 12px rgba(15, 23, 42, 0.08)",
  },
  tabs: {
    display: "flex",
    gap: "8px",
    background: "white",
    borderRadius: "20px",
    padding: "8px",
    boxShadow: "0 2px 12px rgba(15, 23, 42, 0.08)",
    marginBottom: "24px",
    flexWrap: "wrap",
  },
  tabButton: {
    border: "none",
    background: "transparent",
    padding: "12px 18px",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: 600,
  },
  activeTabButton: {
    background: "#0f172a",
    color: "white",
  },
  filtersCard: {
    background: "white",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 2px 12px rgba(15, 23, 42, 0.08)",
    marginBottom: "16px",
  },
  filtersGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "12px",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    boxSizing: "border-box",
    fontSize: "14px",
  },
  textarea: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    boxSizing: "border-box",
    minHeight: "120px",
    fontSize: "14px",
    resize: "vertical",
  },
  dealsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "16px",
  },
  dealCard: {
    background: "white",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 2px 12px rgba(15, 23, 42, 0.08)",
  },
  smallBadge: {
    display: "inline-block",
    background: "#f1f5f9",
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    marginRight: "8px",
    marginTop: "8px",
  },
  metricGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginTop: "16px",
  },
  metricBox: {
    background: "#f8fafc",
    borderRadius: "16px",
    padding: "12px",
  },
  sectionTitle: {
    fontSize: "28px",
    marginBottom: "16px",
  },
  formCard: {
    background: "white",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 2px 12px rgba(15, 23, 42, 0.08)",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "12px",
  },
  fullWidth: {
    gridColumn: "1 / -1",
  },
  uploadBox: {
    border: "1px dashed #cbd5e1",
    borderRadius: "16px",
    padding: "16px",
    background: "#f8fafc",
  },
  investorGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "16px",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "12px",
    marginBottom: "16px",
  },
  darkBox: {
    background: "#0f172a",
    color: "white",
    borderRadius: "20px",
    padding: "20px",
    marginTop: "16px",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(15, 23, 42, 0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  modal: {
    background: "white",
    borderRadius: "20px",
    maxWidth: "520px",
    width: "100%",
    padding: "24px",
    boxShadow: "0 12px 40px rgba(15, 23, 42, 0.2)",
  },
};

function StatCard({ title, value, subtitle }) {
  return (
    <div style={styles.statCard}>
      <div style={{ fontSize: 14, color: "#64748b" }}>{title}</div>
      <div style={{ fontSize: 32, fontWeight: 700, marginTop: 8 }}>{value}</div>
      <div style={{ fontSize: 14, color: "#64748b", marginTop: 6 }}>{subtitle}</div>
    </div>
  );
}

function DealCard({ deal, onInterest }) {
  return (
    <div style={styles.dealCard}>
      <div style={{ fontSize: 22, fontWeight: 700 }}>{deal.title}</div>
      <div>
        <span style={styles.smallBadge}>{deal.type}</span>
        <span style={styles.smallBadge}>{deal.status}</span>
      </div>
      <div style={{ color: "#64748b", marginTop: 12, lineHeight: 1.7 }}>
        <div>📍 {deal.country}</div>
        <div>🏢 {deal.sector}</div>
        <div>💰 {deal.ticket}</div>
      </div>
      <p style={{ color: "#475569", lineHeight: 1.7, marginTop: 14 }}>{deal.summary}</p>
      <div style={styles.metricGrid}>
        <div style={styles.metricBox}>
          <div style={{ color: "#64748b", fontSize: 13 }}>Revenue</div>
          <div style={{ fontWeight: 700, marginTop: 4 }}>{deal.revenue}</div>
        </div>
        <div style={styles.metricBox}>
          <div style={{ color: "#64748b", fontSize: 13 }}>EBITDA</div>
          <div style={{ fontWeight: 700, marginTop: 4 }}>{deal.ebitda}</div>
        </div>
      </div>
      <button style={{ ...styles.primaryButton, width: "100%", marginTop: 16 }} onClick={() => onInterest(deal)}>
        I’m interested
      </button>
    </div>
  );
}

export default function NexusAfricaMVP() {
  const [activeTab, setActiveTab] = useState("marketplace");
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All");
  const [sector, setSector] = useState("All");
  const [dealType, setDealType] = useState("All");
  const [deals, setDeals] = useState(initialDeals);
  const [interestDeal, setInterestDeal] = useState(null);
  const [interestSent, setInterestSent] = useState(false);
  const [form, setForm] = useState({
    company: "",
    contact: "",
    email: "",
    title: "",
    type: "Sale",
    country: "Morocco",
    sector: "Technology",
    revenue: "",
    ebitda: "",
    ticket: "",
    summary: "",
  });

  const filteredDeals = useMemo(() => {
    return deals.filter((deal) => {
      const matchesSearch =
        deal.title.toLowerCase().includes(search.toLowerCase()) ||
        deal.summary.toLowerCase().includes(search.toLowerCase()) ||
        deal.sector.toLowerCase().includes(search.toLowerCase());
      const matchesCountry = country === "All" || deal.country === country;
      const matchesSector = sector === "All" || deal.sector === sector;
      const matchesType = dealType === "All" || deal.type === dealType;
      return matchesSearch && matchesCountry && matchesSector && matchesType;
    });
  }, [deals, search, country, sector, dealType]);

  const submitDeal = () => {
    const newDeal = {
      id: deals.length + 1,
      title: form.title || "Untitled deal",
      type: form.type,
      country: form.country,
      sector: form.sector,
      revenue: form.revenue || "N/A",
      ebitda: form.ebitda || "N/A",
      ticket: form.ticket || "N/A",
      summary: form.summary || "No summary provided.",
      status: "In review",
    };
    setDeals([newDeal, ...deals]);
    setActiveTab("marketplace");
    setForm({
      company: "",
      contact: "",
      email: "",
      title: "",
      type: "Sale",
      country: "Morocco",
      sector: "Technology",
      revenue: "",
      ebitda: "",
      ticket: "",
      summary: "",
    });
  };

  const renderMarketplace = () => (
    <>
      <div style={styles.filtersCard}>
        <div style={styles.filtersGrid}>
          <input
            style={styles.input}
            placeholder="Search deals, sectors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select style={styles.input} value={country} onChange={(e) => setCountry(e.target.value)}>
            {countries.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
          <select style={styles.input} value={sector} onChange={(e) => setSector(e.target.value)}>
            {sectors.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
          <select style={styles.input} value={dealType} onChange={(e) => setDealType(e.target.value)}>
            {dealTypes.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ color: "#64748b", marginBottom: 16 }}>{filteredDeals.length} result(s)</div>
      <div style={styles.dealsGrid}>
        {filteredDeals.map((deal) => (
          <DealCard
            key={deal.id}
            deal={deal}
            onInterest={(d) => {
              setInterestDeal(d);
              setInterestSent(false);
            }}
          />
        ))}
      </div>
    </>
  );

  const renderSubmit = () => (
    <div style={styles.formCard}>
      <div style={styles.sectionTitle}>Submit a new opportunity</div>
      <div style={styles.formGrid}>
        <input style={styles.input} placeholder="Company name" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
        <input style={styles.input} placeholder="Contact name" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
        <input style={styles.input} placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input style={styles.input} placeholder="Deal title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />

        <select style={styles.input} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option value="Sale">Sale</option>
          <option value="Fundraising">Fundraising</option>
        </select>
        <select style={styles.input} value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}>
          {countries.filter((x) => x !== "All").map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>

        <select style={styles.input} value={form.sector} onChange={(e) => setForm({ ...form, sector: e.target.value })}>
          {sectors.filter((x) => x !== "All").map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <input style={styles.input} placeholder="Revenue" value={form.revenue} onChange={(e) => setForm({ ...form, revenue: e.target.value })} />
        <input style={styles.input} placeholder="EBITDA" value={form.ebitda} onChange={(e) => setForm({ ...form, ebitda: e.target.value })} />
        <input style={styles.input} placeholder="Target ticket / valuation" value={form.ticket} onChange={(e) => setForm({ ...form, ticket: e.target.value })} />

        <div style={styles.fullWidth}>
          <textarea
            style={styles.textarea}
            placeholder="Short confidential summary"
            value={form.summary}
            onChange={(e) => setForm({ ...form, summary: e.target.value })}
          />
        </div>

        <div style={{ ...styles.uploadBox, ...styles.fullWidth }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Teaser / IM upload</div>
          <div style={{ color: "#64748b" }}>Prototype mode: upload flow not connected yet.</div>
        </div>

        <div style={{ ...styles.fullWidth, display: "flex", justifyContent: "flex-end" }}>
          <button style={styles.primaryButton} onClick={submitDeal}>Submit for review</button>
        </div>
      </div>
    </div>
  );

  const renderInvestors = () => (
    <div style={styles.investorGrid}>
      <div style={styles.formCard}>
        <div style={styles.sectionTitle}>Investor access</div>
        <div style={styles.infoGrid}>
          <div style={styles.metricBox}>
            <div style={{ fontWeight: 700 }}>Curated deal flow</div>
            <div style={{ color: "#64748b", marginTop: 8 }}>Access pre-screened sell-side and fundraising opportunities.</div>
          </div>
          <div style={styles.metricBox}>
            <div style={{ fontWeight: 700 }}>Targeted matching</div>
            <div style={{ color: "#64748b", marginTop: 8 }}>Receive deals by sector, ticket size, and geography.</div>
          </div>
          <div style={styles.metricBox}>
            <div style={{ fontWeight: 700 }}>Confidential workflow</div>
            <div style={{ color: "#64748b", marginTop: 8 }}>Controlled introductions and admin validation.</div>
          </div>
        </div>

        <div style={styles.darkBox}>
          <div style={{ fontSize: 24, fontWeight: 700 }}>Premium investor onboarding</div>
          <div style={{ color: "#cbd5e1", marginTop: 10, lineHeight: 1.6 }}>
            Join the waiting list to access private opportunities across Morocco, West Africa, and East Africa.
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
            <input style={{ ...styles.input, flex: 1, minWidth: 200, background: "#1e293b", color: "white", border: "1px solid #334155" }} placeholder="Work email" />
            <button style={styles.secondaryButton}>Request access</button>
          </div>
        </div>
      </div>

      <div style={styles.formCard}>
        <div style={{ ...styles.sectionTitle, fontSize: 24 }}>Admin workflow</div>
        <div style={{ ...styles.metricBox, marginBottom: 10 }}>1. Review deal submission</div>
        <div style={{ ...styles.metricBox, marginBottom: 10 }}>2. Validate confidentiality level</div>
        <div style={{ ...styles.metricBox, marginBottom: 10 }}>3. Approve relevant investor access</div>
        <div style={styles.metricBox}>4. Track introductions and feedback</div>
      </div>
    </div>
  );

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.hero}>
          <div style={styles.badge}>Private markets in Africa</div>
          <h1 style={styles.h1}>Nexus Africa</h1>
          <div style={styles.subtitle}>
            A private deal marketplace connecting investors with companies seeking a sale or fundraising across Morocco and Africa.
          </div>
          <div style={styles.buttonRow}>
            <button style={styles.primaryButton} onClick={() => setActiveTab("submit")}>Submit a deal</button>
            <button style={styles.secondaryButton} onClick={() => setActiveTab("investors")}>Investor access</button>
          </div>
        </div>

        <div style={styles.statsGrid}>
          <StatCard title="Live deals" value={String(deals.length)} subtitle="Curated opportunities" />
          <StatCard title="Verified profiles" value="82%" subtitle="Manual screening by admin" />
          <StatCard title="Focus markets" value="12" subtitle="Across Africa" />
          <StatCard title="Match requests" value="128" subtitle="Tracked in pipeline" />
        </div>

        <div style={styles.tabs}>
          <button
            style={{ ...styles.tabButton, ...(activeTab === "marketplace" ? styles.activeTabButton : {}) }}
            onClick={() => setActiveTab("marketplace")}
          >
            Marketplace
          </button>
          <button
            style={{ ...styles.tabButton, ...(activeTab === "submit" ? styles.activeTabButton : {}) }}
            onClick={() => setActiveTab("submit")}
          >
            Submit a deal
          </button>
          <button
            style={{ ...styles.tabButton, ...(activeTab === "investors" ? styles.activeTabButton : {}) }}
            onClick={() => setActiveTab("investors")}
          >
            Investors
          </button>
        </div>

        {activeTab === "marketplace" && renderMarketplace()}
        {activeTab === "submit" && renderSubmit()}
        {activeTab === "investors" && renderInvestors()}
      </div>

      {interestDeal && (
        <div style={styles.overlay} onClick={() => setInterestDeal(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: 26, fontWeight: 700, marginBottom: 16 }}>Express interest</div>
            <div style={{ ...styles.metricBox, marginBottom: 16 }}>
              <div style={{ fontWeight: 700 }}>{interestDeal.title}</div>
              <div style={{ color: "#64748b", marginTop: 6 }}>This prototype simulates an interest request workflow.</div>
            </div>

            {interestSent ? (
              <div style={styles.metricBox}>Interest request sent. Admin review would normally trigger the next step.</div>
            ) : (
              <>
                <input style={{ ...styles.input, marginBottom: 12 }} placeholder="Your name" />
                <input style={{ ...styles.input, marginBottom: 12 }} placeholder="Firm" />
                <input style={{ ...styles.input, marginBottom: 12 }} placeholder="Professional email" />
                <textarea style={{ ...styles.textarea, marginBottom: 12 }} placeholder="Short investment rationale" />
                <button style={{ ...styles.primaryButton, width: "100%" }} onClick={() => setInterestSent(true)}>
                  Send request
                </button>
              </>
            )}

            <button style={{ ...styles.secondaryButton, width: "100%", marginTop: 12 }} onClick={() => setInterestDeal(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
