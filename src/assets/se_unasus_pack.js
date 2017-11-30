window.addEventListener('load', function() {
	window.parent.postMessage('open', '*');
});

window.addEventListener('message', function(response) {
	if (response.data = 'remove') {
		console.log('executar remoção');
	}
});

window['SE_UNASUS_PLAYER_API'] = {
    _STATE: {
        NOT_INITIALIZED: -1,
        RUNNING: 0,
        TERMINATED: 1,
    },
    _get_user_data: function () {
		var user_data = new Object();
		user_data['Id'] = 2016;
		user_data['RealName'] = 'Fulano de Tal';
        return user_data;
    },	
    version: "1.0.0",
    name: "SE/UNA-SUS Player",
    state: -1,
    debug: true,
    last_error: 0,
    user_info: null,
    UUID: null,
    cached: false, 
	config: null,
    debugMessage: function (strlog) {
    },
	getLastError: function() {
		return this.last_error;
	},
    initialize: function () {		
		if (!window.localStorage) {
            this.last_error = 'SE/UNA-SUS LocalStorage Player: LocalStorage não disponível, utilize outro navegador.';
            return false;			
		}
        if (this.state === this._STATE.RUNNING) {
            return true;
        }
        if (this.state === this._STATE.TERMINATED) {
            this.last_error = 'SE/UNA-SUS LocalStorage Player: Não inicializado.';
            return false;
        }
        var userdata = this._get_user_data();
        if (userdata === false) {
            this.last_error = 'SE/UNA-SUS LocalStorage Player: Erro ao obter informações do usuário.';
            return false;
        } else {
			if (this.debug)		
            this.user_info = userdata;
        }
        this.state = this._STATE.RUNNING;
        this.last_error = false;
        return true;
    },
    terminate: function () {
        if (this.state === this._STATE.NOT_INITIALIZED) {
            this.last_error = 'SE/UNA-SUS LocalStorage Player: Não inicializado.';
            return false;
        }
        if (this.state === this._STATE.TERMINATED) {
            this.last_error = 'SE/UNA-SUS LocalStorage Player: Já finalizado.';
            return false;
        }		
        this.state = this._STATE.TERMINATED;
        var ret = this.setItem('SE/UNA-SUS LocalStorage Player', '{"Status":"' + this.state + '"}');
        if (!ret) {
            this.last_error = 'SE/UNA-SUS LocalStorage Player: Erro ao gravar finalização.';
            return false;			
        }
        if (this.debug)
        return true;
    },
	getItem: function(Item) {
		return JSON.parse(localStorage.getItem(Item));
	},
	setItem: function(Item, Valor) {
		localStorage.setItem(Item, JSON.stringify(Valor));
		var obj  = {
			type: 'ppu',
			name: Item, 
			valor: Valor
		}
		window.addEventListener('load', function() {
			window.parent.postMessage(JSON.stringify(obj), '*');
		});
	},
    getPlayerUser: function () {
        return this.user_info;
    },
    getPlayerVersion: function () {
        return this.version;
    },
    getPlayerName: function () {
        return this.name;
    },
	getBasename: function () {
		if (this.state === this._STATE.RUNNING) {
			return this.config['Persistence']['InstitutionAcronym'] + '_' + 
			this.config['Persistence']['Version'] + '_' + this.config['Persistence']['Name'] + '_';
		} else {
			return false;
		}
 	},
	getVideoResolutions: function () {
		return this.config['Video']['Resolutions'];
	}	
};

function SE_UNASUS_PACK() {
	this._initialized = false;
}

SE_UNASUS_PACK.prototype._findAPI = function(win) {
	var findAPITries = 0;
	try {
		while ((win.SE_UNASUS_PLAYER_API == null) && (win.parent != null) && (win.parent != win))
		{	
			findAPITries++;	
			if (findAPITries > 500)
			{
				this._errorMessage = 'Erro ao procurar API.';
				this.alertMessage(this._errorMessage);
			}
			win = win.parent;
	   }
	   return win.SE_UNASUS_PLAYER_API;
   } catch (e){
	   this._errorMessage = 'Erro ao procurar API, utilize outro navegador.';
	   this.alertMessage(this._errorMessage);
	   return null;
   }
}

SE_UNASUS_PACK.prototype._getAPI = function() {
	var theAPI = this._findAPI(window);
	if (theAPI == null) {
		return false;
	} else {
		return theAPI;
	}
}

SE_UNASUS_PACK.prototype._loadJSON = function(filePath) {
	var load = null;
	try {
		var xmlhttp=new XMLHttpRequest();
		xmlhttp.open("GET",filePath,false);
		xmlhttp.overrideMimeType("application/json");
		xmlhttp.send();
		if (xmlhttp.status==200) {
			var load = JSON.parse(xmlhttp.responseText);
		}		
	} catch(err) {
		load = null;
	}
	return load;
}

SE_UNASUS_PACK.prototype._notInitializedMessage = function() {
	this.debugMessage('Player não inicializado!');
	document.body.parentNode.innerHTML = "<h2>Player não inicializado!</h2>";
	return true;
}	

SE_UNASUS_PACK.prototype.getDebug = function() {
	if (this._initialized) {	
		return this._api.debug;
	}
	this._notInitializedMessage();
	return null;	
}

SE_UNASUS_PACK.prototype.setDebug = function(debug) {
	if (this._initialized) {	
		if (debug) {
			this._api.debug = true;
		} else {
			this._api.debug = false;
		}
		return true;
	}
	this._notInitializedMessage();
	return null;
}

SE_UNASUS_PACK.prototype.debugMessage = function(str) {
	if (this._initialized) {
		if (this._api.debug) {
			this._api.debugMessage(str);
		}
	} else {
		console.log('DEBUG: '+str);
	}
	return true;
}
 
SE_UNASUS_PACK.prototype.initialize = function() {	
	this._api = this._getAPI();
	this._error = false;
	if (this._api === false) {
		document.body.parentNode.innerHTML = "<h2>Este conteúdo não deve ser acessado diretamente.</br></br>Nenhuma interface de player SE_UNASUS_PLAYER_API encontrada!</h2>"
		return false;		
	} else {		
		this.debugMessage("Adaptador SE_UNASUS_PLAYER_API encontrado.");
		var settings = {};
		settings.basePath = null;

		if (!settings.basePath) {
		  (function (name) {
			var scripts = document.getElementsByTagName('script');

			for (var i = scripts.length - 1; i >= 0; --i) {
			  var src = scripts[i].src;
			  var l = src.length;
			  var length = name.length;
			  if (src.substr(l - length) == name) {
				settings.basePath = src.substr(0, l - length);
			  }
			}
		  })('se_unasus_pack.js');
		}
		
		this._api.config = this._loadJSON(settings.basePath+"/se_unasus_pack.json");
		
		if (this._api.config === null) {
			this.debugMessage("Não é possível ler se_unasus_pack.json ou formato inválido");
			document.body.parentNode.innerHTML = "<h2>Não foi possível ler o arquivo de configuração deste conteúdo.</h2>"
			return false;
		}
		this.debugMessage("Arquivo de configuração carregado.");					
		if (this._api.state === this._api._STATE.RUNNING) {
			this._initialized = true;
			return true;			
		} else {
			try {
				this.debugMessage("Inicializando player.");
				if (!this._api.initialize()) {					
					document.body.parentNode.innerHTML = "<h2>"+this._api.getLastError()+"</h2>"
					return false;					
				}
			} catch (error) {
				this.debugMessage(error);
				document.body.parentNode.innerHTML = "<h2>Não foi possível inicializar o player para este conteúdo.</h2>"
				return false;
			}
			this.debugMessage("Player inicializado.");
			this._initialized = true;
			return true;			
		}
	}

}

SE_UNASUS_PACK.prototype.isInitialized = function() {
	return this._initialized;
}

SE_UNASUS_PACK.prototype.getConfig = function() {
	if (this._initialized) {
		return this._api.config;
	}
	this._notInitializedMessage();
	return null;
}

 SE_UNASUS_PACK.prototype.getBasename = function() {
	if (this._initialized) {	
		return this._api.getBasename();
	}
	this._notInitializedMessage();
	return null;	
}

SE_UNASUS_PACK.prototype.getPlayerVersion = function() {
	if (this._initialized) {	
		return this._api.getPlayerVersion();
	}
	this._notInitializedMessage();
	return null;	
}

SE_UNASUS_PACK.prototype.getPlayerName = function() {
	if (this._initialized) {	
		return this._api.getPlayerName();
	}
	this._notInitializedMessage();
	return null;
}

SE_UNASUS_PACK.prototype.getPlayerUser = function() {
	if (this._initialized) {	
		return this._api.getPlayerUser();
	}
	this._notInitializedMessage();
	return null;	
}

SE_UNASUS_PACK.prototype.getPlayerUserRealName = function() {
	if (this._initialized) {	
		return this._api.getPlayerUser().RealName;
	}
	this._notInitializedMessage();
	return null;	
}

SE_UNASUS_PACK.prototype.getPlayerUserId = function() {
	if (this._initialized) {	
		return this._api.getPlayerUser().Id;
	}
	this._notInitializedMessage();
	return null;	
}
			
SE_UNASUS_PACK.prototype.getVideoResolutions = function() {
	if (this._initialized) {
		return this._api.getVideoResolutions();
	}
	this._notInitializedMessage();
	return null;	
}

SE_UNASUS_PACK.prototype.setPersistence = function(item, obj) {
	if (this._initialized) {	
		value = JSON.stringify(obj);
		if (this._api.setItem(this.getBasename() + item, value)===false) {
			this.debugMessage("Falha: setPersistence"+"=>"+item+":"+value+".");
			document.body.parentNode.innerHTML = "<h2>Falha ao gravar dados!</h2>"
			return false;			
		} else {
			this.debugMessage("Sucesso: setPersistence"+"=>"+item+":"+value+".");
		}
		return true;
	}
	this._notInitializedMessage();
	return null;
}

SE_UNASUS_PACK.prototype.getPersistence = function(item) {
	var dataitem;
	if (this._initialized) {
		var value = this._api.getItem(this.getBasename() + item);
		if (value===false) {
			this.debugMessage("Falha: getPersistence"+"=>"+item+".");
			document.body.parentNode.innerHTML = "<h2>Falha ao ler dados!</h2>"
			return null;
		} else {
			if (value===null) {
				return dataitem;
			}
			try {
				dataitem = JSON.parse(value);
			} catch (e) {
				this.debugMessage("Valor nulo ou inválido: getPersistence"+"=>"+item+".");
				return null;
			}		
			this.debugMessage("Sucesso: getPersistence"+"=>"+item+":"+value+".");
			return dataitem;
		}
	}
	this._notInitializedMessage();
	return null;
}

SE_UNASUS_PACK.prototype.setStatus = function(status) {
	var status_values = ["attended", "attempted", "completed", "passed", "failed"];
	if (status_values.indexOf(status.status) === -1) {
		this.debugMessage("Falha: valor inválido para status.status em setStatus." +status.staus);
		document.body.parentNode.innerHTML = "<h2>Falha ao gravar dados!</h2>"
		return false;
	}
	if (!(status.percentage>=0 && status.percentage<=100 && (status.percentage === +status.percentage && isFinite(status.percentage) && !(status.percentage % 1)))) {
		this.debugMessage("Falha: valor inválido para status.percentage em setStatus.");
		document.body.parentNode.innerHTML = "<h2>Falha ao gravar dados!</h2>"
		return false;
	}
	if (!(status.LTIvalue>=0 && status.LTIvalue<=1)) {
		this.debugMessage("Falha: valor inválido para status.LTIvalue em setStatus.");
		document.body.parentNode.innerHTML = "<h2>Falha ao gravar dados!</h2>"
		return false;
	}
	return this.setPersistence("STATUS", status);
}

SE_UNASUS_PACK.prototype.getStatus = function() {
	return this.getPersistence("STATUS");
}

window.unasus = window.unasus || {};
window.unasus.pack = window.unasus.pack || new SE_UNASUS_PACK();