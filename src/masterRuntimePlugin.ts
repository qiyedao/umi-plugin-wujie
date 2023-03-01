import { ApplyPluginsType, IRoute, plugin } from 'umi';
import { getMasterOptions, setMasterOptions } from '@@/plugin-wujie/masterOptions';
import { getMicroAppRouteComponent } from './getMicroAppRouteComponent';
import { MasterOptions } from './types';

export async function render(oldRender: any) {
    async function getMasterRuntime() {
        const config = await plugin.applyPlugins({
            key: 'wujie',
            type: ApplyPluginsType.modify,
            initialValue: {},
            async: true
        });
        const { master } = config;
        return master || config;
    }
    const runtimeOptions = await getMasterRuntime();
    let masterOptions: MasterOptions = {
        ...getMasterOptions(),
        ...runtimeOptions
    };

    const masterApps = masterOptions.apps || [];
    const credentialsApps = masterApps.filter(app => app.credentials);
    if (credentialsApps.length) {
        const defaultFetch = masterOptions.fetch || window.fetch;
        const fetchWithCredentials = (url: string, init?: RequestInit) => {
            // 如果当前 url 为 credentials 应用的 entry，则为其加上 cors 相关配置
            if (credentialsApps.some(app => app.entry === url)) {
                return defaultFetch(url, {
                    ...init,
                    mode: 'cors',
                    credentials: 'include'
                });
            }

            return defaultFetch(url, init);
        };

        // 设置新的 fetch
        masterOptions = { ...masterOptions, fetch: fetchWithCredentials };
    }

    setMasterOptions(masterOptions);

    oldRender();
}

export function patchRoutes(originRoute: IRoute) {
    const { apps = [], masterHistoryType, base, fetch } = getMasterOptions();

    originRoute?.routes?.forEach(route => {
        if (route.microApp) {
            const curr = apps.find(item => item.name == route.microApp);
            route.component = getMicroAppRouteComponent({
                appName: route.name,
                base,
                masterHistoryType,

                routeProps: { url: curr.entry, ...curr, fetch }
            });
        }

        if (route.routes?.length) {
            patchRoutes(route);
        }
    });

    return originRoute;
}
