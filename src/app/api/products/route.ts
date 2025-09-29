import { db } from "@/db/db";
import { productsTable, ratingTable } from "@/db/schema";
import { and, asc, desc, eq, gte, lte, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const size = parseInt(searchParams.get("size") || "10", 10);
    const offset = (page - 1) * size;

    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const producttype = searchParams.get("producttype");
    const name = searchParams.get("name");
    const sort = searchParams.get("sort") || "id";
    const order = searchParams.get("order") === "desc" ? "desc" : "asc";
    const readTime = searchParams.get("readTime");
    const rating = searchParams.get("rating");

    const sortColumns = {
      id: productsTable.id,
      price: productsTable.price,
      name: productsTable.name,
      featured: productsTable.producttype,
      category: productsTable.category,
      createdAt: productsTable.createdAt,
      averageRating: sql<number>`average_rating`,
      totalRatings: sql<number>`total_ratings`,
    } as const;

    const sortColumn =
      sortColumns[sort as keyof typeof sortColumns] || productsTable.id;

    // product filters
    const productConditions = [];
    if (minPrice) productConditions.push(gte(productsTable.price, Number(minPrice)));
    if (maxPrice) productConditions.push(lte(productsTable.price, Number(maxPrice)));
    if (producttype) productConditions.push(eq(productsTable.producttype, producttype));
    if (name) productConditions.push(eq(productsTable.name, name));
    if (readTime) productConditions.push(eq(productsTable.readTime, Number(readTime)));

    // ratings subquery
    const ratingsSubquery = db.$with("ratings").as(
      db
        .select({
          productId: ratingTable.productId,
          averageRating: sql<number>`COALESCE(AVG(${ratingTable.rating}::numeric), 0)`.as("average_rating"),
          totalRatings: sql<number>`COUNT(${ratingTable.id})`.as("total_ratings"),
        })
        .from(ratingTable)
        .groupBy(ratingTable.productId)
    );

    // main query
    let baseQuery = db
      .with(ratingsSubquery)
      .select({
        id: productsTable.id,
        name: productsTable.name,
        description: productsTable.description,
        price: productsTable.price,
        productImage: productsTable.productImage,
        color: productsTable.color,
        spcefication: productsTable.spcefication,
        category: productsTable.category,
        producttype: productsTable.producttype,
        readTime: productsTable.readTime,
        quantity: productsTable.quantity,
        size: productsTable.size,
        isFavorite: productsTable.isFavorite,
        createdAt: productsTable.createdAt,
        updatedAt: productsTable.updatedAt,
        averageRating: sql<number>`COALESCE(${ratingsSubquery.averageRating}, 0)`,
        totalRatings: sql<number>`COALESCE(${ratingsSubquery.totalRatings}, 0)`,
      })
      .from(productsTable)
      .leftJoin(ratingsSubquery, eq(productsTable.id, ratingsSubquery.productId));

    // filters
    let whereConditions: any[] = [];
    
    if (productConditions.length > 0) {
      whereConditions.push(and(...productConditions));
    }
    
    if (rating) {
      const ratingValue = Number(rating);
      whereConditions.push(
        sql`ROUND(COALESCE(${ratingsSubquery.averageRating}, 0)) = ${ratingValue}`
      );
    }

    if (whereConditions.length === 1) {
      baseQuery.where(whereConditions[0]);
    } else if (whereConditions.length > 1) {
      baseQuery.where(and(...whereConditions));
    }

    const products = await baseQuery
      .orderBy(order === "desc" ? desc(sortColumn) : asc(sortColumn))
      .limit(size)
      .offset(offset);

    // count query
    let countQuery = db
      .with(ratingsSubquery)
      .select({ count: sql<number>`COUNT(*)` })
      .from(productsTable)
      .leftJoin(ratingsSubquery, eq(productsTable.id, ratingsSubquery.productId));

    if (whereConditions.length === 1) {
      countQuery.where(whereConditions[0]);
    } else if (whereConditions.length > 1) {
      countQuery.where(and(...whereConditions));
    }

    const [{ count }] = await countQuery;

    return NextResponse.json({
      data: products,
      pagination: {
        page,
        size,
        total: Number(count),
        totalPages: Math.ceil(Number(count) / size),
      },
    });
  } catch (error) {
    console.error("Products API error:", error);
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
            size: body.size,
            spcefication: body.spcefication,
            color: body.color,
            quantity: body.quantity,
            readTime: body.readTime || "0",
            createdAt: new Date(),
            updatedAt: new Date()
        }).returning();

        return NextResponse.json(newProduct, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}