import { CHARACTERS, LINES, PROJECT, TAKES } from "../../../../lib/store";
import { hasSupabase, supabaseAdmin } from "../../../../lib/supabase";

export async function GET(_req, { params }) {
  const { id } = await params;
  if (!hasSupabase() || id === "demo") {
    return Response.json({
      source: "memory",
      project: PROJECT,
      characters: CHARACTERS,
      lines: LINES,
      takes: TAKES,
    });
  }
  const db = supabaseAdmin();
  const { data: project, error } = await db.from("projects").select("*").eq("id", id).single();
  if (error) return Response.json({ error: error.message }, { status: 404 });
  const { data: characters } = await db.from("characters").select("*").eq("project_id", id);
  const { data: scenes } = await db.from("scenes").select("*").eq("project_id", id);
  const sceneIds = (scenes || []).map((s) => s.id);
  let lines = [];
  let takes = [];
  if (sceneIds.length) {
    const lineRes = await db.from("lines").select("*").in("scene_id", sceneIds).order("sort");
    lines = lineRes.data || [];
    const lineIds = lines.map((l) => l.id);
    if (lineIds.length) {
      const takeRes = await db.from("takes").select("*").in("line_id", lineIds).order("created_at", { ascending: false });
      takes = takeRes.data || [];
    }
  }
  return Response.json({ source: "supabase", project, characters, scenes, lines, takes });
}
