import { Communication } from '../../interfaces/communication';
import { ActionCommunication } from '../../enums/actionCommunication';

export class PPUCommunication implements Communication {
    public registerCommunication(): void {
        window.addEventListener('message', (response) => {
            let data = JSON.parse(response.data);
            if (data['type'] == ActionCommunication.PPU) {
                alert(data['name']);
            }
        });
    }
    
    public saveCommunicationData(data: string): void {}
}