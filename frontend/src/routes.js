import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
// const Login = React.lazy(() => import('./views/pages/login/Login'))
// const AuthList = React.lazy(() => import('./AuthList'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const HomecareManagement = React.lazy(() => import('./views/base/tables/HomecareManagement'))
const ClientManagement = React.lazy(() => import('./views/base/tables/ClientManagement'))
const AssessmentManagement = React.lazy(() => import('./views/base/tables/AssessmentManagement'))
const ReportsAnalytics = React.lazy(() => import('./views/base/tables/ReportsAnalytics'))
const SignatureManagement = React.lazy(() => import('./views/base/tables/SignatureManagement'))

// const User = React.lazy(() => import('./views/base/tables/User'))
// const Doc_verification = React.lazy(() => import('./views/base/tables/Doc_verification'))
// const Animal_Weather = React.lazy(() => import('./views/base/tables/Animal&Weather'))
// const Analytics_Reporting = React.lazy(() => import('./views/base/tables/Analytics_Reporting'))
// const Account_Management = React.lazy(() => import('./views/base/tables/Account_Management'))
// const Booking_Management = React.lazy(() => import('./views/base/tables/Booking_Management'))
// const Integration_Itinerary = React.lazy(() => import('./views/base/tables/Integration_with_Itinerary'))
// const Booking_histroy = React.lazy(() => import('./views/base/tables/Booking_histroy'))
// const Manage_invoices = React.lazy(() => import('./views/base/tables/Manage_invoices'))

// const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
// const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
// const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
// const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
// const Cards = React.lazy(() => import('./views/base/cards/Cards'))
// const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
// const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
// const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
// const Navs = React.lazy(() => import('./views/base/navs/Navs'))
// const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
// const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
// const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
// const Progress = React.lazy(() => import('./views/base/progress/Progress'))
// const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
// // const Tables = React.lazy(() => import('./views/base/tables/Tables'))
// const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
// const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
// const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
// const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

// //Forms
// const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
// const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
// const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
// const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
// const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
// const Range = React.lazy(() => import('./views/forms/range/Range'))
// const Select = React.lazy(() => import('./views/forms/select/Select'))
// const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

// const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
// const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
// const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
// const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
// const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
// const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
// const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
// const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

// const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  // { path: '/AuthList', name: 'AuthList', element: AuthList },
  { path: '/tables', name: 'Tables', element: Tables },
  { path: '/HomecareManagement', name: 'Homecare Management', element: HomecareManagement },
  { path: '/ClientManagement', name: 'Client Management', element: ClientManagement },
  { path: '/AssessmentManagement', name: 'Assessment Management', element: AssessmentManagement },
  { path: '/ReportsAnalytics', name: 'Reports and Analytics', element: ReportsAnalytics },
  { path: '/SignatureManagement', name: 'Signature Management', element: SignatureManagement}
  // { path: '/User', name: 'User', element: User},
  // { path: '/Doc_verification', name: 'Doc_verification', element: Doc_verification},
  // { path: '/Animal_Weather', name: 'Animal_Weather', element: Animal_Weather},
  // { path: '/Analytics_Reporting', name: 'Analytics_Reporting', element: Analytics_Reporting},
  // { path: '/Account_Management', name: 'Account_Management', element: Account_Management},
  // { path: '/Integration_Itinerary', name: 'Integration_Itinerary', element: Integration_Itinerary},
  // { path: '/Booking_Management', name: 'Booking_Management', element: Booking_Management},
  // { path: '/Integration_Itinerary', name: 'Integration_Itinerary', element: Integration_Itinerary},
  
  // { path: '/Booking_history', name: 'Booking_history', element: Booking_histroy},
  // { path: '/Manage_invoices', name: 'Manage_invoices', element: Manage_invoices},

  // { path: '/theme', name: 'Theme', element: Colors, exact: true },
  // { path: '/theme/colors', name: 'Colors', element: Colors },
  // { path: '/theme/typography', name: 'Typography', element: Typography },
  // { path: '/base', name: 'Base', element: Cards, exact: true },
  // { path: '/base/accordion', name: 'Accordion', element: Accordion },
  // { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  // { path: '/base/cards', name: 'Cards', element: Cards },
  // { path: '/base/carousels', name: 'Carousel', element: Carousels },
  // { path: '/base/collapses', name: 'Collapse', element: Collapses },
  // { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  // { path: '/base/navs', name: 'Navs', element: Navs },
  // { path: '/base/paginations', name: 'Paginations', element: Paginations },
  // { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  // { path: '/base/popovers', name: 'Popovers', element: Popovers },
  // { path: '/base/progress', name: 'Progress', element: Progress },
  // { path: '/base/spinners', name: 'Spinners', element: Spinners },
  // { path: '/base/tables', name: 'Tables', element: Tables },
  // { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  // { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  // { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  // { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  // { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  // { path: '/charts', name: 'Charts', element: Charts },
  // { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  // { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  // { path: '/forms/select', name: 'Select', element: Select },
  // { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  // { path: '/forms/range', name: 'Range', element: Range },
  // { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  // { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  // { path: '/forms/layout', name: 'Layout', element: Layout },
  // { path: '/forms/validation', name: 'Validation', element: Validation },
  // { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  // { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  // { path: '/icons/flags', name: 'Flags', element: Flags },
  // { path: '/icons/brands', name: 'Brands', element: Brands },
  // { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  // { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  // { path: '/notifications/badges', name: 'Badges', element: Badges },
  // { path: '/notifications/modals', name: 'Modals', element: Modals },
  // { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  // { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes