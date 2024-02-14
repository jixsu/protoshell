export type Source = {
  id: string;
  dbName: SourceDBName;
  name: string;
  label: string;
  description: string;
  typeId: string;
  // TODO (tentative): props relating to what it's tracking
};

export type SourceType = {
  id: string;
  name: string;
  label: string;
};

export type SourceDBName = "amazon_demo";
