import {
  BarChart3,
  Bot,
  Clapperboard,
  Database,
  FileCheck2,
  FileText,
  FolderTree,
  Languages,
  LayoutGrid,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  UserCheck2,
  UserSquare2,
} from 'lucide-react'
export const aiServiceModalities = [
  {
    title: 'Text',
    details: 'Text collection, labelling, transcription, utterance collection, and sentiment analysis.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Video',
    details: 'Collection, labelling, audit, live broadcast support, and subtitle generation.',
    image: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Image',
    details: 'Collection, labelling, classification, audit, object detection, and tagging.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Audio',
    details: 'Collection, labelling, voice categorization, music categorization, and intelligent customer support datasets.',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1400&q=80',
  },
]

export const aiServiceCapabilities = [
  {
    title: 'Data Validation',
    details: 'Creates data that is consistent, accurate, and complete by enforcing predefined rules and standards.',
    image: 'https://images.unsplash.com/photo-1518186233392-c232efbf2373?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Data Collection',
    details: 'Multi-modal collection across text, audio, image, and video with advanced workflows for classification and tagging.',
    image: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Data Acquisition',
    details: 'End-to-end acquisition workflows for capturing, processing, and managing large-scale diverse datasets.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Data Curation',
    details: 'Selection, indexing, and organization to improve reliability, accessibility, and ease of classification.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Data Annotation',
    details: 'High-quality annotation for text, image, audio, and video across computer vision and NLP use cases.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80',
  },
]

export const aiProjectTracks = [
  {
    title: 'AI Data Extraction',
    details:
      'Using AI, we optimize the acquisition of image and text from multiple sources. Techniques include onsite scanning, drone photography, negotiation with archives and the formation of alliances with corporations, religious organizations and governments.',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Machine Learning Enablement',
    details:
      "Maximise your home's potential with a bespoke loft conversion. Whether you're looking for an extra bedroom, office, or living space, Refit transforms underused lofts into stylish, functional areas, adding both value and comfort to your home with expert planning and precision construction.",
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Autonomous Driving Technology',
    details:
      'From luxurious en-suites to practical family bathrooms, Refit delivers beautifully designed spaces that combine style with functionality. We handle everything from tiling and fixtures to plumbing and lighting, ensuring a high-quality finish that enhances both comfort and aesthetics.',
    image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'AI-Enabled Customer Service',
    details:
      "Expand your living space with a seamless home extension. Whether you need a bigger kitchen, a new living area, or a multi-purpose space, Refit provides expertly crafted extensions designed to enhance your home's flow, value, and usability, all while maintaining its unique character.",
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Natural Language Processing and Speech Acquisition',
    details:
      "Bring your home's character back to life with Refit's expert restoration services. Whether it's period features, structural repairs, or a full-scale renovation, we preserve and enhance original details while ensuring modern durability, creating a perfect balance between heritage and contemporary living.",
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Computer Vision (CV)',
    details:
      "From driveways and patios to fencing and brickwork, Refit enhances your home's exterior with durable, high-quality craftsmanship. Whether it's improving curb appeal or creating a beautiful outdoor space, our team ensures every detail is built to last and designed to impress.",
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Genealogy',
    details:
      `Powered by AI, Lifewood processes genealogical material at speed and scale, to conserve and illuminate family histories, national archives, corporate lists and records of all types. Lifewood has more than 18 years of experience capturing, scanning and processing genealogical data. In fact, Lifewood started with genealogy data as its core business, so that over the years we have accumulated vast knowledge in diverse types of genealogy indexing.

We have worked with all the major genealogy companies and have extensive experience in transcribing and indexing genealogical content in a wide variety of formats, including tabular, pre-printed forms and paragraph-style records.

Working across borders, with offices on every continent, our ability with multi-language projects has built an extensive capability spanning more than 50 languages and associated dialects. Now, powered by AI and the latest inter-office communication systems, we are transforming ever more efficient ways to service our clients, while keeping humanity at the centre of our activity.

Genealogical material that we have experience with includes:

Census
Vital - BMD
Church and Parish Registers
Passenger Lists
Naturalisation
Military Records
Legal Records
Yearbooks`,
    image: 'https://images.unsplash.com/photo-1461360228754-6e81c478b882?auto=format&fit=crop&w=1400&q=80',
  },
]

export const typeAUseCases = [
  'Multi-language genealogy documents, newspapers, and archives to facilitate global ancestry research',
  'QQ Music of over millions non-Chinese songs and lyrics',
]

export const typeAProcess = [
  {
    step: '01',
    title: 'Objective',
    details: 'Scan document for preservation, extract data and structure into database.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
  },
  {
    step: '02',
    title: 'Key Features',
    details: 'Features include Auto Crop, Auto De-skew, Blur Detection, Foreign Object Detection, and AI Data Extraction.',
    image: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    step: '03',
    title: 'Results',
    details:
      'Accurate and precise data is ensured through validation and quality assurance. The system is efficient and scalable, enabling fast and adaptable data extraction. It supports multiple languages and formats, allowing the handling of diverse documents. Advanced features include auto-crop, de-skew, blur, and object detection. With AI integration, the solution provides structured data for AI tools and delivers clear, visual, and easy-to-understand results.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  },
]

export const typeBUseCases = [
  'Comprehensive AI data solutions that cover the entire spectrum from data collection and annotation to model testing.',
  'Creating multimodal datasets for deep learning and large language models.',
]

export const typeBProcess = [
  {
    step: '01',
    title: 'Target',
    details:
      'Capture and transcribe recordings from native speakers from 23 different countries (Netherlands, Spain, Norway, France, Germany, Poland, Russia, Italy, Japan, South Korea, Mexico, UAE, Saudi Arabia, Egypt, etc.). Voice content involves 6 project types and 9 data domains. A total of 25,400 valid hours durations.',
    image: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    step: '02',
    title: 'Solutions',
    details:
      '30,000+ native speaking human resources from more than 30 countries were mobilized. Use our flexible industrial processes and continuously optimize them. Use PBI to track the progress of daily collection and transcription in real time, analyze and improve the results in real time.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
  },
  {
    step: '03',
    title: 'Results',
    details:
      '5 months to complete the voice collection and annotation of 25,400 valid hours on time and with quality.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  },
]

export const typeCUseCases = [
  'Autonomous driving and smart cockpit datasets for Driver Monitoring System.',
  'China Merchants Group: enterprise-grade dataset for building "ShipGPT".',
]

export const typeCProcess = [
  {
    step: '01',
    title: 'Target',
    details:
      'Annotate vehicles, pedestrians, and road objects with 2D & 3D techniques to enable accurate object detection for autonomous driving. Self-driving cars rely on precise visual training to detect, classify, and respond safely in real-world conditions.',
    image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80',
  },
  {
    step: '02',
    title: 'Solutions',
    details:
      'Dedicated Process Engineering team for analysis and optimization. AI-enhanced workflow with multi-level quality checks. Scalable global delivery through crowdsourced workforce management.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    step: '03',
    title: 'Results',
    details:
      'Achieved 25% production in Month 1 with 95% accuracy (Target: 90%) and 50% production in Month 2 with 99% accuracy (Target: 95%). Maintained an overall accuracy of 99% with on-time delivery. Successfully expanded operations to Malaysia with 100 annotators and Indonesia with 150 annotators.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
  },
]

export const typeDCapabilities = [
  {
    title: 'Story-Driven Production',
    details:
      'We specialize in story-driven content for companies looking to join the communication revolution.',
    icon: Clapperboard,
  },
  {
    title: 'Generative AI Workflows',
    details:
      'Advanced film, video, and editing techniques are combined with generative AI to create cinematic worlds for brand communications.',
    icon: Bot,
  },
  {
    title: 'Global Localization',
    details:
      'We can quickly adjust culture and language for different world markets while preserving the core message.',
    icon: Languages,
  },
]

export const typeDVisuals = [
  {
    title: 'Cinematic AI Scenes',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Creative Direction',
    image: 'https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Global Localization',
    image: 'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&w=1600&q=80',
  },
]

export const typeDCinematicFrames = [
  {
    title: 'Scene Composition',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'AI Shot Planning',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Post-production Flow',
    image: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=1600&q=80',
  },
]

export const typeDCinematicVideo = {
  src: '/media/ai-cinematic-scene.mp4',
  poster: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1600&q=80',
}

export const typeDStats = [
  { label: 'Multiple Languages', value: 'Multiple' },
  { label: 'Countries Covered', value: '100+' },
]

export const philanthropyNarrative = [
  {
    title: 'Our Vision',
    details:
      'Our vision is of a world where financial investment plays a central role in solving social and environmental challenges facing the global community, specifically in Africa and the Indian sub-continent.',
    icon: Sparkles,
  },
  {
    title: 'Our Impact',
    details:
      'At Lifewood we direct financial and social resources into educational and developmental projects around the world. Through purposeful partnerships and sustainable investment, we have empowered communities and transformed their economic and social environments in these areas.',
    icon: ShieldCheck,
  },
  {
    title: 'Collaborative Partnership',
    details:
      'Our projects in South Africa, Madagascar, India, Bangladesh, Vietnam, and the Philippines have touched more than 100,000 lives through a broad spectrum of developmental opportunities, including market gardening, educational support and micro-finance projects, and strategic implementation of resources to accelerate growth and establish sustainable local economies.',
    icon: FolderTree,
  },
]

export const philanthropyMapOffices = [
  { name: 'South Africa', lat: -30.5595, lon: 22.9375, region: 'Africa' },
  { name: 'Nigeria', lat: 9.082, lon: 8.6753, region: 'Africa' },
  { name: 'Republic of the Congo', lat: -0.228, lon: 15.8277, region: 'Africa' },
  { name: 'Democratic Republic of the Congo', lat: -4.0383, lon: 21.7587, region: 'Africa' },
  { name: 'Ghana', lat: 7.9465, lon: -1.0232, region: 'Africa' },
  { name: 'Madagascar', lat: -18.7669, lon: 46.8691, region: 'Africa' },
  { name: 'Benin', lat: 9.3077, lon: 2.3158, region: 'Africa' },
  { name: 'Uganda', lat: 1.3733, lon: 32.2903, region: 'Africa' },
  { name: 'Kenya', lat: -0.0236, lon: 37.9062, region: 'Africa' },
  { name: 'Ivory Coast', lat: 7.54, lon: -5.5471, region: 'Africa' },
  { name: 'Egypt', lat: 26.8206, lon: 30.8025, region: 'Africa' },
  { name: 'Ethiopia', lat: 9.145, lon: 40.4897, region: 'Africa' },
  { name: 'Niger', lat: 17.6078, lon: 8.0817, region: 'Africa' },
  { name: 'Tanzania', lat: -6.369, lon: 34.8888, region: 'Africa' },
  { name: 'Namibia', lat: -22.9576, lon: 18.4904, region: 'Africa' },
  { name: 'Zambia', lat: -13.1339, lon: 27.8493, region: 'Africa' },
  { name: 'Zimbabwe', lat: -19.0154, lon: 29.1549, region: 'Africa' },
  { name: 'Liberia', lat: 6.4281, lon: -9.4295, region: 'Africa' },
  { name: 'Sierra Leone', lat: 8.4606, lon: -11.7799, region: 'Africa' },
  { name: 'India', lat: 20.5937, lon: 78.9629, region: 'Asia' },
  { name: 'Bangladesh', lat: 23.685, lon: 90.3563, region: 'Asia' },
  { name: 'China', lat: 35.8617, lon: 104.1954, region: 'Asia' },
]

export const careersValues = [
  {
    title: 'Global Team Culture',
    details: 'Work with distributed teams across regions while learning from diverse perspectives and delivery models.',
    icon: FolderTree,
  },
  {
    title: 'Impact-Driven Work',
    details: 'Contribute to AI and data programs that solve real operational and business challenges at scale.',
    icon: ShieldCheck,
  },
  {
    title: 'Growth and Development',
    details: 'Build technical and leadership capability through structured mentorship, training, and cross-functional exposure.',
    icon: Sparkles,
  },
]

export const careersCultureChips = [
  'Innovative',
  'Flexible',
  'Supportive',
  'Collaborative',
  'Engaging',
  'Diverse',
  'Purpose-driven',
  'Transparent',
  'Trustworthy',
  'Professional',
  'Reliable',
  'Balanced (work-life balance)',
]

export const adminMenuItems = [
  { label: 'Dashboard', icon: LayoutGrid },
  { label: 'Analytics', icon: BarChart3 },
  { label: 'Evaluation', icon: FileCheck2 },
  { label: 'Reports', icon: FileText },
  { label: 'Applications', icon: FileText },
  { label: 'Approvals', icon: UserCheck2 },
  { label: 'Inquiries', icon: MessageCircle },
  { label: 'Manage Interns', icon: UserSquare2 },
  { label: 'Manage Employee', icon: UserCheck2 },
]

export const adminPanelContent = {
  Dashboard: {
    heading: 'Overview',
    badge: 'Spring Term 2026',
    status: 'In Progress',
    titleA: 'Mastering',
    titleB: 'React',
    titleC: 'Patterns & Architecture',
    module: 'Module 12 of 24',
    completion: '82%',
    spent: '14h',
    grade: 'A+',
    efficiency: '98%',
    level: '04',
    levelLabel: 'Senior Intern',
    weekly: '4 tasks remaining',
    activity: [
      ['98%', 'Quiz Score: React Hooks', '27 Feb, 2026'],
      ['x2', 'Productivity Streak', 'Increased limits on tasks'],
      ['2%', 'Optimization Bonus', 'Code quality improvement'],
    ],
  },
  Analytics: {
    heading: 'Analytics',
    badge: 'Live Metrics',
    status: 'Monitoring',
    titleA: 'Delivery',
    titleB: 'Performance',
    titleC: '& Utilization',
    module: 'Reporting window: Last 30 days',
    completion: '91%',
    spent: '126h',
    grade: 'A',
    efficiency: '94%',
    level: '07',
    levelLabel: 'Ops Analyst',
    weekly: '2 metrics to review',
    activity: [
      ['+12%', 'Throughput Increase', 'Week-over-week gain'],
      ['97%', 'SLA Compliance', 'All critical pipelines on target'],
      ['5', 'Flagged Alerts', 'Awaiting assignment'],
    ],
  },
  Evaluation: {
    heading: 'Evaluation',
    badge: 'Quality Cycle',
    status: 'Review',
    titleA: 'Model',
    titleB: 'Evaluation',
    titleC: '& QA Readiness',
    module: 'Cycle 6 in progress',
    completion: '88%',
    spent: '53h',
    grade: 'A-',
    efficiency: '92%',
    level: '05',
    levelLabel: 'QA Lead',
    weekly: '6 checks pending',
    activity: [
      ['96%', 'Annotation Accuracy', 'Validation batch completed'],
      ['14', 'Open Findings', 'Need category owner updates'],
      ['3', 'Blocked Samples', 'Awaiting source correction'],
    ],
  },
  Reports: {
    heading: 'Reports',
    badge: 'Executive View',
    status: 'Compiling',
    titleA: 'Monthly',
    titleB: 'Delivery',
    titleC: '& Client Reports',
    module: 'March summary draft',
    completion: '76%',
    spent: '31h',
    grade: 'B+',
    efficiency: '89%',
    level: '03',
    levelLabel: 'Reporting Intern',
    weekly: '5 reports to finalize',
    activity: [
      ['8', 'Draft Reports', 'Queued for internal review'],
      ['3', 'Client Exports', 'Pending approval'],
      ['1', 'Overdue Item', 'Executive summary update'],
    ],
  },
  Approvals: {
    heading: 'Approvals',
    badge: 'Pending Requests',
    status: 'Review Queue',
    titleA: 'Sign-up',
    titleB: 'Request',
    titleC: '& Approval Flow',
    module: 'Registration pipeline',
    completion: '100%',
    spent: '11h',
    grade: 'A',
    efficiency: '96%',
    level: '06',
    levelLabel: 'Access Admin',
    weekly: 'Review pending requests',
    activity: [
      ['New', 'Incoming Requests', 'Awaiting admin review'],
      ['Queue', 'Approval Status', 'Track approved and rejected requests'],
      ['Next', 'Provision Accounts', 'Backend function can automate final auth creation'],
    ],
  },
  Inquiries: {
    heading: 'Inquiries',
    badge: 'Inbound Leads',
    status: 'Inbox',
    titleA: 'Client',
    titleB: 'Inquiry',
    titleC: '& Details',
    module: 'Website inquiries',
    completion: '100%',
    spent: '4h',
    grade: 'A',
    efficiency: '96%',
    level: '05',
    levelLabel: 'Business Ops',
    weekly: 'Review inbound inquiries',
    activity: [
      ['New', 'Incoming Inquiries', 'Submitted through the website contact form'],
      ['Lead', 'Inquiry Review', 'Check company context and message details'],
      ['Reply', 'Follow-up Queue', 'Prepare outreach and next steps'],
    ],
  },
  Applications: {
    heading: 'Applications',
    badge: 'Career Pipeline',
    status: 'Review Queue',
    titleA: 'Applicant',
    titleB: 'Review',
    titleC: '& Decisions',
    module: 'Career applications',
    completion: '100%',
    spent: '6h',
    grade: 'A',
    efficiency: '95%',
    level: '06',
    levelLabel: 'HR Admin',
    weekly: 'Review pending applicants',
    activity: [
      ['New', 'Incoming Applications', 'CVs and details ready'],
      ['Queue', 'Decision Status', 'Approve or reject applicants'],
      ['Next', 'Notify Candidates', 'Email status update'],
    ],
  },
  'Manage Interns': {
    heading: 'Manage Interns',
    badge: 'Workspace Controls',
    status: 'Configurable',
    titleA: 'Team',
    titleB: 'Settings',
    titleC: '& Access Control',
    module: 'Policy version 2.3',
    completion: '100%',
    spent: '9h',
    grade: 'A',
    efficiency: '99%',
    level: '09',
    levelLabel: 'Platform Admin',
    weekly: '1 policy sync due',
    activity: [
      ['2FA', 'Authentication Enabled', 'All admin users secured'],
      ['12', 'Active Seats', 'License utilization in range'],
      ['0', 'Critical Issues', 'No current blockers'],
    ],
  },
  'Manage Employee': {
    heading: 'Manage Employee',
    badge: 'Employee Records',
    status: 'Synchronized',
    titleA: 'Employee',
    titleB: 'Records',
    titleC: '& Hired Profiles',
    module: 'Hiring pipeline sync',
    completion: '100%',
    spent: '5h',
    grade: 'A',
    efficiency: '97%',
    level: '08',
    levelLabel: 'People Ops',
    weekly: 'Review hired employee records',
    activity: [
      ['Sync', 'Hiring Actions', 'Hired applicants are copied automatically'],
      ['Roster', 'Employee Records', 'Search and review all hired staff'],
      ['Ready', 'Profile Access', 'Available to signed-in approved accounts'],
    ],
  },
}

export const analyticsInterns = [
  { name: 'Antopina, John Wrexel', performance: 56, attendance: 61, progress: 48, low: true },
  { name: 'Barluado, Francis Merc', performance: 58, attendance: 64, progress: 52, low: true },
  { name: 'Cabrillos, Dane Kiev', performance: 91, attendance: 93, progress: 87, low: false },
  { name: 'Cagampang, Emmanuel Jr.', performance: 90, attendance: 95, progress: 88, low: false },
  { name: 'Casidsid, Twinky', performance: 88, attendance: 92, progress: 84, low: false },
  { name: 'Castrodes, Atilla Hadrian', performance: 89, attendance: 94, progress: 86, low: false },
  { name: 'Damayo, Jholmer', performance: 87, attendance: 91, progress: 83, low: false },
  { name: 'Francisco, Ezzel Jan', performance: 90, attendance: 92, progress: 85, low: false },
  { name: 'Gelborion, Francis Dave', performance: 88, attendance: 90, progress: 84, low: false },
  { name: 'Inocentes, Jose Danielle', performance: 89, attendance: 93, progress: 86, low: false },
  { name: 'Jumao-as, Andre Daniel', performance: 92, attendance: 95, progress: 89, low: false },
  { name: 'Jusga, Ailyn', performance: 86, attendance: 90, progress: 82, low: false },
  { name: 'Lastimosa, Julius Jr.', performance: 91, attendance: 94, progress: 88, low: false },
  { name: 'Lico, Trixie Sandra', performance: 87, attendance: 91, progress: 83, low: false },
  { name: 'Mahasol, Jayred Deil', performance: 90, attendance: 92, progress: 86, low: false },
  { name: 'Mandado, Gerard Luis', performance: 88, attendance: 93, progress: 85, low: false },
  { name: 'Muntear, Justine Mhars', performance: 89, attendance: 92, progress: 84, low: false },
  { name: 'Prandas, Jumar', performance: 86, attendance: 89, progress: 82, low: false },
  { name: 'Quitco, Kyle Matthew', performance: 90, attendance: 94, progress: 87, low: false },
  { name: 'Soriano, Darin Jan', performance: 88, attendance: 90, progress: 84, low: false },
  { name: 'Sungahid, Raily', performance: 87, attendance: 91, progress: 83, low: false },
  { name: 'Tacatani, Dominic', performance: 100, attendance: 100, progress: 100, low: false },
  { name: 'Tampepe, Prince Christian', performance: 90, attendance: 94, progress: 88, low: false },
  { name: 'Tumungha, Hara Alexa', performance: 88, attendance: 92, progress: 85, low: false },
  { name: 'Ugdamin, Willa Mae', performance: 89, attendance: 91, progress: 84, low: false },
  { name: 'Vargas, Harvey', performance: 87, attendance: 90, progress: 82, low: false },
  { name: 'Vergara, Aleah June', performance: 90, attendance: 93, progress: 87, low: false },
  { name: 'Paug, Mart Francesfil', performance: 88, attendance: 92, progress: 85, low: false },
  { name: 'Pegarido, Sol Andrew', performance: 89, attendance: 90, progress: 84, low: false },
  { name: 'Villaflor, Philip Vincent', performance: 91, attendance: 94, progress: 88, low: false },
  { name: 'Nilama, Francis Gary', performance: 88, attendance: 91, progress: 84, low: false },
]

export const schoolOptions = [
  'University of Cebu',
  'University of San Jose Recoletos',
  'University of San Carlos',
  'Cebu Normal University',
  'Cebu Technological University',
  'Cebu Institute of Technology-University',
  'Southwestern University',
]

export const internSchoolByName = {
  'Antopina, John Wrexel': 'University of Cebu',
  'Barluado, Francis Merc': 'University of Cebu',
  'Cabrillos, Dane Kiev': 'Cebu Institute of Technology-University',
  'Cagampang, Emmanuel Jr.': 'Cebu Institute of Technology-University',
  'Casidsid, Twinky': 'University of Cebu',
  'Castrodes, Atilla Hadrian': 'University of Cebu',
  'Damayo, Jholmer': 'University of Cebu',
  'Francisco, Ezzel Jan': 'Cebu Institute of Technology-University',
  'Gelborion, Francis Dave': 'University of Cebu',
  'Inocentes, Jose Danielle': 'University of Cebu',
  'Jumao-as, Andre Daniel': 'University of Cebu',
  'Jusga, Ailyn': 'Cebu Technological University',
  'Lastimosa, Julius Jr.': 'Cebu Technological University',
  'Lico, Trixie Sandra': 'Cebu Institute of Technology-University',
  'Mahasol, Jayred Deil': 'University of Cebu',
  'Mandado, Gerard Luis': 'University of Cebu',
  'Muntear, Justine Mhars': 'University of Cebu',
  'Prandas, Jumar': 'University of Cebu',
  'Quitco, Kyle Matthew': 'Cebu Institute of Technology-University',
  'Soriano, Darin Jan': 'University of Cebu',
  'Sungahid, Raily': 'University of Cebu',
  'Tacatani, Dominic': 'University of Cebu',
  'Tampepe, Prince Christian': 'Cebu Technological University',
  'Tumungha, Hara Alexa': 'Cebu Institute of Technology-University',
  'Ugdamin, Willa Mae': 'Cebu Technological University',
  'Vargas, Harvey': 'University of Cebu',
  'Vergara, Aleah June': 'University of Cebu',
  'Paug, Mart Francesfil': 'Cebu Institute of Technology-University',
  'Pegarido, Sol Andrew': 'Cebu Institute of Technology-University',
  'Villaflor, Philip Vincent': 'Cebu Institute of Technology-University',
  'Nilama, Francis Gary': 'Cebu Institute of Technology-University',
}

export const internProfileByName = {
  'Antopina, John Wrexel': { gender: 'Male', course: 'BS Information Technology', contact: '0962-602-4717', email: 'jw.antopina@gmail.com', requiredHours: 540 },
  'Barluado, Francis Merc': { gender: 'Male', course: 'BS Information Technology', contact: '0969-355-2175', email: 'fmbarluado25@gmail.com', requiredHours: 540 },
  'Cabrillos, Dane Kiev': { gender: 'Female', course: 'BS Psychology', contact: '0975-188-7320', email: 'danekiev2003@gmail.com', requiredHours: 200 },
  'Cagampang, Emmanuel Jr.': { gender: 'Male', course: 'BS Information Technology', contact: '0927-787-5247', email: 'orientaleac@gmail.com', requiredHours: 500 },
  'Casidsid, Twinky': { gender: 'Male', course: 'BS Information Technology', contact: '0968-695-7301', email: 'twinkycasidsidx@gmail.com', requiredHours: 540 },
  'Castrodes, Atilla Hadrian': { gender: 'Female', course: 'BS Information Technology', contact: '0956-039-6527', email: 'atillahadrianc@gmail.com', requiredHours: 540 },
  'Damayo, Jholmer': { gender: 'Male', course: 'BS Information Technology', contact: '0951-585-6382', email: 'damayojholmer@gmail.com', requiredHours: 540 },
  'Francisco, Ezzel Jan': { gender: 'Female', course: 'BS Information Technology', contact: '0991-836-1647', email: 'ezzelfrancisco95@gmail.com', requiredHours: 500 },
  'Gelborion, Francis Dave': { gender: 'Male', course: 'BS Information Technology', contact: '0921-854-9562', email: 'gelboriondave@gmail.com', requiredHours: 540 },
  'Inocentes, Jose Danielle': { gender: 'Male', course: 'BS Information Technology', contact: '0915-458-6387', email: 'daniel.inocentes30@gmail.com', requiredHours: 540 },
  'Jumao-as, Andre Daniel': { gender: 'Male', course: 'BS Information Technology', contact: '0917-951-6740', email: 'jumaosandre2003@gmail.com', requiredHours: 540 },
  'Jusga, Ailyn': { gender: 'Female', course: 'BS Information Technology', contact: '0962-537-8473', email: 'ailynjusga99@gmail.com', requiredHours: 250 },
  'Lastimosa, Julius Jr.': { gender: 'Male', course: 'BS Information Technology', contact: '0960-852-1349', email: 'juliusjrclastimosa@gmail.com', requiredHours: 250 },
  'Lico, Trixie Sandra': { gender: 'Female', course: 'BS General Business Management', contact: '0981-491-4545', email: 'licotrixie@gmail.com', requiredHours: 600 },
  'Mahasol, Jayred Deil': { gender: 'Male', course: 'BS Information Technology', contact: '0935-545-2624', email: 'jayredmahasol@gmail.com', requiredHours: 540 },
  'Mandado, Gerard Luis': { gender: 'Male', course: 'BS Information Technology', contact: '0932-506-2156', email: 'gerardmandado@gmail.com', requiredHours: 540 },
  'Muntear, Justine Mhars': { gender: 'Male', course: 'BS Information Technology', contact: '0929-616-1918', email: 'justinemharsmumar@gmail.com', requiredHours: 540 },
  'Prandas, Jumar': { gender: 'Male', course: 'BS Finance', contact: '0960-803-7765', email: 'prandasmarie@gmail.com', requiredHours: 600 },
  'Quitco, Kyle Matthew': { gender: 'Male', course: 'BS Information Technology', contact: '0968-204-9428', email: 'kylequitco3212@gmail.com', requiredHours: 500 },
  'Soriano, Darin Jan': { gender: 'Male', course: 'BS Information Technology', contact: '0968-434-8724', email: 'darinjan13@gmail.com', requiredHours: 540 },
  'Sungahid, Raily': { gender: 'Male', course: 'BS Information Technology', contact: '0927-600-8268', email: 'railysungahid@gmail.com', requiredHours: 540 },
  'Tacatani, Dominic': { gender: 'Male', course: 'BS Information Technology', contact: '0929-289-1124', email: 'dominictacatani123@gmail.com', requiredHours: 540 },
  'Tampepe, Prince Christian': { gender: 'Male', course: 'BS Information Technology', contact: '0931-915-4737', email: 'tadeochristianprince@gmail.com', requiredHours: 729 },
  'Tumungha, Hara Alexa': { gender: 'Female', course: 'BS Information Technology', contact: '0995-489-5471', email: 'haraalexatumungha@gmail.com', requiredHours: 500 },
  'Ugdamin, Willa Mae': { gender: 'Female', course: 'BS Information Technology', contact: '0930-633-4982', email: 'willamaeu@gmail.com', requiredHours: 729 },
  'Vargas, Harvey': { gender: 'Male', course: 'BS Finance', contact: '0956-534-4841', email: 'harveycvargas@gmail.com', requiredHours: 600 },
  'Vergara, Aleah June': { gender: 'Female', course: 'BS Finance', contact: '0954-982-7240', email: 'azeleah1@gmail.com', requiredHours: 600 },
  'Paug, Mart Francesfil': { gender: 'Female', course: 'BS Marketing Management', contact: '0991-587-4770', email: 'pmartfrancesfilromarate@gmail.com', requiredHours: 600 },
  'Pegarido, Sol Andrew': { gender: 'Male', course: 'BS Marketing Management', contact: '0939-650-5683', email: 'solandrewlabadpegarido@gmail.com', requiredHours: 600 },
  'Villaflor, Philip Vincent': { gender: 'Male', course: 'BS Marketing Management', contact: '0968-364-0944', email: 'philsuvilo@gmail.com', requiredHours: 600 },
  'Nilama, Francis Gary': { gender: 'Male', course: 'BS Information Technology', contact: '0910-810-7156', email: 'paenggwapokaayo123@gmail.com', requiredHours: 500 },
}

export const careersTracks = [
  {
    title: 'AI Data Operations',
    details: 'Data annotation, validation, QA, and workflow execution for large-scale AI model pipelines.',
  },
  {
    title: 'Program & Delivery Management',
    details: 'Lead teams, coordinate global execution, manage SLAs, and ensure quality and throughput outcomes.',
  },
  {
    title: 'Data Engineering & Platform',
    details: 'Build and optimize pipelines, automation, reporting, and tools that support enterprise AI delivery.',
  },
  {
    title: 'Corporate & Shared Services',
    details: 'Support growth through HR, finance, legal, compliance, and operations functions.',
  },
]

export const careersSteps = [
  {
    step: '01',
    title: 'Apply',
    details: 'Submit your profile and role preference through our careers intake process.',
  },
  {
    step: '02',
    title: 'Assess',
    details: 'Complete interviews and practical evaluations aligned to role requirements.',
  },
  {
    step: '03',
    title: 'Onboard',
    details: 'Join the team with structured onboarding, tools setup, and role-based training.',
  },
]

export const aboutPrinciples = [
  {
    title: 'Diversity',
    code: 'D',
    details:
      'We celebrate differences in belief, philosophy and ways of life, because they bring unique perspectives and ideas that encourage everyone to move forward.',
    icon: FolderTree,
  },
  {
    title: 'Caring',
    code: 'C',
    details:
      'We care for every person deeply and equally, because without care work becomes meaningless.',
    icon: ShieldCheck,
  },
  {
    title: 'Innovation',
    code: 'I',
    details:
      'Innovation is at the heart of all we do, enriching our lives and challenging us to continually improve ourselves and our service.',
    icon: Sparkles,
  },
  {
    title: 'Integrity',
    code: 'I',
    details:
      'We are dedicated to act ethically and sustainably in everything we do. More than just the bare minimum. It is the basis of our existence as a company.',
    icon: Database,
  },
]

export const aboutStats = [
  { label: 'Global Locations', value: '40+' },
  { label: 'Countries', value: '30+' },
  { label: 'Languages', value: '50+' },
  { label: 'Workforce', value: '56,000+' },
]

export const aboutShowcase = {
  heroImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
  collabImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
}

export const aboutMissionVision = {
  mission: {
    title: 'Our Mission',
    description:
      'To develop and deploy cutting-edge AI technologies that solve real-world problems, empower communities, and advance sustainable practices. We are committed to fostering a culture of innovation, collaborating with stakeholders across sectors, and making a meaningful impact on society and the environment.',
    image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=1400&q=80',
  },
  vision: {
    title: 'Our Vision',
    description:
      'To be the global champion in AI data solutions, igniting a culture of innovation and sustainability that enriches lives and transforms communities worldwide.',
    image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1400&q=80',
  },
}

export const contactChannels = [
  {
    title: 'Email',
    value: 'hr.lifewood@gmail.com',
    href: 'mailto:hr.lifewood@gmail.com',
    icon: Mail,
  },
  {
    title: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
    icon: Phone,
  },
  {
    title: 'Headquarters',
    value: 'Global Delivery Offices',
    href: '#contact-offices',
    icon: MapPin,
  },
]

export const contactOffices = [
  {
    region: 'Asia Pacific',
    city: 'Hong Kong',
    details: 'Program delivery, client operations, and regional coordination hub.',
  },
  {
    region: 'Southeast Asia',
    city: 'Philippines',
    details: 'Large-scale data operations, QA workflows, and managed annotation teams.',
  },
  {
    region: 'South Asia',
    city: 'India',
    details: 'AI operations support, multilingual processing, and rapid scale-up teams.',
  },
]

export const lifewoodWorldwideOffices = [
  { name: 'South Africa', lat: -30.5595, lon: 22.9375, region: 'Africa' },
  { name: 'Madagascar', lat: -18.7669, lon: 46.8691, region: 'Africa' },
  { name: 'China', lat: 35.8617, lon: 104.1954, region: 'Asia' },
  { name: 'Hong Kong', lat: 22.3193, lon: 114.1694, region: 'Asia' },
  { name: 'Japan', lat: 36.2048, lon: 138.2529, region: 'Asia' },
  { name: 'Philippines', lat: 12.8797, lon: 121.774, region: 'Asia' },
  { name: 'Vietnam', lat: 14.0583, lon: 108.2772, region: 'Asia' },
  { name: 'Thailand', lat: 15.87, lon: 100.9925, region: 'Asia' },
  { name: 'Malaysia', lat: 4.2105, lon: 101.9758, region: 'Asia' },
  { name: 'Indonesia', lat: -0.7893, lon: 113.9213, region: 'Asia' },
  { name: 'India', lat: 20.5937, lon: 78.9629, region: 'Asia' },
  { name: 'Bangladesh', lat: 23.685, lon: 90.3563, region: 'Asia' },
  { name: 'Australia', lat: -25.2744, lon: 133.7751, region: 'Oceania' },
  { name: 'Germany', lat: 51.1657, lon: 10.4515, region: 'Europe' },
  { name: 'Finland', lat: 61.9241, lon: 25.7482, region: 'Europe' },
  { name: 'United Kingdom', lat: 55.3781, lon: -3.436, region: 'Europe' },
  { name: 'United States', lat: 37.0902, lon: -95.7129, region: 'Americas' },
  { name: 'Brazil', lat: -14.235, lon: -51.9253, region: 'Americas' },
  { name: 'Africa', lat: 0.7893, lon: 21.0937, region: 'Regional Hub' },
  { name: 'Middle East', lat: 26.8206, lon: 45.0792, region: 'Regional Hub' },
]

export const routeContent = {
  '/careers': {
    title: 'Careers',
    description: 'Join Lifewood teams delivering AI data operations across global markets.',
  },
  '/ai-services': {
    title: 'AI Services',
    description: 'Explore Lifewood AI service capabilities across data annotation and operations.',
  },
  '/ai-projects': {
    title: 'AI Projects',
    description: 'Review selected AI program areas and project delivery tracks.',
  },
  '/type-a-data-servicing': {
    title: 'Type A - Data Servicing',
    description: 'Managed data servicing operations with quality and throughput controls.',
  },
  '/type-b-horizontal-llm-data': {
    title: 'Type B - Horizontal LLM Data',
    description: 'Cross-domain LLM data creation and labeling pipelines for broad model training.',
  },
  '/type-c-vertical-llm-data': {
    title: 'Type C - Vertical LLM Data',
    description: 'Domain-specific LLM datasets built for industry-focused model outcomes.',
  },
  '/type-d-aigc': {
    title: 'Type D - AIGC',
    description: 'Data workflows for generative AI systems and content production loops.',
  },
  '/philanthropy-impact': {
    title: 'Philanthropy & Impact',
    description: 'Programs focused on social impact, inclusion, and sustainable operations.',
  },
  '/contact-us': {
    title: 'Contact Us',
    description: 'Speak with our team about your data operations, AI services, and business inquiries.',
  },
  '/sign-in': {
    title: 'Sign In',
    description: 'Access your Lifewood workspace, projects, and delivery dashboards.',
  },
  '/admin-dashboard': {
    title: 'Admin Dashboard',
    description: 'Monitor delivery performance, tasks, and team activity.',
  },
  '/about-us': {
    title: 'About Us',
    description: 'Learn about Lifewood, our values, and how we deliver global AI data engineering services.',
  },
  '/offices': {
    title: 'Offices',
    description: 'Explore Lifewood regional teams and operational locations.',
  },
  '/internal-news': {
    title: 'Internal News',
    description: 'Latest company updates and operational announcements from Lifewood.',
  },
}

export const buildSeedInternAnalyticsData = () =>
  analyticsInterns.map((intern, index) => ({
    ...intern,
    id: `seed-intern-${index + 1}`,
    email: intern.email || internProfileByName[intern.name]?.email || `intern${index + 1}@lifewood.com`,
    gender: intern.gender || internProfileByName[intern.name]?.gender || 'Male',
    course: intern.course || internProfileByName[intern.name]?.course || 'BS Information Technology',
    contact: intern.contact || internProfileByName[intern.name]?.contact || '09XX-XXX-XXXX',
    requiredHours: intern.requiredHours || internProfileByName[intern.name]?.requiredHours || 540,
    track: intern.track || (index % 3 === 0 ? 'AI Data Operations' : index % 3 === 1 ? 'Quality Assurance' : 'Reporting & PMO'),
    status: intern.status === 'On Leave' ? 'Suspend' : (intern.status || 'Active'),
    mentor: intern.mentor || (index % 2 === 0 ? 'Team Lead A' : 'Team Lead B'),
    joinDate: intern.joinDate || `2026-0${(index % 3) + 1}-${String((index % 27) + 1).padStart(2, '0')}`,
    school: intern.school || internSchoolByName[intern.name] || schoolOptions[0],
  }))

export const seedAnalyticsTaskEntries = [
  { id: 'seed-task-1', internName: 'Cabrillos, Dane Kiev', task: 'Image Label Audit', score: 91, activityType: 'Task', createdAt: '2026-03-10' },
  { id: 'seed-task-2', internName: 'Damayo, Jholmer', task: 'Dataset QA Review', score: 88, activityType: 'Quality Check', createdAt: '2026-03-11' },
  { id: 'seed-task-3', internName: 'Tacatani, Dominic', task: 'Daily Standup Report', score: 100, activityType: 'Activity', createdAt: '2026-03-12' },
]

export const mapInternRowToClient = (row) => ({
  id: row.id,
  name: row.name,
  email: row.email || '',
  gender: row.gender || 'Male',
  course: row.course || 'BS Information Technology',
  contact: row.contact || '',
  requiredHours: row.required_hours || 0,
  school: row.school || schoolOptions[0],
  track: row.track || 'AI Data Operations',
  status: row.status || 'Active',
  mentor: row.mentor || 'Unassigned',
  joinDate: row.join_date || '2026-01-01',
  performance: row.performance ?? 0,
  attendance: row.attendance ?? 0,
  progress: row.progress ?? 0,
  low: Boolean(row.low),
})

export const mapTaskRowToClient = (row) => ({
  id: row.id,
  internName: row.intern_name,
  task: row.task,
  score: row.score,
  activityType: row.activity_type,
  createdAt: row.created_at_date,
})

export const mapSignupRequestRowToClient = (row) => ({
  id: row.id,
  fullName: row.full_name,
  email: row.email,
  phone: row.phone || '',
  department: row.department || '',
  status: row.status,
  adminNote: row.admin_note || '',
  reviewedAt: row.reviewed_at || '',
  createdAt: row.created_at,
})

export const mapCareerApplicationRowToClient = (row) => ({
  id: row.id,
  firstName: row.first_name || '',
  lastName: row.last_name || '',
  email: row.email || '',
  phoneCode: row.phone_code || '',
  phoneNumber: row.phone_number || '',
  gender: row.gender || '',
  age: row.age ?? '',
  country: row.country || '',
  address: row.address || '',
  positions: row.positions || [],
  status: row.status || 'pending',
  hireStatus: row.hire_status || '',
  adminNote: row.admin_note || '',
  interviewScheduledAt: row.interview_scheduled_at || '',
  interviewTimezone: row.interview_timezone || '',
  interviewLocation: row.interview_location || '',
  interviewScheduleSentAt: row.interview_schedule_sent_at || '',
  reviewedAt: row.reviewed_at || '',
  createdAt: row.created_at,
  cvFilename: row.cv_filename || '',
  cvPath: row.cv_path || '',
  cvScore: row.cv_score ?? null,
  cvBreakdown: row.cv_breakdown || null,
  cvSummary: row.cv_summary || '',
  cvScoredAt: row.cv_scored_at || '',
})

export const mapHiredEmployeeRowToClient = (row) => ({
  id: row.id,
  applicationId: row.application_id,
  ownerUserId: row.owner_user_id,
  firstName: row.first_name || '',
  lastName: row.last_name || '',
  email: row.email || '',
  phoneCode: row.phone_code || '',
  phoneNumber: row.phone_number || '',
  gender: row.gender || '',
  age: row.age ?? '',
  country: row.country || '',
  address: row.address || '',
  positions: row.positions || [],
  applicationStatus: row.application_status || '',
  hireStatus: row.hire_status || 'hired',
  hiredAt: row.hired_at || row.created_at || '',
  reviewedBy: row.reviewed_by || '',
  createdAt: row.created_at || '',
  updatedAt: row.updated_at || '',
})

export const mapInquiryRowToClient = (row) => ({
  id: row.id,
  fullName: row.full_name || '',
  workEmail: row.work_email || '',
  companyName: row.company_name || '',
  requirements: row.requirements || '',
  status: row.status || 'new',
  reviewedBy: row.reviewed_by || '',
  createdAt: row.created_at || '',
  updatedAt: row.updated_at || '',
})

export const approvalStatusOrder = {
  pending: 0,
  approved: 1,
  suspended: 2,
  rejected: 3,
}

export const applicationStatusOrder = {
  pending: 0,
  approved: 1,
  'Proceeding to HR Interview': 1,
  rejected: 2,
}

export const emailJsConfig = {
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  templateApproved: import.meta.env.VITE_EMAILJS_TEMPLATE_APPROVED || '',
  templateRejected: import.meta.env.VITE_EMAILJS_TEMPLATE_REJECTED || '',
  templateHireDecision: import.meta.env.VITE_EMAILJS_TEMPLATE_HIRE_DECISION || '',
  fromName: import.meta.env.VITE_EMAILJS_FROM_NAME || 'Lifewood HR',
  replyTo: import.meta.env.VITE_EMAILJS_REPLY_TO || '',
  companyEmail: import.meta.env.VITE_EMAILJS_COMPANY_EMAIL || '',
  companyUrl: import.meta.env.VITE_EMAILJS_COMPANY_URL || '',
  logoUrl: import.meta.env.VITE_EMAILJS_LOGO_URL || '',
}

export const interviewEmailJsConfig = {
  publicKey: import.meta.env.VITE_EMAILJS_INTERVIEW_PUBLIC_KEY || '',
  serviceId: import.meta.env.VITE_EMAILJS_INTERVIEW_SERVICE_ID || '',
  templateId: import.meta.env.VITE_EMAILJS_INTERVIEW_TEMPLATE_ID || '',
  fromName: import.meta.env.VITE_EMAILJS_INTERVIEW_FROM_NAME || import.meta.env.VITE_EMAILJS_FROM_NAME || 'Lifewood HR',
  replyTo: import.meta.env.VITE_EMAILJS_INTERVIEW_REPLY_TO || import.meta.env.VITE_EMAILJS_REPLY_TO || '',
  companyEmail: import.meta.env.VITE_EMAILJS_INTERVIEW_COMPANY_EMAIL || import.meta.env.VITE_EMAILJS_COMPANY_EMAIL || '',
  companyUrl: import.meta.env.VITE_EMAILJS_INTERVIEW_COMPANY_URL || import.meta.env.VITE_EMAILJS_COMPANY_URL || '',
  logoUrl: import.meta.env.VITE_EMAILJS_INTERVIEW_LOGO_URL || import.meta.env.VITE_EMAILJS_LOGO_URL || '',
}

