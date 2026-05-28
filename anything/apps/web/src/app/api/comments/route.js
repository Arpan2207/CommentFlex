import sql from "@/app/api/utils/sql";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return Response.json({ error: "UserId is required" }, { status: 400 });
  }

  try {
    const comments = await sql`
      SELECT * FROM comments 
      WHERE user_id = ${userId} 
      ORDER BY like_count DESC
    `;
    return Response.json(comments);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to fetch comments" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      user_id,
      ig_comment_id,
      content,
      like_count,
      is_gif,
      gif_url,
      is_pinned,
      is_top,
      post_title,
      post_thumbnail,
    } = body;

    const [comment] = await sql`
      INSERT INTO comments (user_id, ig_comment_id, content, like_count, is_gif, gif_url, is_pinned, is_top, post_title, post_thumbnail)
      VALUES (${user_id}, ${ig_comment_id}, ${content}, ${like_count}, ${is_gif}, ${gif_url}, ${is_pinned}, ${is_top}, ${post_title}, ${post_thumbnail})
      ON CONFLICT (ig_comment_id) DO UPDATE SET
        like_count = EXCLUDED.like_count,
        is_pinned = EXCLUDED.is_pinned,
        is_top = EXCLUDED.is_top
      RETURNING *
    `;

    // Update user total likes
    await sql`
      UPDATE users 
      SET total_likes_all_time = (SELECT SUM(like_count) FROM comments WHERE user_id = ${user_id})
      WHERE id = ${user_id}
    `;

    return Response.json(comment);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to create/update comment" },
      { status: 500 },
    );
  }
}
