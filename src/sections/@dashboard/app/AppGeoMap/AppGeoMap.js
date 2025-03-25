// React
import { useEffect, useState } from 'react';
//lodash
import { sortBy, includes } from 'lodash';
// @mui
import PropTypes from 'prop-types';
import { Card, CardHeader, CircularProgress, Box, Chip } from '@mui/material';
import { ResponsiveChoropleth } from '@nivo/geo';
import { lumappsPublishers } from '../../../../constants';
import mapFeature from './mapFeature.json';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export const AppGeoMap = ({ title, subheader="", data, ...other }) => {
    
    return (
        <Card {...other}>
            <CardHeader title={title} subheader={subheader} />

            <Box sx={{ p: 3, pb: 1, height: 390 }} dir="ltr">
                {data && (
                    <ResponsiveChoropleth
                        data={data}
                        features={mapFeature.features}
                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                        colors="GnBu"
                        domain={[0, 60]}
                        unknownColor="#757575"
                        fillColor="#000000"
                        label="properties.name"
                        valueFormat=".2s"
                        projectionType="mercator"
                        projectionScale={100}
                        projectionTranslation={[0.5, 0.5]}
                        projectionRotation={[0, 0, 0]}
                        enableGraticule={true}
                        graticuleLineColor="#dddddd"
                        borderWidth={0.5}
                        borderColor="#152538"
                        legends={[
                            {
                                anchor: 'bottom-left',
                                direction: 'column',
                                justify: true,
                                translateX: 30,
                                translateY: -20,
                                itemsSpacing: 0,
                                itemWidth: 94,
                                itemHeight: 18,
                                itemDirection: 'left-to-right',
                                itemTextColor: '#444444',
                                itemOpacity: 0.85,
                                symbolSize: 18,
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemTextColor: '#000000',
                                            itemOpacity: 1
                                        }
                                    }
                                ]
                            }
                        ]}
                    />
                )}
            </Box>
        </Card>
    );
}

AppGeoMap.propTypes = {
    title: PropTypes.string.isRequired,
    //data: PropTypes.array.isRequired,
};

