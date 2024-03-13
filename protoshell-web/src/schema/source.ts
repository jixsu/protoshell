export interface LockData {
  [key: string]: string;
}

export type Source = {
  id: string;
  dbName: SourceDBName;
  name: string;
  label: string;
  description: string;
  typeId: string;
  logo: string;
  // TODO (tentative): props relating to what it's tracking
  lockInfo: LockData;
  lockConfirms: LockData;
  integrationEndpoint: string;
  permissionsEndpoint: string;
};

export type SourceType = {
  id: string;
  name: string;
  label: string;
};

export type SourceDBName = "protoshop" | "protoshop_clickstream";

export type IntegrateResponse = {
  uid: number;
};

// TODO: Update response type
export type SourceLockResponse = {
  id: number;
  updated_at: string;
  created_at: string;
  click_page: string;
  loc: number;
  geoloc: number;
  ip: number;
  device: number;
  target: number;
};
