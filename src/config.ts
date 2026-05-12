import fs from "fs";
import path from "path";
import os from "os";

type Config = {
    dbUrl: string;
    currentUserName: string;
};


function getConfigFilePath(): string {
    const homeDir = os.homedir();
    const configFilePath = path.join(homeDir, '.gatorconfig.json');
    return configFilePath;
}

function writeConfig(cfg: Config): void {
    const configFilePath = getConfigFilePath();
    const rawConfig = {
        db_url: cfg.dbUrl,
        current_user_name: cfg.currentUserName,
    };
    fs.writeFileSync(configFilePath, JSON.stringify(rawConfig, null, 2), 'utf-8');
}

function validateConfig(rawConfig: any): Config {
    if (typeof rawConfig !== 'object' || rawConfig === null) {
        throw new Error('Invalid configuration format: expected an object.');
    }
    if (typeof rawConfig.db_url !== 'string') {
        throw new Error('Invalid configuration: "dbUrl" must be a string.');
    }
    const config: Config = {
        dbUrl: rawConfig.db_url,
        currentUserName: rawConfig.current_user_name || '',
    };
    return config;
}

export function readConfig(): Config {
    const configFilePath = getConfigFilePath();
    const configContent = fs.readFileSync(configFilePath, 'utf-8');
    const rawConfig = JSON.parse(configContent);
    const config = validateConfig(rawConfig);
    return config;
}


export function setUser(userName: string) {
    const config = readConfig();
    config.currentUserName = userName;
    writeConfig(config);
}
