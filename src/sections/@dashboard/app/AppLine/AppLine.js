// React
import { useEffect, useState } from 'react';
//lodash
import { sortBy, includes } from 'lodash';
// @mui
import PropTypes from 'prop-types';
import { Card, CardHeader, CircularProgress, Box, Chip } from '@mui/material';
import { CalendarMonth, AllInclusive } from '@mui/icons-material';
import { ResponsiveLine } from '@nivo/line';
import moment from 'moment';
import { lumappsPublishers } from '../../../../constants';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------



export const AppLine = ({ title, subheader, list, dateRange, displayLumAppsPublisher, ...other }) => {
    const [serie, setSerie] = useState();
    const [isSerieLoading, setSerieLoading] = useState(false);

    useEffect(() => {
        if (list && list.length > 0) {
            setSerieLoading(true)

            const data = [];
            let count = 0;
            const sortedList = sortBy(list, (entry) => new Date(entry.createdAt));

           /*  let minDate;
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

            const filteredList = filter(sortedList, (item) => {
                if (dateRange === 'all') {
                    return true;
                }

                return moment(item.createdAt).isAfter(minDate);
            })
 */

            sortedList.forEach((entry) => {
                if (displayLumAppsPublisher || !includes(lumappsPublishers, entry.partnerId)) {
                    count += 1;

                    data.push({
                        x: new Date(entry.createdAt),
                        y: count,
                        key: entry.name.en,
                    });
                }
            });


            const dataSerie = {
                id: 'list',
                key: 'list',
                data,
            };

            setSerie(dataSerie);
            setSerieLoading(false)
        }
    }, [list, dateRange, displayLumAppsPublisher]);

    return (
        <Card {...other}>
            <CardHeader title={title} subheader={subheader} />

            <Box sx={{ p: 3, pb: 1, height: 390 }} dir="ltr">
                {isSerieLoading && (
                    <CircularProgress />
                )}
                {!isSerieLoading && serie && (
                    <ResponsiveLine
                        data={[serie]}
                        animate={false}
                        pointSize={0}
                        enableSlices="x"
                        theme={{
                            textColor: '#949494',
                        }}
                        enableGridX={false}
                        colors={{ scheme: 'category10' }}
                        enableArea
                        margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
                        curve="basis"
                        xScale={{
                            type: 'time',
                            precision: 'day',
                        }}
                        axisBottom={{
                            format: '%b %Y',
                            tickValues: 'every 1 month',
                            legendOffset: -12,
                        }}
                        xFormat="time:%Y-%m-%d"
                        sliceTooltip={({ slice }) => {
                            return (
                                <div
                                    style={{
                                        background: 'white',
                                        padding: '9px 12px',
                                        border: '1px solid #ccc',
                                    }}
                                >
                                    <div>
                                        <b>{slice.points[0].data.xFormatted}</b>
                                    </div>
                                    {slice.points.map((point) => (
                                        <div
                                            key={point.id}
                                            style={{
                                                color: point.serieColor,
                                                padding: '3px 0',
                                            }}
                                        >
                                            <strong>{point.serieId}</strong> {point.data.yFormatted}
                                        </div>
                                    ))}
                                </div>
                            );
                        }}
                    />
                )}
            </Box>
        </Card>
    );
}

AppLine.propTypes = {
    color: PropTypes.string,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    sx: PropTypes.object,
};

