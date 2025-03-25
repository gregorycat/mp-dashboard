import axios from 'axios';

const BASE_URL = 'https://go-shared-services.api.lumapps.com';
const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6InN5bi1rZXktdjAifQ.eyJqdGkiOiJjMGIyMDk2Ni04OTM3LTQyM2QtYWYzZS1lYWIwYzBlZDVhN2MiLCJpc3MiOiJodHRwczovL2xvZ2luLmx1bWFwcHMuY29tL3YxIiwiaWF0IjoxNjczMzM5ODU0LCJleHAiOjE2NzMzNDM0NTQsImF1ZCI6Imh0dHBzOi8vc2l0ZXMtZXUubHVtYXBwcy5jb20vX2FoL2FwaS9sdW1zaXRlcyIsInN1YiI6IjUzMDYxNjY1Mjg3MDQ1MTIiLCJvcmdhbml6YXRpb25JZCI6IjQ5NzA5NTU5MDc1MzA3NTIiLCJlbWFpbCI6ImdyZWdvcnlAbHVtYXBwcy5jb20iLCJpc09yZ0FkbWluIjp0cnVlfQ.pgSqw0SuR3R_FH2CNAphcZGgh-vlfrO3reM992zGtV8f0y1PM1DNnMuK66DpX4ZW4aalidy0sSVqk523QzXraYFaqZkoZ0Vd_IDK04l4aMutHNPc6NJ8dlrk-hItXKsJt9t61YzaSEPl1caYOp7KOT5EkOKZBhbc4mw1XtAxky6F_7-ltGLOE3AiTv1OFzrYBcmCX4GDSUta0yAyPTjIdzwNr_kmS_EyXwGiHc55O7sLS8e_bA6ZX5F5-U0lZ0tfqjTkBf_wGkMDfFEZvGrTW8wAtxUm1BNLgowGQ_9TKVybXF_o-O28qlIZg5YsjPCoPWz57ZI1MKBeMGOLw_4A0c-GXpjgwtYjNN2RJuvbnXTyeU4TJGdBUNii4RCcrqCs5vC4ZFo_RSku4lsuIPQ8v4urUks9B7JYXc8QnW_S3dGxDwGa3IfCaXDjCj08VAyBJIWsXFoIrCwXfiYMfbHtdKVbh8phx8Y76ikb3giS2er1XRfdPhXLRzKuig_UgcwZv2TUWhkDJNa2wX-hJVu6YeRQGfQWiEeb4iptpd1JJnVQcFC0qkSBPl0eI2k3fTbVKeRjqYuW4gfO1C92emTeIrbMdI-tnaYSvtAV_G44CMsNw1gGbZlqV9gQtTaFglRGsnQcMeCns9G7PT78CGPie9FP0aXok1tCkVGuNaCJqo8';

const getInstance = (token) => {
    return axios.create({
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
}

const loadPublishers = async (token, cursor) => {
    let param = '';

    if (cursor) {
        param = `&cursor=${cursor}`;
    }

    const { data } = await getInstance({ token }).get(`${BASE_URL}/v2/partners?maxResults=100${param}`);

    if (data) {
        return {
            partners: data.items,
            more: data.more,
            cursor: data.cursor
        }
    }
}

const loadExtensions = async (token, publisherId, cursor) => {
    let param = '';

    if (cursor) {
        param = `&cursor=${cursor}`;
    }
    if (publisherId) {
        param = `$partnerIds=${publisherId}`;
    }

    const { data } = await getInstance({ token }).get(`${BASE_URL}/v2/extensions?maxResults=100${param}`);

    if (data) {
        return {
            items: data.items,
            more: data.more,
            cursor: data.cursor
        }
    }
}

const loadVersions = async (token, extensionId, cursor) => {
    let param = '';

    if (cursor) {
        param = `&cursor=${cursor}`;
    }

    const { data } = await getInstance({ token }).get(`${BASE_URL}/v2/extensions/${extensionId}/versions?maxResults=100${param}`);

    if (data) {
        return {
            versions: data.items,
            more: data.more,
            cursor: data.cursor
        }
    }
}

const loadReviews = async (token, extensionId, versionId, cursor) => {
    let param = '';

    if (cursor) {
        param = `&cursor=${cursor}`;
    }

    const { data } = await getInstance({ token }).get(`${BASE_URL}/v2/extensions/${extensionId}/versions/${versionId}/reviews?maxResults=100${param}`);

    if (data) {
        return {
            reviews: data.items,
            more: data.more,
            cursor: data.cursor
        }
    }
}


const fetchAllPublisher = (token, publishers) => {
    const publisherData = loadPublishers(token);

    publishers.push(publisherData);

    if (publisherData.more) {
        return fetchAllPublisher(token, publishers);
    }

    return publishers;
}


const publisherArray = [];
const data = fetchAllPublisher(TOKEN, publisherArray);

console.log(data);

