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
          amazon_demo: boolean;
        };
        Insert: {
          user_id?: string;
          amazon_demo: boolean;
        };
        Update: {
          user_id?: string;
          amazon_demo: boolean;
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
