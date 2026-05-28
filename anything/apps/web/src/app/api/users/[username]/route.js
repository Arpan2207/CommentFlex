import sql from "@/app/api/utils/sql";

export async function GET(request, { params }) {
  const { username } = params;

  try {
    const [user] = await sql`
      SELECT id, username, ig_username, avatar_url, verified_mode, total_likes_all_time, created_at 
      FROM users 
      WHERE username = ${username}
    `;

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const comments = await sql`
      SELECT * FROM comments 
      WHERE user_id = ${user.id} 
      ORDER BY like_count DESC
    `;

    return Response.json({ user, comments });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}
