export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      articles: {
        Row: {
          author: string | null
          category: string
          content: string
          created_at: string
          id: string
          is_featured: boolean | null
          status: string | null
          title: string
          tone: string
          topic: string
          updated_at: string
          views: number | null
        }
        Insert: {
          author?: string | null
          category: string
          content: string
          created_at?: string
          id?: string
          is_featured?: boolean | null
          status?: string | null
          title: string
          tone: string
          topic: string
          updated_at?: string
          views?: number | null
        }
        Update: {
          author?: string | null
          category?: string
          content?: string
          created_at?: string
          id?: string
          is_featured?: boolean | null
          status?: string | null
          title?: string
          tone?: string
          topic?: string
          updated_at?: string
          views?: number | null
        }
        Relationships: []
      }
      bots: {
        Row: {
          avatar_url: string | null
          commands: Json | null
          community_id: string | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
          username: string
        }
        Insert: {
          avatar_url?: string | null
          commands?: Json | null
          community_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
          username: string
        }
        Update: {
          avatar_url?: string | null
          commands?: Json | null
          community_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "bots_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          created_at: string | null
          id: string
          is_ai_generated: boolean | null
          is_bot: boolean | null
          message: string
          stream_id: string | null
          user_id: string | null
          username: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_ai_generated?: boolean | null
          is_bot?: boolean | null
          message: string
          stream_id?: string | null
          user_id?: string | null
          username: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_ai_generated?: boolean | null
          is_bot?: boolean | null
          message?: string
          stream_id?: string | null
          user_id?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_stream_id_fkey"
            columns: ["stream_id"]
            isOneToOne: false
            referencedRelation: "streams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      communities: {
        Row: {
          avatar_url: string | null
          category: string | null
          created_at: string
          creator_id: string
          description: string | null
          id: string
          is_verified: boolean | null
          member_count: number | null
          name: string
          tags: Json | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          category?: string | null
          created_at?: string
          creator_id: string
          description?: string | null
          id?: string
          is_verified?: boolean | null
          member_count?: number | null
          name: string
          tags?: Json | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          category?: string | null
          created_at?: string
          creator_id?: string
          description?: string | null
          id?: string
          is_verified?: boolean | null
          member_count?: number | null
          name?: string
          tags?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "communities_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      community_members: {
        Row: {
          community_id: string
          id: string
          joined_at: string
          role: string | null
          user_id: string
        }
        Insert: {
          community_id: string
          id?: string
          joined_at?: string
          role?: string | null
          user_id: string
        }
        Update: {
          community_id?: string
          id?: string
          joined_at?: string
          role?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_members_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      donations: {
        Row: {
          amount: number
          created_at: string | null
          donor_name: string
          id: string
          is_bot: boolean | null
          message: string | null
          stream_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          donor_name: string
          id?: string
          is_bot?: boolean | null
          message?: string | null
          stream_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          donor_name?: string
          id?: string
          is_bot?: boolean | null
          message?: string | null
          stream_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "donations_stream_id_fkey"
            columns: ["stream_id"]
            isOneToOne: false
            referencedRelation: "streams"
            referencedColumns: ["id"]
          },
        ]
      }
      message_reactions: {
        Row: {
          created_at: string | null
          emoji: string
          id: string
          message_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          emoji: string
          id?: string
          message_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          emoji?: string
          id?: string
          message_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "message_reactions_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_reactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      message_views: {
        Row: {
          id: string
          message_id: string | null
          user_id: string | null
          viewed_at: string | null
        }
        Insert: {
          id?: string
          message_id?: string | null
          user_id?: string | null
          viewed_at?: string | null
        }
        Update: {
          id?: string
          message_id?: string | null
          user_id?: string | null
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "message_views_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_views_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          community_id: string | null
          content: string
          created_at: string
          forwarded_from_id: string | null
          id: string
          is_forwarded: boolean | null
          is_pinned: boolean | null
          media_type: string | null
          media_url: string | null
          mentions: Json | null
          message_type: string | null
          pinned_at: string | null
          pinned_by: string | null
          reactions: Json | null
          reply_to_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          community_id?: string | null
          content: string
          created_at?: string
          forwarded_from_id?: string | null
          id?: string
          is_forwarded?: boolean | null
          is_pinned?: boolean | null
          media_type?: string | null
          media_url?: string | null
          mentions?: Json | null
          message_type?: string | null
          pinned_at?: string | null
          pinned_by?: string | null
          reactions?: Json | null
          reply_to_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          community_id?: string | null
          content?: string
          created_at?: string
          forwarded_from_id?: string | null
          id?: string
          is_forwarded?: boolean | null
          is_pinned?: boolean | null
          media_type?: string | null
          media_url?: string | null
          mentions?: Json | null
          message_type?: string | null
          pinned_at?: string | null
          pinned_by?: string | null
          reactions?: Json | null
          reply_to_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_forwarded_from_id_fkey"
            columns: ["forwarded_from_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_pinned_by_fkey"
            columns: ["pinned_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_reply_to_id_fkey"
            columns: ["reply_to_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          display_name: string | null
          follower_count: number | null
          following_count: number | null
          id: string
          updated_at: string | null
          username: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          follower_count?: number | null
          following_count?: number | null
          id: string
          updated_at?: string | null
          username: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          follower_count?: number | null
          following_count?: number | null
          id?: string
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      streams: {
        Row: {
          auto_chat_enabled: boolean | null
          category: string | null
          created_at: string | null
          fake_viewer_count: number | null
          id: string
          is_live: boolean | null
          roleplay_persona: string | null
          streamer_id: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
          viewer_count: number | null
        }
        Insert: {
          auto_chat_enabled?: boolean | null
          category?: string | null
          created_at?: string | null
          fake_viewer_count?: number | null
          id?: string
          is_live?: boolean | null
          roleplay_persona?: string | null
          streamer_id?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
          viewer_count?: number | null
        }
        Update: {
          auto_chat_enabled?: boolean | null
          category?: string | null
          created_at?: string | null
          fake_viewer_count?: number | null
          id?: string
          is_live?: boolean | null
          roleplay_persona?: string | null
          streamer_id?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
          viewer_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "streams_streamer_id_fkey"
            columns: ["streamer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_sessions: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          token: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: string
          token: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          token?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          is_admin: boolean | null
          is_verified: boolean | null
          password_hash: string
          updated_at: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          is_admin?: boolean | null
          is_verified?: boolean | null
          password_hash: string
          updated_at?: string
          username: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          is_admin?: boolean | null
          is_verified?: boolean | null
          password_hash?: string
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      authenticate_user: {
        Args: { username_input: string; password_input: string }
        Returns: {
          user_data: Json
          session_token: string
        }[]
      }
      cleanup_old_streams: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_message_stats: {
        Args: { message_uuid: string }
        Returns: {
          reaction_counts: Json
          view_count: number
          user_reacted: Json
        }[]
      }
      get_user_from_token: {
        Args: { token_input: string }
        Returns: {
          user_data: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
