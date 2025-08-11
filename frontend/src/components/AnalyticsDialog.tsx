import React from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface AnalyticsDialogProps {
  open: boolean;
  onClose: () => void;
  analytics: Record<string, unknown> | null;
  mode?: 'dark' | 'light';
}

const AnalyticsDialog: React.FC<AnalyticsDialogProps> = ({ open, onClose, analytics, mode = 'dark' }) => {

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    let str = '';
    if (days > 0) str += `${days}d `;
    if (hours > 0 || days > 0) str += `${hours}h `;
    if (minutes > 0 || hours > 0 || days > 0) str += `${minutes}m `;
    str += `${remainingSeconds}s`;
    return str.trim();
  };

  // custom Y-axis tick formatter for graph
  const formatYAxisTick = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    let str = '';
    if (days > 0) str += `${days}d `;
    if (hours > 0 || days > 0) str += `${hours}h `;
    if (minutes > 0 || hours > 0 || days > 0) str += `${minutes}m `;
    str += `${remainingSeconds}s`;
    return str.trim();
  };

  // custom tooltip content to capitalize "time:" label
  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{ value: number; }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <Box sx={{
          background: mode === 'dark' ? '#222e3a' : '#ffffff',
          color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
          border: mode === 'dark' ? 'none' : '1px solid #e0e0e0',
          padding: '10px',
          borderRadius: '4px'
        }}>
          <Typography variant="body2" sx={{
            fontWeight: 'bold',
            color: mode === 'dark' ? '#e0e1dd' : '#1b263b'
          }}>
            {label}
          </Typography>
          <Typography variant="body2" sx={{
            color: mode === 'dark' ? '#e0e1dd' : '#1b263b'
          }}>
            Time: {formatTime(payload[0].value)}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
      PaperProps={{ sx: { overflow: 'visible' } }}
    >
      <DialogTitle sx={{
        color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
        bgcolor: mode === 'dark' ? '#1b263b' : '#ffffff'
      }}>
        Page Analytics
      </DialogTitle>
      <DialogContent sx={{
        bgcolor: mode === 'dark' ? '#1b263b' : '#ffffff',
        color: mode === 'dark' ? '#e0e1dd' : '#1b263b'
      }}>
        <Box sx={{ p: 2, pb: 1 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Page Views: {typeof analytics?.page_views === 'number' ? analytics.page_views : 0}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Time spent per section:
          </Typography>
          {/* Analytics Bar Graph */}
          <Box sx={{ width: '100%', height: 240, mb: 2, mt: 3 }}>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart
                data={[{
                  section: 'Home', time: typeof analytics?.time_spent_home === 'number' ? analytics.time_spent_home : 0
                }, {
                  section: 'About', time: typeof analytics?.time_spent_about === 'number' ? analytics.time_spent_about : 0
                }, {
                  section: 'Skills', time: typeof analytics?.time_spent_skills === 'number' ? analytics.time_spent_skills : 0
                }, {
                  section: 'Projects', time: typeof analytics?.time_spent_projects === 'number' ? analytics.time_spent_projects : 0
                }, {
                  section: 'Resume', time: typeof analytics?.time_spent_resume === 'number' ? analytics.time_spent_resume : 0
                }, {
                  section: 'Contact', time: typeof analytics?.time_spent_contact === 'number' ? analytics.time_spent_contact : 0
                }]}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={mode === 'dark' ? '#2c3e50' : '#e0e0e0'} />
                <XAxis dataKey="section" stroke={mode === 'dark' ? '#e0e1dd' : '#1b263b'} tick={{ fill: mode === 'dark' ? '#e0e1dd' : '#1b263b', fontSize: 14 }} />
                <YAxis
                  stroke={mode === 'dark' ? '#e0e1dd' : '#1b263b'}
                  tick={{ fill: mode === 'dark' ? '#e0e1dd' : '#1b263b', fontSize: 12 }}
                  tickFormatter={formatYAxisTick}
                  width={100}
                  axisLine={false}
                  tickLine={false}
                />
                <RechartsTooltip
                  content={<CustomTooltip />}
                />
                <Bar dataKey="time" fill="#4fc3f7" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Most viewed section: {
              typeof analytics?.most_viewed_section === 'string' && analytics.most_viewed_section.length > 0
                ? analytics.most_viewed_section.charAt(0).toUpperCase() + analytics.most_viewed_section.slice(1)
                : 'Home'
            }
          </Typography>
          <Typography variant="body1">
            Average session duration: {formatTime(typeof analytics?.average_session_duration === 'number' ? analytics.average_session_duration : 0)}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ bgcolor: mode === 'dark' ? '#1b263b' : '#ffffff' }}>
        <Button onClick={onClose} sx={{ color: mode === 'dark' ? '#e0e1dd' : '#1b263b' }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AnalyticsDialog; 