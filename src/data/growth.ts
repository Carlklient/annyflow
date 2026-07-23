export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type OfferPackage = {
  id: string;
  title: string;
  summary: string;
  includes: string[];
  idealFor: string;
  href: string;
};

export type IndustryStripItem = {
  label: string;
  detail: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  industry: string;
  pillar: "automation" | "spreadsheet" | "phone" | "outbound";
  challenge: string;
  approach: string;
  results: string[];
  stack: string[];
  relatedPortfolioId?: string;
};

export type GuidePost = {
  slug: string;
  title: string;
  description: string;
  pillar: "automation" | "spreadsheet" | "phone" | "outbound";
  readMinutes: number;
  publishedAt: string;
  keywords: string[];
  sections: { heading: string; body: string[] }[];
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    description:
      "A free 20 to 30 minute call to map bottlenecks, tools, and what success looks like for your team.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "We propose a clear architecture: what to connect, what to automate, and what to leave alone.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Systems are implemented in focused sprints with demos, so you see progress before handoff.",
  },
  {
    step: "04",
    title: "Hand off",
    description:
      "Documentation, training, and a clean operating handoff so your team can run without us.",
  },
];

export const OFFER_PACKAGES: OfferPackage[] = [
  {
    id: "automation-audit",
    title: "Automation audit",
    summary:
      "Map your stack, find manual handoffs, and leave with a prioritized build list.",
    includes: [
      "Tool and workflow review",
      "Bottleneck map",
      "Recommended integration plan",
      "Rough timeline and scope",
    ],
    idealFor: "Teams drowning in copy paste and disconnected CRMs",
    href: "/contact?interest=automation",
  },
  {
    id: "spreadsheet-rebuild",
    title: "Spreadsheet rebuild",
    summary:
      "Replace fragile Excel or Sheets workbooks with reliable models, dashboards, and sync.",
    includes: [
      "Workbook review",
      "Clean data model",
      "Dashboard or Apps Script automation",
      "CRM or API sync where needed",
    ],
    idealFor: "Finance and ops teams living inside spreadsheets",
    href: "/contact?interest=spreadsheet",
  },
  {
    id: "pbx-setup",
    title: "Business phone setup",
    summary:
      "Deploy or clean up 3CX, FreePBX, or Asterisk with IVR, queues, and CRM call logging.",
    includes: [
      "PBX design",
      "IVR and queue setup",
      "SIP trunk guidance",
      "CRM click to call or screen pops",
    ],
    idealFor: "Companies ready for a real phone system",
    href: "/contact?interest=phone",
  },
  {
    id: "dialer-launch",
    title: "Outbound dialer launch",
    summary:
      "Stand up Vicidial or GoAutoDial with campaigns, agent groups, and reporting.",
    includes: [
      "Dialer install or rebuild",
      "Campaign configuration",
      "Agent and supervisor views",
      "CRM lead sync options",
    ],
    idealFor: "Sales teams scaling outbound volume",
    href: "/contact?interest=outbound",
  },
];

export const INDUSTRIES: IndustryStripItem[] = [
  { label: "Professional services", detail: "Ops and client delivery automation" },
  { label: "Sales teams", detail: "CRM sync and outbound dialers" },
  { label: "Real estate", detail: "Speed to lead and nurture flows" },
  { label: "Finance ops", detail: "Excel and Sheets reporting pipelines" },
  { label: "Multi site businesses", detail: "PBX, queues, and CRM phone sync" },
  { label: "SaaS and startups", detail: "Lean automation without bloat" },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "sales-ops-crm-automation",
    title: "Sales ops CRM automation for a multi tool team",
    industry: "Professional services",
    pillar: "automation",
    challenge:
      "Leads arrived by form, WhatsApp, and email. Reps copied data into HubSpot by hand, follow ups slipped, and managers never trusted pipeline numbers.",
    approach:
      "We connected intake channels into HubSpot with Make and n8n, added stage based task creation, and built a weekly pipeline digest from clean CRM fields.",
    results: [
      "Manual lead entry dropped to near zero",
      "Same day follow up became the default",
      "Managers used one CRM view instead of three spreadsheets",
    ],
    stack: ["HubSpot", "Make", "n8n", "WhatsApp"],
    relatedPortfolioId: "sales-pipeline-automation",
  },
  {
    slug: "excel-reporting-pipeline",
    title: "Excel and Sheets reporting that refreshes itself",
    industry: "Growing SaaS company",
    pillar: "spreadsheet",
    challenge:
      "Finance spent days each month rebuilding reports from CSV exports. Numbers drifted between decks, and leadership waited too long for decisions.",
    approach:
      "We rebuilt the model in Excel with Power Query, synced ops metrics into Google Sheets, and scheduled cleanup plus dashboard refresh without manual paste.",
    results: [
      "Monthly reporting time fell from days to hours",
      "One trusted source for leadership KPIs",
      "Dashboards refresh on a schedule, not on heroics",
    ],
    stack: ["Microsoft Excel", "Power Query", "Google Sheets", "Apps Script"],
    relatedPortfolioId: "excel-financial-dashboard",
  },
  {
    slug: "3cx-crm-phone-rollout",
    title: "Calm 3CX rollout with queues and CRM sync",
    industry: "Multi site business",
    pillar: "phone",
    challenge:
      "Call routing was inconsistent across offices. Agents had no screen pop, missed calls were invisible, and IT feared a disruptive cutover.",
    approach:
      "We designed a staged 3CX deployment with shared queues, multi level IVR, and HubSpot call logging, then migrated sites in waves with training.",
    results: [
      "Day one queues and IVR worked without downtime panic",
      "Agents saw caller context in CRM",
      "Supervisors gained wait time and missed call visibility",
    ],
    stack: ["3CX", "HubSpot", "SIP trunks"],
    relatedPortfolioId: "enterprise-3cx-deployment",
  },
];

export const GUIDES: GuidePost[] = [
  {
    slug: "connect-3cx-to-crm",
    title: "How to connect 3CX to your CRM without chaos",
    description:
      "A practical guide to click to call, screen pops, and call logging between 3CX and CRMs like HubSpot or Salesforce.",
    pillar: "phone",
    readMinutes: 7,
    publishedAt: "2026-07-01",
    keywords: ["3CX CRM integration", "click to call", "screen pop", "call logging"],
    sections: [
      {
        heading: "Start with the outcome, not the feature list",
        body: [
          "Most teams want three things: click to call from the CRM, a screen pop when a known number calls in, and a logged call activity after hangup.",
          "If your rollout tries to do every 3CX module at once, agents get confused and adoption stalls. Sequence outcomes in that order.",
        ],
      },
      {
        heading: "Map identity before you map dial tones",
        body: [
          "CRM sync fails when phone numbers are messy. Normalize to E.164 where possible, and decide which CRM field is the source of truth.",
          "Also decide what happens for unknown callers: create a lead, open a search, or route to a general queue with a note.",
        ],
      },
      {
        heading: "Test with one queue and one CRM pipeline",
        body: [
          "Pilot with a small agent group. Confirm inbound screen pops, outbound logging, and missed call handling before expanding.",
          "AnnyFlow typically stages IVR, queues, then CRM connectivity so cutover stays calm.",
        ],
      },
    ],
  },
  {
    slug: "excel-to-hubspot-automation",
    title: "Excel to HubSpot automation that stops the copy paste loop",
    description:
      "When to keep Excel, when to sync into HubSpot, and how to automate the bridge with Make, n8n, or Power Query.",
    pillar: "spreadsheet",
    readMinutes: 6,
    publishedAt: "2026-07-08",
    keywords: ["Excel HubSpot sync", "spreadsheet automation", "Power Query", "Make n8n"],
    sections: [
      {
        heading: "Keep Excel for models, not for master records",
        body: [
          "Excel is excellent for forecasts, commissions, and scenario models. It is a weak system of record for leads and customers.",
          "If reps edit the same workbook as their CRM, you will fight duplicates forever. Pick HubSpot as the customer source of truth.",
        ],
      },
      {
        heading: "Use Power Query for finance, workflows for CRM events",
        body: [
          "Pull CRM exports or API feeds into Excel with Power Query when leadership needs offline analysis.",
          "Push operational events the other way with Make or n8n: form submit creates a deal, stage change updates a sheet used by finance.",
        ],
      },
      {
        heading: "Validate before you scale",
        body: [
          "Add simple checks for required fields, phone format, and owner assignment. Bad data automated is still bad data.",
          "AnnyFlow builds these bridges so reporting stays trusted and sales stays in HubSpot.",
        ],
      },
    ],
  },
  {
    slug: "vicidial-setup-checklist",
    title: "Vicidial setup checklist for a clean outbound launch",
    description:
      "A no fluff checklist for Vicidial installs: campaigns, agent groups, pacing, CRM sync, and reporting.",
    pillar: "outbound",
    readMinutes: 8,
    publishedAt: "2026-07-15",
    keywords: ["Vicidial setup", "outbound dialer", "predictive dialer", "call center"],
    sections: [
      {
        heading: "Infrastructure before campaigns",
        body: [
          "Confirm SIP trunks, codecs, recording storage, and time sync first. Campaign tuning cannot fix unstable audio.",
          "Separate admin, agent, and reporting access early so supervisors are not sharing root habits.",
        ],
      },
      {
        heading: "Campaign design with guardrails",
        body: [
          "Set clear dial methods (preview, progressive, predictive), abandonment targets, and hopper rules before agents log in.",
          "Document DNC handling and disposition codes so reporting matches how the floor actually works.",
        ],
      },
      {
        heading: "Connect CRM last, then measure",
        body: [
          "Once dialing is stable, sync leads and dispositions to CRM so managers see pipeline and call outcomes together.",
          "AnnyFlow launches Vicidial stacks with monitoring and reporting so volume does not outrun control.",
        ],
      },
    ],
  },
  {
    slug: "what-is-business-automation",
    title: "What business automation actually means for small teams",
    description:
      "A plain English explanation of workflow automation, when Zapier or n8n is enough, and when you need a real build.",
    pillar: "automation",
    readMinutes: 5,
    publishedAt: "2026-06-20",
    keywords: ["business automation", "workflow automation", "Zapier", "n8n", "Make"],
    sections: [
      {
        heading: "Automation is glue, not magic",
        body: [
          "Business automation connects the tools you already use so people stop retyping the same facts.",
          "Typical wins: lead routing, invoice reminders, ticket creation, Slack alerts, and CRM updates after a form fill.",
        ],
      },
      {
        heading: "Start with one painful loop",
        body: [
          "Pick a weekly task that always slips. Automate that path end to end before building a giant platform.",
          "If the process is unclear on paper, software will only make the mess faster.",
        ],
      },
      {
        heading: "When to call AnnyFlow",
        body: [
          "Call us when the stack spans CRM, spreadsheets, phone systems, or dialers, or when a no code zap keeps breaking in production.",
          "We design systems your team can run, not fragile demos.",
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

export function getGuide(slug: string) {
  return GUIDES.find((g) => g.slug === slug);
}

export const SOLUTION_PILLARS = [
  {
    id: "business-automation",
    title: "Business Automation",
    href: "/solutions/business-automation",
  },
  {
    id: "spreadsheet-automation",
    title: "Spreadsheet Automation",
    href: "/solutions/spreadsheet-automation",
  },
  {
    id: "business-phone-systems",
    title: "Business Phone Systems",
    href: "/solutions/business-phone-systems",
  },
  {
    id: "outbound-calling",
    title: "Outbound Calling",
    href: "/solutions/outbound-calling",
  },
] as const;
