/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { find, filter, forEach, includes } from 'lodash';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Box, Chip } from '@mui/material';
import { CalendarMonth, AllInclusive, PeopleOutline } from '@mui/icons-material';

import moment from 'moment';

// components
import Page from '../../components/Page';
// sections
import {
  AppWidgetSummary,
} from '../../sections/@dashboard/app';

import { AppCalendar } from 'src/sections/@dashboard/app/AppCalendar';
import { AppLine } from 'src/sections/@dashboard/app/AppLine';
import { AppPie } from 'src/sections/@dashboard/app/AppPie';
import { AppTableProvider } from 'src/sections/@dashboard/app/AppTableProvider';

import { lumappsPublishers } from '../../constants';

// ----------------------------------------------------------------------

export const DashboardProvider = ({ providerList, isProvidersLoading, extensionList, isExtensionsLoading, token, loadProviders, loadAllExtensions }) => {
  const [dateRange, setDateRange] = useState('all');
  const [displayLumAppsPublisher, setDisplayLumAppsPublisher] = useState(true);
  const [computedProviderList, setComputedProviderList] = useState([]);

  const handleDateRangeClick = (range) => {
    setDateRange(range);
  }

  const handleDisplayLumAppsPublisherClick = () => {
    setDisplayLumAppsPublisher(!displayLumAppsPublisher);
  }

  const fetchProviders = async () => {
    loadProviders(token);
  }

  const fetchAvailableExtensions = async () => {
    loadAllExtensions(token);
  }

  const computeExtensions = () => {
    const providersWithExtension = [];
    forEach(extensionList, (extension) => {
      if (!extension.version || extension.version.providerTypes.length === 0) {
        return;
      }

      forEach(extension.version.providerTypes, (providerType) => {
        const provider = find(providerList, {
          type: providerType
        });

        if (provider) {
          providersWithExtension.push({
            name: provider.name,
            id: provider.id,
            type: provider.type,
            icon: provider.icon,
            baseUrl: provider.baseUrl,
            needOverride: provider.needOverride,
            extension: extension
          });
        }
      });
    });

    setComputedProviderList(providersWithExtension)
  }

  useEffect(() => {
    if (!isExtensionsLoading && extensionList.length === 0) {
      fetchAvailableExtensions();
    }
  });

  useEffect(() => {
    if (!isExtensionsLoading && extensionList.length > 0 && !isProvidersLoading && providerList.length > 0) {
      computeExtensions();
    }
  }, [extensionList, isExtensionsLoading, isProvidersLoading, providerList])

  useEffect(() => {
    if (!isProvidersLoading && providerList.length === 0) {
      fetchProviders();
    }
  }, [providerList, fetchProviders, isProvidersLoading]);


  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Box sx={{ pb: 3 }} dir="ltr">
          <Chip
            sx={{ mr: 2 }}
            color={dateRange === 'all' ? 'primary' : 'default'}
            icon={<AllInclusive />}
            label="No restriction"
            onClick={() => handleDateRangeClick('all')}
          />
          <Chip
            sx={{ mr: 2 }}
            color={dateRange === 'semester' ? 'primary' : 'default'}
            icon={<CalendarMonth />}
            label="Last 6 Month"
            onClick={() => handleDateRangeClick('semester')}
          />
          <Chip
            sx={{ mr: 2 }}
            color={dateRange === 'quarter' ? 'primary' : 'default'}
            icon={<CalendarMonth />}
            label="Last 3 Month"
            onClick={() => handleDateRangeClick('quarter')}
          />
          <Chip
            sx={{ mr: 2 }}
            color={dateRange === 'month' ? 'primary' : 'default'}
            icon={<CalendarMonth />}
            label="Last Month"
            onClick={() => handleDateRangeClick('month')}
          />
          <Chip
            sx={{ mr: 2 }}
            color={!displayLumAppsPublisher ? 'primary' : 'default'}
            icon={<PeopleOutline />}
            label="Exclude LumApps publisher"
            onClick={() => handleDisplayLumAppsPublisherClick()}
          />
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            {providerList && providerList.length > 0 && (
              <AppTableProvider list={providerList} computedProviderList={computedProviderList} displayLumAppsPublisher={displayLumAppsPublisher} />
            )}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
