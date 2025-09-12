// This Worker is configured to serve static assets from the 'public' directory
// via the wrangler.toml file. You can add logic here to handle API routes
// or dynamic requests that don't correspond to a static file.
// For example, to return a custom 404 page:

import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

export default {
    async fetch(event) {
        try {
            return await getAssetFromKV(event);
        } catch (e) {
            let pathname = new URL(event.request.url).pathname;
            return new Response(`"${pathname}" not found`, {
                status: 404,
                statusText: 'Not Found',
            });
        }
    }
};