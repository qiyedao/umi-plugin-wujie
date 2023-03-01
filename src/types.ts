export type HistoryType = 'browser' | 'hash';

export type App = {
    name: string;
    entry: string | { scripts: string[]; styles: string[] };
    base?: string | string[];
    history?: HistoryType;
    // 取 entry 时是否需要开启跨域 credentials
    credentials?: boolean;
    props?: any;
    height?: string;
    width?: string;
    loading?: Element;
    alive?: boolean;
    fetch?: Function;
    replace?: Function;
    sync?: boolean;
    prefix?: object;
    fiber?: boolean;
    degrade?: boolean;
    plugins?: any[];
    beforeLoad?: Function;
    beforeMount?: Function;
    afterMount?: Function;
    beforeUnmount?: Function;
    afterUnmount?: Function;
    activated?: Function;
    deactivated?: Function;
    loadError?: Function;
};
export type MasterOptions = {
    apps?: App[];
    masterHistoryType?: HistoryType;
    base?: string;
};
