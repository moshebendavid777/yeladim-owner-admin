import React from 'react';
import {createRoot} from 'react-dom/client';
import {
  Activity,
  AlertTriangle,
  Baby,
  Bell,
  Building2,
  CalendarDays,
  CheckCircle2,
  Cloud,
  CreditCard,
  Database,
  DoorOpen,
  FileText,
  GraduationCap,
  KeyRound,
  LifeBuoy,
  LockKeyhole,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  RefreshCw,
  Search,
  Settings,
  ShieldAlert,
  ShieldCheck,
  UserCog,
  UserRoundCheck,
  Users,
  Webhook,
} from 'lucide-react';
import './styles.css';

const leadStorageKey = 'yeladim_sales_leads';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4100/v1';

const plans = {
  starter: {label: 'Starter', children: 40, storage: '50 GB', price: 129},
  growth: {label: 'Growth', children: 150, storage: '250 GB', price: 349},
  premium: {label: 'Premium', children: 500, storage: '1 TB', price: 899},
};

const initialCenters = [
  {
    id: 1,
    public_id: 'CTR-YELADIM',
    name: 'Yeladim Learning Center',
    billing_email: 'billing@yeladim.test',
    membership_level: 'growth',
    license_status: 'active',
    status: 'active',
    usage: {children: 86, rooms: 7, users: 142, storage_gb: 82},
    monthly_revenue: 349,
    risk: 'low',
    next_invoice: 'May 15, 2026',
    stripe_customer: 'cus_yeladim_demo',
    owner: 'Sarah Ben David',
    mfa_enforced: true,
    backups: 'healthy',
    infrastructure: {
      push: {provider: 'Expo', project_id: 'yeladim-prod', status: 'connected'},
      s3: {bucket: 'yeladim-centers-prod', prefix: 'CTR-YELADIM/', region: 'us-east-1', status: 'connected'},
      postgres: {host: 'db.yeladim.app', database: 'center_yeladim', schema: 'ctr_yeladim', status: 'connected'},
    },
  },
  {
    id: 2,
    public_id: 'CTR-GARDEN',
    name: 'Garden Room Preschool',
    billing_email: 'owner@garden.test',
    membership_level: 'starter',
    license_status: 'trial',
    status: 'trial',
    usage: {children: 24, rooms: 3, users: 39, storage_gb: 12},
    monthly_revenue: 0,
    risk: 'medium',
    next_invoice: 'Trial ends May 8, 2026',
    stripe_customer: 'Not connected',
    owner: 'Miriam Klein',
    mfa_enforced: false,
    backups: 'healthy',
    infrastructure: {
      push: {provider: 'Expo', project_id: 'garden-trial', status: 'needs setup'},
      s3: {bucket: 'yeladim-centers-prod', prefix: 'CTR-GARDEN/', region: 'us-east-1', status: 'connected'},
      postgres: {host: 'db.yeladim.app', database: 'center_garden', schema: 'ctr_garden', status: 'provisioning'},
    },
  },
  {
    id: 3,
    public_id: 'CTR-NORTH',
    name: 'North Star Daycare',
    billing_email: 'admin@northstar.test',
    membership_level: 'premium',
    license_status: 'past_due',
    status: 'attention',
    usage: {children: 162, rooms: 14, users: 256, storage_gb: 412},
    monthly_revenue: 899,
    risk: 'high',
    next_invoice: 'Payment failed Apr 25, 2026',
    stripe_customer: 'cus_north_demo',
    owner: 'Daniel Roth',
    mfa_enforced: true,
    backups: 'review',
    infrastructure: {
      push: {provider: 'Firebase FCM + APNs', project_id: 'north-star-live', status: 'connected'},
      s3: {bucket: 'yeladim-centers-prod', prefix: 'CTR-NORTH/', region: 'us-east-1', status: 'review'},
      postgres: {host: 'db.yeladim.app', database: 'center_north', schema: 'ctr_north', status: 'connected'},
    },
  },
];

const initialAuditEvents = [
  {
    id: 1,
    actor: 'Owner',
    action: 'License changed',
    target: 'North Star Daycare',
    severity: 'high',
    time: 'Today, 4:42 PM',
  },
  {
    id: 2,
    actor: 'Stripe webhook',
    action: 'Invoice paid',
    target: 'Yeladim Learning Center',
    severity: 'low',
    time: 'Today, 11:18 AM',
  },
  {
    id: 3,
    actor: 'Owner',
    action: 'Center created',
    target: 'Garden Room Preschool',
    severity: 'medium',
    time: 'Yesterday, 2:10 PM',
  },
  {
    id: 4,
    actor: 'Security',
    action: 'Trusted browser login',
    target: 'Owner Admin',
    severity: 'low',
    time: 'Yesterday, 8:06 AM',
  },
];

const initialLeads = [
  {
    id: 'lead-demo-1',
    requestType: 'Demo',
    fullName: 'Miriam Klein',
    email: 'director@gardenroom.test',
    phone: '(555) 401-1290',
    centerName: 'Garden Room Preschool',
    role: 'Director',
    centers: '1',
    message: 'We need better daily reports and parent communication before September enrollment.',
    source: 'Public website',
    status: 'New',
    createdAt: 'Today, 5:10 PM',
  },
  {
    id: 'lead-demo-2',
    requestType: 'Pricing',
    fullName: 'Daniel Roth',
    email: 'ops@northstar.test',
    phone: '(555) 802-7712',
    centerName: 'North Star Daycare',
    role: 'Operations Director',
    centers: '6-20',
    message: 'Looking for multi-center pricing and onboarding timeline.',
    source: 'Public website',
    status: 'Contacted',
    createdAt: 'Yesterday, 2:32 PM',
  },
];

const initialInviteCodes = [
  {
    id: 'invite-demo-1',
    center_id: 'center_demo',
    center_name: 'Yeladim Learning Center',
    label: 'Permanent parent signup',
    code: 'YL-PARENT-DEMO',
    type: 'permanent',
    role: 'parent',
    expires_at: null,
    max_uses: null,
    used_count: 0,
    disabled_at: null,
  },
];

const centerTabs = [
  {id: 'overview', label: 'Overview', icon: Activity},
  {id: 'rooms', label: 'Rooms', icon: DoorOpen},
  {id: 'teachers', label: 'Teachers', icon: GraduationCap},
  {id: 'parents', label: 'Parents', icon: UserRoundCheck},
  {id: 'children', label: 'Children', icon: Baby},
  {id: 'activities', label: 'Activities', icon: CalendarDays},
  {id: 'messages', label: 'Messages', icon: MessageSquare},
  {id: 'settings', label: 'Settings', icon: Settings},
];

const tenantRecords = {
  1: {
    rooms: [
      ['Infants', '12 children', '2 teachers', 'Open', 'Room A'],
      ['Toddlers', '14 children', '3 teachers', 'Open', 'Room B'],
      ['Pre-K Aleph', '18 children', '3 teachers', 'Open', 'Room C'],
      ['Pre-K Bet', '16 children', '2 teachers', 'Open', 'Room D'],
    ],
    teachers: [
      ['Rachel Cohen', 'Pre-K Aleph', 'Teacher, Parent', 'Active', 'Last login today'],
      ['Leah Stein', 'Toddlers', 'Teacher', 'Active', 'Last login yesterday'],
      ['Maya Levi', 'Infants', 'Teacher', 'Invited', 'Invite sent Apr 26'],
    ],
    parents: [
      ['Ari Gold', 'Noah Gold', 'parent', 'Active', 'Emergency contact complete'],
      ['Talia Mizrahi', 'Mia Mizrahi', 'parent, teacher', 'Active', 'Authorized pickups 3'],
      ['David Perez', 'Eli Perez', 'parent', 'Invited', 'Invite sent today'],
    ],
    children: [
      ['Noah Gold', 'Pre-K Aleph', 'Ari Gold', 'Active', 'Allergies on file'],
      ['Mia Mizrahi', 'Toddlers', 'Talia Mizrahi', 'Active', 'No restrictions'],
      ['Eli Perez', 'Infants', 'David Perez', 'Active', 'Medication note'],
    ],
    activities: [
      ['Today 9:15 AM', 'Pre-K Aleph', 'Painting', 'Noah Gold + room', '2 photos'],
      ['Today 11:45 AM', 'Toddlers', 'Lunch', 'Mia ate most of lunch', 'Parent notified'],
      ['Yesterday 3:05 PM', 'Infants', 'Nap', 'Eli slept 58 minutes', 'Logged by Maya'],
    ],
    messages: [
      ['Today 2:04 PM', 'Rachel Cohen', 'Ari Gold', 'Pre-K Aleph', 'Open'],
      ['Today 9:42 AM', 'Office', 'Talia Mizrahi', 'Billing question', 'Closed'],
      ['Yesterday 5:18 PM', 'Leah Stein', 'David Perez', 'Infants', 'Open'],
    ],
  },
  2: {
    rooms: [
      ['Blue Room', '8 children', '1 teacher', 'Open', 'Room 1'],
      ['Green Room', '10 children', '2 teachers', 'Open', 'Room 2'],
      ['Yellow Room', '6 children', '1 teacher', 'Setup', 'Room 3'],
    ],
    teachers: [
      ['Esther Blum', 'Blue Room', 'Teacher', 'Active', 'Last login today'],
      ['Rina Weiss', 'Green Room', 'Teacher', 'Active', 'Last login Apr 27'],
    ],
    parents: [
      ['Jon Miller', 'Sophie Miller', 'parent', 'Active', 'Emergency contact missing'],
      ['Naomi Katz', 'Lior Katz', 'parent', 'Invited', 'Invite sent Apr 26'],
    ],
    children: [
      ['Sophie Miller', 'Blue Room', 'Jon Miller', 'Active', 'No restrictions'],
      ['Lior Katz', 'Green Room', 'Naomi Katz', 'Pending', 'Awaiting parent account'],
    ],
    activities: [
      ['Today 10:10 AM', 'Blue Room', 'Reading', 'Sophie listened to story time', 'No media'],
      ['Yesterday 12:20 PM', 'Green Room', 'Snack', 'Lior ate all of snack', 'Parent notified'],
    ],
    messages: [
      ['Today 8:31 AM', 'Esther Blum', 'Jon Miller', 'Blue Room', 'Open'],
      ['Apr 27 4:22 PM', 'Admin', 'Naomi Katz', 'Invitation help', 'Closed'],
    ],
  },
  3: {
    rooms: [
      ['Infant North', '18 children', '4 teachers', 'Open', 'Wing 1'],
      ['Toddler North', '24 children', '4 teachers', 'Open', 'Wing 2'],
      ['Preschool North', '32 children', '5 teachers', 'Open', 'Wing 3'],
      ['Aftercare', '28 children', '3 teachers', 'Open', 'Gym'],
    ],
    teachers: [
      ['Hannah Silver', 'Preschool North', 'Teacher', 'Active', 'Last login today'],
      ['Rivka Green', 'Infant North', 'Teacher, Admin', 'Active', 'Last login today'],
      ['Shoshana Adler', 'Aftercare', 'Teacher', 'Locked', 'MFA required'],
    ],
    parents: [
      ['Michael Klein', 'Ava Klein', 'parent', 'Active', 'Authorized pickups 2'],
      ['Sara Bloom', 'Ben Bloom', 'parent', 'Active', 'Emergency contact complete'],
      ['Ethan Stone', 'Lily Stone', 'parent', 'Active', 'Payment past due'],
    ],
    children: [
      ['Ava Klein', 'Preschool North', 'Michael Klein', 'Active', 'Photo release yes'],
      ['Ben Bloom', 'Infant North', 'Sara Bloom', 'Active', 'Medication note'],
      ['Lily Stone', 'Aftercare', 'Ethan Stone', 'Active', 'Billing hold warning'],
    ],
    activities: [
      ['Today 1:20 PM', 'Aftercare', 'Playground', 'Lily played outside', '1 photo'],
      ['Today 12:05 PM', 'Infant North', 'Lunch', 'Ben ate some of lunch', 'Parent notified'],
      ['Yesterday 10:15 AM', 'Preschool North', 'Walk', 'Ava joined neighborhood walk', '4 photos'],
    ],
    messages: [
      ['Today 3:12 PM', 'Hannah Silver', 'Michael Klein', 'Preschool North', 'Open'],
      ['Today 1:58 PM', 'Billing', 'Ethan Stone', 'Payment failed', 'Open'],
      ['Yesterday 6:03 PM', 'Rivka Green', 'Sara Bloom', 'Infant North', 'Closed'],
    ],
  },
};

const navItems = [
  {id: 'overview', label: 'Overview', icon: Activity},
  {id: 'leads', label: 'Leads', icon: Mail},
  {id: 'centers', label: 'Centers', icon: Building2},
  {id: 'invites', label: 'Invite Codes', icon: LockKeyhole},
  {id: 'billing', label: 'Billing', icon: CreditCard},
  {id: 'licenses', label: 'Licenses', icon: KeyRound},
  {id: 'audit', label: 'Audit Logs', icon: FileText},
  {id: 'security', label: 'Security', icon: ShieldCheck},
  {id: 'support', label: 'Support', icon: LifeBuoy},
  {id: 'settings', label: 'Settings', icon: Settings},
];

const pageTitles = {
  overview: ['Platform overview', 'Centers, licenses, billing, and risk'],
  leads: ['Sales leads', 'Demo requests, pricing inquiries, and follow-up pipeline'],
  centers: ['Centers', 'Create tenants and manage center profiles'],
  invites: ['Invite codes', 'Control who can create an account for each center'],
  billing: ['Billing', 'Payments, subscriptions, invoices, and delinquency'],
  licenses: ['Licenses', 'Plan limits and access controls for every center'],
  audit: ['Audit logs', 'Owner actions, support access, and security events'],
  security: ['Security', 'Tenant isolation, data protection, and response'],
  support: ['Support access', 'Assist centers without breaking tenant boundaries'],
  settings: ['Owner settings', 'API credentials, webhooks, and admin preferences'],
};

const statusClasses = {
  active: 'good',
  trial: 'trial',
  past_due: 'warn',
  suspended: 'danger',
};

const riskClasses = {
  low: 'good',
  medium: 'trial',
  high: 'danger',
};

const formatCurrency = value =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

function buildPublicId(name) {
  const slug = String(name || 'CENTER')
    .replace(/[^a-z0-9]/gi, '')
    .slice(0, 7)
    .toUpperCase();
  return `CTR-${slug || 'CENTER'}`;
}

function StatCard({icon: Icon, label, value, hint}) {
  return (
    <section className="stat-card">
      <div className="stat-icon">
        <Icon size={22} />
      </div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        <span>{hint}</span>
      </div>
    </section>
  );
}

function Pill({value, tone}) {
  return <span className={`status ${tone}`}>{value}</span>;
}

function DataTable({headers, rows}) {
  return (
    <div className="table data-table">
      <div className="table-row table-head">
        {headers.map(header => (
          <span key={header}>{header}</span>
        ))}
      </div>
      {rows.map((row, index) => (
        <div className="table-row" key={`${row[0]}-${index}`}>
          {row.map((cell, cellIndex) =>
            cellIndex === 0 ? <strong key={cellIndex}>{cell}</strong> : <span key={cellIndex}>{cell}</span>,
          )}
        </div>
      ))}
    </div>
  );
}

function InfrastructureCard({icon: Icon, title, description, status, fields, onFieldChange}) {
  return (
    <article className="panel infra-card">
      <div className="infra-card-title">
        <div className="stat-icon">
          <Icon size={20} />
        </div>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <Pill value={status} tone={status === 'connected' ? 'good' : status === 'review' ? 'warn' : 'trial'} />
      </div>
      <div className="infra-fields">
        {fields.map(field => (
          <label key={field.key}>
            {field.label}
            <input
              value={field.value}
              onChange={event => onFieldChange(field.key, event.target.value)}
              placeholder={field.placeholder}
            />
          </label>
        ))}
      </div>
    </article>
  );
}

function CenterWorkspace({center, activeTab, setActiveTab, onUpdate}) {
  const records = tenantRecords[center.id] || {
    rooms: [],
    teachers: [],
    parents: [],
    children: [],
    activities: [],
    messages: [],
  };
  const infrastructure = center.infrastructure || {
    push: {provider: 'Expo', project_id: '', status: 'needs setup'},
    s3: {
      bucket: 'yeladim-centers-prod',
      prefix: `${center.public_id}/`,
      region: 'us-east-1',
      status: 'needs setup',
    },
    postgres: {
      host: '',
      database: '',
      schema: center.public_id.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      status: 'needs setup',
    },
  };

  const updateInfrastructure = (section, key, value) => {
    onUpdate(center.id, {
      infrastructure: {
        ...infrastructure,
        [section]: {
          ...infrastructure[section],
          [key]: value,
        },
      },
    });
  };

  const summary = [
    {icon: DoorOpen, label: 'Rooms', value: records.rooms.length, hint: 'inside this center'},
    {icon: GraduationCap, label: 'Teachers', value: records.teachers.length, hint: 'center staff'},
    {icon: Baby, label: 'Children', value: records.children.length, hint: 'enrolled profiles'},
    {icon: MessageSquare, label: 'Open chats', value: records.messages.filter(row => row[4] === 'Open').length, hint: 'needs response'},
  ];

  const tabContent = {
    overview: (
      <section className="center-overview-grid">
        <div className="panel">
          <h2>Center Data</h2>
          <p>Everything shown here is scoped to {center.name}.</p>
          <div className="mini-metrics">
            {summary.map(item => {
              const Icon = item.icon;
              return (
                <div className="mini-metric" key={item.label}>
                  <Icon size={18} />
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="panel">
          <h2>Recent Activity</h2>
          <DataTable
            headers={['Time', 'Room', 'Type', 'Child/Target', 'Status']}
            rows={records.activities.slice(0, 3)}
          />
        </div>
      </section>
    ),
    rooms: (
      <DataTable
        headers={['Room', 'Children', 'Teachers', 'Status', 'Location']}
        rows={records.rooms}
      />
    ),
    teachers: (
      <DataTable
        headers={['Teacher', 'Room', 'Roles', 'Status', 'Access']}
        rows={records.teachers}
      />
    ),
    parents: (
      <DataTable
        headers={['Parent', 'Children', 'Roles', 'Status', 'Profile']}
        rows={records.parents}
      />
    ),
    children: (
      <DataTable
        headers={['Child', 'Room', 'Parent', 'Status', 'Notes']}
        rows={records.children}
      />
    ),
    activities: (
      <DataTable
        headers={['Time', 'Room', 'Activity', 'Details', 'Media/Status']}
        rows={records.activities}
      />
    ),
    messages: (
      <section className="stack">
        <div className="support-note">
          <ShieldAlert size={18} />
          <span>Owner view should show conversation metadata by default. Full chat access should require a logged support session.</span>
        </div>
        <DataTable
          headers={['Time', 'From', 'To', 'Room/Topic', 'Status']}
          rows={records.messages}
        />
      </section>
    ),
    settings: (
      <section className="stack">
        <section className="infra-grid">
          <InfrastructureCard
            icon={Bell}
            title="Push Notifications"
            description="Expo, FCM, and APNs setup for this center."
            status={infrastructure.push.status}
            fields={[
              {key: 'provider', label: 'Provider', value: infrastructure.push.provider},
              {key: 'project_id', label: 'Project ID', value: infrastructure.push.project_id},
              {key: 'status', label: 'Status', value: infrastructure.push.status},
              {
                key: 'credential_key',
                label: 'Credential vault key',
                value: infrastructure.push.credential_key || `push/${center.public_id.toLowerCase()}`,
              },
            ]}
            onFieldChange={(key, value) => updateInfrastructure('push', key, value)}
          />
          <InfrastructureCard
            icon={Database}
            title="S3 Bucket"
            description="Media storage boundary for photos, videos, and documents."
            status={infrastructure.s3.status}
            fields={[
              {key: 'bucket', label: 'Bucket', value: infrastructure.s3.bucket},
              {key: 'prefix', label: 'Prefix', value: infrastructure.s3.prefix},
              {key: 'region', label: 'Region', value: infrastructure.s3.region},
              {key: 'status', label: 'Status', value: infrastructure.s3.status},
              {
                key: 'kms_key_alias',
                label: 'KMS key alias',
                value: infrastructure.s3.kms_key_alias || `alias/${center.public_id.toLowerCase()}-media`,
              },
            ]}
            onFieldChange={(key, value) => updateInfrastructure('s3', key, value)}
          />
          <InfrastructureCard
            icon={KeyRound}
            title="PostgreSQL"
            description="Tenant database connection and schema isolation."
            status={infrastructure.postgres.status}
            fields={[
              {key: 'host', label: 'Host', value: infrastructure.postgres.host},
              {key: 'database', label: 'Database', value: infrastructure.postgres.database},
              {key: 'schema', label: 'Schema', value: infrastructure.postgres.schema},
              {key: 'ssl_mode', label: 'SSL mode', value: infrastructure.postgres.ssl_mode || 'require'},
              {key: 'status', label: 'Status', value: infrastructure.postgres.status},
            ]}
            onFieldChange={(key, value) => updateInfrastructure('postgres', key, value)}
          />
        </section>
        <section className="center-overview-grid">
        <div className="panel">
          <h2>Center Profile</h2>
          <div className="detail-meta wider">
            <span>Center ID</span>
            <strong>{center.public_id}</strong>
            <span>Owner</span>
            <strong>{center.owner}</strong>
            <span>Billing email</span>
            <strong>{center.billing_email}</strong>
            <span>License</span>
            <strong>{center.license_status}</strong>
          </div>
        </div>
        <div className="panel">
          <h2>Security</h2>
          <div className="checklist">
            <div className="check-row">
              {center.mfa_enforced ? <CheckCircle2 size={20} /> : <ShieldAlert size={20} />}
              <span>MFA for center admins</span>
              <Pill value={center.mfa_enforced ? 'on' : 'needed'} tone={center.mfa_enforced ? 'good' : 'warn'} />
            </div>
            <div className="check-row">
              <Database size={20} />
              <span>S3 folder</span>
              <Pill value={`${center.public_id}/`} tone="trial" />
            </div>
            <div className="check-row">
              <ShieldCheck size={20} />
              <span>Backup health</span>
              <Pill value={center.backups} tone={center.backups === 'healthy' ? 'good' : 'warn'} />
            </div>
          </div>
        </div>
      </section>
      </section>
    ),
  };

  return (
    <section className="panel center-workspace">
      <div className="panel-header center-workspace-header">
        <div>
          <p className="eyebrow">Selected center</p>
          <h2>{center.name}</h2>
          <p>{center.public_id} · all data below is per center</p>
        </div>
        <Pill value={center.license_status} tone={statusClasses[center.license_status]} />
      </div>
      <div className="center-tabs">
        {centerTabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={activeTab === tab.id ? 'center-tab active' : 'center-tab'}
              onClick={() => setActiveTab(tab.id)}>
              <Icon size={17} />
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="center-tab-body">{tabContent[activeTab]}</div>
    </section>
  );
}

function LoginScreen({email, setEmail, passcode, setPasscode, apiUrl, setApiUrl, onSignIn}) {
  return (
    <main className="login-page">
      <section className="login-panel">
        <div className="brand-mark">
          <ShieldCheck size={34} />
        </div>
        <p className="eyebrow">Yeladim Owner Admin</p>
        <h1>Secure platform control</h1>
        <p className="login-copy">
          Manage centers, plans, license state, billing health, support access,
          and security events from a separate owner dashboard.
        </p>
        <form onSubmit={onSignIn} className="login-form">
          <label>
            Owner email
            <input value={email} onChange={event => setEmail(event.target.value)} />
          </label>
          <label>
            Passcode
            <input
              value={passcode}
              onChange={event => setPasscode(event.target.value)}
              type="password"
            />
          </label>
          <label>
            API URL
            <input value={apiUrl} onChange={event => setApiUrl(event.target.value)} />
          </label>
          <button type="submit">
            <LockKeyhole size={18} />
            Enter Owner Admin
          </button>
        </form>
      </section>
    </main>
  );
}

function CenterForm({draft, setDraft, onSave, onCancel}) {
  return (
    <section className="panel form-panel">
      <div className="panel-header compact">
        <div>
          <h2>{draft.id ? 'Edit Center' : 'Create Center'}</h2>
          <p>Center records become the tenant boundary for app data.</p>
        </div>
      </div>
      <div className="form-grid">
        <label>
          Center name
          <input
            value={draft.name}
            onChange={event => setDraft(current => ({...current, name: event.target.value}))}
          />
        </label>
        <label>
          Owner
          <input
            value={draft.owner}
            onChange={event => setDraft(current => ({...current, owner: event.target.value}))}
          />
        </label>
        <label>
          Billing email
          <input
            value={draft.billing_email}
            onChange={event =>
              setDraft(current => ({...current, billing_email: event.target.value}))
            }
          />
        </label>
        <label>
          Stripe customer
          <input
            value={draft.stripe_customer}
            onChange={event =>
              setDraft(current => ({...current, stripe_customer: event.target.value}))
            }
          />
        </label>
        <label>
          Plan
          <select
            value={draft.membership_level}
            onChange={event =>
              setDraft(current => ({...current, membership_level: event.target.value}))
            }>
            {Object.keys(plans).map(plan => (
              <option key={plan} value={plan}>{plans[plan].label}</option>
            ))}
          </select>
        </label>
        <label>
          License
          <select
            value={draft.license_status}
            onChange={event =>
              setDraft(current => ({...current, license_status: event.target.value}))
            }>
            <option value="trial">Trial</option>
            <option value="active">Active</option>
            <option value="past_due">Past Due</option>
            <option value="suspended">Suspended</option>
          </select>
        </label>
      </div>
      <div className="form-actions">
        <button className="secondary-button" onClick={onCancel}>Cancel</button>
        <button className="primary-button" onClick={onSave}>
          <CheckCircle2 size={18} />
          Save Center
        </button>
      </div>
    </section>
  );
}

function CenterList({centers, selectedCenter, query, setQuery, onSelect, onEdit}) {
  const filteredCenters = centers.filter(center =>
    [center.name, center.public_id, center.billing_email, center.owner]
      .join(' ')
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  return (
    <div className="panel centers-panel">
      <div className="panel-header">
        <div>
          <h2>Centers</h2>
          <p>Search tenants and manage plan or license status.</p>
        </div>
        <div className="search-box">
          <Search size={18} />
          <input
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search centers"
          />
        </div>
      </div>
      <div className="center-list">
        {filteredCenters.map(center => (
          <button
            key={center.id}
            className={`center-row ${center.id === selectedCenter.id ? 'selected' : ''}`}
            onClick={() => onSelect(center.id)}>
            <div className="center-avatar">{center.name.slice(0, 1)}</div>
            <div className="center-copy">
              <strong>{center.name}</strong>
              <span>{center.public_id} · {center.billing_email}</span>
            </div>
            <Pill value={center.license_status} tone={statusClasses[center.license_status]} />
            <span
              className="icon-action"
              onClick={event => {
                event.stopPropagation();
                onEdit(center);
              }}>
              <UserCog size={18} />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function CenterDetail({center, onUpdate}) {
  const plan = plans[center.membership_level];

  return (
    <aside className="panel detail-panel">
      <div className="detail-title-row">
        <div>
          <h2>{center.name}</h2>
          <p>{center.public_id}</p>
        </div>
        <Pill value={center.risk} tone={riskClasses[center.risk]} />
      </div>
      <div className="usage-grid">
        <div><strong>{center.usage.children}</strong><span>Children</span></div>
        <div><strong>{center.usage.rooms}</strong><span>Rooms</span></div>
        <div><strong>{center.usage.users}</strong><span>Users</span></div>
      </div>
      <div className="limit-card">
        <strong>{plan.label}</strong>
        <span>{center.usage.children}/{plan.children} children · {center.usage.storage_gb} GB of {plan.storage}</span>
      </div>
      <label>
        Membership
        <select
          value={center.membership_level}
          onChange={event => onUpdate(center.id, {membership_level: event.target.value})}>
          {Object.keys(plans).map(planKey => (
            <option key={planKey} value={planKey}>{plans[planKey].label}</option>
          ))}
        </select>
      </label>
      <label>
        License status
        <select
          value={center.license_status}
          onChange={event => onUpdate(center.id, {license_status: event.target.value})}>
          <option value="trial">Trial</option>
          <option value="active">Active</option>
          <option value="past_due">Past due</option>
          <option value="suspended">Suspended</option>
        </select>
      </label>
      <div className="detail-meta">
        <span>Owner</span>
        <strong>{center.owner}</strong>
        <span>Next invoice</span>
        <strong>{center.next_invoice}</strong>
        <span>Stripe</span>
        <strong>{center.stripe_customer}</strong>
      </div>
    </aside>
  );
}

function OverviewPage({centers, selectedCenter, query, setQuery, onSelect, onUpdate, onEdit}) {
  const attentionCenters = centers.filter(
    center => center.license_status !== 'active' || center.risk !== 'low',
  );

  return (
    <>
      <section className="stats-grid">
        <StatCard icon={Building2} label="Centers" value={centers.length} hint="total tenants" />
        <StatCard
          icon={Users}
          label="Children"
          value={centers.reduce((total, center) => total + center.usage.children, 0)}
          hint="across all centers"
        />
        <StatCard
          icon={CreditCard}
          label="MRR"
          value={formatCurrency(centers.reduce((total, center) => total + center.monthly_revenue, 0))}
          hint="demo billing"
        />
        <StatCard
          icon={AlertTriangle}
          label="Needs Attention"
          value={centers.filter(center => center.license_status === 'past_due').length}
          hint="billing/security"
        />
      </section>

      <section className="main-grid">
        <CenterList
          centers={centers}
          selectedCenter={selectedCenter}
          query={query}
          setQuery={setQuery}
          onSelect={onSelect}
          onEdit={onEdit}
        />
        <CenterDetail center={selectedCenter} onUpdate={onUpdate} />
      </section>

      <section className="panel audit-panel">
        <div className="panel-header compact">
          <div>
            <h2>Needs Attention</h2>
            <p>Centers with billing, license, MFA, or backup risk.</p>
          </div>
        </div>
        <div className="attention-grid">
          {attentionCenters.map(center => (
            <article className="attention-item" key={center.id}>
              <div>
                <strong>{center.name}</strong>
                <span>{center.next_invoice}</span>
              </div>
              <Pill value={center.risk} tone={riskClasses[center.risk]} />
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function CentersPage({
  centers,
  selectedCenter,
  query,
  setQuery,
  onSelect,
  onUpdate,
  onEdit,
  activeCenterTab,
  setActiveCenterTab,
}) {
  return (
    <section className="stack">
      <section className="main-grid">
        <CenterList
          centers={centers}
          selectedCenter={selectedCenter}
          query={query}
          setQuery={setQuery}
          onSelect={onSelect}
          onEdit={onEdit}
        />
        <CenterDetail center={selectedCenter} onUpdate={onUpdate} />
      </section>
      <CenterWorkspace
        center={selectedCenter}
        activeTab={activeCenterTab}
        setActiveTab={setActiveCenterTab}
        onUpdate={onUpdate}
      />
    </section>
  );
}

function BillingPage({centers}) {
  const invoices = centers.map(center => ({
    id: `${center.public_id}-INV`,
    center: center.name,
    email: center.billing_email,
    amount: center.monthly_revenue,
    status: center.license_status === 'past_due' ? 'failed' : center.monthly_revenue ? 'paid' : 'trial',
    due: center.next_invoice,
  }));

  return (
    <section className="stack">
      <div className="stats-grid three">
        <StatCard
          icon={CreditCard}
          label="MRR"
          value={formatCurrency(centers.reduce((total, center) => total + center.monthly_revenue, 0))}
          hint="active subscriptions"
        />
        <StatCard
          icon={AlertTriangle}
          label="Past Due"
          value={centers.filter(center => center.license_status === 'past_due').length}
          hint="requires outreach"
        />
        <StatCard
          icon={Webhook}
          label="Webhooks"
          value="Ready"
          hint="Stripe signature required"
        />
      </div>
      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Billing</h2>
            <p>Stripe customer state, monthly revenue, invoices, and delinquency.</p>
          </div>
          <button className="secondary-button"><RefreshCw size={18} /> Sync Stripe</button>
        </div>
        <div className="table">
          <div className="table-row table-head">
            <span>Center</span>
            <span>Billing email</span>
            <span>Amount</span>
            <span>Due</span>
            <span>Status</span>
          </div>
          {invoices.map(invoice => (
            <div className="table-row" key={invoice.id}>
              <strong>{invoice.center}</strong>
              <span>{invoice.email}</span>
              <span>{formatCurrency(invoice.amount)}</span>
              <span>{invoice.due}</span>
              <Pill value={invoice.status} tone={invoice.status === 'failed' ? 'danger' : 'good'} />
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

function LicensesPage({centers, onUpdate}) {
  return (
    <section className="license-grid">
      {centers.map(center => (
        <article className="panel license-card" key={center.id}>
          <div className="panel-header compact">
            <div>
              <h2>{center.name}</h2>
              <p>{center.public_id}</p>
            </div>
            <Pill value={center.license_status} tone={statusClasses[center.license_status]} />
          </div>
          <div className="license-actions">
            {['trial', 'active', 'past_due', 'suspended'].map(status => (
              <button
                key={status}
                className={center.license_status === status ? 'primary-button' : 'secondary-button'}
                onClick={() => onUpdate(center.id, {license_status: status})}>
                {status}
              </button>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}

function LeadsPage({leads, onStatusChange}) {
  return (
    <section className="stack">
      <section className="stats-grid three">
        <StatCard icon={Mail} label="Open Leads" value={leads.filter(lead => lead.status !== 'Closed').length} hint="need follow-up" />
        <StatCard icon={CalendarDays} label="Demo Requests" value={leads.filter(lead => lead.requestType === 'Demo').length} hint="from website" />
        <StatCard icon={CreditCard} label="Pricing Requests" value={leads.filter(lead => lead.requestType === 'Pricing').length} hint="sales qualified" />
      </section>
      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Website Leads</h2>
            <p>Requests submitted from the public website demo and pricing form.</p>
          </div>
          <button className="secondary-button" onClick={() => window.location.reload()}>
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>
        <div className="lead-list">
          {leads.map(lead => (
            <article className="lead-card" key={lead.id}>
              <div className="lead-main">
                <div>
                  <p className="eyebrow">{lead.requestType} request</p>
                  <h2>{lead.centerName}</h2>
                  <span>{lead.fullName} · {lead.role || 'Decision maker'} · {lead.centers} center(s)</span>
                </div>
                <Pill value={lead.status} tone={lead.status === 'New' ? 'trial' : lead.status === 'Closed' ? 'good' : 'warn'} />
              </div>
              <p>{lead.message}</p>
              <div className="lead-meta">
                <a href={`mailto:${lead.email}?subject=Yeladim ${lead.requestType} follow-up`}>
                  <Mail size={16} />
                  {lead.email}
                </a>
                <span>{lead.phone || 'No phone'}</span>
                <span>{lead.createdAt}</span>
                <span>{lead.source}</span>
              </div>
              <div className="lead-actions">
                {['New', 'Contacted', 'Demo Booked', 'Closed'].map(status => (
                  <button
                    key={status}
                    className={lead.status === status ? 'primary-button' : 'secondary-button'}
                    onClick={() => onStatusChange(lead.id, status)}>
                    {status}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

function InviteCodesPage({centers, invites, onCreateInvite}) {
  const [draft, setDraft] = React.useState({
    center_id: centers[0]?.id || '',
    label: 'Parent signup',
    type: 'temporary',
    role: 'parent',
    max_uses: '1',
  });

  return (
    <section className="invite-layout">
      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Create Authorization Code</h2>
            <p>Users cannot sign up unless they have one of these center-approved codes.</p>
          </div>
        </div>
        <div className="form-grid invite-form">
          <label>
            Center
            <select
              value={draft.center_id}
              onChange={event => setDraft(current => ({...current, center_id: event.target.value}))}>
              {centers.map(center => (
                <option key={center.id} value={center.id}>{center.name}</option>
              ))}
            </select>
          </label>
          <label>
            Label
            <input
              value={draft.label}
              onChange={event => setDraft(current => ({...current, label: event.target.value}))}
            />
          </label>
          <label>
            Code type
            <select
              value={draft.type}
              onChange={event => setDraft(current => ({...current, type: event.target.value}))}>
              <option value="temporary">Temporary</option>
              <option value="permanent">Permanent</option>
            </select>
          </label>
          <label>
            Role
            <select
              value={draft.role}
              onChange={event => setDraft(current => ({...current, role: event.target.value}))}>
              <option value="parent">Parent</option>
              <option value="teacher">Teacher</option>
              <option value="center_admin">Center Admin</option>
            </select>
          </label>
          <label>
            Max uses
            <input
              inputMode="numeric"
              value={draft.max_uses}
              onChange={event => setDraft(current => ({...current, max_uses: event.target.value}))}
            />
          </label>
        </div>
        <div className="form-actions">
          <button className="primary-button" onClick={() => onCreateInvite(draft)}>
            <LockKeyhole size={18} />
            Generate Code
          </button>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Active Codes</h2>
            <p>Share these only with approved families, teachers, or center admins.</p>
          </div>
        </div>
        <div className="invite-list">
          {invites.map(invite => (
            <article className="invite-card" key={invite.id}>
              <div>
                <strong>{invite.code || 'Hidden after creation'}</strong>
                <span>{invite.center_name || centers.find(center => center.id === invite.center_id)?.name} · {invite.role}</span>
              </div>
              <Pill value={invite.type} tone={invite.type === 'permanent' ? 'good' : 'trial'} />
              <span>{invite.used_count || 0}/{invite.max_uses || '∞'} used</span>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

function AuditPage({events}) {
  return (
    <section className="panel audit-panel">
      <div className="panel-header">
        <div>
          <h2>Audit Logs</h2>
          <p>Owner actions, Stripe events, support access, and security notices.</p>
        </div>
      </div>
      <div className="table">
        <div className="table-row table-head">
          <span>Time</span>
          <span>Actor</span>
          <span>Action</span>
          <span>Target</span>
          <span>Severity</span>
        </div>
        {events.map(event => (
          <div className="table-row" key={event.id}>
            <span>{event.time}</span>
            <strong>{event.actor}</strong>
            <span>{event.action}</span>
            <span>{event.target}</span>
            <Pill value={event.severity} tone={riskClasses[event.severity] || 'trial'} />
          </div>
        ))}
      </div>
    </section>
  );
}

function SecurityPage({centers}) {
  const checklist = [
    ['MFA for owner admin', true],
    ['Owner routes restricted server-side', true],
    ['Center-scoped S3 paths', true],
    ['Immutable audit log storage', false],
    ['Stripe webhook signature verification', false],
    ['Support access approval workflow', false],
  ];

  return (
    <section className="security-grid-page">
      <div className="panel">
        <h2>Security Checklist</h2>
        <div className="checklist">
          {checklist.map(([label, done]) => (
            <div className="check-row" key={label}>
              {done ? <CheckCircle2 size={20} /> : <ShieldAlert size={20} />}
              <span>{label}</span>
              <Pill value={done ? 'ready' : 'needed'} tone={done ? 'good' : 'warn'} />
            </div>
          ))}
        </div>
      </div>
      <div className="panel">
        <h2>Tenant Risk</h2>
        <div className="center-list compact-list">
          {centers.map(center => (
            <div className="risk-row" key={center.id}>
              <strong>{center.name}</strong>
              <span>{center.backups} backups · MFA {center.mfa_enforced ? 'on' : 'off'}</span>
              <Pill value={center.risk} tone={riskClasses[center.risk]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SupportPage({centers}) {
  return (
    <section className="support-grid">
      <div className="panel">
        <div className="panel-header">
          <div>
            <h2>Support Sessions</h2>
            <p>Temporary access should be approved, scoped, and logged.</p>
          </div>
          <button className="primary-button"><ShieldCheck size={18} /> Request Access</button>
        </div>
        <div className="table">
          <div className="table-row table-head">
            <span>Center</span>
            <span>Scope</span>
            <span>Expires</span>
            <span>Status</span>
          </div>
          {centers.map(center => (
            <div className="table-row" key={center.id}>
              <strong>{center.name}</strong>
              <span>Read-only diagnostics</span>
              <span>Not active</span>
              <Pill value="closed" tone="trial" />
            </div>
          ))}
        </div>
      </div>
      <aside className="panel">
        <h2>Support Rules</h2>
        <div className="checklist">
          <div className="check-row">
            <CheckCircle2 size={20} />
            <span>Every session writes an audit event</span>
            <Pill value="required" tone="good" />
          </div>
          <div className="check-row">
            <CheckCircle2 size={20} />
            <span>No chat export without explicit owner approval</span>
            <Pill value="required" tone="good" />
          </div>
          <div className="check-row">
            <ShieldAlert size={20} />
            <span>Production impersonation still needs backend enforcement</span>
            <Pill value="needed" tone="warn" />
          </div>
        </div>
      </aside>
    </section>
  );
}

function SettingsPage({
  apiUrl,
  setApiUrl,
  ownerToken,
  setOwnerToken,
  storageSettings,
  setStorageSettings,
}) {
  const updateStorage = (key, value) => {
    setStorageSettings(current => ({...current, [key]: value}));
  };

  return (
    <section className="settings-grid">
      <div className="panel settings-panel">
        <h2>Owner Settings</h2>
        <p>Connect this owner dashboard to the standalone Yeladim API.</p>
        <label>
          Yeladim API URL
          <input value={apiUrl} onChange={event => setApiUrl(event.target.value)} />
        </label>
        <label>
          Owner session token
          <input
            value={ownerToken}
            onChange={event => setOwnerToken(event.target.value)}
            type="password"
            placeholder="Production will use secure login/session auth"
          />
        </label>
        <label>
          Webhook environment
          <select defaultValue="not-connected">
            <option value="not-connected">Not connected</option>
            <option value="test">Test mode</option>
            <option value="live">Live mode</option>
          </select>
        </label>
        <div className="settings-subsection">
          <h2>Media Storage</h2>
          <p>Choose where center photos, videos, profiles, and documents are stored.</p>
          <label>
            Storage provider
            <select
              value={storageSettings.provider}
              onChange={event => updateStorage('provider', event.target.value)}>
              <option value="spaces">DigitalOcean Spaces</option>
              <option value="s3">AWS S3</option>
            </select>
          </label>
          <label>
            Bucket / Space name
            <input
              value={storageSettings.bucket}
              onChange={event => updateStorage('bucket', event.target.value)}
            />
          </label>
          <label>
            Region
            <input
              value={storageSettings.region}
              onChange={event => updateStorage('region', event.target.value)}
            />
          </label>
          <label>
            Endpoint
            <input
              value={storageSettings.endpoint}
              onChange={event => updateStorage('endpoint', event.target.value)}
              placeholder="https://nyc3.digitaloceanspaces.com or AWS default"
            />
          </label>
          <label>
            Public CDN base URL
            <input
              value={storageSettings.cdnUrl}
              onChange={event => updateStorage('cdnUrl', event.target.value)}
              placeholder="Optional CDN URL"
            />
          </label>
        </div>
        <div className="settings-actions">
          <button className="primary-button"><LifeBuoy size={18} /> Save Settings</button>
          <button className="secondary-button"><Bell size={18} /> Test Alert</button>
        </div>
      </div>
      <aside className="panel endpoint-panel">
        <h2>Backend Areas</h2>
        <div className="endpoint-row"><Database size={18} /> PostgreSQL tenant data</div>
        <div className="endpoint-row"><ShieldCheck size={18} /> Owner-only API routes</div>
        <div className="endpoint-row"><Webhook size={18} /> Stripe and email webhooks</div>
        <div className="endpoint-row"><KeyRound size={18} /> Invite-code signup enforcement</div>
        <div className="endpoint-row"><Cloud size={18} /> {storageSettings.provider === 'spaces' ? 'DigitalOcean Spaces' : 'AWS S3'} media storage</div>
      </aside>
    </section>
  );
}

function App() {
  const [signedIn, setSignedIn] = React.useState(false);
  const [email, setEmail] = React.useState('owner@yeladim.app');
  const [passcode, setPasscode] = React.useState('demo');
  const [apiUrl, setApiUrl] = React.useState(apiBaseUrl);
  const [ownerToken, setOwnerToken] = React.useState('');
  const [storageSettings, setStorageSettings] = React.useState({
    provider: 'spaces',
    bucket: 'yeladim-centers-staging',
    region: 'nyc3',
    endpoint: 'https://nyc3.digitaloceanspaces.com',
    cdnUrl: '',
  });
  const [centers, setCenters] = React.useState(initialCenters);
  const [auditEvents, setAuditEvents] = React.useState(initialAuditEvents);
  const [leads, setLeads] = React.useState(initialLeads);
  const [invites, setInvites] = React.useState(initialInviteCodes);
  const [query, setQuery] = React.useState('');
  const [activePage, setActivePage] = React.useState('overview');
  const [activeCenterTab, setActiveCenterTab] = React.useState('overview');
  const [selectedCenterId, setSelectedCenterId] = React.useState(initialCenters[0].id);
  const [editingCenter, setEditingCenter] = React.useState(null);

  const selectedCenter =
    centers.find(center => center.id === selectedCenterId) || centers[0];

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encodedLead = params.get('lead');
    const storedLeads = JSON.parse(localStorage.getItem(leadStorageKey) || '[]');

    if (!encodedLead) {
      if (storedLeads.length) {
        setLeads(current => {
          const knownIds = new Set(current.map(lead => lead.id));
          return [...storedLeads.filter(lead => !knownIds.has(lead.id)), ...current];
        });
      }
      return;
    }

    try {
      const incomingLead = JSON.parse(decodeURIComponent(encodedLead));
      const nextLeads = [incomingLead, ...storedLeads.filter(lead => lead.id !== incomingLead.id)];
      localStorage.setItem(leadStorageKey, JSON.stringify(nextLeads));
      setLeads(current => {
        const knownIds = new Set(current.map(lead => lead.id));
        return knownIds.has(incomingLead.id) ? current : [incomingLead, ...current];
      });
      setActivePage('leads');
      window.history.replaceState({}, '', window.location.pathname);
    } catch (error) {
      console.warn('Could not import website lead', error);
    }
  }, []);

  React.useEffect(() => {
    const loadOwnerData = async () => {
      try {
        const loginResponse = await fetch(`${apiBaseUrl}/auth/login`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({email: 'owner@yeladim.app', password: 'demo'}),
        });
        if (!loginResponse.ok) {
          return;
        }
        const {token} = await loginResponse.json();
        const [leadsResponse, invitesResponse] = await Promise.all([
          fetch(`${apiBaseUrl}/owner/leads`, {headers: {Authorization: `Bearer ${token}`}}),
          fetch(`${apiBaseUrl}/owner/invite-codes`, {headers: {Authorization: `Bearer ${token}`}}),
        ]);
        if (leadsResponse.ok) {
          const payload = await leadsResponse.json();
          setLeads(current => {
            const knownIds = new Set(current.map(lead => lead.id));
            return [...payload.leads.filter(lead => !knownIds.has(lead.id)), ...current];
          });
        }
        if (invitesResponse.ok) {
          const payload = await invitesResponse.json();
          setInvites(current => {
            const knownIds = new Set(current.map(invite => invite.id));
            return [...payload.invite_codes.filter(invite => !knownIds.has(invite.id)), ...current];
          });
        }
      } catch (error) {
        console.warn('Owner API unavailable, using demo data', error);
      }
    };
    loadOwnerData();
  }, []);

  const signIn = event => {
    event.preventDefault();
    if (email !== 'owner@yeladim.app' || passcode !== 'demo') {
      return;
    }
    setSignedIn(true);
  };

  const updateCenter = (centerId, patch) => {
    setCenters(current =>
      current.map(center =>
        center.id === centerId ? {...center, ...patch} : center,
      ),
    );
    setAuditEvents(current => [
      {
        id: Date.now(),
        actor: 'Owner',
        action: 'Center updated',
        target: centers.find(center => center.id === centerId)?.name || 'Center',
        severity: patch.license_status === 'suspended' ? 'high' : 'medium',
        time: 'Just now',
      },
      ...current,
    ]);
  };

  const updateLeadStatus = (leadId, status) => {
    setLeads(current => {
      const nextLeads = current.map(lead => (lead.id === leadId ? {...lead, status} : lead));
      localStorage.setItem(leadStorageKey, JSON.stringify(nextLeads));
      return nextLeads;
    });
  };

  const createInvite = async draft => {
    const selectedCenter = centers.find(center => center.id === draft.center_id);
    let invite = {
      id: `invite-${Date.now()}`,
      ...draft,
      center_name: selectedCenter?.name,
      code: `YL-${Math.random().toString(16).slice(2, 8).toUpperCase()}`,
      max_uses: draft.type === 'permanent' ? null : Number(draft.max_uses || 1),
      used_count: 0,
    };
    try {
      const loginResponse = await fetch(`${apiBaseUrl}/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: 'owner@yeladim.app', password: 'demo'}),
      });
      if (loginResponse.ok) {
        const {token} = await loginResponse.json();
        const response = await fetch(`${apiBaseUrl}/owner/invite-codes`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
          body: JSON.stringify({
            center_id: draft.center_id,
            label: draft.label,
            type: draft.type,
            role: draft.role,
            max_uses: draft.type === 'permanent' ? null : Number(draft.max_uses || 1),
          }),
        });
        if (response.ok) {
          const payload = await response.json();
          invite = {...payload.invite_code, center_name: selectedCenter?.name};
        }
      }
    } catch (error) {
      console.warn('Invite API unavailable, using local fallback', error);
    }
    setInvites(current => [invite, ...current]);
  };

  const saveCenter = () => {
    const nextCenter = {
      ...editingCenter,
      id: editingCenter.id || Date.now(),
      public_id: editingCenter.public_id || buildPublicId(editingCenter.name),
      usage: editingCenter.usage || {children: 0, rooms: 0, users: 1, storage_gb: 0},
      monthly_revenue: plans[editingCenter.membership_level].price,
      risk: editingCenter.license_status === 'active' ? 'low' : 'medium',
      next_invoice: editingCenter.next_invoice || 'Not scheduled',
      status: editingCenter.license_status,
      mfa_enforced: Boolean(editingCenter.mfa_enforced),
      backups: editingCenter.backups || 'pending',
    };
    setCenters(current => {
      const exists = current.some(center => center.id === nextCenter.id);
      return exists
        ? current.map(center => (center.id === nextCenter.id ? nextCenter : center))
        : [nextCenter, ...current];
    });
    setSelectedCenterId(nextCenter.id);
    setEditingCenter(null);
    setAuditEvents(current => [
      {
        id: Date.now(),
        actor: 'Owner',
        action: nextCenter.public_id ? 'Center saved' : 'Center created',
        target: nextCenter.name,
        severity: 'medium',
        time: 'Just now',
      },
      ...current,
    ]);
  };

  const startCreateCenter = () => {
    setEditingCenter({
      name: '',
      owner: '',
      billing_email: '',
      stripe_customer: '',
      membership_level: 'starter',
      license_status: 'trial',
    });
    setActivePage('centers');
  };

  const renderPage = () => {
    if (editingCenter) {
      return (
        <CenterForm
          draft={editingCenter}
          setDraft={setEditingCenter}
          onSave={saveCenter}
          onCancel={() => setEditingCenter(null)}
        />
      );
    }

    if (activePage === 'billing') {
      return <BillingPage centers={centers} />;
    }

    if (activePage === 'leads') {
      return <LeadsPage leads={leads} onStatusChange={updateLeadStatus} />;
    }

    if (activePage === 'invites') {
      return <InviteCodesPage centers={centers} invites={invites} onCreateInvite={createInvite} />;
    }

    if (activePage === 'licenses') {
      return <LicensesPage centers={centers} onUpdate={updateCenter} />;
    }

    if (activePage === 'audit') {
      return <AuditPage events={auditEvents} />;
    }

    if (activePage === 'security') {
      return <SecurityPage centers={centers} />;
    }

    if (activePage === 'settings') {
      return (
        <SettingsPage
          apiUrl={apiUrl}
          setApiUrl={setApiUrl}
          ownerToken={ownerToken}
          setOwnerToken={setOwnerToken}
          storageSettings={storageSettings}
          setStorageSettings={setStorageSettings}
        />
      );
    }

    if (activePage === 'support') {
      return <SupportPage centers={centers} />;
    }

    if (activePage === 'centers') {
      return (
        <CentersPage
          centers={centers}
          selectedCenter={selectedCenter}
          query={query}
          setQuery={setQuery}
          onSelect={setSelectedCenterId}
          onUpdate={updateCenter}
          onEdit={center => setEditingCenter(center)}
          activeCenterTab={activeCenterTab}
          setActiveCenterTab={setActiveCenterTab}
        />
      );
    }

    return (
      <OverviewPage
        centers={centers}
        selectedCenter={selectedCenter}
        query={query}
        setQuery={setQuery}
        onSelect={setSelectedCenterId}
        onUpdate={updateCenter}
        onEdit={center => setEditingCenter(center)}
      />
    );
  };

  if (!signedIn) {
    return (
      <LoginScreen
        email={email}
        setEmail={setEmail}
        passcode={passcode}
        setPasscode={setPasscode}
        apiUrl={apiUrl}
        setApiUrl={setApiUrl}
        onSignIn={signIn}
      />
    );
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark small">
            <ShieldCheck size={24} />
          </div>
          <div>
            <strong>Yeladim</strong>
            <span>Owner Admin</span>
          </div>
        </div>
        <nav>
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={activePage === item.id ? 'nav-active' : ''}
                onClick={() => {
                  setEditingCenter(null);
                  setActivePage(item.id);
                }}>
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="security-box">
          <ShieldCheck size={20} />
          <strong>Owner-only access</strong>
          <span>MFA, audit logging, and server-side authorization required before production.</span>
        </div>
        <button className="logout-button" onClick={() => setSignedIn(false)}>
          <LogOut size={18} />
          Sign out
        </button>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">Yeladim owner console</p>
            <h1>{pageTitles[activePage][1]}</h1>
          </div>
          <div className="topbar-actions">
            <div className="api-pill">{apiUrl}</div>
            <button className="primary-button" onClick={startCreateCenter}>
              <Plus size={18} />
              New Center
            </button>
          </div>
        </header>
        {renderPage()}
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
