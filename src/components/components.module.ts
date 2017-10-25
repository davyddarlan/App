import { NgModule } from '@angular/core';
import { UnasusPlayerComponent } from './unasus-player/unasus-player';
import { UnasusPerfilComponent } from './unasus-perfil/unasus-perfil';
@NgModule({
	declarations: [UnasusPlayerComponent,
    UnasusPerfilComponent],
	imports: [],
	exports: [UnasusPlayerComponent,
    UnasusPerfilComponent]
})
export class ComponentsModule {}
