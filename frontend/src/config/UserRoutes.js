import React, { lazy } from 'react'
import { routes } from './Router'

export default function getUserRoutes(role) {
  let filterRoutes = routes
  switch (role) {
    case 'register':
      filterRoutes = filterRoutes.filter((route) => route.name === 'Users' || route.name === 'Archive')
      filterRoutes.push()
  }
  return filterRoutes
}

