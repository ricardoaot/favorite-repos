import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    // Read params with default
    const q = searchParams.get("q") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("per_page") || "5");
    const order = searchParams.get("order") || "desc";

    const url = new URL("https://api.github.com/search/repositories");

    // Building query params cleanly
    url.search = new URLSearchParams({
        q,
        page: page.toString(),
        per_page: limit.toString(),
        order: order.toString()
    }).toString();

    // First ask GitHub without cache
    const res = await fetch(url.toString(), {
        cache: "no-store",
    });

    let jsonResponse = null;
    jsonResponse = await res.json();

    // If there are few results, it is not worth caching
    // If there are enough results, now we cache

    if (jsonResponse.items && jsonResponse.items.length > 3) {
        console.log("Cache enabled")
        const cachedRes = await fetch(url.toString(), {
            next: { revalidate: 120 }, // cache 2 min
        });
        jsonResponse = await cachedRes.json()
    }


    const total = jsonResponse?.total_count || 0
    return NextResponse.json({
        data: jsonResponse?.items,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    });
}