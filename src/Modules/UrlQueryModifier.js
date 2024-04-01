export function modifyQuery(url, property, value) {
    // Prepare first part of the url
    let newUrl =  new URL(url).origin + new URL(url).pathname;

    // Extract the query part
    const query = new URLSearchParams(url.split('?')[1]);

    // Changing property value
    query.set(property, value);

    newUrl += '?' + query.toString();

    return newUrl

}