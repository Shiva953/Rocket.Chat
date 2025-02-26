import type { ILicenseV2, ILicenseV3, LicenseLimitKind } from '@rocket.chat/license';
import Ajv from 'ajv';

const ajv = new Ajv({
	coerceTypes: true,
});

type licensesAddProps = {
	license: string;
};

const licensesAddPropsSchema = {
	type: 'object',
	properties: {
		license: {
			type: 'string',
		},
	},
	required: ['license'],
	additionalProperties: false,
};

export const isLicensesAddProps = ajv.compile<licensesAddProps>(licensesAddPropsSchema);

type licensesInfoProps = {
	loadValues?: boolean;
};

const licensesInfoPropsSchema = {
	type: 'object',
	properties: {
		loadValues: {
			type: 'boolean',
		},
	},
	required: [],
	additionalProperties: false,
};

export const isLicensesInfoProps = ajv.compile<licensesInfoProps>(licensesInfoPropsSchema);

export type LicensesEndpoints = {
	'/v1/licenses.get': {
		GET: () => { licenses: Array<ILicenseV2 | (ILicenseV3 & { modules: string[] })> };
	};
	'/v1/licenses.info': {
		GET: (params: licensesInfoProps) => {
			data: {
				license: ILicenseV3 | undefined;
				activeModules: string[];
				limits: Record<LicenseLimitKind, { max: number; value?: number }>;
			};
		};
	};
	'/v1/licenses.add': {
		POST: (params: licensesAddProps) => void;
	};
	'/v1/licenses.maxActiveUsers': {
		GET: () => { maxActiveUsers: number | null; activeUsers: number };
	};
	'/v1/licenses.requestSeatsLink': {
		GET: () => { url: string };
	};
	'/v1/licenses.isEnterprise': {
		GET: () => { isEnterprise: boolean };
	};
};
