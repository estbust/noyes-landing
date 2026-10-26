/**
 * Noyes & Associates - Premium Legal Redesign
 * Core Backend, Business Logic, Persistence & Bilingual Data Models
 * 
 * Focus: Connecticut Personal Injury Law, Aggressive Trial Litigation,
 * 'No Win, No Fee' Guarantee ($0 Upfront), Immigration Status Protection,
 * and Secondary Practice Areas (Immigration, Real Estate, Bankruptcy).
 *
 * Public Frontend Contract exposed via window.NoyesApp
 */

/* ==========================================================================
   SECTION 0: GLOBAL CONSTANTS & LEGAL ENUMS (CONNECTICUT JURISDICTION)
   ========================================================================== */

/**
 * Supported legal practice areas and consultation case types
 */
const CASE_TYPES = {
  car_accident: {
    id: 'car_accident',
    labelEn: 'Car & Auto Accidents',
    labelEs: 'Accidentes de Auto y Tránsito',
    isInjury: true
  },
  truck_motorcycle: {
    id: 'truck_motorcycle',
    labelEn: 'Commercial Truck & Motorcycle Collisions',
    labelEs: 'Colisiones de Camión Comercial y Motocicleta',
    isInjury: true
  },
  slip_fall: {
    id: 'slip_fall',
    labelEn: 'Slip, Trip & Fall (Premises Liability)',
    labelEs: 'Caídas y Responsabilidad de Predios',
    isInjury: true
  },
  workplace_injury: {
    id: 'workplace_injury',
    labelEn: 'Workplace Injuries / Workers\' Compensation',
    labelEs: 'Lesiones Laborales / Workers\' Comp',
    isInjury: true
  },
  immigration: {
    id: 'immigration',
    labelEn: 'Immigration Law & Deportation Defense',
    labelEs: 'Inmigración y Defensa contra Deportación',
    isInjury: false
  },
  real_estate: {
    id: 'real_estate',
    labelEn: 'Real Estate Closings & Transactions',
    labelEs: 'Bienes Raíces y Cierres Inmobiliarios',
    isInjury: false
  },
  bankruptcy: {
    id: 'bankruptcy',
    labelEn: 'Bankruptcy & Financial Debt Relief (Ch. 7 & 13)',
    labelEs: 'Bancarrota y Alivio de Deudas (Cap. 7 y 13)',
    isInjury: false
  },
  other: {
    id: 'other',
    labelEn: 'Other Legal Consultations',
    labelEs: 'Otras Consultas Jurídicas',
    isInjury: false
  }
};

/**
 * Connecticut Legal Framework Constants
 */
const CT_LAW_CONSTANTS = {
  STATUTE_OF_LIMITATIONS_YEARS: 2, // Conn. Gen. Stat. § 52-584 (2 years from date of injury)
  STATUTE_URGENCY_THRESHOLD_DAYS: 90, // Alert when fewer than 90 days remaining
  MODIFIED_COMPARATIVE_NEGLIGENCE_BAR: 51, // Conn. Gen. Stat. § 52-572h (51% bar rule: recovery allowed if fault <= 50%)
  CONTINGENCY_FEE_UPFRONT: 0, // $0 out of pocket guarantee
  IMMIGRATION_STATUS_PROTECTED: true // Status cannot be used by insurers to reduce damages
};

/**
 * Multi-Million Dollar Verdicts & Settlements Data Model
 */
const VERDICTS_SHOWCASE = [
  {
    id: 'verdict-1',
    amount: '$3,850,000',
    typeEn: 'Commercial Semi-Truck Highway Collision',
    typeEs: 'Colisión en Autopista con Camión Comercial de Carga',
    locationEn: 'CT Superior Court',
    locationEs: 'Tribunal Superior de Connecticut',
    category: 'truck_motorcycle',
    i18nKey: 'verdict_1'
  },
  {
    id: 'verdict-2',
    amount: '$1,750,000',
    typeEn: 'Scaffolding Collapse & Construction Fall',
    typeEs: 'Colapso de Andamio y Caída en Obra de Construcción',
    locationEn: 'Hartford, CT',
    locationEs: 'Hartford, CT',
    category: 'workplace_injury',
    i18nKey: 'verdict_2'
  },
  {
    id: 'verdict-3',
    amount: '$950,000',
    typeEn: 'Multi-Vehicle Crash Spinal Injury',
    typeEs: 'Choque Múltiple en Autopista con Lesión Espinal',
    locationEn: 'New Haven, CT',
    locationEs: 'New Haven, CT',
    category: 'car_accident',
    i18nKey: 'verdict_3'
  },
  {
    id: 'verdict-4',
    amount: '$720,000',
    typeEn: 'Commercial Premises Ice Slip & Fall',
    typeEs: 'Caída en Hielo por Responsabilidad de Predio Comercial',
    locationEn: 'Stamford, CT',
    locationEs: 'Stamford, CT',
    category: 'slip_fall',
    i18nKey: 'verdict_4'
  },
  {
    id: 'verdict-5',
    amount: '$580,000',
    typeEn: 'Rideshare Passenger Severe Injury',
    typeEs: 'Colisión con Lesiones Graves para Pasajero de Viaje Compartido',
    locationEn: 'Bridgeport, CT',
    locationEs: 'Bridgeport, CT',
    category: 'car_accident',
    i18nKey: 'verdict_5'
  }
];

/**
 * The Noyes Advantage: Insurance Comparison Matrix Data Model
 */
const ADVANTAGE_MATRIX = [
  {
    id: 'courtroom_litigation',
    rowKey: 'adv_row1',
    factorEn: 'Trial-Ready Court Litigation',
    factorEs: 'Litigio en Tribunales Listo para Juicio',
    aloneEn: 'Insurance offers lowball nuisance payouts knowing you cannot litigate in court.',
    aloneEs: 'Aseguradoras ofrecen pagos mínimos sabiendo que la víctima no litiga en corte.',
    noyesEn: 'We prepare every case for trial, forcing insurers to pay maximum value.',
    noyesEs: 'Preparamos cada caso para juicio, obligando a pagar la compensación máxima.'
  },
  {
    id: 'bilingual_access',
    rowKey: 'adv_row2',
    factorEn: 'Direct Spanish/English Attorney Access',
    factorEs: 'Acceso Directo con Abogado Bilingüe',
    aloneEn: 'Routed to impersonal call centers, junior caseworkers, and unreturned voicemails.',
    aloneEs: 'Te transfieren a centros de llamadas y secretarias sin acceso a abogados.',
    noyesEn: 'Direct, personal access to trial litigators Juan Girón and Shernette Noyes.',
    noyesEs: 'Acceso directo y personal a los litigantes Juan Girón y Shernette Noyes.'
  },
  {
    id: 'immigration_immunity',
    rowKey: 'adv_row3',
    factorEn: 'Immigration Status Protection & Immunity',
    factorEs: 'Inmunidad y Protección Total de Estatus Migratorio',
    aloneEn: 'Adjusters use deportation fears and status questions to intimidate victims into quitting.',
    aloneEs: 'Aseguradoras usan el miedo migratorio para intimidar y hacerte renunciar.',
    noyesEn: '100% protected under CT law. Full compensation guaranteed regardless of status.',
    noyesEs: '100% protegido por ley en CT. Compensación completa garantizada sin importar estatus.'
  },
  {
    id: 'evidence_preservation',
    rowKey: 'adv_row4',
    factorEn: 'Rapid Evidence & Black Box Preservation',
    factorEs: 'Preservación Rápida de Evidencia y Caja Negra',
    aloneEn: 'Surveillance footage is overwritten and vehicle black box data erased within days.',
    aloneEs: 'Cámaras de seguridad y cajas negras de camiones se borran en días.',
    noyesEn: 'Immediate formal spoliation letters and private accident reconstruction forensics.',
    noyesEs: 'Cartas legales inmediatas de preservación y reconstrucción forense privada del choque.'
  },
  {
    id: 'contingency_fee',
    rowKey: 'adv_row5',
    factorEn: 'Financial Risk & Upfront Costs',
    factorEs: 'Riesgo Financiero y Costos Iniciales',
    aloneEn: 'Victims face mounting medical bills, lost wages, and financial pressure to settle.',
    aloneEs: 'Víctimas acumulan deudas médicas y presión financiera para aceptar cheques pequeños.',
    noyesEn: '100% Contingency Guarantee. $0 upfront costs. You pay nothing unless we win.',
    noyesEs: 'Garantía de Contingencia 100%. $0 inicial. No pagas nada si no ganamos.'
  }
];

/**
 * Storage key identifiers
 */
const STORAGE_KEYS = {
  LEADS: 'noyes_consultation_leads',
  LEGACY_LEADS: 'noyes_law_leads_v1',
  ASSESSMENTS: 'noyes_law_assessments_v1',
  CHECKLIST: 'noyes_law_checklist_state_v1',
  LANG: 'noyes_law_lang_preference'
};

/* ==========================================================================
   SECTION 1: PERSISTENCE & REPOSITORY LAYER (NoyesStorage)
   ========================================================================== */

const NoyesStorage = (() => {
  // In-memory fallback if localStorage is disabled, quota is exceeded, or private browsing blocks it
  const memoryFallback = {
    leads: [],
    assessments: [],
    checklist: {}
  };

  /**
   * Safely test if localStorage is functional
   */
  const isAvailable = () => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return false;
      const testKey = '__noyes_storage_probe__';
      window.localStorage.setItem(testKey, '1');
      window.localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  };

  /**
   * Safe JSON parse helper
   */
  const safeParse = (str, fallback) => {
    try {
      return str ? JSON.parse(str) : fallback;
    } catch (e) {
      console.warn('NoyesStorage parse error, using fallback:', e);
      return fallback;
    }
  };

  /**
   * Retrieve all saved leads, with optional filtering
   * @param {Object} filter - Optional { caseType, search, startDate, endDate }
   * @returns {Array<Object>} Sorted by createdAt descending
   */
  const getLeads = (filter = {}) => {
    let leads = [];
    try {
      if (isAvailable()) {
        const raw = window.localStorage.getItem(STORAGE_KEYS.LEADS);
        const legacyRaw = window.localStorage.getItem(STORAGE_KEYS.LEGACY_LEADS);

        const primaryList = safeParse(raw, null);
        const legacyList = safeParse(legacyRaw, null);

        if (Array.isArray(primaryList) && Array.isArray(legacyList)) {
          // Merge deduplicating by unique id
          const idMap = new Map();
          primaryList.forEach(item => { if (item && item.id) idMap.set(item.id, item); });
          legacyList.forEach(item => { if (item && item.id && !idMap.has(item.id)) idMap.set(item.id, item); });
          leads = Array.from(idMap.values());
        } else if (Array.isArray(primaryList)) {
          leads = primaryList;
        } else if (Array.isArray(legacyList)) {
          leads = legacyList;
          // Synchronize back to primary key
          try {
            window.localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
          } catch (syncErr) {
            console.warn('NoyesStorage: Sync to primary key failed:', syncErr);
          }
        } else {
          leads = [];
        }
      } else {
        leads = [...memoryFallback.leads];
      }
    } catch (e) {
      console.warn('NoyesStorage: Could not read leads from localStorage, using memory:', e);
      leads = [...memoryFallback.leads];
    }

    if (!Array.isArray(leads)) leads = [];

    // Apply filtering
    if (filter.caseType && filter.caseType !== 'all') {
      leads = leads.filter(l => l.caseType === filter.caseType);
    }
    if (filter.search) {
      const q = filter.search.toLowerCase().trim();
      leads = leads.filter(l =>
        (l.firstName && l.firstName.toLowerCase().includes(q)) ||
        (l.lastName && l.lastName.toLowerCase().includes(q)) ||
        (l.email && l.email.toLowerCase().includes(q)) ||
        (l.phone && l.phone.includes(q)) ||
        (l.message && l.message.toLowerCase().includes(q))
      );
    }

    return leads.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  };

  /**
   * Find a lead by unique ID
   */
  const getLeadById = (id) => {
    const leads = getLeads();
    return leads.find(item => item.id === id) || null;
  };

  /**
   * Persist a new consultation lead
   * @param {Object} leadData
   * @returns {{ success: boolean, lead: Object, fallbackUsed?: boolean, error?: string }}
   */
  const saveLead = (leadData) => {
    try {
      const now = new Date();
      const newLead = {
        id: leadData.id || `lead_${Date.now()}_${Math.random().toString(36).substr(2, 7)}`,
        firstName: (leadData.firstName || '').trim(),
        lastName: (leadData.lastName || '').trim(),
        email: (leadData.email || '').trim().toLowerCase(),
        phone: (leadData.phone || '').trim(),
        caseType: leadData.caseType || 'car_accident',
        incidentDate: leadData.incidentDate || '',
        contactTime: leadData.contactTime || '',
        consultationType: leadData.consultationType || 'virtual',
        message: (leadData.message || '').trim(),
        source: leadData.source || 'web_form',
        assessmentId: leadData.assessmentId || null,
        createdAt: leadData.createdAt || now.toISOString()
      };

      if (isAvailable()) {
        const leads = getLeads();
        leads.unshift(newLead);
        const serialized = JSON.stringify(leads);
        window.localStorage.setItem(STORAGE_KEYS.LEADS, serialized);
        // Synchronize with legacy key for backward compatibility
        try {
          window.localStorage.setItem(STORAGE_KEYS.LEGACY_LEADS, serialized);
        } catch (legacyErr) {
          console.warn('NoyesStorage: Legacy key sync error:', legacyErr);
        }
      } else {
        memoryFallback.leads.unshift(newLead);
      }

      return { success: true, lead: newLead };
    } catch (e) {
      console.warn('NoyesStorage: localStorage quota or write failure, fallback stored:', e);
      const fallbackLead = { ...leadData, id: leadData.id || `lead_${Date.now()}`, createdAt: new Date().toISOString() };
      memoryFallback.leads.unshift(fallbackLead);
      return { success: true, lead: fallbackLead, fallbackUsed: true };
    }
  };

  /**
   * Export leads in JSON or CSV format
   * @param {'json'|'csv'} format
   * @returns {string}
   */
  const exportLeads = (format = 'json') => {
    const leads = getLeads();
    if (format === 'csv') {
      const headers = [
        'ID',
        'First Name',
        'Last Name',
        'Email',
        'Phone',
        'Case Type',
        'Incident Date',
        'Contact Time',
        'Consultation Type',
        'Message',
        'Source',
        'Created At'
      ];
      const rows = leads.map(l => [
        `"${(l.id || '').replace(/"/g, '""')}"`,
        `"${(l.firstName || '').replace(/"/g, '""')}"`,
        `"${(l.lastName || '').replace(/"/g, '""')}"`,
        `"${(l.email || '').replace(/"/g, '""')}"`,
        `"${(l.phone || '').replace(/"/g, '""')}"`,
        `"${(l.caseType || '').replace(/"/g, '""')}"`,
        `"${(l.incidentDate || '').replace(/"/g, '""')}"`,
        `"${(l.contactTime || '').replace(/"/g, '""')}"`,
        `"${(l.consultationType || '').replace(/"/g, '""')}"`,
        `"${(l.message || '').replace(/"/g, '""').replace(/[\r\n]+/g, ' ')}"`,
        `"${(l.source || '').replace(/"/g, '""')}"`,
        `"${(l.createdAt || '').replace(/"/g, '""')}"`
      ]);
      return [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    }
    return JSON.stringify(leads, null, 2);
  };

  /**
   * Save a completed claim assessment calculation
   */
  const saveAssessment = (assessmentData) => {
    try {
      const newAssessment = {
        id: assessmentData.id || `eval_${Date.now()}_${Math.random().toString(36).substr(2, 7)}`,
        createdAt: assessmentData.createdAt || new Date().toISOString(),
        ...assessmentData
      };

      if (isAvailable()) {
        const raw = window.localStorage.getItem(STORAGE_KEYS.ASSESSMENTS);
        const list = safeParse(raw, []);
        list.unshift(newAssessment);
        window.localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(list));
      } else {
        memoryFallback.assessments.unshift(newAssessment);
      }

      return { success: true, assessment: newAssessment };
    } catch (e) {
      console.warn('NoyesStorage: Assessment write error, used memory:', e);
      memoryFallback.assessments.unshift(assessmentData);
      return { success: true, assessment: assessmentData, fallbackUsed: true };
    }
  };

  /**
   * Retrieve all saved claim assessments
   */
  const getAssessments = () => {
    try {
      if (isAvailable()) {
        const raw = window.localStorage.getItem(STORAGE_KEYS.ASSESSMENTS);
        return safeParse(raw, []);
      }
      return [...memoryFallback.assessments];
    } catch (e) {
      return [...memoryFallback.assessments];
    }
  };

  /**
   * Retrieve accident guide checklist completion states
   */
  const getChecklistState = () => {
    try {
      if (isAvailable()) {
        const raw = window.localStorage.getItem(STORAGE_KEYS.CHECKLIST);
        return safeParse(raw, {});
      }
      return { ...memoryFallback.checklist };
    } catch (e) {
      return { ...memoryFallback.checklist };
    }
  };

  /**
   * Toggle or set an accident guide checklist step
   */
  const saveChecklistStep = (stepId, isCompleted) => {
    const current = getChecklistState();
    current[stepId] = Boolean(isCompleted);
    try {
      if (isAvailable()) {
        window.localStorage.setItem(STORAGE_KEYS.CHECKLIST, JSON.stringify(current));
      } else {
        memoryFallback.checklist = current;
      }
    } catch (e) {
      memoryFallback.checklist = current;
    }
    return current;
  };

  /**
   * Reset the accident guide checklist
   */
  const resetChecklist = () => {
    try {
      if (isAvailable()) {
        window.localStorage.removeItem(STORAGE_KEYS.CHECKLIST);
      }
      memoryFallback.checklist = {};
    } catch (e) {
      memoryFallback.checklist = {};
    }
    return {};
  };

  /**
   * Safe wipe of local test data
   */
  const clearAllData = () => {
    try {
      if (isAvailable()) {
        window.localStorage.removeItem(STORAGE_KEYS.LEADS);
        window.localStorage.removeItem(STORAGE_KEYS.LEGACY_LEADS);
        window.localStorage.removeItem(STORAGE_KEYS.ASSESSMENTS);
        window.localStorage.removeItem(STORAGE_KEYS.CHECKLIST);
      }
      memoryFallback.leads = [];
      memoryFallback.assessments = [];
      memoryFallback.checklist = {};
      return true;
    } catch (e) {
      return false;
    }
  };

  return {
    isAvailable,
    getLeads,
    getLeadById,
    saveLead,
    exportLeads,
    saveAssessment,
    getAssessments,
    getChecklistState,
    saveChecklistStep,
    resetChecklist,
    clearAllData
  };
})();

/* ==========================================================================
   SECTION 2: VALIDATION & SANITIZATION ENGINE (NoyesValidator)
   ========================================================================== */

const NoyesValidator = (() => {
  /**
   * Sanitize text against HTML tags and malicious characters
   */
  const sanitize = (val) => {
    if (typeof val !== 'string') return '';
    return val
      .replace(/<[^>]*>?/gm, '')
      .replace(/[<>]/g, '')
      .trim();
  };

  /**
   * Extract exactly 10 US digits, stripping country code 1 if 11 digits
   */
  const cleanPhoneDigits = (phone) => {
    if (typeof phone !== 'string') return '';
    let digits = phone.replace(/\D/g, '');
    if (digits.length === 11 && digits.startsWith('1')) {
      digits = digits.substring(1);
    }
    return digits;
  };

  /**
   * Strict US 10-digit phone validator
   */
  const isValidUSPhone = (phone) => {
    const digits = cleanPhoneDigits(phone);
    return digits.length === 10;
  };

  /**
   * Format 10 digits as (XXX) XXX-XXXX
   */
  const formatUSPhone = (phone) => {
    const digits = cleanPhoneDigits(phone);
    if (digits.length !== 10) return phone || '';
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  /**
   * RFC 5322 compatible email validator
   */
  const isValidEmail = (email) => {
    if (typeof email !== 'string') return false;
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    return re.test(email.trim());
  };

  /**
   * Validate entire consultation lead form submission
   * Returns clean sanitized object and bilingual error messages
   */
  const validateLead = (rawData, lang = 'en') => {
    const errors = {};
    const sanitized = {
      firstName: sanitize(rawData.firstName || ''),
      lastName: sanitize(rawData.lastName || ''),
      email: sanitize(rawData.email || '').toLowerCase(),
      phone: sanitize(rawData.phone || ''),
      caseType: rawData.caseType || 'car_accident',
      incidentDate: sanitize(rawData.incidentDate || ''),
      contactTime: sanitize(rawData.contactTime || ''),
      consultationType: rawData.consultationType || 'virtual',
      message: sanitize(rawData.message || ''),
      source: rawData.source || 'web_form',
      assessmentId: rawData.assessmentId || null
    };

    // First Name Validation
    if (!sanitized.firstName) {
      errors.firstName = {
        en: 'First name is required.',
        es: 'El nombre es obligatorio.'
      };
    } else if (sanitized.firstName.length < 2 || sanitized.firstName.length > 60) {
      errors.firstName = {
        en: 'First name must be between 2 and 60 characters.',
        es: 'El nombre debe tener entre 2 y 60 caracteres.'
      };
    }

    // Last Name Validation
    if (!sanitized.lastName) {
      errors.lastName = {
        en: 'Last name is required.',
        es: 'El apellido es obligatorio.'
      };
    } else if (sanitized.lastName.length < 2 || sanitized.lastName.length > 60) {
      errors.lastName = {
        en: 'Last name must be between 2 and 60 characters.',
        es: 'El apellido debe tener entre 2 y 60 caracteres.'
      };
    }

    // Email Validation
    if (!sanitized.email) {
      errors.email = {
        en: 'Email address is required.',
        es: 'El correo electrónico es obligatorio.'
      };
    } else if (!isValidEmail(sanitized.email)) {
      errors.email = {
        en: 'Please enter a valid email address (e.g. name@example.com).',
        es: 'Por favor ingresa un correo electrónico válido (ej: nombre@ejemplo.com).'
      };
    }

    // Phone Validation (Strict US 10-digit)
    if (!sanitized.phone) {
      errors.phone = {
        en: 'Phone number is required.',
        es: 'El número de teléfono es obligatorio.'
      };
    } else if (!isValidUSPhone(sanitized.phone)) {
      errors.phone = {
        en: 'Please enter a valid 10-digit U.S. phone number (e.g. (203) 572-6748).',
        es: 'Ingresa un número telefónico válido de 10 dígitos en EE. UU. (ej: (203) 572-6748).'
      };
    } else {
      sanitized.phone = formatUSPhone(sanitized.phone);
    }

    // Case Type Validation
    if (sanitized.caseType && !CASE_TYPES[sanitized.caseType]) {
      errors.caseType = {
        en: 'Please select a valid legal case category.',
        es: 'Por favor selecciona una categoría legal válida.'
      };
    }

    // Incident Date Validation (Optional, but must be valid & not future)
    if (sanitized.incidentDate) {
      const parsed = new Date(sanitized.incidentDate);
      if (isNaN(parsed.getTime())) {
        errors.incidentDate = {
          en: 'Please enter a valid date (MM/DD/YYYY).',
          es: 'Por favor ingresa una fecha válida (MM/DD/AAAA).'
        };
      } else if (parsed > new Date()) {
        errors.incidentDate = {
          en: 'Incident date cannot be in the future.',
          es: 'La fecha del incidente no puede ser futura.'
        };
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      sanitizedData: sanitized
    };
  };

  return {
    sanitize,
    cleanPhoneDigits,
    isValidUSPhone,
    formatUSPhone,
    isValidEmail,
    validateLead
  };
})();

/* ==========================================================================
   SECTION 3: ACCIDENT EMERGENCY CHECKLIST (NoyesAccidentGuide)
   ========================================================================== */

const NoyesAccidentGuide = (() => {
  const stepsData = [
    {
      id: 'step_1_safety',
      stepNumber: 1,
      titleEn: '1. Immediate Safety & Emergency Medical Care',
      titleEs: '1. Seguridad Inmediata y Atención Médica de Urgencia',
      summaryEn: 'Call 911 immediately and seek a comprehensive medical evaluation at an ER or urgent care, even if your pain feels minor or delayed.',
      summaryEs: 'Llama al 911 de inmediato y busca atención médica en emergencias, incluso si crees que tus lesiones son menores o no sientes dolor aún.',
      criticalWarningEn: 'Adrenaline masks severe cervical fractures, spinal disc trauma, and concussions. Refusing medical care gives insurance companies an excuse to deny causation.',
      criticalWarningEs: 'La adrenalina oculta fracturas de columna y traumatismos craneales. Rechazar la ambulancia permite a la aseguradora alegar que no te lastimaste.',
      actionItemsEn: [
        'Move to a safe shoulder or sidewalk if possible, keeping emergency hazard lights on',
        'Call 911 and request emergency medical dispatch and police',
        'Accept ambulance transport if you experience dizziness, neck pain, or numbness',
        'Report every symptom and headache to doctors, no matter how small'
      ],
      actionItemsEs: [
        'Muévete a un lugar seguro en la berma o acera con las luces de emergencia puestas',
        'Llama al 911 y solicita ambulancia y presencia policial inmediata',
        'Acepta el traslado en ambulancia ante mareos, dolor cervical o entumecimiento',
        'Describe cada dolor y molestia al personal médico con total detalle'
      ],
      dosEn: [
        'Do request an ambulance examination on the scene.',
        'Do describe exactly how the vehicle collided and where your body made impact.'
      ],
      dosEs: [
        'Sí solicita ser revisado por paramédicos en el lugar del choque.',
        'Sí explica con exactitud dónde recibió el impacto tu cuerpo y qué partes golpeaste.'
      ],
      dontsEn: [
        'Do NOT say "I am fine" or "I am not hurt" to anyone at the crash scene.',
        'Do NOT delay medical consultation past 24-48 hours.'
      ],
      dontsEs: [
        'NO digas "estoy bien" o "no me pasó nada" a nadie en la escena.',
        'NO dejes pasar más de 24 a 48 horas sin una evaluación médica formal.'
      ]
    },
    {
      id: 'step_2_police',
      stepNumber: 2,
      titleEn: '2. File Official Police / Crash Report',
      titleEs: '2. Exige el Reporte Policial Oficial',
      summaryEn: 'Ensure local or Connecticut State Police arrive and file a formal Uniform Police Accident Report (PR-1 form in CT). Record the officer\'s name, badge number, and report ID.',
      summaryEs: 'Asegúrate de que la Policía de Connecticut o local acuda y levante el reporte oficial (Formulario PR-1 en CT). Anota el nombre del policía, placa y folio del caso.',
      criticalWarningEn: 'Never accept an informal cash agreement or private promise from the other driver without a formal police record.',
      criticalWarningEs: 'Nunca aceptes arreglos en efectivo o promesas informales con el otro conductor sin un reporte policial oficial.',
      actionItemsEn: [
        'Obtain the responding officer\'s full name, badge number, and department',
        'Ask for the Connecticut Police Incident / Case Report number',
        'Verify that the other driver\'s insurance policy number, carrier, and license plates are documented accurately'
      ],
      actionItemsEs: [
        'Anota el nombre completo del oficial, su placa y estación policial',
        'Solicita el número de expediente oficial del reporte de tránsito de Connecticut',
        'Verifica que la póliza de seguro, compañía y placas del otro conductor queden registradas'
      ],
      dosEn: [
        'Do ask how and when you can pick up a physical copy of the police report.',
        'Do calmly provide factual details of the accident without guessing.'
      ],
      dosEs: [
        'Sí consulta cómo y cuándo recoger la copia oficial del informe policial.',
        'Sí proporciona los hechos con calma y veracidad sin hacer conjeturas.'
      ],
      dontsEn: [
        'Do NOT admit fault, apologize, or say "I didn\'t see them".',
        'Do NOT leave the scene until the police officer formally dismisses you.'
      ],
      dontsEs: [
        'NO admitas culpa, no pidas disculpas ni digas "no me di cuenta".',
        'NO te retires del lugar hasta que el oficial te dé la autorización formal.'
      ]
    },
    {
      id: 'step_3_evidence',
      stepNumber: 3,
      titleEn: '3. Document Physical & Photographic Evidence',
      titleEs: '3. Documenta Evidencia Fotográfica y Testigos',
      summaryEn: 'Use your smartphone to capture high-resolution photos and videos of vehicle damage, road conditions, skid marks, traffic signals, and your physical injuries.',
      summaryEs: 'Usa tu teléfono para tomar fotos y videos de daños en los autos, el asfalto, huellas de frenado, semáforos, clima y tus lesiones físicas visibles.',
      criticalWarningEn: 'Accident scenes are cleared within hours. Skid marks fade, weather changes, and debris disappears forever if not documented immediately.',
      criticalWarningEs: 'Las escenas de accidentes se limpian en pocas horas. Marcas de neumáticos y escombros desaparecen si no se fotografían al instante.',
      actionItemsEn: [
        'Photograph all involved vehicles from wide, medium, and close angles',
        'Capture skid marks, road conditions, debris, and traffic signal timing',
        'Collect names, addresses, and cell phone numbers of neutral eyewitnesses'
      ],
      actionItemsEs: [
        'Fotografía los vehículos involucrados desde ángulos panorámicos y de cerca',
        'Captura marcas de frenado, condiciones del pavimento y semáforos',
        'Anota nombres y números de teléfono celular de testigos presenciales neutrales'
      ],
      dosEn: [
        'Do record short videos showing overall traffic flow and lighting conditions.',
        'Do preserve torn, bloody clothing or damaged helmets as physical evidence.'
      ],
      dosEs: [
        'Sí graba videos cortos que muestren el flujo vial y la visibilidad.',
        'Sí guarda ropa rota, ensangrentada o cascos dañados como evidencia física.'
      ],
      dontsEn: [
        'Do NOT repair your vehicle until our litigators or an expert inspector review it.',
        'Do NOT post photos or comments about the crash on social media.'
      ],
      dontsEs: [
        'NO repares tu auto hasta que nuestros peritos lo hayan inspeccionado.',
        'NO publiques fotos, comentarios ni actualizaciones del accidente en redes sociales.'
      ]
    },
    {
      id: 'step_4_insurance',
      stepNumber: 4,
      titleEn: '4. Never Give Recorded Statements to Insurance Adjusters',
      titleEs: '4. Nunca Des Declaraciones Grabadas a Aseguradoras',
      summaryEn: 'Insurance adjusters work to protect corporate profits by finding reasons to deny or minimize claims. Politely decline any recorded statements until you speak with your attorney.',
      summaryEs: 'Los ajustadores de seguros buscan proteger los beneficios de la empresa reduciendo lo que te pagan. Niega cortésmente cualquier entrevista grabada sin tu abogado.',
      criticalWarningEn: 'Adjusters are trained to ask misleading questions designed to make you admit partial fault or downplay your medical trauma.',
      criticalWarningEs: 'Los ajustadores utilizan preguntas capciosas diseñadas para que admitas culpa parcial o minimices la gravedad de tus lesiones.',
      actionItemsEn: [
        'Politely state: "My attorneys at Noyes & Associates will handle all statements and communications"',
        'Refuse to sign blanket medical release authorizations that expose your lifelong history',
        'Never accept a quick "lowball settlement" check that permanently waives your rights'
      ],
      actionItemsEs: [
        'Indica con calma: "Mis abogados de Noyes & Associates manejarán todas las comunicaciones"',
        'Rehúsa firmar autorizaciones que den acceso ilimitado a todo tu historial médico de por vida',
        'Nunca aceptes cheques de liquidación rápida que anulen tu derecho a compensación futura'
      ],
      dosEn: [
        'Do write down the adjuster\'s name, insurance company, and assigned claim number.',
        'Do refer all phone calls directly to Juan Girón and Shernette Noyes.'
      ],
      dosEs: [
        'Sí anota el nombre del ajustador, compañía y número de reclamo asignado.',
        'Sí transfiere todas las llamadas y cartas directamente a nuestros abogados.'
      ],
      dontsEn: [
        'Do NOT participate in recorded phone interviews or discuss who was at fault.',
        'Do NOT guess or estimate your physical recovery timeline.'
      ],
      dontsEs: [
        'NO participes en entrevistas telefónicas grabadas ni hables de culpas.',
        'NO hagas conjeturas sobre cuánto tiempo tardarás en recuperarte.'
      ]
    },
    {
      id: 'step_5_attorney',
      stepNumber: 5,
      titleEn: '5. Contact Experienced Bilingual Injury Litigators ($0 Upfront)',
      titleEs: '5. Contacta a Abogados Litigantes Bilingües ($0 Inicial)',
      summaryEn: 'Retain trial attorneys Juan Girón and Shernette Noyes under our "No Win, No Fee" contingency agreement. Full compensation rights apply regardless of immigration status.',
      summaryEs: 'Contrata a los abogados Juan Girón y Shernette Noyes con garantía "Si No Ganamos, No Pagas". Tienes derecho a indemnización total sin importar tu estatus migratorio.',
      criticalWarningEn: 'Waiting to retain counsel allows vital surveillance video to be erased and allows insurance carriers to gain an unfair advantage.',
      criticalWarningEs: 'Esperar semanas permite que los videos de seguridad se borren y que la aseguradora construya un expediente en tu contra.',
      actionItemsEn: [
        'Call +1 (203) 572-6748 for a 100% free, confidential case evaluation',
        'Communicate comfortably with our bilingual Spanish & English trial attorneys',
        'Let our aggressive litigators calculate the true financial value of your damages'
      ],
      actionItemsEs: [
        'Llama al +1 (203) 572-6748 para consulta gratis y 100% confidencial',
        'Comunícate en tu propio idioma con nuestro equipo de litigantes bilingües',
        'Permite que nuestros abogados calculen el valor real y máximo de tu indemnización'
      ],
      dosEn: [
        'Do hire aggressive courtroom litigators who prepare every case for trial.',
        'Do ask for our $0 upfront fee contingency commitment.'
      ],
      dosEs: [
        'Sí contrata a abogados litigantes preparados para ir a juicio contra las aseguradoras.',
        'Sí exige la garantía de $0 cobro inicial y sin costo si no ganamos.'
      ],
      dontsEn: [
        'Do NOT worry about immigration status — Connecticut law strictly protects all victims.',
        'Do NOT pay upfront legal retainers or hourly fees.'
      ],
      dontsEs: [
        'NO temas por tu estatus migratorio — la ley en Connecticut te protege sin distinción.',
        'NO pagues adelantos de tu bolsillo ni cobros por hora.'
      ]
    }
  ];

  /**
   * Return steps populated with current saved completion state
   */
  const getSteps = (lang = 'en') => {
    const states = NoyesStorage.getChecklistState();
    return stepsData.map(step => ({
      id: step.id,
      stepNumber: step.stepNumber,
      isCompleted: Boolean(states[step.id]),
      title: lang === 'es' ? step.titleEs : step.titleEn,
      summary: lang === 'es' ? step.summaryEs : step.summaryEn,
      criticalWarning: lang === 'es' ? step.criticalWarningEs : step.criticalWarningEn,
      actionItems: lang === 'es' ? step.actionItemsEs : step.actionItemsEn,
      dos: lang === 'es' ? step.dosEs : step.dosEn,
      donts: lang === 'es' ? step.dontsEs : step.dontsEn
    }));
  };

  /**
   * Find single step by ID
   */
  const getStepById = (id, lang = 'en') => {
    const steps = getSteps(lang);
    return steps.find(s => s.id === id) || null;
  };

  /**
   * Get overall checklist progress statistics
   */
  const getProgress = () => {
    const states = NoyesStorage.getChecklistState();
    const completed = stepsData.filter(s => Boolean(states[s.id])).length;
    const total = stepsData.length;
    return {
      completed,
      total,
      percent: Math.round((completed / total) * 100),
      isComplete: completed === total
    };
  };

  /**
   * Toggle a step's completed state
   */
  const toggleStep = (stepId) => {
    const states = NoyesStorage.getChecklistState();
    const nextState = !Boolean(states[stepId]);
    NoyesStorage.saveChecklistStep(stepId, nextState);
    return {
      stepId,
      isCompleted: nextState,
      progress: getProgress()
    };
  };

  /**
   * Reset all checklist steps
   */
  const reset = () => {
    NoyesStorage.resetChecklist();
    return getProgress();
  };

  return {
    getSteps,
    getStepById,
    getProgress,
    toggleStep,
    reset
  };
})();

/* ==========================================================================
   SECTION 3.5: INTERACTIVE 3-STEP QUICK CASE EVALUATION ENGINE (NoyesCaseEvaluator)
   ========================================================================== */

const NoyesCaseEvaluator = (() => {
  const ACCIDENT_TYPES = {
    car_truck: {
      id: 'car_truck',
      labelEn: 'Car & Commercial Truck Collision',
      labelEs: 'Colisión de Auto o Camión Comercial',
      mappedCaseType: 'truck_motorcycle'
    },
    slip_construction: {
      id: 'slip_construction',
      labelEn: 'Slip & Fall / Construction Site',
      labelEs: 'Caída o Accidente en Obra de Construcción',
      mappedCaseType: 'slip_fall'
    },
    rideshare_other: {
      id: 'rideshare_other',
      labelEn: 'Rideshare (Uber/Lyft) / Other Injury',
      labelEs: 'Viaje Compartido (Uber/Lyft) u Otra Lesión',
      mappedCaseType: 'car_accident'
    }
  };

  const TREATMENT_STATUSES = {
    er_visit: {
      id: 'er_visit',
      labelEn: 'Emergency Room / Urgent Care',
      labelEs: 'Sala de Emergencias / Clínica de Urgencias'
    },
    in_treatment: {
      id: 'in_treatment',
      labelEn: 'Currently Receiving Doctor / PT Treatment',
      labelEs: 'Actualmente en Tratamiento con Médico / Terapia Física'
    },
    no_treatment: {
      id: 'no_treatment',
      labelEn: 'Have Not Seen a Doctor Yet',
      labelEs: 'Aún No He Visto a un Médico'
    }
  };

  // Internal reactive state
  const state = {
    currentStep: 1,
    selectedAccidentType: null,
    selectedTreatment: null
  };

  /**
   * Set current step in evaluation journey (1, 2, or 3)
   */
  const setStep = (step) => {
    const num = parseInt(step, 10);
    if (num >= 1 && num <= 3) {
      state.currentStep = num;
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('noyes:caseEvaluatorStepChanged', {
          detail: { step: state.currentStep }
        }));
      }
    }
    return state.currentStep;
  };

  /**
   * Step 1: Select Accident Category
   */
  const selectAccidentType = (type) => {
    if (!ACCIDENT_TYPES[type]) {
      return { success: false, error: 'Invalid accident type' };
    }
    state.selectedAccidentType = type;
    setStep(2);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('noyes:caseEvaluatorUpdated', {
        detail: { ...getState() }
      }));
    }
    return { success: true, accidentType: type, step: state.currentStep };
  };

  /**
   * Step 2: Select Medical Treatment Status
   */
  const selectTreatment = (status) => {
    if (!TREATMENT_STATUSES[status]) {
      return { success: false, error: 'Invalid treatment status' };
    }
    state.selectedTreatment = status;
    setStep(3);

    // Save assessment to persistent storage
    const result = getQualificationResult();
    try {
      NoyesStorage.saveAssessment({
        type: '3_step_evaluator',
        accidentType: state.selectedAccidentType,
        treatmentStatus: state.selectedTreatment,
        qualified: true,
        priorityLevel: 'HIGH_PRIORITY',
        timestamp: new Date().toISOString()
      });
    } catch (e) {
      // Storage fallback handled gracefully
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('noyes:caseEvaluatorUpdated', {
        detail: { ...getState(), result }
      }));
    }

    return {
      success: true,
      treatmentStatus: status,
      step: state.currentStep,
      result
    };
  };

  /**
   * Step 3: High-Priority Qualification Result
   */
  const getQualificationResult = (lang = currentLang || 'en') => {
    const isEs = lang === 'es';
    const accidentObj = ACCIDENT_TYPES[state.selectedAccidentType] || ACCIDENT_TYPES.car_truck;
    const treatmentObj = TREATMENT_STATUSES[state.selectedTreatment] || TREATMENT_STATUSES.er_visit;

    return {
      qualified: true,
      priorityLevel: 'HIGH_PRIORITY',
      accidentType: state.selectedAccidentType || 'car_truck',
      accidentLabel: isEs ? accidentObj.labelEs : accidentObj.labelEn,
      treatmentStatus: state.selectedTreatment || 'er_visit',
      treatmentLabel: isEs ? treatmentObj.labelEs : treatmentObj.labelEn,
      badge: isEs ? 'Revisión Prioritaria Aprobada' : 'High-Priority Review Approved',
      title: isEs
        ? 'Tu Caso Califica para Revisión Legal Gratuita Inmediata'
        : 'Case Qualifies for Immediate Free Legal Review',
      reassurance: isEs
        ? 'Tu caso presenta fuertes indicadores para una recuperación financiera máxima. Nuestros abogados litigantes Juan Girón y Shernette Noyes están listos para revisar tu reclamo de inmediato y exigir la indemnización máxima.'
        : 'Your case qualifies for immediate free legal review and exhibits strong merit for maximum financial recovery. Trial litigators Juan Girón and Shernette Noyes are prepared to demand full policy limits on your behalf.',
      immigrationProtection: isEs
        ? '100% Protegido por la Ley de CT: Tu derecho a recibir compensación financiera completa está 100% garantizado por ley, sin importar tu estatus migratorio.'
        : '100% Protected Under CT Law: Full financial compensation is 100% protected under Connecticut law regardless of immigration status.',
      contingencyGuarantee: isEs
        ? 'Garantía Si No Ganamos, No Pagas: $0 honorarios iniciales. Nosotros cubrimos todos los gastos periciales y de litigio. No nos debes nada a menos que ganemos.'
        : '$0 Upfront Fees — No Win, No Fee Guarantee. We advance all investigation and court costs. You pay nothing unless we win.',
      ctaClaim: isEs ? 'Reclamar Mi Consulta Gratuita Ahora ($0 Inicial)' : 'Claim Your Free Consultation Now ($0 Upfront)',
      ctaCall: isEs ? 'Llamada Directa: (203) 572-6748' : 'Call Direct: (203) 572-6748'
    };
  };

  /**
   * Helper method to pre-populate consultation form (#contact) and modal (#consultationModal)
   */
  const prefillConsultation = (accidentType, treatmentStatus) => {
    const actType = accidentType || state.selectedAccidentType || 'car_truck';
    const trtStatus = treatmentStatus || state.selectedTreatment || 'er_visit';

    const accidentObj = ACCIDENT_TYPES[actType] || ACCIDENT_TYPES.car_truck;
    const treatmentObj = TREATMENT_STATUSES[trtStatus] || TREATMENT_STATUSES.er_visit;

    const mappedCaseType = accidentObj.mappedCaseType || 'car_accident';
    const isEs = currentLang === 'es';

    const note = isEs
      ? `[Evaluación Rápida de Caso - Alta Prioridad]\nTipo de Accidente: ${accidentObj.labelEs}\nAtención Médica: ${treatmentObj.labelEs}\nEstado: Caso Precalificado para Revisión Gratuita ($0 Inicial / Garantía Si No Ganamos, No Pagas). 100% Protegido por Ley en CT.`
      : `[High-Priority Case Evaluation]\nAccident Type: ${accidentObj.labelEn}\nMedical Treatment: ${treatmentObj.labelEn}\nStatus: Pre-Qualified for Immediate Free Review ($0 Upfront / No Win, No Fee). 100% Protected Under CT Law.`;

    // 1. Pre-populate #contact consultation form
    const contactForm = document.querySelector('#contact form') || document.querySelector('.consultation-form');
    if (contactForm) {
      const caseTypeSelect = contactForm.querySelector('select[name="caseType"]');
      if (caseTypeSelect) {
        caseTypeSelect.value = mappedCaseType;
        caseTypeSelect.dispatchEvent(new Event('change', { bubbles: true }));
      }
      const messageField = contactForm.querySelector('textarea[name="message"]');
      if (messageField) {
        messageField.value = note;
        messageField.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }

    // 2. Pre-populate #consultationModal form
    const modal = document.getElementById('consultationModal');
    if (modal) {
      const modalSelect = modal.querySelector('select[name="caseType"]');
      if (modalSelect) {
        modalSelect.value = mappedCaseType;
        modalSelect.dispatchEvent(new Event('change', { bubbles: true }));
      }
      const modalMessage = modal.querySelector('textarea[name="message"]');
      if (modalMessage) {
        modalMessage.value = note;
        modalMessage.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }

    return {
      success: true,
      accidentType: actType,
      treatmentStatus: trtStatus,
      mappedCaseType,
      note
    };
  };

  /**
   * Reset evaluator back to Step 1
   */
  const reset = () => {
    state.currentStep = 1;
    state.selectedAccidentType = null;
    state.selectedTreatment = null;
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('noyes:caseEvaluatorReset'));
      window.dispatchEvent(new CustomEvent('noyes:caseEvaluatorUpdated', {
        detail: { ...getState() }
      }));
    }
    return getState();
  };

  /**
   * Get current internal snapshot
   */
  const getState = () => ({
    currentStep: state.currentStep,
    selectedAccidentType: state.selectedAccidentType,
    selectedTreatment: state.selectedTreatment,
    isComplete: Boolean(state.selectedAccidentType && state.selectedTreatment)
  });

  return {
    ACCIDENT_TYPES,
    TREATMENT_STATUSES,
    setStep,
    selectAccidentType,
    selectTreatment,
    getQualificationResult,
    prefillConsultation,
    reset,
    getState
  };
})();

/* ==========================================================================
   SECTION 4: CLAIM EVALUATION & QUALIFICATION ENGINE (NoyesClaimEvaluator)
   ========================================================================== */

const NoyesClaimEvaluator = (() => {
  /**
   * Check Connecticut 2-year statute of limitations (Conn. Gen. Stat. § 52-584)
   */
  const calculateStatuteOfLimitations = (incidentDateStr, lang = 'en') => {
    if (!incidentDateStr) {
      return {
        withinLimit: true,
        daysRemaining: null,
        monthsRemaining: null,
        isUrgent: false,
        isExpired: false,
        deadlineFormatted: '',
        message: lang === 'es'
          ? 'Fecha de accidente no especificada. El plazo general en Connecticut es de 2 años (Conn. Gen. Stat. § 52-584).'
          : 'Incident date not specified. Standard Connecticut statute is 2 years (Conn. Gen. Stat. § 52-584).',
        lawCite: 'Conn. Gen. Stat. § 52-584'
      };
    }

    const incident = new Date(incidentDateStr);
    if (isNaN(incident.getTime())) {
      return {
        withinLimit: true,
        isUrgent: false,
        isExpired: false,
        deadlineFormatted: '',
        message: lang === 'es' ? 'Formato de fecha inválido.' : 'Invalid incident date format.',
        lawCite: 'Conn. Gen. Stat. § 52-584'
      };
    }

    const now = new Date();
    const deadline = new Date(incident);
    deadline.setFullYear(deadline.getFullYear() + CT_LAW_CONSTANTS.STATUTE_OF_LIMITATIONS_YEARS);

    const msDiff = deadline.getTime() - now.getTime();
    const daysRemaining = Math.ceil(msDiff / (1000 * 60 * 60 * 24));
    const monthsRemaining = Math.max(0, Math.round(daysRemaining / 30));
    const deadlineFormatted = deadline.toLocaleDateString(lang === 'es' ? 'es-US' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    if (daysRemaining < 0) {
      return {
        withinLimit: false,
        daysRemaining: 0,
        monthsRemaining: 0,
        isUrgent: false,
        isExpired: true,
        deadlineFormatted,
        message: lang === 'es'
          ? `El plazo legal estándar de 2 años en Connecticut (§ 52-584) venció el ${deadlineFormatted}. Consulta con nuestros abogados de inmediato para verificar si aplican excepciones extraordinarias.`
          : `The standard 2-year Connecticut statute of limitations (§ 52-584) expired on ${deadlineFormatted}. Contact our litigators immediately to analyze whether statutory tolling exceptions apply.`,
        lawCite: 'Conn. Gen. Stat. § 52-584'
      };
    }

    if (daysRemaining <= CT_LAW_CONSTANTS.STATUTE_URGENCY_THRESHOLD_DAYS) {
      return {
        withinLimit: true,
        daysRemaining,
        monthsRemaining,
        isUrgent: true,
        isExpired: false,
        deadlineFormatted,
        message: lang === 'es'
          ? `¡ALERTA URGENTE! Quedan solo ${daysRemaining} días antes del vencimiento del plazo en Connecticut (${deadlineFormatted}). Debe iniciarse acción formal de inmediato.`
          : `URGENT DEADLINE! Only ${daysRemaining} days remaining before your Connecticut filing deadline (${deadlineFormatted}). Formal legal action must be initiated immediately.`,
        lawCite: 'Conn. Gen. Stat. § 52-584'
      };
    }

    return {
      withinLimit: true,
      daysRemaining,
      monthsRemaining,
      isUrgent: false,
      isExpired: false,
      deadlineFormatted,
      message: lang === 'es'
        ? `Reclamo dentro del plazo legal en Connecticut (vence el ${deadlineFormatted}, ~${monthsRemaining} meses restantes).`
        : `Claim is well within Connecticut's 2-year statutory limit (expires on ${deadlineFormatted}, ~${monthsRemaining} months remaining).`,
      lawCite: 'Conn. Gen. Stat. § 52-584'
    };
  };

  /**
   * Comprehensive Claim Assessment Algorithm
   * Integrates:
   * 1. Injury Severity Scoring (0-35)
   * 2. Fault & Modified Comparative Negligence (Conn. Gen. Stat. § 52-572h) (0-35)
   * 3. Medical Documentation Status (0-20)
   * 4. Insurance Availability (0-10)
   * 5. Connecticut Statute of Limitations
   * 6. Undocumented Immigrant Compensation Rights
   */
  const evaluate = (params, lang = 'en') => {
    const {
      incidentDate = '',
      caseType = 'car_accident',
      injurySeverity = 'moderate',
      faultStatus = 'not_at_fault',
      medicalTreatment = 'immediate_er',
      insuranceInvolved = 'yes_other_party'
    } = params;

    const sol = calculateStatuteOfLimitations(incidentDate, lang);

    let score = 0;

    // 1. Injury Severity Weight (0 - 35 points)
    const severityMap = {
      catastrophic: 35, // Brain trauma, paralysis, amputation, spinal cord
      severe: 30,       // Multiple fractures, surgery, hospitalization
      moderate: 20,     // Whiplash, herniated disc, concussion, physical therapy
      minor: 10,        // Sprains, bruises, minimal soft tissue
      none: 0           // No physical trauma
    };
    score += severityMap[injurySeverity] !== undefined ? severityMap[injurySeverity] : 15;

    // 2. Fault Weight (0 - 35 points)
    // Connecticut modified comparative negligence rule (Conn. Gen. Stat. § 52-572h):
    // Recovery permitted if claimant's negligence is 50% or less. Barred if 51% or more.
    const faultMap = {
      not_at_fault: 35,       // Rear-ended, red light runner, drunk driver
      unsure: 20,             // Disputed liability, requires investigation
      partially_at_fault: 15, // Comparative negligence (<50% fault, damages reduced proportionally)
      at_fault: 0             // Primary fault, recovery barred under CT law
    };
    score += faultMap[faultStatus] !== undefined ? faultMap[faultStatus] : 15;

    // 3. Medical Care Weight (0 - 20 points)
    const treatmentMap = {
      immediate_er: 20, // Emergency Room on accident date
      doctor_visit: 15, // Seen by specialist/doctor within 48 hours
      delayed: 10,      // Seen doctor after several days
      none_yet: 5       // Needs immediate referral
    };
    score += treatmentMap[medicalTreatment] !== undefined ? treatmentMap[medicalTreatment] : 10;

    // 4. Insurance Coverage Weight (0 - 10 points)
    const insuranceMap = {
      yes_other_party: 10, // At-fault party has commercial or personal auto policy
      yes_own_policy: 10,  // CT requires UM/UIM under Conn. Gen. Stat. § 38a-336
      hit_and_run: 8,      // Recoverable via UM policy
      uninsured: 5,        // Recoverable through claimant's UM/UIM
      unknown: 5
    };
    score += insuranceMap[insuranceInvolved] !== undefined ? insuranceMap[insuranceInvolved] : 5;

    // Apply statutory or fault barriers
    let isBarredByFault = false;
    if (faultStatus === 'at_fault') {
      isBarredByFault = true;
      score = Math.min(score, 20); // Cap at 20 due to CT 51% bar rule
    }

    if (sol.isExpired) {
      score = Math.min(score, 25); // Cap at 25 due to statute expiration
    }

    score = Math.max(0, Math.min(100, Math.round(score)));

    // Categorize Qualification Tier
    let qualificationLevel = 'moderate';
    let badge = '';
    let recommendation = '';

    if (score >= 75) {
      qualificationLevel = 'high';
      badge = lang === 'es' ? 'Alta Probabilidad de Máxima Indemnización' : 'High Probability of Substantial Financial Recovery';
      recommendation = lang === 'es'
        ? 'Tu reclamo presenta fundamentos legales muy sólidos. Los abogados litigantes Juan Girón y Shernette Noyes recomiendan una consulta inmediata ($0 costo inicial) para preservar evidencia, ordenar peritajes y exigir la máxima compensación a las aseguradoras.'
        : 'Your claim exhibits high legal merit. Trial litigators Juan Girón and Shernette Noyes advise an immediate confidential case evaluation ($0 upfront) to preserve accident evidence and demand full policy limits.';
    } else if (score >= 50) {
      qualificationLevel = 'moderate';
      badge = lang === 'es' ? 'Reclamo Viable - Revisión Legal Recomendada' : 'Strong Viable Claim - Attorney Review Advised';
      recommendation = lang === 'es'
        ? 'Presentas un caso viable de compensación. Es indispensable documentar minuciosamente los tratamientos médicos y negarte a brindar declaraciones grabadas al ajustador del seguro sin representación legal.'
        : 'You have a viable personal injury claim. It is essential to strictly document ongoing medical treatments and refuse any recorded statements to the insurer without an attorney present.';
    } else if (score >= 30) {
      qualificationLevel = 'needs_review';
      badge = lang === 'es' ? 'Caso Complejo - Requiere Investigación Profunda' : 'Complex Claim Factors - In-Depth Review Required';
      recommendation = lang === 'es'
        ? 'Existen aspectos que exigen análisis jurídico exhaustivo (disputa de culpa o atención médica tardía). Nuestro equipo evaluará pólizas accesorias y coberturas de motorista sin seguro (UM/UIM).'
        : 'Specific factors require thorough investigation (such as disputed liability or gaps in care). Our legal team will analyze available uninsured motorist (UM/UIM) coverage.';
    } else {
      qualificationLevel = 'unlikely';
      badge = lang === 'es' ? 'Desafíos Legales Significativos' : 'Significant Legal Obstacles Identified';
      recommendation = lang === 'es'
        ? (isBarredByFault
            ? 'Bajo la doctrina de negligencia comparativa de Connecticut (§ 52-572h), si se comprueba más del 50% de culpa, no hay derecho a cobro. No obstante, una reconstrucción pericial del accidente puede demostrar la responsabilidad del otro conductor.'
            : 'El reclamo enfrenta obstáculos como la posible prescripción del plazo o falta de lesiones documentadas. Contáctanos para determinar si aplican excepciones legales.')
        : (isBarredByFault
            ? 'Under Connecticut\'s modified comparative negligence doctrine (§ 52-572h), recovery is barred if you are found over 50% at fault. An independent crash reconstruction investigation may determine differing liability.'
            : 'The claim faces statutory hurdles or lack of documented injuries. Contact us to determine whether special legal tolling applies.');
    }

    // Eligible Damages Matrix
    const eligibleDamages = lang === 'es' ? [
      'Gastos médicos pasados y futuros (hospital, cirugías, medicamentos, terapias)',
      'Salarios perdidos y pérdida de capacidad de ganancia futura',
      'Dolor físico, sufrimiento y angustia emocional',
      'Pérdida del disfrute de la vida y actividades cotidianas',
      'Daños materiales al vehículo y pertenencias personales',
      'Incapacidad permanente, cicatrices y desfiguración'
    ] : [
      'Past and future medical expenses (ER, surgery, rehabilitation, prescriptions)',
      'Lost wages and diminished future earning capacity',
      'Physical pain, suffering, and emotional trauma',
      'Loss of enjoyment of life and daily activities',
      'Vehicle repair costs or total property loss replacement',
      'Permanent disability, impairment, scarring, and disfigurement'
    ];

    // Immigrant Rights Notice
    const immigrantRightsNotice = lang === 'es'
      ? 'Derecho Total a Indemnización sin Importar tu Estatus Migratorio: En Connecticut, tus derechos civiles a una compensación completa por lesiones son inviolables. Los tribunales prohíben que las aseguradoras utilicen tu estatus legal para reducir o evadir el pago de tu reclamo.'
      : 'Full Rights Regardless of Immigration Status: In Connecticut, your civil right to full personal injury compensation is strictly upheld by law. Courts prohibit insurance carriers from using immigration status to reduce, delay, or deny settlements.';

    // Contingency Guarantee Notice
    const contingencyNotice = lang === 'es'
      ? 'Garantía "Si No Ganamos, No Pagas": No desembolsas $0 de tu bolsillo. Todos los costos de investigación, peritajes y litigio son cubiertos por la firma. Solo cobramos honorarios si ganamos dinero para ti.'
      : '"No Win, No Fee" Contingency Guarantee: You pay $0 out of pocket. All investigation, expert witnesses, and court costs are advanced by our firm. Legal fees are collected only if compensation is won.';

    const result = {
      score,
      qualificationLevel,
      badge,
      recommendation,
      statuteStatus: sol,
      eligibleDamages,
      immigrantRightsNotice,
      contingencyNotice,
      inputs: {
        incidentDate,
        caseType,
        injurySeverity,
        faultStatus,
        medicalTreatment,
        insuranceInvolved
      },
      evaluatedAt: new Date().toISOString()
    };

    // Auto-save to persistence
    NoyesStorage.saveAssessment(result);

    return result;
  };

  return {
    calculateStatuteOfLimitations,
    evaluate
  };
})();

/* ==========================================================================
   SECTION 5: COMPREHENSIVE BILINGUAL TRANSLATION DICTIONARY (EN / ES)
   ========================================================================== */

let currentLang = 'en';
try {
  if (typeof window !== 'undefined' && window.localStorage) {
    const saved = window.localStorage.getItem(STORAGE_KEYS.LANG);
    if (saved && (saved === 'en' || saved === 'es')) {
      currentLang = saved;
    }
  }
} catch (e) {
  currentLang = 'en';
}

const translations = {
  en: {
    // Top Ribbon & Navigation
    ribbon_serving: 'Connecticut Personal Injury & Trial Lawyers | Aggressive Representation',
    ribbon_phone: '+1 203-572-6748',
    ribbon_bilingual: '100% Bilingual: English & Spanish',
    ribbon_guarantee: 'No Win, No Fee Guarantee',
    nav_home: 'Home',
    nav_immigration: 'Immigration Defense',
    nav_injury: 'Practice Areas',
    nav_verdicts: 'Verdicts',
    nav_attorneys: 'Attorneys',
    nav_services: 'Practice Areas',
    nav_recognition: 'Recognition',
    nav_stories: 'Client Victories',
    nav_contact: 'Contact',
    btn_book_consultation: 'Free Case Evaluation',
    btn_call_now: 'Call Now (24/7)',
    btn_submit: 'Get Free Evaluation ($0 Upfront)',

    // Hero Section
    hero_badge: 'Connecticut Personal Injury & Trial Litigators',
    hero_badge_single: 'Connecticut Personal Injury Litigators',
    hero_badge_no_win: 'No Win, No Fee Guarantee ($0 Upfront Costs)',
    hero_badge_status: 'Full Compensation Rights Regardless of Immigration Status',
    hero_title_clean_1: 'Defending the Injured.',
    hero_title_clean_2: 'Demanding Maximum Compensation.',
    hero_title_1: 'Aggressive Trial Advocacy.',
    hero_title_2: 'Maximum Financial Recovery for Accident Victims.',
    hero_sub: 'When serious injuries disrupt your life, Noyes & Associates takes on insurance companies with relentless trial litigation. Led by aggressive litigator Juan Girón and compassionate advocate Shernette Noyes, we demand the maximum settlement you deserve across Connecticut — with $0 out-of-pocket costs and complete advocacy regardless of immigration status.',
    hero_trust_1: 'No Fee Unless We Win',
    hero_trust_2: '100% Bilingual Attorneys',
    hero_trust_3: 'Status Protected Under CT Law',
    hero_guarantee_1: 'No Win, No Fee ($0 Upfront)',
    hero_guarantee_2: '100% Bilingual Spanish & English',
    hero_guarantee_3: 'All CT Accident Victims Protected',

    // Dual Litigator Hero Badges & Labels
    hero_lead_litigator: 'Juan Girón | Lead Courtroom Litigator',
    hero_managing_partner: 'Shernette Noyes | Managing Partner & Community Champion',
    hero_badge_courtroom: 'Trial-Tested Connecticut Courtroom Litigators',
    hero_giron_title: 'Lead Courtroom Trial Litigator',
    hero_noyes_title: 'Managing Partner & Community Champion',
    hero_dual_names: 'Juan Girón & Shernette Noyes',
    hero_photo_subtitle: 'Senior Trial Litigators & Managing Partners',
    hero_overlay_tag: '$0 Upfront • Contingency Litigation',
    hero_badge_exp_title: '20+ Years',
    hero_badge_exp_desc: 'Dedicated Legal Mastery',
    hero_badge_rating_title: '4.9 ★ Rating',
    hero_badge_rating_desc: 'Over 1,000+ Cases Won',

    // Animated Key Stats
    stat_years: 'Years of Trial Mastery',
    stat_years_sub: 'Decades of relentless courtroom advocacy across Connecticut',
    stat_reviews: 'Google Reviews',
    stat_reviews_sub: 'Overwhelmingly positive real client outcomes',
    stat_bilingual: 'Bilingual Representation',
    stat_bilingual_sub: 'Clear, confidential Spanish & English counsel',
    stat_rank: 'Legal Excellence',
    stat_rank_sub: 'Trusted community leaders in Connecticut',
    stat_recovered: 'Millions Recovered',
    stat_recovered_sub: 'Aggressive settlements and verdicts for injured accident victims',

    // Multi-Million Dollar Verdicts & Settlements Showcase
    verdicts_tag: 'Multi-Million Dollar Case Outcomes',
    verdicts_title: 'Proven Verdicts & Major Settlements',
    verdicts_sub: 'Real financial recovery secured through relentless trial preparation and courtroom advocacy across Connecticut courts.',
    verdicts_badge: 'Trial-Tested Results',
    verdicts_disclaimer: 'Past results do not guarantee similar outcomes. Each case is unique and decided on its specific facts and applicable Connecticut law.',
    verdicts_cta: 'Request a Free Case Evaluation for Your Claim',
    verdict_1_amt: '$3,850,000',
    verdict_1_type: 'Commercial Semi-Truck Highway Collision',
    verdict_1_loc: 'CT Superior Court',
    verdict_1_desc: 'Catastrophic multi-axle 18-wheeler rear-end collision resulting in severe multi-level spinal trauma and surgical fusion.',
    verdict_2_amt: '$1,750,000',
    verdict_2_type: 'Scaffolding Collapse & Construction Fall',
    verdict_2_loc: 'Hartford, CT',
    verdict_2_desc: 'Unsafe OSHA safety violations leading to scaffolding structural failure, traumatic brain injury, and multiple fractures.',
    verdict_3_amt: '$950,000',
    verdict_3_type: 'Multi-Vehicle Crash Spinal Injury',
    verdict_3_loc: 'New Haven, CT',
    verdict_3_desc: 'High-speed chain-reaction highway crash causing chronic lumbar nerve impingement and permanent partial disability.',
    verdict_4_amt: '$720,000',
    verdict_4_type: 'Commercial Premises Ice Slip & Fall',
    verdict_4_loc: 'Stamford, CT',
    verdict_4_desc: 'Commercial retail parking lot black ice hazard left untreated after a winter storm, causing complex fractured hip surgery.',
    verdict_5_amt: '$580,000',
    verdict_5_type: 'Rideshare Passenger Severe Injury',
    verdict_5_loc: 'Bridgeport, CT',
    verdict_5_desc: 'Negligent commercial rideshare driver failure to yield at intersection, securing maximum third-party policy payout for injured passenger.',

    // The Noyes Advantage: Insurance Comparison Matrix
    advantage_tag: 'The Noyes Trial Advantage',
    advantage_title: 'Why Insurance Companies Fear Our Litigators',
    advantage_sub: 'Insurance companies evaluate claims based on whether your attorney will actually go to court. Here is how our trial-ready advocacy protects you.',
    adv_alone_title: 'Dealing with Insurance Alone',
    adv_alone_sub: 'What insurance adjusters exploit to minimize your payout',
    adv_noyes_title: 'The Noyes Trial Litigators',
    adv_noyes_sub: 'Aggressive trial leverage and maximum financial recovery',
    adv_factor_label: 'Strategic Litigation Factor',
    adv_row1_title: 'Trial-Ready Court Litigation',
    adv_row1_alone: 'Insurance offers lowball nuisance payouts knowing you cannot litigate in court.',
    adv_row1_noyes: 'We prepare every case for trial, forcing insurers to pay maximum value.',
    adv_row2_title: 'Direct Spanish/English Attorney Access',
    adv_row2_alone: 'Routed to impersonal call centers, junior caseworkers, and unreturned voicemails.',
    adv_row2_noyes: 'Direct, personal access to trial litigators Juan Girón and Shernette Noyes.',
    adv_row3_title: 'Immigration Status Protection & Immunity',
    adv_row3_alone: 'Adjusters use deportation fears and status questions to intimidate victims into quitting.',
    adv_row3_noyes: '100% protected under CT law. Full compensation guaranteed regardless of status.',
    adv_row4_title: 'Rapid Evidence & Black Box Preservation',
    adv_row4_alone: 'Surveillance footage is overwritten and vehicle black box data erased within days.',
    adv_row4_noyes: 'Immediate formal spoliation letters and private accident reconstruction forensics.',
    adv_row5_title: 'Financial Risk & Upfront Litigation Costs',
    adv_row5_alone: 'Victims face mounting medical bills, lost wages, and financial pressure to settle.',
    adv_row5_noyes: '100% Contingency Guarantee. $0 upfront costs. You pay nothing unless we win.',

    // Real Client Stories (Testimonials)
    client_stories_badge: 'Real Client Stories',
    client_stories_title: 'Trusted by Injured Families Across Connecticut',
    client_stories_sub: "See how our bilingual trial litigators protect our clients' rights, health, and financial future when everything is on the line.",
    client_story_1_tag: 'Workplace Fall • Bridgeport, CT',
    client_story_1_quote: 'After falling at a construction site, my boss told me not to report it because of my immigration status. I was terrified and in severe pain. Attorney Juan Girón spoke to me directly in Spanish, explained that Connecticut law protects me, and fought until my surgeries and lost wages were completely covered.',
    client_story_1_author: 'Carlos M. — Construction Injury Client',
    client_story_2_tag: 'I-95 Highway Crash • New Haven, CT',
    client_story_2_quote: "The insurance company tried to pressure me into signing a quick check that barely covered my initial ER visit. Shernette Noyes and her litigation team stepped in immediately, took over every call, and prepared my case for court. They secured a settlement ten times higher than the insurer's first offer.",
    client_story_2_author: 'David R. — Highway Collision Client',
    client_story_3_tag: 'Rideshare Collision • Stamford, CT',
    client_story_3_quote: "Unlike huge TV law firms where you only talk to receptionists, at Noyes & Associates I had direct access to my attorneys from day one. I didn't pay a single dollar out of pocket, they arranged my physical therapy specialists, and they treated my family with genuine respect.",
    client_story_3_author: 'Elena V. — Personal Injury Client',
    client_stories_disclaimer: '*Client initials are used to protect privacy. Past results do not guarantee similar future outcomes under Connecticut law.',

    // Founder Recognition
    award_tag: 'Recognition of Our Founder',
    award_title: 'Honored at the 17th Annual Sweet Mother Awards 2026',
    award_quote: '"Honoring Women Who Make a Difference in Their Communities"',
    award_desc: 'Attorney Shernette Noyes de Girón, founder of Noyes & Associates, was honored at the 17th Annual Sweet Mother Awards in Darien, Connecticut, celebrating her tireless leadership, compassionate client advocacy, and dedicated service to injured victims and immigrant families.',

    // Attorneys Section
    attorneys_tag: 'Courtroom Trial Litigators',
    attorneys_title: 'Experienced Connecticut Trial & Injury Attorneys',
    attorneys_sub: 'Led by Attorney Juan Girón and Attorney Shernette Noyes, our legal team fights aggressive insurance carriers to secure top compensation for auto accidents, workplace injuries, and catastrophic claims.',
    
    // Juan Girón Bio
    attorney_giron_name: 'Juan Girón',
    attorney_giron_role: 'Senior Partner & Lead Trial Litigator',
    attorney_giron_badge: 'Aggressive Trial Litigator',
    attorney_giron_bio: 'Attorney Juan Girón is a formidable courtroom trial litigator who refuses to let big insurance companies shortchange accident victims. Known for meticulous trial preparation, cross-examination, and relentless negotiation, Juan has recovered millions of dollars for clients suffering from severe car crashes, commercial trucking collisions, and workplace trauma. He provides unyielding, 100% bilingual advocacy in English and Spanish.',

    // Shernette Noyes Bio
    attorney_noyes_name: 'Shernette Noyes de Girón',
    attorney_noyes_role: 'Founder & Managing Partner',
    attorney_noyes_badge: 'Sweet Mother Award Honoree 2026',
    attorney_noyes_bio: 'Recipient of the prestigious 2026 Sweet Mother Award, Attorney Shernette Noyes brings over 20 years of empathetic yet strategic legal mastery. She champions the rights of vulnerable families, catastrophic injury victims, and immigrant communities, ensuring they receive the highest standard of compassionate victim protection and financial restoration.',

    // Practice Areas Filters
    services_tag: 'Comprehensive Practice Areas',
    services_title: 'Focused Personal Injury & Strategic Legal Solutions',
    services_sub: 'From high-speed highway collisions and workplace falls to complex immigration defense, estate planning, and bankruptcy debt relief.',
    filter_all: 'All Services',
    filter_injury: 'Personal Injury (Primary)',
    filter_immigration: 'Immigration Law',
    filter_other: 'Bankruptcy & Real Estate',

    // Practice Area Cards
    service_car_title: 'Car & Auto Accidents',
    service_car_desc: 'Aggressive trial representation for victims of reckless, distracted, speeding, or drunk drivers. We recover maximum compensation for medical bills, surgery, and lost income.',
    service_truck_title: 'Commercial Trucks & Motorcycles',
    service_truck_desc: 'Catastrophic collision litigation against 18-wheelers, delivery vans, and tractor-trailers. We hold corporate carriers and negligent commercial fleets accountable.',
    service_slip_title: 'Slip, Trip & Fall (Premises Liability)',
    service_slip_desc: 'Holding negligent commercial landlords, supermarkets, and property owners responsible for icy walkways, broken staircases, and hazardous property conditions.',
    service_work_title: 'Workplace Injuries & Workers\' Comp',
    service_work_desc: 'Protecting injured workers on construction sites, manufacturing plants, and warehouses. We secure complete medical treatment and wage benefits without fear of employer retaliation.',
    service_immig_title: 'Immigration Law & Deportation Defense',
    service_immig_desc: 'Proven legal defense before EOIR immigration courts, VAWA self-petitions, U Visas for crime victims, green card adjustments, and asylum protections.',
    service_realestate_title: 'Real Estate Closings & Transactions',
    service_realestate_desc: 'Trusted legal support in purchasing, selling, and leasing residential and commercial properties across Connecticut, protecting your investment at every closing.',
    service_bankr_title: 'Bankruptcy & Financial Relief',
    service_bankr_desc: 'Stop creditor harassment, wage garnishments, and foreclosure immediately. Strategic Chapter 7 and Chapter 13 debt restructuring for fresh financial beginnings.',

    // Client Stories & Testimonials
    stories_tag: 'Proven Case Results',
    stories_title: 'Stories That Inspire: Real Victories for Real Families',
    stories_sub: 'Discover how our aggressive trial litigators and compassionate advocates delivered justice and substantial compensation for injured clients across Connecticut.',
    story_1_badge: 'Commercial Truck Collision: $850,000 Settlement',
    story_1_quote: '"After a commercial truck collided with my vehicle on I-95, the insurance company offered a lowball payout. Attorney Juan Girón provided direct bilingual trial defense, prepared relentlessly for court, and forced them to pay $850,000. Noyes & Associates saved my family\'s future."',
    story_1_author: 'Mateo R.',
    story_1_case: 'Commercial Truck Collision Victim (Bridgeport, CT)',
    story_2_badge: 'Construction Scaffolding Fall: $620,000 Recovery',
    story_2_quote: '"I fell from an unsafe scaffolding at a Stamford jobsite. They tried to intimidate me over my immigration status, but Noyes & Associates proved my rights are 100% protected under CT law. They secured a $620,000 recovery and complete peace of mind for my medical care."',
    story_2_author: 'David G.',
    story_2_case: 'Construction Fall Victim (Stamford, CT)',
    story_3_badge: 'Auto Accident & Family Security: $340,000 Recovery',
    story_3_quote: '"When a reckless driver crashed into us, we were overwhelmed with medical bills and trauma. Attorney Shernette Noyes provided compassionate counsel and unwavering advocacy, securing $340,000 that brought complete medical and financial peace of mind to our family."',
    story_3_author: 'Elena M. & Family',
    story_3_case: 'Auto Accident Victim (Hartford, CT)',

    // Accident Guide Checklist
    checklist_tag: 'Interactive Emergency Guide',
    checklist_title: 'Immediate Action Checklist: What to Do After an Accident in Connecticut',
    checklist_sub: 'Follow these 5 essential steps to safeguard your physical health, preserve vital evidence, and maximize your legal claim value under Connecticut law.',
    checklist_progress_label: 'Accident Protocol Completion',
    checklist_mark_done: 'Mark as Completed',
    checklist_completed: 'Completed',
    checklist_step: 'Step',

    // Interactive 3-Step Quick Case Evaluator
    eval_lead_tag: 'Free Case Assessment Tool',
    eval_lead_title: '3-Step Quick Case Evaluation',
    eval_lead_sub: 'Answer 2 quick questions to immediately check your claim eligibility and Connecticut legal rights.',
    eval_qualified_badge: 'High-Priority Case Qualification Verified',
    eval_tab_1: '1. Incident Category',
    eval_tab_2: '2. Medical Attention',
    eval_tab_3: '3. Qualification',
    eval_step1_badge: 'Step 1 of 3: Incident',
    eval_step1_title: 'What Type of Accident or Injury Occurred?',
    eval_step1_sub: 'Select the primary incident category in Connecticut.',
    eval_opt_car_truck: 'Car & Commercial Truck Collision',
    eval_opt_slip_construction: 'Slip & Fall / Construction Site',
    eval_opt_rideshare_other: 'Rideshare (Uber/Lyft) / Other Injury',

    eval_step2_badge: 'Step 2 of 3: Medical Care',
    eval_step2_title: 'Have You Received Medical Attention?',
    eval_step2_sub: 'Medical records are vital evidence against insurance denials.',
    eval_opt_er_visit: 'Emergency Room / Urgent Care',
    eval_opt_in_treatment: 'Currently Receiving Doctor / PT Treatment',
    eval_opt_no_treatment: 'Have Not Seen a Doctor Yet',

    eval_step3_badge: 'Step 3 of 3: Qualification',
    eval_step3_title: 'Your High-Priority Qualification Result',
    eval_step3_sub: 'Immediate legal protection and representation under Connecticut law.',
    eval_result_qualified: 'Case Qualifies for Immediate Free Legal Review',
    eval_result_reassurance: 'Your case qualifies for immediate free legal review and exhibits strong merit for maximum financial recovery. Trial litigators Juan Girón and Shernette Noyes are prepared to demand full policy limits on your behalf.',
    eval_result_immigration: '100% Protected Under CT Law: Full financial compensation is 100% protected under Connecticut law regardless of immigration status.',
    eval_result_contingency: '$0 Upfront Fees — No Win, No Fee Guarantee. We advance all litigation costs.',
    eval_cta_claim: 'Claim Your Free Consultation Now ($0 Upfront)',
    eval_cta_call: 'Call Direct: (203) 572-6748',
    eval_btn_next: 'Next Step →',
    eval_btn_back: '← Back',
    eval_btn_restart: 'Start Over',

    // Claim Evaluator
    eval_tag: 'Free 60-Second Case Assessment',
    eval_title: 'Instant Connecticut Injury Claim Qualification Calculator',
    eval_sub: 'Calculate your case qualification score based on Connecticut\'s 2-year statute of limitations (Conn. Gen. Stat. § 52-584) and modified comparative negligence laws.',
    eval_date_label: 'Date of Accident / Injury',
    eval_type_label: 'Accident Category',
    eval_severity_label: 'Severity of Injuries',
    eval_fault_label: 'Fault Assessment',
    eval_treatment_label: 'Medical Treatment Received',
    eval_insurance_label: 'Insurance Coverage Involved',
    eval_btn: 'Calculate Claim Qualification',
    eval_reset: 'Reset Calculator',

    // Form & Consultation Booking
    booking_tag: 'Free Case Evaluation',
    booking_title: 'Injured in Connecticut? We Are Ready to Fight for You.',
    booking_desc: 'Fill out the form below for a 100% confidential case evaluation. We work on a contingency basis: No Win, No Fee ($0 upfront costs). You pay nothing unless we recover money for you.',
    modal_title: 'Request a Free Case Evaluation',
    modal_desc: 'Discuss your accident or legal matter directly with trial litigators Juan Girón and Shernette Noyes. 100% confidential, $0 upfront fee.',
    form_first_name: 'First Name *',
    form_last_name: 'Last Name *',
    form_email: 'Email Address *',
    form_phone: 'Phone Number (U.S.) *',
    form_case_type: 'Case Type / Legal Area *',
    form_incident_date: 'Incident Date (if applicable)',
    form_contact_time: 'Preferred Contact Time',
    form_consult_pref: 'Consultation Preference',
    form_consult_virtual: 'Virtual Consultation (Video / Phone)',
    form_consult_inperson: 'In-Person Appointment (Stratford, CT Office)',
    form_message_label: 'Case Details or Questions',
    form_message_placeholder: 'Briefly describe your accident, injuries, date of crash, or legal questions...',
    form_disclaimer: 'Submitting this form does not establish an attorney-client relationship. All submitted data is strictly confidential. $0 upfront fees under our "No Win, No Fee" guarantee.',
    form_success_msg: 'Thank you! Your case details have been received. Attorney Juan Girón or our bilingual legal team will contact you shortly.',

    // Validations & Errors
    required_field: 'This field is required',
    valid_email: 'Please enter a valid email address (e.g. name@example.com)',
    valid_phone: 'Please enter a valid 10-digit U.S. phone number (e.g. (203) 572-6748)',

    // Dropdown Select Options: Case Types
    opt_case_car_accident: 'Car & Auto Accidents',
    opt_case_truck_motorcycle: 'Commercial Truck & Motorcycle Collisions',
    opt_case_slip_fall: 'Slip, Trip & Fall (Premises Liability)',
    opt_case_workplace_injury: 'Workplace Injuries / Workers\' Comp',
    opt_case_immigration: 'Immigration Law & Deportation Defense',
    opt_case_real_estate: 'Real Estate Closings & Transactions',
    opt_case_bankruptcy: 'Bankruptcy & Financial Debt Relief',
    opt_case_other: 'Other Legal Consultation',

    // Dropdown Select Options: Injury Severity
    opt_sev_catastrophic: 'Catastrophic (Spinal Trauma, TBI, Surgery)',
    opt_sev_severe: 'Severe (Multiple Fractures, Hospitalization)',
    opt_sev_moderate: 'Moderate (Herniated Disc, Whiplash, PT)',
    opt_sev_minor: 'Minor (Sprains, Soft Tissue Contusions)',

    // Dropdown Select Options: Fault Assessment
    opt_fault_not_at_fault: 'Not At Fault (Other driver 100% responsible)',
    opt_fault_unsure: 'Unsure / Disputed Liability',
    opt_fault_partially_at_fault: 'Partially At Fault (Under 50% fault in CT)',
    opt_fault_at_fault: 'Primary Fault (51%+ fault)',

    // Dropdown Select Options: Medical Treatment
    opt_treat_immediate_er: 'Emergency Room (ER) on accident date',
    opt_treat_doctor_visit: 'Doctor / Clinic seen within 48 hours',
    opt_treat_delayed: 'Doctor seen after several days',
    opt_treat_none_yet: 'Have not seen a doctor yet',

    // Dropdown Select Options: Insurance Coverage
    opt_ins_yes_other_party: 'At-fault driver has active insurance',
    opt_ins_yes_own_policy: 'Own policy (CT UM/UIM Coverage)',
    opt_ins_hit_and_run: 'Hit-and-Run / Fled Scene',
    opt_ins_uninsured: 'At-fault driver is Uninsured',

    // Legal Accreditations & Memberships Trust Bar
    trust_bar_label: 'RECOGNIZED COURTROOM EXCELLENCE & PROFESSIONAL AFFILIATIONS',
    trust_bar_b1: 'Connecticut Bar Association (CBA)',
    trust_bar_b2: 'Connecticut Trial Lawyers Association (CTLA)',
    trust_bar_b3: 'American Association for Justice (AAJ)',
    trust_bar_b4: 'Million Dollar Trial Advocates',
    trust_bar_b5: 'Top Rated 4.9★ Client Advocacy',

    // FAQ Section Header & CT Legal Urgency Banner
    faq_urgency_title: '⚠️ Strict Connecticut Legal Deadlines Apply (Conn. Gen. Stat. § 52-584)',
    faq_urgency_desc: 'In Connecticut, you generally have only 2 years from the date of an accident to file a personal injury lawsuit—and as little as 90 days to file a formal notice for defective roads or municipal claims. Do not wait until critical evidence disappears.',
    faq_eyebrow: 'Clear Answers. Zero Legal Jargon.',
    faq_title: 'Frequently Asked Questions After an Accident in CT',
    faq_sub: 'Everything you need to know about protecting your rights, medical care, and financial recovery.',

    // FAQ Accordion Items (Q1 - Q5)
    faq_q1: 'Can I file an injury claim in Connecticut if I am undocumented or don\'t have a Social Security Number?',
    faq_a1: 'Yes, 100%. Under Connecticut law, every injured person has the legal right to demand full financial compensation for medical bills, lost wages, and pain and suffering—regardless of immigration status. Insurance companies are prohibited from using your status to deny a valid claim, and all conversations with our firm are strictly confidential under attorney-client privilege.',
    faq_q2: 'How much does it cost to hire Noyes & Associates? Do I pay anything upfront?',
    faq_a2: 'You pay $0 out of pocket and $0 upfront. We work strictly on a contingency fee basis, which means we advance all court filing fees, accident reconstruction costs, and medical record expenses. We only get paid a percentage of the final settlement or court verdict we win for you. If we don\'t win your case, you owe us nothing.',
    faq_q3: 'How do I pay for hospital bills, surgery, or physical therapy if I don\'t have health insurance?',
    faq_a3: 'Do not delay medical care out of fear of bills. Our firm works with a trusted network of top medical specialists, orthopedic surgeons, and physical therapists across Connecticut who treat our clients under a \'Letter of Protection\'—meaning they wait to be paid directly out of your final legal settlement.',
    faq_q4: 'The other driver\'s insurance adjuster already offered me a check. Should I sign?',
    faq_a4: 'Never sign any release, medical authorization, or quick check from an insurance company before speaking with a trial lawyer. Early offers are \'lowball\' tactics designed to close your case forever before you realize the true long-term cost of your spinal, head, or joint injuries.',
    faq_q5: 'What if I can\'t travel to your office because of my injuries or work schedule?',
    faq_a5: 'We come to you or handle everything digitally. We offer 24/7 phone and WhatsApp consultations, electronic document signing from your phone, and hospital or home visits across Connecticut when injuries are severe.',

    // WhatsApp Prefill Message
    whatsapp_prefill_msg: 'Hello, I would like to request a free case evaluation regarding an accident in Connecticut.'
  },

  es: {
    // Top Ribbon & Navigation
    ribbon_serving: 'Abogados Litigantes de Lesiones Personales en Connecticut | Defensa Agresiva',
    ribbon_phone: '+1 203-572-6748',
    ribbon_bilingual: '100% Bilingües: Inglés y Español',
    ribbon_guarantee: 'Si No Ganamos, No Cobramos',
    nav_home: 'Inicio',
    nav_immigration: 'Defensa de Inmigración',
    nav_injury: 'Áreas de Práctica',
    nav_verdicts: 'Veredictos',
    nav_attorneys: 'Abogados',
    nav_services: 'Áreas de Práctica',
    nav_recognition: 'Reconocimiento',
    nav_stories: 'Casos Ganados',
    nav_contact: 'Contacto',
    btn_book_consultation: 'Evaluación Gratuita de Caso',
    btn_call_now: 'Llamar Ahora (24/7)',
    btn_submit: 'Solicitar Evaluación Gratis ($0 Costo)',

    // Hero Section
    hero_badge: 'Abogados Litigantes de Lesiones Personales en Connecticut',
    hero_badge_single: 'Abogados de Lesiones en Connecticut',
    hero_badge_no_win: 'Garantía: Si No Ganamos, No Pagas ($0 Costo Inicial)',
    hero_badge_status: 'Derecho a Indemnización Total sin Importar tu Estatus Migratorio',
    hero_title_clean_1: 'Defendiendo a los Lesionados.',
    hero_title_clean_2: 'Exigiendo la Máxima Compensación.',
    hero_title_1: 'Litigio Agresivo en Tribunales.',
    hero_title_2: 'Máxima Indemnización Económica para Víctimas de Accidentes.',
    hero_sub: 'Cuando un accidente grave cambia tu vida, Noyes & Associates enfrenta a las aseguradoras con litigio implacable. Dirigidos por el combativo litigante Juan Girón y la defensora comunitaria Shernette Noyes, exigimos la máxima compensación en Connecticut — con $0 costo de tu bolsillo y protección total sin importar tu estatus migratorio.',
    hero_trust_1: 'Sin Honorarios Si No Ganamos',
    hero_trust_2: 'Abogados 100% Bilingües',
    hero_trust_3: 'Estatus Protegido por Ley en CT',
    hero_guarantee_1: 'Si No Ganamos, No Pagas ($0 Inicial)',
    hero_guarantee_2: '100% Bilingües en Español e Inglés',
    hero_guarantee_3: 'Protección para Todas las Víctimas en CT',

    // Dual Litigator Hero Badges & Labels
    hero_lead_litigator: 'Juan Girón | Litigante Principal de Tribunales',
    hero_managing_partner: 'Shernette Noyes | Socia Administradora y Defensora Comunitaria',
    hero_badge_courtroom: 'Litigantes de Juicio con Experiencia en Tribunales de Connecticut',
    hero_giron_title: 'Abogado Litigante Principal de Juicios',
    hero_noyes_title: 'Socia Administradora y Defensora Comunitaria',
    hero_dual_names: 'Juan Girón y Shernette Noyes',
    hero_photo_subtitle: 'Litigantes Principales y Socios Administradores',
    hero_overlay_tag: '$0 Costo Inicial • Litigio por Contingencia',
    hero_badge_exp_title: '20+ Años',
    hero_badge_exp_desc: 'Maestría Legal Dedicada',
    hero_badge_rating_title: 'Calificación 4.9 ★',
    hero_badge_rating_desc: 'Más de 1,000 Casos Ganados',

    // Animated Key Stats
    stat_years: 'Años de Litigio y Maestría',
    stat_years_sub: 'Décadas de defensa contundente en los tribunales de Connecticut',
    stat_reviews: 'Reseñas en Google',
    stat_reviews_sub: 'Resultados reales y calificaciones excepcionales',
    stat_bilingual: 'Representación Bilingüe',
    stat_bilingual_sub: 'Asesoría clara y confidencial en español e inglés',
    stat_rank: 'Excelencia Legal',
    stat_rank_sub: 'Líderes comprometidos con la comunidad en Connecticut',
    stat_recovered: 'Millones Recuperados',
    stat_recovered_sub: 'Indemnizaciones máximas y acuerdos para víctimas de accidentes',

    // Multi-Million Dollar Verdicts & Settlements Showcase
    verdicts_tag: 'Resultados de Casos Multimillonarios',
    verdicts_title: 'Veredictos Comprobados y Acuerdos Millonarios',
    verdicts_sub: 'Recuperación financiera real obtenida mediante preparación de juicio implacable y defensa agresiva en los tribunales de Connecticut.',
    verdicts_badge: 'Resultados Comprobados en Tribunales',
    verdicts_disclaimer: 'Los resultados anteriores no garantizan resultados similares. Cada caso es único y se resuelve según sus hechos específicos y las leyes de Connecticut.',
    verdicts_cta: 'Solicita una Evaluación Gratuita para tu Reclamo',
    verdict_1_amt: '$3,850,000',
    verdict_1_type: 'Colisión en Autopista con Camión Comercial de Carga',
    verdict_1_loc: 'Tribunal Superior de Connecticut',
    verdict_1_desc: 'Colisión trasera catastrófica por camión de 18 ruedas con trauma espinal severo y cirugía de fusión vertebral.',
    verdict_2_amt: '$1,750,000',
    verdict_2_type: 'Colapso de Andamio y Caída en Obra de Construcción',
    verdict_2_loc: 'Hartford, CT',
    verdict_2_desc: 'Violaciones de seguridad OSHA que causaron el colapso del andamio, traumatismo craneoencefálico y fracturas múltiples.',
    verdict_3_amt: '$950,000',
    verdict_3_type: 'Choque Múltiple en Autopista con Lesión Espinal',
    verdict_3_loc: 'New Haven, CT',
    verdict_3_desc: 'Choque múltiple a alta velocidad que provocó compresión de nervios lumbares y discapacidad permanente parcial.',
    verdict_4_amt: '$720,000',
    verdict_4_type: 'Caída en Hielo por Responsabilidad de Predio Comercial',
    verdict_4_loc: 'Stamford, CT',
    verdict_4_desc: 'Hielo negro no tratado en estacionamiento comercial tras tormenta invernal, ocasionando fractura severa de cadera y cirugía.',
    verdict_5_amt: '$580,000',
    verdict_5_type: 'Lesiones Graves para Pasajero en Viaje Compartido',
    verdict_5_loc: 'Bridgeport, CT',
    verdict_5_desc: 'Falta de ceder el paso de conductor de app de transporte en intersección, obteniendo el pago máximo de la póliza para el pasajero herido.',

    // The Noyes Advantage: Insurance Comparison Matrix
    advantage_tag: 'La Ventaja Noyes en Juicios',
    advantage_title: 'Por Qué las Aseguradoras Temen a Nuestros Litigantes',
    advantage_sub: 'Las aseguradoras evalúan los reclamos según si tu abogado realmente irá a juicio o no. Así inclinamos la balanza a tu favor con litigio agresivo.',
    adv_alone_title: 'Enfrentar a la Aseguradora Solo',
    adv_alone_sub: 'Lo que los ajustadores aprovechan para reducir tu dinero',
    adv_noyes_title: 'Los Litigantes de Noyes & Associates',
    adv_noyes_sub: 'Apalancamiento de juicio implacable y máxima compensación',
    adv_factor_label: 'Factor Estratégico de Litigio',
    adv_row1_title: 'Litigio en Tribunales Listo para Juicio',
    adv_row1_alone: 'Aseguradoras ofrecen pagos mínimos sabiendo que la víctima no litiga en corte.',
    adv_row1_noyes: 'Preparamos cada caso para juicio, obligando a pagar la compensación máxima.',
    adv_row2_title: 'Acceso Directo con Tu Abogado Bilingüe',
    adv_row2_alone: 'Te transfieren a centros de llamadas y secretarias sin acceso a abogados.',
    adv_row2_noyes: 'Acceso directo y personal a los litigantes Juan Girón y Shernette Noyes.',
    adv_row3_title: 'Inmunidad y Protección Total de Estatus Migratorio',
    adv_row3_alone: 'Aseguradoras usan el miedo migratorio para intimidar y hacerte renunciar.',
    adv_row3_noyes: '100% protegido por ley en CT. Compensación completa garantizada sin importar estatus.',
    adv_row4_title: 'Preservación Rápida de Evidencia y Caja Negra',
    adv_row4_alone: 'Cámaras de seguridad y cajas negras de camiones se borran en días.',
    adv_row4_noyes: 'Cartas legales inmediatas de preservación y reconstrucción forense privada del choque.',
    adv_row5_title: 'Riesgo Financiero y Costos Iniciales',
    adv_row5_alone: 'Víctimas acumulan deudas médicas y presión financiera para aceptar cheques pequeños.',
    adv_row5_noyes: 'Garantía de Contingencia 100%. $0 inicial. No pagas nada si no ganamos.',

    // Real Client Stories (Testimonials)
    client_stories_badge: 'Historias Reales de Clientes',
    client_stories_title: 'Respaldados por Familias Lesionadas en Todo Connecticut',
    client_stories_sub: 'Descubre cómo nuestros abogados litigantes bilingües protegen los derechos, la salud y el futuro financiero de nuestros clientes cuando todo está en juego.',
    client_story_1_tag: 'Caída Laboral • Bridgeport, CT',
    client_story_1_quote: 'Después de caer en una construcción, mi jefe me dijo que no lo reportara por mi estatus migratorio. Tenía mucho miedo y un dolor insoportable. El abogado Juan Girón habló conmigo directamente en español, me explicó que la ley de Connecticut me protege y peleó hasta cubrir todas mis cirugías y salarios perdidos.',
    client_story_1_author: 'Carlos M. — Cliente de Accidente en Construcción',
    client_story_2_tag: 'Choque en la I-95 • New Haven, CT',
    client_story_2_quote: 'La aseguradora intentó presionarme para firmar un cheque rápido que apenas cubría mi primera visita a emergencias. Shernette Noyes y su equipo intervinieron de inmediato, se hicieron cargo de cada llamada y prepararon mi caso para ir a corte. Lograron una indemnización diez veces mayor a la primera oferta.',
    client_story_2_author: 'David R. — Cliente de Accidente en Autopista',
    client_story_3_tag: 'Colisión en Rideshare • Stamford, CT',
    client_story_3_quote: 'A diferencia de las firmas gigantes de televisión donde solo hablas con recepcionistas, en Noyes & Associates tuve acceso directo a mis abogados desde el primer día. No pagué ni un solo dólar de mi bolsillo, coordinaron a mis especialistas de terapia física y trataron a mi familia con verdadero respeto.',
    client_story_3_author: 'Elena V. — Cliente de Lesiones Personales',
    client_stories_disclaimer: '*Se utilizan iniciales para proteger la privacidad del cliente. Los resultados pasados no garantizan resultados similares bajo la ley de Connecticut.',

    // Founder Recognition
    award_tag: 'Reconocimiento a Nuestra Fundadora',
    award_title: 'Homenajeada en los 17th Annual Sweet Mother Awards 2026',
    award_quote: '"Honrando a las Mujeres que Marcan la Diferencia en sus Comunidades"',
    award_desc: 'La abogada Shernette Noyes de Girón, fundadora de Noyes & Associates, fue condecorada en los prestigiosos Sweet Mother Awards en Darien, Connecticut, celebrando su liderazgo incansable, vocación legal compasiva y dedicación a las víctimas de accidentes y familias inmigrantes.',

    // Attorneys Section
    attorneys_tag: 'Abogados Litigantes de Juicio',
    attorneys_title: 'Abogados Litigantes de Lesiones Personales en Connecticut',
    attorneys_sub: 'Dirigidos por los abogados Juan Girón y Shernette Noyes, nuestro equipo legal enfrenta con rigor a las aseguradoras para asegurar indemnizaciones millonarias por accidentes de tránsito y caídas graves.',

    // Juan Girón Bio
    attorney_giron_name: 'Juan Girón',
    attorney_giron_role: 'Socio Principal y Abogado Litigante Principal',
    attorney_giron_badge: 'Litigante Agresivo de Juicios',
    attorney_giron_bio: 'El abogado Juan Girón es un implacable litigante de juicios que no permite que las grandes compañías de seguros se aprovechen de las víctimas de accidentes. Reconocido por su meticulosa preparación para la corte, contrainterrogatorios y firmeza negociadora, Juan ha recuperado millones de dólares para personas que sufrieron choques automovilísticos severos, colisiones de camiones y accidentes laborales. Ofrece representación 100% bilingüe en español e inglés sin intermediarios.',

    // Shernette Noyes Bio
    attorney_noyes_name: 'Shernette Noyes de Girón',
    attorney_noyes_role: 'Fundadora y Socia Administradora',
    attorney_noyes_badge: 'Homenajeada Sweet Mother Award 2026',
    attorney_noyes_bio: 'Condecorada con el Sweet Mother Award 2026, la abogada Shernette Noyes cuenta con más de dos décadas de trayectoria jurídica compasiva y altamente estratégica. Defiende con pasión a familias vulnerables, víctimas de lesiones catastróficas y la comunidad hispana, garantizando protección digna y máxima restauración financiera.',

    // Practice Areas Filters
    services_tag: 'Áreas de Práctica Integrales',
    services_title: 'Lesiones Personales Especializadas y Servicios Legales',
    services_sub: 'Desde choques en autopistas y caídas laborales hasta defensa integral contra la deportación, bienes raíces y bancarrota.',
    filter_all: 'Todos los Servicios',
    filter_injury: 'Lesiones Personales (Principal)',
    filter_immigration: 'Leyes de Inmigración',
    filter_other: 'Bancarrota y Bienes Raíces',

    // Practice Area Cards
    service_car_title: 'Accidentes de Auto y Tránsito',
    service_car_desc: 'Litigio agresivo para víctimas de conductores ebrios, distraídos o con exceso de velocidad. Recuperamos fondos máximos para cirugías, hospitalización y salarios perdidos.',
    service_truck_title: 'Camiones Comerciales y Motocicletas',
    service_truck_desc: 'Colisiones catastróficas con vehículos de 18 ruedas, furgones de carga y motocicletas. Exigimos cuentas a las corporaciones de transporte comercial.',
    service_slip_title: 'Caídas y Responsabilidad de Predios',
    service_slip_desc: 'Responsabilizamos a supermercados, plazas comerciales y propietarios negligentes por hielo sin limpiar, pisos resbalosos y escaleras peligrosas.',
    service_work_title: 'Accidentes Laborales y Workers\' Comp',
    service_work_desc: 'Defensa de trabajadores lesionados en construcción, fábricas y almacenes. Aseguramos tratamiento médico integral y pagos semanales sin temor a represalias laborales.',
    service_immig_title: 'Inmigración y Defensa contra Deportación',
    service_immig_desc: 'Representación estratégica ante cortes de inmigración (EOIR), peticiones humanitarias VAWA, visas U para víctimas de delitos, asilo y residencia legal.',
    service_realestate_title: 'Bienes Raíces y Cierres Inmobiliarios',
    service_realestate_desc: 'Asesoría jurídica confiable en compra, venta y arrendamiento de inmuebles comerciales y residenciales en Connecticut, resguardando tu inversión patrimonial.',
    service_bankr_title: 'Bancarrota y Alivio Financiero',
    service_bankr_desc: 'Frena de inmediato los embargos de sueldo, ejecuciones hipotecarias y llamadas de cobradores. Reestructuración de deudas bajo Capítulo 7 y 13 para un nuevo comienzo.',

    // Client Stories & Testimonials
    stories_tag: 'Resultados Comprobados',
    stories_title: 'Historias que Inspiran: Victorias Reales para Familias Reales',
    stories_sub: 'Descubre cómo nuestros abogados litigantes consiguieron justicia y compensaciones millonarias para personas lesionadas en todo Connecticut.',
    story_1_badge: 'Colisión con Camión Comercial: Acuerdo de $850,000',
    story_1_quote: '"Tras un choque contra un camión comercial en la I-95, la aseguradora me ofreció una miseria. El abogado Juan Girón me brindó defensa directa y bilingüe de juicio, se preparó para la corte y los obligó a pagar $850,000. Noyes & Associates salvó el futuro de mi familia."',
    story_1_author: 'Mateo R.',
    story_1_case: 'Víctima de Choque con Camión (Bridgeport, CT)',
    story_2_badge: 'Caída en Construcción: Recuperación de $620,000',
    story_2_quote: '"Caí de un andamio inseguro en Stamford. Quisieron intimidarme por mi estatus migratorio, pero Noyes & Associates demostró que mis derechos están 100% protegidos bajo la ley de CT. Lograron $620,000 y total tranquilidad para mi recuperación médica."',
    story_2_author: 'David G.',
    story_2_case: 'Víctima de Caída en Obra (Stamford, CT)',
    story_3_badge: 'Accidente de Auto y Seguridad Familiar: $340,000',
    story_3_quote: '"Cuando un conductor imprudente nos chocó, estábamos abrumados por deudas médicas y angustia. La abogada Shernette Noyes nos brindó asesoría compasiva y firmeza legal, recuperando $340,000 que devolvieron total tranquilidad médica y financiera a mi familia."',
    story_3_author: 'Elena M. y Familia',
    story_3_case: 'Víctima de Accidente de Auto (Hartford, CT)',

    // Accident Guide Checklist
    checklist_tag: 'Guía Interactiva de Emergencia',
    checklist_title: 'Lista de Acción Inmediata: Qué Hacer Tras un Accidente en Connecticut',
    checklist_sub: 'Sigue estos 5 pasos indispensables para proteger tu salud física, asegurar evidencia clave y garantizar la máxima indemnización legal en Connecticut.',
    checklist_progress_label: 'Progreso del Protocolo de Accidente',
    checklist_mark_done: 'Marcar como Completado',
    checklist_completed: 'Completado',
    checklist_step: 'Paso',

    // Evaluador Rápido de Casos en 3 Pasos
    eval_lead_tag: 'Herramienta de Evaluación Gratuita',
    eval_lead_title: 'Evaluación Rápida de Casos en 3 Pasos',
    eval_lead_sub: 'Responde 2 preguntas rápidas para verificar de inmediato la viabilidad de tu caso y tus derechos legales en Connecticut.',
    eval_qualified_badge: 'Calificación de Caso de Alta Prioridad Verificada',
    eval_tab_1: '1. Categoría del Accidente',
    eval_tab_2: '2. Atención Médica',
    eval_tab_3: '3. Calificación',
    eval_step1_badge: 'Paso 1 de 3: Incidente',
    eval_step1_title: '¿Qué Tipo de Accidente o Lesión Ocurrió?',
    eval_step1_sub: 'Selecciona la categoría principal del incidente en Connecticut.',
    eval_opt_car_truck: 'Colisión de Auto o Camión Comercial',
    eval_opt_slip_construction: 'Caída o Accidente en Obra de Construcción',
    eval_opt_rideshare_other: 'Viaje Compartido (Uber/Lyft) u Otra Lesión',

    eval_step2_badge: 'Paso 2 de 3: Atención Médica',
    eval_step2_title: '¿Has Recibido Atención Médica?',
    eval_step2_sub: 'Los registros médicos son evidencia esencial frente a la aseguradora.',
    eval_opt_er_visit: 'Sala de Emergencias / Clínica de Urgencias',
    eval_opt_in_treatment: 'Actualmente en Tratamiento con Médico / Terapia Física',
    eval_opt_no_treatment: 'Aún No He Visto a un Médico',

    eval_step3_badge: 'Paso 3 de 3: Calificación',
    eval_step3_title: 'Resultado de Calificación de Alta Prioridad',
    eval_step3_sub: 'Protección legal inmediata y representación bajo la ley de Connecticut.',
    eval_result_qualified: 'Tu Caso Califica para Revisión Legal Gratuita Inmediata',
    eval_result_reassurance: 'Tu caso presenta fuertes méritos para una recuperación financiera máxima. Nuestros litigantes están listos para exigir la indemnización máxima en tu nombre.',
    eval_result_immigration: '100% Protegido por Ley en CT: Tu compensación financiera completa está estrictamente protegida sin importar tu estatus migratorio.',
    eval_result_contingency: '$0 Honorarios Iniciales — Garantía Si No Ganamos, No Pagas. Cubrimos todos los gastos legales.',
    eval_cta_claim: 'Reclamar Mi Consulta Gratuita Ahora ($0 Inicial)',
    eval_cta_call: 'Llamada Directa: (203) 572-6748',
    eval_btn_next: 'Siguiente Paso →',
    eval_btn_back: '← Volver',
    eval_btn_restart: 'Reiniciar Evaluación',

    // Claim Evaluator
    eval_tag: 'Evaluación Gratuita en 60 Segundos',
    eval_title: 'Calculadora Instantánea de Calificación de Reclamos en Connecticut',
    eval_sub: 'Calcula la viabilidad de tu caso según el plazo legal de 2 años en Connecticut (§ 52-584) y las leyes de negligencia comparativa modificada.',
    eval_date_label: 'Fecha del Accidente / Lesión',
    eval_type_label: 'Tipo de Accidente',
    eval_severity_label: 'Gravedad de las Lesiones',
    eval_fault_label: 'Evaluación de Culpa',
    eval_treatment_label: 'Atención Médica Recibida',
    eval_insurance_label: 'Seguro Involucrado',
    eval_btn: 'Calcular Calificación del Reclamo',
    eval_reset: 'Reiniciar Calculadora',

    // Form & Consultation Booking
    booking_tag: 'Evaluación Gratuita de Caso',
    booking_title: '¿Herido en Connecticut? Estamos Listos para Pelear por Ti.',
    booking_desc: 'Completa el formulario para una evaluación 100% confidencial. Trabajamos con garantía "Si No Ganamos, No Pagas" ($0 costo inicial). No pagas nada a menos que recuperemos compensación para ti.',
    modal_title: 'Solicitar Evaluación Gratuita de Caso',
    modal_desc: 'Analiza tu accidente directamente con los abogados litigantes Juan Girón y Shernette Noyes. 100% confidencial y sin costo inicial.',
    form_first_name: 'Nombre *',
    form_last_name: 'Apellido *',
    form_email: 'Correo Electrónico *',
    form_phone: 'Número de Teléfono (EE. UU.) *',
    form_case_type: 'Tipo de Caso / Área Legal *',
    form_incident_date: 'Fecha del Accidente (si aplica)',
    form_contact_time: 'Horario Preferido de Contacto',
    form_consult_pref: 'Modalidad de Consulta',
    form_consult_virtual: 'Consulta Virtual (Videollamada / Teléfono)',
    form_consult_inperson: 'Cita Presencial (Oficina en Stratford, CT)',
    form_message_label: 'Detalles del Caso o Preguntas',
    form_message_placeholder: 'Describe brevemente el choque, lesiones sufridas, fecha o preguntas legales...',
    form_disclaimer: 'El envío de este formulario no constituye relación abogado-cliente. Toda información es estrictamente confidencial. Garantía "Si No Ganamos, No Pagas" ($0 costo inicial).',
    form_success_msg: '¡Gracias! Hemos recibido tu información. El abogado Juan Girón o nuestro equipo legal bilingüe se comunicará contigo a la brevedad.',

    // Validations & Errors
    required_field: 'Este campo es obligatorio',
    valid_email: 'Por favor ingresa un correo electrónico válido (ej: nombre@ejemplo.com)',
    valid_phone: 'Ingresa un número telefónico válido de 10 dígitos de EE. UU. (ej: (203) 572-6748)',

    // Dropdown Select Options: Case Types
    opt_case_car_accident: 'Accidentes de Auto y Tránsito',
    opt_case_truck_motorcycle: 'Colisiones de Camión Comercial y Motocicleta',
    opt_case_slip_fall: 'Caídas y Responsabilidad de Predios',
    opt_case_workplace_injury: 'Lesiones Laborales / Workers\' Comp',
    opt_case_immigration: 'Inmigración y Defensa contra Deportación',
    opt_case_real_estate: 'Bienes Raíces y Cierres Inmobiliarios',
    opt_case_bankruptcy: 'Bancarrota y Alivio de Deudas',
    opt_case_other: 'Otras Consultas Jurídicas',

    // Dropdown Select Options: Injury Severity
    opt_sev_catastrophic: 'Catastrófica (Trauma Espinal, Daño Cerebral, Cirugía)',
    opt_sev_severe: 'Grave (Múltiples Fracturas, Hospitalización)',
    opt_sev_moderate: 'Moderada (Hernia Discal, Latigazo, Terapia Física)',
    opt_sev_minor: 'Leve (Esguinces, Contusiones Leves)',

    // Dropdown Select Options: Fault Assessment
    opt_fault_not_at_fault: 'Sin Culpa (El otro conductor es 100% responsable)',
    opt_fault_unsure: 'Incierto / Responsabilidad en Disputa',
    opt_fault_partially_at_fault: 'Parcialmente Culpable (Menos del 50% de culpa en CT)',
    opt_fault_at_fault: 'Culpa Principal (51% o más de culpa)',

    // Dropdown Select Options: Medical Treatment
    opt_treat_immediate_er: 'Sala de Emergencias (ER) el día del accidente',
    opt_treat_doctor_visit: 'Médico / Clínica dentro de 48 horas',
    opt_treat_delayed: 'Médico consultado después de varios días',
    opt_treat_none_yet: 'Aún no he visto a un médico',

    // Dropdown Select Options: Insurance Coverage
    opt_ins_yes_other_party: 'Conductor culpable tiene seguro activo',
    opt_ins_yes_own_policy: 'Póliza propia (Cobertura UM/UIM en CT)',
    opt_ins_hit_and_run: 'Choque y Fuga / Conductor huyó de la escena',
    opt_ins_uninsured: 'Conductor culpable no tiene seguro',

    // Legal Accreditations & Memberships Trust Bar
    trust_bar_label: 'EXCELENCIA RECONOCIDA EN TRIBUNALES Y AFILIACIONES PROFESIONALES',
    trust_bar_b1: 'Colegio de Abogados de Connecticut (CBA)',
    trust_bar_b2: 'Asociación de Abogados Litigantes de CT (CTLA)',
    trust_bar_b3: 'Asociación Americana para la Justicia (AAJ)',
    trust_bar_b4: 'Litigantes de Veredictos Millonarios',
    trust_bar_b5: 'Defensa Calificada 4.9★ por Clientes',

    // FAQ Section Header & CT Legal Urgency Banner
    faq_urgency_title: '⚠️ Existen Plazos Legales Estrictos en Connecticut (Conn. Gen. Stat. § 52-584)',
    faq_urgency_desc: 'En Connecticut, generalmente tienes solo 2 años desde la fecha del accidente para presentar una demanda por lesiones—y tan solo 90 días para notificar reclamos municipales o por defectos en la vía. No esperes a que desaparezca la evidencia.',
    faq_eyebrow: 'Respuestas Claras. Sin Rodeos Legales.',
    faq_title: 'Preguntas Frecuentes Tras un Accidente en Connecticut',
    faq_sub: 'Todo lo que necesitas saber para proteger tus derechos, tu atención médica y tu indemnización.',

    // FAQ Accordion Items (Q1 - Q5)
    faq_q1: '¿Puedo reclamar una indemnización en Connecticut si no tengo papeles o Seguro Social?',
    faq_a1: 'Sí, 100%. Bajo la ley de Connecticut, toda persona lesionada tiene el derecho legal de exigir una indemnización completa por facturas médicas, salarios perdidos y dolor y sufrimiento, sin importar su estatus migratorio. Las aseguradoras no pueden usar tu estatus para negar un reclamo válido, y todo lo que hables con nosotros es estrictamente confidencial.',
    faq_q2: '¿Cuánto cuesta contratar a Noyes & Associates? ¿Debo pagar algo por adelantado?',
    faq_a2: 'Pagas $0 de tu bolsillo y $0 por adelantado. Trabajamos estrictamente bajo honorarios de contingencia: nuestra firma adelanta todos los gastos de corte, peritos e investigación. Solo cobramos un porcentaje del acuerdo o veredicto final que ganemos para ti. Si no ganamos tu caso, no nos debes absolutamente nada.',
    faq_q3: '¿Cómo pago el hospital, cirugías o terapia física si no tengo seguro médico?',
    faq_a3: 'No pospongas tu atención médica por miedo a las facturas. Trabajamos con una red de médicos especialistas, cirujanos ortopédicos y clínicas de terapia física en todo Connecticut que atienden a nuestros clientes bajo una \'Carta de Protección\', esperando a cobrar directamente del acuerdo final de tu caso.',
    faq_q4: 'El seguro del otro conductor ya me ofreció un cheque rápido. ¿Debo aceptar o firmar?',
    faq_a4: 'Nunca firmes ningún documento, autorización médica ni aceptes un cheque rápido de una aseguradora sin hablar antes con un abogado litigante. Esas primeras ofertas son tácticas para cerrar tu caso por una fracción mínima antes de que conozcas el costo real a largo plazo de tus lesiones.',
    faq_q5: '¿Qué pasa si no puedo ir a la oficina por mis lesiones o mi horario de trabajo?',
    faq_a5: 'Nosotros vamos a ti o gestionamos todo desde tu celular. Ofrecemos consultas 24/7 por teléfono y WhatsApp, firma electrónica desde tu móvil y visitas al hospital o a domicilio en todo Connecticut en casos de lesiones graves.',

    // WhatsApp Prefill Message
    whatsapp_prefill_msg: 'Hola, deseo solicitar una consulta legal gratuita por un accidente en Connecticut.'
  }
};

/**
 * Translation retrieval helper
 */
function getTranslation(key, lang = currentLang) {
  if (translations[lang] && translations[lang][key] !== undefined) {
    return translations[lang][key];
  }
  if (translations.en && translations.en[key] !== undefined) {
    return translations.en[key];
  }
  return key;
}

/**
 * Helper to dynamically translate <option> elements inside <select> dropdowns
 * @param {HTMLSelectElement} [selectElement] - Target select element or null for all selects in document
 * @param {string} [lang=currentLang] - Target language code ('en' | 'es')
 */
function translateSelectOptions(selectElement, lang = currentLang) {
  if (typeof document === 'undefined') return;

  const selects = selectElement
    ? [selectElement]
    : Array.from(document.querySelectorAll('select'));

  const optionPrefixMap = {
    caseType: 'opt_case_',
    formCaseType: 'opt_case_',
    evalCaseType: 'opt_case_',
    evalSeverity: 'opt_sev_',
    evalFault: 'opt_fault_',
    evalTreatment: 'opt_treat_',
    evalInsurance: 'opt_ins_'
  };

  selects.forEach(select => {
    if (!select || !select.options) return;
    const selectIdentifier = select.id || select.getAttribute('name') || '';
    const prefix = optionPrefixMap[selectIdentifier] || '';

    Array.from(select.options).forEach(opt => {
      // 1. Explicit data-i18n attribute on option
      const explicitKey = opt.getAttribute('data-i18n');
      if (explicitKey && translations[lang] && translations[lang][explicitKey] !== undefined) {
        opt.textContent = translations[lang][explicitKey];
        return;
      }

      const val = opt.value;
      if (!val) return;

      // 2. Prefixed translation key based on select name/id
      if (prefix) {
        const candidateKey = prefix + val;
        if (translations[lang] && translations[lang][candidateKey] !== undefined) {
          opt.textContent = translations[lang][candidateKey];
          return;
        }
      }

      // 3. Fallback prefix attempts
      const fallbackPrefixes = ['opt_case_', 'opt_sev_', 'opt_fault_', 'opt_treat_', 'opt_ins_'];
      for (const p of fallbackPrefixes) {
        const testKey = p + val;
        if (translations[lang] && translations[lang][testKey] !== undefined) {
          opt.textContent = translations[lang][testKey];
          return;
        }
      }

      // 4. Fallback CASE_TYPES check
      if (CASE_TYPES[val]) {
        opt.textContent = lang === 'es' ? CASE_TYPES[val].labelEs : CASE_TYPES[val].labelEn;
        return;
      }

      // 5. Direct key in translations
      if (translations[lang] && translations[lang][val] !== undefined) {
        opt.textContent = translations[lang][val];
      }
    });
  });
}

/**
 * Update all DOM elements marked with bilingual data attributes
 */
function updatePageLanguage(lang) {
  currentLang = lang;

  // Persist language preference in localStorage
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem(STORAGE_KEYS.LANG, lang);
    } catch (e) {
      console.warn('Could not save language preference:', e);
    }
  }

  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('lang', lang);

    // Update text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key] !== undefined) {
        el.textContent = translations[lang][key];
      }
    });

    // Update HTML content where formatting tags are utilized
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (translations[lang] && translations[lang][key] !== undefined) {
        el.innerHTML = translations[lang][key];
      }
    });

    // Update input placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[lang] && translations[lang][key] !== undefined) {
        el.setAttribute('placeholder', translations[lang][key]);
      }
    });

    // Update title attributes
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (translations[lang] && translations[lang][key] !== undefined) {
        el.setAttribute('title', translations[lang][key]);
      }
    });

    // Update aria-label attributes
    document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria-label');
      if (translations[lang] && translations[lang][key] !== undefined) {
        el.setAttribute('aria-label', translations[lang][key]);
      }
    });

    // Translate all select dropdown options dynamically
    translateSelectOptions(null, lang);

    // Sync language switcher button active states
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });

    // Dynamic WhatsApp URL with localized pre-fill message
    const waLinks = document.querySelectorAll('.fab-whatsapp, a[href*="wa.me"]');
    if (translations[lang] && translations[lang].whatsapp_prefill_msg) {
      const msg = encodeURIComponent(translations[lang].whatsapp_prefill_msg);
      waLinks.forEach(waLink => {
        waLink.setAttribute('href', `https://wa.me/12035726748?text=${msg}`);
      });
    }
  }

  // Update window.NoyesApp currentLang state
  if (typeof window !== 'undefined' && window.NoyesApp) {
    window.NoyesApp.currentLang = lang;
  }

  // Notify any active frontend components
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('noyes:languageChanged', { detail: { lang } }));
  }
}

/* ==========================================================================
   SECTION 6: CONSULTATION FORM HANDLER & CONTROLLER
   ========================================================================== */

/**
 * Handle form submission with validation, persistence, and UI toast feedback
 */
function submitConsultationForm(form, options = {}) {
  if (!form) return Promise.reject(new Error('Form element not provided'));

  const firstNameInput = form.querySelector('[name="firstName"]');
  const lastNameInput = form.querySelector('[name="lastName"]');
  const emailInput = form.querySelector('[name="email"]');
  const phoneInput = form.querySelector('[name="phone"]');
  const caseTypeInput = form.querySelector('[name="caseType"]');
  const incidentDateInput = form.querySelector('[name="incidentDate"]') || form.querySelector('[name="dob"]');
  const contactTimeInput = form.querySelector('[name="contactTime"]');
  const messageInput = form.querySelector('[name="message"]');
  const consultRadio = form.querySelector('input[name="consultationType"]:checked') ||
                       form.querySelector('input[name="modalConsultType"]:checked') ||
                       form.querySelector('input[name="consultPreference"]:checked');

  const rawData = {
    firstName: firstNameInput ? firstNameInput.value : '',
    lastName: lastNameInput ? lastNameInput.value : '',
    email: emailInput ? emailInput.value : '',
    phone: phoneInput ? phoneInput.value : '',
    caseType: caseTypeInput ? caseTypeInput.value : (options.caseType || 'car_accident'),
    incidentDate: incidentDateInput ? incidentDateInput.value : '',
    contactTime: contactTimeInput ? contactTimeInput.value : '',
    consultationType: consultRadio ? consultRadio.value : 'virtual',
    message: messageInput ? messageInput.value : '',
    source: options.source || (form.closest('.modal-backdrop') ? 'modal_form' : 'web_form'),
    assessmentId: options.assessmentId || null
  };

  const validationResult = NoyesValidator.validateLead(rawData, currentLang);

  // Helper error renderer
  const setFieldError = (input, msg) => {
    if (!input) return;
    input.classList.add('error');
    let errorEl = input.parentNode.querySelector('.form-error-msg');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'form-error-msg';
      input.parentNode.appendChild(errorEl);
    }
    errorEl.textContent = msg;
    errorEl.classList.add('visible');
  };

  const clearFieldError = (input) => {
    if (!input) return;
    input.classList.remove('error');
    const errorEl = input.parentNode.querySelector('.form-error-msg');
    if (errorEl) errorEl.classList.remove('visible');
  };

  // Render errors or clear
  if (firstNameInput) {
    if (validationResult.errors.firstName) {
      setFieldError(firstNameInput, validationResult.errors.firstName[currentLang]);
    } else {
      clearFieldError(firstNameInput);
    }
  }

  if (lastNameInput) {
    if (validationResult.errors.lastName) {
      setFieldError(lastNameInput, validationResult.errors.lastName[currentLang]);
    } else {
      clearFieldError(lastNameInput);
    }
  }

  if (emailInput) {
    if (validationResult.errors.email) {
      setFieldError(emailInput, validationResult.errors.email[currentLang]);
    } else {
      clearFieldError(emailInput);
    }
  }

  if (phoneInput) {
    if (validationResult.errors.phone) {
      setFieldError(phoneInput, validationResult.errors.phone[currentLang]);
    } else {
      clearFieldError(phoneInput);
    }
  }

  if (caseTypeInput) {
    if (validationResult.errors.caseType) {
      setFieldError(caseTypeInput, validationResult.errors.caseType[currentLang]);
    } else {
      clearFieldError(caseTypeInput);
    }
  }

  if (incidentDateInput) {
    if (validationResult.errors.incidentDate) {
      setFieldError(incidentDateInput, validationResult.errors.incidentDate[currentLang]);
    } else {
      clearFieldError(incidentDateInput);
    }
  }

  if (!validationResult.isValid) {
    return Promise.resolve({
      success: false,
      errors: validationResult.errors,
      sanitizedData: validationResult.sanitizedData
    });
  }

  // Persist valid submission
  const saveResult = NoyesStorage.saveLead(validationResult.sanitizedData);

  // Dispatch global event for any listening subagents or analytics
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('noyes:leadSaved', {
      detail: { lead: saveResult.lead }
    }));
  }

  // Display success feedback
  showSuccessToast(getTranslation('form_success_msg'));

  // Reset form
  form.reset();

  // Reset custom radio cards if present
  const consultationCards = form.querySelectorAll('.consultation-radio-card');
  consultationCards.forEach((c, i) => {
    c.classList.toggle('selected', i === 0);
  });

  // Close modal with smooth delay if form resides in a modal
  const modal = form.closest('.modal-backdrop');
  if (modal) {
    setTimeout(() => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }, 1200);
  }

  return Promise.resolve({
    success: true,
    lead: saveResult.lead
  });
}

/**
 * Toast notification for user confirmation
 */
function showSuccessToast(message) {
  let toast = document.querySelector('.toast-success');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-success';
    toast.innerHTML = `
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span class="toast-msg"></span>
    `;
    document.body.appendChild(toast);
  }

  const msgSpan = toast.querySelector('.toast-msg');
  if (msgSpan) msgSpan.textContent = message;
  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
  }, 4500);
}

/* ==========================================================================
   SECTION 7: EXPOSE PUBLIC FRONTEND CONTRACT (window.NoyesApp)
   ========================================================================== */

if (typeof window !== 'undefined') {
  window.NoyesApp = {
    version: '2.1.0',
    currentLang,
    caseTypes: CASE_TYPES,
    lawConstants: CT_LAW_CONSTANTS,
    verdicts: VERDICTS_SHOWCASE,
    advantageMatrix: ADVANTAGE_MATRIX,
    translations,
    storage: NoyesStorage,
    validator: NoyesValidator,
    accidentGuide: NoyesAccidentGuide,
    claimEvaluator: NoyesClaimEvaluator,
    caseEvaluator: NoyesCaseEvaluator,
    submitConsultationForm,
    getTranslation,
    translateSelectOptions,
    updatePageLanguage,
    initFaqAccordion,
    setLanguage: (lang) => {
      if (translations[lang]) {
        updatePageLanguage(lang);
      }
    }
  };
  window.NoyesCaseEvaluator = NoyesCaseEvaluator;
}

/* ==========================================================================
   SECTION 8: UI INITIALIZERS & EVENT LISTENERS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Check localStorage for saved language preference (defaulting to 'en')
  let initialLang = 'en';
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = window.localStorage.getItem(STORAGE_KEYS.LANG);
      if (stored && translations[stored]) {
        initialLang = stored;
      }
    }
  } catch (e) {
    initialLang = 'en';
  }

  // Apply saved language across DOM and state
  updatePageLanguage(initialLang);

  initScrollProgress();
  initStickyHeader();
  initMobileMenu();
  initScrollAnimations();
  initCounterAnimations();
  initPracticeFilter();
  initFormValidation();
  initModals();
  initLanguageSwitcher();
  initParallaxEffects();
  initCaseEvaluatorUI();
  initFaqAccordion();
});

/* 1. SCROLL PROGRESS BAR */
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const progress = (window.pageYOffset / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

/* 2. STICKY HEADER & NAV ACTIVE STATES */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId.startsWith('#')) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        const navMenu = document.querySelector('.nav-menu');
        const mobileToggle = document.querySelector('.mobile-toggle');
        if (navMenu && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
}

/* 3. MOBILE NAVIGATION DRAWER */
function initMobileMenu() {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (!mobileToggle || !navMenu) return;

  mobileToggle.addEventListener('click', () => {
    const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* 4. SCROLL REVEAL (INTERSECTION OBSERVER) */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('active'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  });

  revealElements.forEach(el => observer.observe(el));
}

/* 5. ANIMATED STAT COUNTERS */
function initCounterAnimations() {
  const counterElements = document.querySelectorAll('.stat-number');
  if (!counterElements.length) return;

  // Static Fallback: If IntersectionObserver is not supported, leave static fallback numbers untouched
  if (!('IntersectionObserver' in window)) return;

  const section = document.querySelector('.stats-section') || counterElements[0].closest('section');
  if (!section) return;

  let hasAnimated = false;

  const animate = () => {
    if (hasAnimated) return;
    hasAnimated = true;

    counterElements.forEach(counter => {
      const targetAttr = counter.getAttribute('data-target');
      const rawTarget = targetAttr !== null ? targetAttr : counter.textContent.trim().replace(/[^0-9.]/g, '');
      const target = parseFloat(rawTarget);
      if (isNaN(target)) return;

      const isFloat = counter.getAttribute('data-float') === 'true' || rawTarget.includes('.');
      const duration = 2000;

      // Reset text to 0 ONLY upon first IntersectionObserver trigger
      counter.textContent = isFloat ? '0.0' : '0';
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4); // EaseOutQuart

        const currentVal = target * ease;
        if (isFloat) {
          counter.textContent = currentVal.toFixed(1);
        } else {
          counter.textContent = Math.floor(currentVal).toLocaleString();
        }

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = isFloat ? target.toFixed(1) : target.toLocaleString();
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate();
        obs.unobserve(entry.target);
        obs.disconnect();
      }
    });
  }, { threshold: 0.25 });

  observer.observe(section);
}

/* 6. PRACTICE AREAS FILTER TABS */
function initPracticeFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  if (!filterBtns.length || !serviceCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (
          filter === 'all' ||
          category === filter ||
          (filter === 'other' && (category === 'estate' || category === 'elder' || category === 'bankruptcy' || category === 'real_estate'))
        ) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* 7. CONSULTATION FORMS & LIVE VALIDATION */
function initFormValidation() {
  const forms = document.querySelectorAll('.consultation-form');

  forms.forEach(form => {
    const phoneInput = form.querySelector('input[type="tel"]');
    const consultationCards = form.querySelectorAll('.consultation-radio-card');

    // Radio card visual toggle
    consultationCards.forEach(card => {
      const radio = card.querySelector('input[type="radio"]');
      card.addEventListener('click', () => {
        consultationCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        if (radio) radio.checked = true;
      });
    });

    // Clear field errors on live user input or change
    const formFields = form.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
      const clearError = () => {
        field.classList.remove('error');
        const errorEl = field.parentNode ? field.parentNode.querySelector('.form-error-msg') : null;
        if (errorEl) errorEl.classList.remove('visible');
      };
      field.addEventListener('input', clearError);
      field.addEventListener('change', clearError);
    });

    // US Phone Auto-Formatting
    if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.startsWith('1') && value.length > 10) {
          value = value.substring(1);
        }
        if (value.length > 10) {
          value = value.substring(0, 10);
        }

        let formatted = '';
        if (value.length > 0) {
          formatted = '(' + value.substring(0, 3);
        }
        if (value.length >= 4) {
          formatted += ') ' + value.substring(3, 6);
        }
        if (value.length >= 7) {
          formatted += '-' + value.substring(6, 10);
        }

        e.target.value = formatted || value;
      });
    }

    // Connect to submitConsultationForm engine
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      submitConsultationForm(form);
    });
  });
}

/* 8. MODALS (BOOK CONSULTATION / DETAILS) */
function initModals() {
  const modalTriggers = document.querySelectorAll('[data-open-modal]');
  const modalCloseBtns = document.querySelectorAll('.modal-close, [data-close-modal]');
  const modals = document.querySelectorAll('.modal-backdrop');

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-open-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = (modal) => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-backdrop');
      if (modal) closeModal(modal);
    });
  });

  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        if (modal.classList.contains('active')) closeModal(modal);
      });
    }
  });
}

/* 9. PARALLAX & AMBIENT MOTION */
function initParallaxEffects() {
  const floatingCards = document.querySelectorAll('.floating-badge');
  if (!floatingCards.length || (typeof window !== 'undefined' && window.innerWidth < 1024)) return;

  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 15;
    const y = (e.clientY / window.innerHeight - 0.5) * 15;

    floatingCards.forEach((badge, index) => {
      const factor = (index + 1) * 0.8;
      badge.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  }, { passive: true });
}

/* 10. BILINGUAL CONTENT SWITCHER */
function initLanguageSwitcher() {
  const langBtns = document.querySelectorAll('.lang-btn');
  if (!langBtns.length) return;

  // Initialize active button state from currentLang
  langBtns.forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-lang') === currentLang);
  });

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.getAttribute('data-lang');
      if (selectedLang === currentLang) return;

      updatePageLanguage(selectedLang);
    });
  });
}

/* 11. INTERACTIVE 3-STEP QUICK CASE EVALUATOR UI */
function initCaseEvaluatorUI() {
  const evaluatorContainer = document.querySelector('.case-evaluator-widget, #case-evaluator, #evaluator, [data-evaluator-container]');
  if (!evaluatorContainer) return;

  const stepCards = evaluatorContainer.querySelectorAll('[data-eval-step-card]');
  const typeButtons = evaluatorContainer.querySelectorAll('[data-accident-type]');
  const treatmentButtons = evaluatorContainer.querySelectorAll('[data-treatment]');
  const restartButtons = evaluatorContainer.querySelectorAll('[data-eval-restart]');
  const prefillButtons = evaluatorContainer.querySelectorAll('[data-eval-prefill], [data-eval-action="prefill"]');

  const syncUI = () => {
    if (typeof NoyesCaseEvaluator === 'undefined') return;
    const state = NoyesCaseEvaluator.getState();
    const lang = (window.NoyesApp && window.NoyesApp.currentLang) || 'en';

    // Step cards visibility / active class
    stepCards.forEach(card => {
      const stepNum = parseInt(card.getAttribute('data-eval-step-card'), 10);
      card.classList.toggle('active', stepNum === state.currentStep);
    });

    // Option selections active state
    typeButtons.forEach(btn => {
      btn.classList.toggle('selected', btn.getAttribute('data-accident-type') === state.selectedAccidentType);
    });

    treatmentButtons.forEach(btn => {
      btn.classList.toggle('selected', btn.getAttribute('data-treatment') === state.selectedTreatment);
    });

    // Step 3 Qualification result text population
    if (state.currentStep === 3) {
      const result = NoyesCaseEvaluator.getQualificationResult(lang);
      const headlineEl = evaluatorContainer.querySelector('[data-eval-result="headline"]');
      if (headlineEl) headlineEl.textContent = result.title;

      const reassuranceEl = evaluatorContainer.querySelector('[data-eval-result="reassurance"]');
      if (reassuranceEl) reassuranceEl.textContent = result.reassurance;

      const immNoticeEl = evaluatorContainer.querySelector('[data-eval-result="immigration"]');
      if (immNoticeEl) immNoticeEl.textContent = result.immigrationProtection;

      const contNoticeEl = evaluatorContainer.querySelector('[data-eval-result="contingency"]');
      if (contNoticeEl) contNoticeEl.textContent = result.contingencyGuarantee;
    }
  };

  typeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const type = btn.getAttribute('data-accident-type');
      NoyesCaseEvaluator.selectAccidentType(type);
      syncUI();
    });
  });

  treatmentButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const status = btn.getAttribute('data-treatment');
      NoyesCaseEvaluator.selectTreatment(status);
      syncUI();
    });
  });

  restartButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      NoyesCaseEvaluator.reset();
      syncUI();
    });
  });

  prefillButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      NoyesCaseEvaluator.prefillConsultation();
    });
  });

  window.addEventListener('noyes:languageChanged', syncUI);
  window.addEventListener('noyes:caseEvaluatorUpdated', syncUI);
  syncUI();
}

/* 12. INTERACTIVE FAQ ACCORDION CONTROLLER */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  // Ensure the first item defaults to open if none is active
  const hasActive = Array.from(faqItems).some(item => item.classList.contains('active'));
  if (!hasActive && faqItems.length > 0) {
    const firstItem = faqItems[0];
    firstItem.classList.add('active');
    const firstTrigger = firstItem.querySelector('.faq-trigger, [data-faq-toggle]');
    if (firstTrigger) {
      firstTrigger.setAttribute('aria-expanded', 'true');
    }
  }

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger, [data-faq-toggle]');
    if (!trigger) return;

    // Synchronize initial aria-expanded state with active class
    const isInitiallyActive = item.classList.contains('active');
    trigger.setAttribute('aria-expanded', isInitiallyActive ? 'true' : 'false');

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const isCurrentlyActive = item.classList.contains('active');

      // Closes sibling accordion items smoothly so only one remains expanded at a time
      faqItems.forEach(sibling => {
        if (sibling !== item) {
          sibling.classList.remove('active');
          const siblingTrigger = sibling.querySelector('.faq-trigger, [data-faq-toggle]');
          if (siblingTrigger) {
            siblingTrigger.setAttribute('aria-expanded', 'false');
          }
        }
      });

      // Toggle current item
      if (isCurrentlyActive) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

