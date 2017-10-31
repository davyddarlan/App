export class Player {
    version: string = '1.0.0';
    name: string = 'SE/UNA-SUS LocalStorage Player';
    state: any = -1;
    last_error: any = 0;
    user_info: any = null;
    config: any = null;
    _STATE = {
        NOT_INITIALIZED: -1,
        RUNNING: 0,
        TERMINATED: 1,
    };

    getItem(item: any): any {
	}

    setItem(item: any, valor: any): any {
    }

    getPlayerUser(): any {
        return this.user_info;
    }

    getPlayerVersion(): string {
        return this.version;
    }

    getPlayerName(): string {
        return this.name;
    }

    getBasename(): any {
		if (this.state === this._STATE.RUNNING) {
            return this.config["Persistence"]["InstitutionAcronym"] + "_" + 
            this.config["Persistence"]["Version"] + "_" + 
            this.config["Persistence"]["Name"] + "_";
		} else {
			return false;
		}
 	}
    
    getVideoResolutions(): any {
	    return this.config["Video"]["Resolutions"];
	}
}