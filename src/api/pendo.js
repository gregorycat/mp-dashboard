import axios from 'axios';

export const createFeature = async (featureName, extensionId) => {
    const { data } = await axios.post('http://localhost:5000/api/pendo-feature', {
        name: featureName,
        extensionId
    });

    console.log(data);

    return data;
}

