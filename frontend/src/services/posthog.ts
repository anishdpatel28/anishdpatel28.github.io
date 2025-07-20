import posthog from 'posthog-js'

// Initialize PostHog
const POSTHOG_API_KEY = import.meta.env.VITE_POSTHOG_API_KEY
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST

if (POSTHOG_API_KEY && POSTHOG_HOST) {
  posthog.init(POSTHOG_API_KEY, {
    api_host: POSTHOG_HOST,
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug()
    },
    capture_pageview: false, // We'll handle this manually
    capture_pageleave: false, // We'll handle this manually
  })
}

export const posthogService = {
  // Page view tracking
  capturePageView: (properties?: Record<string, any>) => {
    if (POSTHOG_API_KEY) {
      posthog.capture('page_viewed', properties)
    }
  },

  // Section time tracking
  captureSectionTime: (section: string, timeSpent: number) => {
    if (POSTHOG_API_KEY) {
      posthog.capture('section_time_spent', {
        section,
        time_spent_seconds: timeSpent
      })
    }
  },

  // Analytics dialog viewed
  captureAnalyticsViewed: () => {
    if (POSTHOG_API_KEY) {
      posthog.capture('analytics_viewed')
    }
  },

  // Easter egg clicked
  captureEggClicked: () => {
    if (POSTHOG_API_KEY) {
      posthog.capture('easter_egg_clicked')
    }
  },

  // User identification
  identify: (userId: string, properties?: Record<string, any>) => {
    if (POSTHOG_API_KEY) {
      posthog.identify(userId, properties)
    }
  },

  // Set user properties
  setUserProperties: (properties: Record<string, any>) => {
    if (POSTHOG_API_KEY) {
      posthog.setPersonProperties(properties)
    }
  },

  // Get distinct ID
  getDistinctId: (): string | undefined => {
    if (POSTHOG_API_KEY) {
      return posthog.get_distinct_id()
    }
    return undefined
  }
}

export default posthogService 