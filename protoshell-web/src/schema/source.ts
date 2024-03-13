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
};

export type SourceType = {
  id: string;
  name: string;
  label: string;
};

export type SourceDBName = "protoshop";

export type IntegrateResponse = {
  uid: number;
};
