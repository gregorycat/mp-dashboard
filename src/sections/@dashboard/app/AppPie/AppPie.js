// React
import { useEffect, useState } from 'react';
//lodash
import { countBy } from 'lodash';
// @mui
import PropTypes from 'prop-types';
import { Card, CardHeader, CircularProgress, Box } from '@mui/material';
import { ResponsivePie } from '@nivo/pie';


// ----------------------------------------------------------------------

// ----------------------------------------------------------------------


export const AppPie = ({ title, subheader, list, splitAttribute, concatAttributes, labelCompute, color, ...other }) => {
    const [serie, setSerie] = useState();

    const [isSerieLoading, setSerieLoading] = useState(false);

    useEffect(() => {
        if (list && list.length && concatAttributes) {
            setSerieLoading(true);
            const aggregation = {
                'public / open': 0,
                'public / marketplace': 0,
                'private / open': 0,
                'private / marketplace': 0,
            }
            console.log('__________________________')
            list.forEach(element => {
                if (element.public && element.availability === 'open') {
                    aggregation['public / open'] += 1;
                } else if (element.public && element.availability === 'marketplace') {
                    aggregation['public / marketplace'] += 1;
                } else if (!element.public && element.availability === 'open') {
                    aggregation['private / open'] += 1;
                } else if (!element.public && element.availability === 'marketplace') {
                    aggregation['private / marketplace'] += 1;
                }
            });

            const data = [];
            const keys = Object.keys(aggregation);
            const values = Object.values(aggregation);

            keys.forEach((key, index) => {
                data.push({
                    id: labelCompute ? labelCompute(key) : key,
                    label: labelCompute ? labelCompute(key) : key,
                    value: values[index], 
                })
            });

            setSerie(data);
            setSerieLoading(false)
        }
    }, [concatAttributes, labelCompute, list])

    useEffect(() => {
        if (list && list.length > 0 && !concatAttributes) {
            setSerieLoading(true)
            const aggregation = countBy(list, (entry) => {
                return entry[splitAttribute];
            });

            const data = [];
            const keys = Object.keys(aggregation);
            const values = Object.values(aggregation);

            keys.forEach((key, index) => {
                data.push({
                    id: labelCompute ? labelCompute(key) : key,
                    label: labelCompute ? labelCompute(key) : key,
                    value: values[index], 
                })
            });

            setSerie(data);
            setSerieLoading(false)
        }
    }, [list]);

    return (
        <Card {...other}>
            <CardHeader title={title} subheader={subheader} />

            <Box sx={{ p: 3, pb: 1, height: 390 }} dir="ltr">
                {isSerieLoading && (
                    <CircularProgress />
                )}
                {!isSerieLoading && serie && (
                    <ResponsivePie
                        data={serie}
                        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                        innerRadius={0.5}
                        padAngle={0.7}
                        cornerRadius={3}
                        activeOuterRadiusOffset={8}
                        borderWidth={1}
                        colors={{ scheme: color || 'nivo' }}
                        borderColor={{
                            from: 'color',
                            modifiers: [
                                [
                                    'darker',
                                    0.2
                                ]
                            ]
                        }}
                        arcLinkLabelsSkipAngle={10}
                        arcLinkLabelsTextColor="#333333"
                        arcLinkLabelsThickness={2}
                        arcLinkLabelsColor={{ from: 'color' }}
                        arcLabelsSkipAngle={10}
                        arcLabelsTextColor={{
                            from: 'color',
                            modifiers: [
                                [
                                    'darker',
                                    2
                                ]
                            ]
                        }}
                        defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                size: 4,
                                padding: 1,
                                stagger: true
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10
                            }
                        ]}                        
                        legends={[
                            {
                                anchor: 'bottom',
                                direction: 'row',
                                justify: false,
                                translateX: 0,
                                translateY: 56,
                                itemsSpacing: 0,
                                itemWidth: 100,
                                itemHeight: 18,
                                itemTextColor: '#999',
                                itemDirection: 'left-to-right',
                                itemOpacity: 1,
                                symbolSize: 18,
                                symbolShape: 'circle',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemTextColor: '#000'
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

AppPie.propTypes = {
    color: PropTypes.string,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    sx: PropTypes.object,
};

