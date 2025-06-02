import {
	ICredentialTestResult, // Changed from ICredentialTestRequest
	ICredentialType,
	INodeProperties,
	IHookFunctions, // Added for 'this' context in test method
} from 'n8n-workflow';
import { TelePilotNodeConnectionManager } from '../nodes/TelePilot/TelePilotNodeConnectionManager'; // Added import

export class TelePilotApi implements ICredentialType {
	name = 'telePilotApi';
	displayName = 'Personal Telegram CoPilot API';
	properties: INodeProperties[] = [
		{
			displayName: 'App api_id',
			name: 'apiId',
			type: 'string',
			placeholder: '12348745646878',
			default: '',
			description: 'TBD',
			required: true,
		},
		{
			displayName: 'App api_hash',
			name: 'apiHash',
			type: 'string',
			placeholder: '17d2f8ab587',
			default: '',
			description: 'TBD',
			required: true,
		},
		{
			displayName: 'Phone Number',
			name: 'phoneNumber',
			type: 'string',
			default: '00123456789',
			description: 'Telegram Account Phone Number, used as Login',
			required: true,
		},
	];

	async test(this: IHookFunctions): Promise<ICredentialTestResult> {
		const apiId = this.getCredentials('telePilotApi').apiId as number;
		const apiHash = this.getCredentials('telePilotApi').apiHash as string;
		const phoneNumber = this.getCredentials('telePilotApi').phoneNumber as string;

		// It's assumed that TelePilotNodeConnectionManager is a singleton or can be instantiated here.
		// For n8n, you might need to access it via a shared service or re-instantiate if it's lightweight.
		// This example assumes direct instantiation or access to a global/singleton instance.
		// Adjust according to your project's architecture for accessing TelePilotNodeConnectionManager.
		const connectionManager = new TelePilotNodeConnectionManager(); // Or get instance if singleton

		try {
			const isConnected = await connectionManager.testConnection(apiId, apiHash, phoneNumber);
			if (isConnected) {
				return {
					success: true,
					message: 'Connection successful!',
				};
			} else {
				return {
					success: false,
					message: 'Connection failed. Please check your credentials and ensure your Telegram account is active.',
				};
			}
		} catch (error: any) {
			return {
				success: false,
				message: `Connection failed: ${error.message}`,
			};
		}
	}
}
