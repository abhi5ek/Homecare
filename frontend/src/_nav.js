import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilLockLocked,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserDoctor , faUser , faListCheck , faChartSimple   } from '@fortawesome/free-solid-svg-icons';

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Homecare Management',
    to: '/HomecareManagement',
    icon: <FontAwesomeIcon icon={faUserDoctor} style={{ color: '#ffffff', marginRight: '8px' }} />,
  },

  {
    component: CNavItem,
    name: 'Client Management',
    to: '/ClientManagement',
    icon: <FontAwesomeIcon icon={faUser} style={{ color: '#ffffff' , marginRight: '8px'}} />, 
  },

  {
    component: CNavItem,
    name: 'Assessment History',
    to: '/AssessmentManagement',
    icon: <FontAwesomeIcon icon={faUser} style={{ color: '#ffffff' , marginRight: '8px'}} />, 
  },

  // {
  //   component: CNavItem,
  //   name: 'Assessment Management',
  //   to: '/AssessmentManagement',
  //   icon: <FontAwesomeIcon icon={faListCheck} style={{ color: '#ffffff', marginRight: '8px' }} />, 
  // },

  // {
  //   component: CNavItem,
  //   name: 'Reports and Analytics',
  //   to: '/ReportsAnalytics',
  //   icon: <FontAwesomeIcon icon={faChartSimple} style={{ color: '#ffffff', marginRight: '8px' }} />, 
  // },
  {
    component: CNavItem,
    name: 'Signature Management',
    to: '/SignatureManagement',
    icon: <FontAwesomeIcon icon={faChartSimple} style={{ color: '#ffffff', marginRight: '8px' }} />, 
  }
  
  

  // {
  //   component: CNavItem,
  //   name: 'Consumer Management',
  //   to: '/tables',
  //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Assessment Management',
  //   to: '/Doc_verification',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Digital Signature',
  //   to: '/Animal_Weather',
  //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Assignment and Workflow',
  //   to: '/Analytics_Reporting',
  //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Reports and Analytics',
  //   to: '/Booking_Management',
  //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Notifications and Alerts',
  //   to: '/Integration_Itinerary',
  //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  // },

  // {
  //   component: CNavItem,
  //   name: 'Booking History & Reporting',
  //   to: '/Booking_history',
  //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  // },
]

export default _nav
