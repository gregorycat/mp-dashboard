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
import { AppTableMicroApp } from 'src/sections/@dashboard/app/AppTableMicroApp';

import { lumappsPublishers } from '../../constants';

// ----------------------------------------------------------------------

export const DashoardMicroApp = ({ microAppList, availableMicroAppsList, isExtensionsLoading, isAvailableExtensionsLoading, token, loadAllExtensions, loadAllAvailableExtensions }) => {
  const theme = useTheme();
  const [extensionDraft, setExtensionDraft] = useState([]);
  const [extensionNoVersion, setExtensionNoVersion] = useState([]);
  const [dateRange, setDateRange] = useState('all');
  const [displayLumAppsPublisher, setDisplayLumAppsPublisher] = useState(true)
  const [filteredExtensionList, setFilteredExtensionList] = useState([]);
  const [filteredAvailableExtensionList, setFilteredAvailableExtensionList] = useState([]);
  const [partnerAvailableMicroAppList, setPartnerAvailableMicroAppList] = useState([]);
  const [partnerMicroAppList, setPartnerMicroAppList] = useState([]);
  const [filteredAvailableMicroAppsPerPartner, setFilteredAvailableMicroAppsPerPartner] = useState([]);

  console.log(filteredAvailableExtensionList.length / filteredAvailableMicroAppsPerPartner.length)

  const fetchExtensions = async () => {
    loadAllExtensions(token);
  }

  const fetchAvailableExtensions = async () => {
    loadAllAvailableExtensions(token);
  }

  useEffect(() => {
    if (!microAppList) {
      return
    }

    if (!isExtensionsLoading && microAppList.length === 0) {
      fetchExtensions();
    }
  }, [microAppList, fetchExtensions, isExtensionsLoading]);

  useEffect(() => {
    if (!availableMicroAppsList) {
      return;
    }
    if (!isAvailableExtensionsLoading && availableMicroAppsList.length === 0) {
      fetchAvailableExtensions();
    }
  })
  useEffect(() => {
    if (!isAvailableExtensionsLoading 
      && filteredAvailableExtensionList.length > 0 
      && filteredExtensionList.length > 0) {
      getPartnerMicroApps();
    }
  }, [filteredExtensionList, filteredAvailableExtensionList])

  const getExtensionInDraft = () => {
    const list = displayLumAppsPublisher ? filteredExtensionList : partnerMicroAppList;
    
    const array = filter(list, (extenson) => {
      return extenson.version && extenson.version.status === 'draft';
    });

    setExtensionDraft(array);
  }

  const getExtensionWithNoVersion = () => {
    const list = displayLumAppsPublisher ? filteredExtensionList : partnerMicroAppList;
    const array = filter(list, (extenson) => {
      return !extenson.version;
    });

    setExtensionNoVersion(array);
  }

  const getPartnerMicroApps = () => {
    const arrayAvailable = filter(filteredAvailableExtensionList, (extension) => {
      return !includes(lumappsPublishers, extension.partnerId)
    });

    const array = filter(filteredExtensionList, (extension) => {
      return !includes(lumappsPublishers, extension.partnerId)
    });

    let arrayPerPartner = [];
    forEach(filteredAvailableExtensionList, (extension) => {
      const partner = find(arrayPerPartner, { publisherId: extension.partnerId});

      if (partner) {
        partner.count += 1;
      } else {
        arrayPerPartner.push({
          publisherId: extension.partnerId,
          count: 1
        });
      }
    });

    setFilteredAvailableMicroAppsPerPartner(arrayPerPartner);
    setPartnerAvailableMicroAppList(arrayAvailable)
    setPartnerMicroAppList(array)
  }

  useEffect(() => {
    if (filteredExtensionList.length > 0) {
      getExtensionInDraft();
      getExtensionWithNoVersion();
    }
  }, [filteredExtensionList.length, displayLumAppsPublisher]);

  useEffect(() => {
    if (microAppList.length > 0 || availableMicroAppsList) {
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

      const filteredList = filter(microAppList, (item) => {
        if (dateRange === 'all') {
          return true;
        }

        return moment(item.createdAt).isAfter(minDate);
      });

      const filteredAvailableList = filter(availableMicroAppsList, (item) => {
        if (dateRange === 'all') {
          return true;
        }

        return moment(item.createdAt).isAfter(minDate);
      });

      setFilteredExtensionList(filteredList);
      setFilteredAvailableExtensionList(filteredAvailableList);
    }

  }, [microAppList, dateRange]);

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
            <AppWidgetSummary title="Created Micro-apps" total={displayLumAppsPublisher ? filteredExtensionList.length : partnerMicroAppList.length} color="success" icon={'ant-design:appstore-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Micro-apps available" total={displayLumAppsPublisher ? filteredAvailableExtensionList.length : partnerAvailableMicroAppList.length} color="success" icon={'ant-design:appstore-add-outlined'} />
          </Grid>


          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Micro-apps currenlty in dev" total={extensionDraft.length} color="info" icon={'ant-design:appstore-add-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Micro-apps without version" total={extensionNoVersion.length} color="warning" icon={'eva:slash-outline'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Published Micro-apps per publisher" total={Math.ceil((displayLumAppsPublisher ? filteredAvailableExtensionList.length : partnerAvailableMicroAppList.length) / filteredAvailableMicroAppsPerPartner.length)} color="info" icon={'ant-design:appstore-add-outlined'} />
          </Grid>


          <Grid item xs={12} md={6} lg={12}>
            <AppLine
              title="Micro-apps creation"
              subheader="Creation over time"
              dateRange={dateRange}
              displayLumAppsPublisher={displayLumAppsPublisher}
              list={filteredExtensionList}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppCalendar
              title="Micro-apps creation"
              subheader="Creation over last year"
              displayLumAppsPublisher={displayLumAppsPublisher}
              list={microAppList}
              color="nivo"
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppPie
              title="Micro-apps repartition"
              subheader="Public vs. Private"
              list={displayLumAppsPublisher ? filteredExtensionList : partnerMicroAppList}
              splitAttribute='public'
              color="category10"
              labelCompute={(attributeValue) => {return attributeValue === 'true' ? 'Public' : 'Private' }}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            {filteredExtensionList && filteredExtensionList.length > 0 && (
              <AppTableMicroApp list={displayLumAppsPublisher ? filteredExtensionList : partnerMicroAppList} />
            )}
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}
