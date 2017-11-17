import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UnasusPlayerComponent } from './unasus-player/unasus-player';
import { UnasusProgressComponent } from './unasus-progress/unasus-progress';

@NgModule({
	declarations: [UnasusPlayerComponent,
    UnasusProgressComponent],
	imports: [],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	exports: [UnasusPlayerComponent,
    UnasusProgressComponent]
})
export class ComponentsModule {}
