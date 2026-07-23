export type SolutionCategory = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: "workflow" | "phone" | "outbound" | "spreadsheet";
  items: { title: string; tags: string[] }[];
};

export const SOLUTIONS: SolutionCategory[] = [
  {
    id: "business-automation",
    title: "Business Automation",
    description:
      "Workflow, CRM, and AI systems businesses actually run—connected, automated, and built to scale.",
    href: "/solutions#business-automation",
    icon: "workflow",
    items: [
      {
        title: "Workflow Automation",
        tags: ["Make", "n8n", "Zapier", "Microsoft Power Automate", "API Integrations", "Webhooks"],
      },
      {
        title: "Sales CRM",
        tags: ["HubSpot", "Salesforce", "Zoho CRM", "Pipedrive", "Freshsales", "Monday CRM"],
      },
      {
        title: "Real Estate CRM",
        tags: ["Follow Up Boss", "kvCORE", "LionDesk", "BoomTown", "Wise Agent"],
      },
      {
        title: "Construction CRM",
        tags: ["BuildOps", "Buildertrend", "Procore", "Contractor Foreman", "Jobber"],
      },
      {
        title: "Legal CRM",
        tags: ["Clio", "MyCase", "PracticePanther", "Smokeball", "Filevine", "LEAP"],
      },
      {
        title: "Healthcare CRM",
        tags: ["Salesforce Health Cloud", "Athenahealth", "Epic", "DrChrono", "Kareo"],
      },
      {
        title: "Property Management (PMS)",
        tags: ["Buildium", "AppFolio", "DoorLoop", "Rent Manager", "Yardi"],
      },
      {
        title: "Learning Management (LMS)",
        tags: ["Moodle", "Canvas LMS", "Thinkific", "Teachable", "TalentLMS"],
      },
      {
        title: "Appointment & Booking",
        tags: ["Calendly", "Acuity Scheduling", "SimplyBook.me", "Setmore", "Bookeo", "Amelia"],
      },
      {
        title: "Time Tracking & Workforce",
        tags: ["Clockify", "Hubstaff", "Harvest", "Toggl Track", "Time Doctor"],
      },
      {
        title: "Project Management",
        tags: ["ClickUp", "Monday.com", "Asana", "Notion", "Jira", "Trello"],
      },
      {
        title: "AI Automation",
        tags: [
          "OpenAI",
          "ChatGPT",
          "Claude",
          "WhatsApp Automation",
          "Email Automation",
          "AI Workflow",
          "Knowledge Base AI",
        ],
      },
    ],
  },
  {
    id: "spreadsheet-automation",
    title: "Spreadsheet Automation",
    description:
      "Excel, Google Sheets, and Airtable systems that replace manual work—dashboards, formulas, scripts, and data pipelines teams rely on every day.",
    href: "/solutions#spreadsheet-automation",
    icon: "spreadsheet",
    items: [
      {
        title: "Microsoft Excel",
        tags: [
          "Advanced Formulas",
          "VBA Macros",
          "Power Query",
          "Power Pivot",
          "Dashboards",
          "Financial Models",
        ],
      },
      {
        title: "Google Sheets",
        tags: [
          "Apps Script",
          "ARRAYFORMULA",
          "QUERY",
          "IMPORTRANGE",
          "Automation Triggers",
          "Shared Dashboards",
        ],
      },
      {
        title: "Airtable & Databases",
        tags: ["Airtable", "Interfaces", "Automations", "Synced Tables", "Forms", "Reporting"],
      },
      {
        title: "Data Ops & Integrations",
        tags: [
          "CSV / API Pipelines",
          "CRM ↔ Sheet Sync",
          "Reporting Automation",
          "Cleanup & Validation",
          "Scheduled Refresh",
        ],
      },
    ],
  },
  {
    id: "business-phone-systems",
    title: "Business Phone Systems",
    description:
      "Reliable PBX, IVR, and CRM-connected phone infrastructure for teams that need clarity and control.",
    href: "/solutions#business-phone-systems",
    icon: "phone",
    items: [
      {
        title: "PBX Platforms",
        tags: ["3CX", "FreePBX", "Asterisk", "Yeastar", "Cloud PBX", "Microsoft Teams Phone"],
      },
      {
        title: "Connectivity & Routing",
        tags: ["SIP Trunks", "Twilio", "Telnyx", "IVR", "Call Queues", "Ring Groups"],
      },
      {
        title: "CRM & Operations",
        tags: ["CRM Integration", "Call Recording", "Softphones", "IP Phones", "Voicemail"],
      },
    ],
  },
  {
    id: "outbound-calling",
    title: "Outbound Calling Infrastructure",
    description:
      "High-performance dialing platforms, campaign tooling, and AI voice systems built for scale.",
    href: "/solutions#outbound-calling",
    icon: "outbound",
    items: [
      {
        title: "Dialer Platforms",
        tags: [
          "Vicidial",
          "GoAutoDial",
          "Predictive Dialers",
          "Progressive Dialers",
          "Preview Dialers",
          "Power Dialers",
        ],
      },
      {
        title: "Campaign & Voice",
        tags: [
          "AI Voice Agents",
          "Voice Broadcasting",
          "Campaign Management",
          "Lead Distribution",
        ],
      },
      {
        title: "Analytics & Workforce",
        tags: [
          "Call Analytics",
          "Speech Analytics",
          "Workforce Management",
          "Call Monitoring",
        ],
      },
    ],
  },
];

export type PortfolioPillar = "automation" | "spreadsheet" | "phone" | "outbound";

export type AutomationSolutionType =
  | "workflow"
  | "sales-crm"
  | "real-estate-crm"
  | "construction-crm"
  | "legal-crm"
  | "healthcare-crm"
  | "property-management"
  | "lms"
  | "appointment-booking"
  | "time-tracking"
  | "project-management"
  | "ai-automation";

export type SpreadsheetSolutionType =
  | "excel"
  | "google-sheets"
  | "airtable"
  | "data-pipelines"
  | "dashboards"
  | "reporting";

export type PhoneSolutionType =
  | "3cx"
  | "freepbx"
  | "asterisk"
  | "cloud-pbx"
  | "sip-trunks"
  | "ivr"
  | "call-queue"
  | "crm-integration"
  | "microsoft-teams"
  | "yeastar"
  | "voip-infrastructure";

export type OutboundSolutionType =
  | "vicidial"
  | "goautodial"
  | "predictive-dialers"
  | "progressive-dialers"
  | "preview-dialers"
  | "power-dialers"
  | "ai-voice"
  | "voice-broadcasting"
  | "campaign-management"
  | "call-analytics"
  | "workforce-management"
  | "lead-distribution";

export type PortfolioVisual =
  | "workflow"
  | "sales"
  | "real-estate"
  | "construction"
  | "legal"
  | "healthcare"
  | "property"
  | "lms"
  | "booking"
  | "time"
  | "project"
  | "ai"
  | "spreadsheet"
  | "phone"
  | "phone-3cx"
  | "phone-cloud"
  | "phone-sip"
  | "phone-ivr"
  | "phone-crm"
  | "phone-teams"
  | "phone-yeastar"
  | "phone-voip"
  | "outbound"
  | "outbound-vicidial"
  | "outbound-predictive"
  | "outbound-ai"
  | "outbound-broadcast"
  | "outbound-analytics"
  | "outbound-leads"
  | "outbound-workforce";

export type PortfolioItem = {
  id: string;
  title: string;
  categoryLabel: string;
  pillar: PortfolioPillar;
  solutionType?:
    | AutomationSolutionType
    | SpreadsheetSolutionType
    | PhoneSolutionType
    | OutboundSolutionType;
  summary: string;
  platforms: string[];
  automations: string[];
  accent: string;
  visual: PortfolioVisual;
  /** Real screenshot for Business Automation cards */
  image?: string;
};

export const AUTOMATION_FILTERS = [
  { id: "all", label: "All" },
  { id: "workflow", label: "Workflow Automation" },
  { id: "sales-crm", label: "Sales CRM" },
  { id: "real-estate-crm", label: "Real Estate CRM" },
  { id: "construction-crm", label: "Construction CRM" },
  { id: "legal-crm", label: "Legal CRM" },
  { id: "healthcare-crm", label: "Healthcare CRM" },
  { id: "property-management", label: "Property Management" },
  { id: "lms", label: "LMS" },
  { id: "appointment-booking", label: "Appointment Booking" },
  { id: "time-tracking", label: "Time Tracking" },
  { id: "project-management", label: "Project Management" },
  { id: "ai-automation", label: "AI Automation" },
] as const;

export const SPREADSHEET_FILTERS = [
  { id: "all", label: "All" },
  { id: "excel", label: "Microsoft Excel" },
  { id: "google-sheets", label: "Google Sheets" },
  { id: "airtable", label: "Airtable" },
  { id: "data-pipelines", label: "Data Pipelines" },
  { id: "dashboards", label: "Dashboards" },
  { id: "reporting", label: "Reporting" },
] as const;

export const PHONE_FILTERS = [
  { id: "all", label: "All" },
  { id: "3cx", label: "3CX" },
  { id: "freepbx", label: "FreePBX" },
  { id: "asterisk", label: "Asterisk" },
  { id: "cloud-pbx", label: "Cloud PBX" },
  { id: "sip-trunks", label: "SIP Trunks" },
  { id: "ivr", label: "IVR" },
  { id: "call-queue", label: "Call Queues" },
  { id: "crm-integration", label: "CRM Integration" },
  { id: "microsoft-teams", label: "Microsoft Teams" },
  { id: "yeastar", label: "Yeastar" },
  { id: "voip-infrastructure", label: "VoIP Infrastructure" },
] as const;

export const OUTBOUND_FILTERS = [
  { id: "all", label: "All" },
  { id: "vicidial", label: "Vicidial" },
  { id: "goautodial", label: "GoAutoDial" },
  { id: "predictive-dialers", label: "Predictive Dialers" },
  { id: "progressive-dialers", label: "Progressive Dialers" },
  { id: "preview-dialers", label: "Preview Dialers" },
  { id: "power-dialers", label: "Power Dialers" },
  { id: "ai-voice", label: "AI Voice" },
  { id: "voice-broadcasting", label: "Voice Broadcasting" },
  { id: "campaign-management", label: "Campaign Management" },
  { id: "call-analytics", label: "Call Analytics" },
  { id: "workforce-management", label: "Workforce Management" },
  { id: "lead-distribution", label: "Lead Distribution" },
] as const;

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: "business-workflow-automation",
    title: "Business Workflow Automation",
    categoryLabel: "Workflow Automation",
    pillar: "automation",
    solutionType: "workflow",
    summary:
      "Connect tools end-to-end with Make, n8n, Zapier, and Power Automate—APIs, webhooks, and approval flows included.",
    platforms: ["Make", "n8n", "Zapier", "Microsoft Power Automate"],
    automations: ["API Integrations", "Webhooks", "Multi-step Triggers"],
    accent: "#10B981",
    visual: "workflow",
    image: "/portfolio/workflow-automation.png",
  },
  {
    id: "excel-financial-dashboard",
    title: "Excel Financial Dashboard Suite",
    categoryLabel: "Microsoft Excel",
    pillar: "spreadsheet",
    solutionType: "excel",
    summary:
      "Multi-sheet Excel models with Power Query, Pivot analytics, and executive dashboards that refresh from live data sources.",
    platforms: ["Microsoft Excel", "Power Query", "Power Pivot"],
    automations: ["Financial Models", "KPI Dashboards", "Automated Refresh"],
    accent: "#217346",
    visual: "spreadsheet",
    image: "/portfolio/campaign-analytics-dashboard.png",
  },
  {
    id: "google-sheets-ops-automation",
    title: "Google Sheets Ops Automation",
    categoryLabel: "Google Sheets",
    pillar: "spreadsheet",
    solutionType: "google-sheets",
    summary:
      "Apps Script workflows that sync CRM data, auto-assign tasks, send alerts, and keep shared ops sheets accurate without manual copy-paste.",
    platforms: ["Google Sheets", "Apps Script", "Google Forms"],
    automations: ["CRM Sync", "Auto Alerts", "Team Dashboards"],
    accent: "#0F9D58",
    visual: "spreadsheet",
    image: "/portfolio/project-management-automation.png",
  },
  {
    id: "airtable-pipeline-system",
    title: "Airtable Pipeline System",
    categoryLabel: "Airtable",
    pillar: "spreadsheet",
    solutionType: "airtable",
    summary:
      "Airtable bases with interfaces, forms, and automations for lead tracking, project delivery, and client reporting.",
    platforms: ["Airtable", "Interfaces", "Automations"],
    automations: ["Lead Pipeline", "Status Alerts", "Client Views"],
    accent: "#18BFFF",
    visual: "spreadsheet",
    image: "/portfolio/sales-pipeline-automation.png",
  },
  {
    id: "spreadsheet-reporting-pipeline",
    title: "Automated Reporting Pipeline",
    categoryLabel: "Data Pipelines",
    pillar: "spreadsheet",
    solutionType: "data-pipelines",
    summary:
      "Scheduled CSV/API feeds into Sheets and Excel with validation, cleanup, and weekly management reports delivered automatically.",
    platforms: ["Google Sheets", "Excel", "Make", "n8n"],
    automations: ["Data Cleanup", "Scheduled Reports", "API Imports"],
    accent: "#059669",
    visual: "spreadsheet",
    image: "/portfolio/agent-performance-dashboard.png",
  },
  {
    id: "sales-pipeline-automation",
    title: "Sales Pipeline Automation",
    categoryLabel: "Sales CRM",
    pillar: "automation",
    solutionType: "sales-crm",
    summary:
      "Automate lead capture, stage movement, task creation, and follow-ups across HubSpot, Salesforce, Zoho, and Pipedrive.",
    platforms: ["HubSpot", "Salesforce", "Zoho CRM", "Pipedrive"],
    automations: ["Lead Routing", "Pipeline Sync", "Follow-up Sequences"],
    accent: "#059669",
    visual: "sales",
    image: "/portfolio/sales-pipeline-automation.png",
  },
  {
    id: "real-estate-lead-automation",
    title: "Real Estate Lead Automation",
    categoryLabel: "Real Estate CRM",
    pillar: "automation",
    solutionType: "real-estate-crm",
    summary:
      "Speed-to-lead routing, listing sync, and nurture cadences for Follow Up Boss, kvCORE, LionDesk, and BoomTown.",
    platforms: ["Follow Up Boss", "kvCORE", "LionDesk", "BoomTown"],
    automations: ["Lead Assignment", "Listing Sync", "Nurture Sequences"],
    accent: "#047857",
    visual: "real-estate",
    image: "/portfolio/real-estate-lead-automation.png",
  },
  {
    id: "construction-project-workflow",
    title: "Construction Project Workflow",
    categoryLabel: "Construction CRM",
    pillar: "automation",
    solutionType: "construction-crm",
    summary:
      "Job intake, estimates, scheduling, and field updates connected through BuildOps, Buildertrend, Procore, and Jobber.",
    platforms: ["BuildOps", "Buildertrend", "Procore", "Jobber"],
    automations: ["Job Scheduling", "Estimate Sync", "Field Updates"],
    accent: "#065F46",
    visual: "construction",
    image: "/portfolio/construction-project-workflow.png",
  },
  {
    id: "legal-client-intake-automation",
    title: "Legal Client Intake Automation",
    categoryLabel: "Legal CRM",
    pillar: "automation",
    solutionType: "legal-crm",
    summary:
      "Intake forms, matter creation, document workflows, and reminders automated across Clio, MyCase, and Filevine.",
    platforms: ["Clio", "MyCase", "PracticePanther", "Filevine"],
    automations: ["Client Intake", "DocuSign", "Matter Creation"],
    accent: "#111827",
    visual: "legal",
    image: "/portfolio/project-management-automation.png",
  },
  {
    id: "healthcare-appointment-automation",
    title: "Healthcare Appointment Automation",
    categoryLabel: "Healthcare CRM",
    pillar: "automation",
    solutionType: "healthcare-crm",
    summary:
      "Patient reminders, scheduling sync, and CRM updates for Salesforce Health Cloud, Athenahealth, DrChrono, and Kareo.",
    platforms: ["Salesforce Health Cloud", "Athenahealth", "DrChrono", "Kareo"],
    automations: ["Appointment Reminders", "Patient Sync", "Follow-ups"],
    accent: "#0F766E",
    visual: "healthcare",
    image: "/portfolio/healthcare-appointment-automation.png",
  },
  {
    id: "property-management-workflow",
    title: "Property Management Workflow",
    categoryLabel: "Property Management",
    pillar: "automation",
    solutionType: "property-management",
    summary:
      "Tenant requests, leasing updates, and owner reporting automated across Buildium, AppFolio, DoorLoop, and Yardi.",
    platforms: ["Buildium", "AppFolio", "DoorLoop", "Yardi"],
    automations: ["Work Orders", "Lease Alerts", "Owner Reports"],
    accent: "#F59E0B",
    visual: "property",
    image: "/portfolio/property-management-workflow.png",
  },
  {
    id: "student-enrollment-automation",
    title: "Student Enrollment Automation",
    categoryLabel: "LMS",
    pillar: "automation",
    solutionType: "lms",
    summary:
      "Enrollment, course access, and progress notifications connected through Moodle, Canvas, Thinkific, and Teachable.",
    platforms: ["Moodle", "Canvas LMS", "Thinkific", "Teachable"],
    automations: ["Enrollment Sync", "Access Provisioning", "Progress Alerts"],
    accent: "#D97706",
    visual: "lms",
    image: "/portfolio/student-enrollment-automation.png",
  },
  {
    id: "appointment-booking-automation",
    title: "Appointment Booking Automation",
    categoryLabel: "Appointment Booking",
    pillar: "automation",
    solutionType: "appointment-booking",
    summary:
      "Booking confirmations, CRM logging, and reminder flows for Calendly, Acuity, SimplyBook.me, and Setmore.",
    platforms: ["Calendly", "Acuity Scheduling", "SimplyBook.me", "Setmore"],
    automations: ["Confirmations", "CRM Logging", "Reminders"],
    accent: "#10B981",
    visual: "booking",
    image: "/portfolio/appointment-booking-automation.png",
  },
  {
    id: "employee-time-tracking-automation",
    title: "Employee Time Tracking Automation",
    categoryLabel: "Time Tracking",
    pillar: "automation",
    solutionType: "time-tracking",
    summary:
      "Timesheets, approvals, and payroll handoffs automated with Clockify, Hubstaff, Harvest, and Toggl Track.",
    platforms: ["Clockify", "Hubstaff", "Harvest", "Toggl Track"],
    automations: ["Timesheet Sync", "Approvals", "Payroll Export"],
    accent: "#059669",
    visual: "time",
    image: "/portfolio/employee-time-tracking-automation.png",
  },
  {
    id: "project-management-automation",
    title: "Project Management Automation",
    categoryLabel: "Project Management",
    pillar: "automation",
    solutionType: "project-management",
    summary:
      "Task routing, status sync, and stakeholder updates across ClickUp, Monday.com, Asana, Notion, and Jira.",
    platforms: ["ClickUp", "Monday.com", "Asana", "Jira"],
    automations: ["Task Routing", "Status Sync", "Notifications"],
    accent: "#047857",
    visual: "project",
    image: "/portfolio/project-management-automation.png",
  },
  {
    id: "ai-customer-support-automation",
    title: "AI Customer Support Automation",
    categoryLabel: "AI Automation",
    pillar: "automation",
    solutionType: "ai-automation",
    summary:
      "AI triage, knowledge-base answers, and WhatsApp/email assist powered by OpenAI, Claude, and workflow orchestration.",
    platforms: ["OpenAI", "Claude", "ChatGPT", "WhatsApp"],
    automations: ["AI Workflow", "Email Automation", "Knowledge Base AI"],
    accent: "#111827",
    visual: "ai",
    image: "/portfolio/ai-customer-support-automation.png",
  },
  {
    id: "enterprise-3cx-deployment",
    title: "Enterprise 3CX Deployment",
    categoryLabel: "3CX Phone Systems",
    pillar: "phone",
    solutionType: "3cx",
    summary:
      "Hosted, on-premise, and cloud 3CX deployments with Call Flow Designer, multi-site extensions, and CRM-linked call handling.",
    platforms: ["3CX", "3CX Hosted", "Call Flow Designer"],
    automations: ["3CX Cloud", "3CX On-Premise", "Call Flow Designer"],
    accent: "#F59E0B",
    visual: "phone-3cx",
    image: "/portfolio/enterprise-3cx-deployment.png",
  },
  {
    id: "freepbx-migration",
    title: "FreePBX Migration",
    categoryLabel: "FreePBX",
    pillar: "phone",
    solutionType: "freepbx",
    summary:
      "Clean FreePBX deployments and migrations with extension planning, dial-plan routing, and reliable inbound/outbound call flows.",
    platforms: ["FreePBX", "Asterisk", "SIP Trunks"],
    automations: ["PBX Migration", "Call Routing", "Extensions"],
    accent: "#D97706",
    visual: "phone",
    image: "/portfolio/freepbx-migration.png",
  },
  {
    id: "asterisk-communication-server",
    title: "Asterisk Communication Server",
    categoryLabel: "Asterisk PBX",
    pillar: "phone",
    solutionType: "asterisk",
    summary:
      "Custom Asterisk PBX builds for VoIP infrastructure, recording, conferences, and tailored telephony logic.",
    platforms: ["Asterisk", "FreePBX", "VoIP"],
    automations: ["Custom PBX", "Call Recording", "Conference Bridge"],
    accent: "#111827",
    visual: "phone",
    image: "/portfolio/asterisk-communication-server.png",
  },
  {
    id: "cloud-pbx-infrastructure",
    title: "Cloud PBX Infrastructure",
    categoryLabel: "Cloud PBX",
    pillar: "phone",
    solutionType: "cloud-pbx",
    summary:
      "Hosted PBX for remote teams with virtual extensions, multi-office connectivity, and centralized administration.",
    platforms: ["3CX", "Yeastar", "Cloud PBX"],
    automations: ["Hosted PBX", "Remote Workforce", "Virtual Extensions"],
    accent: "#F59E0B",
    visual: "phone-cloud",
    image: "/portfolio/cloud-pbx-infrastructure.png",
  },
  {
    id: "sip-trunk-integration",
    title: "SIP Trunk Integration",
    categoryLabel: "SIP Trunks",
    pillar: "phone",
    solutionType: "sip-trunks",
    summary:
      "Carrier-grade SIP trunking with failover routing across Twilio, Telnyx, Flowroute, Bandwidth, and VoIP.ms.",
    platforms: ["Twilio", "Telnyx", "Flowroute", "Bandwidth", "VoIP.ms"],
    automations: ["SIP Failover", "Number Porting", "Trunk Monitoring"],
    accent: "#10B981",
    visual: "phone-sip",
    image: "/portfolio/sip-trunk-integration.png",
  },
  {
    id: "ivr-call-routing",
    title: "IVR Call Routing",
    categoryLabel: "IVR Systems",
    pillar: "phone",
    solutionType: "ivr",
    summary:
      "Multi-level IVR and auto attendants that route callers intelligently to the right queue, extension, or department.",
    platforms: ["3CX", "FreePBX", "Asterisk"],
    automations: ["Multi-Level IVR", "Auto Attendant", "Smart Call Routing"],
    accent: "#059669",
    visual: "phone-ivr",
    image: "/portfolio/ivr-call-routing.png",
  },
  {
    id: "call-queue-systems",
    title: "Call Queue Systems",
    categoryLabel: "Call Queue Systems",
    pillar: "phone",
    solutionType: "call-queue",
    summary:
      "Sales and support queues with priority routing, wait messaging, and queue analytics for measurable service levels.",
    platforms: ["3CX", "FreePBX", "Yeastar"],
    automations: ["Sales Queue", "Support Queue", "Priority Routing", "Queue Analytics"],
    accent: "#047857",
    visual: "phone-ivr",
    image: "/portfolio/call-queue-systems.png",
  },
  {
    id: "crm-phone-integration",
    title: "CRM Phone Integration",
    categoryLabel: "CRM Telephony Integration",
    pillar: "phone",
    solutionType: "crm-integration",
    summary:
      "Click-to-call, screen pops, and call logging integrated with HubSpot, Salesforce, Zoho CRM, Pipedrive, and Dynamics.",
    platforms: ["HubSpot", "Salesforce", "Zoho CRM", "Pipedrive", "Microsoft Dynamics"],
    automations: ["Click-to-Call", "Screen Pops", "Call Logging"],
    accent: "#0F766E",
    visual: "phone-crm",
    image: "/portfolio/crm-phone-integration.png",
  },
  {
    id: "microsoft-teams-phone-deployment",
    title: "Microsoft Teams Phone Deployment",
    categoryLabel: "Microsoft Teams Phone",
    pillar: "phone",
    solutionType: "microsoft-teams",
    summary:
      "Teams Calling with Direct Routing or Operator Connect for enterprise voice across meeting and phone workflows.",
    platforms: ["Microsoft Teams", "Direct Routing", "Operator Connect"],
    automations: ["Teams Voice", "Teams Calling", "Direct Routing"],
    accent: "#111827",
    visual: "phone-teams",
    image: "/portfolio/microsoft-teams-phone-deployment.png",
  },
  {
    id: "yeastar-business-phone-system",
    title: "Yeastar Business Phone System",
    categoryLabel: "Yeastar Phone Systems",
    pillar: "phone",
    solutionType: "yeastar",
    summary:
      "Yeastar P-Series cloud and hybrid PBX deployments for growing businesses that need flexible branch telephony.",
    platforms: ["Yeastar", "Yeastar P-Series", "Cloud PBX"],
    automations: ["P-Series", "Hybrid PBX", "Cloud PBX"],
    accent: "#D97706",
    visual: "phone-yeastar",
    image: "/portfolio/yeastar-business-phone-system.png",
  },
  {
    id: "multi-site-voip-infrastructure",
    title: "Multi-Site VoIP Infrastructure",
    categoryLabel: "VoIP Infrastructure",
    pillar: "phone",
    solutionType: "voip-infrastructure",
    summary:
      "End-to-end VoIP with softphones, IP phones, voicemail, ring groups, and call recording across locations.",
    platforms: ["3CX", "Yeastar", "Softphones", "IP Phones"],
    automations: ["Ring Groups", "Voicemail", "Call Recording"],
    accent: "#065F46",
    visual: "phone-voip",
    image: "/portfolio/multi-site-voip-infrastructure.png",
  },
  {
    id: "vicidial-sales-infrastructure",
    title: "Vicidial Sales Infrastructure",
    categoryLabel: "Vicidial",
    pillar: "outbound",
    solutionType: "vicidial",
    summary:
      "Production Vicidial installs and clusters with campaign setup, agent groups, and real-time reporting for high-volume outbound.",
    platforms: ["Vicidial", "Asterisk", "SIP"],
    automations: ["Vicidial Installation", "Vicidial Cluster", "Vicidial Reporting"],
    accent: "#111827",
    visual: "outbound-vicidial",
    image: "/portfolio/vicidial-sales-infrastructure.png",
  },
  {
    id: "goautodial-outbound-stack",
    title: "Outbound Sales Infrastructure",
    categoryLabel: "GoAutoDial",
    pillar: "outbound",
    solutionType: "goautodial",
    summary:
      "GoAutoDial deployment with campaign configuration, agent setup, and dialing workflows tuned for inside sales teams.",
    platforms: ["GoAutoDial", "Asterisk", "SIP"],
    automations: ["GoAutoDial Deployment", "Campaign Setup", "Agent Configuration"],
    accent: "#047857",
    visual: "outbound",
    image: "/portfolio/outbound-sales-infrastructure.png",
  },
  {
    id: "predictive-dialing-platform",
    title: "Predictive Dialing Platform",
    categoryLabel: "Predictive Dialers",
    pillar: "outbound",
    solutionType: "predictive-dialers",
    summary:
      "Predictive dialing with lead pacing, abandonment controls, and campaign routing designed for scale and efficiency.",
    platforms: ["Vicidial", "Predictive Dialer", "SIP"],
    automations: ["Predictive Calling", "Lead Optimization", "Campaign Routing"],
    accent: "#10B981",
    visual: "outbound-predictive",
    image: "/portfolio/predictive-dialing-platform.png",
  },
  {
    id: "progressive-campaign-engine",
    title: "Outbound Campaign Engine",
    categoryLabel: "Progressive Dialers",
    pillar: "outbound",
    solutionType: "progressive-dialers",
    summary:
      "Progressive campaigns for outbound sales with controlled pacing and automated follow-up handoffs.",
    platforms: ["Vicidial", "GoAutoDial", "SIP"],
    automations: ["Progressive Campaign", "Outbound Sales", "Follow-Up Automation"],
    accent: "#059669",
    visual: "outbound-predictive",
    image: "/portfolio/enterprise-call-center-stack.png",
  },
  {
    id: "preview-dialer-quality-stack",
    title: "Enterprise Call Center Stack",
    categoryLabel: "Preview Dialers",
    pillar: "outbound",
    solutionType: "preview-dialers",
    summary:
      "Preview dialing for quality-first outbound teams—agents review lead context before each connect.",
    platforms: ["Vicidial", "FreeSWITCH", "SIP"],
    automations: ["Lead Preview", "Quality Control", "Agent Review"],
    accent: "#065F46",
    visual: "outbound",
    image: "/portfolio/predictive-dialing-platform.png",
  },
  {
    id: "power-dialer-deployment",
    title: "Power Dialer Deployment",
    categoryLabel: "Power Dialers",
    pillar: "outbound",
    solutionType: "power-dialers",
    summary:
      "Power dialer setups for sales teams and outbound marketing with fast connect rates and simple agent UX.",
    platforms: ["GoAutoDial", "3CX", "SIP"],
    automations: ["Sales Teams", "Inside Sales", "Outbound Marketing"],
    accent: "#F59E0B",
    visual: "outbound-predictive",
    image: "/portfolio/power-dialer-deployment.png",
  },
  {
    id: "ai-voice-receptionist",
    title: "AI Voice Receptionist",
    categoryLabel: "AI Voice Agents",
    pillar: "outbound",
    solutionType: "ai-voice",
    summary:
      "AI voice agents for call handling and receptionist workflows using OpenAI voice models and telephony orchestration.",
    platforms: ["OpenAI", "AI Voice", "Twilio", "Telnyx"],
    automations: ["OpenAI Voice", "Voice AI Receptionist", "AI Call Handling"],
    accent: "#111827",
    visual: "outbound-ai",
    image: "/portfolio/ai-voice-receptionist.png",
  },
  {
    id: "voice-broadcasting-platform",
    title: "Voice Broadcasting Platform",
    categoryLabel: "Voice Broadcasting",
    pillar: "outbound",
    solutionType: "voice-broadcasting",
    summary:
      "Bulk voice campaigns for reminders, alerts, and high-reach outbound notifications with delivery tracking.",
    platforms: ["Twilio", "Telnyx", "Vicidial"],
    automations: ["Bulk Voice Campaigns", "Emergency Notifications", "Appointment Reminders"],
    accent: "#D97706",
    visual: "outbound-broadcast",
    image: "/portfolio/voice-broadcasting-platform.png",
  },
  {
    id: "campaign-analytics-dashboard",
    title: "Campaign Analytics Dashboard",
    categoryLabel: "Campaign Management",
    pillar: "outbound",
    solutionType: "campaign-management",
    summary:
      "Campaign design, lead distribution, and analytics in one operating layer for outbound program managers.",
    platforms: ["Vicidial", "GoAutoDial", "Asterisk"],
    automations: ["Campaign Design", "Campaign Analytics", "Lead Distribution"],
    accent: "#047857",
    visual: "outbound-analytics",
    image: "/portfolio/campaign-analytics-dashboard.png",
  },
  {
    id: "speech-analytics-system",
    title: "Speech Analytics System",
    categoryLabel: "Call Analytics",
    pillar: "outbound",
    solutionType: "call-analytics",
    summary:
      "Call reporting, speech analytics, and performance dashboards for quality and revenue insight.",
    platforms: ["OpenAI", "Vicidial", "Twilio"],
    automations: ["Call Reporting", "Speech Analytics", "Quality Monitoring"],
    accent: "#0F766E",
    visual: "outbound-analytics",
    image: "/portfolio/speech-analytics-system.png",
  },
  {
    id: "agent-performance-dashboard",
    title: "Agent Performance Dashboard",
    categoryLabel: "Workforce Management",
    pillar: "outbound",
    solutionType: "workforce-management",
    summary:
      "Workforce visibility with agent performance, QA scoring, live monitoring, and supervisor dashboards.",
    platforms: ["Vicidial", "FreeSWITCH", "3CX"],
    automations: ["Agent Performance", "Quality Assurance", "Call Monitoring"],
    accent: "#065F46",
    visual: "outbound-workforce",
    image: "/portfolio/agent-performance-dashboard.png",
  },
  {
    id: "lead-distribution-automation",
    title: "Lead Distribution Automation",
    categoryLabel: "Lead Distribution",
    pillar: "outbound",
    solutionType: "lead-distribution",
    summary:
      "CRM-connected lead routing with round robin, skill-based assignment, and smart distribution rules.",
    platforms: ["Vicidial", "Twilio", "SIP"],
    automations: ["CRM Distribution", "Round Robin", "Skill-Based Routing"],
    accent: "#10B981",
    visual: "outbound-leads",
    image: "/portfolio/lead-distribution-automation.png",
  },
];

export const FEATURED_PORTFOLIO = PORTFOLIO.filter((p) =>
  [
    "business-workflow-automation",
    "excel-financial-dashboard",
    "google-sheets-ops-automation",
    "airtable-pipeline-system",
    "sales-pipeline-automation",
    "ai-customer-support-automation",
    "enterprise-3cx-deployment",
    "vicidial-sales-infrastructure",
  ].includes(p.id)
);

export const SITE_STATS = [
  { value: 128, suffix: "+", label: "Projects completed" },
  { value: 98, suffix: "%", label: "Client satisfaction" },
  { value: 4.9, suffix: "/5", label: "Average review score", decimals: 1 },
] as const;

export const FAQ_ITEMS = [
  {
    question: "How quickly can AnnyFlow start a new engagement?",
    answer:
      "Most discovery consultations are scheduled within a few business days. Implementation timelines depend on scope, but lean automation and spreadsheet projects often launch in weeks—not months.",
  },
  {
    question: "Do you work with existing tools or replace everything?",
    answer:
      "We prefer to integrate what already works. Whether you run HubSpot, Salesforce, Excel, Google Sheets, 3CX, or Vicidial, we connect systems cleanly before recommending replacements.",
  },
  {
    question: "What does spreadsheet automation cover?",
    answer:
      "Excel (formulas, VBA, Power Query), Google Sheets (Apps Script, dashboards), Airtable bases, reporting pipelines, and CRM-to-sheet sync—so teams stop copying data by hand.",
  },
  {
    question: "Can you support both cloud and on-premise phone systems?",
    answer:
      "Yes. We design and deploy cloud PBX, on-premise Asterisk/FreePBX environments, and hybrid setups with SIP trunks, IVR, and CRM connectivity.",
  },
  {
    question: "Is outbound calling infrastructure compliant and monitorable?",
    answer:
      "We build dialer stacks with call monitoring, recording where applicable, reporting, and operational controls so your teams stay accountable and measurable.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Daniel K.",
    role: "Operations Manager",
    industry: "Professional services",
    quote:
      "AnnyFlow replaced our patchwork of spreadsheets and manual handoffs with a clean automation stack. We finally know where every lead and ticket sits.",
  },
  {
    name: "Maya R.",
    role: "Head of Sales Ops",
    industry: "Outbound sales team",
    quote:
      "Our dialer and CRM finally talk to each other. Agents spend time selling instead of hunting for context between tools.",
  },
  {
    name: "James O.",
    role: "IT Lead",
    industry: "Multi-site business",
    quote:
      "The phone system rollout was calm and structured—queues, IVR, and CRM sync worked on day one without disrupting the team.",
  },
  {
    name: "Priya S.",
    role: "Finance Controller",
    industry: "Growing SaaS company",
    quote:
      "Our Excel and Sheets reporting used to take days. AnnyFlow automated the pipelines—dashboards refresh themselves and leadership trusts the numbers.",
  },
];
