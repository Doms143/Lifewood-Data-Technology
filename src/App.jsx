import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  ArrowRight,
  X,
  Mail,
  Phone,
  MapPin,
  Clock3,
  Send,
  Building2,
  Mic,
  ImageIcon,
  Video,
  Type,
  ShieldCheck,
  Database,
  Search,
  FolderTree,
  Tags,
  Languages,
  Clapperboard,
  Bot,
  Quote,
} from 'lucide-react'
import Hero from './components/Hero'
import Services from './components/Services'
import Stats from './components/Stats'
import Footer from './components/Footer'
import Navigation from './components/Navigation'
import OurClientsPartners from './components/OurClientsPartners'
import OfficesMap from './components/OfficesMap'

function CountUpStat({ end = 0, suffix = '', duration = 1200, useGrouping = false, start = false }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return

    const target = Number(end) || 0
    const startTime = performance.now()

    let frameId
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))

      if (progress < 1) {
        frameId = requestAnimationFrame(tick)
      }
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [start, end, duration])

  const displayValue = useGrouping ? value.toLocaleString() : String(value)

  return (
    <>
      {displayValue}
      {suffix}
    </>
  )
}

const aiServiceModalities = [
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

const aiServiceCapabilities = [
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

const aiProjectTracks = [
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
      'Powered by AI, Lifewood processes genealogical material at speed and scale, to conserve and illuminate family histories, national archives, corporate lists and records of all types. Lifewood has more than 18 years of experience capturing, scanning and processing genealogical data. In fact, Lifewood started with genealogy data as its core business, so that over the years we have accumulated vast knowledge in diverse types of genealogy indexing.\n\nWe have worked with all the major genealogy companies and have extensive experience in transcribing and indexing genealogical content in a wide variety of formats, including tabular, pre-printed forms and paragraph-style records.\n\nWorking across borders, with offices on every continent, our ability with multi-language projects has built an extensive capability spanning more than 50 languages and associated dialects. Now, powered by AI and the latest inter-office communication systems, we are transforming ever more efficient ways to service our clients, while keeping humanity at the centre of our activity.\n\nGenealogical material that we have experience with includes:\n\nCensus\nVital - BMD\nChurch and Parish Registers\nPassenger Lists\nNaturalisation\nMilitary Records\nLegal Records\nYearbooks',
    image: 'https://images.unsplash.com/photo-1461360228754-6e81c478b882?auto=format&fit=crop&w=1400&q=80',
  },
]

const typeAUseCases = [
  'Multi-language genealogy documents, newspapers, and archives to facilitate global ancestry research',
  'QQ Music of over millions non-Chinese songs and lyrics',
]

const typeAProcess = [
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

const typeBUseCases = [
  'Comprehensive AI data solutions that cover the entire spectrum from data collection and annotation to model testing.',
  'Creating multimodal datasets for deep learning and large language models.',
]

const typeBProcess = [
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

const typeCUseCases = [
  'Autonomous driving and smart cockpit datasets for Driver Monitoring System.',
  'China Merchants Group: enterprise-grade dataset for building "ShipGPT".',
]

const typeCProcess = [
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

const typeDCapabilities = [
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

const typeDVisuals = [
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

const typeDCinematicFrames = [
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

const typeDCinematicVideo = {
  src: '/media/ai-cinematic-scene.mp4',
  poster: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1600&q=80',
}

const typeDStats = [
  { label: 'Multiple Languages', value: 'Multiple' },
  { label: 'Countries Covered', value: '100+' },
]

const philanthropyNarrative = [
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

const philanthropyMapOffices = [
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

const careersValues = [
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

const careersCultureChips = [
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

const adminMenuItems = ['Dashboard', 'Analytics', 'Evaluation', 'Reports', 'Manage Interns']

const adminPanelContent = {
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
}

const analyticsInterns = [
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

const schoolOptions = [
  'University of Cebu',
  'University of San Jose Recoletos',
  'University of San Carlos',
  'Cebu Normal University',
  'Cebu Technological University',
  'Cebu Institute of Technology-University',
  'Southwestern University',
]

const internSchoolByName = {
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

const internProfileByName = {
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

const careersTracks = [
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

const careersSteps = [
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

const aboutPrinciples = [
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

const aboutStats = [
  { label: 'Global Locations', value: '40+' },
  { label: 'Countries', value: '30+' },
  { label: 'Languages', value: '50+' },
  { label: 'Workforce', value: '56,000+' },
]

const aboutShowcase = {
  heroImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
  collabImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
}

const aboutMissionVision = {
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

const contactChannels = [
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

const contactOffices = [
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

const lifewoodWorldwideOffices = [
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

const routeContent = {
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
    description: 'Speak with our team about your data operations, AI services, and delivery requirements.',
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

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/')
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const [activeTypeAProcessIndex, setActiveTypeAProcessIndex] = useState(0)
  const [activeTypeBProcessIndex, setActiveTypeBProcessIndex] = useState(0)
  const [activeTypeCProcessIndex, setActiveTypeCProcessIndex] = useState(0)
  const [activeAboutTab, setActiveAboutTab] = useState('mission')
  const [selectedOfficeRegion, setSelectedOfficeRegion] = useState('All Regions')
  const [selectedPhilanthropyOffice, setSelectedPhilanthropyOffice] = useState(philanthropyMapOffices[0])
  const [officesStatsVisible, setOfficesStatsVisible] = useState(false)
  const [openPhilImpactRow, setOpenPhilImpactRow] = useState(null)
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const [signInError, setSignInError] = useState('')
  const [activeAdminTab, setActiveAdminTab] = useState('Dashboard')
  const [adminNotice, setAdminNotice] = useState('')
  const [internAnalyticsData, setInternAnalyticsData] = useState(() =>
    analyticsInterns.map((intern, index) => ({
      ...intern,
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
  )
  const [selectedAnalyticsIntern, setSelectedAnalyticsIntern] = useState(null)
  const [selectedDashboardGroup, setSelectedDashboardGroup] = useState(null)
  const [analyticsSortBy, setAnalyticsSortBy] = useState('name-asc')
  const [evaluationSortBy, setEvaluationSortBy] = useState('score-desc')
  const [reportsSortBy, setReportsSortBy] = useState('score-desc')
  const [isAdminProfileModalOpen, setIsAdminProfileModalOpen] = useState(false)
  const [adminProfileForm, setAdminProfileForm] = useState({
    firstName: 'Lifewood',
    lastName: 'Admin',
    email: 'admin@lifewood.com',
    phone: '+63 900 000 0000',
  })
  const [editingInternIndex, setEditingInternIndex] = useState(null)
  const [isInternStepperOpen, setIsInternStepperOpen] = useState(false)
  const [internStepperStep, setInternStepperStep] = useState(1)
  const [internStepperError, setInternStepperError] = useState('')
  const [internForm, setInternForm] = useState({
    name: '',
    email: '',
    gender: 'Male',
    course: 'BS Information Technology',
    contact: '',
    requiredHours: '',
    school: schoolOptions[0],
    track: 'AI Data Operations',
    status: 'Active',
    mentor: '',
    joinDate: '',
  })
  const [isAnalyticsTaskModalOpen, setIsAnalyticsTaskModalOpen] = useState(false)
  const [analyticsTaskError, setAnalyticsTaskError] = useState('')
  const [analyticsTaskForm, setAnalyticsTaskForm] = useState({
    internName: '',
    task: '',
    score: '',
    activityType: 'Activity',
  })
  const [analyticsTaskEntries, setAnalyticsTaskEntries] = useState([
    { id: 'seed-1', internName: 'Cabrillos, Dane Kiev', task: 'Image Label Audit', score: 91, activityType: 'Task', createdAt: '2026-03-10' },
    { id: 'seed-2', internName: 'Damayo, Jholmer', task: 'Dataset QA Review', score: 88, activityType: 'Quality Check', createdAt: '2026-03-11' },
    { id: 'seed-3', internName: 'Tacatani, Dominic', task: 'Daily Standup Report', score: 100, activityType: 'Activity', createdAt: '2026-03-12' },
  ])
  const [analyticsSearch, setAnalyticsSearch] = useState('')
  const [evaluationSearch, setEvaluationSearch] = useState('')
  const [reportsSearch, setReportsSearch] = useState('')
  const [settingsSearch, setSettingsSearch] = useState('')
  const [settingsStatusFilter, setSettingsStatusFilter] = useState('All')
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem('lw_admin_auth') === '1'
  })

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname || '/')
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    if (
      !selectedAnalyticsIntern &&
      !selectedDashboardGroup &&
      !isAdminProfileModalOpen &&
      !isInternStepperOpen &&
      !isAnalyticsTaskModalOpen
    ) {
      return undefined
    }
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      setSelectedAnalyticsIntern(null)
      setSelectedDashboardGroup(null)
      setIsAdminProfileModalOpen(false)
      setIsInternStepperOpen(false)
      setIsAnalyticsTaskModalOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedAnalyticsIntern, selectedDashboardGroup, isAdminProfileModalOpen, isInternStepperOpen, isAnalyticsTaskModalOpen])

  useEffect(() => {
    if (!isInternStepperOpen) {
      setInternStepperError('')
    }
  }, [isInternStepperOpen])

  useEffect(() => {
    if (!isAnalyticsTaskModalOpen) {
      setAnalyticsTaskError('')
    }
  }, [isAnalyticsTaskModalOpen])

  useEffect(() => {
    if (!['Analytics', 'Evaluation', 'Reports'].includes(activeAdminTab) && selectedAnalyticsIntern) {
      setSelectedAnalyticsIntern(null)
    }
  }, [activeAdminTab, selectedAnalyticsIntern])

  useEffect(() => {
    if (activeAdminTab !== 'Analytics' && isAnalyticsTaskModalOpen) {
      setIsAnalyticsTaskModalOpen(false)
    }
  }, [activeAdminTab, isAnalyticsTaskModalOpen])

  useEffect(() => {
    if (activeAdminTab !== 'Dashboard' && selectedDashboardGroup) {
      setSelectedDashboardGroup(null)
    }
  }, [activeAdminTab, selectedDashboardGroup])

  useEffect(() => {
    if (!selectedAnalyticsIntern) return
    const exists = internAnalyticsData.some((intern) => intern.name === selectedAnalyticsIntern.name)
    if (!exists) setSelectedAnalyticsIntern(null)
  }, [internAnalyticsData, selectedAnalyticsIntern])

  const goToPath = (path) => {
    if (!path || path === currentPath) return
    window.history.pushState({}, '', path)
    setCurrentPath(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (sectionId) => {
    const scroll = () => {
      const section = document.getElementById(sectionId)
      if (!section) return
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    if (currentPath !== '/') {
      window.history.pushState({}, '', '/')
      setCurrentPath('/')
      setTimeout(scroll, 30)
      return
    }

    scroll()
  }

  const scrollToLocalAnchor = (anchorId) => {
    const target = document.getElementById(anchorId)
    if (!target) return
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const officeRegions = useMemo(() => {
    const counts = lifewoodWorldwideOffices.reduce((acc, office) => {
      acc[office.region] = (acc[office.region] || 0) + 1
      return acc
    }, {})

    return [
      { region: 'All Regions', count: lifewoodWorldwideOffices.length },
      ...Object.entries(counts).map(([region, count]) => ({ region, count })),
    ]
  }, [])

  const officesForSelectedRegion = useMemo(() => {
    if (selectedOfficeRegion === 'All Regions') return lifewoodWorldwideOffices
    return lifewoodWorldwideOffices.filter((office) => office.region === selectedOfficeRegion)
  }, [selectedOfficeRegion])

  const activeTypeAProcess = typeAProcess[activeTypeAProcessIndex] || typeAProcess[0]
  const selectTypeAProcess = (index) => {
    if (index < 0 || index >= typeAProcess.length) return
    setActiveTypeAProcessIndex(index)
  }
  const activeTypeBProcess = typeBProcess[activeTypeBProcessIndex] || typeBProcess[0]
  const selectTypeBProcess = (index) => {
    if (index < 0 || index >= typeBProcess.length) return
    setActiveTypeBProcessIndex(index)
  }
  const activeTypeCProcess = typeCProcess[activeTypeCProcessIndex] || typeCProcess[0]
  const selectTypeCProcess = (index) => {
    if (index < 0 || index >= typeCProcess.length) return
    setActiveTypeCProcessIndex(index)
  }

  const careersSlotColumns = useMemo(() => {
    const shuffle = (array) => {
      const arr = [...array]
      for (let i = arr.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
      }
      return arr
    }

    return [
      { chips: shuffle(careersCultureChips), speed: '14s' },
      { chips: shuffle(careersCultureChips), speed: '18s' },
      { chips: shuffle(careersCultureChips), speed: '16s' },
    ]
  }, [])

  const totalInterns = internAnalyticsData.length
  const presentInterns = useMemo(() => internAnalyticsData.filter((intern) => intern.attendance >= 90), [internAnalyticsData])
  const leaveInterns = useMemo(() => internAnalyticsData.filter((intern) => intern.low), [internAnalyticsData])
  const lateInterns = useMemo(() => internAnalyticsData.filter((intern) => intern.attendance < 85), [internAnalyticsData])

  const birthdayInterns = useMemo(
    () =>
      [
        { name: internAnalyticsData[4]?.name, date: '07 Mar 2026' },
        { name: internAnalyticsData[11]?.name, date: '14 Mar 2026' },
      ].filter((item) => item.name),
    [internAnalyticsData]
  )

  const dashboardAttendanceRows = useMemo(
    () =>
      internAnalyticsData.slice(0, 8).map((intern, index) => ({
        name: intern.name,
        id: String(index + 1).padStart(2, '0'),
        checkin: `09:${String(index + 1).padStart(2, '0')} AM`,
        checkout: '-',
      })),
    [internAnalyticsData]
  )
  const presentPercent = totalInterns ? Math.round((presentInterns.length / totalInterns) * 100) : 0
  const leavePercent = totalInterns ? Math.round((leaveInterns.length / totalInterns) * 100) : 0
  const latePercent = totalInterns ? Math.round((lateInterns.length / totalInterns) * 100) : 0
  const averagePerformance = totalInterns
    ? Math.round(internAnalyticsData.reduce((sum, intern) => sum + intern.performance, 0) / totalInterns)
    : 0
  const averageAttendance = totalInterns
    ? Math.round(internAnalyticsData.reduce((sum, intern) => sum + intern.attendance, 0) / totalInterns)
    : 0
  const averageProgress = totalInterns
    ? Math.round(internAnalyticsData.reduce((sum, intern) => sum + intern.progress, 0) / totalInterns)
    : 0

  const getInternBreakdown = (intern) => {
    const activities = Math.round(intern.progress * 0.5 + intern.attendance * 0.2 + intern.performance * 0.3)
    const tasks = Math.round(intern.progress * 0.6 + intern.performance * 0.4)
    const quality = Math.round(intern.performance * 0.75 + intern.attendance * 0.25)
    const collaboration = Math.round((intern.performance + intern.attendance) / 2)
    const consistency = Math.round((intern.attendance + intern.progress) / 2)
    const evalScore = Math.round(intern.performance * 0.4 + intern.attendance * 0.3 + intern.progress * 0.3)
    return { activities, tasks, quality, collaboration, consistency, evalScore }
  }

  const sortInternList = (list, sortBy, scoreSelector = null) => {
    const sorted = [...list]
    sorted.sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name)
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name)
      if (sortBy === 'performance-desc') return b.performance - a.performance
      if (sortBy === 'attendance-desc') return b.attendance - a.attendance
      if (sortBy === 'progress-desc') return b.progress - a.progress
      if (sortBy === 'score-asc' && scoreSelector) return scoreSelector(a) - scoreSelector(b)
      if (sortBy === 'score-desc' && scoreSelector) return scoreSelector(b) - scoreSelector(a)
      return 0
    })
    return sorted
  }

  const normalizeInternStatus = (status) => {
    if (!status) return 'Active'
    if (status === 'On Leave') return 'Suspend'
    return status
  }

  const getInternStatusLabel = (status) => {
    const normalized = normalizeInternStatus(status)
    return normalized === 'Suspend' ? 'Suspended' : normalized
  }

  const analyticsInternRows = useMemo(() => sortInternList(internAnalyticsData, analyticsSortBy), [internAnalyticsData, analyticsSortBy])
  const evaluationInternRows = useMemo(
    () => sortInternList(internAnalyticsData, evaluationSortBy, (intern) => getInternBreakdown(intern).evalScore),
    [internAnalyticsData, evaluationSortBy]
  )
  const reportInternRows = useMemo(
    () => sortInternList(internAnalyticsData, reportsSortBy, (intern) => getInternBreakdown(intern).evalScore),
    [internAnalyticsData, reportsSortBy]
  )
  const evaluationInsights = useMemo(
    () =>
      evaluationInternRows.map((intern) => {
        const detail = getInternBreakdown(intern)
        const score = detail.evalScore
        const band = score >= 92 ? 'Excellent' : score >= 85 ? 'Strong' : score >= 75 ? 'Stable' : 'Needs Support'
        const risk =
          score >= 90 ? 'Low Risk' : score >= 82 ? 'Watchlist' : score >= 72 ? 'Coaching Required' : 'Immediate Intervention'
        const recommendation =
          score >= 90
            ? 'Keep in advanced tasks and mentorship pipeline.'
            : score >= 82
              ? 'Increase technical stretch tasks and weekly checkpoints.'
              : score >= 72
                ? 'Assign guided practice, QA shadowing, and daily follow-ups.'
                : 'Start a two-week performance recovery plan with mentor reviews.'
        return {
          ...intern,
          score,
          band,
          risk,
          recommendation,
          reviewDate: `2026-03-${String((intern.name.length % 22) + 5).padStart(2, '0')}`,
          detail,
        }
      }),
    [evaluationInternRows]
  )
  const reportInsights = useMemo(
    () =>
      reportInternRows.map((intern) => {
        const detail = getInternBreakdown(intern)
        const score = detail.evalScore
        const completedTasks = Math.round((intern.progress / 100) * 42)
        const qaPassRate = Math.round((detail.quality * 0.65 + intern.performance * 0.35))
        const attendanceFlag = intern.attendance < 85 ? 'At Risk' : intern.attendance < 92 ? 'Watch' : 'Healthy'
        return {
          ...intern,
          score,
          completedTasks,
          qaPassRate,
          attendanceFlag,
          trend: score >= 90 ? 'Rising' : score >= 80 ? 'Stable' : 'Declining',
          detail,
        }
      }),
    [reportInternRows]
  )
  const filteredAnalyticsRows = useMemo(() => {
    const query = analyticsSearch.trim().toLowerCase()
    if (!query) return analyticsInternRows
    return analyticsInternRows.filter((intern) => {
      const source = `${intern.name} ${intern.email || ''} ${intern.track || ''} ${intern.school || ''} ${intern.course || ''} ${intern.gender || ''} ${intern.contact || ''}`.toLowerCase()
      return source.includes(query)
    })
  }, [analyticsInternRows, analyticsSearch])
  const filteredEvaluationInsights = useMemo(() => {
    const query = evaluationSearch.trim().toLowerCase()
    if (!query) return evaluationInsights
    return evaluationInsights.filter((intern) => {
      const source = `${intern.name} ${intern.email || ''} ${intern.track || ''} ${intern.status || ''} ${intern.school || ''} ${intern.course || ''} ${intern.gender || ''} ${intern.contact || ''}`.toLowerCase()
      return source.includes(query)
    })
  }, [evaluationInsights, evaluationSearch])
  const filteredReportInsights = useMemo(() => {
    const query = reportsSearch.trim().toLowerCase()
    if (!query) return reportInsights
    return reportInsights.filter((intern) => {
      const source = `${intern.name} ${intern.email || ''} ${intern.track || ''} ${intern.status || ''} ${intern.school || ''} ${intern.course || ''} ${intern.gender || ''} ${intern.contact || ''}`.toLowerCase()
      return source.includes(query)
    })
  }, [reportInsights, reportsSearch])
  const settingsInternRows = useMemo(() => {
    const query = settingsSearch.trim().toLowerCase()
    return internAnalyticsData
      .map((intern, sourceIndex) => ({ ...intern, sourceIndex }))
      .filter((intern) => {
        const passSearch =
          !query ||
          intern.name.toLowerCase().includes(query) ||
          (intern.email || '').toLowerCase().includes(query) ||
          (intern.track || '').toLowerCase().includes(query) ||
          (intern.school || '').toLowerCase().includes(query) ||
          (intern.course || '').toLowerCase().includes(query) ||
          (intern.gender || '').toLowerCase().includes(query) ||
          (intern.contact || '').toLowerCase().includes(query) ||
          String(intern.requiredHours || '').includes(query)
        const passStatus = settingsStatusFilter === 'All' || normalizeInternStatus(intern.status) === settingsStatusFilter
        return passSearch && passStatus
      })
  }, [internAnalyticsData, settingsSearch, settingsStatusFilter])

  const pageData = useMemo(() => routeContent[currentPath], [currentPath])
  const isAdminRoute = currentPath === '/admin-dashboard'
  const isCareersRoute = currentPath === '/careers'
  const activeAdminData = adminPanelContent[activeAdminTab] || adminPanelContent.Dashboard

  const handleSignIn = (event) => {
    event.preventDefault()
    const email = signInEmail.trim()
    const password = signInPassword
    if (email === 'test123@gmail.com' && password === '123') {
      setSignInError('')
      setIsAdminAuthenticated(true)
      window.localStorage.setItem('lw_admin_auth', '1')
      goToPath('/admin-dashboard')
      return
    }
    setSignInError('Invalid credentials. Use work email: test123@gmail.com and password: 123.')
  }

  const handleAdminSignOut = () => {
    setIsAdminAuthenticated(false)
    window.localStorage.removeItem('lw_admin_auth')
    goToPath('/sign-in')
  }

  const runAdminAction = (message) => {
    setAdminNotice(message)
    window.setTimeout(() => setAdminNotice(''), 1800)
  }

  const openAnalyticsTaskModal = () => {
    const defaultIntern = internAnalyticsData[0]?.name || ''
    setAnalyticsTaskForm({
      internName: defaultIntern,
      task: '',
      score: '',
      activityType: 'Activity',
    })
    setAnalyticsTaskError('')
    setIsAnalyticsTaskModalOpen(true)
  }

  const handleAnalyticsTaskSave = (event) => {
    event.preventDefault()
    const task = analyticsTaskForm.task.trim()
    const internName = analyticsTaskForm.internName.trim()
    const scoreValue = Number(analyticsTaskForm.score)

    if (!internName) {
      setAnalyticsTaskError('Please select an intern.')
      return
    }
    if (!task) {
      setAnalyticsTaskError('Task name is required.')
      return
    }
    if (!Number.isFinite(scoreValue) || scoreValue < 0 || scoreValue > 100) {
      setAnalyticsTaskError('Score must be between 0 and 100.')
      return
    }

    const today = new Date().toISOString().slice(0, 10)
    const entry = {
      id: `task-${Date.now()}`,
      internName,
      task,
      score: Math.round(scoreValue),
      activityType: analyticsTaskForm.activityType || 'Activity',
      createdAt: today,
    }

    setAnalyticsTaskEntries((prev) => [entry, ...prev].slice(0, 40))
    setIsAnalyticsTaskModalOpen(false)
    setAnalyticsTaskError('')
    runAdminAction(`Task added for ${internName}`)
  }

  const handleAdminProfileSave = (event) => {
    event.preventDefault()
    if (!adminProfileForm.firstName.trim() || !adminProfileForm.lastName.trim()) {
      runAdminAction('First and last name are required')
      return
    }
    if (!adminProfileForm.email.trim() || !adminProfileForm.email.includes('@')) {
      runAdminAction('Please provide a valid email')
      return
    }
    setIsAdminProfileModalOpen(false)
    runAdminAction('Admin profile updated')
  }

  const resetInternForm = () => {
    setInternForm({
      name: '',
      email: '',
      gender: 'Male',
      course: 'BS Information Technology',
      contact: '',
      requiredHours: '',
      school: schoolOptions[0],
      track: 'AI Data Operations',
      status: 'Active',
      mentor: '',
      joinDate: '',
    })
    setEditingInternIndex(null)
    setInternStepperStep(1)
    setInternStepperError('')
  }

  const openInternStepperForCreate = () => {
    resetInternForm()
    setIsInternStepperOpen(true)
  }

  const validateInternStepperStep = (step) => {
    setInternStepperError('')
    if (step === 1) {
      const trimmedName = internForm.name.trim()
      const trimmedEmail = internForm.email.trim().toLowerCase()
      if (!trimmedName) {
        setInternStepperError('Intern name is required.')
        return false
      }
      if (!trimmedEmail || !trimmedEmail.includes('@')) {
        setInternStepperError('Valid intern email is required.')
        return false
      }
    }
    if (step === 2) {
      const trimmedContact = internForm.contact.trim()
      if (!internForm.gender) {
        setInternStepperError('Gender is required.')
        return false
      }
      if (!internForm.course.trim()) {
        setInternStepperError('Course / educational background is required.')
        return false
      }
      if (!trimmedContact) {
        setInternStepperError('Contact number is required.')
        return false
      }
    }
    if (step === 3) {
      const hours = Number(internForm.requiredHours)
      if (!Number.isFinite(hours) || hours <= 0) {
        setInternStepperError('Required hours must be greater than 0.')
        return false
      }
    }
    return true
  }

  const handleInternSave = (event) => {
    event.preventDefault()
    setInternStepperError('')
    const trimmedName = internForm.name.trim()
    const trimmedEmail = internForm.email.trim().toLowerCase()
    if (!trimmedName) {
      setInternStepperError('Intern name is required.')
      return
    }
    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setInternStepperError('Valid intern email is required.')
      return
    }
    if (!internForm.contact.trim()) {
      setInternStepperError('Contact number is required.')
      return
    }
    if (!internForm.course.trim()) {
      setInternStepperError('Course / educational background is required.')
      return
    }
    const requiredHoursValue = Number(internForm.requiredHours)
    if (!Number.isFinite(requiredHoursValue) || requiredHoursValue <= 0) {
      setInternStepperError('Required hours must be greater than 0.')
      return
    }

    const statusBase = {
      Active: { performance: 86, attendance: 92, progress: 88 },
      Complete: { performance: 93, attendance: 95, progress: 94 },
      Suspend: { performance: 74, attendance: 68, progress: 70 },
    }
    const base = statusBase[internForm.status] || statusBase.Active
    const seededOffset = Math.abs(trimmedName.length % 5) - 2
    const metrics = {
      performance: Math.max(45, Math.min(100, base.performance + seededOffset)),
      attendance: Math.max(40, Math.min(100, base.attendance + seededOffset)),
      progress: Math.max(45, Math.min(100, base.progress + seededOffset)),
    }
    const low = metrics.performance < 65 || metrics.attendance < 70 || metrics.progress < 65

    const payload = {
      name: trimmedName,
      email: trimmedEmail,
      gender: internForm.gender || 'Male',
      course: internForm.course.trim(),
      contact: internForm.contact.trim(),
      requiredHours: requiredHoursValue,
      school: internForm.school || schoolOptions[0],
      track: internForm.track,
      status: normalizeInternStatus(internForm.status),
      mentor: internForm.mentor.trim() || 'Unassigned',
      joinDate: internForm.joinDate || '2026-01-01',
      performance: metrics.performance,
      attendance: metrics.attendance,
      progress: metrics.progress,
      low,
    }

    if (editingInternIndex !== null) {
      setInternAnalyticsData((prev) =>
        prev.map((item, idx) =>
          idx === editingInternIndex
            ? {
                ...item,
                name: payload.name,
                email: payload.email,
                gender: payload.gender,
                course: payload.course,
                contact: payload.contact,
                requiredHours: payload.requiredHours,
                school: payload.school,
                track: payload.track,
                status: payload.status,
                mentor: payload.mentor,
                joinDate: payload.joinDate,
              }
            : item
        )
      )
      runAdminAction(`Updated ${payload.name}`)
    } else {
      setInternAnalyticsData((prev) => [...prev, payload])
      runAdminAction(`Added ${payload.name}`)
    }
    resetInternForm()
    setIsInternStepperOpen(false)
  }

  const handleInternEdit = (index) => {
    const selected = internAnalyticsData[index]
    if (!selected) return
    setEditingInternIndex(index)
    setInternForm({
      name: selected.name,
      email: selected.email || '',
      gender: selected.gender || 'Male',
      course: selected.course || 'BS Information Technology',
      contact: selected.contact || '',
      requiredHours: selected.requiredHours || '',
      school: selected.school || schoolOptions[0],
      track: selected.track || 'AI Data Operations',
      status: normalizeInternStatus(selected.status || 'Active'),
      mentor: selected.mentor || '',
      joinDate: selected.joinDate || '',
    })
    setInternStepperStep(1)
    setIsInternStepperOpen(true)
    runAdminAction(`Editing ${selected.name}`)
  }

  const handleInternDelete = (index) => {
    const selected = internAnalyticsData[index]
    if (!selected) return
    setInternAnalyticsData((prev) => prev.filter((_, idx) => idx !== index))
    if (editingInternIndex === index) {
      resetInternForm()
    } else if (editingInternIndex !== null && editingInternIndex > index) {
      setEditingInternIndex((prev) => (prev !== null ? prev - 1 : null))
    }
    runAdminAction(`Deleted ${selected.name}`)
  }

  const modalityIcon = (title) => {
    if (title === 'Audio') return <Mic className="w-7 h-7 text-castleton" />
    if (title === 'Image') return <ImageIcon className="w-7 h-7 text-castleton" />
    if (title === 'Video') return <Video className="w-7 h-7 text-castleton" />
    return <Type className="w-7 h-7 text-castleton" />
  }

  const capabilityIcon = (title) => {
    if (title === 'Data Validation') return <ShieldCheck className="w-5 h-5" />
    if (title === 'Data Collection') return <Database className="w-5 h-5" />
    if (title === 'Data Acquisition') return <Search className="w-5 h-5" />
    if (title === 'Data Curation') return <FolderTree className="w-5 h-5" />
    return <Tags className="w-5 h-5" />
  }

  const projectListIcon = (title) => {
    if (title.includes('Extraction')) return <Search className="w-4 h-4" />
    if (title.includes('Machine Learning')) return <Database className="w-4 h-4" />
    if (title.includes('Autonomous')) return <ShieldCheck className="w-4 h-4" />
    if (title.includes('Customer Service')) return <Type className="w-4 h-4" />
    if (title.includes('NLP') || title.includes('Speech')) return <Mic className="w-4 h-4" />
    if (title.includes('Computer Vision')) return <ImageIcon className="w-4 h-4" />
    return <FolderTree className="w-4 h-4" />
  }

  if (currentPath !== '/') {
    return (
      <div className="w-full overflow-x-hidden min-h-screen">
        {!isAdminRoute ? <Navigation onNavigate={scrollToSection} onNavigatePath={goToPath} /> : null}
        <main className={`${isAdminRoute ? 'pt-2 pb-0' : isCareersRoute ? 'pt-14 pb-14' : 'pt-20 pb-14'} px-4 sm:px-6 lg:px-8`}>
          {currentPath === '/ai-services' ? (
            <section className="max-w-6xl mx-auto space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.div
                id="ai-overview"
                className="rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="absolute -top-24 -right-10 w-72 h-72 bg-white/55 rounded-full blur-3xl" />
                <p className="text-black font-medium uppercase tracking-[0.14em] text-sm mb-5">AI Data Services</p>
                <h1 className="text-4xl sm:text-5xl font-semibold text-black mb-5">End-to-end AI data solutions</h1>
                <p className="text-black text-lg max-w-4xl mx-auto">
                  Lifewood delivers end-to-end AI data solutions from multi-language collection and annotation to model training
                  and generative AI content. Our global workforce and industrialized methodology support efficient scaling and
                  high-quality domain-specific datasets.
                </p>
                <div className="mt-7 flex flex-wrap gap-3 justify-center">
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Global Workforce</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Multi-language Delivery</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Domain-specialized Data</span>
                </div>
                <div className="mt-7 flex flex-wrap gap-3 justify-center">
                  <button type="button" onClick={() => scrollToLocalAnchor('ai-modalities')} className="focus-brand brand-pill px-4 py-2 text-sm font-semibold">View Modalities</button>
                  <button type="button" onClick={() => scrollToLocalAnchor('ai-video')} className="focus-brand brand-pill px-4 py-2 text-sm font-semibold">Watch Video</button>
                  <button type="button" onClick={() => scrollToLocalAnchor('ai-contact')} className="focus-brand brand-pill px-4 py-2 text-sm font-semibold">Contact Team</button>
                </div>
              </motion.div>

              <motion.section
                id="ai-modalities"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.04 }}
              >
                <div className="modalities-fade-shell mt-2 sm:mt-3 overflow-hidden rounded-3xl">
                  <div className="modalities-loop-track py-1">
                    {[...aiServiceModalities, ...aiServiceModalities].map((item, index) => (
                    <motion.article
                      key={`${item.title}-${index}`}
                      className="w-[278px] sm:w-[306px] shrink-0 rounded-[28px] border border-castleton/20 bg-[#f7f8f7] p-4 sm:p-5 shadow-soft"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: 0.02 }}
                    >
                      <div className="relative overflow-hidden rounded-[20px] h-36 sm:h-40">
                        <img src={item.image} alt={`${item.title} data services`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-castleton/55 to-transparent" />
                        <div className="absolute left-3 bottom-3 w-12 h-12 rounded-xl bg-white border border-castleton/15 flex items-center justify-center">
                          {modalityIcon(item.title)}
                        </div>
                      </div>
                      <h3 className="text-2xl sm:text-[2rem] leading-[1.02] font-medium text-black mt-4 mb-2">{item.title}</h3>
                      <p className="text-black text-[1.05rem] leading-[1.4]">{item.details}</p>
                      <span className="block w-12 h-1 rounded-full bg-saffron mt-4" />
                    </motion.article>
                  ))}
                  </div>
                </div>
              </motion.section>

              <motion.section
                id="ai-video"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.12 }}
              >
                <div className="relative w-full overflow-hidden rounded-2xl border border-castleton/20 bg-black" style={{ paddingTop: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/g_JvAVL0WY4?start=1"
                    title="Lifewood AI Data Services Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </motion.section>

              <motion.div
                id="ai-solutions"
                className="rounded-3xl p-8 sm:p-10 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <motion.div
                  className="absolute left-8 top-8 w-28 h-28 rounded-full bg-castleton/10 blur-2xl pointer-events-none"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute right-10 bottom-12 w-32 h-32 rounded-full bg-saffron/20 blur-2xl pointer-events-none"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="text-center mb-8">
                  <p className="text-base sm:text-lg text-black mb-4 inline-flex items-center gap-2.5">
                    <Sparkles className="w-[18px] h-[18px] text-castleton" />
                    <span>Why brands trust us</span>
                  </p>
                  <h2 className="text-4xl sm:text-6xl leading-[1.02] font-medium text-black">
                    Comprehensive
                    <br />
                    Data Solutions
                  </h2>
                  <button
                    type="button"
                    onClick={() => goToPath('/contact-us')}
                    className="focus-brand inline-flex items-center gap-3 mt-6 text-lg sm:text-xl text-black hover:text-castleton transition-colors"
                  >
                    <span>Get started</span>
                    <span className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center">
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  {aiServiceCapabilities.slice(0, 3).map((item, index) => (
                    <motion.article
                      key={item.title}
                      className="group bg-[#f3f3f3] text-black rounded-3xl p-7 sm:p-9 min-h-[260px] interactive-card"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.26 + index * 0.05 }}
                      whileHover={{ y: -6, scale: 1.01 }}
                    >
                      <div className="relative overflow-hidden rounded-2xl h-36 mb-5 border border-castleton/15">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                      </div>
                      <motion.span
                        className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-castleton text-white mb-4"
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.15 }}
                      >
                        {capabilityIcon(item.title)}
                      </motion.span>
                      <h3 className="text-3xl sm:text-4xl font-medium mb-5 text-black">{item.title}</h3>
                      <p className="text-black text-lg leading-relaxed">{item.details}</p>
                    </motion.article>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6">
                  {aiServiceCapabilities.slice(3).map((item, index) => (
                    <motion.article
                      key={item.title}
                      className="group bg-[#f3f3f3] text-black rounded-3xl p-7 sm:p-9 interactive-card"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.06 }}
                      whileHover={{ y: -6, scale: 1.01 }}
                    >
                      <div className="relative overflow-hidden rounded-2xl h-36 mb-5 border border-castleton/15">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                      </div>
                      <motion.span
                        className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-castleton text-white mb-4"
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 + index * 0.15 }}
                      >
                        {capabilityIcon(item.title)}
                      </motion.span>
                      <h3 className="text-3xl font-medium mb-4">{item.title}</h3>
                      <p className="text-black text-lg leading-relaxed">{item.details}</p>
                    </motion.article>
                  ))}
                </div>
                <p className="mt-8 text-lg text-black font-medium">
                  We provide global Data Engineering Services to enable AI Solutions.
                </p>
              </motion.div>

              <motion.section
                id="ai-contact"
                className="mt-8 bg-serpent border border-castleton/35 rounded-[32px] p-6 sm:p-7 lg:p-9 text-white relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-castleton/45 blur-3xl" />
                <div className="relative">
                  <img
                    src="https://framerusercontent.com/images/Ca8ppNsvJIfTsWEuHr50gvkDow.png"
                    alt="Lifewood logo"
                    className="h-8 sm:h-9 w-auto mb-5"
                  />
                  <p className="text-lg sm:text-2xl font-medium leading-tight mb-8 max-w-3xl">
                    We provide global Data Engineering Services to enable AI Solutions.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                    <div>
                      <button
                        type="button"
                        onClick={() => goToPath('/contact-us')}
                        className="focus-brand mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/12 px-6 py-2 text-lg sm:text-xl font-bold text-[#e7edd8] hover:bg-white/20 transition-colors"
                      >
                        Contact Us
                      </button>
                      <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Privacy Policy</a>
                        <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Policy</a>
                        <a href="https://www.termsfeed.com/live/terms-and-conditions" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Terms and Conditions</a>
                        <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Settings</a>
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <p className="text-base sm:text-lg mb-4">Find Us On:</p>
                      <div className="flex flex-wrap lg:justify-end gap-3 mb-6">
                        <a href="https://www.linkedin.com/company/lifewood-data-technology-ltd./posts/?feedView=all" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Linkedin className="w-4 h-4" /></a>
                        <a href="https://www.facebook.com/LifewoodPH/" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Facebook className="w-4 h-4" /></a>
                        <a href="https://www.instagram.com/lifewood_official/?hl=af" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Instagram className="w-4 h-4" /></a>
                        <a href="https://www.youtube.com/@LifewoodDataTechnology" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Youtube className="w-4 h-4" /></a>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                        <p className="text-lg sm:text-xl font-medium">&copy; 2026 Lifewood - All Rights Reserved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </section>
          ) : currentPath === '/careers' ? (
            <section className="max-w-6xl mx-auto space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.section
                id="careers-overview"
                className="rounded-3xl p-8 sm:p-12 lg:p-14 relative overflow-hidden"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[220px]">
                  <motion.div
                    className="lg:col-span-5"
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.06 }}
                  >
                    <h1 className="text-6xl sm:text-7xl lg:text-[78px] tracking-[-0.03em] leading-[0.92] font-semibold text-black">
                      Careers in
                      <br />
                      Lifewood
                    </h1>
                    <motion.button
                      type="button"
                      onClick={() => goToPath('/contact-us')}
                      className="focus-brand mt-8 inline-flex items-center rounded-full overflow-hidden border border-saffron bg-saffron text-black font-semibold"
                      whileHover={{ y: -2, boxShadow: '0 12px 24px -14px rgba(244,179,71,0.9)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="px-5 py-3 text-base">Join Us</span>
                      <span className="px-4 py-3 border-l border-black/15">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </motion.button>
                  </motion.div>

                  <motion.div
                    className="lg:col-span-7 lg:pl-8"
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.1 }}
                  >
                    <p className="text-2xl sm:text-3xl leading-relaxed text-black/90 max-w-3xl">
                      Innovation, adaptability and the rapid development of new services separates companies that constantly
                      deliver at the highest level from their competitors.
                    </p>
                  </motion.div>
                </div>
              </motion.section>

              <motion.section
                id="careers-image"
                className="rounded-[38px] overflow-hidden border border-castleton/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4 }}
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2200&q=80"
                  alt="Lifewood careers team collaboration"
                  className="w-full h-[300px] sm:h-[430px] lg:h-[560px] object-cover"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.45 }}
                />
              </motion.section>

              <motion.section
                id="careers-growth"
                className="p-5 sm:p-7 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.38 }}
              >
                <p className="text-castleton uppercase tracking-[0.14em] text-sm sm:text-base font-medium">
                  Career Culture
                </p>
                <h2 className="text-5xl sm:text-6xl lg:text-7xl tracking-[-0.03em] leading-[0.95] font-semibold text-serpent max-w-5xl mx-auto">
                  It means motivating
                  <br />
                  and growing teams
                </h2>
                <p className="mt-6 text-xl sm:text-2xl leading-relaxed text-black max-w-4xl mx-auto">
                  Teams that can initiate and learn on the run in order to deliver evolving technologies and targets. It&apos;s a
                  big challenge, but innovation, especially across borders, has never been the easy path.
                </p>
                <motion.div
                  className="careers-slot-reel mt-8"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.22 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="careers-slot-grid">
                    {careersSlotColumns.map((column, colIndex) => (
                      <div key={`slot-col-${colIndex}`} className="careers-slot-column">
                        <div
                          className={`careers-slot-track ${colIndex === 1 ? 'careers-slot-track-reverse' : ''}`}
                          style={{
                            '--slot-speed': column.speed,
                            '--slot-delay': `${colIndex * -1.8}s`,
                          }}
                        >
                          {[...column.chips, ...column.chips].map((chip, itemIndex) => (
                            <span key={`slot-${colIndex}-${chip}-${itemIndex}`} className="careers-slot-chip">
                              {chip}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.section>

              <motion.section
                id="careers-closing"
                className="p-6 sm:p-10 text-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35 }}
              >
                <p className="text-2xl sm:text-4xl leading-relaxed text-black max-w-6xl mx-auto">
                  If you&apos;re looking to turn the page on a new chapter in your career make contact with us today. At Lifewood,
                  the adventure is always before you, it&apos;s why we&apos;ve been described as{' '}
                  <span className="text-serpent">&quot;always on, never off.&quot;</span>
                </p>
              </motion.section>

              <motion.section
                id="ai-contact"
                className="mt-8 bg-serpent border border-castleton/35 rounded-[32px] p-6 sm:p-7 lg:p-9 text-white relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-castleton/45 blur-3xl" />
                <div className="relative">
                  <img
                    src="https://framerusercontent.com/images/Ca8ppNsvJIfTsWEuHr50gvkDow.png"
                    alt="Lifewood logo"
                    className="h-8 sm:h-9 w-auto mb-5"
                  />
                  <p className="text-lg sm:text-2xl font-medium leading-tight mb-8 max-w-3xl">
                    We provide global Data Engineering Services to enable AI Solutions.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                    <div>
                      <button
                        type="button"
                        onClick={() => goToPath('/contact-us')}
                        className="focus-brand mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/12 px-6 py-2 text-lg sm:text-xl font-bold text-[#e7edd8] hover:bg-white/20 transition-colors"
                      >
                        Contact Us
                      </button>
                      <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Privacy Policy</a>
                        <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Policy</a>
                        <a href="https://www.termsfeed.com/live/terms-and-conditions" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Terms and Conditions</a>
                        <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Settings</a>
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <p className="text-base sm:text-lg mb-4">Find Us On:</p>
                      <div className="flex flex-wrap lg:justify-end gap-3 mb-6">
                        <a href="https://www.linkedin.com/company/lifewood-data-technology-ltd./posts/?feedView=all" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Linkedin className="w-4 h-4" /></a>
                        <a href="https://www.facebook.com/LifewoodPH/" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Facebook className="w-4 h-4" /></a>
                        <a href="https://www.instagram.com/lifewood_official/?hl=af" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Instagram className="w-4 h-4" /></a>
                        <a href="https://www.youtube.com/@LifewoodDataTechnology" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Youtube className="w-4 h-4" /></a>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                        <p className="text-lg sm:text-xl font-medium">&copy; 2026 Lifewood - All Rights Reserved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </section>
          ) : currentPath === '/type-a-data-servicing' ? (
            <section className="max-w-6xl mx-auto space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.div
                id="type-a-overview"
                className="rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="absolute -top-24 -right-10 w-72 h-72 bg-white/55 rounded-full blur-3xl" />
                <p className="text-black font-medium uppercase tracking-[0.14em] text-sm mb-5">Type A - Data Servicing</p>
                <h1 className="text-4xl sm:text-5xl font-semibold text-black mb-5">Data services built for scale and quality</h1>
                <p className="text-black text-lg max-w-4xl mx-auto">
                  Lifewood provides Type A Data Servicing through end-to-end document scanning, AI-powered data extraction,
                  and structured database delivery. The workflow is designed for high-volume operations while maintaining
                  precision and consistency through quality assurance.
                </p>
                <div className="mt-7 flex flex-wrap gap-3 justify-center">
                  <span className="brand-pill px-4 py-2 text-sm font-medium">AI Data Extraction</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Multi-language Support</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Scalable Operations</span>
                </div>
              </motion.div>

              <motion.section
                id="type-a-examples"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.04 }}
              >
                <h2 className="text-3xl sm:text-4xl font-medium mb-5">Use Cases</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {typeAUseCases.map((item, index) => (
                    <motion.article
                      key={item}
                      className="bg-[#f3f3f3] text-black rounded-3xl p-7 sm:p-9 interactive-card"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, delay: 0.08 + index * 0.06 }}
                    >
                      <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-castleton text-white mb-4">
                        {index === 0 ? <FolderTree className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                      </span>
                      <p className="text-black text-lg leading-relaxed">{item}</p>
                    </motion.article>
                  ))}
                </div>
              </motion.section>

              <motion.section
                id="type-a-process"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
              >
                <h2 className="text-[38px] sm:text-[46px] leading-none font-semibold tracking-[-0.02em] uppercase mb-7">Type A- Data Servicing</h2>
                <div className="type-a-folder-stack">
                  <div className="grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-4 sm:gap-6 items-stretch">
                    <AnimatePresence mode="wait">
                      <motion.article
                        key={`copy-${activeTypeAProcess.step}`}
                        className="type-a-folder-content"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.22 }}
                      >
                        <p className="mt-2 text-xs uppercase tracking-[0.12em] text-castleton/80 mb-3">Workflow Stage</p>
                        <div className="type-a-heading-row">
                          <h3 className="type-a-heading-step">{activeTypeAProcess.step}</h3>
                          <h4 className="type-a-heading-title">{activeTypeAProcess.title}</h4>
                        </div>
                        <p className="type-a-heading-description">{activeTypeAProcess.details}</p>
                      </motion.article>
                    </AnimatePresence>

                    <div className="type-a-folder-image-shell rounded-3xl border border-castleton/20">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={`image-${activeTypeAProcess.step}`}
                          src={activeTypeAProcess.image}
                          alt={`${activeTypeAProcess.title} visual`}
                          className="type-a-folder-main-image w-full h-full object-cover"
                          initial={{ opacity: 0.25, scale: 1.03 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0.2, scale: 1.03 }}
                          transition={{ duration: 0.24 }}
                        />
                      </AnimatePresence>
                      <div className="absolute inset-0 bg-gradient-to-t from-serpent/38 via-transparent to-transparent" />
                    </div>
                  </div>

                  <div className="type-a-selector-shell">
                    <div className="type-a-selector-list" role="tablist" aria-label="Type A process selectors">
                      {typeAProcess.map((item, index) => {
                        const isActive = activeTypeAProcess.step === item.step
                        return (
                          <button
                            key={item.step}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onMouseEnter={() => selectTypeAProcess(index)}
                            onFocus={() => selectTypeAProcess(index)}
                            onClick={() => selectTypeAProcess(index)}
                            className={`focus-brand type-a-selector-item ${isActive ? 'type-a-selector-item-active' : ''}`}
                          >
                            <span className="type-a-selector-index">{item.step}</span>
                            <span className="type-a-selector-label">{item.title.toUpperCase()}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </motion.section>

              <motion.section
                id="ai-contact"
                className="mt-8 bg-serpent border border-castleton/35 rounded-[32px] p-6 sm:p-7 lg:p-9 text-white relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-castleton/45 blur-3xl" />
                <div className="relative">
                  <img
                    src="https://framerusercontent.com/images/Ca8ppNsvJIfTsWEuHr50gvkDow.png"
                    alt="Lifewood logo"
                    className="h-8 sm:h-9 w-auto mb-5"
                  />
                  <p className="text-lg sm:text-2xl font-medium leading-tight mb-8 max-w-3xl">
                    We provide global Data Engineering Services to enable AI Solutions.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                    <div>
                      <button
                        type="button"
                        onClick={() => goToPath('/contact-us')}
                        className="focus-brand mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/12 px-6 py-2 text-lg sm:text-xl font-bold text-[#e7edd8] hover:bg-white/20 transition-colors"
                      >
                        Contact Us
                      </button>
                      <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Privacy Policy</a>
                        <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Policy</a>
                        <a href="https://www.termsfeed.com/live/terms-and-conditions" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Terms and Conditions</a>
                        <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Settings</a>
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <p className="text-base sm:text-lg mb-4">Find Us On:</p>
                      <div className="flex flex-wrap lg:justify-end gap-3 mb-6">
                        <a href="https://www.linkedin.com/company/lifewood-data-technology-ltd./posts/?feedView=all" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Linkedin className="w-4 h-4" /></a>
                        <a href="https://www.facebook.com/LifewoodPH/" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Facebook className="w-4 h-4" /></a>
                        <a href="https://www.instagram.com/lifewood_official/?hl=af" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Instagram className="w-4 h-4" /></a>
                        <a href="https://www.youtube.com/@LifewoodDataTechnology" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Youtube className="w-4 h-4" /></a>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                        <p className="text-lg sm:text-xl font-medium">&copy; 2026 Lifewood - All Rights Reserved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </section>
          ) : currentPath === '/type-b-horizontal-llm-data' ? (
            <section className="max-w-6xl mx-auto space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.div
                id="type-b-overview"
                className="rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="absolute -top-24 -right-10 w-72 h-72 bg-white/55 rounded-full blur-3xl" />
                <p className="text-black font-medium uppercase tracking-[0.14em] text-sm mb-5">Type B - Horizontal LLM Data</p>
                <h1 className="text-4xl sm:text-5xl font-semibold text-black mb-5">Horizontal LLM data for broad model training</h1>
                <p className="text-black text-lg max-w-4xl mx-auto">
                  Comprehensive AI data solutions that cover the entire spectrum from data collection and annotation to model
                  testing. Creating multimodal datasets for deep learning and large language models.
                </p>
                <div className="mt-7 flex flex-wrap gap-3 justify-center">
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Cross-domain Coverage</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Multimodal Datasets</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">LLM Training Ready</span>
                </div>
              </motion.div>

              <motion.section
                id="type-b-examples"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.04 }}
              >
                <h2 className="text-3xl sm:text-4xl font-medium mb-5">Use Cases</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {typeBUseCases.map((item, index) => (
                    <motion.article
                      key={item}
                      className="bg-[#f3f3f3] text-black rounded-3xl p-7 sm:p-9 interactive-card"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, delay: 0.08 + index * 0.06 }}
                    >
                      <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-castleton text-white mb-4">
                        {index === 0 ? <Database className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                      </span>
                      <p className="text-black text-lg leading-relaxed">{item}</p>
                    </motion.article>
                  ))}
                </div>
              </motion.section>

              <motion.section
                id="type-b-process"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
              >
                <h2 className="text-[38px] sm:text-[46px] leading-none font-semibold tracking-[-0.02em] uppercase mb-7">Type B: AI Data Project (Audio)</h2>
                <div className="type-a-folder-stack">
                  <div className="grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-4 sm:gap-6 items-stretch">
                    <AnimatePresence mode="wait">
                      <motion.article
                        key={`copy-b-${activeTypeBProcess.step}`}
                        className="type-a-folder-content"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.22 }}
                      >
                        <p className="mt-2 text-xs uppercase tracking-[0.12em] text-castleton/80 mb-3">Workflow Stage</p>
                        <div className="type-a-heading-row">
                          <h3 className="type-a-heading-step">{activeTypeBProcess.step}</h3>
                          <h4 className="type-a-heading-title">{activeTypeBProcess.title}</h4>
                        </div>
                        <p className="type-a-heading-description">{activeTypeBProcess.details}</p>
                      </motion.article>
                    </AnimatePresence>

                    <div className="type-a-folder-image-shell rounded-3xl border border-castleton/20">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={`image-b-${activeTypeBProcess.step}`}
                          src={activeTypeBProcess.image}
                          alt={`${activeTypeBProcess.title} visual`}
                          className="type-a-folder-main-image w-full h-full object-cover"
                          initial={{ opacity: 0.25, scale: 1.03 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0.2, scale: 1.03 }}
                          transition={{ duration: 0.24 }}
                        />
                      </AnimatePresence>
                      <div className="absolute inset-0 bg-gradient-to-t from-serpent/38 via-transparent to-transparent" />
                    </div>
                  </div>

                  <div className="type-a-selector-shell">
                    <div className="type-a-selector-list" role="tablist" aria-label="Type B process selectors">
                      {typeBProcess.map((item, index) => {
                        const isActive = activeTypeBProcess.step === item.step
                        return (
                          <button
                            key={item.step}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onMouseEnter={() => selectTypeBProcess(index)}
                            onFocus={() => selectTypeBProcess(index)}
                            onClick={() => selectTypeBProcess(index)}
                            className={`focus-brand type-a-selector-item ${isActive ? 'type-a-selector-item-active' : ''}`}
                          >
                            <span className="type-a-selector-index">{item.step}</span>
                            <span className="type-a-selector-label">{item.title.toUpperCase()}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </motion.section>

              <motion.section
                id="ai-contact"
                className="mt-8 bg-serpent border border-castleton/35 rounded-[32px] p-6 sm:p-7 lg:p-9 text-white relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-castleton/45 blur-3xl" />
                <div className="relative">
                  <img
                    src="https://framerusercontent.com/images/Ca8ppNsvJIfTsWEuHr50gvkDow.png"
                    alt="Lifewood logo"
                    className="h-8 sm:h-9 w-auto mb-5"
                  />
                  <p className="text-lg sm:text-2xl font-medium leading-tight mb-8 max-w-3xl">
                    We provide global Data Engineering Services to enable AI Solutions.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                    <div>
                      <button
                        type="button"
                        onClick={() => goToPath('/contact-us')}
                        className="focus-brand mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/12 px-6 py-2 text-lg sm:text-xl font-bold text-[#e7edd8] hover:bg-white/20 transition-colors"
                      >
                        Contact Us
                      </button>
                      <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Privacy Policy</a>
                        <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Policy</a>
                        <a href="https://www.termsfeed.com/live/terms-and-conditions" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Terms and Conditions</a>
                        <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Settings</a>
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <p className="text-base sm:text-lg mb-4">Find Us On:</p>
                      <div className="flex flex-wrap lg:justify-end gap-3 mb-6">
                        <a href="https://www.linkedin.com/company/lifewood-data-technology-ltd./posts/?feedView=all" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Linkedin className="w-4 h-4" /></a>
                        <a href="https://www.facebook.com/LifewoodPH/" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Facebook className="w-4 h-4" /></a>
                        <a href="https://www.instagram.com/lifewood_official/?hl=af" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Instagram className="w-4 h-4" /></a>
                        <a href="https://www.youtube.com/@LifewoodDataTechnology" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Youtube className="w-4 h-4" /></a>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                        <p className="text-lg sm:text-xl font-medium">&copy; 2026 Lifewood - All Rights Reserved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </section>
          ) : currentPath === '/type-c-vertical-llm-data' ? (
            <section className="max-w-6xl mx-auto space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.div
                id="type-c-overview"
                className="rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="absolute -top-24 -right-10 w-72 h-72 bg-white/55 rounded-full blur-3xl" />
                <p className="text-black font-medium uppercase tracking-[0.14em] text-sm mb-5">Type C - Vertical LLM Data</p>
                <h1 className="text-4xl sm:text-5xl font-semibold text-black mb-5">Vertical LLM data for industry-specific AI</h1>
                <p className="text-black text-lg max-w-4xl mx-auto">
                  AI data solutions across specific industry verticals including autonomous driving data annotation,
                  in-vehicle data collection, and specialized data services for industry, enterprise, or private LLM.
                </p>
                <div className="mt-7 flex flex-wrap gap-3 justify-center">
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Autonomous Driving</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">In-vehicle Data Collection</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Enterprise / Private LLM</span>
                </div>
              </motion.div>

              <motion.section
                id="type-c-examples"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.04 }}
              >
                <h2 className="text-3xl sm:text-4xl font-medium mb-5">Use Cases</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {typeCUseCases.map((item, index) => (
                    <motion.article
                      key={item}
                      className="bg-[#f3f3f3] text-black rounded-3xl p-7 sm:p-9 interactive-card"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, delay: 0.08 + index * 0.06 }}
                    >
                      <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-castleton text-white mb-4">
                        {index === 0 ? <ShieldCheck className="w-5 h-5" /> : <Database className="w-5 h-5" />}
                      </span>
                      <p className="text-black text-lg leading-relaxed">{item}</p>
                    </motion.article>
                  ))}
                </div>
              </motion.section>

              <motion.section
                id="type-c-process"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
              >
                <h2 className="text-[38px] sm:text-[46px] leading-none font-semibold tracking-[-0.02em] uppercase mb-7">Type C- Vertical LLM Data</h2>
                <div className="type-a-folder-stack">
                  <div className="grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-4 sm:gap-6 items-stretch">
                    <AnimatePresence mode="wait">
                      <motion.article
                        key={`copy-c-${activeTypeCProcess.step}`}
                        className="type-a-folder-content"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.22 }}
                      >
                        <p className="mt-2 text-xs uppercase tracking-[0.12em] text-castleton/80 mb-3">Workflow Stage</p>
                        <div className="type-a-heading-row">
                          <h3 className="type-a-heading-step">{activeTypeCProcess.step}</h3>
                          <h4 className="type-a-heading-title">{activeTypeCProcess.title}</h4>
                        </div>
                        <p className="type-a-heading-description">{activeTypeCProcess.details}</p>
                      </motion.article>
                    </AnimatePresence>

                    <div className="type-a-folder-image-shell rounded-3xl border border-castleton/20">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={`image-c-${activeTypeCProcess.step}`}
                          src={activeTypeCProcess.image}
                          alt={`${activeTypeCProcess.title} visual`}
                          className="type-a-folder-main-image w-full h-full object-cover"
                          initial={{ opacity: 0.25, scale: 1.03 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0.2, scale: 1.03 }}
                          transition={{ duration: 0.24 }}
                        />
                      </AnimatePresence>
                      <div className="absolute inset-0 bg-gradient-to-t from-serpent/38 via-transparent to-transparent" />
                    </div>
                  </div>

                  <div className="type-a-selector-shell">
                    <div className="type-a-selector-list" role="tablist" aria-label="Type C process selectors">
                      {typeCProcess.map((item, index) => {
                        const isActive = activeTypeCProcess.step === item.step
                        return (
                          <button
                            key={item.step}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onMouseEnter={() => selectTypeCProcess(index)}
                            onFocus={() => selectTypeCProcess(index)}
                            onClick={() => selectTypeCProcess(index)}
                            className={`focus-brand type-a-selector-item ${isActive ? 'type-a-selector-item-active' : ''}`}
                          >
                            <span className="type-a-selector-index">{item.step}</span>
                            <span className="type-a-selector-label">{item.title.toUpperCase()}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </motion.section>

              <motion.section
                id="ai-contact"
                className="mt-8 bg-serpent border border-castleton/35 rounded-[32px] p-6 sm:p-7 lg:p-9 text-white relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-castleton/45 blur-3xl" />
                <div className="relative">
                  <img
                    src="https://framerusercontent.com/images/Ca8ppNsvJIfTsWEuHr50gvkDow.png"
                    alt="Lifewood logo"
                    className="h-8 sm:h-9 w-auto mb-5"
                  />
                  <p className="text-lg sm:text-2xl font-medium leading-tight mb-8 max-w-3xl">
                    We provide global Data Engineering Services to enable AI Solutions.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                    <div>
                      <button
                        type="button"
                        onClick={() => goToPath('/contact-us')}
                        className="focus-brand mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/12 px-6 py-2 text-lg sm:text-xl font-bold text-[#e7edd8] hover:bg-white/20 transition-colors"
                      >
                        Contact Us
                      </button>
                      <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Privacy Policy</a>
                        <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Policy</a>
                        <a href="https://www.termsfeed.com/live/terms-and-conditions" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Terms and Conditions</a>
                        <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Settings</a>
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <p className="text-base sm:text-lg mb-4">Find Us On:</p>
                      <div className="flex flex-wrap lg:justify-end gap-3 mb-6">
                        <a href="https://www.linkedin.com/company/lifewood-data-technology-ltd./posts/?feedView=all" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Linkedin className="w-4 h-4" /></a>
                        <a href="https://www.facebook.com/LifewoodPH/" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Facebook className="w-4 h-4" /></a>
                        <a href="https://www.instagram.com/lifewood_official/?hl=af" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Instagram className="w-4 h-4" /></a>
                        <a href="https://www.youtube.com/@LifewoodDataTechnology" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Youtube className="w-4 h-4" /></a>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                        <p className="text-lg sm:text-xl font-medium">&copy; 2026 Lifewood - All Rights Reserved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </section>
          ) : currentPath === '/philanthropy-impact' ? (
            <section className="max-w-6xl mx-auto space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.div
                id="phil-overview"
                className="rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <motion.div
                  className="absolute -top-20 -right-10 w-64 h-64 rounded-full bg-castleton/10 blur-3xl"
                  animate={{ y: [0, -8, 0], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <p className="text-black font-medium uppercase tracking-[0.14em] text-sm mb-5">Philanthropy and Impact</p>
                <h1 className="text-4xl sm:text-5xl font-semibold text-black mb-5">Transforming Communities Worldwide</h1>
                <p className="text-black text-lg max-w-4xl mx-auto">
                  We direct resources into education and developmental projects that create lasting change. Our approach goes
                  beyond giving: it builds sustainable growth and empowers communities for the future.
                </p>
                <div className="mt-7 flex flex-wrap gap-3 justify-center">
                  <motion.span whileHover={{ y: -3 }} className="brand-pill px-4 py-2 text-sm font-medium">Purposeful Partnerships</motion.span>
                  <motion.span whileHover={{ y: -3 }} className="brand-pill px-4 py-2 text-sm font-medium">Sustainable Investment</motion.span>
                  <motion.span whileHover={{ y: -3 }} className="brand-pill px-4 py-2 text-sm font-medium">Lasting Transformation</motion.span>
                </div>
              </motion.div>

              <motion.section
                id="phil-map-impact"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.03 }}
              >
                <div className="space-y-7 sm:space-y-8">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-serpent leading-[0.95]">
                      Transforming Communities
                      <br />
                      Worldwide
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
                    <motion.div
                      className="lg:col-span-4 h-[320px] sm:h-[430px] lg:h-[460px] rounded-3xl border border-castleton/20 bg-[#f3f3f3] p-3 sm:p-4 flex flex-col"
                      initial={{ opacity: 0, x: -14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.22 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-castleton text-xs uppercase tracking-[0.12em] mb-3 px-1">Pinned Regions</p>
                      <div className="flex-1 min-h-0 overflow-y-auto space-y-2 pr-1 pb-2">
                        {philanthropyMapOffices.map((office) => {
                          const isActive = selectedPhilanthropyOffice?.name === office.name
                          return (
                            <motion.button
                              key={`${office.name}-${office.lat}-${office.lon}`}
                              type="button"
                              onClick={() => setSelectedPhilanthropyOffice(office)}
                              whileHover={{ x: 4 }}
                              whileTap={{ scale: 0.98 }}
                              className={`focus-brand w-full text-left rounded-2xl border px-3 py-2.5 transition-colors ${
                                isActive
                                  ? 'bg-serpent text-white border-serpent'
                                  : 'bg-white text-black border-castleton/20 hover:border-castleton/40'
                              }`}
                            >
                              <p className="font-semibold leading-tight">{office.name}</p>
                              <p className={`text-xs ${isActive ? 'text-white/80' : 'text-black/70'}`}>{office.region}</p>
                            </motion.button>
                          )
                        })}
                      </div>
                    </motion.div>

                    <motion.div
                      className="lg:col-span-8"
                      initial={{ opacity: 0, x: 14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <OfficesMap
                        offices={philanthropyMapOffices}
                        activeRegion="Africa and Indian sub-continent"
                        showMeta={false}
                        focusedOffice={selectedPhilanthropyOffice}
                        className="h-[320px] sm:h-[430px] lg:h-[460px]"
                      />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-start">
                    <div className="flex items-center gap-3 pt-2">
                      <span className="h-px w-10 bg-black/35" />
                      <p className="text-black/85 text-2xl sm:text-3xl font-medium">Impact</p>
                    </div>
                    <p className="text-black text-lg sm:text-2xl leading-relaxed lg:text-right">
                      Through purposeful partnerships and sustainable investment, we empower communities across Africa and
                      the Indian sub-continent to create lasting economic and social transformation.
                    </p>
                  </div>
                </div>
              </motion.section>

              <motion.section
                id="phil-impact-details"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.04 }}
              >
                <div className="divide-y divide-castleton/15 border-y border-castleton/15">
                  <motion.article
                    className="relative py-4 sm:py-5 min-h-[190px] sm:min-h-[220px]"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.28 }}
                    onMouseEnter={() => setOpenPhilImpactRow('partnership')}
                    onMouseLeave={() => setOpenPhilImpactRow(null)}
                    onClick={() => setOpenPhilImpactRow((value) => (value === 'partnership' ? null : 'partnership'))}
                  >
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{
                        opacity: openPhilImpactRow === 'partnership' ? 0 : 1,
                        scale: openPhilImpactRow === 'partnership' ? 0.97 : 1,
                        filter: openPhilImpactRow === 'partnership' ? 'blur(4px)' : 'blur(0px)',
                      }}
                      transition={{ duration: 0.24, ease: 'easeOut' }}
                    >
                      <h3 className="text-4xl sm:text-6xl font-semibold text-black text-center">Partnership</h3>
                    </motion.div>

                    <motion.div
                      className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-7 items-center"
                      animate={{ opacity: openPhilImpactRow === 'partnership' ? 1 : 0, y: openPhilImpactRow === 'partnership' ? 0 : 10 }}
                      transition={{ type: 'spring', stiffness: 240, damping: 24 }}
                      style={{ pointerEvents: openPhilImpactRow === 'partnership' ? 'auto' : 'none' }}
                    >
                      <h3 className="lg:col-span-3 text-3xl sm:text-4xl font-semibold text-black">Partnership</h3>
                      <p className="lg:col-span-4 text-black/75 text-base sm:text-lg leading-relaxed">
                        In partnership with our philanthropic partners, Lifewood has expanded operations in South Africa, Nigeria,
                        Republic of the Congo, Democratic Republic of the Congo, Ghana, Madagascar, Benin, Uganda, Kenya, Ivory
                        Coast, Egypt, Ethiopia, Niger, Tanzania, Namibia, Zambia, Zimbabwe, Liberia, Sierra Leone, and Bangladesh.
                      </p>
                      <motion.div className="lg:col-span-5 overflow-hidden rounded-2xl border border-castleton/20" whileHover={{ y: -4 }}>
                        <motion.img
                          src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80"
                          alt="Community partnership session"
                          className="h-[180px] sm:h-[210px] w-full object-cover"
                          whileHover={{ scale: 1.04 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    </motion.div>
                  </motion.article>

                  <motion.article
                    className="relative py-4 sm:py-5 min-h-[190px] sm:min-h-[220px]"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.28, delay: 0.04 }}
                    onMouseEnter={() => setOpenPhilImpactRow('application')}
                    onMouseLeave={() => setOpenPhilImpactRow(null)}
                    onClick={() => setOpenPhilImpactRow((value) => (value === 'application' ? null : 'application'))}
                  >
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{
                        opacity: openPhilImpactRow === 'application' ? 0 : 1,
                        scale: openPhilImpactRow === 'application' ? 0.97 : 1,
                        filter: openPhilImpactRow === 'application' ? 'blur(4px)' : 'blur(0px)',
                      }}
                      transition={{ duration: 0.24, ease: 'easeOut' }}
                    >
                      <h3 className="text-4xl sm:text-6xl font-semibold text-black text-center">Application</h3>
                    </motion.div>

                    <motion.div
                      className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-7 items-center"
                      animate={{ opacity: openPhilImpactRow === 'application' ? 1 : 0, y: openPhilImpactRow === 'application' ? 0 : 10 }}
                      transition={{ type: 'spring', stiffness: 240, damping: 24 }}
                      style={{ pointerEvents: openPhilImpactRow === 'application' ? 'auto' : 'none' }}
                    >
                      <motion.div className="lg:col-span-5 overflow-hidden rounded-2xl border border-castleton/20" whileHover={{ y: -4 }}>
                        <motion.img
                          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80"
                          alt="Application in under-resourced economies"
                          className="h-[180px] sm:h-[210px] w-full object-cover"
                          whileHover={{ scale: 1.04 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                      <p className="lg:col-span-4 text-black/75 text-base sm:text-lg leading-relaxed">
                        This requires the application of our methods and experience for the development of people in under
                        resourced economies.
                      </p>
                      <h3 className="lg:col-span-3 text-3xl sm:text-4xl font-semibold text-black lg:text-right">Application</h3>
                    </motion.div>
                  </motion.article>

                  <motion.article
                    className="relative py-4 sm:py-5 min-h-[190px] sm:min-h-[220px]"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.28, delay: 0.08 }}
                    onMouseEnter={() => setOpenPhilImpactRow('expanding')}
                    onMouseLeave={() => setOpenPhilImpactRow(null)}
                    onClick={() => setOpenPhilImpactRow((value) => (value === 'expanding' ? null : 'expanding'))}
                  >
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{
                        opacity: openPhilImpactRow === 'expanding' ? 0 : 1,
                        scale: openPhilImpactRow === 'expanding' ? 0.97 : 1,
                        filter: openPhilImpactRow === 'expanding' ? 'blur(4px)' : 'blur(0px)',
                      }}
                      transition={{ duration: 0.24, ease: 'easeOut' }}
                    >
                      <h3 className="text-4xl sm:text-6xl font-semibold text-black text-center">Expanding</h3>
                    </motion.div>

                    <motion.div
                      className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-7 items-center"
                      animate={{ opacity: openPhilImpactRow === 'expanding' ? 1 : 0, y: openPhilImpactRow === 'expanding' ? 0 : 10 }}
                      transition={{ type: 'spring', stiffness: 240, damping: 24 }}
                      style={{ pointerEvents: openPhilImpactRow === 'expanding' ? 'auto' : 'none' }}
                    >
                      <h3 className="lg:col-span-3 text-3xl sm:text-4xl font-semibold text-black">Expanding</h3>
                      <p className="lg:col-span-4 text-black/75 text-base sm:text-lg leading-relaxed">
                        We are expanding access to training, establishing equiatable wage structures and career and leadership
                        progression to create sustainable change, by equipping individuals to take the lead and grow the business
                        for themselves for the long term benefit of everyone.
                      </p>
                      <motion.div className="lg:col-span-5 overflow-hidden rounded-2xl border border-castleton/20" whileHover={{ y: -4 }}>
                        <motion.img
                          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80"
                          alt="Expanding development outcomes"
                          className="h-[180px] sm:h-[210px] w-full object-cover"
                          whileHover={{ scale: 1.04 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    </motion.div>
                  </motion.article>
                </div>
              </motion.section>

              <motion.section
                id="phil-impact-statement"
                className="rounded-3xl p-8 sm:p-10 text-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.14 }}
              >
                <p className="text-black text-3xl sm:text-5xl font-medium leading-tight">
                  Working with new
                  <br />
                  intelligence for a better world.
                </p>
              </motion.section>

              <motion.section
                id="ai-contact"
                className="mt-8 bg-serpent border border-castleton/35 rounded-[32px] p-6 sm:p-7 lg:p-9 text-white relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-castleton/45 blur-3xl" />
                <div className="relative">
                  <img
                    src="https://framerusercontent.com/images/Ca8ppNsvJIfTsWEuHr50gvkDow.png"
                    alt="Lifewood logo"
                    className="h-8 sm:h-9 w-auto mb-5"
                  />
                  <p className="text-lg sm:text-2xl font-medium leading-tight mb-8 max-w-3xl">
                    We provide global Data Engineering Services to enable AI Solutions.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                    <div>
                      <button
                        type="button"
                        onClick={() => goToPath('/contact-us')}
                        className="focus-brand mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/12 px-6 py-2 text-lg sm:text-xl font-bold text-[#e7edd8] hover:bg-white/20 transition-colors"
                      >
                        Contact Us
                      </button>
                      <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Privacy Policy</a>
                        <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Policy</a>
                        <a href="https://www.termsfeed.com/live/terms-and-conditions" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Terms and Conditions</a>
                        <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Settings</a>
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <p className="text-base sm:text-lg mb-4">Find Us On:</p>
                      <div className="flex flex-wrap lg:justify-end gap-3 mb-6">
                        <a href="https://www.linkedin.com/company/lifewood-data-technology-ltd./posts/?feedView=all" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Linkedin className="w-4 h-4" /></a>
                        <a href="https://www.facebook.com/LifewoodPH/" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Facebook className="w-4 h-4" /></a>
                        <a href="https://www.instagram.com/lifewood_official/?hl=af" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Instagram className="w-4 h-4" /></a>
                        <a href="https://www.youtube.com/@LifewoodDataTechnology" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Youtube className="w-4 h-4" /></a>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                        <p className="text-lg sm:text-xl font-medium">&copy; 2026 Lifewood - All Rights Reserved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </section>
          ) : currentPath === '/type-d-aigc' ? (
            <section className="max-w-6xl mx-auto space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.div
                id="type-d-overview"
                className="p-8 sm:p-12 relative overflow-hidden text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="absolute -top-16 -right-12 w-64 h-64 rounded-full bg-castleton/10 blur-3xl" />
                <p className="text-black font-medium uppercase tracking-[0.14em] text-sm mb-5">AI Generated Content (AIGC)</p>
                <h1 className="text-4xl sm:text-5xl font-semibold text-black mb-5">
                  Cinematic brand content powered by AI
                </h1>
                <p className="text-black text-lg max-w-4xl mx-auto">
                  Lifewood&apos;s early adoption of AI tools has seen the company rapidly evolve the use of AI generated content,
                  integrated into video production for communication requirements. These text, voice, image, and video skills
                  that comprise AIGC production, combined with traditional production methods and story development, are now
                  being sought by other companies.
                </p>
                <div className="mt-7 flex flex-wrap gap-3 justify-center">
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Text, Voice, Image, Video</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Story Development</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Brand Communications</span>
                </div>
              </motion.div>

              <motion.section
                id="type-d-cinematic-scene"
                className="p-5 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.02 }}
              >
                <article className="overflow-hidden">
                  <video
                    className="w-full h-[280px] sm:h-[380px] object-cover"
                    src={typeDCinematicVideo.src}
                    poster={typeDCinematicVideo.poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  />
                  <div className="p-5 sm:p-7">
                    <p className="text-castleton text-sm uppercase tracking-[0.12em] mb-2">AI Cinematic Scene</p>
                    <h3 className="text-2xl sm:text-3xl font-semibold mb-2">High-impact visual storytelling for brand communication</h3>
                    <p className="text-black text-base sm:text-lg leading-relaxed">
                      We blend film direction, AI generation, and editing craft to create standout visual scenes for campaigns, social assets, and enterprise content.
                    </p>
                  </div>
                </article>
              </motion.section>

              <motion.section
                id="type-d-cinematic-frames"
                className="p-5 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.03 }}
              >
                <div className="mb-5 sm:mb-6">
                  <p className="text-castleton text-sm uppercase tracking-[0.12em] mb-2">AI Cinematic Frames</p>
                  <h3 className="text-2xl sm:text-3xl font-semibold">Generated scenes with human-led direction</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  {typeDCinematicFrames.map((frame, index) => (
                    <motion.article
                      key={frame.title}
                      className="group overflow-hidden rounded-3xl"
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.35, delay: 0.08 + index * 0.07 }}
                      animate={{ y: [0, -8, 0] }}
                      whileHover={{ y: -10, scale: 1.02 }}
                      style={{ willChange: 'transform' }}
                    >
                      <div className="relative overflow-hidden rounded-3xl border border-castleton/20">
                        <motion.img
                          src={frame.image}
                          alt={frame.title}
                          className="w-full h-[220px] sm:h-[260px] object-cover"
                          animate={{ scale: [1, 1.06, 1] }}
                          transition={{ duration: 12 + index * 1.2, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-serpent/50 via-transparent to-transparent" />
                        <div className="absolute left-4 bottom-4">
                          <p className="text-white text-sm uppercase tracking-[0.1em] opacity-90">Frame {index + 1}</p>
                          <h4 className="text-white text-xl font-semibold">{frame.title}</h4>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.section>

              <motion.section
                id="type-d-visuals"
                className="p-5 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.04 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {typeDVisuals.slice(1).map((item) => (
                    <article key={item.title} className="overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-[220px] sm:h-[260px] object-cover" />
                      <div className="p-4 sm:p-5">
                        <p className="text-castleton text-xs uppercase tracking-[0.12em] mb-1">AIGC Module</p>
                        <h3 className="text-xl sm:text-2xl font-medium">{item.title}</h3>
                      </div>
                    </article>
                  ))}
                  <div className="p-5 sm:p-7 flex flex-col justify-center">
                    <p className="text-castleton text-sm uppercase tracking-[0.12em] mb-2">Creative Stack</p>
                    <h3 className="text-2xl sm:text-3xl font-semibold mb-3">From concept to final cut</h3>
                    <p className="text-black text-base sm:text-lg leading-relaxed">
                      AIGC production at Lifewood combines ideation, generation, compositing, editing, and localization into a single delivery flow.
                    </p>
                  </div>
                </div>
              </motion.section>

              <motion.section
                id="type-d-approach"
                className="p-5 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.04 }}
              >
                <h2 className="text-3xl sm:text-4xl font-medium mb-5">Our Approach</h2>
                <p className="text-black text-lg leading-relaxed max-w-5xl mb-6">
                  Our motivation is to express the personality of your brand in a compelling and distinctive way. We use
                  advanced film, video, and editing techniques combined with generative AI to create cinematic worlds for videos,
                  advertisements, and corporate communications.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  {typeDCapabilities.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <motion.article
                        key={item.title}
                        className="bg-[#f3f3f3] text-black rounded-3xl p-7 sm:p-8 interactive-card border border-castleton/15"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.28, delay: 0.08 + index * 0.06 }}
                      >
                        <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-castleton text-white mb-4">
                          <Icon className="w-5 h-5" />
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-medium mb-3">{item.title}</h3>
                        <p className="text-black text-base sm:text-lg leading-relaxed">{item.details}</p>
                      </motion.article>
                    )
                  })}
                </div>
              </motion.section>

              <motion.section
                id="type-d-impact"
                className="p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                  {typeDStats.map((item, index) => (
                    <motion.article
                      key={item.label}
                      className="rounded-3xl p-6 sm:p-8"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.24, delay: 0.12 + index * 0.06 }}
                    >
                      <p className="text-castleton text-sm uppercase tracking-[0.12em] mb-2">{item.label}</p>
                      <p className="text-black text-3xl sm:text-4xl font-semibold">{item.value}</p>
                    </motion.article>
                  ))}
                </div>

                <motion.article
                  className="bg-gradient-to-r from-serpent to-castleton rounded-3xl p-6 sm:p-8 mb-6"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.24, delay: 0.16 }}
                >
                  <p className="text-white/90 text-sm uppercase tracking-[0.12em] mb-2">Localization at Speed</p>
                  <h3 className="text-white text-2xl sm:text-3xl font-semibold mb-3">We can quickly adjust culture and language for world markets</h3>
                  <p className="text-white/90 text-base sm:text-lg leading-relaxed">
                    Lifewood adapts tone, visual context, and language across regions while preserving your core brand message.
                  </p>
                </motion.article>

                <motion.article
                  className="rounded-3xl p-6 sm:p-8"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.24, delay: 0.2 }}
                >
                  <div className="flex items-start gap-3">
                    <Quote className="w-6 h-6 text-castleton mt-1" />
                    <p className="text-black text-lg sm:text-xl leading-relaxed">
                      We understand that your customers spend hours looking at screens: so finding the one, most important thing,
                      on which to build your message is integral to our approach, as we seek to deliver surprise and originality.
                    </p>
                  </div>
                  <p className="text-black/80 mt-4 text-sm sm:text-base">- Lifewood</p>
                </motion.article>
              </motion.section>

              <motion.section
                id="ai-contact"
                className="mt-8 bg-serpent border border-castleton/35 rounded-[32px] p-6 sm:p-7 lg:p-9 text-white relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-castleton/45 blur-3xl" />
                <div className="relative">
                  <img
                    src="https://framerusercontent.com/images/Ca8ppNsvJIfTsWEuHr50gvkDow.png"
                    alt="Lifewood logo"
                    className="h-8 sm:h-9 w-auto mb-5"
                  />
                  <p className="text-lg sm:text-2xl font-medium leading-tight mb-8 max-w-3xl">
                    We provide global Data Engineering Services to enable AI Solutions.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                    <div>
                      <button
                        type="button"
                        onClick={() => goToPath('/contact-us')}
                        className="focus-brand mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/12 px-6 py-2 text-lg sm:text-xl font-bold text-[#e7edd8] hover:bg-white/20 transition-colors"
                      >
                        Contact Us
                      </button>
                      <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Privacy Policy</a>
                        <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Policy</a>
                        <a href="https://www.termsfeed.com/live/terms-and-conditions" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Terms and Conditions</a>
                        <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Settings</a>
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <p className="text-base sm:text-lg mb-4">Find Us On:</p>
                      <div className="flex flex-wrap lg:justify-end gap-3 mb-6">
                        <a href="https://www.linkedin.com/company/lifewood-data-technology-ltd./posts/?feedView=all" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Linkedin className="w-4 h-4" /></a>
                        <a href="https://www.facebook.com/LifewoodPH/" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Facebook className="w-4 h-4" /></a>
                        <a href="https://www.instagram.com/lifewood_official/?hl=af" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Instagram className="w-4 h-4" /></a>
                        <a href="https://www.youtube.com/@LifewoodDataTechnology" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Youtube className="w-4 h-4" /></a>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                        <p className="text-lg sm:text-xl font-medium">&copy; 2026 Lifewood - All Rights Reserved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </section>
          ) : currentPath === '/ai-projects' ? (
            <section className="max-w-6xl mx-auto space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.div
                id="ai-projects-overview"
                className="rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="absolute -top-24 -right-10 w-72 h-72 bg-white/55 rounded-full blur-3xl" />
                <p className="text-black font-medium uppercase tracking-[0.14em] text-sm mb-5">AI Projects</p>
                <h1 className="text-4xl sm:text-5xl font-semibold text-black mb-5">AI projects in action</h1>
                <p className="text-black text-lg max-w-4xl mx-auto">
                  We are actively implementing numerous AI use cases across industries and regions, combining scalable delivery
                  operations with high-quality data engineering to support long-term model performance.
                </p>
                <div className="mt-7 flex flex-wrap gap-3 justify-center">
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Production AI Programs</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Global Operations</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Enterprise Quality</span>
                </div>
                <div className="mt-7 w-full self-start">
                  <div className="w-full flex justify-start">
                    <button
                      type="button"
                      onClick={() => scrollToLocalAnchor('ai-contact')}
                      className="focus-brand group inline-flex items-center gap-2 rounded-full border border-serpent/30 bg-serpent px-3.5 py-1.5 text-xs font-bold text-white hover:bg-castleton transition-colors"
                    >
                      Contact Team
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.div>

              <motion.section
                id="ai-projects-focus"
                className="rounded-3xl p-4 sm:p-6"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 }}
              >
                <div className="text-center mb-6 sm:mb-8">
                  <span className="inline-flex text-black/80 text-xs sm:text-sm font-semibold mb-3">
                    Projects
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-medium text-black">What we currently handle</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-8 items-start">
                  <motion.div
                    key={aiProjectTracks[activeProjectIndex]?.image}
                    initial={{ opacity: 0.65 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-xl overflow-hidden border border-castleton/15"
                  >
                    <img
                      src={aiProjectTracks[activeProjectIndex]?.image}
                      alt={aiProjectTracks[activeProjectIndex]?.title}
                      className="w-full h-[360px] sm:h-[440px] object-cover"
                    />
                  </motion.div>

                  <div>
                    <ul className="border-b border-black/15">
                      {aiProjectTracks.map((item, index) => {
                        const isActive = activeProjectIndex === index
                        return (
                          <li key={item.title} className="border-t border-black/15">
                            <button
                              type="button"
                              onClick={() => setActiveProjectIndex((prev) => (prev === index ? -1 : index))}
                              className="w-full flex items-center gap-3 py-4 text-left"
                            >
                              <span className="text-black/80">{projectListIcon(item.title)}</span>
                              <span className="text-black text-base sm:text-xl font-medium">{`2.${index + 1} ${item.title}`}</span>
                              <span className="ml-auto text-black/70 text-xl leading-none">{isActive ? <X className="w-4 h-4" /> : '+'}</span>
                            </button>
                            <AnimatePresence>
                              {isActive ? (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.24 }}
                                  className="overflow-hidden pb-4"
                                >
                                  <p className="text-black/80 text-sm sm:text-base leading-relaxed pl-7 pr-2 whitespace-pre-line">
                                    {item.details}
                                  </p>
                                </motion.div>
                              ) : null}
                            </AnimatePresence>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </motion.section>

              <motion.section
                id="ai-contact"
                className="mt-8 bg-serpent border border-castleton/35 rounded-[32px] p-6 sm:p-7 lg:p-9 text-white relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-castleton/45 blur-3xl" />
                <div className="relative">
                  <img
                    src="https://framerusercontent.com/images/Ca8ppNsvJIfTsWEuHr50gvkDow.png"
                    alt="Lifewood logo"
                    className="h-8 sm:h-9 w-auto mb-5"
                  />
                  <p className="text-lg sm:text-2xl font-medium leading-tight mb-8 max-w-3xl">
                    We provide global Data Engineering Services to enable AI Solutions.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                    <div>
                      <button
                        type="button"
                        onClick={() => goToPath('/contact-us')}
                        className="focus-brand mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/12 px-6 py-2 text-lg sm:text-xl font-bold text-[#e7edd8] hover:bg-white/20 transition-colors"
                      >
                        Contact Us
                      </button>
                      <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Privacy Policy</a>
                        <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Policy</a>
                        <a href="https://www.termsfeed.com/live/terms-and-conditions" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Terms and Conditions</a>
                        <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Settings</a>
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <p className="text-base sm:text-lg mb-4">Find Us On:</p>
                      <div className="flex flex-wrap lg:justify-end gap-3 mb-6">
                        <a href="https://www.linkedin.com/company/lifewood-data-technology-ltd./posts/?feedView=all" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Linkedin className="w-4 h-4" /></a>
                        <a href="https://www.facebook.com/LifewoodPH/" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Facebook className="w-4 h-4" /></a>
                        <a href="https://www.instagram.com/lifewood_official/?hl=af" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Instagram className="w-4 h-4" /></a>
                        <a href="https://www.youtube.com/@LifewoodDataTechnology" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Youtube className="w-4 h-4" /></a>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                        <p className="text-lg sm:text-xl font-medium">&copy; 2026 Lifewood - All Rights Reserved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </section>
          ) : currentPath === '/contact-us' ? (
            <section className="max-w-6xl mx-auto space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.div
                id="contact-overview"
                className="rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="absolute -top-24 -right-10 w-72 h-72 bg-white/55 rounded-full blur-3xl" />
                <p className="text-black font-medium uppercase tracking-[0.14em] text-sm mb-5">Contact us</p>
                <h1 className="text-4xl sm:text-5xl font-semibold text-black mb-5">Let us build your AI data pipeline</h1>
                <p className="text-black text-lg max-w-4xl mx-auto">
                  Reach Lifewood teams for AI data services, project scoping, and multi-region delivery support. We will
                  align the right workflow, quality model, and execution team for your requirements.
                </p>
                <div className="mt-7 flex flex-wrap gap-3 justify-center">
                  <a href="mailto:hr.lifewood@gmail.com" className="focus-brand brand-pill px-4 py-2 text-sm font-semibold inline-flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Team
                  </a>
                  <a href="tel:+15551234567" className="focus-brand brand-pill px-4 py-2 text-sm font-semibold inline-flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Call Us
                  </a>
                </div>
              </motion.div>

              <motion.section
                id="contact-details"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.06 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-5 sm:gap-6">
                  <div className="space-y-4">
                    {contactChannels.map((channel, index) => {
                      const Icon = channel.icon
                      return (
                        <motion.a
                          key={channel.title}
                          href={channel.href}
                          className="block bg-[#f3f3f3] rounded-3xl p-6 sm:p-7 border border-castleton/15 interactive-card"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.22, delay: 0.1 + index * 0.05 }}
                        >
                          <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-castleton text-white mb-4">
                            <Icon className="w-5 h-5" />
                          </span>
                          <p className="text-castleton text-xs uppercase tracking-[0.12em] mb-2">{channel.title}</p>
                          <p className="text-black text-lg sm:text-xl font-semibold">{channel.value}</p>
                        </motion.a>
                      )
                    })}

                    <motion.div
                      className="bg-[#f3f3f3] rounded-3xl p-6 sm:p-7 border border-castleton/15"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, delay: 0.28 }}
                    >
                      <div className="flex items-start gap-3">
                        <Clock3 className="w-5 h-5 text-castleton mt-0.5" />
                        <div>
                          <p className="text-castleton text-xs uppercase tracking-[0.12em] mb-2">Response Time</p>
                          <p className="text-black text-base sm:text-lg">
                            Initial response within 1 business day for all inbound inquiries.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    className="bg-[#f3f3f3] rounded-3xl p-6 sm:p-7 border border-castleton/15"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.26, delay: 0.16 }}
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-castleton text-white">
                        <Send className="w-4 h-4" />
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-medium">Send inquiry</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <input type="text" placeholder="Full name" className="focus-brand w-full rounded-2xl border border-castleton/20 bg-white px-4 py-3 text-black outline-none" />
                      <input type="email" placeholder="Work email" className="focus-brand w-full rounded-2xl border border-castleton/20 bg-white px-4 py-3 text-black outline-none" />
                    </div>
                    <input type="text" placeholder="Company name" className="focus-brand w-full rounded-2xl border border-castleton/20 bg-white px-4 py-3 text-black outline-none mb-3" />
                    <textarea placeholder="Tell us about your requirements..." rows={6} className="focus-brand w-full rounded-2xl border border-castleton/20 bg-white px-4 py-3 text-black outline-none resize-y mb-4" />
                    <a
                      href="mailto:hr.lifewood@gmail.com?subject=Inquiry%20from%20website"
                      className="focus-brand inline-flex items-center gap-2 rounded-full border border-serpent/25 bg-serpent px-5 py-2.5 text-white font-semibold hover:bg-castleton transition-colors"
                    >
                      Submit Inquiry
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </motion.div>
                </div>
              </motion.section>

              <motion.section
                id="contact-offices"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.12 }}
              >
                <h2 className="text-3xl sm:text-4xl font-medium mb-5">Global Presence</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  {contactOffices.map((office, index) => (
                    <motion.article
                      key={office.city}
                      className="bg-[#f3f3f3] text-black rounded-3xl p-6 sm:p-7 border border-castleton/15 interactive-card"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.24, delay: 0.16 + index * 0.05 }}
                    >
                      <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-castleton text-white mb-4">
                        <Building2 className="w-4 h-4" />
                      </span>
                      <p className="text-castleton text-xs uppercase tracking-[0.12em] mb-2">{office.region}</p>
                      <h3 className="text-2xl sm:text-3xl font-medium mb-3">{office.city}</h3>
                      <p className="text-black text-base sm:text-lg leading-relaxed">{office.details}</p>
                    </motion.article>
                  ))}
                </div>
              </motion.section>

              <motion.section
                id="ai-contact"
                className="mt-8 bg-serpent border border-castleton/35 rounded-[32px] p-6 sm:p-7 lg:p-9 text-white relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-castleton/45 blur-3xl" />
                <div className="relative">
                  <img
                    src="https://framerusercontent.com/images/Ca8ppNsvJIfTsWEuHr50gvkDow.png"
                    alt="Lifewood logo"
                    className="h-8 sm:h-9 w-auto mb-5"
                  />
                  <p className="text-lg sm:text-2xl font-medium leading-tight mb-8 max-w-3xl">
                    We provide global Data Engineering Services to enable AI Solutions.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                    <div>
                      <a
                        href="mailto:hr.lifewood@gmail.com"
                        className="focus-brand mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/12 px-6 py-2 text-lg sm:text-xl font-bold text-[#e7edd8] hover:bg-white/20 transition-colors"
                      >
                        Contact Us
                      </a>
                      <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Privacy Policy</a>
                        <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Policy</a>
                        <a href="https://www.termsfeed.com/live/terms-and-conditions" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Terms and Conditions</a>
                        <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Settings</a>
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <p className="text-base sm:text-lg mb-4">Find Us On:</p>
                      <div className="flex flex-wrap lg:justify-end gap-3 mb-6">
                        <a href="https://www.linkedin.com/company/lifewood-data-technology-ltd./posts/?feedView=all" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Linkedin className="w-4 h-4" /></a>
                        <a href="https://www.facebook.com/LifewoodPH/" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Facebook className="w-4 h-4" /></a>
                        <a href="https://www.instagram.com/lifewood_official/?hl=af" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Instagram className="w-4 h-4" /></a>
                        <a href="https://www.youtube.com/@LifewoodDataTechnology" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Youtube className="w-4 h-4" /></a>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                        <p className="text-lg sm:text-xl font-medium">&copy; 2026 Lifewood - All Rights Reserved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </section>
          ) : currentPath === '/sign-in' ? (
            <section className="max-w-6xl mx-auto space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.section
                id="sign-in-form"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.06 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 items-stretch">
                  <motion.article
                    className="lg:col-span-5 rounded-3xl bg-serpent text-white p-7 sm:p-9 border border-castleton/35 relative overflow-hidden"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.32 }}
                  >
                    <div className="absolute -top-16 -right-8 w-48 h-48 rounded-full bg-castleton/40 blur-3xl" />
                    <div className="relative">
                      <p className="text-saffron text-xs uppercase tracking-[0.14em] mb-3">Account Access</p>
                      <h1 className="text-4xl sm:text-5xl font-semibold leading-[0.95] mb-4 text-[#e7edd8]">Sign in to Lifewood</h1>
                      <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-8">
                        Access your project workflows, communication channels, and global delivery workspace.
                      </p>
                      <div className="space-y-3">
                        <div className="rounded-2xl border border-white/25 bg-white/10 px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.12em] text-white/75 mb-1">Secure Access</p>
                          <p className="text-sm sm:text-base">Enterprise-grade sign-in for teams and clients.</p>
                        </div>
                        <div className="rounded-2xl border border-white/25 bg-white/10 px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.12em] text-white/75 mb-1">Need an Account?</p>
                          <button
                            type="button"
                            onClick={() => goToPath('/contact-us')}
                            className="focus-brand text-saffron hover:text-white font-semibold inline-flex items-center gap-2"
                          >
                            Contact Us
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.article>

                  <motion.article
                    className="lg:col-span-7 rounded-3xl bg-[#f3f3f3] p-6 sm:p-8 border border-castleton/15 shadow-soft"
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.32, delay: 0.04 }}
                  >
                    <h2 className="text-2xl sm:text-3xl font-semibold mb-1">Welcome back</h2>
                    <p className="text-black/70 text-sm sm:text-base mb-5">Use your work credentials to continue.</p>

                    <form onSubmit={handleSignIn} className="space-y-4">
                      <div>
                        <label className="block text-xs uppercase tracking-[0.12em] text-castleton mb-2">Work Email</label>
                        <input
                          type="email"
                          placeholder="name@company.com"
                          value={signInEmail}
                          onChange={(event) => {
                            setSignInEmail(event.target.value)
                            if (signInError) setSignInError('')
                          }}
                          className="focus-brand w-full rounded-2xl border border-castleton/20 bg-white px-4 py-3 text-black outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-[0.12em] text-castleton mb-2">Password</label>
                        <input
                          type="password"
                          placeholder="Enter your password"
                          value={signInPassword}
                          onChange={(event) => {
                            setSignInPassword(event.target.value)
                            if (signInError) setSignInError('')
                          }}
                          className="focus-brand w-full rounded-2xl border border-castleton/20 bg-white px-4 py-3 text-black outline-none"
                        />
                      </div>

                      <div className="flex items-center justify-between gap-3 text-sm">
                        <label className="inline-flex items-center gap-2 text-black/80">
                          <input type="checkbox" className="accent-[#046241]" />
                          Remember me
                        </label>
                        <button type="button" className="text-castleton hover:text-serpent font-semibold">
                          Forgot password?
                        </button>
                      </div>

                      {signInError ? (
                        <p className="text-sm text-[#b64b4b] bg-[#fde8e8] border border-[#efb6b6] rounded-xl px-3 py-2">
                          {signInError}
                        </p>
                      ) : null}

                      <button
                        type="submit"
                        className="focus-brand w-full inline-flex justify-center items-center gap-2 rounded-full border border-serpent/25 bg-serpent px-5 py-2.5 text-white font-semibold hover:bg-castleton transition-colors"
                      >
                        Sign In
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <p className="text-center text-sm text-black/70">
                        No account yet?{' '}
                        <button
                          type="button"
                          onClick={() => goToPath('/contact-us')}
                          className="text-castleton hover:text-serpent font-semibold"
                        >
                          Request access
                        </button>
                      </p>
                    </form>
                  </motion.article>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { label: 'Secure Login', value: 'Protected session and encrypted traffic.' },
                    { label: 'Global Teams', value: 'Single access point for distributed operations.' },
                    { label: 'Fast Support', value: 'Contact team available for account help.' },
                  ].map((item, index) => (
                    <motion.article
                      key={item.label}
                      className="bg-[#f3f3f3] rounded-2xl border border-castleton/15 p-4"
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.22, delay: 0.08 + index * 0.04 }}
                    >
                      <p className="text-castleton text-xs uppercase tracking-[0.12em] mb-1">{item.label}</p>
                      <p className="text-black text-sm leading-relaxed">{item.value}</p>
                    </motion.article>
                  ))}
                </div>
              </motion.section>
            </section>
          ) : currentPath === '/admin-dashboard' ? (
            isAdminAuthenticated ? (
              <section className="w-full text-black lg:h-[calc(100dvh-1.5rem)]">
                <div className="grid grid-cols-1 lg:grid-cols-[240px,1fr] gap-4 items-start lg:h-full">
                  <div className="lg:sticky lg:top-2 self-start h-full space-y-3 flex flex-col items-center lg:justify-center">
                    <div className="h-14 w-full flex items-center justify-center">
                      <img
                        src="https://framerusercontent.com/images/BZSiFYgRc4wDUAuEybhJbZsIBQY.png"
                        alt="Lifewood logo"
                        className="h-12 w-auto"
                      />
                    </div>
                    <aside className="w-full max-w-[220px] h-fit rounded-[26px] border border-castleton/25 bg-[linear-gradient(165deg,#0f5a3f,#0d4d38_52%,#0a3f31)] text-[#eef4e9] overflow-hidden shadow-soft">
                    <div className="p-3 mt-2 space-y-3">
                      <button
                        type="button"
                        onClick={() => setIsAdminProfileModalOpen(true)}
                        className="focus-brand w-full rounded-xl border border-white/30 bg-white/5 px-3 py-3 text-left hover:bg-white/15 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="inline-flex w-8 h-8 rounded-full items-center justify-center bg-saffron text-black font-bold">
                            {(adminProfileForm.firstName?.[0] || 'L').toUpperCase()}
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-white truncate">
                              {adminProfileForm.firstName} {adminProfileForm.lastName}
                            </p>
                            <p className="text-xs text-white/80 truncate">{adminProfileForm.email}</p>
                          </div>
                        </div>
                      </button>
                    </div>
                    <nav className="px-3 pb-4 space-y-2">
                      {adminMenuItems.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setActiveAdminTab(item)
                            runAdminAction(`${item} panel opened`)
                          }}
                          className={`w-full text-left px-3 py-2.5 rounded-xl transition-colors ${
                            activeAdminTab === item
                              ? 'bg-saffron/20 border border-saffron/45 text-saffron font-semibold'
                              : 'hover:bg-white/10 text-white/90'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </nav>
                    <div className="px-3 pb-3">
                      <button
                        type="button"
                        onClick={handleAdminSignOut}
                        className="focus-brand w-full rounded-xl border border-white/30 px-3 py-2.5 text-sm font-semibold hover:bg-white/15 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                    </aside>
                  </div>

                  <main className="lg:h-full lg:overflow-y-auto p-1 sm:p-2">
                    <div className="flex items-center justify-between mb-4">
                      <h1 className="text-3xl sm:text-4xl font-semibold">{activeAdminData.heading}</h1>
                      <span className="inline-flex items-center rounded-full bg-white border border-castleton/15 px-4 py-2 text-sm font-semibold">
                        {activeAdminData.badge}
                      </span>
                    </div>
                    {adminNotice ? (
                      <motion.p
                        className="mb-3 text-sm inline-flex rounded-full bg-white border border-castleton/15 px-3 py-1.5"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        {adminNotice}
                      </motion.p>
                    ) : null}
                    {activeAdminTab === 'Dashboard' ? (
                      <div className="space-y-5">
                        <motion.div
                          className="rounded-[24px] border border-castleton/20 bg-white p-5 sm:p-6 flex flex-wrap items-center justify-between gap-3"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div>
                            <h2 className="text-3xl sm:text-4xl font-semibold text-black">Hello, Lifewood Team!</h2>
                            <p className="text-black/70 text-base sm:text-lg">Hope you are having a productive day :)</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => runAdminAction('Today filter selected')}
                            className="focus-brand rounded-full border border-castleton/20 bg-[#f3f5f4] px-4 py-2 text-base font-semibold text-castleton hover:bg-castleton hover:text-white transition-colors"
                          >
                            Today
                          </button>
                        </motion.div>

                        <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_0.85fr] gap-4">
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {[
                                {
                                  title: 'Total Interns',
                                  value: String(totalInterns),
                                  detail: 'Mar',
                                  accent: 'from-[#eef2ff] to-[#f8f9ff]',
                                  percent: 100,
                                  tone: 'bg-castleton',
                                  interns: internAnalyticsData,
                                },
                                {
                                  title: "Employee's Present Today",
                                  value: String(presentInterns.length),
                                  detail: `${presentPercent}%`,
                                  accent: 'from-[#eefaf1] to-[#f7fff9]',
                                  percent: presentPercent,
                                  tone: 'bg-castleton',
                                  interns: presentInterns,
                                },
                                {
                                  title: "Employee's on Leave",
                                  value: String(leaveInterns.length).padStart(2, '0'),
                                  detail: `${leavePercent}%`,
                                  accent: 'from-[#fff3f1] to-[#fff8f7]',
                                  percent: leavePercent,
                                  tone: 'bg-[#b64b4b]',
                                  interns: leaveInterns,
                                },
                                {
                                  title: "Employee's Late Today",
                                  value: String(lateInterns.length),
                                  detail: `${latePercent}%`,
                                  accent: 'from-[#f7f8f6] to-[#fcfcfb]',
                                  percent: latePercent,
                                  tone: 'bg-[#c07a2a]',
                                  interns: lateInterns,
                                },
                              ].map((card, index) => (
                                <motion.button
                                  key={card.title}
                                  type="button"
                                  onClick={() => setSelectedDashboardGroup({ title: card.title, interns: card.interns })}
                                  className={`w-full text-left rounded-[22px] border border-castleton/15 bg-gradient-to-br ${card.accent} p-5`}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  whileHover={{ y: -3, boxShadow: '0 14px 30px -24px rgba(11,92,66,0.55)' }}
                                  transition={{ duration: 0.24, delay: index * 0.04 }}
                                >
                                  <p className="text-black/80 text-lg font-medium">{card.title}</p>
                                  <div className="mt-5 flex items-end justify-between gap-2">
                                    <p className="text-5xl font-semibold text-black">{card.value}</p>
                                    <span className="text-black/55 text-sm font-semibold">{card.detail}</span>
                                  </div>
                                  <div className="mt-4 h-4 rounded-full bg-[#dfe5e0] overflow-hidden">
                                    <motion.div
                                      className={`h-full ${card.tone}`}
                                      initial={{ width: 0 }}
                                      animate={{ width: `${card.percent}%` }}
                                      transition={{ duration: 0.55, ease: 'easeOut', delay: 0.12 + index * 0.06 }}
                                    />
                                  </div>
                                </motion.button>
                              ))}
                            </div>

                            <AnimatePresence>
                              {selectedDashboardGroup ? (
                                <motion.div
                                  className="fixed inset-0 z-[85] bg-black/45 backdrop-blur-[2px] flex items-center justify-center p-4"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  onClick={() => setSelectedDashboardGroup(null)}
                                >
                                  <motion.div
                                    className="w-full max-w-2xl rounded-[24px] border border-castleton/25 bg-[#f5f7f6] shadow-2xl p-5 sm:p-6"
                                    initial={{ opacity: 0, y: 16, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 12, scale: 0.98 }}
                                    transition={{ duration: 0.22 }}
                                    onClick={(event) => event.stopPropagation()}
                                  >
                                    <div className="flex items-start justify-between gap-3 mb-4">
                                      <div>
                                        <p className="text-xs uppercase tracking-[0.12em] text-castleton mb-1">Intern List</p>
                                        <h3 className="text-2xl sm:text-3xl font-semibold text-black leading-tight">
                                          {selectedDashboardGroup.title}
                                        </h3>
                                        <p className="text-sm text-black/65 mt-1">
                                          {selectedDashboardGroup.interns.length} intern
                                          {selectedDashboardGroup.interns.length === 1 ? '' : 's'} in this card
                                        </p>
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => setSelectedDashboardGroup(null)}
                                        className="focus-brand rounded-full border border-castleton/20 px-3 py-1.5 text-sm font-semibold text-castleton hover:bg-castleton hover:text-white transition-colors"
                                      >
                                        Close
                                      </button>
                                    </div>

                                    <div className="max-h-[420px] overflow-y-auto pr-1 space-y-2">
                                      {selectedDashboardGroup.interns.length ? (
                                        selectedDashboardGroup.interns.map((intern) => (
                                          <div
                                            key={`${selectedDashboardGroup.title}-${intern.name}`}
                                            className="admin-name-card rounded-xl border border-castleton/15 bg-white px-3.5 py-3"
                                          >
                                            <div className="flex items-center justify-between gap-3">
                                              <p className="text-sm sm:text-base font-semibold text-black">{intern.name}</p>
                                              <span
                                                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                                  intern.low ? 'bg-[#fff0ed] text-[#9d4436]' : 'bg-[#e9f3ee] text-castleton'
                                                }`}
                                              >
                                                {getInternStatusLabel(intern.status || (intern.low ? 'Needs Support' : 'Active'))}
                                              </span>
                                            </div>
                                            <p className="mt-1 text-xs sm:text-sm text-black/65">
                                              {intern.email || 'No email'}
                                            </p>
                                          </div>
                                        ))
                                      ) : (
                                        <p className="text-sm text-black/70 rounded-xl border border-castleton/15 bg-white p-4">
                                          No interns found for this category.
                                        </p>
                                      )}
                                    </div>
                                  </motion.div>
                                </motion.div>
                              ) : null}
                            </AnimatePresence>

                            <motion.article
                              className="rounded-[22px] border border-castleton/15 bg-white p-5"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.24, delay: 0.12 }}
                            >
                              <div className="flex items-center justify-between gap-3 mb-4">
                                <h3 className="text-3xl font-semibold text-black">Today&apos;s Attendance</h3>
                                <button
                                  type="button"
                                  onClick={() => runAdminAction('Attendance report opened')}
                                  className="focus-brand rounded-full border border-castleton/20 px-3 py-1.5 text-sm font-semibold text-castleton hover:bg-castleton hover:text-white transition-colors"
                                >
                                  View report
                                </button>
                              </div>
                              <div className="overflow-x-auto">
                                <table className="min-w-full text-left">
                                  <thead className="sticky top-0 z-10 bg-[#eef4f0]">
                                    <tr className="text-black/75 border-b border-castleton/15">
                                      <th className="py-2 pr-4 text-sm font-semibold">Emp Name</th>
                                      <th className="py-2 pr-4 text-sm font-semibold">Emp Id</th>
                                      <th className="py-2 pr-4 text-sm font-semibold">Check-in</th>
                                      <th className="py-2 pr-4 text-sm font-semibold">Check-out</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {dashboardAttendanceRows.map((row) => (
                                      <tr key={row.id} className="border-b border-castleton/10">
                                        <td className="py-2 pr-4 text-base font-medium text-black">{row.name}</td>
                                        <td className="py-2 pr-4 text-black/80">{row.id}</td>
                                        <td className="py-2 pr-4 text-black/80">{row.checkin}</td>
                                        <td className="py-2 pr-4 text-black/80">{row.checkout}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </motion.article>
                          </div>

                          <div className="space-y-4">
                            <motion.article
                              className="rounded-[22px] border border-castleton/15 bg-white p-5"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.24, delay: 0.08 }}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <h3 className="text-2xl font-semibold text-black">Employees Present</h3>
                                <span className="inline-flex rounded-full bg-[#edf3ef] px-3 py-1 text-sm font-semibold text-castleton">
                                  {presentInterns.length}/{totalInterns}
                                </span>
                              </div>
                              <div className="space-y-2">
                                {presentInterns.slice(0, 5).map((person, idx) => (
                                  <button
                                    key={person.name}
                                    type="button"
                                    onClick={() => runAdminAction(`Checked ${person.name} status`)}
                                    className="admin-name-card w-full rounded-xl border border-castleton/10 bg-[#f8faf9] px-3 py-2 flex items-center justify-between hover:border-castleton/30 transition-colors"
                                  >
                                    <span className="font-medium text-black">{person.name}</span>
                                    <span className="text-black/75 text-sm">{`09:${String(2 + idx).padStart(2, '0')}`}</span>
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#1e8f51]" />
                                  </button>
                                ))}
                              </div>
                            </motion.article>

                            <motion.article
                              className="rounded-[22px] border border-castleton/15 bg-white p-5"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.24, delay: 0.12 }}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <h3 className="text-2xl font-semibold text-black">Employees on Leave</h3>
                                <span className="inline-flex rounded-full bg-[#f7ece9] px-3 py-1 text-sm font-semibold text-[#8b3f2f]">
                                  {String(leaveInterns.length).padStart(2, '0')}/{totalInterns}
                                </span>
                              </div>
                              <div className="space-y-2">
                                {leaveInterns.map((person, idx) => (
                                  <button
                                    key={person.name}
                                    type="button"
                                    onClick={() => runAdminAction(`Leave details: ${person.name}`)}
                                    className="admin-name-card w-full rounded-xl border border-castleton/10 bg-[#fdfdfd] px-3 py-2 flex items-center justify-between hover:border-castleton/30 transition-colors"
                                  >
                                    <span className="font-medium text-black">{person.name}</span>
                                    <span className="text-black/75 text-sm">{`${2 + idx}/5 days`}</span>
                                  </button>
                                ))}
                              </div>
                            </motion.article>

                            <motion.article
                              className="rounded-[22px] border border-castleton/15 bg-white p-5"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.24, delay: 0.16 }}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <h3 className="text-2xl font-semibold text-black">Birthdays</h3>
                                <span className="inline-flex rounded-full bg-[#f0f0f8] px-3 py-1 text-sm font-semibold text-[#35417c]">
                                  {birthdayInterns.length}/{totalInterns}
                                </span>
                              </div>
                              {birthdayInterns.map((person) => (
                                <div key={person.name} className="admin-name-card rounded-xl border border-castleton/10 bg-[#f8f9ff] px-3 py-3">
                                  <p className="font-medium text-black">{person.name}</p>
                                  <p className="text-black/70 text-sm">{person.date}</p>
                                </div>
                              ))}
                            </motion.article>
                          </div>
                        </div>
                      </div>
                    ) : activeAdminTab === 'Analytics' ? (
                      <div className="space-y-5">
                        <motion.div
                          className="rounded-[24px] border border-castleton/20 bg-white p-5 sm:p-6 flex flex-wrap items-center justify-between gap-3"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div>
                            <h2 className="text-3xl sm:text-4xl font-semibold text-black">Intern Analytics</h2>
                            <p className="text-black/70 text-base sm:text-lg">
                              Performance, attendance, and progress by intern.
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={openAnalyticsTaskModal}
                              className="focus-brand rounded-full bg-castleton text-white px-4 py-2 text-base font-semibold hover:bg-serpent transition-colors"
                            >
                              Add Task
                            </button>
                            <button
                              type="button"
                              onClick={() => runAdminAction('Analytics report exported')}
                              className="focus-brand rounded-full border border-castleton/20 bg-[#f3f5f4] px-4 py-2 text-base font-semibold text-castleton hover:bg-castleton hover:text-white transition-colors"
                            >
                              Export
                            </button>
                          </div>
                          <input
                            type="text"
                            value={analyticsSearch}
                            onChange={(event) => setAnalyticsSearch(event.target.value)}
                            placeholder="Search intern"
                            className="focus-brand min-w-[220px] rounded-full border border-castleton/20 bg-white px-4 py-2 text-sm font-medium text-black"
                          />
                          <select
                            value={analyticsSortBy}
                            onChange={(event) => setAnalyticsSortBy(event.target.value)}
                            className="focus-brand rounded-full border border-castleton/20 bg-white px-4 py-2 text-sm font-semibold text-castleton"
                          >
                            <option value="name-asc">Sort: Name A-Z</option>
                            <option value="name-desc">Sort: Name Z-A</option>
                            <option value="performance-desc">Sort: Performance</option>
                            <option value="attendance-desc">Sort: Attendance</option>
                            <option value="progress-desc">Sort: Progress</option>
                          </select>
                        </motion.div>

                        <motion.article
                          className="rounded-[22px] border border-castleton/20 bg-white p-4 sm:p-5"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.22, delay: 0.04 }}
                        >
                          <div className="flex items-center justify-between gap-3 mb-3">
                            <h3 className="text-xl sm:text-2xl font-semibold text-black">Recent Task Entries</h3>
                            <span className="inline-flex rounded-full bg-[#edf3ef] px-3 py-1 text-xs sm:text-sm font-semibold text-castleton">
                              {analyticsTaskEntries.length} item{analyticsTaskEntries.length === 1 ? '' : 's'}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                            {analyticsTaskEntries.slice(0, 6).map((item) => (
                              <div key={item.id} className="rounded-xl border border-castleton/15 bg-[#f8faf9] p-3">
                                <p className="text-sm font-semibold text-black">{item.task}</p>
                                <p className="text-xs text-black/65 mt-1">{item.internName}</p>
                                <div className="mt-2 flex items-center justify-between gap-2">
                                  <span className="inline-flex rounded-full bg-[#e8f3ed] px-2.5 py-1 text-xs font-semibold text-castleton">
                                    {item.activityType}
                                  </span>
                                  <span className="text-sm font-semibold text-black">{item.score}%</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.article>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                          {filteredAnalyticsRows.map((intern, index) => {
                            const breakdown = getInternBreakdown(intern)
                            return (
                            <motion.button
                              key={intern.name}
                              type="button"
                              onClick={() => {
                                setSelectedAnalyticsIntern(intern)
                                runAdminAction(`Opened analytics: ${intern.name}`)
                              }}
                              whileHover={{ y: -4, scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              className={`admin-name-card rounded-[22px] border p-4 sm:p-5 text-left ${
                                intern.low
                                  ? 'border-[#d9aaa2] bg-[#fff2ef]'
                                  : 'border-castleton/15 bg-white'
                              }`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.22, delay: Math.min(index * 0.015, 0.32) }}
                            >
                              <div className="flex items-start justify-between gap-3 mb-4">
                                <div>
                                  <h3 className="text-lg font-semibold leading-tight text-black">{intern.name}</h3>
                                  <p className="text-xs text-black/60 mt-1">{intern.school}</p>
                                  <p className="text-[11px] text-black/60 mt-1">
                                    {intern.gender || '-'} | {intern.course || '-'}
                                  </p>
                                </div>
                                <span
                                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${
                                    intern.low
                                      ? 'bg-[#f4d4ce] text-[#7d2e21]'
                                      : intern.performance === 100 && intern.attendance === 100 && intern.progress === 100
                                        ? 'bg-[#d9efe4] text-[#0b5a39]'
                                      : 'bg-[#e8f3ed] text-castleton'
                                  }`}
                                >
                                  {intern.low
                                    ? 'Low Performer'
                                    : intern.performance === 100 && intern.attendance === 100 && intern.progress === 100
                                      ? 'Top Performer'
                                      : 'High Performer'}
                                </span>
                              </div>

                              <div className="space-y-3">
                                {[
                                  ['Activities', breakdown.activities],
                                  ['Tasks', breakdown.tasks],
                                  ['Quality', breakdown.quality],
                                ].map(([label, value]) => (
                                  <div key={`${intern.name}-${label}`}>
                                    <div className="flex items-center justify-between mb-1">
                                      <p className="text-sm font-medium text-black/80">{label}</p>
                                      <p className="text-sm font-semibold text-black">{value}%</p>
                                    </div>
                                    <div className="h-2 rounded-full bg-[#e8ece8] overflow-hidden">
                                      <div
                                        className={`h-full rounded-full ${intern.low ? 'bg-[#c05345]' : 'bg-castleton'}`}
                                        style={{ width: `${value}%` }}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <p className="mt-4 text-sm font-semibold text-black/70">{breakdown.evalScore}% overall analytics score</p>
                            </motion.button>
                          )})}
                        </div>

                        <AnimatePresence>
                          {selectedAnalyticsIntern ? (
                            <motion.div
                              className="fixed inset-0 z-[80] bg-black/45 backdrop-blur-[2px] flex items-center justify-center p-4"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              onClick={() => setSelectedAnalyticsIntern(null)}
                            >
                              <motion.div
                                className="w-full max-w-2xl rounded-[24px] border border-castleton/25 bg-[#f5f7f6] shadow-2xl p-5 sm:p-6"
                                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 12, scale: 0.98 }}
                                transition={{ duration: 0.22 }}
                                onClick={(event) => event.stopPropagation()}
                              >
                                {(() => {
                                  const detail = getInternBreakdown(selectedAnalyticsIntern)
                                  return (
                                    <>
                                <div className="flex items-start justify-between gap-3 mb-4">
                                <div>
                                  <p className="text-xs uppercase tracking-[0.12em] text-castleton mb-1">Intern Breakdown</p>
                                  <h3 className="text-2xl sm:text-3xl font-semibold text-black leading-tight">{selectedAnalyticsIntern.name}</h3>
                                  <p className="text-sm text-black/65 mt-1">{selectedAnalyticsIntern.school}</p>
                                  <p className="text-sm text-black/65 mt-1">
                                    {selectedAnalyticsIntern.gender || '-'} | {selectedAnalyticsIntern.course || '-'}
                                  </p>
                                  <p className="text-sm text-black/65 mt-1">
                                    {selectedAnalyticsIntern.contact || '-'} | {selectedAnalyticsIntern.requiredHours || '-'} hrs required
                                  </p>
                                </div>
                                  <button
                                    type="button"
                                    onClick={() => setSelectedAnalyticsIntern(null)}
                                    className="focus-brand rounded-full border border-castleton/20 px-3 py-1.5 text-sm font-semibold text-castleton hover:bg-castleton hover:text-white transition-colors"
                                  >
                                    Close
                                  </button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                                  {[
                                    ['Performance', selectedAnalyticsIntern.performance],
                                    ['Attendance', selectedAnalyticsIntern.attendance],
                                    ['Progress', selectedAnalyticsIntern.progress],
                                  ].map(([label, value]) => (
                                    <div key={label} className="rounded-2xl border border-castleton/15 bg-white p-3.5">
                                      <p className="text-sm text-black/70">{label}</p>
                                      <p className="text-3xl font-semibold text-black">{value}%</p>
                                    </div>
                                  ))}
                                </div>

                                <div className="space-y-3">
                                  {[
                                    ['Activities', detail.activities],
                                    ['Tasks', detail.tasks],
                                    ['Quality', detail.quality],
                                    ['Collaboration', detail.collaboration],
                                    ['Consistency', detail.consistency],
                                    ['Evaluation Score', detail.evalScore],
                                  ].map(([label, value]) => (
                                    <div key={label}>
                                      <div className="flex items-center justify-between mb-1">
                                        <p className="text-sm font-medium text-black/80">{label}</p>
                                        <p className="text-sm font-semibold text-black">{value}%</p>
                                      </div>
                                      <div className="h-2.5 rounded-full bg-[#e7ece8] overflow-hidden">
                                        <motion.div
                                          className={`h-full rounded-full ${selectedAnalyticsIntern.low ? 'bg-[#c05345]' : 'bg-castleton'}`}
                                          initial={{ width: 0 }}
                                          animate={{ width: `${value}%` }}
                                          transition={{ duration: 0.45, ease: 'easeOut' }}
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                <p className="mt-5 text-sm sm:text-base text-black/75">
                                  Status:{' '}
                                  <span className={`font-semibold ${selectedAnalyticsIntern.low ? 'text-[#8a3528]' : 'text-castleton'}`}>
                                    {selectedAnalyticsIntern.low ? 'Needs coaching and close follow-up' : 'Consistent and on-track performance'}
                                  </span>
                                </p>
                                    </>
                                  )
                                })()}
                              </motion.div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>

                        <AnimatePresence>
                          {isAnalyticsTaskModalOpen ? (
                            <motion.div
                              className="fixed inset-0 z-[82] bg-black/45 backdrop-blur-[2px] flex items-center justify-center p-4"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              onClick={() => setIsAnalyticsTaskModalOpen(false)}
                            >
                              <motion.form
                                onSubmit={handleAnalyticsTaskSave}
                                className="w-full max-w-xl rounded-[24px] border border-castleton/25 bg-[#f5f7f6] shadow-2xl p-5 sm:p-6"
                                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 12, scale: 0.98 }}
                                transition={{ duration: 0.22 }}
                                onClick={(event) => event.stopPropagation()}
                              >
                                <div className="flex items-start justify-between gap-3 mb-4">
                                  <div>
                                    <p className="text-xs uppercase tracking-[0.12em] text-castleton mb-1">Analytics Intake</p>
                                    <h3 className="text-2xl sm:text-3xl font-semibold text-black leading-tight">Add Task Entry</h3>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => setIsAnalyticsTaskModalOpen(false)}
                                    className="focus-brand rounded-full border border-castleton/20 px-3 py-1.5 text-sm font-semibold text-castleton hover:bg-castleton hover:text-white transition-colors"
                                  >
                                    Close
                                  </button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  <select
                                    value={analyticsTaskForm.internName}
                                    onChange={(event) =>
                                      setAnalyticsTaskForm((prev) => ({ ...prev, internName: event.target.value }))
                                    }
                                    className="focus-brand rounded-xl border border-castleton/20 px-3 py-2.5 bg-white"
                                  >
                                    <option value="">Select intern</option>
                                    {internAnalyticsData.map((intern) => (
                                      <option key={`task-intern-${intern.name}`} value={intern.name}>
                                        {intern.name}
                                      </option>
                                    ))}
                                  </select>
                                  <select
                                    value={analyticsTaskForm.activityType}
                                    onChange={(event) =>
                                      setAnalyticsTaskForm((prev) => ({ ...prev, activityType: event.target.value }))
                                    }
                                    className="focus-brand rounded-xl border border-castleton/20 px-3 py-2.5 bg-white"
                                  >
                                    <option value="Activity">Activity</option>
                                    <option value="Task">Task</option>
                                    <option value="Assessment">Assessment</option>
                                    <option value="Quality Check">Quality Check</option>
                                    <option value="Project">Project</option>
                                  </select>
                                  <input
                                    type="text"
                                    value={analyticsTaskForm.task}
                                    onChange={(event) =>
                                      setAnalyticsTaskForm((prev) => ({ ...prev, task: event.target.value }))
                                    }
                                    placeholder="Task name"
                                    className="focus-brand rounded-xl border border-castleton/20 px-3 py-2.5 bg-white sm:col-span-2"
                                  />
                                  <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={analyticsTaskForm.score}
                                    onChange={(event) =>
                                      setAnalyticsTaskForm((prev) => ({ ...prev, score: event.target.value }))
                                    }
                                    placeholder="Score (0-100)"
                                    className="focus-brand rounded-xl border border-castleton/20 px-3 py-2.5 bg-white sm:col-span-2"
                                  />
                                </div>

                                {analyticsTaskError ? (
                                  <p className="mt-3 rounded-xl border border-[#c05345]/35 bg-[#fff3f1] px-3 py-2 text-sm font-medium text-[#9d4436]">
                                    {analyticsTaskError}
                                  </p>
                                ) : null}

                                <div className="mt-5 flex items-center justify-end gap-2">
                                  <button
                                    type="button"
                                    onClick={() => setIsAnalyticsTaskModalOpen(false)}
                                    className="focus-brand rounded-full border border-castleton/20 px-4 py-2 text-sm font-semibold text-castleton hover:bg-castleton hover:text-white transition-colors"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="submit"
                                    className="focus-brand rounded-full bg-castleton text-white px-4 py-2 text-sm font-semibold hover:bg-serpent transition-colors"
                                  >
                                    Save Task
                                  </button>
                                </div>
                              </motion.form>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    ) : activeAdminTab === 'Evaluation' ? (
                      <div className="space-y-5">
                        <motion.div
                          className="rounded-[24px] border border-castleton/20 bg-white p-5 sm:p-6"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                            <div>
                              <h2 className="text-3xl sm:text-4xl font-semibold text-black">Intern Evaluation Matrix</h2>
                              <p className="text-black/70 text-base sm:text-lg">
                                Performance review view with risk category, mentoring direction, and current review score.
                              </p>
                            </div>
                            <select
                              value={evaluationSortBy}
                              onChange={(event) => setEvaluationSortBy(event.target.value)}
                              className="focus-brand rounded-full border border-castleton/20 bg-white px-4 py-2 text-sm font-semibold text-castleton"
                            >
                              <option value="score-desc">Sort: Score High-Low</option>
                              <option value="score-asc">Sort: Score Low-High</option>
                              <option value="name-asc">Sort: Name A-Z</option>
                              <option value="name-desc">Sort: Name Z-A</option>
                            </select>
                            <input
                              type="text"
                              value={evaluationSearch}
                              onChange={(event) => setEvaluationSearch(event.target.value)}
                              placeholder="Search intern"
                              className="focus-brand min-w-[220px] rounded-full border border-castleton/20 bg-white px-4 py-2 text-sm font-medium text-black"
                            />
                          </div>
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                            {[
                              ['Excellent', filteredEvaluationInsights.filter((item) => item.band === 'Excellent').length],
                              ['Strong', filteredEvaluationInsights.filter((item) => item.band === 'Strong').length],
                              ['Stable', filteredEvaluationInsights.filter((item) => item.band === 'Stable').length],
                              ['Needs Support', filteredEvaluationInsights.filter((item) => item.band === 'Needs Support').length],
                            ].map(([label, value]) => (
                              <div key={label} className="rounded-2xl border border-castleton/15 bg-[#f6f9f7] p-3">
                                <p className="text-xs uppercase tracking-[0.12em] text-castleton">{label}</p>
                                <p className="text-3xl font-semibold text-black">{value}</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                          {filteredEvaluationInsights.map((intern, index) => (
                            <motion.button
                              key={`eval-${intern.name}`}
                              type="button"
                              onClick={() => {
                                setSelectedAnalyticsIntern(intern)
                                runAdminAction(`Opened evaluation detail: ${intern.name}`)
                              }}
                              className={`admin-name-card rounded-[22px] border p-4 sm:p-5 text-left ${
                                intern.band === 'Needs Support' ? 'border-[#d9aaa2] bg-[#fff2ef]' : 'border-castleton/15 bg-white'
                              }`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.22, delay: Math.min(index * 0.02, 0.3) }}
                              whileHover={{ y: -4, boxShadow: '0 16px 36px -28px rgba(11,92,66,0.45)' }}
                            >
                              <div className="flex items-start justify-between gap-3 mb-3">
                                <div>
                                  <h3 className="text-lg font-semibold text-black leading-tight">{intern.name}</h3>
                                  <p className="text-xs text-black/60 mt-1">{intern.school}</p>
                                  <p className="text-[11px] text-black/60 mt-1">
                                    {intern.gender || '-'} | {intern.course || '-'}
                                  </p>
                                  <p className="text-xs uppercase tracking-[0.12em] text-black/55 mt-1">
                                    {intern.track || 'AI Data Operations'} | {getInternStatusLabel(intern.status || 'Active')}
                                  </p>
                                </div>
                                <span className="inline-flex rounded-full bg-[#eef3ef] text-castleton px-2.5 py-1 text-xs font-semibold">{intern.band}</span>
                              </div>
                              <p className="text-sm text-black/75 mb-2">{intern.risk}</p>
                              <div className="h-2 rounded-full bg-[#e8ece8] overflow-hidden mt-2 mb-3">
                                <motion.div
                                  className={intern.band === 'Needs Support' ? 'h-full bg-[#c05345]' : 'h-full bg-castleton'}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${intern.score}%` }}
                                  transition={{ duration: 0.45, ease: 'easeOut' }}
                                />
                              </div>
                              <p className="text-sm font-semibold text-black mb-1">{intern.score}% evaluation score</p>
                              <p className="text-sm text-black/75 line-clamp-2">{intern.recommendation}</p>
                              <div className="mt-3 flex items-center justify-between text-xs text-black/65">
                                <span>Review: {intern.reviewDate}</span>
                                <span>P:{intern.performance}% A:{intern.attendance}% G:{intern.progress}%</span>
                              </div>
                            </motion.button>
                          ))}
                        </div>

                        <AnimatePresence>
                          {selectedAnalyticsIntern ? (
                            <motion.div
                              className="fixed inset-0 z-[80] bg-black/45 backdrop-blur-[2px] flex items-center justify-center p-4"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              onClick={() => setSelectedAnalyticsIntern(null)}
                            >
                              <motion.div
                                className="w-full max-w-3xl rounded-[24px] border border-castleton/25 bg-[#f5f7f6] shadow-2xl p-5 sm:p-6"
                                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 12, scale: 0.98 }}
                                transition={{ duration: 0.22 }}
                                onClick={(event) => event.stopPropagation()}
                              >
                                {(() => {
                                  const detail = getInternBreakdown(selectedAnalyticsIntern)
                                  const score = detail.evalScore
                                  return (
                                    <>
                                      <div className="flex items-start justify-between gap-3 mb-4">
                                        <div>
                                          <p className="text-xs uppercase tracking-[0.12em] text-castleton mb-1">Evaluation Detail</p>
                                          <h3 className="text-2xl sm:text-3xl font-semibold text-black leading-tight">{selectedAnalyticsIntern.name}</h3>
                                          <p className="text-sm text-black/65 mt-1">{selectedAnalyticsIntern.school}</p>
                                          <p className="text-sm text-black/65 mt-1">
                                            {selectedAnalyticsIntern.gender || '-'} | {selectedAnalyticsIntern.course || '-'}
                                          </p>
                                          <p className="text-sm text-black/65 mt-1">
                                            {selectedAnalyticsIntern.track || 'AI Data Operations'} | Mentor:{' '}
                                            {selectedAnalyticsIntern.mentor || 'Unassigned'}
                                          </p>
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() => setSelectedAnalyticsIntern(null)}
                                          className="focus-brand rounded-full border border-castleton/20 px-3 py-1.5 text-sm font-semibold text-castleton hover:bg-castleton hover:text-white transition-colors"
                                        >
                                          Close
                                        </button>
                                      </div>
                                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                                        {[
                                          ['Performance', selectedAnalyticsIntern.performance],
                                          ['Attendance', selectedAnalyticsIntern.attendance],
                                          ['Progress', selectedAnalyticsIntern.progress],
                                          ['Eval', score],
                                        ].map(([label, value]) => (
                                          <div key={label} className="rounded-2xl border border-castleton/15 bg-white p-3.5">
                                            <p className="text-sm text-black/70">{label}</p>
                                            <p className="text-3xl font-semibold text-black">{value}%</p>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="space-y-3">
                                        {[
                                          ['Activities', detail.activities],
                                          ['Tasks', detail.tasks],
                                          ['Quality', detail.quality],
                                          ['Collaboration', detail.collaboration],
                                          ['Consistency', detail.consistency],
                                        ].map(([label, value]) => (
                                          <div key={label}>
                                            <div className="flex items-center justify-between mb-1">
                                              <p className="text-sm font-medium text-black/80">{label}</p>
                                              <p className="text-sm font-semibold text-black">{value}%</p>
                                            </div>
                                            <div className="h-2.5 rounded-full bg-[#e7ece8] overflow-hidden">
                                              <motion.div
                                                className={`h-full rounded-full ${selectedAnalyticsIntern.low ? 'bg-[#c05345]' : 'bg-castleton'}`}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${value}%` }}
                                                transition={{ duration: 0.45, ease: 'easeOut' }}
                                              />
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </>
                                  )
                                })()}
                              </motion.div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    ) : activeAdminTab === 'Reports' ? (
                      <div className="space-y-5">
                        <motion.div
                          className="rounded-[24px] border border-castleton/20 bg-white p-5 sm:p-6"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                            <div>
                              <h2 className="text-3xl sm:text-4xl font-semibold text-black mb-1">Performance Reports</h2>
                              <p className="text-black/70 text-base sm:text-lg">
                                Operational report snapshots with KPI trend, delivery status, and intern-level details.
                              </p>
                            </div>
                            <select
                              value={reportsSortBy}
                              onChange={(event) => setReportsSortBy(event.target.value)}
                              className="focus-brand rounded-full border border-castleton/20 bg-white px-4 py-2 text-sm font-semibold text-castleton"
                            >
                              <option value="score-desc">Sort: Score High-Low</option>
                              <option value="score-asc">Sort: Score Low-High</option>
                              <option value="name-asc">Sort: Name A-Z</option>
                              <option value="name-desc">Sort: Name Z-A</option>
                            </select>
                            <input
                              type="text"
                              value={reportsSearch}
                              onChange={(event) => setReportsSearch(event.target.value)}
                              placeholder="Search intern"
                              className="focus-brand min-w-[220px] rounded-full border border-castleton/20 bg-white px-4 py-2 text-sm font-medium text-black"
                            />
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                            {[
                              ['Avg Eval', Math.round(filteredReportInsights.reduce((sum, item) => sum + item.score, 0) / Math.max(filteredReportInsights.length, 1)), '%'],
                              ['Avg QA Pass', Math.round(filteredReportInsights.reduce((sum, item) => sum + item.qaPassRate, 0) / Math.max(filteredReportInsights.length, 1)), '%'],
                              ['Tasks Done', filteredReportInsights.reduce((sum, item) => sum + item.completedTasks, 0), ''],
                              ['Watch/At Risk', filteredReportInsights.filter((item) => item.attendanceFlag !== 'Healthy').length, ''],
                              ['Low Performers', filteredReportInsights.filter((item) => item.low).length, ''],
                            ].map(([label, value, suffix]) => (
                              <div key={label} className="rounded-2xl border border-castleton/15 bg-[#f6f9f7] p-3">
                                <p className="text-xs uppercase tracking-[0.12em] text-castleton">{label}</p>
                                <p className="text-2xl font-semibold text-black">
                                  {value}
                                  {suffix}
                                </p>
                              </div>
                            ))}
                          </div>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {filteredReportInsights.map((intern, index) => (
                            <motion.button
                              key={`report-${intern.name}`}
                              type="button"
                              onClick={() => {
                                setSelectedAnalyticsIntern(intern)
                                runAdminAction(`Opened report detail: ${intern.name}`)
                              }}
                              className="admin-name-card rounded-[22px] border border-castleton/15 bg-white p-4 sm:p-5 text-left"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.22, delay: Math.min(index * 0.012, 0.2) }}
                              whileHover={{ y: -4, boxShadow: '0 16px 36px -28px rgba(11,92,66,0.45)' }}
                            >
                              <div className="flex items-start justify-between gap-3 mb-2">
                                <div>
                                  <h3 className="text-lg font-semibold text-black leading-tight">{intern.name}</h3>
                                  <p className="text-xs text-black/60 mt-1">{intern.school}</p>
                                  <p className="text-[11px] text-black/60 mt-1">
                                    {intern.gender || '-'} | {intern.course || '-'}
                                  </p>
                                </div>
                                <span className="text-sm font-semibold text-castleton">{intern.score}%</span>
                              </div>
                              <p className="text-xs uppercase tracking-[0.12em] text-black/55 mb-3">{intern.track || 'AI Data Operations'}</p>
                              <div className="grid grid-cols-3 gap-2 mb-3">
                                <div className="rounded-xl bg-[#f3f7f5] border border-castleton/10 px-2.5 py-2">
                                  <p className="text-[11px] text-black/60">Tasks</p>
                                  <p className="text-lg font-semibold text-black">{intern.completedTasks}</p>
                                </div>
                                <div className="rounded-xl bg-[#f3f7f5] border border-castleton/10 px-2.5 py-2">
                                  <p className="text-[11px] text-black/60">QA Pass</p>
                                  <p className="text-lg font-semibold text-black">{intern.qaPassRate}%</p>
                                </div>
                                <div className="rounded-xl bg-[#f3f7f5] border border-castleton/10 px-2.5 py-2">
                                  <p className="text-[11px] text-black/60">Trend</p>
                                  <p className="text-lg font-semibold text-black">{intern.trend}</p>
                                </div>
                              </div>
                              <div className="h-2 rounded-full bg-[#e8ece8] overflow-hidden mb-2">
                                <motion.div
                                  className={intern.low ? 'h-full bg-[#c05345]' : 'h-full bg-castleton'}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${intern.score}%` }}
                                  transition={{ duration: 0.42 }}
                                />
                              </div>
                              <p className="text-sm text-black/75">Attendance status: {intern.attendanceFlag}</p>
                            </motion.button>
                          ))}
                        </div>
                        <AnimatePresence>
                          {selectedAnalyticsIntern ? (
                            <motion.div
                              className="fixed inset-0 z-[80] bg-black/45 backdrop-blur-[2px] flex items-center justify-center p-4"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              onClick={() => setSelectedAnalyticsIntern(null)}
                            >
                              <motion.div
                                className="w-full max-w-3xl rounded-[24px] border border-castleton/25 bg-[#f5f7f6] shadow-2xl p-5 sm:p-6"
                                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 12, scale: 0.98 }}
                                transition={{ duration: 0.22 }}
                                onClick={(event) => event.stopPropagation()}
                              >
                                <div className="flex items-start justify-between gap-3 mb-4">
                                  <div>
                                    <p className="text-xs uppercase tracking-[0.12em] text-castleton mb-1">Report Detail</p>
                                    <h3 className="text-2xl sm:text-3xl font-semibold text-black leading-tight">{selectedAnalyticsIntern.name}</h3>
                                    <p className="text-sm text-black/65 mt-1">{selectedAnalyticsIntern.school}</p>
                                    <p className="text-sm text-black/65 mt-1">
                                      {selectedAnalyticsIntern.gender || '-'} | {selectedAnalyticsIntern.course || '-'}
                                    </p>
                                    <p className="text-sm text-black/65 mt-1">
                                      {selectedAnalyticsIntern.contact || '-'} | {selectedAnalyticsIntern.requiredHours || '-'} hrs required
                                    </p>
                                    <p className="text-sm text-black/65 mt-1">Monthly report pack: March 2026</p>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => setSelectedAnalyticsIntern(null)}
                                    className="focus-brand rounded-full border border-castleton/20 px-3 py-1.5 text-sm font-semibold text-castleton hover:bg-castleton hover:text-white transition-colors"
                                  >
                                    Close
                                  </button>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                                  {[
                                    ['Performance', selectedAnalyticsIntern.performance],
                                    ['Attendance', selectedAnalyticsIntern.attendance],
                                    ['Progress', selectedAnalyticsIntern.progress],
                                    ['Eval', getInternBreakdown(selectedAnalyticsIntern).evalScore],
                                  ].map(([label, value]) => (
                                    <div key={label} className="rounded-2xl border border-castleton/15 bg-white p-3.5">
                                      <p className="text-sm text-black/70">{label}</p>
                                      <p className="text-3xl font-semibold text-black">{value}%</p>
                                    </div>
                                  ))}
                                </div>
                                <div className="rounded-2xl border border-castleton/15 bg-white p-4">
                                  <p className="text-sm font-semibold text-black mb-1">Narrative Summary</p>
                                  <p className="text-sm text-black/75 leading-relaxed">
                                    This intern delivered measurable output quality with stable attendance. Next action is to align difficulty
                                    of assigned tasks with current strengths while monitoring consistency for upcoming delivery cycles.
                                  </p>
                                </div>
                              </motion.div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    ) : activeAdminTab === 'Manage Interns' ? (
                      <div className="space-y-5">
                        <motion.div
                          className="rounded-[24px] border border-castleton/20 bg-white p-5 sm:p-6"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <h2 className="text-3xl sm:text-4xl font-semibold text-black">Intern Admin Settings</h2>
                          <p className="text-black/70 text-base sm:text-lg">
                            Profile-level management for intern records. Analytics metrics are system-generated and not directly editable here.
                          </p>
                        </motion.div>

                        <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-4 items-stretch">
                          <motion.article
                            className="rounded-[22px] border border-castleton/15 bg-[linear-gradient(180deg,#ffffff,#f6faf8)] p-4 sm:p-5 h-full shadow-[0_18px_50px_-36px_rgba(19,48,32,0.5)]"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.22 }}
                          >
                            <p className="text-xs uppercase tracking-[0.1em] text-castleton">Intern Intake</p>
                            <h3 className="text-2xl sm:text-3xl font-semibold text-black mt-1">Add New Intern</h3>
                            <p className="text-black/70 mt-2 text-sm sm:text-base">
                              Use the guided stepper to create a new intern profile with complete assignment details.
                            </p>
                            <div className="mt-5 flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={openInternStepperForCreate}
                                className="focus-brand rounded-full bg-castleton text-white px-5 py-2.5 text-sm font-semibold hover:bg-serpent transition-colors"
                              >
                                Add Intern
                              </button>
                              {editingInternIndex !== null ? (
                                <button
                                  type="button"
                                  onClick={() => {
                                    resetInternForm()
                                    runAdminAction('Editing cancelled')
                                  }}
                                  className="focus-brand rounded-full border border-castleton/20 px-4 py-2.5 text-sm font-semibold text-castleton hover:bg-castleton hover:text-white transition-colors"
                                >
                                  Cancel Edit
                                </button>
                              ) : null}
                            </div>

                            <div className="mt-5 rounded-xl border border-castleton/15 bg-[#f7faf8] px-3 py-2.5">
                              <p className="text-xs text-black/70">
                                Tip: Use complete school and mentor details for cleaner Analytics, Evaluation, and Reports output.
                              </p>
                            </div>

                            <div className="mt-3 rounded-xl border border-castleton/15 bg-[#f7faf8] p-3">
                              <p className="text-xs uppercase tracking-[0.1em] text-castleton mb-2">Recent Intern Entries</p>
                              <div className="space-y-2">
                                {settingsInternRows.slice(0, 4).map((intern) => (
                                  <div key={`recent-left-${intern.sourceIndex}-${intern.name}`} className="admin-name-card flex items-center justify-between gap-2 rounded-lg border border-castleton/10 bg-white px-2.5 py-2">
                                    <div className="min-w-0">
                                      <p className="text-sm font-semibold text-black truncate">{intern.name}</p>
                                      <p className="text-xs text-black/65 truncate">{intern.school || schoolOptions[0]}</p>
                                    </div>
                                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                                      normalizeInternStatus(intern.status) === 'Active'
                                        ? 'bg-[#e9f3ee] text-castleton'
                                        : normalizeInternStatus(intern.status) === 'Complete'
                                          ? 'bg-[#fff2e3] text-[#b26b1f]'
                                          : normalizeInternStatus(intern.status) === 'Suspend'
                                            ? 'bg-[#fff0ed] text-[#9d4436]'
                                            : 'bg-[#eef2ff] text-[#3953a6]'
                                    }`}>
                                      {getInternStatusLabel(intern.status || 'Active')}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.article>

                          <motion.div
                            className="rounded-[22px] border border-castleton/15 bg-[linear-gradient(180deg,#ffffff,#f6faf8)] p-4 sm:p-5 h-full flex flex-col gap-3 shadow-[0_18px_50px_-36px_rgba(19,48,32,0.5)]"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.22, delay: 0.03 }}
                          >
                            <div className="grid grid-cols-2 gap-3">
                              {[
                                ['Total Interns', internAnalyticsData.length],
                                ['Active', internAnalyticsData.filter((item) => normalizeInternStatus(item.status) === 'Active').length],
                                ['Complete', internAnalyticsData.filter((item) => normalizeInternStatus(item.status) === 'Complete').length],
                                ['Suspended', internAnalyticsData.filter((item) => normalizeInternStatus(item.status) === 'Suspend').length],
                              ].map(([label, value]) => (
                                <motion.div
                                  key={label}
                                  className="rounded-xl border border-castleton/15 bg-[#f7faf8] p-3"
                                  whileHover={{ y: -2, scale: 1.01 }}
                                  transition={{ duration: 0.16 }}
                                >
                                  <p className="text-xs uppercase tracking-[0.1em] text-castleton">{label}</p>
                                  <p className="text-2xl font-semibold text-black">{value}</p>
                                </motion.div>
                              ))}
                            </div>
                            <p className="text-sm text-black/70 leading-relaxed">
                              Manage profile records and assignment ownership here. View analytics from the Analytics, Evaluation, and Reports tabs.
                            </p>

                            <div className="rounded-xl border border-castleton/15 bg-[#f7faf8] p-3 mt-auto">
                              <p className="text-xs uppercase tracking-[0.1em] text-castleton mb-2">School Distribution</p>
                              <div className="space-y-2">
                                {schoolOptions.map((school) => {
                                  const count = internAnalyticsData.filter((item) => (item.school || schoolOptions[0]) === school).length
                                  const percent = totalInterns ? Math.round((count / totalInterns) * 100) : 0
                                  return (
                                    <motion.div key={`school-dist-${school}`} className="space-y-1" whileHover={{ x: 2 }} transition={{ duration: 0.14 }}>
                                      <div className="flex items-center justify-between gap-2">
                                        <p className="text-xs text-black/80 truncate">{school}</p>
                                        <p className="text-xs font-semibold text-castleton">{count}</p>
                                      </div>
                                      <div className="h-1.5 rounded-full bg-[#dde5e0] overflow-hidden">
                                        <motion.div
                                          className="h-full bg-castleton"
                                          initial={{ width: 0 }}
                                          animate={{ width: `${percent}%` }}
                                          transition={{ duration: 0.45, ease: 'easeOut' }}
                                        />
                                      </div>
                                    </motion.div>
                                  )
                                })}
                              </div>
                            </div>
                          </motion.div>
                        </div>

                        <div className="rounded-[22px] border border-castleton/15 bg-white p-4 sm:p-5">
                          <div className="flex flex-wrap gap-2 mb-4">
                            <input
                              type="text"
                              value={settingsSearch}
                              onChange={(event) => setSettingsSearch(event.target.value)}
                              placeholder="Search name, email, school, course, contact, or hours"
                              className="focus-brand min-w-[260px] flex-1 rounded-xl border border-castleton/20 px-3 py-2.5 bg-[#f9fbfa]"
                            />
                            <select
                              value={settingsStatusFilter}
                              onChange={(event) => setSettingsStatusFilter(event.target.value)}
                              className="focus-brand rounded-xl border border-castleton/20 px-3 py-2.5 bg-[#f9fbfa] font-medium text-castleton"
                            >
                              <option value="All">All Status</option>
                              <option value="Active">Active</option>
                              <option value="Complete">Complete</option>
                              <option value="Suspend">Suspend</option>
                            </select>
                          </div>
                          <div className="w-full overflow-x-auto overflow-y-visible rounded-xl border border-castleton/10">
                            <table className="min-w-[1550px] text-left">
                              <thead className="sticky top-0 z-10 bg-[#eef4f0]">
                                <tr className="border-b border-castleton/15 text-black/75">
                                  <th className="py-2 pr-3 text-sm font-semibold whitespace-nowrap">Name</th>
                                  <th className="py-2 pr-3 text-sm font-semibold whitespace-nowrap">Gender</th>
                                  <th className="py-2 pr-3 text-sm font-semibold whitespace-nowrap">Email</th>
                                  <th className="py-2 pr-3 text-sm font-semibold whitespace-nowrap">Contact</th>
                                  <th className="py-2 pr-3 text-sm font-semibold whitespace-nowrap">Course</th>
                                  <th className="py-2 pr-3 text-sm font-semibold whitespace-nowrap">School/University</th>
                                  <th className="py-2 pr-3 text-sm font-semibold whitespace-nowrap">Required Hours</th>
                                  <th className="py-2 pr-3 text-sm font-semibold whitespace-nowrap">Track</th>
                                  <th className="py-2 pr-3 text-sm font-semibold whitespace-nowrap">Status</th>
                                  <th className="py-2 pr-3 text-sm font-semibold whitespace-nowrap">Mentor</th>
                                  <th className="py-2 pr-3 text-sm font-semibold whitespace-nowrap">Joined</th>
                                  <th className="py-2 pr-3 text-sm font-semibold whitespace-nowrap">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {settingsInternRows.map((intern, index) => (
                                    <tr key={`settings-${intern.name}-${index}`} className="border-b border-castleton/10">
                                      <td className="py-2 pr-3 text-sm font-medium text-black whitespace-nowrap">{intern.name}</td>
                                      <td className="py-2 pr-3 text-sm text-black/80 whitespace-nowrap">{intern.gender || '-'}</td>
                                      <td className="py-2 pr-3 text-sm text-black/80 whitespace-nowrap">{intern.email}</td>
                                      <td className="py-2 pr-3 text-sm text-black/80 whitespace-nowrap">{intern.contact || '-'}</td>
                                      <td className="py-2 pr-3 text-sm text-black/80 whitespace-nowrap">{intern.course || '-'}</td>
                                      <td className="py-2 pr-3 text-sm text-black/80 whitespace-nowrap">{intern.school || schoolOptions[0]}</td>
                                      <td className="py-2 pr-3 text-sm text-black/80 whitespace-nowrap">{intern.requiredHours || '-'}</td>
                                      <td className="py-2 pr-3 text-sm text-black/80 whitespace-nowrap">{intern.track || 'AI Data Operations'}</td>
                                      <td className="py-2 pr-3 text-sm text-black/80 whitespace-nowrap">{getInternStatusLabel(intern.status || 'Active')}</td>
                                      <td className="py-2 pr-3 text-sm text-black/80 whitespace-nowrap">{intern.mentor || 'Unassigned'}</td>
                                      <td className="py-2 pr-3 text-sm text-black/80 whitespace-nowrap">{intern.joinDate || '-'}</td>
                                      <td className="py-2 pr-3 whitespace-nowrap">
                                        <div className="flex gap-2">
                                          <button
                                            type="button"
                                            onClick={() => handleInternEdit(intern.sourceIndex)}
                                            className="focus-brand rounded-lg border border-castleton/20 px-2.5 py-1 text-xs font-semibold text-castleton hover:bg-castleton hover:text-white transition-colors"
                                          >
                                            Edit
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => handleInternDelete(intern.sourceIndex)}
                                            className="focus-brand rounded-lg border border-[#c67c72]/40 px-2.5 py-1 text-xs font-semibold text-[#9d4436] hover:bg-[#c05345] hover:text-white transition-colors"
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <AnimatePresence>
                          {isInternStepperOpen ? (
                            <motion.div
                              className="fixed inset-0 z-[90] bg-black/45 backdrop-blur-[5px] flex items-center justify-center p-4"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              onClick={() => {
                                setInternStepperError('')
                                setIsInternStepperOpen(false)
                              }}
                            >
                              <motion.form
                                onSubmit={handleInternSave}
                                className="w-full max-w-3xl rounded-[26px] border border-castleton/20 bg-[linear-gradient(165deg,#f8fbf9,#edf5f1_65%,#e8f0ec)] p-5 sm:p-6 shadow-2xl"
                                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                transition={{ duration: 0.22 }}
                                onClick={(event) => event.stopPropagation()}
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div>
                                    <p className="text-xs uppercase tracking-[0.11em] text-castleton mb-1">Manage Interns</p>
                                    <h3 className="text-2xl sm:text-3xl font-semibold text-black">
                                      {editingInternIndex !== null ? 'Edit Intern Profile' : 'Add Intern Profile'}
                                    </h3>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setInternStepperError('')
                                      setIsInternStepperOpen(false)
                                    }}
                                    className="focus-brand inline-flex w-9 h-9 rounded-full items-center justify-center border border-castleton/20 text-castleton hover:bg-castleton hover:text-white transition-colors"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>

                                <div className="mt-5">
                                  <div className="relative px-1">
                                    <div className="h-[2px] w-full bg-castleton/15 rounded-full" />
                                    <motion.div
                                      className="absolute left-1 top-0 h-[2px] bg-castleton rounded-full"
                                      initial={{ width: '0%' }}
                                      animate={{ width: `${((internStepperStep - 1) / 2) * 100}%` }}
                                      transition={{ duration: 0.28, ease: 'easeOut' }}
                                    />
                                  </div>
                                  <div className="mt-3 grid grid-cols-3 gap-2">
                                    {[
                                      { step: 1, title: 'Basic Info', hint: 'Name and email' },
                                      { step: 2, title: 'Profile', hint: 'Gender, course, contact' },
                                      { step: 3, title: 'Review', hint: 'Hours, join date, submit' },
                                    ].map((item) => (
                                      <motion.button
                                        key={item.step}
                                        type="button"
                                        onClick={() => {
                                          if (item.step <= internStepperStep || validateInternStepperStep(internStepperStep)) {
                                            setInternStepperStep(item.step)
                                            setInternStepperError('')
                                          }
                                        }}
                                        className={`rounded-xl border px-2.5 py-2 text-left transition-all ${
                                          internStepperStep === item.step
                                            ? 'border-castleton bg-[#eaf4ef]'
                                            : item.step < internStepperStep
                                              ? 'border-castleton/25 bg-[#f3faf6]'
                                              : 'border-castleton/15 bg-white'
                                        }`}
                                        whileHover={{ y: -1 }}
                                        whileTap={{ scale: 0.98 }}
                                      >
                                        <div className="flex items-center gap-2">
                                          <span
                                            className={`inline-flex w-5 h-5 items-center justify-center rounded-full text-[11px] font-semibold ${
                                              internStepperStep === item.step
                                                ? 'bg-castleton text-white'
                                                : item.step < internStepperStep
                                                  ? 'bg-castleton/15 text-castleton'
                                                  : 'bg-castleton/10 text-black/70'
                                            }`}
                                          >
                                            {item.step}
                                          </span>
                                          <p className="text-sm font-semibold text-black truncate">{item.title}</p>
                                        </div>
                                        <p className="text-xs text-black/60 mt-1 truncate">{item.hint}</p>
                                      </motion.button>
                                    ))}
                                  </div>
                                </div>

                                <AnimatePresence mode="wait">
                                  <motion.div
                                    key={`intern-step-${internStepperStep}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.2 }}
                                    className="mt-5 rounded-2xl border border-castleton/15 bg-white/90 p-3.5 sm:p-4"
                                  >
                                    <p className="text-xs uppercase tracking-[0.11em] text-castleton mb-3">
                                      {internStepperStep === 1
                                        ? 'Intern Identity'
                                        : internStepperStep === 2
                                          ? 'Assignment Details'
                                          : 'Final Review'}
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                      {internStepperStep === 1 ? (
                                        <>
                                          <input
                                            type="text"
                                            placeholder="Intern name"
                                            value={internForm.name}
                                            onChange={(event) => setInternForm((prev) => ({ ...prev, name: event.target.value }))}
                                            onInput={() => setInternStepperError('')}
                                            className="focus-brand rounded-xl border border-castleton/20 px-3 py-2.5 bg-white"
                                          />
                                          <input
                                            type="email"
                                            placeholder="Intern email"
                                            value={internForm.email}
                                            onChange={(event) => setInternForm((prev) => ({ ...prev, email: event.target.value }))}
                                            onInput={() => setInternStepperError('')}
                                            className="focus-brand rounded-xl border border-castleton/20 px-3 py-2.5 bg-white"
                                          />
                                        </>
                                      ) : null}

                                      {internStepperStep === 2 ? (
                                        <>
                                          <select
                                            value={internForm.gender}
                                            onChange={(event) => setInternForm((prev) => ({ ...prev, gender: event.target.value }))}
                                            className="focus-brand rounded-xl border border-castleton/20 px-3 py-2.5 bg-white"
                                          >
                                            <option>Male</option>
                                            <option>Female</option>
                                          </select>
                                          <input
                                            type="text"
                                            placeholder="Course / educational background"
                                            value={internForm.course}
                                            onChange={(event) => setInternForm((prev) => ({ ...prev, course: event.target.value }))}
                                            className="focus-brand rounded-xl border border-castleton/20 px-3 py-2.5 bg-white"
                                          />
                                          <input
                                            type="text"
                                            placeholder="Contact number"
                                            value={internForm.contact}
                                            onChange={(event) => setInternForm((prev) => ({ ...prev, contact: event.target.value }))}
                                            className="focus-brand rounded-xl border border-castleton/20 px-3 py-2.5 bg-white"
                                          />
                                          <select
                                            value={internForm.school}
                                            onChange={(event) => setInternForm((prev) => ({ ...prev, school: event.target.value }))}
                                            className="focus-brand rounded-xl border border-castleton/20 px-3 py-2.5 bg-white"
                                          >
                                            {schoolOptions.map((school) => (
                                              <option key={school} value={school}>
                                                {school}
                                              </option>
                                            ))}
                                          </select>
                                          <select
                                            value={internForm.track}
                                            onChange={(event) => setInternForm((prev) => ({ ...prev, track: event.target.value }))}
                                            className="focus-brand rounded-xl border border-castleton/20 px-3 py-2.5 bg-white"
                                          >
                                            <option>AI Data Operations</option>
                                            <option>Quality Assurance</option>
                                            <option>Reporting & PMO</option>
                                            <option>Machine Learning Enablement</option>
                                          </select>
                                          <select
                                            value={internForm.status}
                                            onChange={(event) => setInternForm((prev) => ({ ...prev, status: event.target.value }))}
                                            className="focus-brand rounded-xl border border-castleton/20 px-3 py-2.5 bg-white"
                                          >
                                            <option>Active</option>
                                            <option>Complete</option>
                                            <option>Suspend</option>
                                          </select>
                                          <input
                                            type="text"
                                            placeholder="Assigned mentor"
                                            value={internForm.mentor}
                                            onChange={(event) => setInternForm((prev) => ({ ...prev, mentor: event.target.value }))}
                                            className="focus-brand rounded-xl border border-castleton/20 px-3 py-2.5 bg-white"
                                          />
                                        </>
                                      ) : null}

                                      {internStepperStep === 3 ? (
                                        <>
                                          <input
                                            type="number"
                                            min="1"
                                            placeholder="Required hours"
                                            value={internForm.requiredHours}
                                            onChange={(event) => setInternForm((prev) => ({ ...prev, requiredHours: event.target.value }))}
                                            className="focus-brand rounded-xl border border-castleton/20 px-3 py-2.5 bg-white"
                                          />
                                          <input
                                            type="date"
                                            value={internForm.joinDate}
                                            onChange={(event) => setInternForm((prev) => ({ ...prev, joinDate: event.target.value }))}
                                            className="focus-brand rounded-xl border border-castleton/20 px-3 py-2.5 bg-white"
                                          />
                                          <div className="rounded-xl border border-castleton/15 bg-[#f9fbfa] px-3 py-2.5 text-sm text-black/80">
                                            <p>
                                              <span className="font-semibold">Name:</span> {internForm.name || '-'}
                                            </p>
                                            <p>
                                              <span className="font-semibold">Email:</span> {internForm.email || '-'}
                                            </p>
                                            <p>
                                              <span className="font-semibold">School:</span> {internForm.school || '-'}
                                            </p>
                                            <p>
                                              <span className="font-semibold">Gender:</span> {internForm.gender || '-'}
                                            </p>
                                            <p>
                                              <span className="font-semibold">Course:</span> {internForm.course || '-'}
                                            </p>
                                            <p>
                                              <span className="font-semibold">Contact:</span> {internForm.contact || '-'}
                                            </p>
                                            <p>
                                              <span className="font-semibold">Required Hours:</span> {internForm.requiredHours || '-'}
                                            </p>
                                          </div>
                                        </>
                                      ) : null}
                                    </div>
                                  </motion.div>
                                </AnimatePresence>

                                {internStepperError ? (
                                  <motion.div
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    className="mt-3 rounded-xl border border-[#c05345]/35 bg-[#fff3f1] px-3 py-2 text-sm font-medium text-[#9d4436]"
                                  >
                                    {internStepperError}
                                  </motion.div>
                                ) : null}

                                <div className="mt-6 flex flex-wrap justify-between gap-2">
                                  <motion.button
                                    type="button"
                                    onClick={() => setInternStepperStep((prev) => Math.max(1, prev - 1))}
                                    className="focus-brand rounded-full border border-castleton/20 px-4 py-2 text-sm font-semibold text-castleton hover:bg-castleton hover:text-white transition-colors"
                                    whileHover={{ y: -1 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    Back
                                  </motion.button>
                                  <div className="flex flex-wrap gap-2">
                                    <motion.button
                                      type="button"
                                      onClick={resetInternForm}
                                      className="focus-brand rounded-full border border-castleton/20 px-4 py-2 text-sm font-semibold text-castleton hover:bg-castleton hover:text-white transition-colors"
                                      whileHover={{ y: -1 }}
                                      whileTap={{ scale: 0.98 }}
                                    >
                                      Reset
                                    </motion.button>
                                    {internStepperStep < 3 ? (
                                      <motion.button
                                        type="button"
                                        onClick={() => {
                                          if (validateInternStepperStep(internStepperStep)) {
                                            setInternStepperStep((prev) => Math.min(3, prev + 1))
                                          }
                                        }}
                                        className="focus-brand inline-flex items-center gap-1.5 rounded-full bg-castleton text-white px-4 py-2 text-sm font-semibold hover:bg-serpent transition-colors"
                                        whileHover={{ y: -1 }}
                                        whileTap={{ scale: 0.98 }}
                                      >
                                        Next
                                        <ArrowRight className="w-4 h-4" />
                                      </motion.button>
                                    ) : (
                                      <motion.button
                                        type="submit"
                                        className="focus-brand rounded-full bg-castleton text-white px-4 py-2 text-sm font-semibold hover:bg-serpent transition-colors"
                                        whileHover={{ y: -1 }}
                                        whileTap={{ scale: 0.98 }}
                                      >
                                        {editingInternIndex !== null ? 'Update Intern Profile' : 'Add Intern'}
                                      </motion.button>
                                    )}
                                  </div>
                                </div>
                              </motion.form>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <>
                        <motion.article
                          className="rounded-[24px] p-6 sm:p-8 border border-castleton/25 bg-[radial-gradient(circle_at_80%_20%,rgba(244,179,71,0.28),transparent_36%),linear-gradient(145deg,#0f5f44,#0b4e39_56%,#0a3f31)] text-[#f2f6ec] mb-5"
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35 }}
                        >
                          <p className="text-xs uppercase tracking-[0.12em] text-[#f7dba3] mb-3">{activeAdminData.status}</p>
                          <h2 className="text-4xl sm:text-5xl font-semibold leading-[0.96] mb-4">
                            {activeAdminData.titleA} <span className="text-saffron">{activeAdminData.titleB}</span>
                            <br />
                            {activeAdminData.titleC}
                          </h2>
                          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                            <button
                              type="button"
                              onClick={() => runAdminAction(`${activeAdminTab}: primary action started`)}
                              className="focus-brand rounded-full bg-saffron text-black font-semibold px-5 py-2.5 hover:brightness-95 transition"
                            >
                              Continue
                            </button>
                            <p className="text-[#f2f6ec]/80">{activeAdminData.module}</p>
                          </div>
                          <div className="grid grid-cols-3 gap-4 mt-7 max-w-xl">
                            <div>
                              <p className="text-4xl font-semibold">{activeAdminData.completion}</p>
                              <p className="text-xs text-[#f2f6ec]/70 uppercase tracking-[0.12em]">Completion</p>
                            </div>
                            <div>
                              <p className="text-4xl font-semibold">{activeAdminData.spent}</p>
                              <p className="text-xs text-[#f2f6ec]/70 uppercase tracking-[0.12em]">Spent</p>
                            </div>
                            <div>
                              <p className="text-4xl font-semibold">{activeAdminData.grade}</p>
                              <p className="text-xs text-[#f2f6ec]/70 uppercase tracking-[0.12em]">Avg Grade</p>
                            </div>
                          </div>
                        </motion.article>

                        <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-4">
                          <motion.article
                            className="rounded-[22px] border border-castleton/20 bg-white p-5"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.04 }}
                          >
                            <p className="text-2xl font-semibold mb-1">Activity</p>
                            <p className="text-sm text-black/65 mb-4">Recent updates</p>
                            <div className="space-y-3">
                              {activeAdminData.activity.map((item) => (
                                <button
                                  key={item[1]}
                                  type="button"
                                  onClick={() => runAdminAction(`Opened: ${item[1]}`)}
                                  className="w-full text-left rounded-2xl border border-castleton/15 bg-[#f6f8f7] p-3 flex items-center gap-3 hover:border-castleton/35 hover:bg-white transition"
                                >
                                  <span className="inline-flex w-11 h-11 rounded-xl bg-saffron/25 text-black font-bold items-center justify-center">
                                    {item[0]}
                                  </span>
                                  <div>
                                    <p className="font-semibold">{item[1]}</p>
                                    <p className="text-sm text-black/65">{item[2]}</p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </motion.article>

                          <div className="space-y-4">
                            <motion.article
                              className="rounded-[22px] border border-saffron/40 bg-saffron p-5"
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.08 }}
                            >
                              <p className="text-xs uppercase tracking-[0.12em] mb-2">Efficiency</p>
                              <p className="text-5xl font-semibold">{activeAdminData.efficiency}</p>
                            </motion.article>
                            <motion.article
                              className="rounded-[22px] border border-castleton/20 bg-castleton text-[#f2f6ec] p-5"
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.12 }}
                            >
                              <p className="text-xs uppercase tracking-[0.12em] text-[#f2f6ec]/75 mb-2">Level</p>
                              <p className="text-5xl font-semibold">{activeAdminData.level}</p>
                              <p className="text-sm text-[#f2f6ec]/75">{activeAdminData.levelLabel}</p>
                            </motion.article>
                            <motion.article
                              className="rounded-[22px] border border-castleton/20 bg-white p-5"
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.16 }}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <div>
                                  <p className="text-2xl font-semibold">Weekly Goals</p>
                                  <p className="text-sm text-black/70">{activeAdminData.weekly}</p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => runAdminAction('Weekly goals synced')}
                                  className="focus-brand rounded-full border border-castleton/20 px-3 py-1.5 text-sm font-semibold hover:bg-castleton hover:text-white transition-colors"
                                >
                                  Sync
                                </button>
                              </div>
                            </motion.article>
                          </div>
                        </div>
                      </>
                    )}
                  </main>
                </div>

                <AnimatePresence>
                  {isAdminProfileModalOpen ? (
                    <motion.div
                      className="fixed inset-0 z-[95] bg-black/55 backdrop-blur-[3px] flex items-center justify-center p-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsAdminProfileModalOpen(false)}
                    >
                      <motion.form
                        onSubmit={handleAdminProfileSave}
                        className="w-full max-w-2xl rounded-[28px] border border-castleton/25 bg-[linear-gradient(165deg,#0f5a3f,#0d4d38_52%,#0a3f31)] text-[#eef4e9] p-5 sm:p-7 shadow-2xl"
                        initial={{ opacity: 0, y: 16, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.98 }}
                        transition={{ duration: 0.22 }}
                        onClick={(event) => event.stopPropagation()}
                      >
                        <div className="flex items-start justify-between gap-4 mb-6">
                          <div>
                            <h2 className="text-2xl sm:text-3xl font-semibold">Edit Profile</h2>
                            <p className="text-sm text-white/75">Update your admin details</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setIsAdminProfileModalOpen(false)}
                            className="focus-brand inline-flex w-9 h-9 rounded-full items-center justify-center border border-white/30 text-white hover:bg-white/15 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={adminProfileForm.firstName}
                            onChange={(event) => setAdminProfileForm((prev) => ({ ...prev, firstName: event.target.value }))}
                            placeholder="First name"
                            className="focus-brand rounded-xl border border-white/20 bg-[#0c3c2f]/65 px-3.5 py-2.5 text-white placeholder:text-white/45"
                          />
                          <input
                            type="text"
                            value={adminProfileForm.lastName}
                            onChange={(event) => setAdminProfileForm((prev) => ({ ...prev, lastName: event.target.value }))}
                            placeholder="Last name"
                            className="focus-brand rounded-xl border border-white/20 bg-[#0c3c2f]/65 px-3.5 py-2.5 text-white placeholder:text-white/45"
                          />
                        </div>

                        <div className="mt-3 space-y-3">
                          <div className="relative">
                            <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/55" />
                            <input
                              type="email"
                              value={adminProfileForm.email}
                              onChange={(event) => setAdminProfileForm((prev) => ({ ...prev, email: event.target.value }))}
                              placeholder="youname@gmail.com"
                              className="focus-brand w-full rounded-xl border border-white/20 bg-[#0c3c2f]/65 pl-9 pr-3.5 py-2.5 text-white placeholder:text-white/45"
                            />
                          </div>
                          <div className="relative">
                            <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/55" />
                            <input
                              type="text"
                              value={adminProfileForm.phone}
                              onChange={(event) => setAdminProfileForm((prev) => ({ ...prev, phone: event.target.value }))}
                              placeholder="+63 9XX XXX XXXX"
                              className="focus-brand w-full rounded-xl border border-white/20 bg-[#0c3c2f]/65 pl-9 pr-3.5 py-2.5 text-white placeholder:text-white/45"
                            />
                          </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end">
                          <button
                            type="submit"
                            className="focus-brand rounded-full bg-saffron text-black font-semibold px-5 py-2.5 hover:brightness-95 transition"
                          >
                            Save Changes
                          </button>
                        </div>
                      </motion.form>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </section>
            ) : (
              <section className="max-w-xl mx-auto">
                <div className="bg-[#f3f3f3] rounded-3xl border border-castleton/15 p-7 sm:p-9 text-center">
                  <h1 className="text-3xl sm:text-4xl font-semibold mb-3">Restricted Area</h1>
                  <p className="text-black/75 text-lg mb-6">
                    Please sign in first to access the admin dashboard.
                  </p>
                  <button
                    type="button"
                    onClick={() => goToPath('/sign-in')}
                    className="focus-brand inline-flex items-center gap-2 rounded-full border border-serpent/25 bg-serpent px-5 py-2.5 text-white font-semibold hover:bg-castleton transition-colors"
                  >
                    Go to Sign In
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </section>
            )
          ) : currentPath === '/offices' ? (
            <section className="max-w-6xl mx-auto space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.div
                id="offices-overview"
                className="rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true, amount: 0.35 }}
                onViewportEnter={() => setOfficesStatsVisible(true)}
              >
                <div className="absolute -top-24 -right-10 w-72 h-72 bg-white/55 rounded-full blur-3xl" />
                <p className="text-black font-medium uppercase tracking-[0.14em] text-sm mb-5">Offices</p>
                <h1 className="text-4xl sm:text-5xl font-semibold text-black mb-5">
                  Largest Global Data Collection Resources Distribution
                </h1>
                <p className="text-black text-lg max-w-4xl mx-auto">
                  Based on Lifewood&apos;s published offices footprint, we maintain a worldwide delivery presence with
                  extensive online resources and operational coverage across global regions.
                </p>
                <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-4xl">
                  <div className="bg-[#f3f3f3] border border-castleton/15 rounded-2xl py-4 px-4">
                    <p className="text-3xl sm:text-4xl font-semibold text-castleton">
                      <CountUpStat end={56788} useGrouping start={officesStatsVisible} />
                    </p>
                    <p className="text-sm sm:text-base text-black/80">Online Resources</p>
                  </div>
                  <div className="bg-[#f3f3f3] border border-castleton/15 rounded-2xl py-4 px-4">
                    <p className="text-3xl sm:text-4xl font-semibold text-castleton">
                      <CountUpStat end={30} suffix="+" start={officesStatsVisible} />
                    </p>
                    <p className="text-sm sm:text-base text-black/80">Countries</p>
                  </div>
                  <div className="bg-[#f3f3f3] border border-castleton/15 rounded-2xl py-4 px-4">
                    <p className="text-3xl sm:text-4xl font-semibold text-castleton">
                      <CountUpStat end={40} suffix="+" start={officesStatsVisible} />
                    </p>
                    <p className="text-sm sm:text-base text-black/80">Centers</p>
                  </div>
                </div>
              </motion.div>

              <motion.section
                id="offices-map"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.04 }}
              >
                <div className="mb-4 flex items-center justify-between gap-3 flex-wrap">
                  <h2 className="text-3xl sm:text-4xl font-medium">Lifewood Worldwide Pins</h2>
                  <p className="text-sm sm:text-base text-black/75">
                    Click a region to focus the map to that regional footprint.
                  </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 items-start">
                  <aside className="lg:col-span-1 rounded-3xl border border-castleton/15 bg-[#f3f3f3] p-4 sm:p-5">
                    <p className="text-xs uppercase tracking-[0.12em] text-castleton mb-3">Regions</p>
                    <ul className="space-y-2">
                      {officeRegions.map((item) => {
                        const isActive = selectedOfficeRegion === item.region
                        return (
                          <li key={item.region}>
                            <button
                              type="button"
                              onClick={() => setSelectedOfficeRegion(item.region)}
                              className={`focus-brand w-full rounded-2xl border px-3 py-2.5 text-left transition-all flex items-center justify-between gap-2 ${
                                isActive
                                  ? 'bg-serpent text-white border-serpent shadow-soft'
                                  : 'bg-white border-castleton/15 text-black hover:border-castleton/30'
                              }`}
                            >
                              <span className="font-semibold text-sm sm:text-base">{item.region}</span>
                              <span className={`rounded-full px-2 py-0.5 text-xs ${isActive ? 'bg-white/20 text-white' : 'bg-castleton/10 text-castleton'}`}>
                                {item.count}
                              </span>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                    <div className="mt-4 rounded-2xl border border-castleton/15 bg-white p-3">
                      <p className="text-xs uppercase tracking-[0.1em] text-castleton mb-1">Selected</p>
                      <p className="text-base font-semibold text-black">{selectedOfficeRegion}</p>
                      <p className="text-sm text-black/70">
                        {officesForSelectedRegion.length} pinned location{officesForSelectedRegion.length === 1 ? '' : 's'}
                      </p>
                    </div>
                  </aside>

                  <div className="lg:col-span-3">
                    <OfficesMap offices={officesForSelectedRegion} activeRegion={selectedOfficeRegion} />
                  </div>
                </div>
              </motion.section>

              <motion.section
                id="ai-contact"
                className="mt-6 bg-serpent border border-castleton/35 rounded-[32px] p-6 sm:p-7 lg:p-9 text-white relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-castleton/45 blur-3xl" />
                <div className="relative">
                  <img
                    src="https://framerusercontent.com/images/Ca8ppNsvJIfTsWEuHr50gvkDow.png"
                    alt="Lifewood logo"
                    className="h-8 sm:h-9 w-auto mb-5"
                  />
                  <p className="text-lg sm:text-2xl font-medium leading-tight mb-8 max-w-3xl">
                    Need support from our regional delivery teams? Contact the Lifewood team directly.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                    <div>
                      <button
                        type="button"
                        onClick={() => goToPath('/contact-us')}
                        className="focus-brand mb-5 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/12 px-6 py-2 text-lg sm:text-xl font-bold text-[#e7edd8] hover:bg-white/20 transition-colors"
                      >
                        Contact Team
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
                        <a href="mailto:hr.lifewood@gmail.com" className="brand-link hover:text-saffron transition-colors">hr.lifewood@gmail.com</a>
                        <a href="https://www.linkedin.com/company/lifewood-data-technology-ltd./posts/?feedView=all" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">LinkedIn</a>
                        <a href="https://www.facebook.com/LifewoodPH/" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Facebook</a>
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <p className="text-base sm:text-lg mb-4">Find Us On:</p>
                      <div className="flex flex-wrap lg:justify-end gap-3 mb-6">
                        <a href="https://www.linkedin.com/company/lifewood-data-technology-ltd./posts/?feedView=all" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Linkedin className="w-4 h-4" /></a>
                        <a href="https://www.facebook.com/LifewoodPH/" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Facebook className="w-4 h-4" /></a>
                        <a href="https://www.instagram.com/lifewood_official/?hl=af" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Instagram className="w-4 h-4" /></a>
                        <a href="https://www.youtube.com/@LifewoodDataTechnology" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Youtube className="w-4 h-4" /></a>
                      </div>
                      <p className="text-lg sm:text-xl font-medium">&copy; 2026 Lifewood - All Rights Reserved</p>
                    </div>
                  </div>
                </div>
              </motion.section>
            </section>
          ) : currentPath === '/about-us' ? (
            <section className="max-w-6xl mx-auto space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.div
                id="about-overview"
                className="p-8 sm:p-12 relative overflow-hidden"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <h1 className="text-5xl sm:text-6xl font-semibold text-black mb-7">About our company</h1>
                <p className="text-black text-2xl leading-relaxed max-w-6xl">
                  While we are motivated by business and economic objectives, we remain committed to our core business beliefs that shape our corporate and individual behaviour around the world.
                </p>
                <div className="mt-12">
                  <button
                    type="button"
                    onClick={() => goToPath('/contact-us')}
                    className="focus-brand inline-flex items-center gap-2 rounded-full bg-[#f4b347] px-6 py-3 text-lg font-medium text-black hover:brightness-105 transition-all duration-300"
                  >
                    Contact Us
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-castleton text-white">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </button>
                </div>
              </motion.div>

              <motion.section
                id="about-showcase"
                className="p-5 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.04 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 items-stretch">
                  <motion.article
                    className="lg:col-span-8 relative overflow-hidden rounded-[32px] border border-castleton/20 shadow-soft"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.32 }}
                    whileHover={{ y: -6 }}
                  >
                    <motion.img
                      src={aboutShowcase.heroImage}
                      alt="Lifewood leadership collaboration"
                      className="h-[280px] sm:h-[360px] w-full object-cover"
                      animate={{ scale: [1, 1.03, 1] }}
                      transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-serpent/40 via-transparent to-transparent" />
                    <div className="absolute left-5 bottom-5 sm:left-6 sm:bottom-6">
                      <p className="text-white/90 text-xs uppercase tracking-[0.14em] mb-2">Team Collaboration</p>
                      <h3 className="text-white text-2xl sm:text-3xl font-semibold leading-none">Building ideas together</h3>
                    </div>
                  </motion.article>

                  <motion.article
                    className="lg:col-span-4 rounded-[32px] border border-castleton/20 bg-[#f3f3f3] p-4 sm:p-5 flex flex-col gap-4"
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.32, delay: 0.04 }}
                    whileHover={{ y: -6 }}
                  >
                    <div className="relative overflow-hidden rounded-2xl border border-castleton/15">
                      <motion.img
                        src={aboutShowcase.collabImage}
                        alt="Lifewood team collaboration"
                        className="h-[190px] sm:h-[220px] w-full object-cover"
                        animate={{ scale: [1, 1.04, 1] }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    </div>
                    <div>
                      <p className="text-castleton text-xs uppercase tracking-[0.14em] mb-2">Connect With Us</p>
                      <p className="text-3xl sm:text-4xl font-semibold text-castleton leading-[0.95] mb-3">Let&apos;s collaborate</p>
                      <p className="text-black text-base sm:text-lg leading-relaxed mb-4">
                        We co-create impactful AI and data programs with teams across regions, industries, and languages.
                      </p>
                      <button
                        type="button"
                        onClick={() => goToPath('/contact-us')}
                        className="focus-brand inline-flex items-center gap-2 rounded-full bg-serpent px-5 py-2.5 text-white text-sm font-semibold hover:bg-castleton transition-colors"
                      >
                        Start a conversation
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.article>
                </div>
              </motion.section>

              <motion.section
                id="about-core-values"
                className="p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.08 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
                  <article className="lg:col-span-4">
                    <p className="text-castleton text-sm uppercase tracking-[0.14em] mb-2">Company Culture</p>
                    <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
                      Core <span className="bg-[#f4b347] px-2">Value</span>
                    </h2>
                    <p className="text-black text-lg leading-relaxed">
                      At Lifewood we empower our company and our clients to realise the transformative power of AI:
                      bringing big data to life, launching new ways of thinking, innovating, learning, and doing.
                    </p>
                  </article>

                  <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    {aboutPrinciples.map((item, index) => (
                      <motion.article
                        key={item.title}
                        className="relative overflow-hidden rounded-3xl border border-castleton/20 bg-[#f3f3f3] p-5 sm:p-6"
                        initial={{ opacity: 0, y: 18, scale: 0.98 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, amount: 0.18 }}
                        transition={{ duration: 0.28, delay: 0.08 + index * 0.06 }}
                        whileHover={{ y: -8 }}
                      >
                        <motion.div
                          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-saffron to-castleton"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.35, delay: 0.15 + index * 0.05 }}
                          style={{ transformOrigin: 'left' }}
                        />
                        <div className="mb-4 flex items-center justify-between">
                          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-serpent text-white text-2xl font-semibold">
                            {item.code}
                          </span>
                          <p className="text-castleton text-xs uppercase tracking-[0.14em]">{item.title}</p>
                        </div>
                        <p className="text-black text-base sm:text-lg leading-relaxed">{item.details}</p>
                      </motion.article>
                    ))}
                  </div>
                </div>
              </motion.section>

              <motion.section
                id="about-mission-vision"
                className="p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.12 }}
              >
                <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-6">What drives us today, and what inspires us for tomorrow</h2>
                <div className="mb-5 flex justify-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-castleton/20 bg-white/60 p-1">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeAboutTab === 'mission'}
                    onMouseEnter={() => setActiveAboutTab('mission')}
                    onFocus={() => setActiveAboutTab('mission')}
                    onClick={() => setActiveAboutTab('mission')}
                    className={`focus-brand px-6 py-2 rounded-full text-base font-semibold transition-all duration-200 ${
                      activeAboutTab === 'mission'
                        ? 'bg-serpent text-white shadow-soft'
                        : 'bg-transparent text-black hover:bg-castleton hover:text-white'
                    }`}
                  >
                    Mission
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeAboutTab === 'vision'}
                    onMouseEnter={() => setActiveAboutTab('vision')}
                    onFocus={() => setActiveAboutTab('vision')}
                    onClick={() => setActiveAboutTab('vision')}
                    className={`focus-brand px-6 py-2 rounded-full text-base font-semibold transition-all duration-200 ${
                      activeAboutTab === 'vision'
                        ? 'bg-serpent text-white shadow-soft'
                        : 'bg-transparent text-black hover:bg-castleton hover:text-white'
                    }`}
                  >
                    Vision
                  </button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeAboutTab}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 items-stretch"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.24 }}
                  >
                    <article className="lg:col-span-6 overflow-hidden rounded-3xl border border-castleton/20">
                      <img
                        src={aboutMissionVision[activeAboutTab].image}
                        alt={aboutMissionVision[activeAboutTab].title}
                        className="h-[260px] sm:h-[320px] w-full object-cover"
                      />
                    </article>
                    <article className="lg:col-span-6 rounded-3xl border border-castleton/20 bg-[#f3f3f3] p-6 sm:p-8">
                      {activeAboutTab === 'vision' ? (
                        <div className="relative overflow-hidden">
                          <motion.div
                            className="absolute -top-12 -right-10 h-36 w-36 rounded-full bg-castleton/12 blur-2xl"
                            animate={{ scale: [1, 1.1, 1], opacity: [0.45, 0.75, 0.45] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                          />
                          <motion.h3
                            className="text-4xl sm:text-5xl font-semibold mb-4 text-serpent leading-none"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, delay: 0.05 }}
                          >
                            Our Vision
                          </motion.h3>
                          <motion.p
                            className="text-black text-lg sm:text-2xl leading-relaxed sm:leading-relaxed max-w-2xl"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.28, delay: 0.1 }}
                          >
                            {aboutMissionVision.vision.description}
                          </motion.p>
                        </div>
                      ) : (
                        <>
                          <h3 className="text-3xl sm:text-4xl font-semibold mb-3 text-serpent">
                            {aboutMissionVision.mission.title}
                          </h3>
                          <p className="text-black text-base sm:text-lg leading-relaxed">
                            {aboutMissionVision.mission.description}
                          </p>
                        </>
                      )}
                    </article>
                  </motion.div>
                </AnimatePresence>
              </motion.section>

              <motion.section
                id="ai-contact"
                className="mt-8 bg-serpent border border-castleton/35 rounded-[32px] p-6 sm:p-7 lg:p-9 text-white relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-castleton/45 blur-3xl" />
                <div className="relative">
                  <img
                    src="https://framerusercontent.com/images/Ca8ppNsvJIfTsWEuHr50gvkDow.png"
                    alt="Lifewood logo"
                    className="h-8 sm:h-9 w-auto mb-5"
                  />
                  <p className="text-lg sm:text-2xl font-medium leading-tight mb-8 max-w-3xl">
                    We provide global Data Engineering Services to enable AI Solutions.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                    <div>
                      <button
                        type="button"
                        onClick={() => goToPath('/contact-us')}
                        className="focus-brand mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/12 px-6 py-2 text-lg sm:text-xl font-bold text-[#e7edd8] hover:bg-white/20 transition-colors"
                      >
                        Contact Us
                      </button>
                      <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Privacy Policy</a>
                        <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Policy</a>
                        <a href="https://www.termsfeed.com/live/terms-and-conditions" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Terms and Conditions</a>
                        <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Settings</a>
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <p className="text-base sm:text-lg mb-4">Find Us On:</p>
                      <div className="flex flex-wrap lg:justify-end gap-3 mb-6">
                        <a href="https://www.linkedin.com/company/lifewood-data-technology-ltd./posts/?feedView=all" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Linkedin className="w-4 h-4" /></a>
                        <a href="https://www.facebook.com/LifewoodPH/" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Facebook className="w-4 h-4" /></a>
                        <a href="https://www.instagram.com/lifewood_official/?hl=af" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Instagram className="w-4 h-4" /></a>
                        <a href="https://www.youtube.com/@LifewoodDataTechnology" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Youtube className="w-4 h-4" /></a>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                        <p className="text-lg sm:text-xl font-medium">&copy; 2026 Lifewood - All Rights Reserved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </section>
          ) : currentPath === '/internal-news' ? (
            <section className="max-w-6xl mx-auto space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.div
                id="news-overview"
                className="rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="absolute -top-24 -right-10 w-72 h-72 bg-white/55 rounded-full blur-3xl" />
                <p className="text-black font-medium uppercase tracking-[0.14em] text-sm mb-5">Internal News</p>
                <h1 className="text-4xl sm:text-5xl font-semibold text-black mb-5">Rootstech 2026</h1>
                <p className="text-black text-lg max-w-4xl mx-auto">
                  Coming soon. Stay connected for official updates, event highlights, and Lifewood internal announcements.
                </p>
                <div className="mt-7 flex flex-wrap gap-3 justify-center">
                  <button
                    type="button"
                    onClick={() => goToPath('/contact-us')}
                    className="focus-brand brand-pill px-4 py-2 text-sm font-semibold"
                  >
                    Contact Us
                  </button>
                </div>
              </motion.div>

              <motion.section
                id="news-featured-video"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.06 }}
              >
                <h2 className="text-3xl sm:text-4xl font-medium mb-5">Featured Update</h2>
                <div className="relative w-full overflow-hidden rounded-2xl border border-castleton/20 bg-black" style={{ paddingTop: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/ccyrQ87EJag"
                    title="Lifewood Internal News Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </motion.section>

              <motion.section
                id="news-highlights"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  {[
                    {
                      title: 'Event Updates',
                      details: 'Program announcements, milestone news, and key schedules for upcoming activities.',
                    },
                    {
                      title: 'Media Highlights',
                      details: 'Video recaps and featured content from Lifewood initiatives and partner events.',
                    },
                    {
                      title: 'Community News',
                      details: 'Company stories, participation highlights, and internal engagement updates.',
                    },
                  ].map((item, index) => (
                    <motion.article
                      key={item.title}
                      className="bg-[#f3f3f3] text-black rounded-3xl p-6 sm:p-7 border border-castleton/15 interactive-card"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.24, delay: 0.12 + index * 0.05 }}
                    >
                      <h3 className="text-2xl sm:text-3xl font-medium mb-3">{item.title}</h3>
                      <p className="text-black text-base sm:text-lg leading-relaxed">{item.details}</p>
                    </motion.article>
                  ))}
                </div>
              </motion.section>

              <motion.section
                id="ai-contact"
                className="mt-8 bg-serpent border border-castleton/35 rounded-[32px] p-6 sm:p-7 lg:p-9 text-white relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-castleton/45 blur-3xl" />
                <div className="relative">
                  <img
                    src="https://framerusercontent.com/images/Ca8ppNsvJIfTsWEuHr50gvkDow.png"
                    alt="Lifewood logo"
                    className="h-8 sm:h-9 w-auto mb-5"
                  />
                  <p className="text-lg sm:text-2xl font-medium leading-tight mb-8 max-w-3xl">
                    We provide global Data Engineering Services to enable AI Solutions.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                    <div>
                      <button
                        type="button"
                        onClick={() => goToPath('/contact-us')}
                        className="focus-brand mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/12 px-6 py-2 text-lg sm:text-xl font-bold text-[#e7edd8] hover:bg-white/20 transition-colors"
                      >
                        Contact Us
                      </button>
                      <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Privacy Policy</a>
                        <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Policy</a>
                        <a href="https://www.termsfeed.com/live/terms-and-conditions" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Terms and Conditions</a>
                        <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Settings</a>
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <p className="text-base sm:text-lg mb-4">Find Us On:</p>
                      <div className="flex flex-wrap lg:justify-end gap-3 mb-6">
                        <a href="https://www.linkedin.com/company/lifewood-data-technology-ltd./posts/?feedView=all" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Linkedin className="w-4 h-4" /></a>
                        <a href="https://www.facebook.com/LifewoodPH/" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Facebook className="w-4 h-4" /></a>
                        <a href="https://www.instagram.com/lifewood_official/?hl=af" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Instagram className="w-4 h-4" /></a>
                        <a href="https://www.youtube.com/@LifewoodDataTechnology" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Youtube className="w-4 h-4" /></a>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                        <p className="text-lg sm:text-xl font-medium">&copy; 2026 Lifewood - All Rights Reserved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </section>
          ) : (
            <section className="max-w-5xl mx-auto bg-white border border-castleton/15 shadow-soft rounded-3xl p-8 sm:p-12">
              <p className="text-castleton font-medium uppercase tracking-[0.14em] text-sm mb-5">Lifewood</p>
              <h1 className="text-4xl sm:text-5xl font-semibold text-serpent mb-5">{pageData?.title || 'Page'}</h1>
              <p className="text-serpent/90 text-lg mb-10 max-w-3xl">
                {pageData?.description || 'Content for this page is being prepared.'}
              </p>
              <button
                type="button"
                onClick={() => goToPath('/')}
                className="focus-brand bg-white border border-castleton/25 rounded-brand px-6 py-3 text-serpent font-semibold hover:text-castleton transition-colors"
              >
                Back to Home
              </button>
            </section>
          )}
        </main>
      </div>
    )
  }

  return (
    <div className="w-full overflow-x-hidden">
      <Navigation onNavigate={scrollToSection} onNavigatePath={goToPath} />
      <Hero onContact={() => scrollToSection('contact')} onLearnMore={() => scrollToSection('services')} />
      <Services />
      <Stats />
      <OurClientsPartners />
      <Footer />
    </div>
  )
}

export default App








