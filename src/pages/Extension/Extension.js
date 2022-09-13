/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { partnerSelector } from 'src/ducks/extensions/selector';
import { useSelector } from 'react-redux';

import { find, filter } from 'lodash';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Grid,
  Container,
  Typography,
  Card,
  Box,
  Link,
} from '@mui/material';
import { CalendarMonth, AllInclusive, ReviewsOutlined } from '@mui/icons-material';
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

import { AppPie } from 'src/sections/@dashboard/app/AppPie';
import { AppLine } from 'src/sections/@dashboard/app/AppLine';
import { AppTableExtension } from 'src/sections/@dashboard/app/AppTableExtension';
import { AppCalendar } from 'src/sections/@dashboard/app/AppCalendar';
import { current } from '@reduxjs/toolkit';


// ----------------------------------------------------------------------

export const Extension = ({ extensionList, token, loadExtensionVersions, isVersionsLoading, isReviewsLoading, loadExtensionReview }) => {
  const { id } = useParams();
  const [currentExtension, setCurrentExtension] = useState();
  const [rejectedVersion, setRejectedVersion] = useState();
  const [approvedVersion, setApprovedVersion] = useState();

  //Load versions review
  useEffect(() => {
    const load = async () => {
      await loadExtensionReview(token, id);
    }

    if (currentExtension && currentExtension.versions && !isReviewsLoading) {
      load();
    }
  }, [currentExtension])

  //Load extension versions
  useEffect(() => {
    const load = async () => {
      await loadExtensionVersions(token, id);
    }

    if (currentExtension && !currentExtension.versions && !isVersionsLoading) {
      load();
    }
  }, [currentExtension]);

  // Set current extension in state
  useEffect(() => {
    if (extensionList && extensionList.length > 0) {
      const extension = find(extensionList, (ext) => ext.id === id);
      console.log(extension);
      setCurrentExtension(extension);
    }
  }, [extensionList, currentExtension]);

  //Get number of rejections
  useEffect(() => {
    if (currentExtension && currentExtension.versions && currentExtension.versions.length > 0) {
      browseRevisions();
    }
  }, [currentExtension]);

  const browseRevisions = () => {
    const rejections = [];
    const approvals = [];

    for (const version of currentExtension.versions) {
      if (version.reviews) {
        rejections.push(...version.reviews.filter((review) => review.status === 'rejected'));
        approvals.push(...version.reviews.filter((review) => review.status !== 'rejected'));
      }
    }
    setRejectedVersion(rejections);
    setApprovedVersion(approvals);
  }

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        {currentExtension && (<>
          <Typography variant="h4" sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ mr: 1, ml: 1 }} alt={currentExtension.name.en} src={currentExtension.icon.en} />
            {currentExtension.name.en}
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6}>
              <Card>
                <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Information
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={6}>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        Details
                      </Typography>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Description
                      </Typography>
                      <Typography variant="body2" gutterBottom sx={{ mb: 1 }}>
                        {currentExtension.description.en}
                      </Typography>

                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Creation Date
                      </Typography>
                      <Typography variant="body2" gutterBottom sx={{ mb: 1 }}>
                        {moment(currentExtension.createdAt).format('ddd DD MMM YYYY')}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {' '}
                      </Typography>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Visibility / Availability
                      </Typography>
                      <Typography variant="body2" gutterBottom sx={{ mb: 1 }}>
                        {currentExtension.public ? "Public" : "Private"} / {currentExtension.availability === 'open' ? "Open" : "Marketplace"}
                      </Typography>

                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Category
                      </Typography>
                      <Typography variant="body2" gutterBottom sx={{ mb: 1 }}>
                        {currentExtension.category}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary title="Versions" total={currentExtension && currentExtension.versions ? currentExtension.versions.length : 0} color="info" icon={'system-uicons:version'} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary title="Rejections" total={rejectedVersion ? rejectedVersion.length : 0} color={rejectedVersion && rejectedVersion.length > 0 ? "error" : "info"} icon={'bx:comment-error'} />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
              {currentExtension.versions && (
                <AppCalendar
                  title="Version creation"
                  subheader="Creation over last year"
                  list={currentExtension.versions}
                  color="nivo"
                />
              )}
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              {currentExtension.reviews && (
                <AppPie
                  title="Review repartition"
                  subheader="Validated vs. Rejected"
                  list={currentExtension.reviews}
                  splitAttribute='status'
                />
              )}
            </Grid>
          </Grid>
        </>
        )}

      </Container>
    </Page >
  );
}
