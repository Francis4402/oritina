import { db } from "@/db/db";
import { productsTable } from "@/db/schema";
import { and, asc, desc, eq, gte, lte, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);


    const page = parseInt(searchParams.get("page") || "1", 10);
    const Size = parseInt(searchParams.get("Size") || "10", 10);
    const offset = (page - 1) * Size;


    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");


    const sort = searchParams.get("sort") || "id"; 
    const order = searchParams.get("order") === "desc" ? "desc" : "asc";


    const sortColumns = {
      id: productsTable.id,
      price: productsTable.price,
      totalRating: productsTable.totalRating,
      createdAt: productsTable.createdAt,
    } as const;


    const sortColumn = sortColumns[sort as keyof typeof sortColumns] || productsTable.id;


    let conditions = [];
    if (minPrice) conditions.push(gte(productsTable.price, Number(minPrice)));
    if (maxPrice) conditions.push(lte(productsTable.price, Number(maxPrice)));

    // Query
    const products = await db
      .select()
      .from(productsTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(order === "desc" ? desc(sortColumn) : asc(sortColumn))
      .limit(Size)
      .offset(offset);

    // Count total
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(productsTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    return NextResponse.json({
      data: products,
      pagination: {
        page,
        Size,
        total: count,
        totalPages: Math.ceil(count / Size),
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const existingProduct = await db.select().from(productsTable).where(eq(productsTable.name, body.name))

        if (existingProduct.length > 0) {
            return NextResponse.json(
                { error: 'Product already exists' },
                { status: 400 }
            )
        }

        const newProduct = await db.insert(productsTable).values({
            name: body.name,
            description: body.description,
            price: body.price,
            productImage: body.productImage,
            category: body.category,
            producttype: body.producttype,
            color: body.color,
            totalRating: body.totalRating || "0",
            reviews: body.reviews || "0",
            createdAt: new Date(),
            updatedAt: new Date()
        }).returning();

        return NextResponse.json(newProduct, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}