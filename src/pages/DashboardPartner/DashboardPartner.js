/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { filter } from 'lodash';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Grid,
  Container,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import { CalendarMonth, AllInclusive } from '@mui/icons-material';
import moment from 'moment';

// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../../sections/@dashboard/app';

import { AppCalendar } from 'src/sections/@dashboard/app/AppCalendar';
import { AppLine } from 'src/sections/@dashboard/app/AppLine';
import { AppTable } from 'src/sections/@dashboard/app/AppTable';

// ----------------------------------------------------------------------

export const DashboardPartner = ({ partnersList, extensionsList, isPartnersLoading, isExtensionsLoading, token, loadAllPartners, loadAllExtensions }) => {
  const theme = useTheme();
  const [dateRange, setDateRange] = useState('all');
  const [filteredPartnerList, setFilteredPartnerList] = useState([]);
  const [filteredExtensionList, setFilteredExtensionList] = useState([]);
  const [partnersWithExtension, setPartnersWithExtension] = useState([]);

  const fetchExtensions = async () => {
    loadAllExtensions(token);
  }

  useEffect(() => {
    if (!isExtensionsLoading && extensionsList.length === 0) {
      fetchExtensions();
    }
  }, [extensionsList, fetchExtensions, isExtensionsLoading]);

  const fetchPartners = async () => {
    loadAllPartners(token);
  }

  useEffect(() => {
    if (!isPartnersLoading && partnersList.length === 0) {
      fetchPartners();
    }
  }, [partnersList, fetchPartners, isPartnersLoading]);


  useEffect(() => {
    if (partnersList.length > 0 && extensionsList.length > 0) {
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

      const filteredPartnersList = filter(partnersList, (item) => {
        if (dateRange === 'all') {
          return true;
        }

        return moment(item.createdAt).isAfter(minDate);
      });

      const filteredExtensionsList = filter(extensionsList, (item) => {
        if (dateRange === 'all') {
          return true;
        }

        return moment(item.createdAt).isAfter(minDate);
      });

      setFilteredPartnerList(filteredPartnersList);
      setFilteredExtensionList(filteredExtensionsList);
    }

  }, [partnersList, extensionsList, dateRange]);


  useEffect(() => {
    if (filteredPartnerList.length > 0 && extensionsList.length > 0) {
      getPartnerWithExtension()
    }
  },[filteredPartnerList, extensionsList])

  const getPartnerWithExtension = () => {
    const partners = [];

    filteredPartnerList.forEach((partner) => {
      const extensions = filter(extensionsList, (extension) => extension.partnerId === partner.id);

      if (extensions && extensions.length > 0) {
        partners.push(partner);
      }
    });

    setPartnersWithExtension(partners);
  }

  const handleDateRangeClick = (range) => {
    setDateRange(range);
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

        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Publishers" total={filteredPartnerList.length} color="success" icon={'ant-design:user-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Publishers with at least one extension" total={partnersWithExtension.length} color="info" icon={'ant-design:appstore-outlined'} />
          </Grid>

          <Grid item xs={12} md={6} lg={12}>
            <AppLine
              title="Publishers creation"
              subheader="Creation over time"
              dateRange={dateRange}
              list={filteredPartnerList}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            {filteredPartnerList && filteredPartnerList.length > 0 && (
              <AppTable list={filteredPartnerList} />
            )}
          </Grid>

          <Grid item xs={12} md={6} lg={7}>
            <AppCalendar
              title="Publisher creation"
              subheader="Creation over last year"
              list={partnersList}
            />
          </Grid>

          {/*  <Grid item xs={12} md={6} lg={5}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} height={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} height={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} height={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} height={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
