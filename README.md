Challenges & How I Solved Them
Google OAuth redirect issues

Problem:
Google login kept failing with redirect_uri_mismatch.

Cause:
Supabase requires its callback URL to be registered in Google Cloud.

Solution:
Added this redirect URI in Google Cloud OAuth settings:
https://<project-id>.supabase.co/auth/v1/callback

Understanding Supabase Row Level Security

Problem:
After enabling RLS, database queries returned empty results.

Cause:
RLS blocks ALL access until policies are created.

Solution:
Created policies allowing users to:

Read their bookmarks

Insert their bookmarks

Delete their bookmarks

This fixed access while keeping data secure.