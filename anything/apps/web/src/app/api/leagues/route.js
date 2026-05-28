import sql from "@/app/api/utils/sql";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  try {
    const leagues = await sql`
      SELECT l.*, 
             (SELECT count(*) FROM league_members lm WHERE lm.league_id = l.id) as member_count
      FROM leagues l
      JOIN league_members lm ON l.id = lm.league_id
      WHERE lm.user_id = ${userId}
    `;
    return Response.json(leagues);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch leagues" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, userId } = body;
    const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    const [league] = await sql`
      INSERT INTO leagues (name, invite_code, created_by)
      VALUES (${name}, ${inviteCode}, ${userId})
      RETURNING *
    `;

    await sql`
      INSERT INTO league_members (league_id, user_id)
      VALUES (${league.id}, ${userId})
    `;

    return Response.json(league);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to create league" }, { status: 500 });
  }
}
