import { NextRequest, NextResponse } from 'next/server'
import connectMongo from '@/db/mongoose'
import { Novel } from '@/model/novel'

export async function GET(req: NextRequest) {
    try {
        await connectMongo()

        const { search = '', genre = 'All', page = '1', limit = '6' } = Object.fromEntries(req.nextUrl.searchParams)

        const pageNumber = parseInt(page as string, 10) || 1
        const pageSize = parseInt(limit as string, 10) || 6

        // Build query object
        const query: any = {}

        if (search) {
            query.title = { $regex: search, $options: 'i' } // case-insensitive search
        }

        if (genre && genre !== 'All') {
            query.genre = genre
        }

        const totalNovels = await Novel.countDocuments(query)
        const totalPages = Math.ceil(totalNovels / pageSize)

        const novels = await Novel.find(query)
            .sort({ createdAt: -1 })
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)

        return NextResponse.json({ novels, totalPages })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to fetch novels' }, { status: 500 })
    }
}
