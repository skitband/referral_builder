export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      referrals: {
        Row: {
          id: string
          created_at: string
          given_name: string
          surname: string
          email: string
          phone: string
          home_no: string | null
          street: string | null
          suburb: string | null
          state: string | null
          postcode: string | null
          country: string
          avatar_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          given_name: string
          surname: string
          email: string
          phone: string
          home_no?: string | null
          street?: string | null
          suburb?: string | null
          state?: string | null
          postcode?: string | null
          country: string
          avatar_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          given_name?: string
          surname?: string
          email?: string
          phone?: string
          home_no?: string | null
          street?: string | null
          suburb?: string | null
          state?: string | null
          postcode?: string | null
          country?: string
          avatar_url?: string | null
        }
      }
    }
  }
}