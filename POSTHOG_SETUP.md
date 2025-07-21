# PostHog Analytics Integration

This project now uses PostHog for advanced analytics while maintaining your own database for deep control and data ownership.

## Setup Instructions

### 1. Environment Configuration

Update your `.env` file in the root directory with your PostHog credentials:

```env
# PostHog Configuration
POSTHOG_API_KEY=your_actual_posthog_api_key_here
POSTHOG_HOST=https://app.posthog.com

# Django Configuration
DJANGO_SECRET_KEY=your_django_secret_key_here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio_db

# Frontend Configuration
VITE_API_URL=http://localhost:8000/api
VITE_POSTHOG_API_KEY=your_actual_posthog_api_key_here
VITE_POSTHOG_HOST=https://app.posthog.com
```

### 2. Get Your PostHog API Key

1. Sign up at [PostHog](https://app.posthog.com)
2. Create a new project
3. Go to Project Settings > API Keys
4. Copy your API key and update the `.env` file

### 3. Install Dependencies

**Backend:**

```bash
cd backend
pip install -r requirements.txt
```

**Frontend:**

```bash
cd frontend
npm install
```

### 4. Run Migrations

```bash
cd backend
python manage.py migrate
```

## Features

### Dual Analytics System

- **Local Database**: All analytics data is stored in your PostgreSQL database
- **PostHog**: Advanced analytics, funnels, and insights
- **Hybrid Approach**: You own your data while getting PostHog's powerful features

### Tracked Events

1. **Page Views**: When users visit your portfolio
2. **Section Time**: Time spent in each section (Home, About, Skills, etc.)
3. **Analytics Viewed**: When users open the analytics dialog
4. **Easter Egg Clicked**: When users discover and click the egg

### User Identification

- Anonymous users get unique session IDs
- All events are tracked with consistent user identification
- No personal data is collected without consent

## PostHog Dashboard

Once configured, you can view analytics in your PostHog dashboard:

- **Events**: All tracked events with properties
- **Funnels**: User journey analysis
- **Insights**: Advanced analytics and trends
- **Cohorts**: User segmentation

## Data Ownership

- All data is stored in your PostgreSQL database
- PostHog provides additional analytics capabilities
- You can export data from both systems
- No vendor lock-in for your core analytics

## Customization

### Adding New Events

**Backend:**

```python
# In posthog_service.py
def capture_custom_event(self, event_name: str, properties: Dict[str, Any], user_id: Optional[str] = None):
    try:
        if self.api_key:
            posthog.capture(
                distinct_id=user_id or 'anonymous',
                event=event_name,
                properties=properties
            )
    except Exception as e:
        logger.error(f"Failed to capture {event_name} in PostHog: {e}")
```

**Frontend:**

```typescript
// In posthog.ts
captureCustomEvent: (eventName: string, properties?: Record<string, any>) => {
  if (POSTHOG_API_KEY) {
    posthog.capture(eventName, properties)
  }
}
```

### Environment Variables

All environment variables are centralized in the root `.env` file:

- Backend reads from root `.env`
- Frontend uses Vite's environment variable system
- No duplicate configuration files

## Troubleshooting

### PostHog Not Working

1. Check your API key in `.env`
2. Verify PostHog host URL
3. Check browser console for errors
4. Ensure PostHog project is active

### Database Issues

1. Run migrations: `python manage.py migrate`
2. Check database connection
3. Verify PostgreSQL is running

### Frontend Issues

1. Restart development server
2. Clear browser cache
3. Check Vite environment variables
