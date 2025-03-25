/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { filter } from 'lodash';
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
import { AppTableExtension } from 'src/sections/@dashboard/app/AppTableExtension';

import { lumappsPublishers } from '../../constants';

// ----------------------------------------------------------------------

export const DashoardExtension = ({ extensionsList, availableExtensionsList, isExtensionsLoading, isAvailableExtensionsLoading, token, versionsList, isVersionLoading, loadAllExtensions, loadAllAvailableExtensions, loadExtensionsVersions }) => {
  const theme = useTheme();
  const [extensionDraft, setExtensionDraft] = useState([]);
  const [extensionNoVersion, setExtensionNoVersion] = useState([]);
  const [dateRange, setDateRange] = useState('all');
  const [displayLumAppsPublisher, setDisplayLumAppsPublisher] = useState(true)
  const [filteredExtensionList, setFilteredExtensionList] = useState([]);
  const [filteredAvailableExtensionList, setFilteredAvailableExtensionList] = useState([]);
  const fetchExtensions = async () => {
    loadAllExtensions(token);
  }

  const fetchAvailableExtensions = async () => {
    loadAllAvailableExtensions(token);
  }

  useEffect(() => {
    if (!isExtensionsLoading && extensionsList.length === 0) {
      fetchExtensions();
    }
  }, [extensionsList, fetchExtensions, isExtensionsLoading]);

  useEffect(() => {
    if (!isAvailableExtensionsLoading && availableExtensionsList.length === 0) {
      fetchAvailableExtensions();
    }
  })

  const getExtensionInDraft = () => {
    const array = filter(filteredExtensionList, (extenson) => {
      return extenson.version && extenson.version.status === 'draft';
    });

    setExtensionDraft(array);
  }
  const getExtensionWithNoVersion = () => {
    const array = filter(filteredExtensionList, (extenson) => {
      return !extenson.version;
    });

    setExtensionNoVersion(array);
  }

  const getMobileCompatibility = () => {
    const array = filter(filteredExtensionList, (extension) => {
      return extension.version && extension.version.status === 'deployed' && extension.version.isMobileCompatible
    });
  }

  useEffect(() => {
    if (filteredExtensionList.length > 0) {
      getExtensionInDraft();
      getExtensionWithNoVersion();
      getMobileCompatibility()
    }
  }, [filteredExtensionList.length]);

  useEffect(() => {
    if (extensionsList.length > 0 || availableExtensionsList) {
      let minDate;
      switch (dateRange) {
        case 'month':
          minDate = moment().subtract('month', 1);
          break;
        case 'quarter':
          minDate = moment().subtract('month', 3);
          break;
        case 'semester':
          minDate = moment().subtract('month', 6);
          break;
        default:
          break;
      }

      const filteredList = filter(extensionsList, (item) => {
        if (dateRange === 'all') {
          return true;
        }

        return moment(item.createdAt).isAfter(minDate);
      });

      const filteredAvailableList = filter(availableExtensionsList, (item) => {
        if (dateRange === 'all') {
          return true;
        }

        return moment(item.createdAt).isAfter(minDate);
      });

      setFilteredExtensionList(filteredList);
      setFilteredAvailableExtensionList(filteredAvailableList);
    }

  }, [extensionsList, dateRange]);

  const handleDateRangeClick = (range) => {
    setDateRange(range);
  }

  const handleDisplayLumAppsPublisherClick = () => {
    setDisplayLumAppsPublisher(!displayLumAppsPublisher);
  }

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
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Created Extensions" total={filteredExtensionList.length} color="success" icon={'ant-design:appstore-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Extensions available" total={filteredAvailableExtensionList.length} color="success" icon={'ant-design:appstore-add-outlined'} />
          </Grid>


          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Extensions currenlty in dev" total={extensionDraft.length} color="info" icon={'ant-design:appstore-add-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Extensions without version" total={extensionNoVersion.length} color="warning" icon={'eva:slash-outline'} />
          </Grid>


          <Grid item xs={12} md={6} lg={12}>
            <AppLine
              title="Extension creation"
              subheader="Creation over time"
              dateRange={dateRange}
              list={filteredExtensionList}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppPie
              title="Extension repartition"
              subheader="Repartition by categories"
              list={filteredExtensionList}
              splitAttribute='category'
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppCalendar
              title="Extension creation"
              subheader="Creation over last year"
              list={extensionsList}
              color="nivo"
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppPie
              title="Extension repartition"
              subheader="Public vs. Private"
              list={filteredExtensionList}
              splitAttribute='public'
              color="category10"
              labelCompute={(attributeValue) => {return attributeValue === 'true' ? 'Public' : 'Private' }}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            {filteredAvailableExtensionList && filteredAvailableExtensionList.length > 0 && (
              <AppTableExtension list={filteredAvailableExtensionList} />
            )}
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}
