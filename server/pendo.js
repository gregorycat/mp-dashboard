const pendoAppSetup = async (jwt) => {
    const response = await fetch("https://app.eu.pendo.io/api/appsetup", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "fr-FR,fr;q=0.9,en;q=0.8,ja;q=0.7",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Linux\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-adopt-v2": "true",
            "x-pendo-xsrf-token": "73b4bb36-1c19-426f-4efc-68939264078b",
            "cookie": `pendo.sess.jwt2=${jwt}`,
            "Referer": "https://app.eu.pendo.io/in-app-designer/latest/app/login",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
    });

    const jsonData = await response.json();

    return {
        subscriptionId: jsonData.subapps[0].subscriptionId,
        appId: jsonData.subapps[0].id,
    };
}

const createFeature = async (jwt, subscriptionId, name, appId, extensionId) => {
    console.log(`{\"elementPathRules\":[\"[data-id=\\\"marketplace-extension-content-${extensionId}\\\"]\"],\"name\":\"${name}",\"eventPropertyConfigurations\":[],\"suggestedMatch\":\"[data-id=\\\"layout-row0\\\"]\",\"elementInitialTag\":\"DIV\",\"elementSelectionType\":\"custom\",\"createdDesignerVersion\":\"4.2.3\",\"appId\":${appId}}`);
    const response = await fetch(`https://app.eu.pendo.io/api/s/${subscriptionId}/feature?includeMobileRuleset=1`, {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "fr-FR,fr;q=0.9,en;q=0.8,ja;q=0.7",
            "cache-control": "no-cache",
            "content-type": "application/json",
            "pragma": "no-cache",
            "sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Linux\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-adopt-v2": "true",
            "x-pendo-xsrf-token": "73b4bb36-1c19-426f-4efc-68939264078b",
            "cookie": `pendo.sess.jwt2=${jwt}`,
            "Referer": "https://app.eu.pendo.io/in-app-designer/latest/feature/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        //"body": `"${JSON.stringify(JSON.stringify(featurePayload))}"`,
        "body": `{\"elementPathRules\":[\"[data-id=\\\"marketplace-extension-content-${extensionId}\\\"]\"],\"name\":\"${name}",\"eventPropertyConfigurations\":[],\"suggestedMatch\":\"[data-id=\\\"layout-row0\\\"]\",\"elementInitialTag\":\"DIV\",\"elementSelectionType\":\"custom\",\"createdDesignerVersion\":\"4.2.3\",\"appId\":${appId}}`,
        "method": "POST"
    });

    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData.id;
}

const addToProductArea = async (jwt, subscriptionId, productAreaId, featureId) => {
    const response = await fetch(`https://app.eu.pendo.io/api/s/${subscriptionId}/group/${productAreaId}/feature/${featureId}`, {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "fr-FR,fr;q=0.9,en;q=0.8,ja;q=0.7",
            "cache-control": "no-cache",
            "content-type": "application/json",
            "pragma": "no-cache",
            "sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Linux\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-adopt-v2": "true",
            "x-pendo-xsrf-token": "73b4bb36-1c19-426f-4efc-68939264078b",
            "cookie": `pendo.sess.jwt2=${jwt}`,
            "Referer": "https://app.eu.pendo.io/in-app-designer/latest/feature/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": "null",
        "method": "PUT"
    });

    const jsonData = await response.json();
    return jsonData
}

const processPendoFeatureCreation = async (jwt, featureName, extensionId) => {
    const pendoSetup = await pendoAppSetup(jwt);
    const featureId = await createFeature(jwt, pendoSetup.subscriptionId, featureName, pendoSetup.appId, extensionId);
    //await applyFeature(pendoSetup.subscriptionId,featureId);
    const result = await addToProductArea(jwt, pendoSetup.subscriptionId, 'lpk6GXgV7HhaTvtdbP78xk8P070', featureId);

    return result;
}


exports.processPendoFeatureCreation = processPendoFeatureCreation