import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'fr' | 'es' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.accounting': 'Accounting',
    'nav.invoices': 'Invoices',
    'nav.budgets': 'Budgets',
    'nav.reports': 'Reports',
    'nav.settings': 'Settings',
    'nav.logout': 'Log Out',
    'nav.lightMode': 'Light Mode',
    'nav.darkMode': 'Dark Mode',
    
    // Dashboard
    'dashboard.title': 'Financial Dashboard',
    'dashboard.subtitle': 'Real-time overview of your financial health',
    'dashboard.totalRevenue': 'Total Revenue',
    'dashboard.totalExpenses': 'Total Expenses',
    'dashboard.netProfit': 'Net Profit',
    'dashboard.cashBalance': 'Cash Balance',
    'dashboard.cashFlow': 'Cash Flow',
    'dashboard.monthlyTrend': 'Monthly trend',
    'dashboard.expensesByCategory': 'Expenses by Category',
    'dashboard.revenueDistribution': 'Revenue Distribution',
    'dashboard.recentTransactions': 'Recent Transactions',
    'dashboard.viewAll': 'View All',
    
    // Accounting
    'accounting.title': 'Accounting',
    'accounting.subtitle': 'Manage your accounting entries',
    'accounting.search': 'Search entries...',
    'accounting.addEntry': 'Add Entry',
    'accounting.date': 'Date',
    'accounting.description': 'Description',
    'accounting.category': 'Category',
    'accounting.amount': 'Amount',
    'accounting.status': 'Status',
    'accounting.actions': 'Actions',
    
    // Invoices
    'invoices.title': 'Invoices & Payments',
    'invoices.subtitle': 'Track client invoices and payment history',
    'invoices.createInvoice': 'Create Invoice',
    'invoices.client': 'Client',
    'invoices.paymentTimeline': 'Payment Timeline',
    
    // Budgets
    'budgets.title': 'Budget Management',
    'budgets.subtitle': 'Plan and track your departmental budgets',
    'budgets.createBudget': 'Create Budget',
    'budgets.vsActual': 'Budget vs Actual',
    
    // Reports
    'reports.title': 'Reports & Analytics',
    'reports.subtitle': 'Generate insights and export data',
    'reports.exportPDF': 'Export PDF',
    'reports.exportExcel': 'Export Excel',
    'reports.dateRange': 'Date Range',
    
    // Settings
    'settings.title': 'Settings',
    'settings.subtitle': 'Customize your preferences',
    'settings.profile': 'Profile',
    'settings.security': 'Security',
    'settings.appearance': 'Appearance',
    'settings.language': 'Language',
    
    // Auth
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.fullName': 'Full Name',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.noAccount': "Don't have an account?",
    'auth.hasAccount': 'Already have an account?',
    'auth.welcomeBack': 'Welcome Back',
    'auth.createAccount': 'Create Account',
    'auth.loginSubtitle': 'Sign in to access your financial dashboard',
    'auth.signupSubtitle': 'Start managing your finances today',
    'auth.orContinueWith': 'Or continue with',
    'auth.continueWithGoogle': 'Continue with Google',
    'auth.rememberMe': 'Remember me',
    'auth.passwordStrength': 'Password Strength',
    'auth.minChars': 'Min 6 characters',
    'auth.hasUppercase': 'Uppercase letter',
    'auth.hasNumber': 'Number',
    'auth.hasSpecial': 'Special character',
    'auth.weak': 'Weak',
    'auth.fair': 'Fair',
    'auth.good': 'Good',
    'auth.strong': 'Strong',
    'auth.secureLogin': 'Secure Login',
    'auth.trustedBy': 'Trusted by 10,000+ businesses',
    'auth.feature1': 'Bank-Grade Security',
    'auth.feature2': 'Real-time Analytics',
    'auth.feature3': 'Smart Predictions',
    'auth.feature4': 'Multi-Currency Support',
    'auth.continueWithApple': 'Continue with Apple',
    'auth.stats.users': 'Active Users',
    'auth.stats.uptime': 'Uptime',
    'auth.stats.processed': 'Processed',
    
    // AI Assistant
    'ai.title': 'AI Financial Assistant',
    'ai.placeholder': 'Ask about your finances...',
    'ai.send': 'Send',
    'ai.thinking': 'Thinking...',
    'ai.clearChat': 'Clear Chat',
    
    // Voice Commands
    'voice.listening': 'Listening...',
    'voice.clickToSpeak': 'Click to speak',
    'voice.commandRecognized': 'Command recognized',
    
    // Collaboration
    'collab.online': 'Online Now',
    'collab.viewing': 'Viewing',
    
    // Predictions
    'predictions.title': 'AI Predictions',
    'predictions.revenue': 'Revenue Forecast',
    'predictions.expenses': 'Expense Forecast',
    'predictions.trend': 'Trend Analysis',
    
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.loading': 'Loading...',
    'common.search': 'Search...',
    'common.noData': 'No data available',
    'common.success': 'Success',
    'common.error': 'Error',
  },
  fr: {
    // Navigation
    'nav.dashboard': 'Tableau de Bord',
    'nav.accounting': 'Comptabilité',
    'nav.invoices': 'Factures',
    'nav.budgets': 'Budgets',
    'nav.reports': 'Rapports',
    'nav.settings': 'Paramètres',
    'nav.logout': 'Déconnexion',
    'nav.lightMode': 'Mode Clair',
    'nav.darkMode': 'Mode Sombre',
    
    // Dashboard
    'dashboard.title': 'Tableau de Bord Financier',
    'dashboard.subtitle': 'Vue d\'ensemble en temps réel de votre santé financière',
    'dashboard.totalRevenue': 'Revenu Total',
    'dashboard.totalExpenses': 'Dépenses Totales',
    'dashboard.netProfit': 'Bénéfice Net',
    'dashboard.cashBalance': 'Solde de Trésorerie',
    'dashboard.cashFlow': 'Flux de Trésorerie',
    'dashboard.monthlyTrend': 'Tendance mensuelle',
    'dashboard.expensesByCategory': 'Dépenses par Catégorie',
    'dashboard.revenueDistribution': 'Distribution des Revenus',
    'dashboard.recentTransactions': 'Transactions Récentes',
    'dashboard.viewAll': 'Voir Tout',
    
    // Accounting
    'accounting.title': 'Comptabilité',
    'accounting.subtitle': 'Gérez vos écritures comptables',
    'accounting.search': 'Rechercher des écritures...',
    'accounting.addEntry': 'Ajouter une Écriture',
    'accounting.date': 'Date',
    'accounting.description': 'Description',
    'accounting.category': 'Catégorie',
    'accounting.amount': 'Montant',
    'accounting.status': 'Statut',
    'accounting.actions': 'Actions',
    
    // Invoices
    'invoices.title': 'Factures & Paiements',
    'invoices.subtitle': 'Suivez les factures clients et l\'historique des paiements',
    'invoices.createInvoice': 'Créer une Facture',
    'invoices.client': 'Client',
    'invoices.paymentTimeline': 'Chronologie des Paiements',
    
    // Budgets
    'budgets.title': 'Gestion des Budgets',
    'budgets.subtitle': 'Planifiez et suivez vos budgets par département',
    'budgets.createBudget': 'Créer un Budget',
    'budgets.vsActual': 'Budget vs Réel',
    
    // Reports
    'reports.title': 'Rapports & Analyses',
    'reports.subtitle': 'Générez des insights et exportez vos données',
    'reports.exportPDF': 'Exporter PDF',
    'reports.exportExcel': 'Exporter Excel',
    'reports.dateRange': 'Période',
    
    // Settings
    'settings.title': 'Paramètres',
    'settings.subtitle': 'Personnalisez vos préférences',
    'settings.profile': 'Profil',
    'settings.security': 'Sécurité',
    'settings.appearance': 'Apparence',
    'settings.language': 'Langue',
    
    // Auth
    'auth.login': 'Connexion',
    'auth.signup': 'Inscription',
    'auth.email': 'Email',
    'auth.password': 'Mot de passe',
    'auth.confirmPassword': 'Confirmer le mot de passe',
    'auth.fullName': 'Nom complet',
    'auth.forgotPassword': 'Mot de passe oublié?',
    'auth.noAccount': 'Pas encore de compte?',
    'auth.hasAccount': 'Déjà un compte?',
    'auth.welcomeBack': 'Bon Retour',
    'auth.createAccount': 'Créer un Compte',
    'auth.loginSubtitle': 'Connectez-vous pour accéder à votre tableau de bord',
    'auth.signupSubtitle': 'Commencez à gérer vos finances aujourd\'hui',
    'auth.orContinueWith': 'Ou continuer avec',
    'auth.continueWithGoogle': 'Continuer avec Google',
    'auth.rememberMe': 'Se souvenir de moi',
    'auth.passwordStrength': 'Force du mot de passe',
    'auth.minChars': 'Min 6 caractères',
    'auth.hasUppercase': 'Lettre majuscule',
    'auth.hasNumber': 'Chiffre',
    'auth.hasSpecial': 'Caractère spécial',
    'auth.weak': 'Faible',
    'auth.fair': 'Moyen',
    'auth.good': 'Bon',
    'auth.strong': 'Fort',
    'auth.secureLogin': 'Connexion Sécurisée',
    'auth.trustedBy': 'Utilisé par plus de 10 000 entreprises',
    'auth.feature1': 'Sécurité Bancaire',
    'auth.feature2': 'Analyses en Temps Réel',
    'auth.feature3': 'Prédictions Intelligentes',
    'auth.feature4': 'Support Multi-Devises',
    'auth.continueWithApple': 'Continuer avec Apple',
    'auth.stats.users': 'Utilisateurs Actifs',
    'auth.stats.uptime': 'Disponibilité',
    'auth.stats.processed': 'Traités',
    
    // AI Assistant
    'ai.title': 'Assistant IA Financier',
    'ai.placeholder': 'Posez une question sur vos finances...',
    'ai.send': 'Envoyer',
    'ai.thinking': 'Réflexion...',
    'ai.clearChat': 'Effacer le Chat',
    
    // Voice Commands
    'voice.listening': 'Écoute en cours...',
    'voice.clickToSpeak': 'Cliquez pour parler',
    'voice.commandRecognized': 'Commande reconnue',
    
    // Collaboration
    'collab.online': 'En Ligne',
    'collab.viewing': 'Consulte',
    
    // Predictions
    'predictions.title': 'Prédictions IA',
    'predictions.revenue': 'Prévision des Revenus',
    'predictions.expenses': 'Prévision des Dépenses',
    'predictions.trend': 'Analyse des Tendances',
    
    // Common
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.delete': 'Supprimer',
    'common.edit': 'Modifier',
    'common.loading': 'Chargement...',
    'common.search': 'Rechercher...',
    'common.noData': 'Aucune donnée disponible',
    'common.success': 'Succès',
    'common.error': 'Erreur',
  },
  es: {
    // Navigation
    'nav.dashboard': 'Panel de Control',
    'nav.accounting': 'Contabilidad',
    'nav.invoices': 'Facturas',
    'nav.budgets': 'Presupuestos',
    'nav.reports': 'Informes',
    'nav.settings': 'Configuración',
    'nav.logout': 'Cerrar Sesión',
    'nav.lightMode': 'Modo Claro',
    'nav.darkMode': 'Modo Oscuro',
    
    // Dashboard
    'dashboard.title': 'Panel Financiero',
    'dashboard.subtitle': 'Vista general en tiempo real de tu salud financiera',
    'dashboard.totalRevenue': 'Ingresos Totales',
    'dashboard.totalExpenses': 'Gastos Totales',
    'dashboard.netProfit': 'Beneficio Neto',
    'dashboard.cashBalance': 'Saldo de Caja',
    'dashboard.cashFlow': 'Flujo de Caja',
    'dashboard.monthlyTrend': 'Tendencia mensual',
    'dashboard.expensesByCategory': 'Gastos por Categoría',
    'dashboard.revenueDistribution': 'Distribución de Ingresos',
    'dashboard.recentTransactions': 'Transacciones Recientes',
    'dashboard.viewAll': 'Ver Todo',
    
    // Accounting
    'accounting.title': 'Contabilidad',
    'accounting.subtitle': 'Gestiona tus asientos contables',
    'accounting.search': 'Buscar asientos...',
    'accounting.addEntry': 'Añadir Asiento',
    'accounting.date': 'Fecha',
    'accounting.description': 'Descripción',
    'accounting.category': 'Categoría',
    'accounting.amount': 'Importe',
    'accounting.status': 'Estado',
    'accounting.actions': 'Acciones',
    
    // Invoices
    'invoices.title': 'Facturas y Pagos',
    'invoices.subtitle': 'Seguimiento de facturas y historial de pagos',
    'invoices.createInvoice': 'Crear Factura',
    'invoices.client': 'Cliente',
    'invoices.paymentTimeline': 'Cronología de Pagos',
    
    // Budgets
    'budgets.title': 'Gestión de Presupuestos',
    'budgets.subtitle': 'Planifica y controla tus presupuestos departamentales',
    'budgets.createBudget': 'Crear Presupuesto',
    'budgets.vsActual': 'Presupuesto vs Real',
    
    // Reports
    'reports.title': 'Informes y Análisis',
    'reports.subtitle': 'Genera insights y exporta datos',
    'reports.exportPDF': 'Exportar PDF',
    'reports.exportExcel': 'Exportar Excel',
    'reports.dateRange': 'Rango de Fechas',
    
    // Settings
    'settings.title': 'Configuración',
    'settings.subtitle': 'Personaliza tus preferencias',
    'settings.profile': 'Perfil',
    'settings.security': 'Seguridad',
    'settings.appearance': 'Apariencia',
    'settings.language': 'Idioma',
    
    // Auth
    'auth.login': 'Iniciar Sesión',
    'auth.signup': 'Registrarse',
    'auth.email': 'Correo Electrónico',
    'auth.password': 'Contraseña',
    'auth.confirmPassword': 'Confirmar Contraseña',
    'auth.fullName': 'Nombre Completo',
    'auth.forgotPassword': '¿Olvidaste tu contraseña?',
    'auth.noAccount': '¿No tienes cuenta?',
    'auth.hasAccount': '¿Ya tienes cuenta?',
    'auth.welcomeBack': 'Bienvenido de Nuevo',
    'auth.createAccount': 'Crear Cuenta',
    'auth.loginSubtitle': 'Inicia sesión para acceder a tu panel financiero',
    'auth.signupSubtitle': 'Comienza a gestionar tus finanzas hoy',
    'auth.orContinueWith': 'O continuar con',
    'auth.continueWithGoogle': 'Continuar con Google',
    'auth.rememberMe': 'Recordarme',
    'auth.passwordStrength': 'Fortaleza de la Contraseña',
    'auth.minChars': 'Mín 6 caracteres',
    'auth.hasUppercase': 'Letra mayúscula',
    'auth.hasNumber': 'Número',
    'auth.hasSpecial': 'Carácter especial',
    'auth.weak': 'Débil',
    'auth.fair': 'Regular',
    'auth.good': 'Buena',
    'auth.strong': 'Fuerte',
    'auth.secureLogin': 'Acceso Seguro',
    'auth.trustedBy': 'Más de 10,000 empresas confían en nosotros',
    'auth.feature1': 'Seguridad Bancaria',
    'auth.feature2': 'Análisis en Tiempo Real',
    'auth.feature3': 'Predicciones Inteligentes',
    'auth.feature4': 'Soporte Multi-Moneda',
    'auth.continueWithApple': 'Continuar con Apple',
    'auth.stats.users': 'Usuarios Activos',
    'auth.stats.uptime': 'Tiempo Activo',
    'auth.stats.processed': 'Procesado',
    
    // AI Assistant
    'ai.title': 'Asistente IA Financiero',
    'ai.placeholder': 'Pregunta sobre tus finanzas...',
    'ai.send': 'Enviar',
    'ai.thinking': 'Pensando...',
    'ai.clearChat': 'Limpiar Chat',
    
    // Voice Commands
    'voice.listening': 'Escuchando...',
    'voice.clickToSpeak': 'Haz clic para hablar',
    'voice.commandRecognized': 'Comando reconocido',
    
    // Collaboration
    'collab.online': 'En Línea',
    'collab.viewing': 'Viendo',
    
    // Predictions
    'predictions.title': 'Predicciones IA',
    'predictions.revenue': 'Pronóstico de Ingresos',
    'predictions.expenses': 'Pronóstico de Gastos',
    'predictions.trend': 'Análisis de Tendencias',
    
    // Common
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.delete': 'Eliminar',
    'common.edit': 'Editar',
    'common.loading': 'Cargando...',
    'common.search': 'Buscar...',
    'common.noData': 'Sin datos disponibles',
    'common.success': 'Éxito',
    'common.error': 'Error',
  },
  ar: {
    // Navigation
    'nav.dashboard': 'لوحة التحكم',
    'nav.accounting': 'المحاسبة',
    'nav.invoices': 'الفواتير',
    'nav.budgets': 'الميزانيات',
    'nav.reports': 'التقارير',
    'nav.settings': 'الإعدادات',
    'nav.logout': 'تسجيل الخروج',
    'nav.lightMode': 'الوضع الفاتح',
    'nav.darkMode': 'الوضع الداكن',
    
    // Dashboard
    'dashboard.title': 'لوحة التحكم المالية',
    'dashboard.subtitle': 'نظرة عامة في الوقت الفعلي على صحتك المالية',
    'dashboard.totalRevenue': 'إجمالي الإيرادات',
    'dashboard.totalExpenses': 'إجمالي المصروفات',
    'dashboard.netProfit': 'صافي الربح',
    'dashboard.cashBalance': 'رصيد النقد',
    'dashboard.cashFlow': 'التدفق النقدي',
    'dashboard.monthlyTrend': 'الاتجاه الشهري',
    'dashboard.expensesByCategory': 'المصروفات حسب الفئة',
    'dashboard.revenueDistribution': 'توزيع الإيرادات',
    'dashboard.recentTransactions': 'المعاملات الأخيرة',
    'dashboard.viewAll': 'عرض الكل',
    
    // Accounting
    'accounting.title': 'المحاسبة',
    'accounting.subtitle': 'إدارة القيود المحاسبية',
    'accounting.search': 'البحث في القيود...',
    'accounting.addEntry': 'إضافة قيد',
    'accounting.date': 'التاريخ',
    'accounting.description': 'الوصف',
    'accounting.category': 'الفئة',
    'accounting.amount': 'المبلغ',
    'accounting.status': 'الحالة',
    'accounting.actions': 'الإجراءات',
    
    // Invoices
    'invoices.title': 'الفواتير والمدفوعات',
    'invoices.subtitle': 'تتبع فواتير العملاء وسجل المدفوعات',
    'invoices.createInvoice': 'إنشاء فاتورة',
    'invoices.client': 'العميل',
    'invoices.paymentTimeline': 'جدول المدفوعات',
    
    // Budgets
    'budgets.title': 'إدارة الميزانيات',
    'budgets.subtitle': 'تخطيط وتتبع ميزانيات الأقسام',
    'budgets.createBudget': 'إنشاء ميزانية',
    'budgets.vsActual': 'الميزانية مقابل الفعلي',
    
    // Reports
    'reports.title': 'التقارير والتحليلات',
    'reports.subtitle': 'إنشاء رؤى وتصدير البيانات',
    'reports.exportPDF': 'تصدير PDF',
    'reports.exportExcel': 'تصدير Excel',
    'reports.dateRange': 'نطاق التاريخ',
    
    // Settings
    'settings.title': 'الإعدادات',
    'settings.subtitle': 'تخصيص تفضيلاتك',
    'settings.profile': 'الملف الشخصي',
    'settings.security': 'الأمان',
    'settings.appearance': 'المظهر',
    'settings.language': 'اللغة',
    
    // Auth
    'auth.login': 'تسجيل الدخول',
    'auth.signup': 'إنشاء حساب',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.confirmPassword': 'تأكيد كلمة المرور',
    'auth.fullName': 'الاسم الكامل',
    'auth.forgotPassword': 'نسيت كلمة المرور؟',
    'auth.noAccount': 'ليس لديك حساب؟',
    'auth.hasAccount': 'لديك حساب بالفعل؟',
    'auth.welcomeBack': 'مرحباً بعودتك',
    'auth.createAccount': 'إنشاء حساب',
    'auth.loginSubtitle': 'سجل الدخول للوصول إلى لوحة التحكم المالية',
    'auth.signupSubtitle': 'ابدأ في إدارة أموالك اليوم',
    'auth.orContinueWith': 'أو المتابعة باستخدام',
    'auth.continueWithGoogle': 'المتابعة مع Google',
    'auth.rememberMe': 'تذكرني',
    'auth.passwordStrength': 'قوة كلمة المرور',
    'auth.minChars': '٦ أحرف على الأقل',
    'auth.hasUppercase': 'حرف كبير',
    'auth.hasNumber': 'رقم',
    'auth.hasSpecial': 'رمز خاص',
    'auth.weak': 'ضعيفة',
    'auth.fair': 'متوسطة',
    'auth.good': 'جيدة',
    'auth.strong': 'قوية',
    'auth.secureLogin': 'تسجيل دخول آمن',
    'auth.trustedBy': 'موثوق به من قبل أكثر من ١٠,٠٠٠ شركة',
    'auth.feature1': 'أمان مصرفي',
    'auth.feature2': 'تحليلات فورية',
    'auth.feature3': 'تنبؤات ذكية',
    'auth.feature4': 'دعم متعدد العملات',
    'auth.continueWithApple': 'المتابعة مع Apple',
    'auth.stats.users': 'المستخدمون النشطون',
    'auth.stats.uptime': 'وقت التشغيل',
    'auth.stats.processed': 'تمت المعالجة',
    
    // AI Assistant
    'ai.title': 'المساعد المالي الذكي',
    'ai.placeholder': 'اسأل عن شؤونك المالية...',
    'ai.send': 'إرسال',
    'ai.thinking': 'جاري التفكير...',
    'ai.clearChat': 'مسح المحادثة',
    
    // Voice Commands
    'voice.listening': 'جاري الاستماع...',
    'voice.clickToSpeak': 'انقر للتحدث',
    'voice.commandRecognized': 'تم التعرف على الأمر',
    
    // Collaboration
    'collab.online': 'متصل الآن',
    'collab.viewing': 'يشاهد',
    
    // Predictions
    'predictions.title': 'تنبؤات الذكاء الاصطناعي',
    'predictions.revenue': 'توقعات الإيرادات',
    'predictions.expenses': 'توقعات المصروفات',
    'predictions.trend': 'تحليل الاتجاهات',
    
    // Common
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.loading': 'جاري التحميل...',
    'common.search': 'بحث...',
    'common.noData': 'لا توجد بيانات',
    'common.success': 'نجاح',
    'common.error': 'خطأ',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  const isRTL = language === 'ar';

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
