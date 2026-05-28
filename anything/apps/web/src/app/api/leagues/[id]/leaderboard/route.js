import sql from "@/app/api/utils/sql";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const leaderboard = await sql`
      SELECT u.username, u.ig_username, u.avatar_url, u.total_likes_all_time,
             (SELECT SUM(like_count) FROM comments c WHERE c.user_id = u.id) as weekly_likes
      FROM users u
      JOIN league_members lm ON u.id = lm.user_id
      WHERE lm.league_id = ${id}
      ORDER BY weekly_likes DESC
    `;
    return Response.json(leaderboard);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 },
    );
  }
}
