import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const HomecareManagement = React.lazy(() => import('./views/base/tables/HomecareManagement'))
const ClientManagement = React.lazy(() => import('./views/base/tables/ClientManagement'))
const AssessmentManagement = React.lazy(() => import('./views/base/tables/AssessmentManagement'))
const ReportsAnalytics = React.lazy(() => import('./views/base/tables/ReportsAnalytics'))
const SignatureManagement = React.lazy(() => import('./views/base/tables/SignatureManagement'))
// const AssessmentManagement = React.lazy(() => import('./views/base/tables/SignatureManagement'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/tables', name: 'Tables', element: Tables },
  { path: '/HomecareManagement', name: 'Homecare Management', element: HomecareManagement },
  { path: '/ClientManagement', name: 'Client Management', element: ClientManagement },
  { path: '/AssessmentManagement', name: 'Assessment Management', element: AssessmentManagement },
  { path: '/ReportsAnalytics', name: 'Reports and Analytics', element: ReportsAnalytics },
  { path: '/SignatureManagement', name: 'Signature Management', element: SignatureManagement}

]

export default routes