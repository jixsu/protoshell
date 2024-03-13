export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          username: string;
          first_name: string;
          last_name: string;
          created_at: string;
          password: string;
          email: string;
        };
        Insert: {
          id?: string;
          username: string;
          first_name: string;
          last_name: string;
          created_at: string;
          password: string;
          email: string;
        };
        Update: {
          id?: string;
          username: string;
          first_name: string;
          last_name: string;
          created_at: string;
          password: string;
          email: string;
        };
      };
      sources: {
        Row: {
          user_id: string;
          protoshop: boolean;
          protoshop_id: number;
        };
        Insert: {
          user_id: string;
          protoshop?: boolean;
          protoshop_id?: number;
        };
        Update: {
          user_id?: string;
          protoshop?: boolean;
          protoshop_id?: number;
        };
        Upsert: {
          user_id: string;
          protoshop?: boolean;
          protoshop_id?: number;
        };
      };
      protoshop: {
        Row: {
          id: number;
          NAME: number;
          AGE: number;
          ADDRESS: number;
          SALARY: number;
          updated_at: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          NAME: number;
          AGE: number;
          ADDRESS: number;
          SALARY: number;
          updated_at: string;
          created_at: string;
        };
        Update: {
          id?: number;
          NAME: number;
          AGE: number;
          ADDRESS: number;
          SALARY: number;
          updated_at: string;
          created_at: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
  };
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
