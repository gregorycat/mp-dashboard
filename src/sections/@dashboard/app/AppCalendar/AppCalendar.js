// React
import { useEffect, useState } from 'react';
//lodash
import { countBy, sortBy, filter, includes } from 'lodash';
// @mui
import PropTypes from 'prop-types';
import { Card, CardHeader, CircularProgress, Box } from '@mui/material';
import { ResponsiveCalendarCanvas } from '@nivo/calendar';
import moment from 'moment';

import { lumappsPublishers } from '../../../../constants';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------


export const AppCalendar = ({ title, subheader, displayLumAppsPublisher, list, ...other }) => {
    const [serie, setSerie] = useState();
    const [isSerieLoading, setSerieLoading] = useState(false);

    useEffect(() => {
        let microApps = list;
        if (list && list.length > 0) {
            setSerieLoading(true)

            if (!displayLumAppsPublisher) {
                microApps = filter(list, (microApps) => {
                    return !includes(lumappsPublishers, microApps.partnerId)
                  })
            }

            const aggregation = countBy(microApps, (entry) => {
                return entry.createdAt.split('T')[0];
            });
            const data = [];
            const keys = Object.keys(aggregation);
            const values = Object.values(aggregation);

            keys.forEach((key, index) => {
                data.push({
                    value: values[index],
                    day: key
                })
            });

            const sortedData = sortBy(data, (value) => {
                return new Date(value.day);
            });

            setSerie(sortedData);
            setSerieLoading(false)
        }
    }, [list, displayLumAppsPublisher]);

    const CustomTooltip = data => {
        if (data.value === undefined) {
            return null;
        }

        const date = moment(data.day).format('DD/MM/YYYY')

        return (
            <span style={{ color: data.color, backgroundColor: 'black', padding: '10px' }}>
                {date} : {data.value}
            </span>
        )
    }


    return (
        <Card {...other}>
            <CardHeader title={title} subheader={subheader} />

            <Box sx={{ p: 3, pb: 1, height: 390 }} dir="ltr">
                {isSerieLoading && (
                    <CircularProgress />
                )}
                {!isSerieLoading && serie && serie.length > 0 && (
                    <ResponsiveCalendarCanvas
                        data={serie}
                        from={moment().subtract('year', 1).format('YYYY-MM-DD')}
                        to={moment().format('YYYY-MM-DD')}
                        emptyColor="#eeeeee"
                        colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
                        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                        yearSpacing={40}
                        monthBorderColor="#ffffff"
                        dayBorderWidth={2}
                        dayBorderColor="#ffffff"
                        tooltip={CustomTooltip}
                        legends={[
                            {
                                anchor: 'bottom',
                                direction: 'row',
                                translateY: 36,
                                itemCount: 4,
                                itemWidth: 42,
                                itemHeight: 36,
                                itemsSpacing: 14,
                                itemDirection: 'right-to-left'
                            }
                        ]}
                    />
                )}
            </Box>
        </Card>
    );
}

AppCalendar.propTypes = {
    color: PropTypes.string,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    sx: PropTypes.object,
};

