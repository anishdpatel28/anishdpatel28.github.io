import posthog from 'posthog-js'

const POSTHOG_API_KEY = import.meta.env.VITE_POSTHOG_API_KEY
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST

if (POSTHOG_API_KEY && POSTHOG_HOST) {
  posthog.init(POSTHOG_API_KEY, {
    api_host: POSTHOG_HOST,
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug()
    },
    capture_pageview: false,
    capture_pageleave: false,
  })
}

export const posthogService = {
  capturePageView: (properties?: Record<string, unknown>) => {
    if (POSTHOG_API_KEY) {
      posthog.capture('page_viewed', properties)
    }
  },

  captureSectionTime: (section: string, timeSpent: number) => {
    if (POSTHOG_API_KEY) {
      posthog.capture('section_time_spent', {
        section,
        time_spent_seconds: timeSpent
      })
    }
  },

  captureAnalyticsViewed: () => {
    if (POSTHOG_API_KEY) {
      posthog.capture('analytics_viewed')
    }
  },

  captureEggClicked: () => {
    if (POSTHOG_API_KEY) {
      posthog.capture('easter_egg_clicked')
    }
  },

  identify: (userId: string, properties?: Record<string, unknown>) => {
    if (POSTHOG_API_KEY) {
      posthog.identify(userId, properties)
    }
  },

  setUserProperties: (properties: Record<string, unknown>) => {
    if (POSTHOG_API_KEY) {
      posthog.setPersonProperties(properties)
    }
  },

  getDistinctId: (): string | undefined => {
    if (POSTHOG_API_KEY) {
      return posthog.get_distinct_id()
    }
    return undefined
  },

  capture: (event: string, properties?: Record<string, unknown>) => {
    if (POSTHOG_API_KEY) {
      posthog.capture(event, properties)
    }
  },

  people: {
    set: (properties: Record<string, unknown>) => {
      if (POSTHOG_API_KEY) {
        posthog.people.set(properties)
      }
    }
  }
}

export default posthogService 