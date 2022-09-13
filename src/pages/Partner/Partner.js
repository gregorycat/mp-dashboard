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

import { AppPie } from 'src/sections/@dashboard/app/AppPie';
import { AppLine } from 'src/sections/@dashboard/app/AppLine';
import { AppTableExtension } from 'src/sections/@dashboard/app/AppTableExtension';


// ----------------------------------------------------------------------

export const Partner = ({ partnersList, loadPartnerVersions, isVersionsLoading, token }) => {
  const { id } = useParams();
  const [extensionDraft, setExtensionDraft] = useState([]);
  const [extensionDeployed, setExtensionDeployed] = useState([]);
  const [extensionNoVersion, setExtensionNoVersion] = useState([]);
  const [currentPartner, setCurrentPartner] = useState();

  const getDeployedExtensions = () => {
    const deplyedExtensions = [];

    currentPartner.extensions.forEach((extension) => {
      const deployedVersion = find(extension.versions, (version) => {
        return version.status === 'deployed';
      });

      if (deployedVersion) {
        deplyedExtensions.push(extension);
      }

    });

    setExtensionDeployed(deplyedExtensions);
  }

  const loadExtensionVersion = async () => {
    await loadPartnerVersions(token, currentPartner.id);
  }

  useEffect(() => {
    if (currentPartner && !currentPartner.versionsLoaded && !isVersionsLoading) {
      loadExtensionVersion();
    }
  }, [currentPartner, isVersionsLoading])

  useEffect(() => {
    if (partnersList && partnersList.length > 0) {
      const partner = find(partnersList, (partner) => partner.id === id);
      setCurrentPartner(partner);
    }
  }, [partnersList, currentPartner]);

  const getExtensionInDraft = () => {
    const array = filter(currentPartner.extensions, (extenson) => {
      return extenson.version && extenson.version.status === 'draft';
    });

    setExtensionDraft(array);
  }

  const getExtensionWithNoVersion = () => {
    const array = filter(currentPartner.extensions, (extension) => {
      return !extension.version;
    });

    setExtensionNoVersion(array);
  }

  useEffect(() => {
    if (currentPartner && currentPartner.extensions.length > 0 && (extensionDraft.length === 0 || extensionNoVersion.length === 0)) {
      getExtensionInDraft();
      getExtensionWithNoVersion();
    }
  }, [currentPartner]);

  useEffect(() => {
    if (currentPartner && currentPartner.extensions.length > 0 && currentPartner.versionsLoaded && extensionDeployed.length === 0) {
      getDeployedExtensions();
    }
  })

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        {currentPartner && (<>
          <Typography variant="h4" sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ mr: 1, ml: 1 }} alt={currentPartner.name.en} src={currentPartner.icon.en} />
            {currentPartner.name.en}
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
                        {currentPartner.description.en}
                      </Typography>

                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Creation Date
                      </Typography>
                      <Typography variant="body2" gutterBottom sx={{ mb: 1 }}>
                        {moment(currentPartner.createdAt).format('ddd DD MMM YYYY')}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        Contact
                      </Typography>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Website
                      </Typography>
                      <Typography variant="body2" gutterBottom sx={{ mb: 1 }}>
                        {currentPartner.contact.website && (
                          <Link href={currentPartner.contact.website} underline="none" target="_blank">{currentPartner.contact.website}</Link>
                        )}
                        {!currentPartner.contact.website && 'N/A'}
                      </Typography>

                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Email
                      </Typography>
                      <Typography variant="body2" gutterBottom sx={{ mb: 1 }}>
                        {currentPartner.contact.email || 'N/A'}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary title="Extensions" total={currentPartner.extensions.length} color="info" icon={'ant-design:appstore-outlined'} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary title="Extensions available in production" total={extensionDeployed.length} color="success" icon={'ant-design:appstore-add-outlined'} />
            </Grid>

            <Grid item xs={12} md={6} lg={12}>
              <AppLine
                title="Extension creation"
                subheader="Creation over time"
                dateRange="all"
                list={currentPartner.extensions}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              <AppTableExtension list={currentPartner.extensions} />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AppPie
                title="Extension repartition"
                subheader="Repartition by categories"
                list={currentPartner.extensions}
                splitAttribute='category'
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AppPie
                title="Extension repartition"
                subheader="Public vs. Private"
                list={currentPartner.extensions}
                splitAttribute='public'
                color="category10"
                labelCompute={(attributeValue) => { return attributeValue === 'true' ? 'Public' : 'Private' }}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AppPie
                title="Extension repartition"
                subheader="Open vs. Marketplace"
                list={currentPartner.extensions}
                splitAttribute='availability'
                color="set1"
                labelCompute={(attributeValue) => { return attributeValue === 'open' ? 'Open' : 'Marketplace' }}
              />
            </Grid>

          </Grid>
        </>
        )}

      </Container>
    </Page >
  );
}
